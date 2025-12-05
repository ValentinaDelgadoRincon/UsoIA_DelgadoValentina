let personajesGlobales = [];
const API = "https://rickandmortyapi.com/api/character";

async function cargarPersonajes() {
    try {
        const respuesta = await fetch(API);
        const data = await respuesta.json();
        personajesGlobales = data.results;


        mostrarPersonajes(personajesGlobales);
    } catch (error) {
        console.error('Error al cargar personajes:', error);
    }
}

function mostrarPersonajes(personajes) {
    const contenedor = document.getElementById('caja');
    if (!contenedor) return;
    contenedor.innerHTML = '';

    personajes.forEach(personaje => {
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('tarjeta');

        const imageDiv = document.createElement('div');
        imageDiv.classList.add('image');

        const img = document.createElement('img');
        img.src = personaje.image;
        img.alt = personaje.name;

        imageDiv.appendChild(img);

        const contentDiv = document.createElement('div');
        contentDiv.classList.add('content');

        const nombre = document.createElement('h2');
        nombre.textContent = personaje.name;

        const estado = document.createElement('p');
        estado.textContent = "Estado: " + personaje.status;

        contentDiv.appendChild(nombre);
        contentDiv.appendChild(estado);

        tarjeta.appendChild(imageDiv);
        tarjeta.appendChild(contentDiv);

        contenedor.appendChild(tarjeta);
    });
}

function filtrarPersonajes(texto) {
    const textoLower = texto.toLowerCase();
    const filtrados = personajesGlobales.filter(personaje => personaje.name.toLowerCase().includes(textoLower));
    mostrarPersonajes(filtrados);
}

document.addEventListener('DOMContentLoaded', () => {

    cargarPersonajes();

    document.querySelector('.oprimir')?.addEventListener('click', () => {
        const filtro = document.getElementById('buscador').value;
        filtrarPersonajes(filtro);
    });

    document.getElementById('buscador')?.addEventListener('input', (e) => {
        filtrarPersonajes(e.target.value);
    });
});
