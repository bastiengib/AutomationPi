var PushBullet = require('pushbullet');
var config = require('./pushbullet.config');

function Push (server) {
    var pusher = new PushBullet(config.token);
    var stream = pusher.stream();
    stream.connect();
    stream.on('error', function(error) { console.log("[pushbullet] Erreur de connexion : ",error) });
    
    stream.on('tickle', function(tickle) {
        if (tickle==="push") {
            pusher.history({limit:1}, function(error, response) {
                if (error) {
                    console.log("[pushbullet] Erreur: ",error);
                } else {
                    response.pushes.forEach(function(push) {
                        if (push.sender_name === "IFTTT" && push.title === "AutomationPi" && !push.dismissed) {
                            console.log("[assistant] Commande reçue: "+push.body);
                            server.inject('/'+push.body).then(function(data) {
                                pusher.dismissPush(push.iden);
                            });
                        }
                    })
                }
            })
        }
    });
};
module.exports = Push;