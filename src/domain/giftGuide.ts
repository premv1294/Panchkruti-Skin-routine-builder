import {activeProducts} from '../data/products';
import {routineTemplates} from '../data/routineRules';
import {getCompatibility} from '../data/compatibility';

export function giftSelection(ids:string[]) {
  return activeProducts.filter(product=>ids.includes(product.id));
}

export function giftRoutineReferences(ids:string[]) {
  const selected=new Set(giftSelection(ids).map(p=>p.id));
  return routineTemplates.filter(r=>[...r.morning,...r.night].some(s=>selected.has(s.productId))).map(r=>({
    ...r,
    morning:r.morning.map(step=>({...step,received:selected.has(step.productId)})),
    night:r.night.map(step=>({...step,received:selected.has(step.productId)})),
  }));
}

export function giftPairing(first:string,second:string) {
  const pair=giftSelection([first,second]);
  if(pair.length!==2)return {guidance:getCompatibility('',''),references:[]};
  const references=routineTemplates.flatMap(r=>{
    const periods=(['morning','night'] as const).filter(time=>r[time].some(s=>s.productId===first)&&r[time].some(s=>s.productId===second));
    return periods.map(time=>({routineId:r.id,time,orderedIds:r[time].filter(s=>s.productId===first||s.productId===second).map(s=>s.productId)}));
  });
  return {guidance:getCompatibility(first,second),references};
}

export function parseGiftProducts(value:string|null) {
  return giftSelection((value||'').split(',')).map(p=>p.id);
}
