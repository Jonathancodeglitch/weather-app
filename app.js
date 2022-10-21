const weatherInfo=document.querySelector('.weather-info');
const forcast= document.querySelector('.forcast');
/* const desc=document.getElementById('desc');
let icon=document.querySelector('.icon');
const city=document.getElementById('city');
const country=document.getElementById('country');
const kelvin=document.getElementById('kelvin');
const feels=document.getElementById('feels');
const wind=document.getElementById('wind');
const humidity=document.getElementById('humidity');

; */
// api.openweathermap.org/data/2.5/forecast?q=benin city&appid=appid=2275fe7cb85bec6c223cb33918659ad5&units=imperial
//get current weather api
async function getCurrentWeather(location){
    try{
        const response= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=2275fe7cb85bec6c223cb33918659ad5&units=imperial`,{mode:"cors"})

    const data=await response.json()
              DOMSTUFF.CurrentWeatherElem(data)
           
    }
    catch(err){
        console.log(err)
         alert("abeg no vex,we nor know there!")
    }

};

// get geocordinate

async function geocordinate(location){
    try{
        const res=await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=2275fe7cb85bec6c223cb33918659ad5`,{mode:"cors"})
        const geoData=await res.json()
          weeklyForcast(geoData[0].lat,geoData[0].lon)
    }catch(err){
        console.log(err)
    }

}

// get weather forcast for days of the week
   async function weeklyForcast(lat,lon){
        try{
            const res=await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=2275fe7cb85bec6c223cb33918659ad5&units=imperial&exclude=current,hourly,minutely,alerts&units=imperial`,{mode:"cors"})
            const data=await res.json()
                  document.querySelector('.forcast').innerHTML='';
                 data.daily.forEach((elem,index)=> {
                        if(index>0)
                        (
                            DOMSTUFF.createTheWeekElem(elem)
                        )
                 });

        }catch(err){

                console.log(err)
                
        }
   };


  // weeklyForcast()

const DOMSTUFF=(function(){
          
     
          const weatherContent=document.querySelector('.weather-content')
          const createTheWeekElem=(data)=>{
        
            const dayname = new Date(data.dt * 1000).toLocaleDateString("en", {
            weekday: "long",
          });
             
          let output=`
                    <div class="day">
                    <h1 id="date">${dayname}</h1>
                    <div class="flex-desc">
                        <div class="forcast-desc">${data.weather[0].description}</div>
                        <img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="">
                </div>
                    <div class="forcast-temp">${Math.round(data.temp.day)}°F</div>
                </div>
          
          `
           forcast.innerHTML+=output
   }
      
   const CurrentWeatherElem=(data)=>{
        
        const output=`
        <div class="head-info">
        <div class="flex-desc">
             <h2 id ="desc">${data.weather[0].description}</h2>
             <img src=http://openweathermap.org/img/w/${data.weather[0].icon}.png class="icon" alt="">
        </div>

     <h1><span id="city">${data.name}</span>,<span id="country">${data.sys.country}</span></h1>
        </div>   
<!-- weather description --> 
  <div class="weather-desc">
        <div id="kelvin">${Math.round(data.main.temp) }<sup>°F</sup></div>  
        <div class="underline"></div>
          <div class="flex-options" >
                 <div id="weather-options">
                    <h3>Feels like: <span id="feels">${Math.round(data.main.feels_like)}<sup>°F</sup></span></h3>
                    <h3>Wind: <span id="wind">${data.wind.speed} MPH</span></h3>
                    <h3>Humidity: <span id="humidity">${data.main.humidity}%</span></h3>
                 </div>
                 
          </div>
  </div>
        `
        
     weatherContent.innerHTML=output; 

   
   }
   return{
     createTheWeekElem,
     CurrentWeatherElem
   }
})();

const Locaton=(function(){
      const input=document.getElementById("input");

    const searchCurrentLocation=()=>{
          if(input!==""){
                anination()
                getCurrentWeather(input.value)
                geocordinate(input.value)
                input.value=""
          }
       
    }
    return{
        searchCurrentLocation,
    }
})()

/* add anination */

function anination(){
    weatherInfo.classList.add("animateCurrent");
    forcast.classList.add("animateWeekly");

    setTimeout(()=> {
        weatherInfo.classList.remove("animateCurrent");
        forcast.classList.remove("animateWeekly");
      },2100);
}


/* events */

window.addEventListener("DOMContentLoaded",anination)
window.addEventListener("DOMContentLoaded",()=>{
    getCurrentWeather("benin city")
    geocordinate("benin city")
});



const searchBtn=document.getElementById("btn");
searchBtn.addEventListener("click",Locaton.searchCurrentLocation)
