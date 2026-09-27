import fs from 'node:fs/promises';
import path from 'node:path';
import {renderToString} from 'react-dom/server';
import {Router} from 'wouter';
import App from '../src/App';
import {products} from '../src/data/products';
import {concerns} from '../src/data/concerns';
import ingredients from '../src/data/ingredients.json';
import {pageMeta} from '../src/seo';
const out=path.resolve('dist/public');
const template=await fs.readFile(path.join(out,'index.html'),'utf8');
const base=(process.env.BASE_PATH||'/').replace(/\/$/,'');
const routes=['/gift-guide','/','/guide','/concerns','/products','/ingredients','/routine/pigmentation','/routine-builder','/routine-results','/my-routine','/compatibility',...concerns.map(c=>'/concerns/'+c.id),...products.map(p=>'/product/'+p.slug),...ingredients.map(i=>'/ingredients/'+i.slug),'/404'];
const escape=(s:string)=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
for(const route of routes){
const meta=pageMeta(route);
const html=template.replace(/<title>.*?<\/title>/,'<title>'+escape(meta.title)+'</title>').replace(/content="__DESCRIPTION__"/g,'content="'+escape(meta.description)+'"').replace(/content="__TITLE__"/g,'content="'+escape(meta.title)+'"').replace('content="index, follow"','content="'+(meta.noindex?'noindex, follow':'index, follow')+'"').replace('<div id="root"></div>','<div id="root">'+renderToString(<Router base={base} ssrPath={base+route}><App/></Router>)+'</div>');
const target=route==='/404'?path.join(out,'404.html'):path.join(out,route.slice(1),'index.html');await fs.mkdir(path.dirname(target),{recursive:true});await fs.writeFile(target,html);
}
console.log('Prerendered '+routes.length+' route documents, including the QR routine.');
