import { TProductList, TRequestForServer } from "../../types/index.ts";
import { Api } from "./Api.ts";

export class Communication {
  protected _api: Api;

  constructor(api: Api) {
    this._api = api;
  };

  get(): Promise<TProductList> {
    return this._api.get('/product/');
  };

  post(data: object): object {
    return this._api.post<TRequestForServer>('/order/', data);
  };
};