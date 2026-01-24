import { IProduct } from '../../types/index.ts';

export class Cart {
	protected _purchaseProductList: IProduct[];

	constructor(purchaseProductList: IProduct[] = []) {
		this._purchaseProductList = purchaseProductList;
	}

	getListFromCart(): IProduct[] {
		return this._purchaseProductList;
	};

	addToCart(product: IProduct): void {
		this._purchaseProductList.push(product);
	};

	removeFromCart(product: IProduct): void {
		this._purchaseProductList = this._purchaseProductList.filter((item: IProduct) => item.id !== product.id);
	};

	clearCart(): void {
		this._purchaseProductList.length = 0;
	};

	getTotalCartCost(): number {
		return this._purchaseProductList.reduce((acc: number, item: IProduct) => acc + (item.price ?? 0), 0);
	};

	getTotalCartCount(): number {
		return this._purchaseProductList.length;
	};

	checkProductInCartById(id: string): boolean {
		return this._purchaseProductList.some((item: IProduct) => item.id === id);
	};
};