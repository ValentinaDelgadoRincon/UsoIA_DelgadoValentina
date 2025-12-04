function obtener() {
    const contenedor = document.getElementById("caja");
    fetch(linkAPI)
        .then(response => response.json())
        .then(personajes => {

            personajes = personajes.results;

            setTimeout(() => {
                contenedor.textContent = "";

                personajes.forEach(personaje => {
                    const tarjeta = document.createElement("div");
                    tarjeta.className = "tarjeta";
                    const img = document.createElement("img");
                    img.src = personaje.image;
                    const h2 = document.createElement("h2");
                    h2.textContent = personaje.name;
                    const estado = document.createElement("p");
                    estado.textContent = "Estado: " + personaje.status;

                    tarjeta.append(img, h2, estado);
                    contenedor.appendChild(tarjeta);
                });
            }, 2000);
        });
};

function filtrar() {
    const contenedor = document.getElementById("caja");
    contenedor.textContent = "Cargando...";
    const filtro = document.getElementById("buscador").value;
    let linkAPIFiltrado = linkAPI + `?name=${filtro}`;

    fetch(linkAPIFiltrado)
        .then(response => response.json())
        .then(personajes => {

            personajes = personajes.results;

            setTimeout(() => {
                contenedor.textContent = "";

                personajes.forEach(personaje => {
                    const tarjeta = document.createElement("div");
                    tarjeta.className = "tarjeta";
                    const img = document.createElement("img");
                    img.src = personaje.image;
                    const h2 = document.createElement("h2");
                    h2.textContent = personaje.name;
                    const estado = document.createElement("p");
                    estado.textContent = "Estado: " + personaje.status;

                    tarjeta.append(img, h2, estado);
                    contenedor.appendChild(tarjeta);
                });
            }, 2000);
        });
}

const linkAPI = "https://rickandmortyapi.com/api/character";
obtener();
document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementsByClassName("oprimir")[0];
    button.addEventListener("click", filtrar);
});