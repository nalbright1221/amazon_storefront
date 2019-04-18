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
    start();
});

//function that shows table data in the terminal 

function start() {
    menuOptions();
}

function menuOptions() {
    inquirer.prompt({
        name: "menuOptions",
        type: "list",
        message: "Please choose what menu option you would like to view",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
    }).then(function (answer) {
        switch (answer.menuOptions) {
            case "View Products for Sale":
                viewProducts();
                break;

            case "View Low Inventory":
                viewInventory();
                break;

            case "Add to Inventory":
                addInventoryID();
                break;

            case "Add New Product":
                newProduct();
                break;
        }
    });
}


function viewProducts() {
    showData();
}

function viewInventory() {
    var query = "SELECT * FROM products WHERE stock_quantity <= ?";
    connection.query(query, [5], function (err, res) {
        for (var i = 0; i < res.length; i++) {
            lowInventory <= res[i].stock_quantity;
        }
    })
    moveOnExit();
}

var quantity;
var itemID;

function addInventoryID() {
    inquirer
        .prompt({
            name: "action",
            type: "input",
            message: "What is the ID of the product you would like to add inventory to?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        })
        .then(function (answer) {
            itemID = answer.action;
            var query = "SELECT item_id, product_name, stock_quantity, price FROM products WHERE ?";
            // console.log(answer.action)
            connection.query(query, {
                item_id: answer.action
            }, function (err, res) {
                for (var i = 0; i < res.length; i++) {
                    quantity = res[i].stock_quantity;
                    console.log("========================================================================")
                    console.log("You chose item to add inventory to item #" + res[i].item_id + " (" + res[i].product_name + ")");
                    console.log("========================================================================")
                }

                AddInventoryAmount();
            });
        })
};

function AddInventoryAmount() {
    inquirer
        .prompt({
            name: "quantityAnswer",
            type: "input",
            message: "How many units of the product would you like to add to the inventory?",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        })
        .then(function (answer) {
            var newQuantity = parseInt(quantity) + parseInt(answer.quantityAnswer);
            var query = "UPDATE products SET stock_quantity = ? WHERE item_id =" + itemID;
            connection.query(query, newQuantity, function (err, res) {
                console.log("The new total for item # " + itemID + " is " + newQuantity);
                console.log("========================================================================")
                console.log("To view the updated inventory, go back to Main Menu, and select 'View Products for Sale'.")
                console.log("========================================================================")
                console.log("To add more inventory, go back to Main Menu, and select 'Add to Inventory'.")
                console.log("========================================================================")
                moveOnExit();
            })
        });

}

function newProduct() {
    inquirer
        .prompt({
            name: "productName",
            type: "input",
            message: "What is the name of the the new product you would like to add to the store?"
        }, {
            name: "productDept",
            type: "input",
            message: "What is the department of the the new product that the item will categorize under?"
        }, {
            name: "productPrice",
            type: "input",
            message: "What is the price of the the new product you would like to add to the store?"
        }, {
            name: "productStock",
            type: "input",
            message: "What is the total inventory of the the new product you would like to add to the store?"
        })
        .then(function (answer) {
            var query = "INSERT INTO products (product_name, price, department_name, stock_quantity VALUES (?, ?, ?, ?)";
            connection.query(query, [answer.product_name, answer.productDept, answer.productPrice, answer.productStock], function (err, res) {
                console.log("New Inventory has been added! To see new inventory item, go back to Main Menu, and select 'View Products for Sale'. ")
            })
        })
}

function showData() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log("========================================================================")
        console.log("Welcome to Nicoles Bamazon Store Front! Enjoy your shopping experience!")
        console.log("========================================================================")
        console.table(res);
        console.log("========================================================================")
        moveOnExit();
    });
}

function moveOnExit() {
    inquirer.prompt({
        name: "moveOnExit",
        type: "list",
        message: "Would you like to return to main menu, or EXIT?",
        choices: ["Go back to main menu!", "EXIT"]
    }).then(function (answer) {
        if (answer.moveOnExit === "EXIT") {
            connection.end();
        } else {
            start();
        }
    })
}