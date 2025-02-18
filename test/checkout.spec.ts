import Checkout from "../src/checkout";
import ProductCatalog from "../src/productCatalog";
import { BogoDiscount, BulkDiscount, FreeProductDiscount } from "../src/types";

describe("Shopping checkout system", () => {
  let checkout: Checkout;

  beforeEach(() => {
    checkout = new Checkout(rules, catalog);
  });

  const catalog = new ProductCatalog([
    { sku: "A", name: "Name A", price: 50 },
    { sku: "B", name: "Name B", price: 30 },
    { sku: "C", name: "Name C", price: 20 },
    { sku: "D", name: "Name D", price: 10 },
    { sku: "E", name: "Name E", price: 70 },
  ]);

  const rules = [
    { sku: "A", strategy: new BogoDiscount(3, 2) },
    { sku: "B", strategy: new BulkDiscount(2, 20) },
    { sku: "E", strategy: new FreeProductDiscount("A", 2, "E") },
  ];

  it("cart total is empty if nothing is scanned", () => {
    expect(checkout.total()).toBe(0);
  });

  it("calculates total with discount rules", () => {
    checkout.scan("A");
    checkout.scan("A");
    checkout.scan("A");
    checkout.scan("B");
    checkout.scan("B");
    checkout.scan("C");
    checkout.scan("C");
    checkout.scan("C");
    checkout.scan("C");
    checkout.scan("C");
    expect(checkout.total()).toBe(100 + 40 + 100);
  });

  it("calculates with original price when no discount strategy", () => {
    checkout.scan("D");
    expect(checkout.total()).toBe(10);
  });

  it("should throw error when a product with sku is not found when we scan", () => {
    expect(() => checkout.scan("Z")).toThrow(`Product with SKU Z not found.`);
  });

  it("applies Free Product Discount correctly", () => {
    checkout.scan("A");
    checkout.scan("A");
    checkout.scan("E");
    expect(checkout.total()).toBe(100);
  });

  it("applies Bogo Discount correctly", () => {
    checkout.scan("A");
    checkout.scan("A");
    checkout.scan("A");
    checkout.scan("B");
    expect(checkout.total()).toBe(100 + 30);
  });

  it("applies Bulk Discount correctly", () => {
    checkout.scan("B");
    checkout.scan("B");
    expect(checkout.total()).toBe(40);
  });
});
