const availableProducts = [{
  ref: 23112022,
  imgSrc: "./assets/screwdriver-electricity.png",
  imgAlt: "electric screwdriver",
  price: 15.00,
  quantity: 1
},
{
  ref: 24112022,
  imgSrc: "./assets/screwdriver-torque.png",
  imgAlt: "screwdriver torque",
  price: 12.00,
  quantity: 1
},
{
  ref: 25112022,
  imgSrc: "./assets/adjustable-spanner.webp",
  imgAlt: "adjustable spanner",
  price: 25.00,
  quantity: 1
},
{
  ref: 26112022,
  imgSrc: "./assets/torx-hex-key-clés-6-pans.webp",
  imgAlt: "torx-hex-key",
  price: 39.99,
  quantity: 1
},
{
  ref: 27112022,
  imgSrc: "./assets/vis-different-sizes.webp",
  imgAlt: "different sizes of screw",
  price: 2.00,
  quantity: 1
},
{
  ref: 28112022,
  imgSrc: "./assets/marteau.webp",
  imgAlt: "hammer",
  price: 26.89,
  quantity: 1
},
{
  ref: 29112022,
  imgSrc: "./assets/bubble-level.webp",
  imgAlt: "bubble level",
  price: 28.50,
  quantity: 1
},
{
  ref: 30112022,
  imgSrc: "./assets/laser-level.webp",
  imgAlt: "laser level",
  price: 43.89,
  quantity: 1
},
{
  ref: 31112022,
  imgSrc: "./assets/drill-perceuse.webp",
  imgAlt: "drill",
  price: 75.95,
  quantity: 1
},
{
  ref: 32112022,
  imgSrc: "./assets/wood-drill-bit.webp",
  imgAlt: "wood drill bit",
  price: 24.99,
  quantity: 1
},
{
  ref: 33112022,
  imgSrc: "./assets/steel-drill-bit.webp",
  imgAlt: "steel drill bit",
  price: 26.99,
  quantity: 1
},
{
  ref: 34112022,
  imgSrc: "./assets/grinder-meuleuse.webp",
  imgAlt: "grinder meuleuse",
  price: 64.69,
  quantity: 1
},
{
  ref: 35112022,
  imgSrc: "./assets/steel-sandpaper.webp",
  imgAlt: "steel sandpaper",
  price: 16.68,
  quantity: 1
},
{
  ref: 36112022,
  imgSrc: "./assets/polishing-sandpaper.webp",
  imgAlt: "polishing sandpaper",
  price: 17.95,
  quantity: 1
},
{
  ref: 37112022,
  imgSrc: "./assets/nipper-pince-a-bec.webp",
  imgAlt: "nipper",
  price: 16.98,
  quantity: 1
}
];

let inventaireSearch = ["screwdriver", "screwdriver torque", "spanner", "torx-hex-key", "different sizes of screw", "hammer", "bubble level", "laser level", "drill", "wood drill bit", "steel drill bit", "grinder meuleuse", "steel sandpaper", "polishing sandpaper", "nipper"];

let searchBar = document.querySelector("#search");

searchBar.addEventListener("input", function () {
  displayAvailableProducts();
})


/*faire idem pour tous les autres articles.
const availableProducts est le nom de notre tableau qui contient des objets (c'est à dire nos articles).
La syntaxe est des [] pour dire tableau et des {} pour dire objets et des propriétés suivies de : et enfin des valeurs (comme pour les variables). 
Faire attention aux virgules à la fin du couple propriété: valeur, et à la fin des {},*/




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
let nombreOfart = [];
let nombreArticlePanier = [];


function addProductToCart(i) {

  //nombreOfart = document.querySelectorAll(".outils input");
  let productToAdd = { ...availableProducts[i] }
  //productToAdd.quantity = parseInt(nombreOfart[i].value);

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

  availableProducts[i].quantity = 1;
  displayAvailableProducts()
  displayCart();
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
      panierScrollbar()
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

