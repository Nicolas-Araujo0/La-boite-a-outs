const availableProducts = [{
  ref: 23112022,
  imgSrc: "./assets/screwdriver-electricity.png",
  imgAlt: "tournevis plat",
  price: 15.00,
  quantity: 1,
  category: "outillage"
},
{
  ref: 24112022,
  imgSrc: "./assets/screwdriver-torque.png",
  imgAlt: "tournevis cruciforme",
  price: 12.00,
  quantity: 1,
  category: "outillage"
},
{
  ref: 25112022,
  imgSrc: "./assets/adjustable-spanner.webp",
  imgAlt: "clé à mollette réglable",
  price: 25.00,
  quantity: 1,
  category: "outillage"
},
{
  ref: 26112022,
  imgSrc: "./assets/torx-hex-key-clés-6-pans.webp",
  imgAlt: "clé torx-hex",
  price: 39.99,
  quantity: 1,
  category: "outillage"
},
{
  ref: 27112022,
  imgSrc: "./assets/vis-different-sizes.webp",
  imgAlt: "vis",
  price: 2.00,
  quantity: 1,
  category: "quincaillerie"
},
{
  ref: 28112022,
  imgSrc: "./assets/marteau.webp",
  imgAlt: "marteau",
  price: 26.89,
  quantity: 1,
  category: "outillage"
},
{
  ref: 29112022,
  imgSrc: "./assets/bubble-level.webp",
  imgAlt: "niveau à bulle",
  price: 28.50,
  quantity: 1,
  category: "outillage"
},
{
  ref: 30112022,
  imgSrc: "./assets/laser-level.webp",
  imgAlt: "niveau à bulle laser",
  price: 43.89,
  quantity: 1,
  category: "outillage"
},
{
  ref: 31112022,
  imgSrc: "./assets/drill-perceuse.webp",
  imgAlt: "perçeuse",
  price: 75.95,
  quantity: 1,
  category: "outillage"
},
{
  ref: 32112022,
  imgSrc: "./assets/wood-drill-bit.webp",
  imgAlt: "mèches à bois",
  price: 24.99,
  quantity: 1,
  category: "quincaillerie"
},
{
  ref: 33112022,
  imgSrc: "./assets/steel-drill-bit.webp",
  imgAlt: "mèches acier",
  price: 26.99,
  quantity: 1,
  category: "quincaillerie"
},
{
  ref: 34112022,
  imgSrc: "./assets/grinder-meuleuse.webp",
  imgAlt: "meuleuse",
  price: 64.69,
  quantity: 1,
  category: "outillage"
},
{
  ref: 35112022,
  imgSrc: "./assets/steel-sandpaper.webp",
  imgAlt: "papier de verre acier",
  price: 16.68,
  quantity: 1,
  category: "quincaillerie"
},
{
  ref: 36112022,
  imgSrc: "./assets/polishing-sandpaper.webp",
  imgAlt: "papier de polissage",
  price: 17.95,
  quantity: 1,
  category: "quincaillerie"
},
{
  ref: 37112022,
  imgSrc: "./assets/nipper-pince-a-bec.webp",
  imgAlt: "pince à bec",
  price: 16.98,
  quantity: 1,
  category: "outillage"
}
];
let checkCategory;
let booleen = false;
function displayCategory(m) {
  checkCategory = m;
  booleen = true;
  let main = document.querySelector("main");
  main.style["grid-template-columns"] = "2fr 1fr";
  let section = document.querySelector("section");
  section.innerHTML = "";

  for (let j = 0; j < availableProducts.length; j++) {
    let divOutils = document.createElement("div");
    divOutils.classList.add("outils");
    if (availableProducts[j].category == m) {
      let article = `
    <h3>Ref: ${availableProducts[j].ref}</h3>
    <img src= ${availableProducts[j].imgSrc} alt= ${availableProducts[j].imgAlt}>
    <p class="price">${availableProducts[j].price}€</p>
    <label for="quantite">Qté: </label>
    <input class="quantite" type="number" min="1" max="99" value="1" ><br>
    <button class="addButton" onclick="addProductToCart(${j})">ajouter</button>
    `// est une autre méthode pour createElement

      divOutils.innerHTML = article;
      section.append(divOutils);

      let quantityInput = divOutils.querySelector("input")
      quantityInput.addEventListener("input", function () {
        availableProducts[j].quantity = parseInt(quantityInput.value);
      })

    }
  }
}



