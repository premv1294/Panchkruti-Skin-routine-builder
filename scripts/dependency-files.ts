import fs from 'node:fs/promises';
import path from 'node:path';
import {createRequire} from 'node:module';
import type {Plugin} from 'esbuild';
// Vite already resolves dependency entry points. Resolve their internal imports
// through Node too, so restricted Windows folder enumeration does not break HMR.
export function dependencyFiles():Plugin {
return {name:'dependency-files',setup(build){
build.onResolve({filter:/^\./},async args=>{
if(!args.importer||!args.importer.includes('node_modules'))return;
const target=path.resolve(path.dirname(args.importer),args.path);
for(const file of [target,target+'.js',path.join(target,'index.js')]){
try{if((await fs.stat(file)).isFile())return {path:file,namespace:'dependency-source'};}catch{/* Try the next extension. */}
}
});
build.onResolve({filter:/^[^./]/,namespace:'dependency-source'},args=>{
if(path.isAbsolute(args.path))return;
return {path:createRequire(args.importer).resolve(args.path),namespace:'dependency-source'};
});
build.onLoad({filter:/.*/,namespace:'dependency-source'},async args=>({contents:await fs.readFile(args.path,'utf8'),loader:args.path.endsWith('.json')?'json':'js',resolveDir:path.dirname(args.path)}));
}};
}