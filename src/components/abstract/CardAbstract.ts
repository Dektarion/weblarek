import { Component } from "../base/Component.ts";
import { ensureElement } from "../../utils/utils.ts";
import { IProduct } from "../../types/index.ts";

export type TCardProps = Pick<IProduct, 'title' | 'price'>;

export abstract class Card<T extends TCardProps> extends Component<T> {
  protected _titleElement: HTMLElement;
  protected _priceElement: HTMLElement;

  constructor(container: HTMLElement) {
    super(container);

    this._titleElement = ensureElement<HTMLElement>('.card__title', this.container);
    this._priceElement = ensureElement<HTMLElement>('.card__price', this.container);
  };

  set title(value: string) {
    this._titleElement.textContent = value;
  };

  set price(value: number) {
    this._priceElement.textContent = String(value);
  };
};