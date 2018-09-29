const MongoClient = require('mongodb').MongoClient;


function generateProduct() {
	const color = ['red', 'blue', 'pink', 'black', 'grey', 
					'maroon', 'white', 'orange', 'green', 
					'violet', 'indigo', 'magenta', 'brown']
	const brand = ['Volvo', 'Toyota', 'Ford', 'Tesla', 'BMW',
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
	let b = randomElement(brand);
	let n = randomElement(name);
	let con = randomElement(condition);
	return {
		namn: n,
		color: c,
		brand: b,
		model: Math.floor(Math.random() * 118) + 1900,
		condition: con,
		price: Math.floor(Math.random() * 200000) + 10000
	};
}

let cars = generateProduct();
console.log(cars);

