const API_URL = 'https://693840c34618a71d77cf8d8d.mockapi.io/tareas'; 

//CARGA INICIAL DE TAREAS (GET)

async function loadTasks() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Error al cargar las tareas.');
        
        const tasks = await response.json();
        
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = ''; // Limpia la lista antes de cargar
        
        tasks.forEach(task => {
            // Asumiendo que MockAPI devuelve 'name' y 'completed'
            renderTask(task.name, task.id, task.completed);
        });
    } catch (error) {
        console.error('Fallo en la carga de tareas:', error);
        alert('No se pudieron cargar las tareas desde el servidor. Revisa tu consola.');
    }
}

// Llama a la función de carga al iniciar
document.addEventListener('DOMContentLoaded', loadTasks);


//AGREGAR NUEVA TAREA (POST) 

async function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Por favor, ingresa una tarea.');
        return;
    }

    try {
        const newTask = {
            name: taskText,
            completed: false 
        };

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTask)
        });

        if (!response.ok) throw new Error('Error al agregar la tarea.');

        const addedTask = await response.json();
        // Renderiza la tarea con el ID que asignó la API
        renderTask(addedTask.name, addedTask.id, addedTask.completed); 
        
        taskInput.value = ''; 
        
    } catch (error) {
        console.error('Fallo al agregar tarea:', error);
        alert('No se pudo guardar la tarea en el servidor.');
    }
}


//MARCAR/DESMARCAR TAREA (PUT/PATCH)

async function toggleTaskCompletion(taskId, currentStatus, listItem) {
    const newStatus = !currentStatus;

    try {
        const response = await fetch(`${API_URL}/${taskId}`, {
            method: 'PUT', // Actualiza el recurso completo
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ completed: newStatus })
        });

        if (!response.ok) throw new Error('Error al actualizar el estado.');

        // Actualiza el DOM y el dataset si fue exitoso
        if (newStatus) {
            listItem.classList.add('completed');
        } else {
            listItem.classList.remove('completed');
        }
        listItem.dataset.completed = newStatus;

    } catch (error) {
        console.error('Fallo al actualizar el estado:', error);
        alert('No se pudo actualizar el estado de la tarea en el servidor.');
    }
}


//ELIMINAR TAREA (DELETE) 

async function deleteTask(taskId, listItem) {
    try {
        const response = await fetch(`${API_URL}/${taskId}`, {
            method: 'DELETE'
        });

        if (!response.ok) throw new Error('Error al eliminar la tarea.');

        // Elimina el elemento del DOM
        listItem.remove();

    } catch (error) {
        console.error('Fallo al eliminar tarea:', error);
        alert('No se pudo eliminar la tarea en el servidor.');
    }
}


//RENDERIZADO DE LA TAREA (DOM)

function renderTask(text, id, isCompleted = false) {
    const taskList = document.getElementById('taskList');
    const listItem = document.createElement('li');
    
    // Almacena el ID de la API y el estado en el elemento
    listItem.dataset.taskId = id;
    listItem.dataset.completed = isCompleted; 
    
    if (isCompleted) {
        listItem.classList.add('completed');
    }

    const taskSpan = document.createElement('span');
    taskSpan.textContent = text;
    listItem.appendChild(taskSpan);

    const actionsDiv = document.createElement('div');
    actionsDiv.classList.add('actions');

    // Botón para Marcar como Completa
    const completeBtn = document.createElement('button');
    completeBtn.classList.add('complete-btn');
    completeBtn.textContent = 'Completar'; 
    completeBtn.onclick = function() {
        const taskId = listItem.dataset.taskId;
        const currentStatus = listItem.dataset.completed === 'true'; 
        
        toggleTaskCompletion(taskId, currentStatus, listItem);
    };

    // Botón para Eliminar
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.textContent = 'Eliminar'; 
    deleteBtn.onclick = function() {
        deleteTask(listItem.dataset.taskId, listItem);
    };

    actionsDiv.appendChild(completeBtn);
    actionsDiv.appendChild(deleteBtn);
    
    listItem.appendChild(actionsDiv);
    taskList.appendChild(listItem);
}


//FUNCIONALIDAD DE BÚSQUEDA ---

function searchTasks() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const taskList = document.getElementById('taskList');
    const tasks = taskList.getElementsByTagName('li');

    for (let i = 0; i < tasks.length; i++) {
        const taskText = tasks[i].querySelector('span').textContent.toLowerCase();
        
        if (taskText.includes(searchInput)) {
            tasks[i].style.display = 'flex';
        } else {
            tasks[i].style.display = 'none';
        }
    }
}