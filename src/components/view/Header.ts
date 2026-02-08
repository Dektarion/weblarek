import { ensureElement } from "../../utils/utils.ts";
import { Component } from "../base/Component.ts";
import { IEvents } from "../base/Events.ts";
import { EventState } from "../../utils/constants.ts";

interface IHeaderData {
  counter: number;
};

export class Header extends Component<IHeaderData> {
  protected _counterElement: HTMLElement;
  protected _cartButton: HTMLButtonElement;

  constructor(protected event: IEvents, container: HTMLElement) {
    super(container);

    this._counterElement = ensureElement<HTMLElement>('.header__basket-counter', this.container);
    this._cartButton = ensureElement<HTMLButtonElement>('.header__basket', this.container);

    this._cartButton.addEventListener('click', () => {
      this.event.emit(EventState.CART_OPEN);
    });
  };

  set counter(value: number) {
    this._counterElement.textContent = String(value);
  };
};
