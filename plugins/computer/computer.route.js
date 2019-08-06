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
            var result =  ctrl.powerOn(id, token);

            return h.response(result.status).code(result.code);
        }
    },
    { 
        method: 'POST', 
        path: '/PC/POWER/OFF', 
        handler: function(request, h) {
            var token = request.payload.token;
            var id = request.payload.id;
            var result =  ctrl.powerOff(id, token);

            return h.response(result.status).code(result.code);
        }
    }];
}
// on exporte en tant que constructeur pour le paramètre
module.exports = ComputerRoute;