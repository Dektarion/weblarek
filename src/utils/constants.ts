/* Константа для получения полного пути для сервера. Для выполнения запроса
необходимо к API_URL добавить только ендпоинт. */
export const API_URL = `${import.meta.env.VITE_API_ORIGIN}/api/weblarek`;

/* Константа для формирования полного пути к изображениям карточек.
Для получения полной ссылки на картинку необходимо к CDN_URL добавить только название файла изображения,
которое хранится в объекте товара. */
export const CDN_URL = `${import.meta.env.VITE_API_ORIGIN}/content/weblarek`;

/* Константа соответствий категорий товара модификаторам, используемым для отображения фона категории. */
export const categoryMap = {
  'софт-скил': 'card__category_soft',
  'хард-скил': 'card__category_hard',
  'кнопка': 'card__category_button',
  'дополнительное': 'card__category_additional',
  'другое': 'card__category_other',
};

export const settings = {

};

export const priceLabels = {
  free: 'Бесценно',
  label: ' синопсов',
}

/* Перечисление состояний событий */
export enum EventState {
  CART_OPEN = 'cart:open',
  CART_CLOSE = 'cart:close',
  MODAL_OPEN = 'modal:open',
  MODAL_CLOSE = 'modal:close',
  CATALOG_CHANGED = 'catalog:changed',
  CARD_SELECTED = 'card:selected',
  PRODUCT_BUY = 'product:buy',
};