import {useEffect,useState} from 'react';
import {Link} from 'wouter';
import {ingredients,ingredientChildren,ingredientMemberIds,ingredientDirectory} from '../data/ingredientLibrary';
import {activeProducts} from '../data/products';
import {PageIntro,ProductCard,EmptyState} from '../components/guide/shared';
import {track} from '../services/analytics';

export default function Ingredients({slug}:{slug?:string}){
  const [search,setSearch]=useState('');
  const ingredient=ingredients.find(i=>i.slug===slug);
  useEffect(()=>{if(ingredient)track('ingredient_viewed',{id:ingredient.id});},[ingredient?.id]);
  if(slug&&!ingredient)return <div className="page-width page-content"><EmptyState headingLevel={1} title="Ingredient not found"><Link href="/ingredients">Browse ingredients</Link></EmptyState></div>;
  if(ingredient){
    const children=ingredientChildren(ingredient.id);
    const parent=ingredients.find(i=>i.id===ingredient.parentId);
    const memberIds=ingredientMemberIds(ingredient.id);
    const related=activeProducts.filter(p=>p.ingredientIds.some(id=>memberIds.includes(id)));
    return <div className="page-width page-content">
      <Link className="text-link" href={parent?'/ingredients/'+parent.slug:'/ingredients'}>← {parent?parent.name:'All ingredients'}</Link>
      <PageIntro eyebrow={ingredient.isFamily?'INGREDIENT FAMILY':ingredient.type} title={ingredient.name}>
        <p>{ingredient.isFamily?'Explore this ingredient family and its individual ingredients.':'Explore the products whose supplied formulas include this ingredient.'}</p>
        {parent&&<p>Part of the <Link className="text-link" href={'/ingredients/'+parent.slug}>{parent.name}</Link> family.</p>}
      </PageIntro>
      {children.length>0&&<section aria-label="Ingredients in this family">
        <h2 className="subheading">Within this family</h2>
        <div className="ingredient-grid">{children.map(child=><Link className="ingredient-card" href={'/ingredients/'+child.slug} key={child.id}><span className="eyebrow">{ingredient.name}</span><h3>{child.name}</h3><span>Explore ingredient <span aria-hidden="true">↗</span></span></Link>)}</div>
        {ingredient.id==='aha'&&<p className="muted family-note">Some formulas list AHAs without specifying an individual acid. Those records appear below without assuming they contain glycolic or lactic acid.</p>}
      </section>}
      <div className="callout"><h2>Ingredient context</h2><p>A reviewed explanation of function, usage considerations and suitability is being prepared. Inclusion in a formula does not establish a specific result or compatibility with another product.</p></div>
      <h2 className="subheading">Found in these product records</h2>
      <div className="product-grid">{related.map(p=><ProductCard key={p.id} product={p}/>)}</div>
    </div>;
  }
  const filtered=ingredientDirectory(search);
  return <div className="page-width page-content">
    <PageIntro eyebrow="AYURVEDIC INGREDIENTS + MODERN ACTIVES" title="A closer look at what’s inside."><p>Explore ingredients by family. Open AHA or BHA to see the individual acids and their product references.</p></PageIntro>
    <div className="filters"><label>Search ingredients<input type="search" placeholder="Try Lactic Acid or BHA" value={search} onChange={e=>setSearch(e.target.value)}/></label></div>
    <p className="result-count" role="status">{filtered.length} ingredients and families</p>
    <div className="ingredient-grid">{filtered.map(i=>{
      const children=ingredientChildren(i.id),memberIds=ingredientMemberIds(i.id);
      return <Link className="ingredient-card" href={'/ingredients/'+i.slug} key={i.id}>
        <span className="eyebrow">{i.isFamily?'INGREDIENT FAMILY':i.type}</span><h2>{i.name}</h2>
        {children.length>0&&<p className="family-members">{children.map(c=>c.name).join(' · ')}</p>}
        <span>{activeProducts.filter(p=>p.ingredientIds.some(id=>memberIds.includes(id))).length} product records <span aria-hidden="true">↗</span></span>
      </Link>;
    })}</div>
    {!filtered.length&&<EmptyState title="No ingredients match"><button className="button secondary" onClick={()=>setSearch('')}>Clear search</button></EmptyState>}
  </div>;
}

