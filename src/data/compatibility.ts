export type CompatibilityRule = {id:string; productIds:[string,string]; status:'reviewed'; outcome:'combine'|'separate'; guidance:string; source:string; reviewedAt:string};
// Previous export pairings had no source or reviewer. Await explicit approval.
export const compatibilityRules: CompatibilityRule[] = [];
export function getCompatibility(first:string,second:string) {
if(!first || !second || first===second) return {status:'incomplete',title:'Choose two different products',guidance:'Select a pair to check whether reviewed guidance is available.'};
const rule=compatibilityRules.find(r=>r.productIds.includes(first)&&r.productIds.includes(second));
return rule ? {status:rule.outcome,title:'Reviewed guidance',guidance:rule.guidance} : {status:'unknown',title:'Compatibility not assessed',guidance:'No reviewed guidance is available for this pair. This does not establish that the products are compatible or incompatible. Follow current product directions and seek individual advice where needed.'};
}