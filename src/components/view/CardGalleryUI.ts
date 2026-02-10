import { Card } from "../abstract/CardAbstract.ts";
import { ensureElement } from "../../utils/utils.ts";
import { IProduct, ICardActions } from "../../types/index.ts";
import { categoryMap } from "../../utils/constants.ts";
import { CDN_URL } from "../../utils/constants.ts";

export type TCardGalleryProps = Pick<IProduct, 'image' | 'category'>;

export class CardGalleryUI extends Card<TCardGalleryProps> {
  protected _categoryElement: HTMLElement;
  protected _imageElement: HTMLImageElement;

  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);

    this._categoryElement = ensureElement<HTMLElement>('.card__category', this.container);
    this._imageElement = ensureElement<HTMLImageElement>('.card__image', this.container);

    if (actions?.onClick) {
      this.container.addEventListener('click', actions.onClick);
    }
  };

  set category(value: string) {
    this._categoryElement.textContent = value;
    this._categoryElement.classList.add(categoryMap[value as keyof typeof categoryMap]);
  };

  set image(value: string) {
    this.setImage(this._imageElement, `${CDN_URL}${value.replace('.svg', '.png')}`, this._titleElement.textContent);
  };
};