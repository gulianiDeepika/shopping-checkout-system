import ProductCatalog from './productCatalog';

/** Product represents a SKU and its name, and price */
export type Product = {
	sku: string;
	name: string;
	price: number;
};

/**
 * Interface for defining discount strategies for applying discounts to items in a cart.
 */

export interface DiscountStrategy {
	applyDiscount(sku: string, quantity: number, price: number, cart: Map<string, number>, catalog: ProductCatalog): number;
}

/**
 * A bulk discount policy that provides a discount when a certain quantity of a product is purchased.
 */

/**
 * @param quantity - the minimum quantity of the product to qualify for the discount
 * @param price - The new price of each individual item when purchased in bulk
 */
export class BulkDiscount implements DiscountStrategy {
	constructor(private quantity: number, private price: number) {}
	applyDiscount(sku: string, quantity: number, price: number): number {
		if (quantity >= this.quantity) {
			return quantity * this.price;
		}
		return quantity * price;
	}
}

/**
 * Bogo Discount pricing when we can extra discount on purchase of a certain number of products.
 */

/**
 * @param quantity - The minimum quantity of the product to qualify for the discount
 * @param offerQuantity - The quantity of the product to be charged for when the above quantity of products are purchased
 */
export class BogoDiscount implements DiscountStrategy {
	constructor(private quantity: number, private offerQuantity: number) {}
	applyDiscount(sku: string, quantity: number, price: number): number {
		if (quantity >= this.quantity) {
			const chargeableQuantity = (Math.floor(quantity / this.quantity) * this.offerQuantity) + (quantity % this.quantity);
    		return chargeableQuantity * price;
		}
    	return quantity * price;
	}
}

/**
 * A free product discount policy that gives a free product when the specified required product quantity is reached.
 */

/**
 * @param requiredSku - The SKU of the product that needs to be purchased
 * @param requiredQuantity - The quantity of the required product needed to trigger the free product
 * @param freeSku - The SKU of the product that will be given for free
 */
export class FreeProductDiscount implements DiscountStrategy {
	constructor(private requiredSku: string, private requiredQuantity: number, private freeSku: string) {}
	applyDiscount(sku: string, quantity: number, price: number, cart: Map<string, number>, catalog: ProductCatalog): number {
	  if (sku === this.freeSku && cart.get(this.requiredSku)! >= this.requiredQuantity) {
		return 0;
	  }
	  return quantity * price;
	}
  }
