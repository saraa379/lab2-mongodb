//Upgift 2
//lägga in 1000 dokument i en lokal MongoDB-databas  

const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://127.0.0.1:27017';
const databaseName = 'furnituredb';
const collectionName = 'furnitureCollection';


function generateProduct() {
	const color = ['red', 'blue', 'pink', 'black', 'grey', 
					'maroon', 'white', 'orange', 'green', 
					'violet', 'indigo', 'magenta', 'brown']
	const category = ['Yorkshire', 'Octavia', 'Ludvig', 'Isadora']
	const name = ['bed', 'table', 'chair', 'coffee table', 'coat stand',
					'cupboard', 'desk', 'wardrobe', 'bedside table', 'bookcase',
					'mirror', 'clock', 'dressing table', 'filling cabinet', 'tv stand',
					'sofa', 'sideboard', 'chair', 'coffee table', 'cupboard',
					'bookshelf', 'armchair', 'chest of drawers', 'stool']
	const condition = ['new', 'used']

	function randomElement(list) {
		let r = Math.random() * list.length;
		return list[Math.floor(r)];
	}

	let c = randomElement(color);
	let cat = randomElement(category);
	let n = randomElement(name);
	let con = randomElement(condition);
	return {
		namn: n,
		color: c,
		category: cat,
		model: Math.floor(Math.random() * 118) + 1900,
		condition: con,
		price: Math.floor(Math.random() * 10000) + 1000
	};
}

function getFurnitureList(number) {
	let carList = [];
	while( number > 0 ) {
		carList.push( generateProduct() );
		number--;
	}
	return carList;
}

//let cars = getCarList(10);
//console.log(cars);

MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
	if( err ) {
		console.log('Could not connect! Error: ', err);
		return;
	}
	const furnituredb = client.db(databaseName);
	console.log('We are connected to furnituredb');
	const furnitureCollection = furnituredb.collection(collectionName);

	//inserts 10 randomn cars into carsCollection
	let numFurniture = 1000;
	let furnitureList = getFurnitureList(numFurniture);
	furnitureCollection.insertMany(furnitureList, (err) => {
		if( err ) {
			console.log('Failed to insert data. ', err);
			client.close();
			return;
		}
		console.log('Inserted data. Closing client...');
		client.close();
	})
})