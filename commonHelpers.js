import{S as p,i as m}from"./assets/vendor-5b791d57.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const r of t.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}})();const a=document.querySelector("form"),c=document.querySelector(".js-gallery-elem"),u=document.querySelector(".loader");d();const h=new p(".gallery a",{captionDelay:250});a.addEventListener("submit",y);function y(s){s.preventDefault(),v();const o=a.elements.query.value;g(o).then(n=>b(n.hits)).catch(n=>L()).finally(()=>a.reset())}function g(s){const o="https://pixabay.com/api/",n="?key=42153847-0f7baac2d7b2e92d7ce6bbe8e",i=`&q=${s}`,e="&image_type=photo&orientation=horizontal&safesearch=true&per_page=20",t=o+n+i+e;return fetch(t).then(r=>r.json()).then(r=>{if(r.total===0)throw new Error("Результатів не знайдено.");return r}).catch(r=>console.log(r)).finally(()=>d())}function b(s){const o=s.map(({largeImageURL:n,webformatURL:i,tags:e,likes:t,views:r,comments:l,downloads:f})=>` <div class="gallery">
    <a href="${n}"><div class="thumb"><img src="${i}" alt="${e}" title="${e}" width = "360px"
      height = "300px"/>
       <ul class="info-cards-container">
      <li class="info-cards-elements">likes<span>${t}</span></li>
      <li class="info-cards-elements">views<span>${r}</span></li>
       <li class="info-cards-elements">comments<span>${l}</span></li>
       <li class="info-cards-elements">downloads<span>${f}</span></li>
     </ul>
     </div>
      </a>
    </div>`).join("");c.innerHTML=o,h.refresh()}function L(s){c.innerHTML="",m.show({message:'❌ "Sorry, there are no images matching your search query. Please try again!',color:"red",position:"topRight",maxWidth:"400px"})}function v(){u.style.display="block"}function d(){u.style.display="none"}
//# sourceMappingURL=commonHelpers.js.map
