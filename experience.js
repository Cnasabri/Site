/* Standalone interactions; image inventory order remains unchanged. */
(() => {
  'use strict';
  const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const config=window.RESIDENCE_CONFIG;
  const quiet=matchMedia('(prefers-reduced-motion: reduce)'),touch=matchMedia('(hover: none)');
  const ease='cubic-bezier(.22,1,.36,1)';
  const animate=(el,frames,duration=600)=>quiet.matches?Promise.resolve():el.animate(frames,{duration,easing:ease}).finished.catch(()=>{});
  const logo=brand=>'assets/brand-'+brand.toLowerCase().replaceAll(' ','-')+'.png';
  const map=$('#location-map [data-image]'),mapLink=document.createElement('a');
  Object.assign(mapLink,{className:map.className,href:'https://maps.app.goo.gl/jv1tEhjCyxSVTsmK9',target:'_blank',rel:'noopener'});
  mapLink.setAttribute('aria-label','View address on Google Maps');mapLink.innerHTML=map.innerHTML;map.replaceWith(mapLink);
  $('.coordinate-label').insertAdjacentHTML('afterend','<a class="text-link map-directions" href="'+mapLink.href+'" target="_blank" rel="noopener">View on Google Maps ↗</a>');
  $$('.image-expand').forEach(el=>el.remove());
  function revisePlan(root=document){$$('.plan-svg image',root).forEach(img=>img.setAttribute('href',config.plan));}
  revisePlan();new MutationObserver(()=>revisePlan($('#panel-content'))).observe($('#panel-content'),{childList:true});

  const dock=$('.hero-dock'),cards=$$('.dock-card'),dockPanels=[];
  let activeDock=null,dockRequest=0;
  const names=['Residence','The Plan','Design Details','Explore the Album'];
  const snippets=[
    '<p class="dock-kicker">UNIT 02 / FLOOR 42</p><h2>A place to belong.</h2><div class="dock-facts"><span>200 m²<small>TOTAL AREA</small></span><span>42nd<small>FLOOR</small></span><span>03<small>BEDROOMS</small></span></div><p>A finished residence above Istanbul. An interior by Kelvan iD.</p><a href="#residence">Discover the residence ↗</a>',
    '<p class="dock-kicker">ONE CONNECTED HOME</p><h2>Find your way inside.</h2><img class="dock-plan-thumb" src="'+config.plan+'" alt="Unit 02 apartment plan"><a href="#floor-plan">Explore the interactive plan ↗</a>',
    '<p class="dock-kicker">COLLABORATED BRANDS</p><h2>Details of distinction.</h2><div class="dock-logos">'+['Miele','Lazzoni','Enza Home','Saloni'].map(b=>'<img src="'+logo(b)+'" alt="'+b+'">').join('')+'</div><a href="#brands">Meet the collection ↗</a>',
    '<p class="dock-kicker">SIX CHAPTERS / ONE HOME</p><h2>Step inside.</h2><div class="dock-spaces">'+$$('.chapter').map(c=>'<a href="#'+c.id+'">'+$('#title-'+c.id,c).textContent+' <span>↗</span></a>').join('')+'</div>'
  ];
  cards.forEach((card,i)=>{
    const cell=document.createElement('div');cell.className='dock-cell';card.before(cell);cell.append(card);
    const panel=document.createElement('div');panel.className='dock-column-panel';panel.id='dock-column-'+i;panel.hidden=true;panel.innerHTML='<div class="dock-column-content">'+snippets[i]+'</div>';cell.prepend(panel);dockPanels.push(panel);
    $('.dock-top>span',card).textContent=String(i+1).padStart(2,'0')+' / '+names[i].toUpperCase();
    card.setAttribute('aria-expanded','false');card.setAttribute('aria-controls',panel.id);
  });
  async function selectDock(card){
    const request=++dockRequest,previous=activeDock,collapse=previous===card;
    if(previous){const panel=dockPanels[cards.indexOf(previous)];previous.setAttribute('aria-expanded','false');activeDock=null;await animate(panel,[{clipPath:'inset(0)',transform:'translateY(0)',opacity:1},{clipPath:'inset(100% 0 0 0)',transform:'translateY(18px)',opacity:.3}],350);if(request!==dockRequest)return;panel.hidden=true;}
    if(collapse)return;
    dockPanels.forEach(panel=>panel.hidden=true);cards.forEach(c=>c.setAttribute('aria-expanded','false'));
    activeDock=card;card.setAttribute('aria-expanded','true');const panel=dockPanels[cards.indexOf(card)];panel.hidden=false;
    animate(panel,[{clipPath:'inset(100% 0 0 0)',transform:'translateY(18px)',opacity:.3},{clipPath:'inset(0)',transform:'translateY(0)',opacity:1}],700);
    $$('.dock-column-content>*',panel).forEach((el,i)=>{if(!quiet.matches)el.animate([{opacity:0,transform:'translateY(12px)'},{opacity:1,transform:'none'}],{duration:650,delay:170+i*75,easing:ease,fill:'backwards'});});
  }
  dock.addEventListener('click',e=>{const card=e.target.closest('.dock-card');if(card){e.stopPropagation();selectDock(card);}});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&activeDock&&!$('#lightbox').open&&!$('#explorer').open)selectDock(activeDock);});

  // Points and photograph share the same zoom transform and origin.
  let openMarker=null,markerRequest=0;
  async function closeMarker(immediate=false){
    const record=openMarker;if(!record)return;openMarker=null;record.point.setAttribute('aria-expanded','false');
    if(!immediate)await Promise.all([animate(record.note,[{opacity:1,transform:'translateY(0)'},{opacity:0,transform:'translateY(8px)'}],260),animate(record.line,[{opacity:1},{opacity:0}],260)]);
    record.note.remove();record.line.remove();
  }
  function markers(index,items){
    const button=$('[data-image="'+index+'"]');if(!button)return;
    const frame=document.createElement('div');frame.className='marked-photo';button.before(frame);frame.append(button);
    const zoom=document.createElement('div');zoom.className='photo-zoom';button.prepend(zoom);zoom.append($('img',button));
    if(index===2){button.removeAttribute('data-image');button.setAttribute('aria-label','Nurollife Tower');}
    const layer=document.createElement('div');layer.className='marker-layer';frame.append(layer);
    items.forEach(item=>{
      const point=document.createElement('button');point.className='product-point';point.style.left=item.x+'%';point.style.top=item.y+'%';point.setAttribute('aria-label','Discover '+item.title);point.setAttribute('aria-expanded','false');point.innerHTML='<span></span>';layer.append(point);
      point.onclick=async e=>{
        e.stopPropagation();const request=++markerRequest,was=openMarker?.point===point;await closeMarker();if(request!==markerRequest||was)return;
        const left=item.x>55?Math.max(3,item.x-35):Math.min(65,item.x+7),top=Math.max(4,item.y-16);
        const line=document.createElementNS('http://www.w3.org/2000/svg','svg');line.setAttribute('viewBox','0 0 100 100');line.setAttribute('preserveAspectRatio','none');line.classList.add('marker-line');line.innerHTML='<path d="M '+item.x+' '+item.y+' L '+(left+7)+' '+item.y+' L '+(left+7)+' '+(top+5)+'"/>';layer.append(line);
        const note=document.createElement('div');note.className='marker-note';note.style.left=left+'%';note.style.top=top+'%';note.innerHTML=(item.brand?'<img src="'+logo(item.brand)+'" alt="'+item.brand+'">':'')+'<strong>'+item.title+'</strong><p>'+item.text+'</p>';layer.append(note);
        openMarker={frame,point,line,note};point.setAttribute('aria-expanded','true');animate(note,[{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'none'}],500);
      };
    });
  }
  markers(2,[{x:30.1,y:14.6,title:'UNIT 02',text:'42ND FLOOR'}]);
  Object.entries(config.products).forEach(([index,items])=>markers(Number(index),items));
  document.addEventListener('click',e=>{if(!e.target.closest('.product-point,.marker-note')){const samePhoto=openMarker?.frame.contains(e.target);markerRequest++;closeMarker();if(samePhoto){e.preventDefault();e.stopImmediatePropagation();}}},true);

  // Viewer has a second zoom level. Image clicks never dismiss the viewer.
  const viewer=$('#lightbox'),image=$('#lightbox-image'),wrap=$('.lightbox-image-wrap');
  const key=document.createElement('aside');key.className='viewer-keyplan';key.innerHTML='<span>KEY PLAN</span><img alt="Original room key plan"><p>YOUR PLACE WITHIN THE RESIDENCE</p>';wrap.append(key);
  let origin=null,originScroll=0,current=0,busy=false,zoomed=false,opening=0;
  function setZoom(value){zoomed=value;viewer.classList.toggle('image-zoomed',value);image.setAttribute('aria-label',value?'Zoom out photograph':'Zoom in photograph');image.setAttribute('aria-pressed',String(value));image.style.transform='';}
  image.tabIndex=0;image.setAttribute('role','button');
  function refresh(){
    const n=Number($('#lightbox-count').textContent.split('/')[0])-1;if(!Number.isFinite(n)||n<0)return;current=n;setZoom(false);
    const name=config.keyplans[n];key.hidden=!name;viewer.classList.toggle('without-keyplan',!name);
    if(name){$('img',key).src='assets/keyplans/'+name+'.png';$('img',key).alt='Original '+name+' key plan';}
  }
  new MutationObserver(refresh).observe(image,{attributes:true,attributeFilter:['src']});
  const ghost=(from,to,src)=>{const copy=document.createElement('img');copy.className='image-morph';copy.src=src;viewer.append(copy);return animate(copy,[{left:from.left+'px',top:from.top+'px',width:from.width+'px',height:from.height+'px'},{left:to.left+'px',top:to.top+'px',width:to.width+'px',height:to.height+'px'}],700).finally(()=>copy.remove());};
  async function closeViewer(){
    if(busy||!viewer.open)return;busy=true;opening++;setZoom(false);const from=image.getBoundingClientRect(),to=origin?.getBoundingClientRect();image.style.visibility='hidden';viewer.classList.add('viewer-closing');
    if(to&&to.bottom>0&&to.top<innerHeight)await ghost(from,to,image.src);else await animate(wrap,[{opacity:1,transform:'scale(1)'},{opacity:0,transform:'scale(.96)'}],350);
    viewer.close();image.style.visibility='';viewer.classList.remove('viewer-closing');window.scrollTo({top:originScroll,behavior:'instant'});origin?.closest('[data-image]')?.focus({preventScroll:true});busy=false;
  }
  document.addEventListener('click',e=>{
    if(e.target.closest('[data-close="lightbox"]')){e.preventDefault();e.stopImmediatePropagation();closeViewer();return;}
    if(e.target===image&&viewer.open){e.preventDefault();e.stopImmediatePropagation();setZoom(!zoomed);return;}
    const trigger=e.target.closest('[data-image]');if(trigger){origin=$('img',trigger);originScroll=scrollY;image.src=origin.currentSrc;image.alt=origin.alt;const from=origin.getBoundingClientRect(),request=++opening;
      requestAnimationFrame(()=>{if(request!==opening)return;refresh();image.style.visibility='hidden';requestAnimationFrame(async()=>{await ghost(from,image.getBoundingClientRect(),origin.currentSrc);if(request===opening)image.style.visibility='';});});}
  },true);
  viewer.addEventListener('cancel',e=>{e.preventDefault();closeViewer();});
  viewer.addEventListener('keydown',e=>{if(e.target===image&&(e.key==='Enter'||e.key===' ')){e.preventDefault();setZoom(!zoomed);}if(e.key==='ArrowLeft'||e.key==='ArrowRight')setZoom(false);});
  image.addEventListener('pointermove',e=>{if(!zoomed||touch.matches)return;const r=wrap.getBoundingClientRect();image.style.transformOrigin=Math.max(0,Math.min(100,(e.clientX-r.left)/r.width*100))+'% '+Math.max(0,Math.min(100,(e.clientY-r.top)/r.height*100))+'%';});
  viewer.addEventListener('close',()=>{setZoom(false);image.style.visibility='';});

  // Reference motion: four photographs slide around a changing editorial slot.
  const stories=[];
  config.detailStories.forEach(story=>{
    const grid=$('[data-image="'+story.start+'"]').closest('.detail-grid');grid.classList.add('detail-story');grid.dataset.activeDetail='0';
    $$('.photo',grid).forEach(el=>{el.classList.remove('reveal','in-view');el.style.opacity='1';el.style.transform='none';});
    const copy=document.createElement('div');copy.className='detail-story-copy';copy.setAttribute('aria-live','off');copy.innerHTML='<span class="eyebrow">01 / THE DETAILS</span><h4></h4><p></p><div class="detail-story-controls">'+story.items.map((item,i)=>'<button aria-label="Show '+item.title+'" aria-pressed="'+(i===0)+'" data-story-step="'+i+'">'+String(i+1).padStart(2,'0')+'</button>').join('')+'</div>';grid.append(copy);
    const record={grid,copy,story,step:0,started:false,last:0};stories.push(record);
    $$('[data-story-step]',copy).forEach(button=>button.onclick=()=>{record.last=performance.now();updateStory(record,Number(button.dataset.storyStep));});
  });
  function updateStory(record,step,initial=false){
    const {grid,copy,story}=record,photos=$$('.photo',grid),before=photos.map(el=>el.getBoundingClientRect());record.step=step;
    const item=story.items[step];$('h4',copy).textContent=item.title;$('p',copy).textContent=item.text;$('.eyebrow',copy).textContent=String(step+1).padStart(2,'0')+' / THE DETAILS';
    $$('[data-story-step]',copy).forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.storyStep)===step)));
    photos.forEach((el,i)=>el.style.order=i*2);copy.style.order=step*2+1;grid.dataset.activeDetail=String(step);grid.classList.add('story-playing');
    if(!quiet.matches){photos.forEach((el,i)=>{const after=el.getBoundingClientRect(),old=before[i];el.getAnimations().forEach(a=>a.cancel());el.animate([{transform:'translate('+(old.left-after.left)+'px,'+(old.top-after.top)+'px) scale('+(old.width/after.width)+','+(old.height/after.height)+')'},{transform:'none'}],{duration:initial?1200:1000,easing:ease,delay:initial?i*70:0});});animate(copy,[{opacity:0,transform:'translateY(18px)'},{opacity:1,transform:'none'}],1000);}
  }
  // Start at 68% viewport height; reset only after complete exit.
  const reveals=$$('main .reveal');let pending=false;
  function replay(){
    pending=false;if(viewer.open||$('#explorer').open)return;const heroRect=$('.hero').getBoundingClientRect();
    if($('#loader').hidden&&!quiet.matches){if(heroRect.bottom<-120)document.body.classList.remove('hero-ready');else if(heroRect.top>-80&&heroRect.top<innerHeight*.68)document.body.classList.add('hero-ready');}
    reveals.forEach(el=>{const r=el.getBoundingClientRect();if(quiet.matches)el.classList.add('in-view');else if(r.bottom<-120||r.top>innerHeight+180)el.classList.remove('in-view');else if(r.top<innerHeight*.68&&r.bottom>innerHeight*.12)el.classList.add('in-view');});
    if(openMarker){const r=openMarker.frame.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight){markerRequest++;closeMarker(true);}}
    stories.forEach(record=>{const r=record.grid.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight+100){record.started=false;record.grid.classList.remove('story-playing');record.copy.style.order=9;}else if(!record.started&&r.top<innerHeight*.68&&r.bottom>innerHeight*.2){record.started=true;record.last=performance.now();updateStory(record,0,true);}});
  }
  addEventListener('scroll',()=>{if(!pending){pending=true;requestAnimationFrame(replay);}},{passive:true});addEventListener('resize',replay);quiet.addEventListener('change',replay);
  setInterval(()=>{if(document.hidden||quiet.matches||viewer.open||$('#explorer').open)return;stories.forEach(record=>{const r=record.grid.getBoundingClientRect();if(record.started&&r.top<innerHeight*.8&&r.bottom>innerHeight*.2&&performance.now()-record.last>3300){record.last=performance.now();updateStory(record,(record.step+1)%4);}});},350);
  document.addEventListener('visibilitychange',()=>stories.forEach(record=>record.last=performance.now()));

  const {phone,tel,email}=config.contact;
  $('#closing').insertAdjacentHTML('beforeend','<div class="viewing-request reveal"><p class="eyebrow">PRIVATE VIEWINGS / CONTACT</p><h3>Experience the residence in person.</h3><p>Arrange a private viewing and discover the spaces, finishes and outlook for yourself.</p><div class="contact-links"><a href="tel:'+tel+'">'+phone+' <span>↗</span></a><a href="mailto:'+email+'?subject=Unit%2002%20-%20Private%20viewing">'+email+' <span>↗</span></a></div><label for="viewing-text">Your viewing request</label><textarea id="viewing-text" readonly>Hello, I would like to arrange a private viewing of Unit 02 at Nurollife Tower, Istanbul (200 m², 42nd floor). Please share the available viewing times and sales details.</textarea><div class="contact-actions"><button id="copy-request" class="text-link">Copy viewing request ↗</button><a class="text-link" href="https://wa.me/'+tel.replace('+','')+'?text='+encodeURIComponent('Hello, I would like to arrange a private viewing of Unit 02 at Nurollife Tower, Istanbul.')+'" target="_blank" rel="noopener">Request on WhatsApp ↗</a></div><span id="copy-status" role="status"></span></div>');
  reveals.push($('.viewing-request'));replay();
  $('#copy-request').onclick=async()=>{const text=$('#viewing-text');try{await Promise.race([navigator.clipboard.writeText(text.value),new Promise((_,reject)=>setTimeout(()=>reject(new Error('Clipboard unavailable')),1500))]);$('#copy-status').textContent='Copied. Paste this request into your preferred messaging app.';}catch{text.focus();text.select();$('#copy-status').textContent='Request selected. Copy it with Ctrl+C or your device’s Copy command.';}};
  document.addEventListener('pointermove',e=>{if(!e.target.closest('[data-image]')||e.target.closest('.marker-layer'))$('#image-cursor').classList.remove('visible');},{passive:true});
})();
