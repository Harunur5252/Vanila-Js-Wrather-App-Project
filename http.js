import UI from "./ui"

function Http(){
    const ui = new UI()
    this.city='Sherpur'
    this.country='BD'
    this.getWeatherData = async function(){
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


// const http = {
//     city:'Sherpur',
//     country:'BD',
//     getWeatherData(){
//        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.city},${this.country}&units=metric&appid=573e72cdbc76c4bf98614913444285cc`)
//        .then(res=>res.json())
//        .then(data=>{
//            if(data.cod === '404' && data.message){
//                UI.showErrorMsg(data.message)
//                return
//            }
//            UI.print(data)
//        })
//        .catch(err=>{
//            UI.showErrorMsg(err)
//            localStorage.clear()
//        })
//     },
// }

