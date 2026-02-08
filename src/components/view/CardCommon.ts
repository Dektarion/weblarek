import { Card, TCardProps } from "../abstract/CardAbstract";
import { ensureElement } from "../../utils/utils.ts";
import { IProduct } from "../../types/index.ts";
import { categoryMap } from "../../utils/constants.ts";

export type TCardCommonProps = Pick<IProduct, 'image' | 'category'> & TCardProps;

export class CardCommon extends Card<TCardCommonProps> {
  protected _categoryElement: HTMLElement;
  protected _imageElement: HTMLImageElement;

  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);

    this._categoryElement = ensureElement<HTMLElement>('.card__category', this.container);
    this._imageElement = ensureElement<HTMLImageElement>('.card__image', this.container);
  };

  set category(value: string) {
    this._categoryElement.textContent = value;
    this._categoryElement.classList.add(categoryMap[value as keyof typeof categoryMap]);

  };

  set image(value: string) {
    this.setImage(this._imageElement, value, this._titleElement.textContent);
  };
};