import {build} from 'esbuild';
import {mkdir,readFile,writeFile,stat} from 'node:fs/promises';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
const mode=process.argv[2];if(!['test','prerender'].includes(mode))throw new Error('Expected test or prerender');
const root=process.cwd();await mkdir('.build-tools',{recursive:true});
const outfile=path.join(root,'.build-tools',mode+'.mjs');
// Resolve source through Node's filesystem API. This also works in restricted
// Windows environments where the native bundler cannot enumerate home folders.
const sourcePlugin={name:'source-files',setup(builder){
builder.onResolve({filter:/.*/},async args=>{
if(args.kind!=='entry-point'&&!args.path.startsWith('.')&&!args.path.startsWith('@/'))return {path:args.path,external:true};
const target=args.kind==='entry-point'?path.resolve(root,args.path):args.path.startsWith('@/')?path.resolve(root,'src',args.path.slice(2)):path.resolve(path.dirname(args.importer),args.path);
for(const candidate of [target,...['.ts','.tsx','.js','.json','/index.ts','/index.tsx'].map(ext=>target+ext)]){try{if((await stat(candidate)).isFile())return {path:candidate,namespace:'source'};}catch{/* Try the next supported source extension. */}}
return {errors:[{text:'Missing source: '+target}]};
});
builder.onLoad({filter:/.*/,namespace:'source'},async args=>({contents:await readFile(args.path,'utf8'),loader:path.extname(args.path).slice(1)}));
}};
const built=await build({entryPoints:[mode==='test'?'tests/domain.test.ts':'scripts/prerender.tsx'],outfile,bundle:true,write:false,platform:'node',format:'esm',jsx:'automatic',tsconfigRaw:{compilerOptions:{jsx:'react-jsx'}},plugins:[sourcePlugin],define:{'import.meta.env.DEV':'false','import.meta.env.BASE_URL':JSON.stringify(process.env.BASE_PATH||'/')}});
await writeFile(outfile,built.outputFiles[0].contents);
const result=spawnSync(process.execPath,[...(mode==='test'?['--test']:[]),outfile],{stdio:'inherit'});process.exit(result.status??1);
