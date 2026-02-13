import { ensureElement } from "../../utils/utils.ts";
import { Component } from "../base/Component.ts";
import { IEvents } from "../base/Events.ts";
import { EventState } from "../../utils/constants.ts";
import { ICardActions } from "../../types/index.ts";

interface ICartData {
  listOfPosition: HTMLElement[],
  summ: number,
};

export class CartUI extends Component<ICartData> {
  protected _cartList: HTMLUListElement;
  protected _cartPlaceOrderButton: HTMLButtonElement;
  protected _orderSumm: HTMLSpanElement;

  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);

    this._cartList = ensureElement<HTMLUListElement>('.basket__list', this.container);
    this._cartPlaceOrderButton = ensureElement<HTMLButtonElement>('.basket__button', this.container);
    this._orderSumm = ensureElement<HTMLSpanElement>('.basket__price', this.container);

    // this._cartButton.addEventListener('click', () => {
    //   this.event.emit(EventState.CART_OPEN);
    // });
  };

  set summ(value: number) {
    this._orderSumm.textContent = String(value);
  };
};