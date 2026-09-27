import {useEffect,useRef,useState} from 'react';
import {Link} from 'wouter';
import {Gift,ArrowRight,Check,Sun,Moon,Copy} from 'lucide-react';
import {activeProducts,categoryLabels,getProduct} from '../../data/products';
import {giftSelection,giftRoutineReferences,giftPairing,parseGiftProducts} from '../../domain/giftGuide';
import {IngredientChips,InfoAccordion} from './shared';

export function GiftGuide({standalone=false}:{standalone?:boolean}) {
  return <section className="gift-guide" id="gift-guide">
    {standalone?<GiftGuideContent/>:<details className="gift-entry"><summary><Gift size={27} aria-hidden="true"/><span><span className="eyebrow">RECEIVED A PANCHKRUTI GIFT BOX?</span><span className="gift-entry-title">Let’s get to know what’s inside.</span><span className="gift-entry-copy">Select your products for usage, order and pairing information.</span></span><span className="gift-entry-action">Choose my products <ArrowRight size={17}/></span></summary><GiftGuideContent/></details>}
  </section>;
}

function GiftGuideContent() {
  const [ids,setIds]=useState<string[]>([]),[search,setSearch]=useState(''),[show,setShow]=useState(false);
  const [first,setFirst]=useState(''),[second,setSecond]=useState(''),[message,setMessage]=useState('');
  const heading=useRef<HTMLHeadingElement>(null);
  useEffect(()=>{const shared=parseGiftProducts(new URLSearchParams(window.location.search).get('products'));if(shared.length){setIds(shared);setShow(true);}},[]);
  const selected=giftSelection(ids);
  const filtered=activeProducts.filter(p=>(p.name+' '+p.aliases.join(' ')).toLowerCase().includes(search.trim().toLowerCase()));
  const references=giftRoutineReferences(ids);
  const firstId=ids.includes(first)?first:selected[0]?.id||'';
  const secondId=ids.includes(second)&&second!==firstId?second:selected.find(p=>p.id!==firstId)?.id||'';
  const pairing=giftPairing(firstId,secondId);
  function toggle(id:string){setIds(current=>current.includes(id)?current.filter(value=>value!==id):[...current,id]);setShow(false);setMessage('');}
  function reveal(){setShow(true);window.setTimeout(()=>{heading.current?.focus();heading.current?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});},0);}
  async function copy(){try{const url=new URL(import.meta.env.BASE_URL+'gift-guide',window.location.origin);url.searchParams.set('products',selected.map(p=>p.id).join(','));await navigator.clipboard.writeText(url.href);setMessage('Your gift-box guide link has been copied. It includes your selected products.');}catch{setMessage('Copying is unavailable in this browser. Your selections are still shown here.');}}
  return <div className="gift-content">
    <div className="gift-picker-intro"><h2>Which products did you receive?</h2><p>Match the names on your packs. Select everything in your box; there’s no need to choose a skin concern.</p></div>
    <div className="filters"><label>Find a product in your box<input type="search" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by product name"/></label></div>
    <fieldset className="gift-picker"><legend className="sr-only">Products received in your gift box</legend>{filtered.map(p=><label key={p.id} className={'gift-product '+(ids.includes(p.id)?'selected':'')}><input type="checkbox" checked={ids.includes(p.id)} onChange={()=>toggle(p.id)}/><span><strong>{p.name}</strong><small>{categoryLabels[p.category]} · {p.size.value} {p.size.unit}</small></span>{ids.includes(p.id)&&<Check size={16} aria-hidden="true"/>}</label>)}</fieldset>
    {!filtered.length&&<div className="empty-state"><p>No products match that name.</p><button className="text-link" onClick={()=>setSearch('')}>Clear product search</button></div>}
    <div className="gift-picker-actions"><p role="status">{selected.length} {selected.length===1?'product':'products'} selected</p><button className="text-link" disabled={!selected.length} onClick={()=>{setIds([]);setShow(false);setMessage('');}}>Clear selection</button><button className="button" disabled={!selected.length} onClick={reveal}>Show my product guide <ArrowRight size={17}/></button></div>
    {!show&&<p className="muted">Your guide appears here, on this page. Selecting products does not mean they should all be used together.</p>}
    {show&&selected.length>0&&<div className="gift-results">
      <div className="section-heading"><div><p className="eyebrow">YOUR GIFT-BOX GUIDE</p><h2 ref={heading} tabIndex={-1}>From unboxing to understanding.</h2></div><button className="button secondary" onClick={copy}><Copy size={16}/> Copy my guide link</button></div>
      <p className="status-message" role="status">{message}</p>
      <p className="gift-explainer">Here is the information available for your products. Routine placement shows the supplied order; it is not a daily dosing schedule or confirmation of individual suitability.</p>
      <div className="gift-usage-grid">{selected.map(p=><article className="gift-usage-card" key={p.id}><span className="eyebrow">{p.timing.length?p.timing.join(' / ')+' · SUPPLIED ROUTINE':'TIMING TO BE CONFIRMED'}</span><h3>{p.name}</h3><p>{p.usage.instructions||'Detailed application instructions are not available in this guide yet. Follow the directions on your current product pack.'}</p><InfoAccordion title="Amount, frequency & precautions"><dl><dt>Amount</dt><dd>{p.usage.amount||'Not confirmed. Check the pack.'}</dd><dt>Frequency</dt><dd>{p.usage.frequency||'Not confirmed. Check the pack.'}</dd><dt>Precautions</dt><dd>{p.precautions.length?p.precautions.join(' '):'Product-specific precautions have not been confirmed here. Refer to the current pack.'}</dd></dl></InfoAccordion><IngredientChips product={p}/><Link className="text-link" href={'/product/'+p.slug}>Full product guide →</Link></article>)}</div>
      <section className="gift-order"><h2>Where do they fit?</h2>{references.length?<><p>The reference below is Panchkruti’s supplied routine. We’ve marked the products you received. Other products are shown only to explain the original sequence, not as a shopping list.</p>{references.map(r=><div key={r.id}><h3>{r.title}</h3><div className="gift-order-grid">{(['morning','night'] as const).map(time=><div className="gift-order-panel" key={time}><h4>{time==='morning'?<Sun size={18}/>:<Moon size={18}/>} {time==='morning'?'Morning':'Night'}</h4><ol>{r[time].map((s,index)=><li className={s.received?'received':'not-received'} key={s.productId}><span>{index+1}.</span><div><strong>{getProduct(s.productId)?.name}</strong><small>{s.purpose} · {s.received?'In your box':'Not selected'}</small></div>{s.received&&<Check size={16} aria-label="Selected"/>}</li>)}</ol></div>)}</div></div>)}{selected.some(p=>!p.timing.length)&&<p className="notice">Some selected products do not have confirmed routine placement. They have not been inserted into this sequence.</p>}</>:<div className="callout"><p>We don’t yet have a reviewed routine order for these selected products. Their individual guides are available above.</p></div>}</section>
      <section className="gift-pairing"><h2>How do my products pair?</h2><p>Choose two products from your box. We’ll distinguish the supplied routine order from reviewed compatibility guidance.</p>{selected.length<2?<p className="notice">Select at least two products to check a pairing.</p>:<><div className="comparison"><label>First received product<select value={firstId} onChange={e=>setFirst(e.target.value)}>{selected.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}</select></label><span aria-hidden="true">+</span><label>Second received product<select value={secondId} onChange={e=>setSecond(e.target.value)}>{selected.filter(p=>p.id!==firstId).map(p=><option key={p.id} value={p.id}>{p.name}</option>)}</select></label></div><div className="callout" role="status">{pairing.references.map(r=><p key={r.routineId+r.time}><strong>Supplied {r.time} order:</strong> {r.orderedIds.map(id=>getProduct(id)?.name).join(' → ')}.</p>)}{!pairing.references.length&&<p>These products are not listed together in the same morning or night sequence in the available routine.</p>}<h3>{pairing.guidance.title}</h3><p>{pairing.guidance.guidance}</p></div></>}</section>
    </div>}
  </div>;
}
