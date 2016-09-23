/**
 * Created by Biswa on 9/23/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passcodeModel = new Schema({
    userid:{
        type: String
    },
    accountnumber:{
        type: String
    },
    amount:{
        type: String
    },
    passcode:{
        type: String
    },
    expiry:{
        type: Date
    }
});

module.exports=mongoose.model('passcodes',passcodeModel);
