import type { Product } from '../src/types';
import ProductCatalog from '../src/productCatalog';

describe('Product catalog', () => {
  let catalog: ProductCatalog;

  beforeEach(() => {
    catalog = new ProductCatalog();
  });

  it('should create an empty product catalog', () => {
    expect(catalog.getProduct('any')).toBeUndefined();
  });

  it('should add a product successfully', () => {
    const product = { sku: 'test1', name: 'Test Product', price: 10 };
    catalog.addProduct(product);
    expect(catalog.getProduct('test1')).toEqual(product);
  });

  it('should throw error when adding duplicate product', () => {
    const product = { sku: 'test2', name: 'Test Product', price: 10 };
    catalog.addProduct(product);
    expect(() => catalog.addProduct(product)).toThrow(`Product with SKU ${product.sku} already exists.`);
  });

  it('should initialize with initial products', () => {
    const initialProducts = [
      { sku: 'A', name: 'Product A', price: 50 },
      { sku: 'B', name: 'Product B', price: 30 }
    ];
    const catalogWithProducts = new ProductCatalog(initialProducts);
    expect(catalogWithProducts.getProduct('A')).toEqual(initialProducts[0]);
    expect(catalogWithProducts.getProduct('B')).toEqual(initialProducts[1]);
  });

});
