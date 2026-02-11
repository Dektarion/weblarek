import { CardImage } from "../abstract/CardImage.ts";
import { ensureElement } from "../../utils/utils.ts";
import { ICardActions } from "../../types/index.ts";

export class CardPreviewUI extends CardImage {
  protected _descriptionElement: HTMLParagraphElement;

  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);

    this._descriptionElement = ensureElement<HTMLParagraphElement>('.card__text', this.container);

    if (actions?.onClick) {
      this.container.addEventListener('click', actions.onClick);
    }
  };

  set text(value: string) {
    this._descriptionElement.textContent = value;
  };
};