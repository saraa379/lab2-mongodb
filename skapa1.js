//Upgift 1
//1.Skapar slumpmässiga 10st dokument och lägger till 
//dem i carsCollection

const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://127.0.0.1:27017';
const databaseName = 'productsdb';
const collectionName = 'carsCollection';


function generateProduct() {
	const color = ['red', 'blue', 'pink', 'black', 'grey', 
					'maroon', 'white', 'orange', 'green', 
					'violet', 'indigo', 'magenta', 'brown']
	const category = ['Volvo', 'Toyota', 'Ford', 'Tesla', 'BMW',
					'Audi', 'Cadillac', 'Chevrolet', 'Dodge',
					'FIAT', 'Hyundai', 'Jeep', 'KIA', 'Nissan']
	const name = ['passenger car', 'utility vehicle', 'truck', 
					'bus', 'SUV', 'motorcycle']
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
		price: Math.floor(Math.random() * 200000) + 10000
	};
}

function getCarList(number) {
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
	const productsdb = client.db(databaseName);
	console.log('We are connected to productsdb');
	const carsCollection = productsdb.collection(collectionName);

	//inserts 10 randomn cars into carsCollection
	let numCars = 10;
	let carList = getCarList(numCars);
	carsCollection.insertMany(carList, (err) => {
		if( err ) {
			console.log('Failed to insert data. ', err);
			client.close();
			return;
		}
		console.log('Inserted data. Closing client...');
		client.close();
	})
})