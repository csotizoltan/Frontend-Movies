document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("betolt").addEventListener("click", () => {
        betolt();
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

                let button = document.createElement("button");
                document.getElementById("filmAdatok").appendChild(button);
                button.innerHTML = "reset";
                button.addEventListener("click", () => {
                    console.log("Reset gombra kattintva");
                    document.getElementById("filmAdatok").style.display = "none";
                });

                document.getElementsByTagName('a')[0].addEventListener('click', (e) => {
                    e.preventDefault();
                });
                document.getElementsByTagName('a')[1].addEventListener('click', (e) => {
                    e.preventDefault();
                });
                document.getElementById("filmAdatok").style.display = "block";

            });
            


            /*

            https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
            
            const movie = document.createElement("div"); // create a new div element
            const newContent = document.createTextNode(element.title + " (" + element.year + ")"); // and give it some content
            //var br = document.createElement("br"); // create a new breakline element
            //movie.appendChild(br); // add breakline
            movie.appendChild(newContent); // add the text node to the newly created div
            const currentDiv = document.getElementById("div1"); // add the newly created element and its content into the DOM
            document.body.insertBefore(movie, currentDiv);
            
            movie.addEventListener('click', (e) => {
                console.log("Kattintva:" + element.title);
                filmAdatok.innerHTML += "<div>" + element.title + "</div>";
                filmAdatok.innerHTML += "<div>" + element.year + "</div>";
                filmAdatok.innerHTML += "<div>" + "<a href='adat.com'>" + element.cast + "</a></div>";
                filmAdatok.innerHTML += "<div>" + element.genres + "</div></br>";
            });
            */


        });
    }).catch(e => {
        document.getElementById("error").innerHTML = e.message;
    }).finally(() => {
        console.log("Betöltés befejezve");
    })
};



// Csak egyszer töltödjön be a lista
// filmAdatok div méretét dinamikusan változtassa
// Miért egyoldalas JS alkalmazés?
// Hogyan lehet a forEarch-től külön function-be tenni a megjelenítési kódokat

// JavaScript HTML DOM - Changing CSS
// https://www.w3schools.com/js/js_htmldom_css.asp