'use strict';
var postgres = require('./config/postgresql')
var pg = require('knex')({
    client: 'pg',
    connection: postgres
});
/* 
 * Constructeur
 */
function Db () {
    this.connection = pg; 
}

// on exporte en tant que constructeur pour le paramètre
module.exports = Db;