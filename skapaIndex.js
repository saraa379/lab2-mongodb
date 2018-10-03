//Upgift 3
//skapa collection för index 

const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://127.0.0.1:27017';
const databaseName = 'furnituredb';
const collectionName = 'furnitureCollection3';


MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
	if( err ) {
		console.log('Could not connect! Error: ', err);
		return;
	}
	const furnituredb = client.db(databaseName);
	console.log('We are connected to furnituredb');
	const furnitureCollection3 = furnituredb.collection(collectionName);

	//inserts indexes into collection
	furnitureCollection3.createIndex( { "namn": 1, "price": -1 }, (err) => {
		if( err ) {
			console.log('Failed to create index. ', err);
			client.close();
			return;
		}
		console.log('Created index. Closing client...');
		client.close();
	})
})