(()=>{
const S=TradeState;let ctx=null,old={...S.old(),name:document.querySelector('#device-name').textContent};
const money=n=>'<small>¥</small>'+Math.max(0,Number(n)||0).toLocaleString('en-US');
function paint(){
$('#device-name').textContent=old.name;$('.old-price b').innerHTML=money(old.estimate);
const price=Number(ctx?.product?.price)||15999,coupon=Number(ctx?.coupon??260),edu=Number(ctx?.edu??300),sub=Number(ctx?.guobu??1500);
if(ctx?.product?.name)$('.new-product p').textContent=ctx.product.name;
$('.new-price b').innerHTML=money(price-coupon-edu-sub-old.estimate-old.subsidy);
const stages=document.querySelectorAll('.payment-stage');
stages[0].querySelector('.stage-total b').innerHTML=money(price-coupon);
stages[0].querySelector('.stage-detail>div:first-child b').innerHTML=money(price);
stages[0].querySelector('.stage-detail>div:nth-child(2) b').innerHTML='− '+money(coupon);
const cs=stages[0].querySelectorAll('.conditional b');cs[0].innerHTML=money(sub);cs[1].innerHTML=money(edu);
stages[1].querySelector('.stage-total b').innerHTML=money(old.estimate+old.subsidy);
stages[1].querySelector('.stage-detail>div:first-child b').innerHTML=money(old.estimate);
stages[1].querySelector('.stage-detail>div:nth-child(2) b').innerHTML=money(old.subsidy);
}
function assess(){
const labels=['屏幕显示','机身外观','电池健康','功能情况'];const options=[['完美无划痕','轻微划痕','明显划痕/碎裂'],['无磕碰','轻微磕碰','明显磕碰/变形'],['90%以上','80%—90%','80%以下'],['全部正常','部分异常']];
show('修改旧机及机况',`<input class="sheet-input" id="old-model" aria-label="旧机型号" value="${S.escape(old.name)}">`+labels.map((l,i)=>`<label class="field"><span>${l}</span><select class="sheet-input" data-condition="${i}">${options[i].map((t,j)=>`<option value="${j}" ${old.condition[i]===j?'selected':''}>${t}</option>`).join('')}</select></label>`).join('')+'<button class="confirm" id="save-condition">获取估价</button>');
$('#save-condition').onclick=()=>{const name=$('#old-model').value.trim();if(!name){toast('请输入旧机型号');return}old.name=name;old.condition=[...document.querySelectorAll('[data-condition]')].map(x=>Number(x.value));old.estimate=S.estimate(old.base,old.condition);paint();closeSheet()};
}
document.querySelector('[data-sheet="device"]').onclick=assess;
window.addEventListener('message',e=>{if(e.source!==parent||e.data?.type!=='flow-init')return;ctx=e.data.context;old={...old,...ctx.old};old.condition=old.condition||[0,0,0,0];document.querySelector(`[data-mode="${old.mode||'mail'}"]`).click();$('#contact').value=old.contact||'';$('#phone').value=old.phone||'';$('#address').textContent=old.address||'';$('#account').textContent=old.account||'158****5479';$('#agreement').checked=!!old.agreed;if(old.time){$('#time').textContent=old.time;$('.time').classList.add('chosen')}$('#cart').hidden=true;$('#exchange').textContent='保存回收信息';paint();if(ctx.assess)assess()});
function save(addToCart){
if(!$('#contact').value.trim()){toast('请输入联系人姓名');$('#contact').focus();return}
if(!/^1\d{10}$/.test($('#phone').value)){toast('请输入正确的联系电话');return}
if(mode==='home'){toast('当前位置不支持上门，请选择邮寄回收');return}
if(!$('.time').classList.contains('chosen')){toast('请选择取件时间');return}
if(!$('#agreement').checked){toast('请先阅读并同意以旧换新协议');return}
old={...old,contact:$('#contact').value.trim(),phone:$('#phone').value,address:$('#address').textContent,account:$('#account').textContent,time:$('#time').textContent,mode,agreed:true};
if(ctx){parent.postMessage({type:'flow-save',old},'*');return}
parent.postMessage({type:'trade-checkout',old,addToCart,product:{name:$('.new-product p').textContent,price:15999}},'*');
}
$('#cart').onclick=()=>save(true);$('#exchange').onclick=()=>save(false);
parent.postMessage('flow-ready','*');
})();
