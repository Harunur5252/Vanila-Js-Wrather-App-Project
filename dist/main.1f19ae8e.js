// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"storage.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var storage = {
  save: function save(city, country) {
    localStorage.setItem('city', city);
    localStorage.setItem('country', country);
  },
  getData: function getData() {
    var city = localStorage.getItem('city');
    var country = localStorage.getItem('country');
    return {
      city: city,
      country: country
    };
  }
};
var _default = storage;
exports.default = _default;
},{}],"http.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ui = _interopRequireDefault(require("./ui"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var http = {
  city: 'Sherpur',
  country: 'BD',
  getWeatherData: function getWeatherData() {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=".concat(this.city, ",").concat(this.country, "&units=metric&appid=573e72cdbc76c4bf98614913444285cc")).then(function (res) {
      return res.json();
    }).then(function (data) {
      if (data.cod === '404' && data.message) {
        _ui.default.showErrorMsg(data.message);

        return;
      }

      _ui.default.print(data);
    }).catch(function (err) {
      _ui.default.showErrorMsg(err);

      localStorage.clear();
    });
  }
};
var _default = http;
exports.default = _default;
},{"./ui":"ui.js"}],"ui.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _storage = _interopRequireDefault(require("./storage"));

var _http = _interopRequireDefault(require("./http"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UI = {
  loadSelectors: function loadSelectors() {
    var messageElm = document.querySelector('#messageWrapper');
    var countryInputElm = document.querySelector('#country');
    var cityInputElm = document.querySelector('#city');
    var btnElm = document.querySelector('#button');
    var cityElm = document.querySelector('#w-city');
    var iconElm = document.querySelector('#w-icon');
    var feelLikeElm = document.querySelector('#w-feel');
    var tempElm = document.querySelector('#w-temp');
    var pressureElm = document.querySelector('#w-pressure');
    var humidityElm = document.querySelector('#w-humidity');
    return {
      messageElm: messageElm,
      countryInputElm: countryInputElm,
      cityInputElm: cityInputElm,
      btnElm: btnElm,
      cityElm: cityElm,
      iconElm: iconElm,
      feelLikeElm: feelLikeElm,
      tempElm: tempElm,
      pressureElm: pressureElm,
      humidityElm: humidityElm
    };
  },
  showErrorMsg: function showErrorMsg(msg) {
    var _this$loadSelectors = this.loadSelectors(),
        messageElm = _this$loadSelectors.messageElm,
        btnElm = _this$loadSelectors.btnElm;

    var elm = "<div id=\"message\" class=\"alert alert-danger d-flex\">\n        ".concat(msg, "\n        <span id=\"icon\" class=\"ml-auto\" style=\"cursor: pointer\"\n          ><i class=\"far fa-times-circle\" id=\"close\"></i\n        ></span>\n        </div>"); // showing the error message and disabled button

    messageElm.insertAdjacentHTML('afterBegin', elm);
    btnElm.setAttribute('disabled', 'disabled'); // hiding the message
    // checking if the error message is exist or not 

    var messageInner = document.querySelector('#message');

    if (messageInner) {
      this.hideMessage();
    }
  },
  hideMessage: function hideMessage() {
    var _this$loadSelectors2 = this.loadSelectors(),
        btnElm = _this$loadSelectors2.btnElm;

    var messageInner = document.querySelector('#message');
    setTimeout(function () {
      // remove error message and disable attribute of button element
      messageInner.remove();
      btnElm.removeAttribute('disabled');
    }, 2000);
  },
  hideMessageInst: function hideMessageInst() {
    var messageInner = document.querySelector('#message');
    messageInner.remove();
  },
  resetInput: function resetInput() {
    var _this$loadSelectors3 = this.loadSelectors(),
        cityInputElm = _this$loadSelectors3.cityInputElm,
        countryInputElm = _this$loadSelectors3.countryInputElm;

    cityInputElm.value = '';
    countryInputElm.value = '';
  },
  print: function print(weatherData) {
    var name = weatherData.name,
        _weatherData$main = weatherData.main,
        temp = _weatherData$main.temp,
        pressure = _weatherData$main.pressure,
        humidity = _weatherData$main.humidity;
    var _weatherData$weather$ = weatherData.weather[0],
        icon = _weatherData$weather$.icon,
        main = _weatherData$weather$.main;

    var _this$loadSelectors4 = this.loadSelectors(),
        tempElm = _this$loadSelectors4.tempElm,
        pressureElm = _this$loadSelectors4.pressureElm,
        humidityElm = _this$loadSelectors4.humidityElm,
        cityElm = _this$loadSelectors4.cityElm,
        iconElm = _this$loadSelectors4.iconElm,
        feelLikeElm = _this$loadSelectors4.feelLikeElm;

    var iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";
    tempElm.textContent = "Temperature : ".concat(temp, "\u2103");
    pressureElm.textContent = "Pressure : ".concat(pressure);
    humidityElm.textContent = "Humidity : ".concat(humidity);
    cityElm.textContent = "City : ".concat(name);
    feelLikeElm.textContent = "Weather : ".concat(main);
    iconElm.setAttribute('src', iconUrl);
  },
  init: function init() {
    var _this = this;

    var _this$loadSelectors5 = this.loadSelectors(),
        btnElm = _this$loadSelectors5.btnElm,
        countryInputElm = _this$loadSelectors5.countryInputElm,
        cityInputElm = _this$loadSelectors5.cityInputElm,
        messageElm = _this$loadSelectors5.messageElm;

    btnElm.addEventListener('click', function (e) {
      // prevent form submission
      e.preventDefault();
      var country = countryInputElm.value;
      var city = cityInputElm.value;

      if (country === '' || city === '') {
        // show error message
        _this.showErrorMsg('Please fill up the required filed');
      } else {
        _http.default.city = city;
        _http.default.country = country;

        _http.default.getWeatherData();

        _this.resetInput(); // save city and country in localStorage


        _storage.default.save(city, country);
      }
    });
    messageElm.addEventListener('click', function (e) {
      if (e.target.id === 'close') {
        // hiding cross element instance and remove disable attribute of button element
        _this.hideMessageInst();

        btnElm.removeAttribute('disabled');
      }
    });
    window.addEventListener('DOMContentLoaded', function () {
      // getting data from localStorage
      var _storage$getData = _storage.default.getData(),
          city = _storage$getData.city,
          country = _storage$getData.country;

      if (city && country) {
        _http.default.city = city;
        _http.default.country = country;

        _http.default.getWeatherData();
      } else {
        _http.default.getWeatherData();
      }
    });
  }
};
var _default = UI;
exports.default = _default;
},{"./storage":"storage.js","./http":"http.js"}],"main.js":[function(require,module,exports) {
"use strict";

var _ui = _interopRequireDefault(require("./ui"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_ui.default.init();
},{"./ui":"ui.js"}],"C:/Users/USER/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "7483" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["C:/Users/USER/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.js.map