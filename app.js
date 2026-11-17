(() => {
 const cfg=window.JACKOMO_CONFIG||{}; document.getElementById("year").textContent=new Date().getFullYear();
 const wa=(cfg.WHATSAPP||"").replace(/\D/g,""); if(wa) document.getElementById("whatsapp-link").href=`https://wa.me/${wa}`;
 const menu=document.querySelector(".menu-btn"), nav=document.querySelector("nav"); menu?.addEventListener("click",()=>nav.classList.toggle("open"));
 const db=window.jackomoSupabase?.(); const list=document.getElementById("gallery-list");
 if(!db){list.innerHTML='<div class="empty-state">Galerias serão exibidas aqui após a configuração do banco de dados.</div>';return;}
 db.from("galleries").select("id,title,event_date,slug,cover_url,description").eq("published",true).order("event_date",{ascending:false}).then(({data,error})=>{
   if(error||!data?.length){list.innerHTML='<div class="empty-state">As próximas histórias estarão aqui.<br><small>Em breve, novas galerias.</small></div>';return;}
   list.innerHTML=data.map(g=>`<a class="gallery-card" href="galeria.html?g=${encodeURIComponent(g.slug)}">${g.cover_url?`<img src="${esc(g.cover_url)}" alt="">`:'<div class="gallery-placeholder">FJ</div>'}<div><small>${g.event_date?new Date(g.event_date+"T12:00:00").toLocaleDateString("pt-BR"):"GALERIA EXCLUSIVA"}</small><h3>${esc(g.title)}</h3><span>Ver galeria ↗</span></div></a>`).join("");
 });
 function esc(s=""){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
})();