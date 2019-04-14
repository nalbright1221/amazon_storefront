DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT default 0,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Coffee Pot", "Kitchen Supplies", 50.00, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Samsung 50inch  Tv", "Electronics", 800.00, 75);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("LV Hand Bag", "Apparel", 1400.00, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Iphone", "Electronics", 900.00, 150);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Vera Wang Bed Set", "Home Goods", 200.00, 35);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Margarita Machine", "Kitchen Supplies", 250.00, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Weighted Blanket", "Home Goods", 120.00, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Sunglasses", "Apparel", 400.00, 90);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("Movado Bold Watch", "Apparel", 480.00, 25);