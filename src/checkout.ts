import type { DiscountStrategy } from './types';
import ProductCatalog from './productCatalog';

export default class Checkout {
	private cart: Map<string, number> = new Map();
	private pricingRules: Map<string, DiscountStrategy> = new Map();
	private catalog: ProductCatalog;

	constructor(pricingRules: { sku: string; strategy: DiscountStrategy }[], catalog: ProductCatalog) {
	  this.catalog = catalog;
	  pricingRules.forEach(({ sku, strategy }) => this.pricingRules.set(sku, strategy));
	}

	/**
	 * Scan adds a product to the cart
	 * @param sku - The SKU of the product to add to the cart
	 * @throws If product with the specified SKU does not exist
	 */

	scan(sku: string): void {
	  if (!this.catalog.getProduct(sku)) {
		throw new Error(`Product with SKU ${sku} not found.`);
	  }
	  console.log(`scanning... sku: ${sku}....`);
	  this.cart.set(sku, (this.cart.get(sku) || 0) + 1);
	}

	/**
	 * showItems displays the items in the cart
	 */
	showItems(): void {
	  const items = this.cart;
	  console.log('Items in cart:');
	  items.forEach((quantity, sku) => {
		console.log(`quantity and sku : ${quantity} x ${sku}`);
	  });
	}

	/**
	 * total calculates the total price of items in the cart, applying any applicable pricing rules.
	 * @returns The total price of items in the cart
	 */

	total(): number {
		let totalPrice = 0;
		for (const [sku, quantity] of this.cart.entries()) {
		  const product = this.catalog.getProduct(sku)!;
		  const price = product.price;
		  const strategy = this.pricingRules.get(sku);
		  totalPrice += strategy ? strategy.applyDiscount(sku, quantity, price, this.cart, this.catalog) : quantity * price;
		}
		return totalPrice;
	}
}
