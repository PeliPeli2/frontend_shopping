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
            
               for (var i = 0; i < data.length; i++){


                var productCount = document.createElement("div");
                productCount.setAttribute("id", i);
                productCount.innerHTML = 0;

                var productInfo = document.createElement("div");
                productInfo.setAttribute("id", "productInfo"+i);
                productInfo.innerHTML = 'Name: ' + data[i].name + ' ' + 'Price: ' + data[i].price + ' DKK' + ' pr. styk '


                var incrementButton = document.createElement("button");
                incrementButton.setAttribute("class", "incrementButton")
                incrementButton.setAttribute("id", "incrementButton"+i)
                incrementButton.setAttribute("onclick", "increment("+productCount.id+")")
                incrementButton.innerHTML = "+";
    
                var decrementButton = document.createElement("button");
                decrementButton.setAttribute("class", "decrementButton")
                decrementButton.setAttribute("id", "decrementButton"+i)
                decrementButton.setAttribute("onclick", "decrement("+productCount.id+")")
                decrementButton.innerHTML = "-";

                var deleteButton = document.createElement("button");
                deleteButton.setAttribute("class", "deleteButton")
                deleteButton.setAttribute("id", "deleteButton"+i)
                deleteButton.setAttribute("onclick", "deleteproduct("+productCount.id+")")
                deleteButton.innerHTML = "x";

                mainContainer.appendChild(productInfo);
                
                mainContainer.appendChild(productCount);

                mainContainer.appendChild(incrementButton);
                
                mainContainer.appendChild(decrementButton);

                mainContainer.appendChild(deleteButton);

                }
            }


           function increment(x) {
            document.getElementById(x).innerHTML++;
            
           }
           function decrement(x) {
            if (document.getElementById(x).innerHTML !== "0")
            document.getElementById(x).innerHTML--;
            
           }
           function deleteproduct(x) {
            document.getElementById("incrementButton"+x).remove();
            document.getElementById("decrementButton"+x).remove();
            document.getElementById("deleteButton"+x).remove();
            document.getElementById("productInfo"+x).remove();
            document.getElementById(x).remove();
           }