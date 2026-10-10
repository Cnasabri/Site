/* Progressive enhancements: source imagery stays in the original album order. */
(() => {
  const $ = (s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const quiet=matchMedia('(prefers-reduced-motion: reduce)');
  const animate=(el,frames,duration=600)=>quiet.matches?Promise.resolve():el.animate(frames,{duration,easing:'cubic-bezier(.22,1,.36,1)'}).finished.catch(()=>{});
  const map=$('#location-map [data-image]');
  const mapLink=document.createElement('a'); mapLink.className=map.className;mapLink.href='https://maps.app.goo.gl/jv1tEhjCyxSVTsmK9';mapLink.target='_blank';mapLink.rel='noopener';mapLink.setAttribute('aria-label','View address on Google Maps');mapLink.innerHTML=map.innerHTML;map.replaceWith(mapLink);
  $('.coordinate-label').insertAdjacentHTML('afterend','<a class="text-link map-directions" href="https://maps.app.goo.gl/jv1tEhjCyxSVTsmK9" target="_blank" rel="noopener">View on Google Maps ↗</a>');
  $$('.image-expand').forEach(el=>el.remove());

  function revisePlan(root=document){
    $$('.plan-svg',root).forEach(svg=>{
      $('image',svg).setAttribute('href','assets/unit-plan.png');
      const living=$('[data-room="living-room"]',svg);$('polygon',living).setAttribute('points','577,108 941,108 941,143 976,143 976,469 577,469');
      living.setAttribute('aria-label','Explore Living, Dining & TV Area');$('title',living).textContent='Living, Dining & TV Area — select to explore';
      $$('[data-room="dining-room"], [data-room="tv-room"]',svg).forEach(el=>el.remove());
      const layout=svg.closest('.plan-layout');$$('[data-plan-nav="dining-room"], [data-plan-nav="tv-room"]',layout).forEach(el=>el.remove());
      $$('[data-plan-nav]',layout).forEach((button,i)=>{$('span',button).textContent=String(i+1).padStart(2,'0');if(button.dataset.planNav==='living-room')button.childNodes[1].textContent='Living, Dining & TV Area';});
    });
  }
  revisePlan();
  new MutationObserver(()=>revisePlan($('#panel-content'))).observe($('#panel-content'),{childList:true});

  const dock=$('.hero-dock'),tray=document.createElement('div');tray.id='dock-tray';tray.hidden=true;tray.className='dock-tray';dock.before(tray);
  let active=null,revision=0;
  const cards=$$('.dock-card');cards.forEach(card=>{card.setAttribute('aria-expanded','false');card.setAttribute('aria-controls','dock-tray');});
  async function selectDock(card){
    const request=++revision,collapse=active===card;cards.forEach(c=>c.setAttribute('aria-expanded','false'));
    if(!tray.hidden)await animate(tray,[{opacity:1,transform:'translateY(0)'},{opacity:0,transform:'translateY(24px)'}],220);
    if(request!==revision)return;
    if(collapse){active=null;tray.hidden=true;return;}
    active=card;card.setAttribute('aria-expanded','true');const type=card.dataset.panel;
    let content='';
    if(type==='residence')content='<h2>A place to belong.</h2><p>A finished residence at Nurollife Tower, with an interior by Kelvan iD.</p>'+$('.facts').outerHTML+'<a class="text-link" href="#residence">Discover the residence ↗</a>';
    if(type==='plan')content='<h2>Every space, connected.</h2>'+$('#interactive-plan').innerHTML;
    if(type==='brands')content='<h2>Names of distinction.</h2><div class="brand-grid">'+$('#brand-grid').innerHTML+'</div>';
    if(type==='spaces')content='<h2>Step inside.</h2><div class="dock-spaces">'+$$('.chapter').map(c=>'<a href="#'+c.id+'">'+$('.chapter-title',c).textContent+' ↗</a>').join('')+'</div>';
    tray.innerHTML='<button class="tray-close" aria-label="Collapse section">×</button>'+content;tray.hidden=false;$$('.reveal',tray).forEach(e=>e.classList.add('in-view'));
    $('.tray-close',tray).onclick=()=>selectDock(card);
    $$('[data-plan-nav],.room-link',tray).forEach(link=>link.onclick=e=>{e.preventDefault();const id=link.dataset.planNav||link.dataset.room;document.getElementById(id).scrollIntoView({behavior:quiet.matches?'instant':'smooth'});});
    await animate(tray,[{opacity:0,transform:'translateY(35px)'},{opacity:1,transform:'translateY(0)'}],650);
  }
  dock.addEventListener('click',e=>{const card=e.target.closest('.dock-card');if(card){e.stopPropagation();selectDock(card);}});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&active&&!$('#lightbox').open&&!$('#explorer').open)selectDock(active);});

  function markers(index,items){
    const button=$('[data-image="'+index+'"]');if(!button)return;
    const frame=document.createElement('div');frame.className='marked-photo';button.before(frame);frame.append(button);
    if(index===2){button.removeAttribute('data-image');button.setAttribute('aria-label','Nurollife Tower');}
    const layer=document.createElement('div');layer.className='marker-layer';frame.append(layer);
    items.forEach((item,i)=>{
      const point=document.createElement('button');point.className='product-point';point.style.left=item.x+'%';point.style.top=item.y+'%';point.setAttribute('aria-label','Discover '+item.title);point.setAttribute('aria-expanded','false');point.innerHTML='<span></span>';layer.append(point);
      point.onclick=e=>{e.stopPropagation();const was=point.getAttribute('aria-expanded')==='true';$$('.product-point',layer).forEach(p=>p.setAttribute('aria-expanded','false'));$('.marker-note',layer)?.remove();$('.marker-line',layer)?.remove();if(was)return;point.setAttribute('aria-expanded','true');
        const left=item.x>55?Math.max(3,item.x-35):Math.min(65,item.x+7),top=Math.max(4,item.y-16);
        const line=document.createElementNS('http://www.w3.org/2000/svg','svg');line.setAttribute('viewBox','0 0 100 100');line.setAttribute('preserveAspectRatio','none');line.classList.add('marker-line');line.innerHTML='<path d="M '+item.x+' '+item.y+' L '+(left+7)+' '+item.y+' L '+(left+7)+' '+(top+5)+'"/>';layer.append(line);
        const note=document.createElement('div');note.className='marker-note';note.style.left=left+'%';note.style.top=top+'%';note.innerHTML=(item.brand?'<img src="assets/brand-'+item.brand.toLowerCase()+'.png" alt="'+item.brand+'">':'')+'<strong>'+item.title+'</strong><p>'+item.text+'</p>'+(!item.brand&&index!==2?'<a href="#brands">Meet the collaborated brands ↗</a>':'');layer.append(note);animate(note,[{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'none'}],500);
      };
    });
  }
  markers(2,[{x:30.1,y:14.6,title:'UNIT 02',text:'42ND FLOOR'}]);
  markers(10,[{x:65,y:56,title:'Sculptural armchair',text:'Soft leather seating. Product attribution to be confirmed.'},{x:93,y:68,title:'Accent seating',text:'A considered detail within the living collection.'},{x:41,y:49,title:'Dining chair',text:'Upholstered seating beside the panoramic windows.'}]);
  markers(28,[{x:70,y:55,title:'Integrated oven & microwave',text:'Miele appliances, identified in the original equipment photograph.',brand:'Miele'},{x:72,y:35,title:'Cabinetry finish',text:'Muted cabinetry and warm timber. Manufacturer to be confirmed.'},{x:85,y:68,title:'Island seating',text:'Upholstered counter chair. Product attribution to be confirmed.'}]);
  markers(34,[{x:43,y:57,title:'Upholstered bed',text:'A soft, tailored centrepiece. Product attribution to be confirmed.'},{x:84,y:52,title:'Bedroom chairs',text:'A quiet seating pair beside the windows.'}]);

  const viewer=$('#lightbox'),image=$('#lightbox-image'),wrap=$('.lightbox-image-wrap');
  const key=document.createElement('aside');key.className='viewer-keyplan';key.innerHTML='<span>KEY PLAN</span><img alt="Original room key plan"><p>YOUR PLACE WITHIN THE RESIDENCE</p>';wrap.append(key);
  function keyFor(n){return n<6?'tower':n<10?'entrance':n<27?'living':n<34?'kitchen':n<50?'master':n<56?'guest':'children';}
  let origin=null,current=0,busy=false;
  function refresh(){const n=Number($('#lightbox-count').textContent.split('/')[0])-1;if(!Number.isFinite(n)||n<0)return;current=n;const full=window.ALBUM_DETAILS[n]?.fullSrc;if(full&&image.getAttribute('src')!==full)image.src=full;const name=keyFor(n);$('img',key).src='assets/keyplans/'+name+'.png';$('img',key).alt='Original '+name+' key plan';}
  new MutationObserver(refresh).observe(image,{attributes:true,attributeFilter:['src']});
  const ghost=(from,to,src)=>{const copy=document.createElement('img');copy.className='image-morph';copy.src=src;viewer.append(copy);return animate(copy,[{left:from.left+'px',top:from.top+'px',width:from.width+'px',height:from.height+'px'},{left:to.left+'px',top:to.top+'px',width:to.width+'px',height:to.height+'px'}],700).finally(()=>copy.remove());};
  async function closeViewer(){if(busy||!viewer.open)return;busy=true;const from=image.getBoundingClientRect(),target=$('[data-image="'+current+'"] img')||origin;const to=target?.getBoundingClientRect();image.style.visibility='hidden';viewer.classList.add('viewer-closing');if(to&&to.bottom>0&&to.top<innerHeight)await ghost(from,to,image.src);else await animate(wrap,[{opacity:1,transform:'scale(1)'},{opacity:0,transform:'scale(.96)'}],350);viewer.close();image.style.visibility='';viewer.classList.remove('viewer-closing');busy=false;}
  document.addEventListener('click',e=>{
    if(e.target.closest('[data-close="lightbox"]')||(e.target===image&&viewer.open)){e.preventDefault();e.stopImmediatePropagation();closeViewer();return;}
    const trigger=e.target.closest('[data-image]');if(trigger){origin=$('img',trigger);const from=origin.getBoundingClientRect();requestAnimationFrame(()=>{refresh();image.style.visibility='hidden';requestAnimationFrame(async()=>{const to=image.getBoundingClientRect();await ghost(from,to,origin.currentSrc);image.style.visibility='';});});}
  },true);
  viewer.addEventListener('cancel',e=>{e.preventDefault();closeViewer();});

  // Replay only after a reveal has fully left the viewport, to avoid scroll flicker.
  let pending=false;function replay(){pending=false;if(viewer.open||$('#explorer').open||quiet.matches)return;const heroRect=$('.hero').getBoundingClientRect();if($('#loader').hidden){if(heroRect.bottom<-120)document.body.classList.remove('hero-ready');else if(heroRect.bottom>0)document.body.classList.add('hero-ready');}$$('main .reveal').forEach(el=>{const r=el.getBoundingClientRect();if(r.bottom<-120||r.top>innerHeight+180){el.classList.remove('in-view');}else if(r.top<innerHeight+30&&r.bottom>0){el.classList.add('in-view');}});}
  addEventListener('scroll',()=>{if(!pending){pending=true;requestAnimationFrame(replay);}},{passive:true});replay();
  const closing=$('#closing');closing.insertAdjacentHTML('beforeend','<div class="viewing-request reveal"><p class="eyebrow">MAKE IT YOUR NEXT ADDRESS</p><h3>Experience the residence in person.</h3><p>Request a private viewing and discover the spaces, finishes and outlook for yourself.</p><label for="viewing-text">Your viewing request</label><textarea id="viewing-text" readonly>Hello, I would like to arrange a private viewing of Unit 02 at Nurollife Tower, Istanbul (200 m², 42nd floor). Please share the available viewing times and sales details.</textarea><button id="copy-request" class="text-link">Copy viewing request ↗</button><span id="copy-status" role="status"></span></div>');
  $('#copy-request').onclick=async()=>{const text=$('#viewing-text');try{await Promise.race([navigator.clipboard.writeText(text.value),new Promise((_,reject)=>setTimeout(()=>reject(new Error('Clipboard unavailable')),1500))]);$('#copy-status').textContent='Copied. Paste this request into your preferred messaging app.';}catch{text.focus();text.select();$('#copy-status').textContent='Request selected. Copy it with Ctrl+C or your device’s Copy command.';}};
  document.addEventListener('pointermove',e=>{if(!e.target.closest('[data-image]')||e.target.closest('.marker-layer'))$('#image-cursor').classList.remove('visible');},{passive:true});
})();
