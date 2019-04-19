//needed for the mysql and inquirer 
var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "yeloc1221",
  database: "bamazon"
});

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
  }
  showData();
});

//function that shows table data in the terminal 

function start(){
  showData();
}

function showData(){
  connection.query("SELECT * FROM products", function (err, res){
    if (err) throw err;

    console.log("========================================================================")
    console.log("Welcome to Nicoles Bamazon Store Front! Enjoy your shopping experience!")
    console.log("========================================================================")
    console.table(res);
  
    userPurchase();
  });
}

//ask user what Id they would like to purchase (function)
var itemID;
var quantity; 
var price; 

function userPurchase(){
  inquirer
    .prompt({
      name: "action",
      type: "input",
      message: "What is the ID of the product they would like to buy?",
      validate: function(value){
        if (isNaN(value) === false){
          return true;
        }
        return false;
      }
    })
    .then(function (answer){
      itemID = answer.action;
      var query = "SELECT item_id, product_name, stock_quantity, price FROM products WHERE ?";
      // console.log(answer.action)
      connection.query(query, {item_id: answer.action}, function (err, res){
        for (var i = 0; i < res.length; i++){
          quantity = res[i].stock_quantity;
          price = res[i].price;
          console.log("========================================================================")
          console.log("You chose item #" + res[i].item_id + " (" + res[i].product_name + ")");
          console.log("We have " + quantity + " in stock.");
          console.log("========================================================================")
        }
        purchaseQuantity();
      });
    })
}

function purchaseQuantity(){
  inquirer
    .prompt({
      name: "quantityAnswer",
      type: "input",
      message: "How many units of the product would you like to buy?",
      validate: function(value){
        if (isNaN(value) === false){
          return true;
        }
        return false;
      }
    })
    .then(function (answer){
      var newQuantity = quantity - answer.quantityAnswer;
      var totalPrice =  price * answer.quantityAnswer;
      if (parseInt(quantity) < answer.quantityAnswer ){
        console.log("insufficient quality. please choose a lower quantity than " + quantity);
        purchaseQuantity();
      }

      else{ 
        var query = "UPDATE products SET stock_quantity = ? WHERE item_id =" + itemID;
        connection.query(query, newQuantity, function (err, res){
          console.log("you're total cost for your order is $" + totalPrice);
          buyOrQuit();
        })}
      });
    }

    function buyOrQuit(){
          inquirer.prompt({
              name: "buyOrQuit",
              type: "list",
              message: "Would you like to Continue Shopping, or EXIT?",
              choices: ["Purchase More!", "EXIT"]
          }).then(function (answer) {
              if (answer.buyOrQuit === "EXIT"){
                  connection.end();
              }
              else {
                  start();
              }
          })
      }
      