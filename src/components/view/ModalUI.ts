import { ensureElement } from "../../utils/utils.ts";
import { Component } from "../base/Component.ts";
import { IEvents } from "../base/Events.ts";
import { EventState } from "../../utils/constants.ts";

interface IModalData {
  content: HTMLElement;
};

export class ModalUI extends Component<IModalData> {
  protected _closeButton: HTMLElement
  protected _modalContent: HTMLElement;

  constructor(protected event: IEvents, container: HTMLElement) {
    super(container);

    this._closeButton = ensureElement<HTMLElement>('.modal__close', this.container);
    this._modalContent = ensureElement<HTMLButtonElement>('.modal__content', this.container);

    this._closeButton.addEventListener('click', () => {
      this.event.emit(EventState.MODAL_CLOSE);
    });
  };

  set content(item: HTMLElement) {
    this._modalContent.append(item);
  };
};