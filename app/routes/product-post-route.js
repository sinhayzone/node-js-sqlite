module.exports = function (app, db) {

    // {
    //     "name": "ProdName",
    //     "description": "Description",
    //     "price": 2,
    //     "currency": "EUR" 
    // }
    // Post product: http://localhost:8000/api/product
    app.post('/api/product/', (req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*");

        validateRequest(req, res);

        var name = req.body.name;
        var description = req.body.description;
        var price = req.body.price;
        var currency = req.body.currency;

        var sql = `insert into Products (name, description, price, currency) 
                VALUES 
                (?, ?, ?, ?);`;

        var values = [name, description, price, currency];

        db.serialize(function () {
            db.run(sql, values, function (err) {
                if (err)
                    res.status(500).send(err);
                else
                    res.send();
            });
        });
    });
};

function validateRequest(req, res) {
    var fs = require('fs');
    var schema = JSON.parse(fs.readFileSync('app/data/product-schema.json', 'utf8'));

    var JaySchema = require('jayschema');
    var js = new JaySchema();
    var instance = req.body;

    js.validate(instance, schema, function (errs) {
        if (errs) {
            console.error(errs);
            res.status(400).send(errs);
        }
    });

    if (req.body.id) {
        res.status(400).send("ID cannot be submmited");
    }
}