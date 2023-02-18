       // get json data from url and put into parseCartData function
       var url = "https://raw.githubusercontent.com/larsthorup/checkout-data/main/product.json"
       fetch(url)
               .then((resp) => resp.json())
               .then(function(data) {
                   parseCartData(data);
               })
               .catch(function(error) {
                   console.log(error);
               })

           // turn the data into a list of products shoppingCart
           function parseCartData(data){
       
               var mainContainer = document.getElementById("shoppingCart");

                // pick random amount of items
                var idCount = -1;
                for (var i = 0; i < data.length; i++){
                    if (Math.random()*100 > 60){
                    idCount++;



                var productCount = document.createElement("div");
                productCount.setAttribute("id", idCount);
                productCount.setAttribute("class", "productCount");

                // pick random count from 1-10
                productCount.innerHTML = Math.floor(Math.random()*10);
                

                var productInfo = document.createElement("div");
                productInfo.setAttribute("id", "productInfo"+idCount);
                productInfo.innerHTML = 'Name: ' + data[i].name + ' ' + 'Price: ' + data[i].price + ' DKK' + ' pr. styk ';


                var incrementButton = document.createElement("button");
                incrementButton.setAttribute("class", "incrementButton");
                incrementButton.setAttribute("value", data[i].price);
                incrementButton.setAttribute("id", "incrementButton"+idCount);
                incrementButton.setAttribute("onclick", "increment("+productCount.id+")");
                incrementButton.innerHTML = "+";
    
                var decrementButton = document.createElement("button");
                decrementButton.setAttribute("class", "decrementButton");
                decrementButton.setAttribute("id", "decrementButton"+idCount);
                decrementButton.setAttribute("onclick", "decrement("+productCount.id+")");
                decrementButton.innerHTML = "-";

                var deleteButton = document.createElement("button");
                deleteButton.setAttribute("class", "deleteButton");
                deleteButton.setAttribute("id", "deleteButton"+idCount);
                deleteButton.setAttribute("onclick", "deleteproduct("+productCount.id+")");
                deleteButton.innerHTML = "x";

                var productCost = document.createElement("div");
                productCost.setAttribute("class", "productCost");
                productCost.setAttribute("id", "productCost:"+productCount.id);
                productCost.innerHTML = incrementButton.value*productCount.innerHTML;


                mainContainer.appendChild(productInfo);
                
                mainContainer.appendChild(productCount);

                mainContainer.appendChild(incrementButton);
                
                mainContainer.appendChild(decrementButton);

                mainContainer.appendChild(deleteButton);

                mainContainer.appendChild(productCost);


                    }
                }
               var totalCost = document.createElement("div");
               totalCost.setAttribute("class", "totalCost");
               totalCost.setAttribute("id", "totalCost:");
               totalCost.innerHTML = "0";

               mainContainer.appendChild(totalCost);

               calculateTotal();
           }

        
           function calculateTotal(){
            var total = 0;
            var count = document.querySelectorAll(".incrementButton").length

            if (count == 0){
                document.getElementById("totalCost:").innerHTML = "Basket is empty";
            }

            for (var i = 0; i < count; i++){
                total += document.getElementById(document.querySelectorAll(".incrementButton").item(i).id).value*document.getElementById(document.querySelectorAll(".productCount").item(i).id).innerHTML;
                document.getElementById("totalCost:").innerHTML = total;

            }
            return total
           } 
           function increment(x) {
           document.getElementById(x).innerHTML++;
           document.getElementById("productCost:"+x).innerHTML = document.getElementById("incrementButton"+x).value*document.getElementById(x).innerHTML;
           calculateTotal();

           }
           function decrement(x) {
            if (document.getElementById(x).innerHTML !== "0")
            document.getElementById(x).innerHTML--;
            document.getElementById("productCost:"+x).innerHTML = document.getElementById("incrementButton"+x).value*document.getElementById(x).innerHTML;
            calculateTotal();
           }
           function deleteproduct(x) {
            document.getElementById("incrementButton"+x).remove();
            document.getElementById("decrementButton"+x).remove();
            document.getElementById("deleteButton"+x).remove();
            document.getElementById("productInfo"+x).remove();
            document.getElementById("productCost:"+x).remove();
            document.getElementById(x).remove();

            calculateTotal();
           }