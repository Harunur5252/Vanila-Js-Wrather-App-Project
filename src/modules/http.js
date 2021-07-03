import UI from "./ui"

class Http{
  constructor(){
    this.city='Sherpur'
    this.country='BD'
  }
  getWeatherData = async function(){
    const ui = new UI()
    try {
        const res  = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.city},${this.country}&units=metric&appid=573e72cdbc76c4bf98614913444285cc`)
        const data = await res.json()
        if(data.cod === '404' && data.message){
            ui.showErrorMsg(data.message)
            return
        }
        ui.print(data)
    } catch (error) {
        ui.showErrorMsg(error)
    }
  }
}


export default Http


