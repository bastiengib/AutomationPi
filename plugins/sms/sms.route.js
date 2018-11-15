'use strict'
var SmsCtrl = require('./sms.controller');
function SmsRoute() {
    var ctrl = new SmsCtrl();
    
    return [{ 
        method: 'GET', 
        path: '/SMS/BACK_HOME', 
        handler: function(request, h) {
            return ctrl.backHome();
        }
    }];
}
// on exporte en tant que constructeur pour le paramètre
module.exports = SmsRoute;