'use strict'

const API = 'https://raw.githubusercontent.com/MaximSemenov95/online-store-api/master/responses';

//этот парень работает с _fetchGoods, сейчас все закомментировано в пользу реализации через fetch
/*let getRequest = (url) => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status !== 200) {
                    reject('Error ' + xhr.status + ' ' + xhr.statusText);
                } else {
                    resolve(xhr.responseText);
                }
            }
        }
        xhr.send();
    });
}*/

/////////////////////////////////////////////////////////

class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this._goods = [];
        this._allProducts = [];

        //this._fetchGoods();
        this._getProducts()
            .then((data) => {
                this._goods = [...data];
                this._render();
                console.log(this.goodsTotalWithDiscount());
            });
    }

    /*_fetchGoods() {
        getRequest(`${API}/catalogData.json`).then((response) => {
            this._goods = JSON.parse(response);
            this._render();
            console.log(this.goodsTotalWithDiscount());
        }).catch((err) => {
            console.log(err);
        });
    }*/

    _getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then((response) => response.json())
            .catch((err) => console.log(err))
    }

    _render() {
        const block = document.querySelector(this.container);

        this._goods.forEach((product) => {
            let productObject = new ProductItem(product);
            this._allProducts.push(productObject);
            block.insertAdjacentHTML("beforeend", productObject.render());
        });

    }

    goodsTotalCount() { return this._goods.reduce((total, item) => total + item.price, 0) }

    goodsTotalWithDiscount(discount = 5) { return this.goodsTotalCount() * (1 - discount / 100) }

}

class ProductItem {
    constructor(product, img = 'https://picsum.photos/200?random=1') {
        this.id = product.id;
        this.title = product.title;
        this.price = product.price;
        this.img = img;
    }

    render() {
        return `<div class="product-item">
            <img class="product-img" src="${this.img}" alt="product image">
            <div class="product-details">
                <h3 class="product-heading">${this.title}</h3>
                <p class="product-price">${this.price}</p>
                <button class="product-btn">Добавить в корзину</button>
            </div>
          </div>`;
    }
}

const productList = new ProductList();

//вроде все хорошо начиналось, но, в итоге получилась какая-то копипаста
//только работать она будет на основе нового массива с продуктами
//и выводить результаты в другой контейнер
class CartList {
    constructor(container = '.cart') {
        this.container = container;
        this._cartedGoods = [];
    }

    //добавляет товар в корзину
    addToCart(product) {
        this._cartedGoods += product;
    }

    removeFromCart(product) {
        this._cartedGoods -= product;
    }

    getCartContent() {

    }

    _renderCart() {
        //создает инстанс CartProductItem, на основе this._cartedGoods
        //выводит содержимое корзины на страницу методом render() для созданного инстанса
    }

    _printPrice() {
        //вызывает goodsTotalWithDiscount и выводит итоговую цену на страницу
    }

    //методы для оплаты и оформления заказа, наверное, пока рано придумывать)
}

class CartProductItem {
    constructor(product, img = 'https://picsum.photos/200?random=1') {
        this.id = product.id;
        this.title = product.title;
        this.price = product.price;
        this.img = img;
    }

    render() {
        //получает инстанс своего класса, генерирует и возвращает
        //разметку на его основе
    }
}