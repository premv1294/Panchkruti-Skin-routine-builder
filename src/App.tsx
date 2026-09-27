import GiftGuidePage from './pages/GiftGuide';
import {useEffect,useState} from 'react';
import {Route,Switch,Link,useLocation} from 'wouter';
import {Layout} from './components/guide/Layout';
import {ErrorBoundary} from './components/error-boundary';
import {EmptyState} from './components/guide/shared';
import Home from './pages/Home';
import Concerns from './pages/Concerns';
import Products from './pages/Products';
import Ingredients from './pages/Ingredients';
import Builder from './pages/Builder';
import Routine from './pages/Routine';
import Compatibility from './pages/Compatibility';
import type {Answers} from './data/questionnaire';
import {pageMeta} from './seo';
export default function App(){
const [answers,setAnswers]=useState<Answers|null>(null);const [path]=useLocation();
useEffect(()=>{const meta=pageMeta(path);document.title=meta.title;
for(const [name,content] of Object.entries({description:meta.description,robots:meta.noindex?'noindex, follow':'index, follow'})){let el=document.querySelector('meta[name="'+name+'"]');if(!el){el=document.createElement('meta');el.setAttribute('name',name);document.head.append(el);}el.setAttribute('content',content);}
for(const [property,content] of Object.entries({'og:title':meta.title,'og:description':meta.description})){document.querySelector('meta[property="'+property+'"]')?.setAttribute('content',content);}
},[path]);
return <Layout><ErrorBoundary resetKey={path}><Switch>
<Route path="/"><Home/></Route><Route path="/guide"><Home/></Route>
<Route path="/concerns"><Concerns/></Route><Route path="/concerns/:slug">{p=><Concerns slug={p.slug}/>}</Route>
<Route path="/products"><Products/></Route><Route path="/product/:slug">{p=><Products slug={p.slug}/>}</Route>
<Route path="/ingredients"><Ingredients/></Route><Route path="/ingredients/:slug">{p=><Ingredients slug={p.slug}/>}</Route>
<Route path="/routine-builder"><Builder onComplete={setAnswers}/></Route><Route path="/routine-results"><Routine answers={answers}/></Route>
<Route path="/routine/:id">{p=><Routine id={p.id}/>}</Route><Route path="/my-routine"><Routine saved/></Route>
<Route path="/gift-guide"><GiftGuidePage/></Route>
<Route path="/compatibility"><Compatibility/></Route>
<Route><div className="page-width page-content"><EmptyState headingLevel={1} title="This page couldn’t be found"><Link className="button" href="/guide">Back to the skin guide</Link></EmptyState></div></Route>
</Switch></ErrorBoundary></Layout>;
}