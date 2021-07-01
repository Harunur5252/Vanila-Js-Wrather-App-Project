import UI from "./ui"

const http = {
    city:'Sherpur',
    country:'BD',
    getWeatherData(){
       fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.city},${this.country}&units=metric&appid=573e72cdbc76c4bf98614913444285cc`)
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
           localStorage.clear()
       })
    },
}

export default http