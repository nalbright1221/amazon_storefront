# amazon_storefront

For this homework assignment, I created a mock amazon store front where for both the customer and the manager to be able to utilize the application. 

On the customer application, they are able to purchase a product by the Item ID and choose how many units of each product they would like to buy. 

### AMAZON CUSTOMER APPLICATION 
by directing to the application, input **node bamazonCustomer** into the terminal. 

Once that is inputed, you will get a response like this : 

##image example (Images/amazonCustomerWelcome.JPG)

the customer is prompted to input an Item ID to select which item they would like to purchase 

##image example (Images/amazonCustomer_PurchaseProduct.JPG)

Here the user inputs an Item ID. Once they input an Item ID, they are promted to answer how many units they would like to purchase 

##image example (Images/amazonCustomerPurchaseUnits.JPG)

The user can either select to Purchare more products, which will repeat the same process above, or exit the store front. 

## AMAZON MANAGER APPLICATION

by directing to the application, input **node bamazonManager** into the terminal.

On the manager application, the manager is able to choose from a menu of options that include: View Products, Add to Inventory, View Low Iventory, or Add a Product. The manager is promted to select one of these menu options to continue through the application. 

#image example (Images/amazonManager_MenuOptions.JPG)

If the manager selections View Products, they recieve back the table data. 

##image example (Images/amazonManager_ViewProducts.JPG)

If the manager selections View Low Invetory, they recieve back the table data with products that have an inventory of 5 or fewer 

##image example (Images/amazonManager_ViewLowInventory.JPG)

If the manager selections Add New Procuts, they will be prompted to select the Item ID of the product they would like to add inventory to. 

From there they are prompted to add the unit amounts they would like to add to the inventory. 

##image example (Images/amazonManager_AddInventory.JPG)

The final menu option that the manager has to choose from, is to add a new product to the table data. 
When the manager chooses this option, they are prompted to add four values to complete the new product addition. 

The first is the name of the new product
The second is the department in which the new product is categorized under 
The third is the price of the product 
and the fourth is the amount of units available (inventory)

##image example (Images/amazonManager_AddNewProduct.JPG)

Under all of these menu options, the manager has the option to either return to the main menu, or exit the application. 

Everytime the manager updates the table data, it updates in mySQL and will return back the correct values every time the user requests to view the table data. 





