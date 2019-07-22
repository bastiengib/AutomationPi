'use strict'
var AuthCtrl = require('./auth.controller');
function AuthRoute() {
    var ctrl = new AuthCtrl();
    
    return [{ 
        method: 'POST', 
        path: '/auth/ifttt', 
        handler: function(request, h) {
            var cmd = encodeURIComponent(request.payload.route)
            var token = ctrl.getIftttAuth(cmd);
            return token;
        }
    }];
}
// on exporte en tant que constructeur pour le paramètre
module.exports = AuthRoute;