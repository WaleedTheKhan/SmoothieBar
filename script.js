// Waleed Khan (June 10, 2023)
function askQuantity(selectedSmoothie) {
    //declaring variables
    var smoothieQuantity;
    var quantityValid = false;

    //prompting for user input and validation check
    while (!quantityValid) {
        smoothieQuantity = prompt("Enter quantity:");

        //allowing the user to click cancel without triggering the prompts for invalid entry
        if (smoothieQuantity === null) {
            return;
        }

        smoothieQuantity = parseInt(smoothieQuantity);

        if (Number.isNaN(smoothieQuantity) || smoothieQuantity <= 0) {
            alert("Invalid entry. Enter a numeric value greater than zero.");
        }
        else {
            quantityValid = true;
        }
    }//end while loop

    //adding to cart if validation check passed
    addToCart(selectedSmoothie, smoothieQuantity);
}//end function askQuantity

function askCustName() {
    //declare variables
    var customerName;
    var nameValid = false;

    //prompting for user input and validation check
    while (!nameValid) {
        customerName = prompt("Enter your name:");

        //allowing the user to click cancel without triggering the prompts for invalid entry
        if (customerName === null) {
            return;
        }

        if (customerName.trim() === "") {
            alert("Please enter your name to proceed!");
        }
        else {
            nameValid = true;
        }
    }//end while loop

    //proceeding with checkout if validation check passed
    checkoutReceipt(customerName);
}//end function askCustName

function addToCart(selectedSmoothie, smoothieQuantity) {
    var cartItemsList = document.getElementById("cart-items-list");

    //new item to add to the cart list
    var cartItem = document.createElement("li");
    cartItem.textContent = selectedSmoothie + " (" + smoothieQuantity + " @ " + getSmoothiePrice(selectedSmoothie) + ")";
    cartItemsList.appendChild(cartItem);

}//end function addToCart

function checkoutReceipt(customerName) {
    var cartItemsList = document.getElementById("cart-items-list");
    var totalPrice = 0;

    //looping over the items in the user's cart to calculate pricing
    var cartItems = cartItemsList.getElementsByTagName("li");
    for (var i = 0; i < cartItems.length; i++) {
        var cartItem = cartItems[i];
        var productText = cartItem.textContent;
        var smoothieName = productText.split("(")[0].trim();
        var smoothieQuantity = parseInt(productText.split("(")[1].split("@")[0].trim());
        var smoothiePrice = getSmoothiePrice(smoothieName);
        totalPrice += smoothiePrice * smoothieQuantity;
    }//end for loop

    var taxPrice = totalPrice * 0.13;
    var totalPriceAfterTax = totalPrice + taxPrice;

    //receipt output in the pop-up menu
    var receipt = "Customer: " + customerName;
    receipt += "\n\nSmoothies on Order:\n";
    for (var i = 0; i < cartItems.length; i++) {
        receipt += cartItems[i].textContent + "\n";
    }
    receipt += "\nSubtotal: $" + totalPrice.toFixed(2) + "\n";
    receipt += "GST/HST (13%): $" + taxPrice.toFixed(2) + "\n";
    receipt += "Total: $" + totalPriceAfterTax.toFixed(2) + "\n";

    alert("CHECKOUT SUCCESSFUL!\n\n--------------- ORDER DETAILS ---------------\n" + receipt);
}//end function checkoutReceipt

function getSmoothiePrice(smoothieName) {
    switch (smoothieName) {
        case "Mango Fusion":
            return 11.99;
        case "Banana Freeze":
            return 9.99;
        case "Leafy Kale":
            return 8.99;
        case "Tangy Orange":
            return 7.99;
        case "Tropical Pineapple-Strawberry":
            return 12.99;
        default:
            return 0;
    }
}//end function getSmoothiePrice