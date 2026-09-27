import {getProduct} from '../data/products';
import {routineTemplates,disclosureRules,CONTENT_VERSION} from '../data/routineRules';
import {validAnswers,type Answers} from '../data/questionnaire';
export function getRoutine(id:string) {
const template=routineTemplates.find(r=>r.id===id);
if(!template) return null;
const resolve=(steps:typeof template.morning)=>steps.map(step=>({...step,product:getProduct(step.productId)}));
const morning=resolve(template.morning),night=resolve(template.night);
if([...morning,...night].some(s=>!s.product || s.product.status!=='active')) return null;
return {...template,morning,night};
}
export function recommend(answers:Answers) {
if(!validAnswers(answers)) return {status:'incomplete' as const,routine:null,notices:[],ruleIds:[],version:CONTENT_VERSION};
const template=routineTemplates.find(r=>r.concernId===answers.concern);
const rules=disclosureRules.filter(r=>r.values.includes(answers[r.field]));
const routine=template ? getRoutine(template.id) : null;
return {status:routine?'available' as const:'unavailable' as const,routine,notices:rules.map(r=>r.message),ruleIds:rules.map(r=>r.id),version:CONTENT_VERSION};
}