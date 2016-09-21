var path = require('path');
var siteApp = require(path.resolve('aggregation/SiteApp.js'));
var accountApp = require(path.resolve('pfm/AccountApp.js'));
var statementsApp = require(path.resolve('pfm/StatementsApp.js'));
var transactionsApp = require(path.resolve('pfm/TransactionsApp.js'));
var holdingsApp = require(path.resolve('pfm/HoldingsApp.js'));
var derivedApp = require(path.resolve('pfm/PortfolioApp.js'));
var globalApp = require(path.resolve('Global.js'));
var configApp = require(path.resolve('Config.js'));
var addSiteAccount = require(path.resolve('aggregation/AddSiteAccount.js'));
var addProviderAccount = require(path.resolve('aggregation/AddProviderAccount.js'));
var addProviderAccountMFA = require(path.resolve('aggregation/AddProviderAccountMFA.js'));
var addSiteAccountMFA = require(path
		.resolve('aggregation/AddSiteAccountMFA.js'));
var request = require('request');
var readlineSync = require('readline-sync');
var async = require('async');
