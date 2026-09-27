import type {Product} from '../data/products';
export function purchaseUrl(product:Product):string|null {
if(product.status!=='active'||!product.ecommerceUrl) return null;
try{const url=new URL(product.ecommerceUrl);return url.protocol==='https:'?url.href:null;}catch{return null;}
}