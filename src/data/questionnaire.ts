import {concerns} from './concerns';
export const questions = [
{id:'concern',title:'What would you like to focus on?',hint:'Choose one main concern to keep your routine focused.',options:concerns.map(c=>({value:c.id,label:c.name}))},
{id:'skinType',title:'How would you describe your skin?',hint:'Choose your usual experience. This is not a skin diagnosis.',options:[['dry','Dry'],['oily','Oily'],['combination','Combination'],['balanced','Balanced'],['unsure','I’m not sure']].map(([value,label])=>({value,label}))},
{id:'sensitivity',title:'How sensitive does your skin feel?',hint:'We will flag where individual suitability has not been assessed.',options:[['low','Rarely sensitive'],['sometimes','Sometimes sensitive'],['high','Frequently sensitive'],['unsure','I’m not sure']].map(([value,label])=>({value,label}))},
{id:'currentProducts',title:'What are you currently using?',hint:'Choose the closest fit. This guide cannot assess every external product.',options:[['basics','Cleanser / moisturiser / sunscreen'],['actives','Active treatments or exfoliants'],['prescription','Prescription skincare'],['none','No regular products']].map(([value,label])=>({value,label}))},
{id:'sunscreen',title:'Do you regularly use sunscreen?',hint:'Your answer adds context; it does not remove the protection step.',options:[['regular','Regularly'],['sometimes','Sometimes'],['no','Not currently']].map(([value,label])=>({value,label}))},
{id:'experience',title:'Are you new to active ingredients?',hint:'We won’t invent an introduction schedule without approved product directions.',options:[['new','Yes, I’m new'],['experienced','I already use actives'],['unsure','I’m not sure']].map(([value,label])=>({value,label}))},
] as const;
export type Answers = Record<string,string>;
export function validAnswers(value: unknown): value is Answers {
if(!value || typeof value !== 'object' || Array.isArray(value)) return false;
return questions.every(q=>q.options.some(o=>o.value === (value as Answers)[q.id]));
}