//Upgift 1
//2.Tar bort alla dokument i en carsCollection

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

	carsCollection.deleteMany((err) => {
		if( err ) {
			console.log('Failed to delete data. ', err);
			client.close();
			return;
		}
		console.log('Deleted all data. Closing client...');
		client.close();
	})
})