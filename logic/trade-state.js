(function(root){
'use strict';
const templates=[{name:'iPhone 14 Pro',base:3750},{name:'华为 Mate 60 Pro',base:2600},{name:'小米 13',base:1900}];
const deductions=[[0,150,500],[0,120,400],[0,100,300],[0,250]];
function qty(n){return Math.min(2,Math.max(1,Math.floor(Number(n)||1)))}
function old(i=0){return {...templates[i%3],id:'old-'+Date.now()+'-'+Math.random().toString(36).slice(2),condition:[0,0,0,0],estimate:templates[i%3].base,subsidy:260,mode:'mail',account:'158****5479',contact:'',phone:'15810525479',address:'北京市 海淀区 马连洼街道 软件园西三路 联想总部（北京）园区附近',time:'',agreed:false}}
function estimate(base,answers){return Math.max(0,Number(base)-deductions.reduce((s,options,i)=>s+(options[answers[i]]||0),0))}
function totals(groups,keys=Object.keys(groups)){return keys.reduce((s,k)=>{(groups[k]||[]).forEach(o=>{s.count++;s.estimate+=Number(o.estimate)||0;s.subsidy+=Number(o.subsidy)||0});return s},{count:0,estimate:0,subsidy:0})}
function parse(raw,fallback){try{return JSON.parse(raw)||fallback}catch{return fallback}}
function escape(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
root.TradeState={qty,old,estimate,totals,parse,escape,clone:x=>JSON.parse(JSON.stringify(x))};
})(typeof window!=='undefined'?window:globalThis);
