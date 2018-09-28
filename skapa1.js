const MongoClient = require('mongodb').MongoClient;

console.log("lalalla");


function generateProduct() {
	const color = ['red', 'blue', 'pink']
	const material = ['wood', 'plastic', 'metal']
	const thing = ['balloon', 'bicycle', 'hammer', 'wrench']
	function randomElement(list) {
		let r = Math.random() * list.length;
		return list[Math.floor(r)];
	}

	let c = randomElement(color);
	let m = randomElement(material);
	let t = randomElement(thing);
	return `${c} ${m} ${t}`;
}

let products = generateProduct();
console.log(products);

