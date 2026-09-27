import {concerns} from './data/concerns';
import {getProduct} from './data/products';
import ingredients from './data/ingredients.json';
export function pageMeta(path:string){
const segments=path.split('/').filter(Boolean);let title='Panchkruti Skin Guide',description='Explore Panchkruti skincare routines, product formulas and ingredient guides.',noindex=false;
const names:Record<string,string>={'gift-guide':'Your gift-box product guide','guide':'Understand your skin. Simplify your routine.','concerns':'Explore skin concerns','products':'Product knowledge library','ingredients':'Ingredient library','routine-builder':'Build your routine','routine-results':'Your routine guide','my-routine':'Your saved routine','compatibility':'Product compatibility guide'};
if(names[segments[0]])title=names[segments[0]]+' | Panchkruti';
if(segments[0]==='product'){const p=getProduct(segments[1]);title=p?p.name+' | Panchkruti':'Product not found | Panchkruti';description=p?.description||description;noindex=!p||p.status==='discontinued';}
if(segments[0]==='concerns'&&segments[1]){const c=concerns.find(c=>c.id===segments[1]);title=c?c.name+' | Panchkruti':'Concern not found | Panchkruti';description=c?.description||description;noindex=!c;}
if(segments[0]==='ingredients'&&segments[1]){const i=ingredients.find(i=>i.slug===segments[1]);title=i?i.name+' ingredient guide | Panchkruti':'Ingredient not found | Panchkruti';noindex=!i;}
if(segments[0]==='routine'){title=segments[1]==='pigmentation'?'Pigmentation morning & night routine | Panchkruti':'Routine not found | Panchkruti';noindex=segments[1]!=='pigmentation';}
if(['routine-builder','routine-results','my-routine','compatibility'].includes(segments[0]))noindex=true;
if(segments.length && !names[segments[0]]&&!['product','routine'].includes(segments[0]))noindex=true;
return {title,description,noindex};
}