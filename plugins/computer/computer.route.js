'use strict'
var ComputerCtrl = require('./computer.controller');
function ComputerRoute() {
    var ctrl = new ComputerCtrl();
    
    return [{ 
        method: 'GET', 
        path: '/PC/POWER/ON', 
        handler: function(request, h) {
            return ctrl.powerOn();
        }
    },
    { 
        method: 'GET', 
        path: '/PC/POWER/OFF', 
        handler: function(request, h) {
            return ctrl.powerOff();
        }
    }];
}
// on exporte en tant que constructeur pour le paramètre
module.exports = ComputerRoute;