/*Gestion de la searchBar_______________________________________*/

let searchBar = document.querySelector("#search");
searchBar.addEventListener("input", function () {
  displayAvailableProducts();
})


let SectionElement = document.querySelector("section");// Element parent des div outils
let mainGrid = document.querySelector("main");

function displayAvailableProducts() {
  let sectionElement = document.querySelector("section");
  sectionElement.innerHTML = "";
  //sectionElement.innerHTML = ""
  for (let i = 0; i < availableProducts.length; i++) {

    if (availableProducts[i].imgAlt.includes(searchBar.value)) {

      let divOutils = document.createElement("div");
      divOutils.classList.add("outils");
      let article = `
    <h3>Ref: ${availableProducts[i].ref}</h3>
    <img src= ${availableProducts[i].imgSrc} alt= ${availableProducts[i].imgAlt}>
    <p class="price">${availableProducts[i].price}€</p>
    <label for="quantite">Qté: </label>
    <input class="quantite" type="number" min="1" max="99" value="1" ><br>
    <button class="addButton" onclick="addProductToCart(${i})">ajouter</button>
    `// est une autre méthode pour createElement
      divOutils.innerHTML = article;

      let quantityInput = divOutils.querySelector("input")
      quantityInput.addEventListener("input", function () {
        availableProducts[i].quantity = parseInt(quantityInput.value);
      })
      // ajoute des éléments et du txt à la divOutils créée.
      sectionElement.append(divOutils);// ajouter les divOutils à l'élément parent
    }
  }

  if (asidePresent == false || document.querySelector("aside").style.visibility == "hidden") {
    mainGrid.style["grid-template-columns"] = "1fr";

  } else {
    mainGrid.style["grid-template-columns"] = "2fr 1fr";
  }
}


let cart = [];
let totalAmount = 0;

function addProductToCart(i) {

  let productToAdd = { ...availableProducts[i] }

  if (cart.length == 0) {
    cart.push(productToAdd)
  } else {
    for (let i = 0; i < cart.length; i++) {
      if (productToAdd.ref == cart[i].ref) {
        cart[i].quantity += productToAdd.quantity;
        break;
      }
      if (productToAdd.ref != cart[i].ref && i + 1 == cart.length) {
        cart.push(productToAdd);
        break;
      }
    }
  }
  availableProducts[i].quantity = 1;

  if (booleen && checkCategory == "outillage") {
    displayCategory("outillage");
  }
  else if (booleen && checkCategory == "quincaillerie") {
    displayCategory("quincaillerie");
  }
  else {
    displayAvailableProducts();
  }
  displayCart();
  localStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem("totalAmount", JSON.stringify(totalAmount));
}

function cartAppear() {
  let asideSelect = document.querySelector("aside");
  asideSelect.classList.add("cartAppear");

  let shop = document.querySelector("main");
  shop.classList.add("deScale")
  setTimeout(() => {
    asideSelect.classList.remove("cartAppear");

    shop.classList.remove("deScale")
  }, 1000);
}
function cartRemove() {
  let asideSelect = document.querySelector("aside")
  asideSelect.classList.add("cartRemove")

  let shop = document.querySelector("main");
  shop.classList.add("scale")
  setTimeout(() => {
    asideSelect.classList.remove("cartRemove");

    shop.classList.remove("scale")
  }, 1000);
}


let asidePresent = false;
let showAnimation = true;


