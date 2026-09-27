import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve('dist/public');const port=Number(process.env.PORT)||4173;
const base=(process.env.BASE_PATH||'/').replace(/\/$/,'');
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.json':'application/json','.txt':'text/plain; charset=utf-8'};
const server=createServer(async(req,res)=>{
try{
let pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
if(base&&pathname!==base&&!pathname.startsWith(base+'/')){res.writeHead(404);res.end('Not found');return;}
pathname=pathname.slice(base.length);
let file=path.resolve(root,'.'+pathname);
if(file!==root&&!file.startsWith(root+path.sep)){res.writeHead(403);res.end('Forbidden');return;}
let status=200;
try{if((await stat(file)).isDirectory())file=path.join(file,'index.html');await stat(file);}catch{file=path.join(root,'404.html');status=404;}
const content=await readFile(file);
res.writeHead(status,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-cache','X-Content-Type-Options':'nosniff'});
res.end(req.method==='HEAD'?undefined:content);
}catch{res.writeHead(500);res.end('Unable to load this page.');}
});
server.listen(port,'127.0.0.1',()=>console.log('Panchkruti production preview: http://127.0.0.1:'+port+base+'/guide'));
