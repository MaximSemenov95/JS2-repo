'use strict'
const API = 'https://raw.githubusercontent.com/MaximSemenov95/online-store-api/master/responses';

class List {
    constructor(container, url) {
        this.container = container;
        this.url = url;
        this.goods = [];
        this.allProducts = [];
        this._init();
    }

    getFromServer(url = `${API + this.url}`) {
        return fetch(url)
            .then((response) => response.json())
            .catch((err) => console.log(err))
    }

    processData(data) {
        this.goods = [...data];
        this.render();
        console.log(this.goodsTotalWithDiscount());
    }

    filter(value) {
        const regexp = new RegExp(value, 'i');
        this.filtered = this.allProducts.filter(product => regexp.test(product.title));
        this.allProducts.forEach(product => {
            const block = document.querySelector(`.product-item[data-id="${product.id}"]`);
            if (!this.filtered.includes(product)) {
                block.classList.add('invisible');
            } else {
                block.classList.remove('invisible');
            }
        })
    }

    render() {
        this.goods.forEach((product) => {
            let productObject = new this.renderType(product);
            this.allProducts.push(productObject);
            document.querySelector(this.container).insertAdjacentHTML("beforeend", productObject.getMarkup());
        });
    }

    _init() {
        return false
    }

    goodsTotalCount() { return this.allProducts.reduce((total, item) => total + item.price, 0) }

    goodsTotalWithDiscount(discount = 5) { return this.goodsTotalCount() * (1 - (discount / 100)) }

}

class Item {
    constructor(product, img = 'https://placehold.co/200') {
        this.id = product.id;
        this.title = product.title;
        this.price = product.price;
        this.img = img;
    }

    render(markup) {
        return markup;
    }
}

class ProductList extends List {
    constructor(cart, container = '.products', url = '/catalogData.json') {
        super(container, url);
        this.cart = cart;
        this.getFromServer().then(response => this.processData(response));
        this.renderType = ProductItem;
    }

    _init() {
        document.querySelector(this.container).addEventListener('click', event => {
            if (event.target.classList.contains('product-btn')) {
                this.cart.addToCart(event.target)
            }
        });

        document.querySelector('.search-form').addEventListener('submit', event => {
            event.preventDefault();
            this.filter(document.querySelector('.search-field').value);
        });
    }
}

class ProductItem extends Item {
    getMarkup() {
        return `<div class="product-item" data-id="${this.id}">
                    <img class="product-img" src="${this.img}" alt="product image">
                    <div class="product-details">
                        <h3 class="product-heading">${this.title}</h3>
                        <p class="product-price">${this.price}</p>
                        <button class="product-btn" data-id="${this.id}" data-price="${this.price}" data-title="${this.title}">Добавить в корзину</button>
                    </div>
                </div>`;
    }
}

class Cart extends List {
    constructor(container = '.cart-block', url = '/getCart.json') {
        super(container, url);
        this.getFromServer().then(response => this.processData(response.contents));
        this.renderType = CartItem;
    }

    addToCart(element) {
        this.getFromServer(`${API}/addToCart.json`)
            .then(data => {
                if (data.result === 1) {
                    let productId = Number(element.dataset['id']);
                    let findProduct = this.allProducts.find(product => product.id === productId);
                    if (findProduct) {
                        findProduct.quantity++;
                        this._updateCart(findProduct);
                    } else {
                        let product = {
                            id: productId,
                            price: Number(element.dataset['price']),
                            title: element.dataset['title'],
                            quantity: 1
                        }
                        this.goods = [product];
                        this.render();
                    };
                } else {
                    alert('Error');
                }
            });
    }

    removeFromCart(element) {
        this.getFromServer(`${API}/removeFromCart.json`)
            .then(data => {
                if (data.result === 1) {
                    let productId = Number(element.dataset['id']);
                    let findProduct = this.allProducts.find(product => product.id === productId);
                    if (findProduct.quantity > 1) {
                        findProduct.quantity--;
                        this._updateCart(findProduct);
                    } else {
                        this.allProducts.splice(this.allProducts.indexOf(findProduct), 1);
                        document.querySelector(`.cart-item[data-id="${productId}"]`).remove();
                    };
                } else {
                    alert('Error');
                }
            });
    }

    _updateCart(product) {
        let block = document.querySelector(`.cart-item[data-id="${product.id}"]`);
        block.querySelector('.product-quantity').textContent = `Количество: ${product.quantity}`;
        block.querySelector('.product-price ').textContent = `${product.price * product.quantity} ₽`;
    }

    _init() {
        document.querySelector('.btn-cart').addEventListener('click', () => {
            document.querySelector(this.container).classList.toggle('invisible');
        });
        document.querySelector(this.container).addEventListener('click', e => {
            if (e.target.classList.contains('del-btn')) {
                this.removeFromCart(e.target);
            }
        });
    }

}

class CartItem extends Item {
    constructor(element, img = 'https://placehold.co/80') {
        super(element, img);
        this.quantity = element.quantity;
    }

    getMarkup() {
        return `<div class="cart-item" data-id="${this.id}">
            <div class="product-bio">
            <img src="${this.img}" alt="Some image">
            <div class="product-desc">
            <p class="product-title">${this.title}</p>
            <p class="product-quantity">Количество: ${this.quantity}</p>
        <p class="product-single-price">${this.price} за ед.</p>
        </div>
        </div>
        <div class="right-block">
            <p class="product-price">${this.quantity * this.price} ₽</p>
            <button class="del-btn" data-id="${this.id}">&times;</button>
        </div>
        </div>`
    }


}

const cart = new Cart();

const productList = new ProductList(cart);