function displayCart() {
  if (asidePresent == false) {
    displayAside()
  }
  if (cart == "") {
    cartRemove();
    setTimeout(() => {
      mainGrid.style["grid-template-columns"] = "1fr";
      document.querySelector("aside").style.visibility = "hidden";
    }, 1000);
    showAnimation = true;

  } else {
    document.querySelector("aside").style.visibility = "visible";
    mainGrid.style["grid-template-columns"] = "2fr 1fr";
    let asideElement = document.querySelector("#panier");
    asideElement.innerHTML = ""
    if (showAnimation == true) {
      cartAppear()
    }
    showAnimation = false;
    for (let k = 0; k < cart.length; k++) {
      let div = document.createElement("div");
      div.classList.add("ligne");
      let div2 = document.createElement("div");
      div2.classList.add("article");
      let panier = `
    <div class="article">
      <img src=${cart[k].imgSrc} alt=${cart[k].imgAlt}>
      <div class="refPrix">
        <div>
          <span>Ref : ${cart[k].ref}</span>
        </div>
        <div>
          <span>${cart[k].price}€</span>
          <input class="quantity" type="number" value="${cart[k].quantity}" min="1" max="99" maxlength="3">
        </div>
      </div>
    </div>
    <span class="cubePrice">${(cart[k].quantity * cart[k].price).toFixed(2)}€</span>
  `
      div.innerHTML = panier;

      /*creation du button Supprimer avec image et insert it/them inside divElement ligne_________________*/
      let deleteBtn = document.createElement("button");
      deleteBtn.setAttribute("alt", "supprimer l'article du panier");
      let benImg = document.createElement("img");
      benImg.setAttribute("src", "./assets/poubelle.webp");
      deleteBtn.append(benImg);
      div.append(deleteBtn);
      deleteBtn.addEventListener("click", function () {
        deleteProduct(k);
      });

      asideElement.append(div);

      let selecteur = document.querySelectorAll(".article .refPrix div input")
      selecteur[k].addEventListener("change", function () {
        refreshValue(k)
      });
      displayTotalAmount();
      panierScrollbar();
    }
  }
}

function displayDevis() {

  let dateDevis = document.querySelector("p>span#date");
  dateDevis.textContent = "--/--/---- ";
  let numberDevis = document.querySelector("h2>#numberDevis");
  numberDevis.textContent = 100001;
  let cart = JSON.parse(localStorage.getItem("cart"));
  let totalAmount = JSON.parse(localStorage.getItem("totalAmount"));
  let totalQty = 0;
  let tBodyElement = document.querySelector("tbody");
  let tfootElement = document.querySelector("tfoot");

  for (let k = 0; k < cart.length; k++) {
    let trChild = document.createElement("tr");
    totalQty += cart[k].quantity;

    let trContent = `
        <td class="description">${"Référence: " + cart[k].ref + " " + cart[k].imgAlt}</td>
        <td class="nombreP">${cart[k].quantity}</td>
        <td class="subTotal">${(cart[k].quantity * cart[k].price).toFixed(2)}€</td>
      `
    tBodyElement.append(trChild);
    trChild.innerHTML = trContent;
  }
  let trAnotherChild = document.createElement("tr");
  let tdMontant = document.createElement("td");
  let tdTotalQty = document.createElement("td");
  let tdTotalPrice = document.createElement("td");

  tdMontant.classList.add("montant");
  tdTotalPrice.classList.add("ttc");

  tfootElement.append(trAnotherChild);
  trAnotherChild.append(tdMontant);
  trAnotherChild.append(tdTotalQty);
  trAnotherChild.append(tdTotalPrice);
  tdMontant.textContent = "Montant TTC à régler: "
  tdTotalPrice.textContent = totalAmount.toFixed(2) + "€";
  tdTotalQty.textContent = totalQty;

}


function refreshValue(k) {
  let selecteur = document.querySelectorAll(".article .refPrix div input");
  selectValue = parseInt(selecteur[k].value);
  cart[k].quantity = selectValue;
  displayCart();
}

function deleteProduct(k) {
  cart.splice(k, 1);
  displayCart();
  localStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem("totalAmount", JSON.stringify(totalAmount));
}

function displayTotalAmount() {
  let priceH2 = document.querySelector("#faut-payer h2");
  totalAmount = 0;
  let totalArticle = 0;

  for (let a = 0; a < cart.length; a++) {
    totalAmount += cart[a].quantity * cart[a].price;
    totalArticle += cart[a].quantity;
  };
  priceH2.innerHTML = "Total Articles : " + totalArticle + "<br>Total cart : " + (totalAmount).toFixed(2) + "€";
}

function displayAside() {
  let aside = document.createElement("aside");
  let h2 = document.createElement("h2");
  h2.textContent = "My cart";
  let divCar = document.createElement("div")
  divCar.classList.add("cartlist");
  let divPanier = document.createElement("div")
  divPanier.setAttribute("id", "panier")

  let divPayement = document.createElement("div");
  divPayement.setAttribute("id", "faut-payer");
  let fph2 = document.createElement("h2");
  fph2.textContent = "";
  let button = document.createElement("button");
  button.textContent = "VALIDER PAYEMENT";



  divPayement.append(fph2, button);
  divCar.append(divPanier, divPayement);
  aside.append(h2, divCar);

  let main = document.querySelector("main");
  main.append(aside);
  asidePresent = true;

  let buttonSelect = document.querySelector("#faut-payer button")
  buttonSelect.addEventListener("click", function () {
    window.location = 'panier.html'
  });
}


