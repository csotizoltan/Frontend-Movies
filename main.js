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

            let movies = document.createElement("div");
            movies.innerHTML = element.title + " (" + element.year + ")";
            document.getElementById("filmLista").appendChild(movies);

            movies.addEventListener("click", (e) => {
                console.log("Kattintva:" + element.title);

                filmAdatok.innerHTML =  element.title + "<br>" 
                                        + element.year + "<br>" 
                                        + "<a href='adat.com'>" + element.cast + "</a>" + "<br>" 
                                        + "<a href='adat.com'>" + element.genres + "</a>" + "<br>";

                let btn_reset = document.createElement("button");
                document.getElementById("filmAdatok").appendChild(btn_reset);
                btn_reset.innerHTML = "reset";
                btn_reset.addEventListener("click", () => {
                    console.log("Reset gombra kattintva");
                    document.getElementById("filmAdatok").style.display = "none";
                    document.getElementById("filmLista").style.display = "none";
                    betolt();
                });

                document.getElementsByTagName('a')[0].addEventListener('click', (e) => {
                    e.preventDefault();
                    let szereplo = element.cast;
                    console.log("Szereplő: " + szereplo);

                    let arrayOfSzereplo = szereplo.toString().split(',');

                    //filmLista.innerHTML.textContent = ''
                    filmLista.innerHTML = "";
                    //document.getElementById("filmLista").style.fontSize  = "1.0em";

                    

                    adat
                    .filter(e => e.cast.includes(arrayOfSzereplo[0]))
                    .sort((b, a) => {
                        return a.year - b.year
                    })

                    /*
                    .filter(e => e.cast.includes((e) => {
                        for (let i = 0; i < arrayOfSzereplo.length; i++) {
                            arrayOfSzereplo[i];
                        }
                    }))
                    */

                    
                    .forEach(element => {
                        let movies = document.createElement("div");
                        movies.innerHTML = element.title + " (" + element.year + ")";
                        document.getElementById("filmLista").appendChild(movies);
                    });
                });

                document.getElementsByTagName('a')[1].addEventListener('click', (e) => {
                    let mufaj = element.genres;
                    console.log("Műfaj: " + mufaj);

                    let arrayOfMufaj = mufaj.toString().split(',');

                    filmLista.innerHTML = "";

                    e.preventDefault();

                    adat
                    .filter(e => e.genres.includes(arrayOfMufaj[0]))
                    //.filter(e => e.genres.includes(mufaj.toString()))
                    .sort((b, a) => {
                        return a.year - b.year
                    })
                    .forEach(element => {
                        let movies = document.createElement("div");
                        movies.innerHTML = element.title + " (" + element.year + ")";
                        document.getElementById("filmLista").appendChild(movies);
                    });
                    
                });
                document.getElementById("filmAdatok").style.display = "block";

            });

        });
    }).catch(e => {
        document.getElementById("error").innerHTML = e.message;
    }).finally(() => {
        console.log("Betöltés befejezve");
        document.getElementById("filmLista").style.display = "block";
    })
};