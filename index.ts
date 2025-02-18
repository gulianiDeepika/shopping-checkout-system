import Checkout from './src/checkout';
import ProductCatalog from './src/productCatalog';
import { BogoDiscount, BulkDiscount, FreeProductDiscount } from './src/types';

/** add any more products in the productCatalog below */
const products = new ProductCatalog([
  { sku: 'ipd', name: 'Super ipad', price: 549.99 },
  { sku: 'mbp', name: 'Macbook Pro', price: 1399.99 },
  { sku: 'atv', name: 'Apple TV', price: 109.50 },
  { sku: 'vga', name: 'VGA adapter', price: 30.00 },
]);


/** add any more pricing rules if necessary */
const pricingRules = [
  { sku: "atv", strategy: new BogoDiscount(3, 2)},
  { sku: "ipd", strategy: new BulkDiscount(5, 499.99)},
  { sku: "vga", strategy: new FreeProductDiscount("mbp", 1, "vga")}
];

const coBogoDiscount = new Checkout(pricingRules, products);

// Use case 1 defined in assignment atv, atv, atv, vga
console.log('USE CASE 1... \n');
coBogoDiscount.scan('atv');
coBogoDiscount.scan('atv');
coBogoDiscount.scan('atv');
coBogoDiscount.scan('vga');

coBogoDiscount.showItems();

// Get total and checkout
const totalBogoDiscount = coBogoDiscount.total();
console.log('Total amount:', totalBogoDiscount);
console.log('\n ************************** \n');

/*************************************************************** */

// Use case 2 defined in assignment atv, ipd, ipd, atv, ipd, ipd, ipd
const coBulkDiscount = new Checkout(pricingRules, products);

console.log('USE CASE 2... \n');
coBulkDiscount.scan('atv');
coBulkDiscount.scan('ipd');
coBulkDiscount.scan('ipd');
coBulkDiscount.scan('atv');
coBulkDiscount.scan('ipd');
coBulkDiscount.scan('ipd');
coBulkDiscount.scan('ipd');

coBulkDiscount.showItems();

// Get total and checkout
const totalBulkDiscount = coBulkDiscount.total();
console.log('Total amount:', totalBulkDiscount);
console.log('\n ************************** \n');

/*************************************************************** */

//Use case 3 defined in assignment mbp, vga, ipd
const coFreeProductDiscount = new Checkout(pricingRules, products);

console.log('USE CASE 3... \n');
coFreeProductDiscount.scan('mbp');
coFreeProductDiscount.scan('vga');
coFreeProductDiscount.scan('ipd');

coFreeProductDiscount.showItems();

// Get total and checkout
const totalFreeProductDiscount = coFreeProductDiscount.total();
console.log('Total amount:', totalFreeProductDiscount);
console.log('\n ************************** \n');

/*************************************************************** */

const coCustom = new Checkout(pricingRules, products);

// Custom use case
console.log('CUSTOM USE CASE... \n');
coCustom.scan('mbp');
coCustom.scan('mbp');
coCustom.scan('mbp');
coCustom.scan('mbp');
coCustom.scan('ipd');
coCustom.scan('atv');
coCustom.scan('vga');
coCustom.scan('atv');
coCustom.scan('ipd');
coCustom.scan('ipd');
coCustom.scan('ipd');
coCustom.scan('ipd');
coCustom.scan('mbp');
coCustom.scan('vga');

coCustom.showItems();


// Get total and checkout
const total = coCustom.total();
console.log('Total amount:', total);
