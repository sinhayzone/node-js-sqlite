module.exports = function(app, db) {

  // Load products: http://localhost:8000/api/product/1
  app.get('/api/product/:id', (req, res) => {
    processData(res, "SELECT * FROM products where id == "+req.params.id);
  });

  // Load products: http://localhost:8000/api/product/
  app.get('/api/product', (req, res) => {
    processData(res, "SELECT * FROM products");
  });

  // Load products: http://localhost:8000/api/product/price
  app.get('/api/product/sort/:way', (req, res) => {
    processData(res, "SELECT * FROM products order by " + req.params.way);
  });

  // Load products: http://localhost:8000/api/product/asc/price [ASC or DESC]
  app.get('/api/product/sort/:direction/:way', (req, res) => {
    var way = req.params.way;
    var direction = req.params.direction;

    if(direction !== "asc" && 
        direction !== "desc"){
      res.status(404).send("Sorting direction invalid!");
    }

    processData(res, "SELECT * FROM products order by " + way + " " + direction);
  });

  function processData(res, sql){
    db.serialize(function() {
      db.all(sql, 
        function(err, rows) {
          if(err)
            res.status(500).send(err);
          else
            sendData(res, rows);
      });
    });
  }

  function sendData(res, data){
    res.setHeader("Access-Control-Allow-Origin","*");

    if(data)
      res.send(data);
    
    else
      res.status(404).send("Product not found");
  }
};



