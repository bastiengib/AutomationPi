'use strict'
var ComputerCtrl = require('./computer.controller');
function ComputerRoute() {
    var ctrl = new ComputerCtrl();

    return [{ 
        method: 'POST', 
        path: '/PC/POWER/ON', 
        handler: function(request, h) {
            var token = request.payload.token;
            var id = request.payload.id;
            return ctrl.powerOn(id, token);
        }
    },
    { 
        method: 'POST', 
        path: '/PC/POWER/OFF', 
        handler: function(request, h) {
            var token = request.payload.token;
            var id = request.payload.id;
            return ctrl.powerOff(id, token);
        }
    }];
}
// on exporte en tant que constructeur pour le paramètre
module.exports = ComputerRoute;