const express = require('express');
// add your code here
var bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json()); //why do we need this line?
//app.use(bodyParser.urlencoded({extended: true}));//What is the difference between true or false?

//.urlencoded within bodyParser tells body parser to extract data from the form element
//and adds it to the body property in the request object.
var mock = [
    {
      todoItemId: 0, 
      name: 'an item',
      priority: 3,
      completed: false
    },
    {
      todoItemId: 1,
      name: 'another item',
      priority: 2,
      completed: false
    },
    {
      todoItemId: 2,
      name: 'a done item',
      priority: 1,
      completed: true
    }
  ];

app.get('/', (req, res) => {    
    res.json(JSON.parse(res.statusCode));
        //    res.sendStatus(res.statusCode);
    console.log(res.statusCode);
});

app.get('/api/TodoItems', (req, res) => {
    //respond with all items in the dataset
  res.json(mock);
  console.log(res.statusCode);
});

app.get('/api/TodoItems/:todoItemId', (req, res) =>{
    //ROUTE:  /api/TodoItems/:number

    // 1. Lookup the difference between == and ===
    // 2. Log all the variables below and inspect them in the console.
    for (var i = 0; i < mock.length; i++) {
        var x = req.params.todoItemId;
        if (mock[i].todoItemId == x){
        res.json(mock[i])
        }
    }
});

app.post('/api/TodoItems', (req, res)=>{
        
    for (var i = 0; i < mock.length; i++){
        if (mock[i].todoItemId === req.body.todoItemId){
            mock[i] = req.body;
            return res.status(201).json(mock[i]);
        } 
    }

    mock.push(req.body);
    res.status(201).json(mock[i]);
    
});

app.delete('/api/TodoItems/:todoItemId', (req, res)=>{
    for (var i = 0; i < mock.length; i++){
        if (mock[i].todoItemId == req.params.todoItemId){
            var deletedItem = mock.splice(i,1);
            //res.json(deletedItem);
            return res.status(200).json(deletedItem[0]);
        } 
    }

    res.status(200).send("Item not found");
});
    module.exports = app;

//Olga's note: use Postman to verify if code is working as expected
