import ingredients from './ingredients.json';
export {ingredients};
export const ingredientChildren=(id:string)=>ingredients.filter(i=>i.parentId===id);
export const ingredientMemberIds=(id:string)=>[id,...ingredientChildren(id).map(i=>i.id)];
export function ingredientDirectory(search='') {
  const query=search.trim().toLowerCase();
  return ingredients.filter(i=>!i.parentId && [i,...ingredientChildren(i.id)].some(entry=>entry.name.toLowerCase().includes(query)||entry.id.includes(query)));
}
export function groupedIngredientLinks(ids:string[]) {
  const selected=ingredients.filter(i=>ids.includes(i.id));
  const parents=[...new Set(selected.map(i=>i.parentId||i.id))];
  return parents.map(id=>{
    const ingredient=ingredients.find(i=>i.id===id)!;
    const children=selected.filter(i=>i.parentId===id);
    return {id,slug:ingredient.slug,name:ingredient.name,children};
  });
}
