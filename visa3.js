//Upgift 1
//3. Visar de åtta första elementen i carsCollection

const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://127.0.0.1:27017';
const databaseName = 'productsdb';
const collectionName = 'carsCollection';

MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
	if( err ) {
		console.log('Could not connect! Error: ', err);
		return;
	}
	const productsdb = client.db(databaseName);
	console.log('We are connected to productsdb');
	const carsCollection = productsdb.collection(collectionName);

	let numCars = 8;
	let filter = {};
	carsCollection.find(filter).limit(numCars).toArray((err, docs) => {
		client.close();
		console.log('Connection closed.');
		if( err ) {
			console.log('Could not use query find: ', err);
			return;
		}
		console.log('The cars are: ', docs);
	})
})