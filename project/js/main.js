const products = [
    { id: 1, title: 'Notebook', price: 20000 },
    { id: 2, title: 'Mouse', price: 1500 },
    { id: 3, title: 'Keyboard', price: 5000 },
    { id: 4, title: 'Gamepad', price: 4500 },
];

const renderProduct = (title, price, img = 'https://picsum.photos/200?random=1') => {
    return `<div class="product-item">
                <img class="product-img" src="${img}" alt="product image">
                <div class="product-details">
                    <h3 class="product-heading">${title}</h3>
                    <p class="product-price">${price}</p>
                    <button class="product-btn">Добавить в корзину</button>
                </div>
              </div>`;
}

const renderProducts = (list) => {
    const productList = list.map(item => renderProduct(item.title, item.price));

    productList.forEach(product => document.querySelector('.products').insertAdjacentHTML("afterbegin", product));

}

renderProducts(products);
