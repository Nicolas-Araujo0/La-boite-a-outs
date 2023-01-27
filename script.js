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
  /*faire idem pour tous les autres articles.
  const availableProducts est le nom de notre tableau qui contient des objets (c'est à dire nos articles).
  La syntaxe est des [] pour dire tableau et des {} pour dire objets et des propriétés suivies de : et enfin des valeurs (comme pour les variables). 
  Faire attention aux virgules à la fin du couple propriété: valeur, et à la fin des {},*/


];

let SectionElement = document.querySelector("section");// Element parent des div outils

function displayAvailableProducts() {
  for (let i = 0; i < availableProducts.length; i++) {
    let divOutils = document.createElement("div");
    divOutils.classList.add("outils");
    let article = `
    <h4>Ref: ${availableProducts[i].ref}</h4>
    <img src= ${availableProducts[i].imgSrc} alt= ${availableProducts[i].imgAlt}>
    <p class="price">${availableProducts[i].price}€</p>
    <label>Qté: </label>
    <input class="quantite" type="number" min="1" max="99" value="1"><br>
    <button class="addButton" onclick="addProductToCart(${i})">ajouter</button>
    `// est une autre méthode pour createElement
    divOutils.innerHTML = article;
    // ajoute des éléments et du txt à la divOutils créée.
    SectionElement.append(divOutils);// ajouter les divOutils à l'élément parent
  }
}
displayAvailableProducts()

let cart = [];
let nombreOfart = [];
let nombreArticlePanier = [];

function addProductToCart(i) {
  nombreOfart = document.querySelectorAll(".outils input");
  let productToAdd = { ...availableProducts[i] }
  productToAdd.quantity = parseInt(nombreOfart[i].value);
  cart.push(productToAdd);
  displayCart();

}

let asidePresent = false;

function displayCart() {
  if (asidePresent == false) {
    displayAside()
  }
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
          <input class="quantity" type="number" value="${cart[k].quantity}" min="1" >
        </div>
      </div>
    </div>
    <span class="cubePrice">${cart[k].quantity * cart[k].price}€</span>
    <button><img src="./assets/poubelle.webp" alt="supprimer l'article du panier"></button>
  `
    div.innerHTML = panier;
    asideElement.append(div);

    displayTotalAmount()
  }
}

function displayTotalAmount() {
  let priceH2 = document.querySelector("#faut-payer h2");
  let totalAmount = 0;

  for (let a = 0; a < cart.length; a++) {
    calculCout = cart[a].quantity * cart[a].price
    totalAmount += calculCout
  };
  priceH2.innerHTML = "Total cart : " + totalAmount + "€";
}

function displayAside() {
  let aside = document.createElement("aside")
  let h2 = document.createElement("h2")
  h2.textContent = "My cart";
  let divCar = document.createElement("div")
  divCar.classList.add("cartlist");
  let divPanier = document.createElement("div")
  divPanier.setAttribute("id", "panier")

  let divPayement = document.createElement("div")
  divPayement.setAttribute("id", "faut-payer")
  let fph2 = document.createElement("h2")
  fph2.textContent = "";
  let button = document.createElement("button");
  button.textContent = "VALIDER PAYEMENT"


  divPayement.append(fph2, button)
  divCar.append(divPanier, divPayement)
  aside.append(h2, divCar)

  let main = document.querySelector("main");
  main.append(aside);

  asidePresent = true;
}