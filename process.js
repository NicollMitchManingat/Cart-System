const main = document.querySelector('.mainkasi');

const section = main.firstElementChild;

const article = section.firstElementChild;

const img = article.firstElementChild;

const p = img.nextElementSibling;

const article2 = article.nextElementSibling;

const products = article2.children;

const productArray = Array.from(products);
console.log(productArray);

const section2 = main.lastElementChild;

const article3 = section2.firstElementChild;

const cart = section2.lastElementChild;
console.log(cart);



productArray.forEach((product) => {
    const button = product.querySelector('button');
    button.addEventListener('click', () => {
        const h5 = document.createElement('h5');
        h5.innerText = p.firstElementChild.innerText;

        cart.appendChild(h5);
    })
});