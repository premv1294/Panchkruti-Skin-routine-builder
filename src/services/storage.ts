import {validAnswers,type Answers} from '../data/questionnaire';
import {CONTENT_VERSION} from '../data/routineRules';
export const STORAGE_KEY='panchkruti:routine:v1';
export function saveRoutine(storage:Storage,answers:Answers){
if(!validAnswers(answers)) return false;
try{storage.setItem(STORAGE_KEY,JSON.stringify({schema:1,version:CONTENT_VERSION,answers,savedAt:new Date().toISOString()}));return true;}catch{return false;}
}
export function loadRoutine(storage:Storage){
try{const raw=storage.getItem(STORAGE_KEY);if(!raw)return {status:'empty' as const};const data=JSON.parse(raw);if(data.schema!==1||!validAnswers(data.answers))return {status:'invalid' as const};if(data.version!==CONTENT_VERSION)return {status:'outdated' as const};return {status:'ready' as const,answers:data.answers as Answers};}catch{return {status:'unavailable' as const};}
}