/**
 * Created by Ashish on 9/20/2016.
 */
var express =require('express');
var mongoose = require('mongoose');
var path = require('path');
var bodeyparser= require('body-parser');
var globalApp = require(path.resolve('Global.js'));
var configApp = require(path.resolve('Config.js'));
var request = require('request');
var port = process.env.port||2000;
var app= express();
app.use(bodeyparser.urlencoded({extended:true}));
app.use(bodeyparser.json());

/*Mongodb*/
var db = mongoose.connect('mongodb://dbrise:dbrise@ds035796.mlab.com:35796/dbrise16');
var passcode=require('./models/passcodeModel');
var qrscan=require('./models/qrscanModel');

var router= express.Router();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
next();
});
app.use('/api',router);


router.route('/login')
    .post(function (req,res) {
console.log("req "+req.body.username);
     cobracndLogin(req.body.username,req.body.password,res);

    });
router.route('/accounts')
    .post(function (req,res) {
        console.log("req "+req.body.usertoken);
        accountDetails(req.body.usertoken,req.body.cobrandtoken,res);

    });




app.get('/',function (req,res) {
    res.send("WELCOME TO RISE HACKATHON...");
});

app.listen(port,function () {
   console.log("running on port :"+ port);
});


function cobracndLogin(username,password,resp)
{

    globalApp.properties.options.url = configApp.properties.baseURL
        + globalApp.properties.cobrandLoginURL;
    console.log(configApp.properties.baseURL);
    console.log(globalApp.properties.cobrandLoginURL);
    globalApp.properties.options.method = globalApp.properties.post;
    globalApp.properties.options.headers = globalApp.properties.headers;
    globalApp.properties.options.json = configApp.properties.cobrandParam;




        request(
            globalApp.properties.options,

            function (error, response, body) {

                if (error) {
                    resp.json({ "success" : "false","cobrandSession":"","userSession":""});
                    return console.log('Error in Cobrand login: ', error);
                    console.log("error");

                }
                if (!error && response.statusCode == 200) {

                    //Setting input parameters for user login API call
                    globalApp.properties.cobSessionToken = body.session.cobSession;
                    globalApp.properties.options.url = configApp.properties.baseURL + globalApp.properties.userLoginURL;

                    globalApp.properties.options.method = globalApp.properties.post;
                    globalApp.properties.headers.Authorization = 'cobSession='
                        + globalApp.properties.cobSessionToken;

                    if(username=="ashish" && password=="ashish") {
                        console.log(username);

                        globalApp.properties.options.json = configApp.properties.userParam1;
                    }
                    else if(username=="sonali" && password=="sonali")
                    {console.log(username);
                        globalApp.properties.options.json = configApp.properties.userParam2;
                    }
                    else if(username=="biswa" && password=="biswa")
                    {console.log(username);
                        globalApp.properties.options.json = configApp.properties.userParam3;
                    }
                    else if(username=="kishore" && password=="kishore")
                    {console.log(username);
                        globalApp.properties.options.json = configApp.properties.userParam4;
                    }
					else
					{
						resp.json({ "success" : "false","cobrandSession":"","userSession":""});
					}
                    //Invoking user login API
                    request(
                        globalApp.properties.options,
                        function (error, response, body) {

                            if (error) {
                                resp.json({ "success" : "false","cobrandSession":"","userSession":""});
                                return console.log('Error in User login: ',
                                    error);

                            }
                            if (!error && response.statusCode == 200) {

                                //var jsonObj = JSON.parse(body);
                                console.log(username);
                                globalApp.properties.userSessionToken = body.user.session.userSession;

                                resp.json({ "success" : "true","cobrandSession":globalApp.properties.cobSessionToken,"userSession":globalApp.properties.userSessionToken});
                            }

                        })
                }
            })


}

function accountDetails(usertoken,cobrandtoken,resp){
    //Setting the input parameters for Account API Call
    globalApp.properties.options.url = configApp.properties.baseURL + globalApp.properties.accountURL;
    globalApp.properties.options.method = globalApp.properties.get;
    globalApp.properties.options.headers.Authorization = 'userSession='+usertoken+', cobSession='+cobrandtoken;
    //Invoking the Account API Call

    request(globalApp.properties.options,  function  (error,  response,  body)  {

        console.log("error "+error);
        console.log("response "+response);
        console.log("body "+body);
        if (error) {
            resp.json({ "success" : "false","accounts":""});
            return console.log('Error in Cobrand login: ', error);
            console.log("error");

        }

                if  (!error  &&  response.statusCode  ==  200) {
                  //  var gson = JSON.parse(body);
                    console.log(body);
                   // for (var i = 0; i < gson.account.length; i++) {
                   //     console.log(gson.account[i].id + ' - ' + gson.account[i].CONTAINER + ' - ' + gson.account[i].accountName + ' - ' + (gson.account[i].balance !== undefined ? gson.account[i].balance.amount : '0'));
                   // }
                    resp.json(response.body);
                }else {
                    resp.json(response);
                }

    })
}

router.route('/getPasscode')
    .get(function (req,res) {
        var query = req.query;
        //var responsejson={hello:"this is my api"};
        passcode.findOne(query,function(err,passcode){
            if(err)
                console.log(err);
            else{
            	if(passcode){
            		res.json(passcode);
            	}
            	else{
            		res.json({"_id":""});
            	}
            }
        });
        //res.json(responsejson);
    });

//delete post code

router.route('/deletePasscode')
    .get(function (req,res) {
        var query = req.query;
        //res.json(responsejson);
        passcode.find(query,function(err,passcode){
            if(err)
                console.log(err);
            else
            {
                res.json(passcode);
                /* delete passcode after sending to customer*/
            }

        }).remove().exec();
    });


router.route('/addPasscode')
    .post(function(req, res){

        req.body.passcode=Math.floor(Math.random()*90000)+10000; /*Random 5 digit passcode*/
        var d1 = new Date();
        var d2= new Date(d1);
        d2.setHours(d1.getHours()+2);
        req.body.expiry=d2; /*Random 5 digit passcode*/
        var pc = new passcode(req.body);
        pc.save();
        res.send(pc);
    });

router.route('/getQrcode')
    .get(function (req,res) {
        var query = req.query;
        //var responsejson={hello:"this is my api"};
        qrscan.findOne(query,function(err,qrscan){
            if(err)
                console.log(err);
            else{
            	if(qrscan){
            		res.json(qrscan);
            	}
            	else{
            		res.json({"_id":""});
            	}
            }
        });
        //res.json(responsejson);
    });

router.route('/deleteQrcode')
    .get(function (req,res) {
        var query = req.query;
        //res.json(responsejson);
        qrscan.find(query,function(err,qrscan){
            if(err)
                console.log(err);
            else
                res.json(qrscan);
        }).remove().exec();
    });


router.route('/addQrcode')
    .post(function(req, res){

        req.body.status="Active";
        var qr = new qrscan(req.body);
        qr.save();
        res.send(qr);
    });
