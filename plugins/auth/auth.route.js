'use strict'
var AuthCtrl = require('./auth.controller');
function AuthRoute() {
    var ctrl = new AuthCtrl();
    
    return [{ 
        method: 'GET', 
        path: '/auth/ifttt', 
        handler: function(request, h) {
            var cmd = encodeURIComponent(request.payload.user)
            var token = ctrl.getIftttAuth(cmd);
        }
    }];
}
// on exporte en tant que constructeur pour le paramètre
module.exports = AuthRoute;