(()=>{'use strict';
const tradePage='trade-editor.html?source=product';
document.querySelectorAll('#old_change_new a').forEach(a=>{
  a.dataset.clickable='true';
  a.removeAttribute('target');
  a.removeAttribute('aria-haspopup');
  a.href=tradePage;
  a.onclick=event=>{event.preventDefault();window.location.href=tradePage};
});
document.addEventListener('click',event=>{
  if(!event.target.closest('a[data-clickable="true"],.tradein-modal-mask')){
    event.preventDefault();
    event.stopImmediatePropagation();
  }
},true);
window.addEventListener('scroll',()=>document.body.classList.toggle('mirror-sticky',scrollY>40),{passive:true});
})();
