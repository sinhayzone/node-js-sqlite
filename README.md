# node-js-sqlite
Simple NodeJS API with crud routes. With Sqlite database

Run the backend:

### How to Install

```sh
$ git clone https://github.com/lcarlesso/node-js-sqlite.git
$ npm install 
$ npm run dev
```

It will be running on port 4300

### How to use

Add new product:
http://localhost:8000/api/product
Sending a JSON body:
{
	"name": "ExampleProductName",
	"description": "Example product description",
	"price": 2.00,
	"currency": "EUR" 
}

Get all products
http://localhost:8000/api/product/

Get all products sorted by property
http://localhost:8000/api/product/sort/$property
$property = ['name', 'price', 'currency', 'description']*
* this is not checked values, wrong parameters will return in a DB error.

Get all producs sorted in a direction.
http://localhost:8000/api/product/$direction/$property 
$direction = [ASC or DESC]*
* the direction is checked and when wrong will return a 401 business error.

Get a single product by ID
http://localhost:8000/api/product/$id

