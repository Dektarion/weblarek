import { IBuyer, TPayment, TErrors } from '../../types/index.ts';

export class Buyer {
    protected _payment: TPayment;
    protected _email: string;
    protected _phone: string;
    protected _address: string;

    constructor(buyer: IBuyer) {
        this._payment = buyer.payment;
        this._email = buyer.email;
        this._phone = buyer.phone;
        this._address = buyer.address;
    };

    setOrderInformation(orderInfo: IBuyer): void {
        if (!this._payment) {this._payment = orderInfo.payment};
        if (!this._email) {this._email = orderInfo.email};
        if (!this._phone) {this._phone = orderInfo.phone};
        if (!this._address) {this._address = orderInfo.address};
    };

    getOrderInformation(): IBuyer {
        return {
            payment: this._payment,
            email: this._email,
            phone: this._phone,
            address: this._address
        };
    };

    clearOrderInformation(): void {
        this._payment = '';
        this._email = '';
        this._phone = '';
        this._address = '';
    };


    validationOrderInformation(orderInfo: IBuyer): TErrors {
        const errors: TErrors = {
            payment: null,
            email: null,
            phone: null,
            address: null
        };
        if (!orderInfo.payment) {errors.payment = 'Не выбран способ оплаты'};
        if (!orderInfo.address) {errors.address = 'Не указан адрес доставки'};
        if (!orderInfo.email) {errors.email = 'Не указан корректный email'};
        if (!orderInfo.phone) {errors.phone = 'Не указан номер телефона'};
        return errors;
    };
};