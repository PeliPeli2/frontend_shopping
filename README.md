This project is the Front-end coding for a webpage

We have tried to build the webpage flow for a shopping cart on which u have X premade items in the cart already while u just need to adjust the ammount of items u want, as additional functions there is an upsell text telling u when u buy x ammount of an item there might be a discount and there is also a button letting u upgrade to a higher quality product of the same class as the original one.
Besides the carts there is a user form in which u will be filling out with ur personal or company information in which we then can get to submit the shopping request. So far the Userform is only made to cover Denmark but future devolopement should allow it to cover way more.

To run the code u first need to get the node modules needed to run this project, that is done by having nodejs downloaded at the version 16 at least, newer versions works too.

Next step will be to in the command promt when u have opened the project in an editor program, go into the command promt/terminal and write "npm install" this will allow you to install the "node_modules" folder which then can let u run all the code.

To now Run the program you use the node modules packages by in the command promt/terminal saying "npm run dev" and it will start running the program, by pressing the O key you will automaticly open the localhost page in which u are emulating the shoping page to.

To Run the Test of the code you will have to go through 2 commands again inside the command promt/terminal, "npm install vitest jsdom" is the first and then after that u will have to follow it by "npm install @testing-library/react @testing-library/user-event @testing-library/jest-dom" these two commands will download the Vitest which are the testing system used in this project, and the second one is downloading the libraries for the tests. Now when both of the commands have been run and its downloaded the things fully, using the command "npx vitest" which will take and run the vitest test class that holds the code that will check the webpages's logic when it runs. As if everything works as intended and nothing is missing.