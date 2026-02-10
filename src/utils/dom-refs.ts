/**
 *  Источник DOM-элементов для создания экземпляров класса
 */
export const DOM_ELEMENTS = {
  wrapper: document.querySelector('.page__wrapper') as HTMLElement,
  header: document.querySelector('.header') as HTMLElement,
  main: document.querySelector('.gallery') as HTMLElement,
  modal: document.querySelector('.modal') as HTMLDivElement,
  cardGalleryTemplate: document.querySelector('#card-catalog') as HTMLTemplateElement,
} as const;