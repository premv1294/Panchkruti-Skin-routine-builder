import {useState} from 'react';
import {activeProducts} from '../data/products';
import {getCompatibility} from '../data/compatibility';
import {PageIntro} from '../components/guide/shared';
export default function Compatibility(){
const [first,setFirst]=useState(''),[second,setSecond]=useState('');const result=getCompatibility(first,second);
return <div className="page-width page-content narrow"><PageIntro eyebrow="USE WITH UNDERSTANDING" title="Check a product pairing."><p>Routine order and ingredient compatibility are different questions. This tool shows reviewed pairing guidance when it is available.</p></PageIntro><div className="comparison"><label>First product<select value={first} onChange={e=>setFirst(e.target.value)}><option value="">Choose a product</option>{activeProducts.map(p=><option value={p.id} key={p.id}>{p.name}</option>)}</select></label><span aria-hidden="true">+</span><label>Second product<select value={second} onChange={e=>setSecond(e.target.value)}><option value="">Choose a product</option>{activeProducts.map(p=><option value={p.id} key={p.id}>{p.name}</option>)}</select></label></div><div className="callout" role="status"><p className="eyebrow">{result.status==='unknown'?'GUIDANCE PENDING':'PAIRING GUIDE'}</p><h2>{result.title}</h2><p>{result.guidance}</p></div></div>;
}