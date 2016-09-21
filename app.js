/*
* Created by Biswa on 9/21/2016.
*/
var express =require('express');
var app=express();
var port = process.env.PORT || 3000;
var userRouter=express.Router();

/* Yodlee Files*/
var path = require('path');
var bodyparser= require('body-parser');
var globalApp = require(path.resolve('Global.js'));
var configApp = require(path.resolve('Config.js'));
var request = require('request');
var app= express();
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());

app.use('/riseapi',userRouter);


userRouter.route('/userlogin')
    .post(function (req,res) {
console.log("req "+req.body.username);
     userLogin(req.body.username,req.body.password,res);

    });

app.get('/', function (req,res) {
    res.send('Welcome to Rise Hackathon...');
});

app.listen(port, function () {
    console.log('Gulp is running my app on Port:' + port);

});

/* User Login Web API*/
function userLogin(username,password,resp)
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
                //console.log("form"+JSON.stringify(response));
                if (error) {
                    resp.json({ "success" : "false"});
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
                        resp.json({ "success" : "false"});
                    }
                    //Invoking user login API
                    request(
                        globalApp.properties.options,
                        function (error, response, body) {

                            if (error) {
                                resp.json({ "success" : "false"});
                                console.log("error");
                                return console.log('Error in User login: ',
                                    error);

                            }
                            if (!error && response.statusCode == 200) {

                                //var jsonObj = JSON.parse(body);
                                console.log("success");
                                console.log(username);
                                globalApp.properties.userSessionToken = body.user.session.userSession;

                                resp.json({ "success" : "true"});
                            }

                        })
                }
            })

}