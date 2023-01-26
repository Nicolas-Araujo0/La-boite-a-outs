const availableProducts = [{
  ref: 23112022,
  imgSrc: "./assets/screwdriver-electricity.png",
  imgAlt: "electric screwdriver",
  price: 15.00
},
{
  ref: 24112022,
  imgSrc: "./assets/screwdriver-torque.png",
  imgAlt: "screwdriver torque",
  price: 12.00
},
  /*faire idem pour tous les autres articles.
  const availableProducts est le nom de notre tableau qui contient des objets (c'est à dire nos articles).
  La syntaxe est des [] pour dire tableau et des {} pour dire objets et des propriétés suivies de : et enfin des valeurs (comme pour les variables). 
  Faire attention aux virgules à la fin du couple propriété: valeur, et à la fin des {},*/


];



let SectionElement = document.querySelector("section");// Element parent des div outils

function displayAvailableProducts() {
  for (let i = 0; i < availableProducts.length; i++) {
    let article = `
    <div class="outils">
    <h4>Ref: ${availableProducts[i].ref}</h4>
    <img src= ${availableProducts[i].imgSrc} alt= ${availableProducts[i].imgAlt}>
    <p class="price">${availableProducts[i].price}€</p>
    <label>Qté: </label>
    <input class="quantite" type="number" min="1" max="99" value="1"><br>
    <button class="addButton">ajouter</button>
    </div>
    `// est une autre méthode pour createElement

    SectionElement.append(article);// ajouter les outils à l'élément parent
  }
}
// displayAvailableProducts ()