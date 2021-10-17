document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("btn_betolt").addEventListener("click", () => {
        betolt();
        filmLista.innerHTML = ''; // Megakadályozza, hogy a filmlista többször megjelenjen
    });
});


function betolt() {
    let fetchEredmeny = fetch("movies.json").then((data) => {
        if (data.ok) {
            return data.json();
        } else {
            return Promise.reject (
                new Error("A szerver " + data.status + " hibát adott.")
            );
        }
}).then(adat => {
        console.log(adat);
        adat.sort((b, a) => {
            return a.year - b.year
        }).forEach(element => {

            // Filmcímek és kiadás évének kiírása
            let movies = document.createElement("div");
            movies.innerHTML = element.title + " (" + element.year + ")";
            document.getElementById("filmLista").appendChild(movies);

            
            // Filmcím kattintási eseménye
            movies.addEventListener("click", (e) => {
                console.log("Kattintva:" + element.title);

                
                // filmAdatok: Filmcím és kiadás évének kiírása
                filmAdatok.innerHTML =  element.title + "<br>" + element.year + "<br>";

                // filmAdatok: szereplők kiírása
                element.cast.forEach(element => {
                    let cast = document.createElement("a");
                    cast.innerHTML += "<a href='#'>" + element + "</a>" + " ";
                    document.getElementById("filmAdatok").appendChild(cast);

                    cast.addEventListener("click", (e) => {
                        console.log("Szereplőre kattintva: " + element);
                        
                        filmLista.innerHTML = "";
                        e.preventDefault();
        
                        // szűrést végez a teljes filmlistán a adott szereplő neve alapján
                        adat
                        .filter(e => e.cast.includes(element))
                        .sort((b, a) => {
                            return a.year - b.year
                        })
                        // majd megjeleníti a szűrt film listát
                        .forEach(element => {
                            let movies = document.createElement("div");
                            movies.innerHTML = element.title + " (" + element.year + ")";
                            document.getElementById("filmLista").appendChild(movies);
                        });
                    });
                })
                
                
                // filmAdatok: üres sor a szereplők után
                let br = document.createElement("br");
                br.innerHTML += "<a href='#'>" + element + "</a>" + " ";
                document.getElementById("filmAdatok").appendChild(br);
                
                
                // filmAdatok: műfaj kiírása
                element.genres.forEach(element => {
                    let genres = document.createElement("a");
                    genres.innerHTML += "<a href='#'>" + element + "</a>" + " ";
                    document.getElementById("filmAdatok").appendChild(genres);

                    genres.addEventListener("click", (e) => {
                        console.log("Műfajra kattintva: " + element);
                        
                        filmLista.innerHTML = "";
                        e.preventDefault();
        
                        // szűrést végez a teljes filmlistán a adott műfaj alapján
                        adat
                        .filter(e => e.genres.includes(element))
                        .sort((b, a) => {
                            return a.year - b.year
                        })
                        // majd megjeleníti a szűrt film listát
                        .forEach(element => {
                            let movies = document.createElement("div");
                            movies.innerHTML = element.title + " (" + element.year + ")";
                            document.getElementById("filmLista").appendChild(movies);
                        });           
                    });
                })
                
                // filmAdatok: üres sor a műfaj után
                let br2 = document.createElement("br");
                br2.innerHTML += "<a href='#'>" + element + "</a>" + " ";
                document.getElementById("filmAdatok").appendChild(br2);


                // filmAdatok: reset gomb megjelenítése
                let btn_reset = document.createElement("button");
                document.getElementById("filmAdatok").appendChild(btn_reset);
                btn_reset.innerHTML = "reset";

                btn_reset.addEventListener("click", () => {
                    console.log("Reset gombra kattintva");
                    
                    // reset esemény hatására elrejti a filmlistát és a film adatokat
                    document.getElementById("filmAdatok").style.display = "none";
                    document.getElementById("filmLista").style.display = "none";
                    //betolt();
                    location.reload(false);
                });

                // megjeleníti a film adatokat
                //document.getElementById("filmLista").style.display = "block";
                document.getElementById("filmAdatok").style.display = "block";

            });

        });
    }).catch(e => {
        document.getElementById("error").innerHTML = e.message;
    }).finally(() => {
        console.log("Betöltés befejezve");
        // megjeleníti a filmlistát
        document.getElementById("filmLista").style.display = "block";
    })
};