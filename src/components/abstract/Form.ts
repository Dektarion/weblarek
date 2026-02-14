import { Component } from "../base/Component.ts";
import { ensureAllElements, ensureElement } from "../../utils/utils.ts";
import { IBuyer } from "../../types/index.ts";
import { IEvents } from "../base/Events.ts";

export abstract class Form extends Component<IBuyer> {
  protected _orderFieldsElements: HTMLElement[];
  protected _errorElement: HTMLSpanElement;
  protected _buttonElement: HTMLButtonElement;

  constructor(protected event: IEvents, container: HTMLElement) {
    super(container);

    this._orderFieldsElements = ensureAllElements<HTMLElement>('.order__field', this.container);
    this._errorElement = ensureElement<HTMLSpanElement>('.form__errors', this.container);
    this._buttonElement = ensureElement<HTMLButtonElement>('[type="submit"]', this.container);
  };
};