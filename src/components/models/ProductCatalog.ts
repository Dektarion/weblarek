import { IProduct } from '../../types/index.ts';

export class ProductCatalog {
	protected _productList: IProduct[];
	protected _selectedProduct!: IProduct;

	constructor(productList: IProduct[] = []) {
		this._productList = productList;
	}

	setProductList(productListArr: IProduct[]): void {
		this._productList = productListArr;
	};

	getProductList(): IProduct[] {
		return this._productList;
	};

	getProductById(id: string): IProduct | null {
		return this._productList.find((item: IProduct) => item.id === id) ?? null;
	};

	setSelectedProduct(product: IProduct): void {
		this._selectedProduct = product;
	};

	getSelectedProduct(): IProduct {
		return this._selectedProduct;
	};
};