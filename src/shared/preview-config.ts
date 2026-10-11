// Matches the official local editor's saved collection key normalization.
export function normalizePreviewConfig(value:any):any{
  if(Array.isArray(value))return value.map(normalizePreviewConfig);
  if(!value||typeof value!=='object')return value;
  return Object.fromEntries(Object.entries(value).filter(([key])=>!key.endsWith('__type')).map(([key,item])=>[key.includes('.')?key.split('.').slice(-1)[0]:key,normalizePreviewConfig(item)]));
}
export function mergePreviewConfig(defaults:Record<string,any>,saved:string|null){
  if(!saved)return defaults;
  try{const value=JSON.parse(saved);if(!value||Array.isArray(value)||typeof value!=='object')return defaults;return {...defaults,...normalizePreviewConfig(value)};}catch{return defaults;}
}

export function resolvePreviewTemplate<T extends {id:string}>(catalog:{defaultTemplate:string;templates:Record<string,T>},requested:string|null,activeId:string|null){
  const entries=Object.entries(catalog.templates);
  const explicit=requested&&requested!=='compact'?requested:null;
  const chosen=entries.find(([name,template])=>explicit&&(name===explicit||name===`tarwadah-${explicit}`||template.id===explicit))
    ||(!explicit&&entries.find(([,template])=>template.id===activeId))
    ||entries.find(([name])=>name===catalog.defaultTemplate);
  if(!chosen)throw new Error('Default preview template missing');
  return {name:chosen[0],template:chosen[1],useSession:!explicit||chosen[1].id===activeId};
}
