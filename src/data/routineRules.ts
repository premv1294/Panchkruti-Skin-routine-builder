export const CONTENT_VERSION = '2026-09-19.1';
export const routineTemplates = [{
id:'pigmentation',name:'Your pigmentation routine',title:'Pigmentation, step by step.',concernId:'pigmentation',source:'User-supplied Panchkruti brief',
description:'Morning = Cream + Protect. Night = Serum + Correct.',
morning:[{productId:'spotless-radiance-facewash',purpose:'Cleanse'},{productId:'dark-spot-cream',purpose:'Treat'},{productId:'sunscreen-spf-50-pa-plus-plus-plus',purpose:'Protect'}],
night:[{productId:'spotless-radiance-facewash',purpose:'Cleanse'},{productId:'dark-spot-serum',purpose:'Correct'}],
}];
// Disclosure rules, not dermatological compatibility or dosing rules.
export const disclosureRules = [
{id:'sensitivity-unassessed',field:'sensitivity',values:['sometimes','high','unsure'],message:'This guide has not assessed suitability for your skin sensitivity. Confirm individual product suitability before starting.'},
{id:'external-products-unassessed',field:'currentProducts',values:['actives','prescription'],message:'Compatibility with your current treatments has not been reviewed. Discuss the proposed routine with your prescribing clinician or a qualified professional before adding products.'},
{id:'introduction-unavailable',field:'experience',values:['new','unsure'],message:'A beginner introduction schedule is not available. Refer to the current product directions; this guide does not set a starting frequency.'},
{id:'protect-step-retained',field:'sunscreen',values:['sometimes','no'],message:'Sunscreen remains the final morning step in Panchkruti’s supplied sequence.'},
];