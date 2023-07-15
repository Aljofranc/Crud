// Obtener referencia a los elementos del DOM
const itemInput = document.getElementById('itemInput');
const addItemBtn = document.getElementById('addItemBtn');
const itemList = document.getElementById('itemList');
const container = document.querySelector('.container');
const toggleModeBtn = document.getElementById('toggleModeBtn');

toggleModeBtn.addEventListener('click', toggleMode);

function toggleMode() {
  container.classList.toggle('light-mode');
  container.classList.toggle('dark-mode');
}


// Función para actualizar la lista de compras en el DOM
function updateItemList() {
  itemList.innerHTML = '';
  const items = getItemsFromLocalStorage();
  items.forEach((item, index) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `${item} <button onclick="deleteItem(${index})">Eliminar</button>`;
    itemList.appendChild(listItem);
  });
}

// Función para obtener los items almacenados en LocalStorage
function getItemsFromLocalStorage() {
  return JSON.parse(localStorage.getItem('items')) || [];
}

// Función para guardar los items en LocalStorage
function saveItemsToLocalStorage(items) {
  localStorage.setItem('items', JSON.stringify(items));
}

// Función para agregar un nuevo ítem
function addItem() {
  const newItem = itemInput.value.trim();
  if (newItem !== '') {
    const items = getItemsFromLocalStorage();
    items.push(newItem);
    saveItemsToLocalStorage(items);
    itemInput.value = '';
    updateItemList();
  }
}

// Función para eliminar un ítem
function deleteItem(index) {
  const items = getItemsFromLocalStorage();
  items.splice(index, 1);
  saveItemsToLocalStorage(items);
  updateItemList();
}

// Asociar eventos a los elementos del DOM
addItemBtn.addEventListener('click', addItem);
itemInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addItem();
  }
});

// Cargar la lista de compras al cargar la página
window.addEventListener('DOMContentLoaded', updateItemList);
