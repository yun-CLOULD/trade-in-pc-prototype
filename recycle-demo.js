(()=>{'use strict';
const recyclePage='bind-recycle-order.html?source=product';
document.querySelectorAll('.recycle-order-entry').forEach(entry=>{
  entry.dataset.clickable='true';
  entry.removeAttribute('aria-haspopup');
  entry.href=recyclePage;
  entry.onclick=event=>{
    event.preventDefault();
    window.location.href=recyclePage;
  };
});
})();
