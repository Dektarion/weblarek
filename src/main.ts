import './scss/styles.scss';

import { ProductCatalog } from './components/models/ProductCatalog.ts';
import { Cart } from './components/models/Cart.ts';
import { Buyer } from './components/models/Buyer.ts';
import { apiProducts } from './utils/data.ts';
import { Api } from './components/base/Api.ts';
import { API_URL } from './utils/constants.ts';
import { Communication } from './components/api/Communication.ts';

const productCatalog = new ProductCatalog();
productCatalog.setProductList(apiProducts.items);
productCatalog.setSelectedProduct(apiProducts.items[3]);

const cart = new Cart();
for (let i: number = 0; i < 4; i++) {
  cart.addToCart(apiProducts.items[i]);
};

const buyer = new Buyer();

const api = new Api(API_URL);
const communicationApi = new Communication(api);

console.log('Массив товаров из каталога:', productCatalog.getProductList());
console.log('Товар из каталога по ID:', productCatalog.getProductById(apiProducts.items[2].id));
console.log('Товар из каталога по ID:', productCatalog.getProductById('123-123-12312-123'));
console.log('Выбранный товар из каталога:', productCatalog.getSelectedProduct());

console.log('Заполненная корзина товарами из каталога:', cart.getListFromCart());
console.log('Общая стоимость корзины:', cart.getTotalCartCost());
console.log('Общее кол-во товаров в корзине:', cart.getTotalCartCount());
console.log('Товар из корзины по ID:', cart.checkProductInCartById(apiProducts.items[3].id));

cart.removeFromCart(apiProducts.items[3]);
console.log('Корзина после удаления товара из каталога:', cart.getListFromCart());

console.log('Общая стоимость корзины:', cart.getTotalCartCost());
console.log('Общее кол-во товаров в корзине:', cart.getTotalCartCount());
console.log('Товар из корзины по ID:', cart.checkProductInCartById(apiProducts.items[2].id));
console.log('Товар из корзины по ID:', cart.checkProductInCartById(apiProducts.items[3].id));
console.log('Товар из корзины по ID:', cart.checkProductInCartById('123-1234-1241'));

cart.clearCart();
console.log('Корзина после очистки:', cart.getListFromCart());

console.log('1-я проверка объекта покупателя:', buyer.getOrderInformation());
buyer.setOrderInformation({email: '123@ya.ru', phone: '+79223458734'});
console.log('2-я проверка объекта покупателя с мок-данными:', buyer.getOrderInformation());
buyer.setOrderInformation({email: '123@ya.ru', phone: '+79223458734', address: 'г. Пушкино, ул. Колотушкино', payment: 'cash'});
console.log('3-я проверка объекта покупателя с мок-данными:', buyer.getOrderInformation());
buyer.setOrderInformation({email: '', payment: ''});
console.log('4-я проверка объекта покупателя с мок-данными:', buyer.getOrderInformation());
buyer.clearOrderInformation();
console.log('Проверка объекта покупателя после очистки:', buyer.getOrderInformation());
buyer.setOrderInformation({email: '123@ya.ru', phone: '', address: '', payment: 'cash'});
console.log('5-я проверка объекта покупателя при добавлении части полей:', buyer.getOrderInformation());
buyer.setOrderInformation({email: '', phone: '+79333458734', address: 'г. Колотушкино, ул. Пушкина', payment: ''});
console.log('6-я проверка объекта покупателя при добавлении части полей:', buyer.getOrderInformation());

buyer.clearOrderInformation();
console.log('1-я проверка валидации', buyer.validationOrderInformation());
buyer.setOrderInformation({email: '123@ya.ru', phone: '', address: '', payment: ''});
console.log('2-я проверка валидации', buyer.validationOrderInformation());
buyer.setOrderInformation({email: '123@ya.ru', phone: '', address: '', payment: 'card'});
console.log('3-я проверка валидации', buyer.validationOrderInformation());
buyer.setOrderInformation({email: '123@ya.ru', phone: '+79333458734', address: '', payment: 'card'});
console.log('4-я проверка валидации', buyer.validationOrderInformation());
buyer.setOrderInformation({email: '123@ya.ru', phone: '+79333458734', address: 'г. Колотушкино, ул. Пушкина', payment: 'card'});
console.log('4-я проверка валидации', buyer.validationOrderInformation());


console.log('1-й тест обращения к серверу за данными по API:', await communicationApi.getProductsFromServer().catch((error) => console.error(error)));

const responseFromServer = await communicationApi.getProductsFromServer();
productCatalog.setProductList(responseFromServer.items);
console.log('2-й тест API, каталог данных из сервера записан в модель для хранения данных:', productCatalog.getProductList());
