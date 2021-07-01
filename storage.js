class Storage{
    constructor(){
        
    }
    save=function(city,country){
        localStorage.setItem('city',city)
        localStorage.setItem('country',country) 
    }
    getData=function(){
        const city    = localStorage.getItem('city')
        const country = localStorage.getItem('country')
        return {city,country}
    }
}


export default Storage