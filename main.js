
const http = {
    getWeatherData(city,country){
       fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=573e72cdbc76c4bf98614913444285cc`)
       .then(res=>res.json())
       .then(data=>{
           if(data.cod === '404' && data.message){
               UI.showErrorMsg(data.message)
               return
           }
           UI.print(data)
       })
       .catch(err=>{
           UI.showErrorMsg(err)
       })
    },
}


const UI={
    loadSelectors(){
        const messageElm = document.querySelector('#messageWrapper');
        const countryInputElm = document.querySelector('#country');
        const cityInputElm = document.querySelector('#city');
        const btnElm = document.querySelector('#button');
        const cityElm = document.querySelector('#w-city');
        const iconElm = document.querySelector('#w-icon');
        const feelLikeElm = document.querySelector('#w-feel');
        const tempElm = document.querySelector('#w-temp');
        const pressureElm = document.querySelector('#w-pressure');
        const humidityElm = document.querySelector('#w-humidity');
        return {
            messageElm,countryInputElm,cityInputElm,btnElm,cityElm,iconElm,feelLikeElm,
            tempElm,pressureElm,humidityElm
        }
    },
    showErrorMsg(msg){
        const {messageElm,btnElm}=this.loadSelectors();
        const elm = `<div id="message" class="alert alert-danger d-flex">
        ${msg}
        <span id="icon" class="ml-auto" style="cursor: pointer"
          ><i class="far fa-times-circle" id="close"></i
        ></span>
        </div>`
        // showing the error message and disabled button
        messageElm.insertAdjacentHTML('afterBegin',elm);
        btnElm.setAttribute('disabled','disabled')
        // hiding the message
        // checking if the error message is exist or not 
        const messageInner = document.querySelector('#message');
        if(messageInner){
            this.hideMessage();
        }
    },
    hideMessage(){
        const {btnElm}=this.loadSelectors();
        const messageInner = document.querySelector('#message');
        setTimeout(()=>{
            // remove error message and disable attribute of button element
            messageInner.remove();
            btnElm.removeAttribute('disabled');
        },2000)
    },
    hideMessageInst(){
        const messageInner = document.querySelector('#message');
        messageInner.remove();
    },
    resetInput(){
       const {cityInputElm,countryInputElm}=this.loadSelectors();
       cityInputElm.value='';
       countryInputElm.value='';
    },
    print(weatherData){
       const {name,main:{temp,pressure,humidity}} = weatherData;
       const {icon,main} = weatherData.weather[0];
       const {tempElm,pressureElm,humidityElm,cityElm,iconElm,feelLikeElm}=this.loadSelectors();
       const iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";
       tempElm.textContent=`Temperature : ${temp}℃`;
       pressureElm.textContent=`Pressure : ${pressure}`;
       humidityElm.textContent=`Humidity : ${humidity}`;
       cityElm.textContent=`City : ${name}`;
       feelLikeElm.textContent=main;
       iconElm.setAttribute('src',iconUrl);
    },
    init(){
        const {btnElm,countryInputElm,cityInputElm,messageElm}=this.loadSelectors();
        btnElm.addEventListener('click',e=>{
            // prevent form submission
            e.preventDefault();
            const country = countryInputElm.value;
            const city = cityInputElm.value;
            if(country === '' || city === ''){
                // show error message
                this.showErrorMsg('Please fill up the required filed');
            }else{
                http.getWeatherData(city,country);
                this.resetInput();
            }
        })
        messageElm.addEventListener('click',e=>{
            if(e.target.id === 'close'){
                // hiding cross element instance and remove disable attribute of button element
                this.hideMessageInst();
                btnElm.removeAttribute('disabled');
            }
        })
    }
}


const storage={

}

UI.init()