const E=[
{n:"HackHive 36",c:"Hackathon",e:"💻",d:"36 hours of building, mentors and midnight snacks.",t:"Live",dt:"Nov 16–17",p:82},
{n:"Convergence Summit",c:"Conference",e:"🎤",d:"Industry leaders and alumni talk AI, core and careers.",t:"Next",dt:"Nov 20",p:55},
{n:"Paper Trail",c:"Poster",e:"📄",d:"Present your research poster to a panel of faculty.",t:"Next",dt:"Nov 22",p:40},
{n:"Circuit Clash",c:"Robotics",e:"🤖",d:"Bots battle it out in the arena. Build, race, win.",t:"Live",dt:"Nov 16",p:90},
{n:"Raag & Rhythm",c:"Cultural",e:"🎶",d:"Music, dance and drama under the open sky.",t:"Next",dt:"Nov 25",p:63},
{n:"Prototype Lab",c:"Workshop",e:"🛠️",d:"Hands-on workshop: from idea to working prototype.",t:"Open",dt:"Nov 27",p:30},
{n:"Sprint Cup",c:"Sports",e:"🏃",d:"Inter-department sports meet with track and field.",t:"Open",dt:"Nov 29",p:48},
{n:"Alumni Assemble",c:"Ceremony",e:"🏆",d:"Awards, reunions and stories from IEM graduates.",t:"Open",dt:"Dec 02",p:20}];
const T=[["Aarav S.","Student Lead"],["Ishita D.","Design Head"],["Prof. R. Sen","Faculty Mentor"],["Rohan M.","Tech Lead"],["Sneha B.","Cultural Head"],["Dev K.","Sponsorship"],["Dr. A. Roy","Faculty Mentor"],["Mitali P.","Media Head"]];
const $=s=>document.querySelector(s);
const card=x=>`<div class="card"><span class="tag ${x.t=='Live'?'live':''}">${x.t=='Live'?'● LIVE':x.t}</span><div class="em">${x.e}</div><h3>${x.n}</h3><p>${x.d}</p><div class="bar"><i data-w="${x.p}"></i></div><div class="meta"><span>${x.c} · ${x.dt}</span><button data-r="${x.n}">Register →</button></div></div>`;
$('#g1').innerHTML=E.filter(x=>x.t!='Open').map(card).join('');
const cats=['All',...new Set(E.map(x=>x.c))];
$('#chips').innerHTML=cats.map((c,i)=>`<button class="chip ${i?'':'on'}" data-c="${c}">${c}</button>`).join('');
const draw=c=>{$('#g2').innerHTML=E.filter(x=>c=='All'||x.c==c).map(card).join('');fill()};
$('#chips').onclick=e=>{const c=e.target.dataset.c;if(!c)return;document.querySelectorAll('.chip').forEach(b=>b.classList.toggle('on',b===e.target));draw(c)};
$('#g3').innerHTML=T.map(([a,r])=>`<div class="card"><div class="av">${a[0]}</div><h3>${a}</h3><p>${r}</p></div>`).join('');
$('#tk').innerHTML=(E.map(x=>x.n.toUpperCase()+'<span>✦</span>').join('')).repeat(4);
function fill(){requestAnimationFrame(()=>document.querySelectorAll('.bar i').forEach(i=>i.style.width=i.dataset.w+'%'))}
draw('All');
// tilt
document.addEventListener('mousemove',e=>{const c=e.target.closest&&e.target.closest('.card');document.querySelectorAll('.card').forEach(k=>{if(k!==c)k.style.transform=''});if(!c)return;const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform=`perspective(700px) rotateY(${x*10}deg) rotateX(${-y*10}deg) translateY(-6px)`});
// reveal
const io=new IntersectionObserver(a=>a.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.1});
document.querySelectorAll('.rv').forEach(s=>io.observe(s));
// counters
document.querySelectorAll('[data-n]').forEach(b=>{const n=+b.dataset.n;let s=null;const f=t=>{s=s||t;const p=Math.min((t-s)/1800,1);b.textContent=Math.floor(n*(1-Math.pow(1-p,3))).toLocaleString()+(p==1?'+':'');if(p<1)requestAnimationFrame(f)};requestAnimationFrame(f)});
// countdown
const tgt=new Date('2026-11-20T09:00:00+05:30');
const tick=()=>{let d=Math.max(0,tgt-new Date()),v=[[864e5,'Days'],[36e5,'Hrs'],[6e4,'Min'],[1e3,'Sec']];$('#cd').innerHTML=v.map(([m,l])=>{const x=Math.floor(d/m);d-=x*m;return`<div><b>${String(x).padStart(2,'0')}</b><small>${l}</small></div>`}).join('')};tick();setInterval(tick,1000);
// theme
$('#tg').onclick=()=>{const r=document.documentElement,d=getComputedStyle(r).colorScheme=='dark';r.dataset.theme=d?'light':'dark'};
// top
addEventListener('scroll',()=>$('#top').classList.toggle('v',scrollY>500));$('#top').onclick=()=>scrollTo({top:0});
// modal
const m=$('#mod');
document.addEventListener('click',e=>{const r=e.target.dataset.r;if(r){$('#mt').textContent='Register: '+r;$('#fm').style.display='';$('#ok').style.display='none';m.classList.add('o')}});
$('#cx').onclick=()=>m.classList.remove('o');m.onclick=e=>{if(e.target===m)m.classList.remove('o')};
$('#sub').onclick=()=>{if(!$('#n').value||!$('#e').value||!$('#i').value){alert('Please fill all fields');return}
try{localStorage.setItem('iem-reg',JSON.stringify({n:$('#n').value,e:$('#e').value,i:$('#i').value}))}catch(_){}
$('#fm').style.display='none';$('#ok').style.display='block'};
