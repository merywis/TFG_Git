const express = require('express');
const router = express.Router(); //ens crea un objecte per poder definir rutes del servidor; està relacionat amb darrera comanda **

const mysqlConnection  = require('../database.js');

// GET all Employees
/*
router.get('/', (req, res) => {
  mysqlConnection.query('SELECT * FROM quadres', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });  
});*/

module.exports = router; //** 
