export type EventName = 'routine_builder_started'|'routine_question_answered'|'routine_completed'|'routine_viewed'|'product_viewed'|'ingredient_viewed'|'buy_product_clicked'|'routine_product_clicked';
type Payload = {id?:string;questionId?:string;routineId?:string};
type Adapter = (event:EventName,payload:Payload)=>void;
let adapter:Adapter=()=>{};
export function configureAnalytics(next:Adapter){adapter=next;}
export function track(event:EventName,payload:Payload={}){try{adapter(event,payload);}catch{/* Analytics must not interrupt a journey. */}}