const allStars = document.querySelectorAll('.star')

allStars.forEach((star,i) =>{
    star.onclick = function(){
    let current_star_level = i + 1;
    allStars.forEach((star,j) => {
        if(current_star_level >= j+1) {
            star.innerHTML = '&#9733';
        }else{
            star.innerHTML = '&#9734'
        }
    })
    }
})

function initMap(){
    //map option
    var options= {
        center:{lat: 35.39384928780973 , lng: -80.80765201975048},
        zoom: 10
    }
    //new map
    map = new google.maps.Map(document.getElementById('map'),options)

        //Add Marker function
        function addMarker(property){
            // console.log(property.location.lat)

            const marker = new google.maps.Marker({
                position:property.location,
                map:map,
            });

            if(property.imageIcon){
                marker.setIcon(property.imageIcon)
            }

            if(property.content){
                const detailWindow = new google.maps.InfoWindow({
                    content:property.content,
                });
                marker.addListener("click",()=>{
                    detailWindow.open(map, marker);
                    fetchWeather();
                    showWeather();
                })

            }
            function fetchWeather (ev){
                let lat= property.location.lat
                let lon= property.location.lng
                // var label= document.querySelector('.weather-label');
                // var temp= document.querySelector('.temp');
                // var precipitation= document.querySelector('.precipitation');
                let key = 'd57cae28ee4c23bd93ad7db81a78cb9c';
                let units= 'imperial';
                let lang = 'en'
                let url =`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${units}&appid=${key}`;
                fetch(url)
                    .then(resp=>{
                        if(!resp.ok) throw new Error(resp.statusText);
                        return resp.json()
                    })
                    .then(data=>{
                        showWeather(data);
                    })
                    .catch(console.err)
            }
            function showWeather(resp){
                console.log(resp);
                let row = document.querySelector('.weather.row');
                 row.innerHTML=resp.daily
                 .map((day, idx)=> {
                    if(idx <= 2){
                        let dt = new Date(day.dt *1000);
                    return `
                    <div class="column">
                    <div class="card">
                    <h5 class="card-title">${dt.toDateString()}</h5>
                    <img class="card-img gx2"
                    src="http://openweathermap.org/img/wn/${
                        day.weather[0].icon
                    }@4x.png"
                     alt="${day.weather[0].main}" style="width:100%">
                     <div class="card-body">
                      <p class="card-text">${day.weather[0].main}</p>
                      <p class="card-text"> High ${day.temp.max}&deg;F</p>
                      <p class="card-text">Low ${day.temp.min} &deg;F </p>
                      <p class="card-text"> High Feels Like ${day.feels_like.day}&deg;F</p>
                      <p class="card-text">Precipitation ${Math.round(day.pop * 100)}%</p>
                    </div>
                </div>
                </div>
                </div>`;
                    }
                 }).join(' ');

            }
        }
        addMarker({location:{lat: 35.1917349071713 , lng: -80.84283149706101},
            content:`<h2>This is Fredom Park</h2>`,

        });
        addMarker({location:{lat: 35.22787088862163, lng: -80.83644270894142},
            content:`<h2>This is First Ward Park </h2>` 
        });
        addMarker({location:{lat: 35.227912191079874 , lng: -80.84799669819279},
            content:`<h2>This is Romare Bearden Park </h2>`
        });
        addMarker({location:{lat: 35.22411275362518 , lng: -80.84683839686869},
            content:`<h2>This is The Green</h2>`
        });
        addMarker({location:{lat: 35.21927366698338, lng: -80.83877258285202},
            content:`<h2>This is Marshall Park </h2>`
        });
        addMarker({location:{lat: 35.45361821478076, lng: -80.9395969510643},
            content:`<h2>This is Lake Norman</h2>`
        });
        addMarker({location:{lat: 35.46769403801058, lng: -80.90225576865217},
            content:`<h2>This is Ramsey Creek Park </h2>`
        });
        addMarker({location:{lat: 35.60472818411696, lng: -80.76553937046916},
            content:`<h2>This is the quarry at Carrigan Farms </h2>`
        });
        addMarker({location:{lat: 35.30782868913804, lng: -80.7297389438208},
            content:`<h2>This is the Botanical Gardens at UNCC </h2>`
        });
        addMarker({location:{lat: 35.225898410181394, lng: -80.95619692199527},
            content:`<h2>This is the CLT Airport Overlook </h2>`
        });



    }
