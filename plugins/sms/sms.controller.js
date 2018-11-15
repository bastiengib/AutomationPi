'use strict';

/* 
 * Constructeur
 */
function Sms () {
    this.config = require('./sms.config');
}

Sms.prototype.backHome = function () {
    console.log("[AutomationPi]: Send a sms : i'm back");
    
    return {
        sendSMS: true,
        options: {
            source_user_iden: undefined,              // The user iden of the user sending this message
            target_device_iden: this.config.sender_iden, // The iden of the device corresponding to the phone that should send the SMS
            conversation_iden: this.config.phone_receiver_number,       // Phone number to send the SMS to
            message: 'Bien arrivé, bisous'                           // The SMS message to send
        }
    };
}


// on exporte en tant que constructeur pour le paramètre
module.exports = Sms;