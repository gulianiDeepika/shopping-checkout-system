# Checkout System

## Overview

This project implements a scalable shopping checkout system in TypeScript with various pricing rules and discounts. The system supports three discount strategy as of now. Bulk Discount, Bogo Discount and Free Product discount based on the criteria given in the assignment.

There is no GUI/command line interface to add products to catalog or scan them. You can manually edit the file `index.ts` to scan items or add/delete any more items in the product catalog.

## Features

- **Bulk Discount:** Discounted pricing when purchasing in bulk.
- **Bogo Discount:** Bogo Discount pricing when we can extra discount on purchase of a certain number of products.
- **Free Product Discount:** Receive a free product when purchasing a specific quantity of another product.

## Project Structure

- **`ProductCatalog`**: Manages the catalog of products.
- **`DiscountStrategy`**: Interface for different discount strategies, we have different strategies implementing this interface.
- **`Checkout`**: Handles scanning products and applying discounts.
- **Unit Tests**: Written using `jest`.

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/gulianiDeepika/shopping-checkout-system.git
   cd shopping-checkout-system
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Run tests:

   ```sh
   npm test
   ```

## Usage Example

```typescript
const products = new ProductCatalog([
  { sku: "A", name: "Product Name A", price: 50 },
  { sku: "B", name: "Product Name B", price: 30 },
]);

const pricingRules = [
  { sku: "A", strategy: new BulkDiscount(3, 40) },
  { sku: "B", strategy: new BogoDiscount(2, 1) },
];

const checkout = new Checkout(pricingRules, products);
checkout.scan("A");
checkout.scan("A");
checkout.scan("A");
checkout.scan("B");
checkout.scan("B");
console.log(checkout.total());
```

## Run in terminal

```sh
 npm start
```

## Running Tests

To run unit tests, use:

```sh
npm test
```

Tests verify discount logic and overall checkout functionality.

## License

This project is licensed under the MIT License.
