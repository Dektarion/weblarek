import './scss/styles.scss';

import { cloneTemplate } from './utils/utils.ts';

import { ProductCatalog } from './components/models/ProductCatalog.ts';
import { Cart } from './components/models/Cart.ts';
import { Buyer } from './components/models/Buyer.ts';
import { apiProducts } from './utils/data.ts';
import { Api } from './components/base/Api.ts';
import { API_URL, EventState, btnTextForModalCard } from './utils/constants.ts';
import { Communication } from './components/api/Communication.ts';

import { EventEmitter } from './components/base/Events.ts';
import { DOM_ELEMENTS } from './utils/dom-refs.ts';
import { HeaderUI } from './components/view/HeaderUI.ts';
import { MainGalleryUI } from './components/view/MainGalleryUI.ts';
import { ModalUI } from './components/view/ModalUI.ts';

import { CardGalleryUI } from './components/view/CardGalleryUI.ts';
import { IBuyer, IProduct, TProductList } from './types/index.ts';
import { CardPreviewUI } from './components/view/CardPreviewUI.ts';
import { CartUI } from './components/view/CartUI.ts';
import { ProductInCartUI } from './components/view/ProductInCartUI.ts';
import { FormOrderUI } from './components/view/FormOrderUI.ts';

/* Экземпляры клсссов */
const events = new EventEmitter();
const api = new Api(API_URL);
const communicationApi = new Communication(api);
const productsCatalog = new ProductCatalog(events);
const buyerModel = new Buyer(events);
const cartModel = new Cart(events);

const header = new HeaderUI(events, DOM_ELEMENTS.header);
const main = new MainGalleryUI(DOM_ELEMENTS.main);
const modal = new ModalUI(events, DOM_ELEMENTS.modal);
const cart = new CartUI(events, cloneTemplate(DOM_ELEMENTS.cart));

const cardPreview = new CardPreviewUI(cloneTemplate(DOM_ELEMENTS.cardPreviewTemplate), {
  onClick: () => events.emit(EventState.CARD_BTN_CLICK, productsCatalog.getSelectedProduct())
});

const FormOrder = new FormOrderUI(events, cloneTemplate(DOM_ELEMENTS.formOrder));



/* Обработчики событий */
events.on(EventState.CATALOG_CHANGED, () => {
  const cardsArr = productsCatalog.getProductList().map((product) => {
    const card = new CardGalleryUI(cloneTemplate(DOM_ELEMENTS.cardGalleryTemplate), {
      onClick: () => events.emit(EventState.CARD_SELECTED, product)
    });
    return card.render(product);
  });

  main.render({ catalog: cardsArr });
});

events.on(EventState.CARD_SELECTED, (product: IProduct) => {
  productsCatalog.setSelectedProduct(product);
});

events.on(EventState.SELECTED_CARD_SAVE, () => {
  const selectedProductCard = productsCatalog.getSelectedProduct();
  const cardModalRenderObject = {
    ...selectedProductCard,
    textButton: selectedProductCard.price === null
                ? btnTextForModalCard.disabled
                : cartModel.checkProductInCartById(selectedProductCard.id)
                ? btnTextForModalCard.delete
                : btnTextForModalCard.buy,
    statusButton: !Boolean(selectedProductCard.price),
  };
  const contentModalElement = cardPreview.render(cardModalRenderObject);

  modal.render({ content: contentModalElement });
  modal.open();
});

events.on(EventState.CARD_BTN_CLICK, (product: IProduct) => {
  cartModel.checkProductInCartById(product.id) === false
            ? cartModel.addToCart(product)
            : cartModel.removeFromCart(product);
  modal.close();
});

events.on(EventState.CART_CHANGED, () => {
  console.log('список из корзины', cartModel.getListFromCart());

  const selectedProductCard = productsCatalog.getSelectedProduct();
  const counter = cartModel.getTotalCartCount();
  const updTextButton = {
    ...selectedProductCard,
    textButton: btnTextForModalCard.delete,
  };

  const productListInCart = cartModel.getListFromCart();
  const productListInCartArr = productListInCart.map((product: IProduct) => {
    const productInCart = new ProductInCartUI(cloneTemplate(DOM_ELEMENTS.productInCartTemplate), {
      onClick: () => events.emit(EventState.PRODUCT_REMOVE, product)
    });
    const productCard = {
      ...product,
      index: productListInCart.indexOf(product) + 1,
    };
    return productInCart.render(productCard);
  });

  const cartRenderObject = {
    listOfPosition: productListInCartArr,
    summ: cartModel.getTotalCartCost(),
    statusButton: !Boolean(cartModel.getTotalCartCost()),
  };
  const cartRender = cart.render(cartRenderObject);

  modal.render({ content: cartRender });
  cardPreview.render(updTextButton);
  header.render( { counter } );
});

events.on(EventState.CART_OPEN, () => {
  if (cartModel.getTotalCartCount() === 0) {
    modal.render({ content: cart.render({
      listOfPosition: [],
      summ: cartModel.getTotalCartCost(),
      statusButton: !Boolean(cartModel.getTotalCartCost())
    }) })
  };

  modal.open();
});

events.on(EventState.PRODUCT_REMOVE, (product: IProduct) => {
  console.log('удаляемый продукт', product);
  cartModel.removeFromCart(product);
});

events.on(EventState.ORDER_START, () => {
  console.log('заказываем');


  modal.render({ content: FormOrder.render() });

});

events.on(EventState.FORM_EDIT, (formInformation: Partial<IBuyer>) => {
  buyerModel.setOrderInformation(formInformation);
});

events.on(EventState.BUYER_CAHAGED, (buyer) => {
  FormOrder.render(buyer);
  console.log(buyer);
})






events.on(EventState.MODAL_CLOSE, () => {;
  modal.close();
});






















/* Запрос данных с сервера */
try {
  const catalogOfProductsFromServer: TProductList = await communicationApi.getProductsFromServer();
  productsCatalog.setProductList(catalogOfProductsFromServer.items);
} catch (error) {
  console.error(error);
};



// DOM_ELEMENTS.main.replaceChildren(modal.render({buttonText: 'Заказать'}));



