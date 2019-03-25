var PushBullet = require('pushbullet');
var config = require('./pushbullet.config');


function Push (server) {
    var pusher = new PushBullet(config.token);

    // functions
    this.me = function() {
        pusher.me(function(err, response) {
            this.iden = err ? undefined : response.iden;
        }.bind(this));
    };

    this.awake = function() {
        pusher.devices(function(error, response) {
            if (!response) return;
            var assistantDevice = response.devices.filter(function(device) { return device.nickname === "pi-listener" });
            // on regarde si un "device" pour assistant-plugins existe, sinon on le crée
            if (assistantDevice.length===0) {
                pusher.createDevice({nickname:'pi-listener'}, function(error, response) {});
            } else {
                pusher.note(assistantDevice[0].iden, 'Note', 'Wake up pushbullet', function(error, response) {
                    try {
                        pusher.dismissPush(response.iden, function(error, response) {
                            pusher.deletePush(response.iden, function(error, response) {})
                        });
                    } catch (e) {
                        console.log("[Response] Dismiss wake-up: ", e);
                    }
                });
            }
        });
    };

    // end-functions

    this.me();
    this.awake();
    setInterval(this.awake, 3600000);
    
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
                                try {
                                    var result =JSON.parse(data.payload);
                                    if (result.sendSMS) {
                                        result.options.source_user_iden = this.iden;
                                        pusher.sendSMS(result.options, function(error, response) {
                                            if (error) {
                                                console.log("[send SMS] :",error);
                                            }
                                        });
                                    }
                                } catch (e) {
                                    console.log("[Response]try parse: ", e);
                                }
                                pusher.dismissPush(push.iden);
                            }.bind(this));
                        }
                    }.bind(this))
                }
            }.bind(this))
        }
    }.bind(this));
};

module.exports = Push;