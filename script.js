//menu data (non-changing)
const items = ["Rice Meal", "Chicken Meal", "Juice"];
const prices = [50, 80, 20];

//ask for cutomer's name
const rawName = prompt("Enter customer name:");

if (rawName === null){
	alert("Order cancelled.");
	console.log("Order cancelled.");
}else{
	const name = rawName.trim();

	if(name === ""){
	   alert("Error: Name cannot be blank.");
	   console.log("Error: Name cannot be blank");
	}else{
	//ask for category
	   const rawCategory = prompt("Enter category (student, staff, guest):");
	   if (rawCategory === null){
		alert("Order cancelled.");
		console.log("Order cancelled.");
	   }else{
		const categoryInput = rawCategory.trim().toLowerCase();
		let category;
		let discountRate;
		//determine the discount using switch case

		switch(categoryInput){
		    case "student":
			category = "student";
			discountRate = 0.10;
			break;

		    case "staff":
			category = "staff";
			discountRate = 0.05;
			break;

		    case "guest":
			category = "guest";
			discountRate = 0;
			break;

		    default:
			category = "guest";
			discountRate = 0;

		}
		//store customer information
		const customer = {
		    name: name,
		    category: category
		};

		const quantities = [];
		let cancelled = false;
		let invalid = false;

		//ask for quantities
		for(let i = 0; i < items.length; i++){
		    const rawQuantity = prompt(
			"Enter quantity for " + items[i] + " (0-10):"
		    );
		    //check cancel before using string methods
		    if(rawQuantity === null){
			cancelled = true;
			break;
		    }

		    if(rawQuantity.trim() === ""){
			invalid = true;
			break;
		    }

		    const quantity = Number(rawQuantity);

		    if(!Number.isFinite(quantity) || !Number.isInteger(quantity) || quantity < 0 || quantity > 10){
			invalid = true;
			break;
		    }
		    quantities.push(quantity);
		 }

		 if(cancelled){
		     alert("Order cancelled.");
		     console.log("Order cancelled.");
		 }else if(invalid){
		     alert("Error: Invalid quantity. Enter a whole number from 0 to 10.");
		     console.log("Error: Invalid quantity.");
		 }else{
		    //calculate line totals
		    const lineTotals = [];
		    let subtotal = 0;

		    for(let i = 0; i < items.length; i++){
			const lineTotal = prices[i] * quantities[i];
			lineTotals.push(lineTotal);
			subtotal += lineTotal;
		    }
		    const discount = subtotal * discountRate;
		    const total = subtotal - discount;

		    //check whether the customer ordered anything
		    if(quantities[0] === 0 && quantities[1] === 0 && quantities[2] === 0){
			const message = "No items ordered.";

			alert(message);
			console.log(message);
		    }else{
			//build the receipt
			let receipt = "";

			receipt += "CAMPUS CANTEEN RECEIPT\n";
			receipt += "-----------------------\n";
			receipt += "Name: " + customer.name.toUpperCase() + "\n";
			receipt += "Category: " + customer.category + "\n";
			receipt += "-----------------------\n";

			for(let i = 0; i < items.length; i++){
			    receipt += items[i] + " x " + quantities[i] + " = PHP " + lineTotals[i].toFixed(2) + "\n";
			}

			receipt += "-----------------------\n";
			receipt += "Subtotal: PHP " + subtotal.toFixed(2) + "\n";
			receipt += "Discount: PHP " + discount.toFixed(2) + "\n";
			receipt += "Total: PHP " + total.toFixed(2);

			alert(receipt);
			console.log(receipt);
			}
		    }
              }
       }
}
