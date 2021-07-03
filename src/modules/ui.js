import Storage from "./storage";
import Http from "./http";

class UI{
   constructor(){

   }
   loadSelectors=function(){
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
   }
   showErrorMsg=function(msg){
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
   }
   hideMessage=function(){
    const {btnElm}=this.loadSelectors();
    const messageInner = document.querySelector('#message');
    setTimeout(()=>{
        // remove error message and disable attribute of button element
        messageInner.remove();
        btnElm.removeAttribute('disabled');
    },2000)
   }
   hideMessageInst=function(){
    const messageInner = document.querySelector('#message');
    messageInner.remove();
   }
   resetInput=function(){
    const {cityInputElm,countryInputElm}=this.loadSelectors();
    cityInputElm.value='';
    countryInputElm.value='';
   }
   print=function(weatherData){
    const {name,main:{temp,pressure,humidity}} = weatherData;
    const {icon,main} = weatherData.weather[0];
    const {tempElm,pressureElm,humidityElm,cityElm,iconElm,feelLikeElm}=this.loadSelectors();
    const iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";
    tempElm.textContent=`Temperature : ${temp}℃`;
    pressureElm.textContent=`Pressure : ${pressure}`;
    humidityElm.textContent=`Humidity : ${humidity}`;
    cityElm.textContent=`City : ${name}`;
    feelLikeElm.textContent=`Weather : ${main}`;
    iconElm.setAttribute('src',iconUrl);
   }
   static init(){
    const storage = new Storage()
    const http    = new Http()
    const ui      = new UI()
    const {btnElm,countryInputElm,cityInputElm,messageElm}=ui.loadSelectors();
    btnElm.addEventListener('click',e=>{
        // prevent form submission
        e.preventDefault();
        const country = countryInputElm.value;
        const city = cityInputElm.value;
        if(country === '' || city === ''){
            // show error message
            ui.showErrorMsg('Please fill up the required filed');
        }else{
            http.city=city
            http.country=country
            http.getWeatherData()
            ui.resetInput();
            // save city and country in localStorage
            storage.save(city,country) 
        }
    })
    messageElm.addEventListener('click',e=>{
        if(e.target.id === 'close'){
            // hiding cross element instance and remove disable attribute of button element
            ui.hideMessageInst();
            btnElm.removeAttribute('disabled');
        }
    })
    window.addEventListener('DOMContentLoaded',()=>{
        // getting data from localStorage
        const {city,country} = storage.getData()
        if(city && country){
            http.city=city
            http.country=country
            http.getWeatherData()
        }else{
            http.getWeatherData()
        }
    })
   }

}


export default UI


