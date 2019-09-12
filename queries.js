/* Add all the required libraries*/

'use strict';

var mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    Listing = require('./ListingSchema.js'), 
    config = require('./config');

/* Connect to your database using mongoose - remember to keep your key secret*/

//	mongoose.connect(config.db.uri);
	mongoose.connect(config.db.uri, { useNewUrlParser: true });


// ---------------------------------------------------------------------- //

/* Fill out these functions using Mongoose queries*/
//Check out - https://mongoosejs.com/docs/queries.html


var findLibraryWest = function() {
  /* 
    Find the document that contains data corresponding to Library West,
    then log it to the console. 
   */
   
	Listing.find({ name: 'Library West' }, function(err, libraryWest) 
	{
		if (err) { throw err; }
		
		console.log(libraryWest);
	});
   
};

// ---------------------------------------------------------------------- //

var removeCable = function() {
  /*
    Find the document with the code 'CABL'. This cooresponds with courses that can only be viewed 
    on cable TV. Since we live in the 21st century and most courses are now web based, go ahead
    and remove this listing from your database and log the document to the console. 
   */
   
   
   var tvCable = { code: 'CABL' };
   
   
   Listing.find(tvCable, function(err,cabl)
   {
   		if(err) { throw err; }
   		console.log(cabl);
   		
   		Listing.deleteOne(tvCable, function(err, cableTV)
   		{
   			if (err) {throw err; }
			console.log('\nDeletion success.\n');
   		});
   });

};

// ---------------------------------------------------------------------- //

var updatePhelpsLab = function() {
  /*
    Phelps Lab address is incorrect. Find the listing, update it, and then 
    log the updated document to the console. 
    
    Correct Address: 1953 Museum Rd, Gainesville, FL 32603

   */

	var condition = { name: 'Phelps Laboratory' };
	var updateLab = { address: '1953 Museum Rd, Gainesville, FL 32603' };

	Listing.findOneAndUpdate(condition, updateLab, {new: true}, function(err, pLab)
	{
		if (err) throw err;
		console.log('\nListing updated.\n');
		console.log(pLab);
	});

/*
	This did not work for me, await gave error and wouldn't run at all
		
//	let newThing = await Listing.findOneAndUpdate(condition, update, {new: true});
	let newThing = Listing.findOneAndUpdate(condition, update, {new: true});
	console.log(newThing);
*/
	

};

// ---------------------------------------------------------------------- //

var retrieveAllListings = function() {
  /* 
    Retrieve all listings in the database, and log them to the console. 
   */

	var conditionT = { code: { $exists: true } };
	Listing.find(conditionT, function(err, allList)
	{
		if (err) throw err;
		
		// maxArrayLength: null doesn't work with console.log

		// works but is uggo
		//console.dir(allList, {'maxArrayLength': null});

		// yay!
		console.log('\n\n === BIG LIST === \n\n');
		allList.forEach(item => console.log(item));
	});

};

// ---------------------------------------------------------------------- //

findLibraryWest();
removeCable();
updatePhelpsLab();
retrieveAllListings();
