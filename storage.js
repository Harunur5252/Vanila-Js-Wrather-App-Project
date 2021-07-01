const storage={
    save(city,country){
        localStorage.setItem('city',city)
        localStorage.setItem('country',country) 
    },
    getData(){
        const city    = localStorage.getItem('city')
        const country = localStorage.getItem('country')
        return {city,country}
    }
}

export default storage