export function selectedProductId(selected:unknown):number{
  const value=Array.isArray(selected)?selected[0]:selected;
  const item=value as any;
  const id=Number(typeof item==='object'&&item!==null?item.value??item.id:item);
  return Number.isSafeInteger(id)&&id>0?id:0;
}
export async function fetchStoreProduct(sdk:any,id:number){
  if(!sdk?.product?.getDetails)throw new Error('Storefront SDK unavailable');
  if(sdk.onReady)await new Promise<void>(resolve=>sdk.onReady(resolve));
  const response=await sdk.product.getDetails(id,['images']);
  const product=response.data;
  if(!product?.id)throw new Error('Product unavailable');
  return product;
}
export function mockProduct(settings:any,name:string,image?:string){
  if(!settings?.enabled)return undefined;
  return {id:'demo-mock-product',name,status:settings.status==='available'?'sale':'out',price:Number(settings.price)||0,regular_price:settings.isOnSale?Number(settings.regularPrice)||0:Number(settings.price)||0,is_on_sale:Boolean(settings.isOnSale),currency:'SAR',image:image?{url:image}:undefined};
}
