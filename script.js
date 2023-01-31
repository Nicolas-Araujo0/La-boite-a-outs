const availableProducts = [{
  ref: 23112022,
  imgSrc: "./assets/screwdriver-electricity.png",
  imgAlt: "tournevis plat",
  price: 15.00,
  quantity: 1
},
{
  ref: 24112022,
  imgSrc: "./assets/screwdriver-torque.png",
  imgAlt: "tournevis cruciforme",
  price: 12.00,
  quantity: 1
},
{
  ref: 25112022,
  imgSrc: "./assets/adjustable-spanner.webp",
  imgAlt: "clé à mollette réglable",
  price: 25.00,
  quantity: 1
},
{
  ref: 26112022,
  imgSrc: "./assets/torx-hex-key-clés-6-pans.webp",
  imgAlt: "clé torx-hex",
  price: 39.99,
  quantity: 1
},
{
  ref: 27112022,
  imgSrc: "./assets/vis-different-sizes.webp",
  imgAlt: "vis",
  price: 2.00,
  quantity: 1
},
{
  ref: 28112022,
  imgSrc: "./assets/marteau.webp",
  imgAlt: "marteau",
  price: 26.89,
  quantity: 1
},
{
  ref: 29112022,
  imgSrc: "./assets/bubble-level.webp",
  imgAlt: "niveau à bulle",
  price: 28.50,
  quantity: 1
},
{
  ref: 30112022,
  imgSrc: "./assets/laser-level.webp",
  imgAlt: "niveau à bulle laser",
  price: 43.89,
  quantity: 1
},
{
  ref: 31112022,
  imgSrc: "./assets/drill-perceuse.webp",
  imgAlt: "perçeuse",
  price: 75.95,
  quantity: 1
},
{
  ref: 32112022,
  imgSrc: "./assets/wood-drill-bit.webp",
  imgAlt: "mèches à bois",
  price: 24.99,
  quantity: 1
},
{
  ref: 33112022,
  imgSrc: "./assets/steel-drill-bit.webp",
  imgAlt: "mèches acier",
  price: 26.99,
  quantity: 1
},
{
  ref: 34112022,
  imgSrc: "./assets/grinder-meuleuse.webp",
  imgAlt: "meuleuse",
  price: 64.69,
  quantity: 1
},
{
  ref: 35112022,
  imgSrc: "./assets/steel-sandpaper.webp",
  imgAlt: "papier de verre acier",
  price: 16.68,
  quantity: 1
},
{
  ref: 36112022,
  imgSrc: "./assets/polishing-sandpaper.webp",
  imgAlt: "papier de polissage",
  price: 17.95,
  quantity: 1
},
{
  ref: 37112022,
  imgSrc: "./assets/nipper-pince-a-bec.webp",
  imgAlt: "pince à bec",
  price: 16.98,
  quantity: 1
}
];
/*Gestion du menuDeroulant_______________________________________*/
let menuDeroulant = document.querySelector("menu>ul li .absolu");
function displayCategoriesProd() {
  menuDeroulant.style.display = "block";
}
function stopDisplayCategories() {
  menuDeroulant.style.display = "none";
}


/*Gestion de la searchBar_______________________________________*/
let inventaireSearch = ["tournevis plat", "tournevis cruciforme", "clé à mollette réglable", "clé torx-hex", "vis", "marteau", "niveau à bulle", "niveau à bulle laser", "perçeuse", "mèches à bois", "mèches acier", "meuleuse", "papier de verre acier", "papier de polissager", "pince à bec"];

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

    if (inventaireSearch[i].includes(searchBar.value)) {

      let divOutils = document.createElement("div");
      divOutils.classList.add("outils");
      let article = `
    <h3>Ref: ${availableProducts[i].ref}</h3>
    <img src= ${availableProducts[i].imgSrc} alt= ${availableProducts[i].imgAlt}>
    <p class="price">${availableProducts[i].price}€</p>
    <label>Qté: </label>
    <input class="quantite" type="number" min="1" max="99" value="1" ><br>
    <button class="addButton" onclick="addProductToCart(${i})">ajouter</button>
    `// est une autre méthode pour createElement
      divOutils.innerHTML = article;
      // ajoute des éléments et du txt à la divOutils créée.
      sectionElement.append(divOutils);// ajouter les divOutils à l'élément parent
    }
  }
  mainGrid.style.display = "grid";
  mainGrid.style["grid-template-columns"] = "1fr";
}
displayAvailableProducts()


let cart = [];
let nombreOfart = [];
let nombreArticlePanier = [];

function addProductToCart(i) {
  nombreOfart = document.querySelectorAll(".outils input");
  let productToAdd = { ...availableProducts[i] }
  productToAdd.quantity = parseInt(nombreOfart[i].value);
  if (cart == "") {
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
  displayCart();
}


let asidePresent = false;

function displayCart() {
  if (asidePresent == false) {
    mainGrid.style["grid-template-columns"] = "4fr 2fr";
    displayAside()
  }
  if (cart == "") {
    document.querySelector("aside").style.visibility = "hidden";
  } else {
    document.querySelector("aside").style.visibility = "visible";
    let asideElement = document.querySelector("#panier");
    asideElement.innerHTML = ""
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

      displayTotalAmount()
    }
  }
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
}

function displayTotalAmount() {
  let priceH2 = document.querySelector("#faut-payer h2");
  let totalAmount = 0;
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
}

