import type { Product } from './types';

export default class ProductCatalog {
  private products: Map<string, Product>;

  constructor(initialProducts: Product[] = []) {
    this.products = new Map(initialProducts.map((product) => [product.sku, product]));
  }

  /**
   * Adds a new product to the catalog.
   *
   * @param product - The product to add
   * @throws Error if the product already exists in the catalog
   */
  addProduct(product: Product): void {
    if (this.products.has(product.sku)) {
      throw new Error(`Product with SKU ${product.sku} already exists.`);
    }
    this.products.set(product.sku, product);
  }

  /**
   * Returns the product with the specified SKU
   * @param sku - The SKU of the product to retrieve
   * @returns The product with the specified SKU, or undefined if it doesn't exist
   */
  getProduct(sku: string): Product | undefined {
    return this.products.get(sku);
  }
}
