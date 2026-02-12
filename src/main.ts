import './scss/styles.scss';

import { cloneTemplate } from './utils/utils.ts';

import { ProductCatalog } from './components/models/ProductCatalog.ts';
import { Cart } from './components/models/Cart.ts';
import { Buyer } from './components/models/Buyer.ts';
import { apiProducts } from './utils/data.ts';
import { Api } from './components/base/Api.ts';
import { API_URL, EventState } from './utils/constants.ts';
import { Communication } from './components/api/Communication.ts';

import { EventEmitter } from './components/base/Events.ts';
import { DOM_ELEMENTS } from './utils/dom-refs.ts';
import { HeaderUI } from './components/view/HeaderUI.ts';
import { MainGalleryUI } from './components/view/MainGalleryUI.ts';
import { ModalUI } from './components/view/ModalUI.ts';

import { CardGalleryUI } from './components/view/CardGalleryUI.ts';
import { IProduct, TProductList } from './types/index.ts';
import { CardPreviewUI } from './components/view/CardPreviewUI.ts';


const events = new EventEmitter();
const api = new Api(API_URL);
const communicationApi = new Communication(api);
const productsCatalog = new ProductCatalog(events);

const header = new HeaderUI(events, DOM_ELEMENTS.header);
const main = new MainGalleryUI(DOM_ELEMENTS.main);
const modal = new ModalUI(events, DOM_ELEMENTS.modal);


events.on(EventState.CATALOG_CHANGED, () => {
  const cardsArr = productsCatalog.getProductList().map((product) => {
    const card = new CardGalleryUI(cloneTemplate(DOM_ELEMENTS.cardGalleryTemplate), {
      onClick: () => events.emit(EventState.CARD_SELECTED, product),
    });
    return card.render(product);
  });

  main.render({ catalog: cardsArr });
});

events.on(EventState.CARD_SELECTED, (product: IProduct) => {
  productsCatalog.setSelectedProduct(product);
});

events.on(EventState.SELECTED_CARD_SAVE, () => {
  const cardPreview = new CardPreviewUI(cloneTemplate(DOM_ELEMENTS.cardPreviewTemplate));
  modal.setContent(cardPreview.render(productsCatalog.getSelectedProduct()));
  modal.open();
});

events.on(EventState.MODAL_CLOSE, () => {;
  modal.close();
});























try {
  const catalogOfProductsFromServer: TProductList = await communicationApi.getProductsFromServer();
  productsCatalog.setProductList(catalogOfProductsFromServer.items);
  console.log(productsCatalog.getProductList());
} catch (error) {
  console.error(error);
};



// DOM_ELEMENTS.main.replaceChildren(modal.render({buttonText: 'Заказать'}));



