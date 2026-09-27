import catalogue from './catalogue.json';
import {productSchema} from '../domain/models';
export type {Product} from '../domain/models';
export type ProductCategory = 'cleanser'|'treatment'|'moisturiser-care'|'protection';
export const products = productSchema.array().parse(catalogue);
export const activeProducts = products.filter(p=>p.status==='active');
export const categoryLabels:Record<string,string>={cleanser:'Cleansers',treatment:'Treatments','moisturiser-care':'Moisturisers & care',protection:'Sun protection'};
export const getProduct=(id:string)=>products.find(p=>p.id===id);
