'use strict'

class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this._goods = [];
        this._allProducts = [];

        this._fetchGoods();
        this._render();

        console.log(this.goodsTotalWithDiscount());
    }

    _fetchGoods() {
        this._goods = [
            { id: 1, title: 'Notebook', price: 20000 },
            { id: 2, title: 'Mouse', price: 1500 },
            { id: 3, title: 'Keyboard', price: 5000 },
            { id: 4, title: 'Gamepad', price: 4500 },
        ];

    }

    _render() {
        const block = document.querySelector(this.container);

        this._goods.forEach((product) => {
            let productObject = new ProductItem(product);
            this._allProducts.push(productObject);
            block.insertAdjacentHTML("beforeend", productObject.render());
        });

    }

    //DOM дергать не стал, т.к. пока-что его и дергать-то некуда)
    goodsTotalCount() {
        let total = 0
        this._goods.forEach(product => total += product.price);
        return total
    }

    goodsTotalWithDiscount(discount = 0.05) { return this.goodsTotalCount() * (1 - discount) }

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

//в целом, получилась какая-то копипаста всего вышенаписанного, 
//только работать она будет на основе нового массива с продуктами
//и выводить результаты в новый контейнер
class CartList {
    constructor(container = '.cart') {
        this.container = container;
        this._cartedGoods = [];
    }

    //добавляет товар в корзину
    addToCart(product) {
        this._cartedGoods += product;
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