
var config = require('konphyg')(__dirname + '../../config');
var dbConfig = config('db');
var db = require("mongojs").connect(dbConfig.url, dbConfig.collections);

/*
 * GET widget.
 */
exports.widget = function(req, res){
    getSettings(req, function(data){
        res.render('widget', { settings: data });
    })
};

/*
 * GET settings.
 */
exports.settings = function(req, res){
    getSettings(req, function(data){
        res.render('settings', { settings: data });
    })
};

/*
 * POST settings update.
 */
exports.settingsupdate = function(req, res){
    db.settings.update({key: req.key}, { $set: { settings: req.body.settings }},  { upsert: true }, function(err, saved) {
        res.end();
    });
};

function getSettings(req, callback){
    db.settings.findOne({key: req.key}, function(err, result) {
        if( err || !result) {
            callback('[]');
        }
        else{
            console.log(result.settings);
            callback(result.settings);
        };
    });
}