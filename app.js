/* Unit 02 — standalone, dependency-free digital album. */
(() => {
  'use strict';
  const images = window.ALBUM_IMAGES || [];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const touchInput = window.matchMedia('(hover: none)');
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const escapeHTML = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const brands = ['Miele', 'Nurol', 'Saloni', 'Enza Home', 'Lazzoni', 'Norde', 'Fuga', 'Caploonba', 'Belusso'];
  const chapters = [
    {id:'entrance',name:'Entrance',number:'01',range:[6,9],description:'A quiet introduction. Warm timber, sculptural objects and a carefully framed artwork set the tone for the rooms beyond.',note:'ARTWORK · TIMBER · STONE',next:'living-room'},
    {id:'living-room',name:'Living room',number:'02',range:[10,26],description:'Light travels across a generous open interior. The living, dining and TV areas share the same outlook, while a concealed mini bar adds a quieter layer of detail.',note:'LIVING · DINING · TV ROOM · MINI BAR',next:'kitchen'},
    {id:'kitchen',name:'Kitchen',number:'03',range:[27,33],description:'Dark cabinetry meets a sculptural island. Integrated appliances, understated surfaces and considered seating make the kitchen a natural part of the living space.',note:'ISLAND · INTEGRATED APPLIANCES · SEATING',next:'master-bedroom'},
    {id:'master-bedroom',name:'Master bedroom',number:'04',range:[34,49],description:'An intimate retreat above the city. Soft textiles and warm wood frame the bedroom; glass, stone and reflected light carry the story into the dressing and bathing spaces.',note:'BEDROOM · DRESSING SPACE · EN SUITE',next:'guest-room'},
    {id:'guest-room',name:'Guest room',number:'05',range:[50,55],description:'A lighter palette, soft daylight and a composed arrangement of furniture. A welcoming room with its own sense of calm.',note:'SOFT TEXTURES · DAYLIGHT · QUIET DETAILS',next:'children-room'},
    {id:'children-room',name:'Children’s room',number:'06',range:[56,56],description:'A playful final chapter. A bunk bed, small-scale furniture and warm timber create room for rest, learning and imagination.',note:'REST · PLAY · IMAGINATION',next:'closing'}
  ];
  const rooms = [
    {id:'entrance',name:'Entrance',points:'411,350 466,350 466,463 641,463 641,575 470,575 470,523 411,523',description:'The first impression: art, timber and sculptural details.'},
    {id:'living-room',name:'Living, Dining & TV Area',points:'577,108 941,108 941,143 976,143 976,469 577,469',description:'One connected space for living, dining and relaxed evenings.'},
    {id:'kitchen',name:'Kitchen',points:'644,470 941,470 941,522 976,522 976,666 663,666 644,615',description:'A sculptural island and a wall of integrated appliances.'},
    {id:'master-bedroom',name:'Master bedroom',points:'32,153 384,153 384,348 335,348 335,409 32,409',description:'A private bedroom with an adjoining dressing space.'},
    {id:'master-ensuite',name:'Master en suite',points:'32,414 226,414 226,442 295,442 295,520 180,520 180,502 131,502 131,520 32,520',description:'Stone surfaces, glass partitions and warm illumination.'},
    {id:'guest-room',name:'Guest room',points:'668,670 976,670 976,820 944,820 944,841 668,841',description:'The guest-room chapter. This room is labelled “Maid’s Room” on the original plan.'},
    {id:'children-room',name:'Children’s room',points:'390,196 443,196 443,114 566,114 566,317 469,317 469,347 390,347',description:'A dedicated space for rest, play and imagination.'}
  ];
  const labels = [
    'Istanbul, seen from Unit 02', 'Location of the building', 'Nurollife Tower', 'Unit 02 within the tower floor', 'Unit 02 — apartment floor plan', 'The outlook — interior design by Kelvan iD',
    'Entrance — View 01 / 01', 'Entrance — View 01 / 02', 'Entrance — View 02 / 01', 'Entrance — View 02 / 02',
    'Living room — View 01', 'Living room — View 02', 'Living room — View 03 / Dining area', 'Living room — View 04', 'Living room — View 05', 'Living room — View 06',
    'Living room — Cabinetry / 01', 'Living room — Cabinetry / 02', 'Living room — Cabinetry / 03',
    'Mini bar — Detail 01', 'Mini bar — Detail 02', 'Mini bar — Detail 03', 'Mini bar — Detail 04',
    'Living room — Furniture 01', 'Living room — Furniture 02', 'Living room — Furniture 03', 'Living room — Furniture 04',
    'Kitchen — View 01 / 01', 'Kitchen — View 01 / 02', 'Kitchen — View 02',
    'Kitchen — Furniture 01', 'Kitchen — Furniture 02', 'Kitchen — Furniture 03', 'Kitchen — Furniture 04',
    'Master bedroom — View 01', 'Master bedroom — View 02', 'Master bedroom — View 03', 'Master bedroom — View 04', 'Master bedroom — View 05', 'Master bedroom — View 06',
    'Master bedroom — View 07 / 01', 'Master bedroom — View 07 / 02', 'Master bedroom — View 08', 'Master bedroom — View 09 / En suite', 'Master bedroom — View 10 / 01', 'Master bedroom — View 10 / 02',
    'Master bedroom — Furniture 01', 'Master bedroom — Furniture 02', 'Master bedroom — Furniture 03', 'Master bedroom — Furniture 04',
    'Guest room — View 01', 'Guest room — View 02', 'Guest room — Furniture 01', 'Guest room — Furniture 02', 'Guest room — Furniture 03', 'Guest room — Furniture 04', 'Children’s room — View 01'
  ];
  function photo(index, extraClass = '') {
    const image = images[index];
    if (!image) return '';
    const label = labels[index];
    const source = `${String(index+1).padStart(2,'0')} / ${images.length}`;
    const anchor = index === 11 ? 'tv-room' : index === 12 ? 'dining-room' : index === 43 ? 'master-ensuite' : '';
    const smallWidth=Math.round(image.width*Math.min(1,720/Math.max(image.width,image.height)));
    return `<figure class="photo reveal ${extraClass}"${anchor ? ` id="${anchor}"` : ''}><button class="photo-frame" data-image="${index}" aria-label="View ${escapeHTML(label)} in full screen"><img src="${image.src.replace('.webp','-small.webp')}" srcset="${image.src.replace('.webp','-small.webp')} ${smallWidth}w, ${image.src} ${image.width}w" sizes="${extraClass.includes('frame-wide') ? '90vw' : '(max-width: 700px) 45vw, 44vw'}" width="${image.width}" height="${image.height}" alt="${escapeHTML(label)}" loading="lazy" decoding="async" data-source="${index}"><span class="image-expand" aria-hidden="true">↗</span></button><figcaption><span>${escapeHTML(label)}</span><span>${source}</span></figcaption></figure>`;
  }
  function brandGrid() {
    return brands.map((brand,index) => `<div class="brand-cell reveal" style="--delay:${index%3*75}ms"><span class="brand-number">${String(index+1).padStart(2,'0')}</span><img src="assets/brand-${brand.toLowerCase().replaceAll(' ','-')}.png" alt="${brand}" loading="lazy"><span class="brand-name">${brand.toUpperCase()}</span></div>`).join('');
  }
  function makePlan(isMain = false) {
    return `<div class="plan-layout"><div><div class="plan-stage"><svg class="plan-svg" viewBox="0 0 1000 869" aria-label="Interactive Unit 02 floor plan"><image href="${images[4].src}" x="0" y="0" width="1000" height="869"${isMain ? ' data-source="4"' : ''}/>${rooms.map(room=>`<a href="#${room.id}" aria-label="Explore ${room.name}" class="room-link" data-room="${room.id}"><polygon class="room-zone" points="${room.points}" tabindex="0" role="link" aria-label="Explore ${room.name}"><title>${room.name} — select to explore</title></polygon></a>`).join('')}</svg></div><p class="plan-instructions"><span class="status-dot"></span><span>${touchInput.matches ? 'TAP TO SELECT · TAP AGAIN TO EXPLORE' : 'HOVER TO DISCOVER · SELECT TO EXPLORE'}</span></p></div><div class="plan-rail"><div class="plan-room-list">${rooms.map((room,index)=>`<button data-plan-nav="${room.id}"><span>${String(index+1).padStart(2,'0')}</span>${room.name}<span>↗</span></button>`).join('')}</div><div class="plan-preview" aria-live="polite"><span class="eyebrow">YOUR NEXT CHAPTER</span><h3>Select a space.</h3><p>Follow the connections, then step into the room.</p><button class="plan-go" hidden>Explore this space <span>↗</span></button></div></div></div><p class="plan-note">Original architectural plan. The guest-room chapter corresponds to the space labelled “Maid’s Room” on the plan. Dining and TV areas are presented within the living-room chapter.</p>`;
  }
  function detailGroup(start,end,title,description,gridClass='detail-grid') {
    let html=`<div class="detail-heading reveal"><h3>${title}</h3><p>${description}</p></div><div class="${gridClass}">`;
    for(let i=start;i<=end;i++) html+=photo(i,'frame-portrait');
    return html+'</div>';
  }
  function chapterPhotos(chapter) {
    switch(chapter.id) {
      case 'entrance': return [6,7,8,9].map(i=>photo(i,'frame-portrait')).join('');
      case 'living-room': return photo(10,'frame-wide')+photo(11)+photo(12)+photo(13,'frame-wide')+photo(14)+photo(15)+detailGroup(16,18,'An interior within the interior.','BUILT-IN CABINETRY','mini-triptych')+detailGroup(19,22,'The art of a quiet evening.','MINI BAR')+detailGroup(23,26,'Objects with presence.','FURNITURE & DETAILS');
      case 'kitchen': return photo(27,'frame-portrait')+photo(28,'frame-portrait')+photo(29,'frame-wide')+detailGroup(30,33,'Considered, down to the detail.','FURNITURE & EQUIPMENT');
      case 'master-bedroom': return photo(34,'frame-wide')+photo(35)+photo(36)+photo(37,'frame-wide')+photo(38)+photo(39)+photo(40,'frame-portrait')+photo(41,'frame-portrait')+photo(42,'frame-wide')+photo(43,'frame-wide')+photo(44,'frame-portrait')+photo(45,'frame-portrait')+detailGroup(46,49,'A softer kind of statement.','FURNITURE & FINISHES');
      case 'guest-room': return photo(50,'frame-wide')+photo(51,'frame-wide')+detailGroup(52,55,'Small details. Lasting impressions.','FURNITURE & DETAILS');
      default: return photo(56,'frame-wide');
    }
  }
  $('#location-map').innerHTML = photo(1,'frame-portrait');
  $('#tower-photo').innerHTML = photo(2,'frame-wide');
  $('#whole-floor').innerHTML = photo(3,'frame-wide');
  $('#interactive-plan').innerHTML = makePlan(true);
  $('#brand-grid').innerHTML = brandGrid();
  $('#outlook-photo').innerHTML = photo(5,'frame-wide');
  $('#chapters').innerHTML = chapters.map(chapter => `<section class="chapter" id="${chapter.id}" aria-labelledby="title-${chapter.id}"><div class="section-label reveal"><span>CHAPTER ${chapter.number} — THE SPACES</span><span>UNIT 02 / KELVAN iD</span></div><div class="chapter-heading"><h2 class="chapter-title reveal" id="title-${chapter.id}">${chapter.name.replace(' ','<br>')}</h2><p class="body-copy reveal">${chapter.description}</p></div><div class="chapter-meta reveal"><span>${chapter.note}</span><span>${chapter.range[1]-chapter.range[0]+1} PHOTOGRAPHS</span></div><div class="photo-grid">${chapterPhotos(chapter)}</div><div class="chapter-end reveal"><span>END OF CHAPTER ${chapter.number}</span><a href="#${chapter.next}">${chapter.next === 'closing' ? 'A final word' : 'Next: '+chapters.find(c=>c.id===chapter.next).name}<span>↓</span></a></div></section>`).join('');

  // The main album's reveal timing lives in experience.js; dialog content is immediate.
  function observeReveals(root=document) {
    if(root!==document || reducedMotion.matches) $$('.reveal',root).forEach(el=>el.classList.add('in-view'));
  }
  observeReveals();
  $$('.dock-card').forEach((card,i)=>card.style.setProperty('--card-index',i));
  const hero = $('.hero');
  let ticking=false;
  function updateScroll(){
    ticking=false;
    const y=window.scrollY;
    const total=document.documentElement.scrollHeight-window.innerHeight;
    $('#reading-progress').style.transform=`scaleX(${total>0?y/total:0})`;
    $('.floating-plan').classList.toggle('visible',y>hero.offsetHeight*.7);
    if(!reducedMotion.matches && y<hero.offsetHeight+90){
      $('#hero-image').style.transform=`translateY(${Math.min(y*.14,110)}px) scale(1.05)`;
    }
  }
  window.addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(updateScroll);}},{passive:true});
  window.addEventListener('resize',updateScroll,{passive:true});
  updateScroll();
  // A real asset-ready loader; a timeout ensures the album remains accessible.
  const loader=$('#loader');
  let loaderFinished=false;
  const started=performance.now();
  let loadingProgress=0;
  const progressTimer=setInterval(()=>{
    loadingProgress=Math.min(91,loadingProgress+(95-loadingProgress)*.1);
    $('#load-percent').textContent=String(Math.floor(loadingProgress)).padStart(2,'0');
    $('#load-bar').style.width=loadingProgress+'%';
  },100);
  function finishLoader(){
    if(loaderFinished)return;
    loaderFinished=true;clearInterval(progressTimer);
    $('#load-percent').textContent='100';$('#load-bar').style.width='100%';
    const delay=reducedMotion.matches?0:Math.max(0,1300-(performance.now()-started));
    setTimeout(()=>{
      loader.classList.add('done');document.body.classList.add('hero-ready');
      setTimeout(()=>{loader.hidden=true;loader.setAttribute('aria-hidden','true');},reducedMotion.matches?0:1250);
    },delay);
  }
  Promise.allSettled([$('#hero-image').decode(),document.fonts.ready]).then(finishLoader);
  setTimeout(finishLoader,6000);

  // Native dialogs retain keyboard navigation, focus trapping and Escape support.
  const explorer=$('#explorer');
  const lightbox=$('#lightbox');
  let panelOrigin=null;
  let panelAnimation=null;
  let closingPanel=false;
  function openPanel(type,origin){
    panelOrigin=origin;closingPanel=false;
    if(panelAnimation)panelAnimation.cancel();
    const title={residence:'A place to belong.',plan:'Every space, connected.',brands:'Names of distinction.',spaces:'Step inside.'}[type];
    $('#panel-label').textContent={residence:'01 / THE RESIDENCE',plan:'02 / THE FLOOR PLAN',brands:'03 / COLLABORATED BRANDS',spaces:'04 / THE ALBUM'}[type];
    let content='';
    if(type==='residence')content=`<p class="panel-intro">A finished residence at Nurollife Tower, Istanbul. Interior design by Kelvan iD. Presented in the original album as Unit 02, Autumn 2026.</p>${$('.facts').outerHTML}<p class="panel-intro">Spaces: Entrance, Living Room, Dining Room, TV Room, Kitchen, Children’s Room, Master Bedroom and Guest Room.</p><button class="text-link" data-go="entrance">Begin the interior album <span>↗</span></button>`;
    if(type==='plan')content=makePlan();
    if(type==='brands')content=`<p class="panel-intro">The collaborated brands featured in the album. Their original identities, brought together in one considered interior.</p><div class="brand-grid">${brandGrid()}</div>`;
    if(type==='spaces')content=`<p class="panel-intro">Explore the home in six chapters, following the original album’s photograph sequence.</p><div class="space-menu">${chapters.map(c=>`<a href="#${c.id}" data-go="${c.id}"><span class="space-number">${c.number}</span><span class="space-name">${c.name}</span><span class="space-arrow">↗</span></a>`).join('')}</div>`;
    $('#panel-content').innerHTML=`<h2 id="panel-title">${title}</h2>${content}`;
    if(type==='plan')bindPlan($('#panel-content'));
    if(!explorer.open)explorer.showModal();
    explorer.scrollTop=0;
    observeReveals(explorer);
    $$('.reveal',explorer).forEach(el=>el.classList.add('in-view'));
    if(!reducedMotion.matches && origin){
      const from=origin.getBoundingClientRect(),to=explorer.getBoundingClientRect();
      const x=from.left+from.width/2-to.left-to.width/2;
      const y=from.top+from.height/2-to.top-to.height/2;
      panelAnimation=explorer.animate([{transform:`translate(${x}px,${y}px) scale(${Math.max(.15,from.width/to.width)},${Math.max(.1,from.height/to.height)})`,opacity:.35,borderRadius:'10px'},{transform:'translate(0,0) scale(1)',opacity:1,borderRadius:'7px'}],{duration:650,easing:'cubic-bezier(.22,1,.36,1)'});
    }
  }
  function closePanel(after){
    if(!explorer.open){if(after)after();return;}
    if(closingPanel)return;
    closingPanel=true;
    if(panelAnimation)panelAnimation.cancel();
    const finish=()=>{explorer.close();closingPanel=false;if(after)after();};
    if(reducedMotion.matches){finish();return;}
    const rect=panelOrigin?.getBoundingClientRect();
    const to=explorer.getBoundingClientRect();
    const visible=rect && rect.top<window.innerHeight && rect.bottom>0;
    const transform=visible?`translate(${rect.left+rect.width/2-to.left-to.width/2}px,${rect.top+rect.height/2-to.top-to.height/2}px) scale(${Math.max(.15,rect.width/to.width)},${Math.max(.1,rect.height/to.height)})`:'translateY(35px) scale(.97)';
    panelAnimation=explorer.animate([{transform:'none',opacity:1},{transform,opacity:0}],{duration:320,easing:'cubic-bezier(.4,0,1,1)'});
    panelAnimation.finished.then(finish).catch(finish);
  }
  function goTo(id){
    const target=document.getElementById(id);
    if(!target)return;
    const navigate=()=>{
      target.scrollIntoView({behavior:reducedMotion.matches?'instant':'smooth',block:'start'});
      history.replaceState(null,'','#'+id);
      target.setAttribute('tabindex','-1');
      target.focus({preventScroll:true});
      if(!reducedMotion.matches)target.animate([{opacity:.55},{opacity:1}],{duration:850,easing:'ease-out'});
    };
    if(explorer.open)closePanel(navigate);else navigate();
  }
  function bindPlan(root){
    const layout=$('.plan-layout',root);
    if(!layout)return;
    let selected=null;
    function selectRoom(id){
      selected=id;
      const room=rooms.find(r=>r.id===id);
      if(!room)return;
      $$('.room-link',layout).forEach(link=>$('.room-zone',link).classList.toggle('selected',link.dataset.room===id));
      $$('[data-plan-nav]',layout).forEach(button=>button.classList.toggle('active',button.dataset.planNav===id));
      const preview=$('.plan-preview',layout);
      $('h3',preview).textContent=room.name;$('p',preview).textContent=room.description;
      const go=$('.plan-go',preview);go.hidden=false;go.onclick=()=>goTo(id);
    }
    $$('.room-link',layout).forEach(link=>{
      link.addEventListener('pointerenter',event=>{if(event.pointerType!=='touch')selectRoom(link.dataset.room);});
      $('.room-zone',link).addEventListener('focus',()=>{if(!touchInput.matches)selectRoom(link.dataset.room);});
      link.addEventListener('click',event=>{
        event.preventDefault();const id=link.dataset.room;
        if(touchInput.matches && selected!==id){selectRoom(id);return;}
        selectRoom(id);goTo(id);
      });
      $('.room-zone',link).addEventListener('keydown',event=>{
        if(event.key==='Enter' || event.key===' '){event.preventDefault();selectRoom(link.dataset.room);goTo(link.dataset.room);}
      });
    });
    $$('[data-plan-nav]',layout).forEach(button=>{
      button.addEventListener('pointerenter',()=>selectRoom(button.dataset.planNav));
      button.addEventListener('focus',()=>selectRoom(button.dataset.planNav));
      button.addEventListener('click',()=>goTo(button.dataset.planNav));
    });
  }
  bindPlan($('#interactive-plan'));
  explorer.addEventListener('cancel',event=>{event.preventDefault();closePanel();});
  explorer.addEventListener('click',event=>{
    if(event.target!==explorer)return;
    const r=explorer.getBoundingClientRect();
    if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)closePanel();
  });
  let currentImage=0;
  let imageRequest=0;
  async function showImage(index){
    if(index<0||index>=images.length)return;
    currentImage=index;const request=++imageRequest;
    const img=$('#lightbox-image');
    const incoming=new Image();incoming.src=window.ALBUM_DETAILS?.[index]?.fullSrc || images[index].src;
    $('#lightbox-caption').textContent=labels[index];
    $('#lightbox-count').textContent=String(index+1).padStart(2,'0')+' / '+images.length;
    $('#lightbox-prev').disabled=index===0;$('#lightbox-next').disabled=index===images.length-1;
    img.style.opacity='.25';
    try{await incoming.decode();}catch{/* Browser still attempts the original image. */}
    if(request!==imageRequest)return;
    img.src=incoming.src;img.alt=labels[index];img.style.opacity='1';
    if(!reducedMotion.matches)img.animate([{opacity:.2,transform:'translateY(15px) scale(.98)'},{opacity:1,transform:'none'}],{duration:500,easing:'cubic-bezier(.22,1,.36,1)'});
  }
  function openImage(index){
    if(explorer.open)explorer.close();
    if(!lightbox.open)lightbox.showModal();
    showImage(index);
  }
  $('#lightbox-prev').onclick=()=>showImage(currentImage-1);
  $('#lightbox-next').onclick=()=>showImage(currentImage+1);
  lightbox.addEventListener('keydown',event=>{
    if(event.key==='ArrowLeft'){event.preventDefault();showImage(currentImage-1);}
    if(event.key==='ArrowRight'){event.preventDefault();showImage(currentImage+1);}
  });
  lightbox.addEventListener('close',()=>{imageRequest++;});
  document.addEventListener('click',event=>{
    const panel=event.target.closest('[data-panel]');
    if(panel){openPanel(panel.dataset.panel,panel);return;}
    const closer=event.target.closest('[data-close]');
    if(closer){if(closer.dataset.close==='explorer')closePanel();else lightbox.close();return;}
    const photoButton=event.target.closest('[data-image]');
    if(photoButton){openImage(Number(photoButton.dataset.image));return;}
    const go=event.target.closest('[data-go]');
    if(go){event.preventDefault();goTo(go.dataset.go);}
  });
  // Restrict the custom cursor to photographs and pointer devices.
  const cursor=$('#image-cursor');
  document.addEventListener('pointermove',event=>{
    const enabled=event.pointerType==='mouse'&&!reducedMotion.matches&&!lightbox.open&&!explorer.open;
    cursor.classList.toggle('visible',enabled&&!!event.target.closest('.photo-frame'));
    if(enabled){cursor.style.left=event.clientX+'px';cursor.style.top=event.clientY+'px';}
  },{passive:true});
  document.addEventListener('pointerleave',()=>cursor.classList.remove('visible'));
  window.addEventListener('blur',()=>cursor.classList.remove('visible'));
  reducedMotion.addEventListener('change',()=>{observeReveals();if(reducedMotion.matches)$('#hero-image').style.transform='none';});
})();
