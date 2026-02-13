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
import { IProduct, TProductList } from './types/index.ts';
import { CardPreviewUI } from './components/view/CardPreviewUI.ts';
import { CartUI } from './components/view/CartUI.ts';

/* Экземпляры клсссов */
const events = new EventEmitter();
const api = new Api(API_URL);
const communicationApi = new Communication(api);
const productsCatalog = new ProductCatalog(events);
const cartModel = new Cart(events);

const header = new HeaderUI(events, DOM_ELEMENTS.header);
const main = new MainGalleryUI(DOM_ELEMENTS.main);
const modal = new ModalUI(events, DOM_ELEMENTS.modal);
const cart = new CartUI(cloneTemplate(DOM_ELEMENTS.cart));

const cardPreview = new CardPreviewUI(cloneTemplate(DOM_ELEMENTS.cardPreviewTemplate), {
    onClick: () => events.emit(EventState.CARD_BTN_CLICK, productsCatalog.getSelectedProduct())
});


/* Обработчики событий*/
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
  const counter = cartModel.getTotalCartCount();
  const updTextButton = {
    ...productsCatalog.getSelectedProduct(),
    textButton: btnTextForModalCard.delete,
  };

  cardPreview.render(updTextButton);
  header.render( { counter } );

});











events.on(EventState.CART_OPEN, () => {

  modal.render({ content: cart.render() });
  modal.open();
});


events.on(EventState.MODAL_CLOSE, () => {;
  modal.close();
});























try {
  const catalogOfProductsFromServer: TProductList = await communicationApi.getProductsFromServer();
  productsCatalog.setProductList(catalogOfProductsFromServer.items);
} catch (error) {
  console.error(error);
};



// DOM_ELEMENTS.main.replaceChildren(modal.render({buttonText: 'Заказать'}));



