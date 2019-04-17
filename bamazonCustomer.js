//needed for the mysql and inquirer 
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

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

function start (){
  showData();
}

function showData() {

  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;

    console.log("========================================================================")
    console.log("Welcome to Nicoles Bamazon Store Front! Enjoy your shopping experience!")
    console.log("========================================================================")
    console.table(res);
  
    userPurchase();
  });
}

//ask user what Id they would like to purchase (function)

function userPurchase() {
  inquirer
    .prompt({
      name: "action",
      type: "input",
      message: "What is the ID of the product they would like to buy?",
      validate: function(value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }
    })
    .then(function (answer) {
      var query = "SELECT item_id, product_name, stock_quantity FROM products WHERE ?";
      // console.log(answer.action)
      connection.query(query, {
        item_id: answer.action
      }, function (err, res) {
        for (var i = 0; i < res.length; i++) {
          console.log("========================================================================")
          console.log("You chose item #" + res[i].item_id + " (" + res[i].product_name + ")");
          console.log("We have " + res[i].stock_quantity + " in stock.");
          console.log("========================================================================")
        }
        purchaseQuantity();
        
      });
    })
}

function purchaseQuantity() {
  inquirer
    .prompt({
      name: "quantityAnswer",
      type: "input",
      message: "How many units of the product would you like to buy?",
      validate: function(value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }
    })
    .then(function (answer) {
      var query = "UPDATE products SET stock_quantity = ? WHERE item_id = ?";
      connection.query(query, answer.quantityAnswer,
         function (err, res) {

        console.log(res);


        buyOrQuit();
      });
    })
}

// var price = res[0].price * answer.quantityAnswer;
// var newQuantity = res[0].stock_quantity - answer.quantityAnswer;


//mysql update querys 

// code in validation to check if the amount entered is equal to or less than stock quantity

 // if (parseInt(res[0].stock_quantity) < parseInt(answer.quantityAnswer)) {
        // console.log("I'm sorry, but you chose to purchase " + answer.quantityAnswer + " of those.")
        // console.log("We only have " + res[0].stock_quantity + " in stock.")
        // console.log("Please choose a quantity equal to or less than " + res[0].stock_quantity);


        function buyOrQuit() {
          inquirer.prompt({
              name: "buyOrQuit",
              type: "list",
              message: "Would you like to Continue Shopping, or EXIT?",
              choices: ["Purchase More!", "EXIT"]
          }).then(function (answer) {
              if (answer.buyOrQuit === "EXIT") {
                  connection.end();
              }
              else {
                  start();
              }
          })
      }
      