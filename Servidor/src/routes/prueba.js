const fetch = require('node-fetch');
const items = require('../models/items');

fetch('http://localhost:4000/api/items/nombresCrearInventario')
  .then(response => response.json())
  .then(inventario => {
      inventario.map(item=>{
        console.log(item);
      })
  })