function panierScrollbar() {
  const panierS = document.querySelector("#panier");
  let asideHeight = panierS.offsetHeight
  if (asideHeight >= 450) {
    panierS.classList.add("scrollBar")
  } else if (asideHeight <= 450 && panierS.classList.contains("scrollBar")) {
    panierS.classList.remove("scrollBar")
  }
}
displayAvailableProducts()





/* Function formulaire payement */
function checkNumber(event) {

  var aCode = event.which ? event.which : event.keyCode;

  let card = document.querySelector("#cardNumberText")
  let cardValue = card.value
  // card.length
  if (cardValue.length == 4 || cardValue.length == 11 || cardValue.length == 18) {
    card.value += " - "
  }
  if (aCode > 31 && (aCode < 48 || aCode > 57)) {
    return false;
  }
  return true;

}
function pageLoad() {
  let showPassword = document.querySelector("#displayPassword")
  let passwordShow = false;
  showPassword.addEventListener("click", function () {
    if (passwordShow == true) {
      document.querySelector("#passwordCheck").type = "password";
      passwordShow = false;
    } else {
      document.querySelector("#passwordCheck").type = "text";
      passwordShow = true;
    }
  })
  cartInPayment()
}

function asidePerdu() {
  let aside = document.createElement("aside");
  let h2 = document.createElement("h2");
  h2.textContent = "My cart";
  let divCar = document.createElement("div")
  divCar.classList.add("cartlist");
  let divPanier = document.createElement("div")
  divPanier.setAttribute("id", "panier")

  let divPayement = document.createElement("div");
  divPayement.setAttribute("id", "faut-payer");
  let fph2 = document.createElement("h2");
  fph2.textContent = "";


  divPayement.append(fph2);
  divCar.append(divPanier, divPayement);
  aside.append(h2, divCar);

  let main = document.querySelector("#payementDiv");
  main.append(aside);
}


function cartInPayment() {
  asidePerdu();
  let cart = JSON.parse(localStorage.getItem("cart"));
  let asideElement = document.querySelector("#panier");
  for (let k = 0; k < cart.length; k++) {
    //nombreArticlePanier = document.querySelectorAll(".quantity");
    let div = document.createElement("div");
    div.classList.add("ligne");
    let div2 = document.createElement("div");
    div2.classList.add("article");
    let panier = `
    <div class="article">
      <img src=${cart[k].imgSrc} alt=${cart[k].imgAlt}>
      <div class="refPrix">
        <div>
          <span>Ref : ${cart[k].ref}</span>
        </div>
        <div>
          <span>${cart[k].price}€</span>
          <input class="quantity" type="number" value="${cart[k].quantity}" min="1" max="99" maxlength="3">
        </div>
      </div>
    </div>
    <span class="cubePrice">${(cart[k].quantity * cart[k].price).toFixed(2)}€</span>
  `
    div.innerHTML = panier;

    /*creation du button Supprimer avec image et insert it/them inside divElement ligne_________________*/
    let deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("alt", "supprimer l'article du panier");
    let benImg = document.createElement("img");
    benImg.setAttribute("src", "./assets/poubelle.webp");
    deleteBtn.append(benImg);
    div.append(deleteBtn);
    deleteBtn.addEventListener("click", function () {
      deleteProduct(k);
    });

    asideElement.append(div);

    let selecteur = document.querySelectorAll(".article .refPrix div input")
    selecteur[k].addEventListener("change", function () {
      refreshValue(k)
    });
    panierScrollbar()


    let priceH2 = document.querySelector("#faut-payer h2");
    let totalAmount = 0;
    let totalArticle = 0;

    totalAmount += cart[k].quantity * cart[k].price;
    totalArticle += cart[k].quantity;
    priceH2.innerHTML = "Nombre d'articles dans le panier : " + totalArticle + "<br>Total à payer : " + (totalAmount).toFixed(2) + "€";
  }
}
