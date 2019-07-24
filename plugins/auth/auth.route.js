'use strict'
var AuthCtrl = require('./auth.controller');
function AuthRoute() {
    var ctrl = new AuthCtrl();
    
    return [{ 
        method: 'POST', 
        path: '/auth/token', 
        handler: function(request, h) {
            var cmd = request.payload.route;
            var id = request.payload.id;
            var token = ctrl.getIftttAuth(cmd, id);
            return token;
        }
    }];
}
// on exporte en tant que constructeur pour le paramètre
module.exports = AuthRoute;