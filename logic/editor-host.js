window.FlowEditor={open(context,returnTo=location.href){
const page=new URL('trade-editor.html',location.href);
page.searchParams.set('view','editor');
page.searchParams.set('context',JSON.stringify(context));
page.searchParams.set('returnTo',returnTo);
location.href=page.href;
}};
