/**
 * This one passes all three tests.
 */
var mongodb = require('mongodb');
var uri = 'mongodb://localhost:27017/movies';

/**
 * This is useless
 *  mongodb.MongoClient.connect(uri, function(error, db){
 *  if (error){ console.log(error); process.exit(1); } }  
*/

exports.insert = function(db, doc, callback) {
    // You are rewriting the doc that's going to come from parameeters.
    // var doc = { "title": "Star Wars", "year": 1977, "director": "George Lucas" };
    // We need the result to send back data
    db.collection('movies').insert(doc, function(error, result) { 
        if (error){
          //console.log(error);
          //process.exit(1);
          // How is the test.js going to know?
          callback(error);
        }
        // We use async code not serial, so gotto put stuff in the deepest callback.        
        // Without sending doc, how will the test know.
        callback(null, result);
    });
  // not here
  //callback(null, result);
};


exports.byDirector = function(db, director, callback) {
    // Use the params, man!
    //var query = {director: 'George Lucas'};
    var query = { director : director };
    db.collection('movies').find(query).sort({'title' : 1}).toArray(function (error, docs) {

        if (error){
          //console.log(error);
          //process.exit(1);
          callback(error);
        }

        /* Unnecessary
        console.log('Found Docs:');
        docs.forEach(function(doc){
            console.log(JSON.stringify(doc));
        });
        */
        
        // You use too much synchronous style code, while we are now dealing with async
        // code.
        callback(null, docs);
    }); 
    //callback(null, docs);
};

// Happy to help
// Rj - https://github.com/ramachandrajr
