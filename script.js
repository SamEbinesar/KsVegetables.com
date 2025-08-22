
   function toggleMenu() {
    document.querySelector(".nav-right").classList.toggle("active");
  }

function searchVegetable() {
  let input = document.getElementById("searchBar").value.toLowerCase();
  let articles = document.querySelectorAll(".products article");

  articles.forEach(article => {
    let name = article.querySelector("h3").innerText.toLowerCase();
    if (name.includes(input)) {
      article.style.display = "block";
    } else {
      article.style.display = "none";
    }
  });
}

let billItems = [];  // stores vegetables and kg values

function addToBill(inputId, vegName, amt) {
    let kgValue = document.getElementById(inputId).value;

    if (kgValue.trim() === "" || isNaN(kgValue) || kgValue <= 0) {
        alert("Enter amount in kg");
    } else {
        let quantity = parseFloat(kgValue); // convert to number
        let vegamount = amt * quantity; 
        billItems.push({ name: vegName, kg: quantity, a: vegamount });
        alert(vegName + " (" + quantity + " kg) " + "Rs." + vegamount + " added to bill");
    }
}

function viewBill() {
    if (billItems.length === 0) {
        alert("Your bill is empty!");
        return;
    }

    // Calculate total
    let totalAmount = billItems.reduce((sum, item) => sum + item.a, 0);

    // Create popup
    let billWindow = window.open("", "BillWindow", "width=400,height=500,resizable=yes,scrollbars=yes");

    billWindow.document.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Your Bill</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 20px;
                    background: #f9f9f9;
                }
                h2 {
                    text-align: center;
                    color: #2c3e50;
                }
                .bill-container {
                    background: white;
                    padding: 15px;
                    border-radius: 10px;
                    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                    max-width: 350px;
                    margin: auto;
                }
                ul {
                    list-style: none;
                    padding: 0;
                }
                li {
                    background: #ecf0f1;
                    margin: 8px 0;
                    padding: 10px;
                    border-radius: 5px;
                    display: flex;
                    justify-content: space-between;
                }
                .veg-name { font-weight: bold; color: #34495e; }
                .kg-value { color: #27ae60; }
                .veg-amt { color: #c0392b; }
                .buttons {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 15px;
                }
                button {
                    padding: 8px 12px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 14px;
                }
                .edit-btn { background: #f39c12; color: white; }
                .clear-btn { background: #e74c3c; color: white; }
                .order-btn {background: #39ff49ff; color: white;}
                .total {
                    margin-top: 15px;
                    font-size: 18px;
                    font-weight: bold;
                    text-align: right;
                    color: #2c3e50;
                }
                @media (max-width: 480px) {
                    body { 
                    margin: 10px; 
                    }
                    .bill-container { width: 100%; padding: 10px; }
                    #billWindow {
                    
                    }
                }
            </style>
        </head>
        <body>
            <div class="bill-container">
                <h2>Your Bill</h2>
                <ul id="bill-list">
                    ${billItems.map((item, index) => 
                        `<li>
                            <span class="veg-name">${item.name}</span> 
                            <span class="kg-value">${item.kg} kg</span>
                            <span class="veg-amt">Rs.${item.a}</span>
                        </li>`
                    ).join('')}
                </ul>
                <div class="total">Total: Rs.${totalAmount}</div>
                <div class="buttons">
                    <button class="edit-btn" onclick="window.opener.editBill();window.close();">Edit Bill</button>
                    <button class="clear-btn" onclick="window.opener.clearBill(); window.close();">Clear Bill</button>
                    <button class="order-btn" onclick="window.opener.orderBill();window.close();">Order Bill</button>
                </div>
            </div>
        </body>
        </html>
    `);
}

// Function to clear bill
function clearBill() {
    billItems = [];
    alert("Bill cleared!");
}

// Function to edit bill (you can extend this to re-open bill input fields)
function editBill() {
    alert("You can only clear bill and then order again.");

    
}

function orderBill() {
   
    billItems = [];
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const loginNav = document.getElementById("loginNav");
    const loginSuccessNav = document.getElementById("loginSuccessNav");

  if (isLoggedIn) {
     alert("Your bill is ready! Pay and get your Vegetables. Thank You for choosing KS VEG");
  } else {
    alert("Please login first!");
    document.getElementById("loginPopup").style.display = "block";
    document.getElementById("loginFrame").src = "login.html";  // load login page
    
} 
}




// login ----------------------------------------------------------
function openLogin() {
   
  document.getElementById("loginPopup").style.display = "block";
  document.getElementById("loginFrame").src = "login.html";  // load login page
}

function closeLogin() {
  document.getElementById("loginPopup").style.display = "none";
  document.getElementById("loginFrame").src = ""; // clear frame
}


// Call this function after successful login
function setLogin() {
  localStorage.setItem("isLoggedIn", "true");
  showLoginStatus();
}

// Call this function when logging out
function logout() {
  localStorage.removeItem("isLoggedIn");
  showLoginStatus();
}

// Function to update nav UI
function showLoginStatus() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const loginNav = document.getElementById("loginNav");
  const loginSuccessNav = document.getElementById("loginSuccessNav");

  if (isLoggedIn) {
    loginNav.style.display = "none";
    loginSuccessNav.style.display = "inline-block";
  } else {
    loginNav.style.display = "inline-block";
    loginSuccessNav.style.display = "none";
  }
}

// Run on every page load
document.addEventListener("DOMContentLoaded", showLoginStatus);
