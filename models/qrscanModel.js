/**
 * Created by Biswa on 9/23/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var qrscanModel = new Schema({
    userid:{
        type: String
    },
    accountnumber:{
        type: String
    },
    destuserid:{
        type: String
    },
    destaccountnumber:{
        type: String
    },
    amount:{
        type: String
    },
    status:{
        type: String
    }
});

module.exports=mongoose.model('qrscans',qrscanModel);
