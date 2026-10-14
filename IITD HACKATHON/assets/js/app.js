const D = window.SEVORA;
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
let currentLang = "en";

/* ---------- Toast ---------- */
function toast(msg){
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(window.__toast); window.__toast = setTimeout(()=>t.classList.remove("show"), 2600);
}

/* ---------- Tab routing via nav scroll ---------- */
function initNav(){
  $$(".nav a").forEach(a=>{
    a.addEventListener("click", (e)=>{
      const href = a.getAttribute("href");
      if (href && href.startsWith("#")) { /* let smooth scroll */ }
    });
  });
}

/* ---------- Render helpers ---------- */
function badgeVerified(v){
  return v ? `<span class="badge verified">✓ Verified</span>` : `<span class="badge pending">Pending verification</span>`;
}
function modeBadge(m){ return `<span class="badge mode">${m === "online" ? "Online" : "On-ground"}</span>`; }

/* ---------- Marketplace ---------- */
function renderOpps(list){
  const grid = $("#oppGrid");
  if (!list.length){ grid.innerHTML = "<div class='empty'>No matching opportunities. Try widening your filters.</div>"; return; }
  grid.innerHTML = list.map(o=>`
    <article class="opp-card">
      <div style="display:flex;gap:6px;flex-wrap:wrap;">
        ${badgeVerified(o.verified)} ${modeBadge(o.mode)} <span class="badge cause">${o.cause}</span>
      </div>
      <h3 class="title">${o.title}</h3>
      <div class="ngo">${o.ngo}</div>
      <p class="desc">${o.desc}</p>
      <div class="opp-meta">
        <span>⏱ ${o.hours}h</span>
        <span>📅 ${o.deadline}</span>
        <span>📍 ${o.location}</span>
        <span>👥 ${o.spots} spots</span>
      </div>
      <div class="footer">
        <div style="font-size:12px;color:var(--muted)">${o.skills.join(", ")}</div>
        <button class="btn btn-primary btn-sm" onclick="applyOpp(${o.id})">Apply</button>
      </div>
    </article>
  `).join("");
}
function filterOpps(){
  const q = $("#fSearch").value.toLowerCase();
  const cause = $("#fCause").value;
  const mode = $("#fMode").value;
  const skill = $("#fSkill").value;
  const maxH = $("#fHours").value;
  let list = D.opportunities.filter(o=>{
    if (q && !(o.title+o.ngo+o.desc).toLowerCase().includes(q)) return false;
    if (cause && o.cause !== cause) return false;
    if (mode && o.mode !== mode) return false;
    if (skill && !o.skills.includes(skill)) return false;
    if (maxH && o.hours > Number(maxH)) return false;
    return true;
  });
  renderOpps(list);
}
function applyOpp(id){
  const o = D.opportunities.find(x=>x.id===id);
  $("#modalTitle").textContent = "Apply · " + o.title;
  $("#modalBody").innerHTML = `
    <p class="muted" style="margin-top:0">${o.ngo} · ${o.cause} · ${o.mode} · ${o.hours} hours</p>
    <div class="form-group"><label>Full name</label><input placeholder="Your name"></div>
    <div class="form-group"><label>Email</label><input type="email" placeholder="you@example.com"></div>
    <div class="form-group"><label>Why you'd like to help</label><textarea placeholder="A line or two..."></textarea></div>
    <div class="form-group"><label>Availability</label><select><option>Weekends</option><option>Weekday evenings</option><option>Flexible</option></select></div>
    <button class="btn btn-primary" onclick="submitApply()">Submit application</button>
    <p class="muted" style="font-size:12px;margin-top:10px">Applications are routed to the NGO dashboard for review. Certificates are issued only after the NGO confirms completed work.</p>
  `;
  openModal();
}
function submitApply(){ closeModal(); toast("Application submitted! Status will update in your portfolio."); }

/* ---------- Virtual hub ---------- */
function renderHub(){
  $("#hubGrid").innerHTML = D.skillsCatalog.map(s=>`
    <div class="hub-card">
      <div class="icon">${s.icon}</div>
      <h4>${s.name}</h4>
      <p>${s.tasks.join(" · ")}</p>
    </div>
  `).join("");
}

/* ---------- Events ---------- */
function renderEvents(){
  $("#eventGrid").innerHTML = D.events.map(e=>`
    <article class="event-card">
      <div class="cover">${e.cover}</div>
      <div class="body">
        <h4>${e.title}</h4>
        <div class="ngo">${e.ngo}</div>
        <div class="event-meta">
          <span>📅 ${e.date}</span><span>📍 ${e.location}</span><span>${e.mode==="online"?"🌐 Online":"🚶 On-ground"}</span>
        </div>
        <div class="ticket">
          <span style="font-weight:700;color:${e.price===0?'var(--success)':'var(--ink)'}">${e.price===0?'Free': '₹'+e.price}</span>
          <button class="btn btn-ghost btn-sm" onclick="bookEvent(${e.id})">${e.price===0?'Register':'Book ticket'}</button>
          <button class="btn btn-sm" style="background:#e8f3f0;color:var(--brand)" onclick="toast('Reminder set!')">Remind me</button>
        </div>
      </div>
    </article>
  `).join("");
}
function bookEvent(id){
  const e = D.events.find(x=>x.id===id);
  closeModal();
  $("#modalTitle").textContent = e.price===0 ? "Registration confirmed" : "Ticket booking";
  $("#modalBody").innerHTML = `<p>${e.price===0?"You're registered for ":"Booking for "}<b>${e.title}</b> on ${e.date} at ${e.location}.</p>
    ${e.price>0?`<div class="form-group"><label>Payment (demo)</label><input placeholder="Card number (demo only)"></div><button class="btn btn-accent" onclick="closeModal();toast('Ticket booked (demo). Receipt issued by organizer.')">Pay ₹${e.price}</button>`:`<button class="btn btn-primary" onclick="closeModal();toast('Registered! You'll receive directions & attendance confirmation.')">Done</button>`}
    <p class="muted" style="font-size:12px;margin-top:10px">Receipts/tickets are issued by the organizing NGO. Tax claims are verified, never promised.</p>`;
  openModal();
}

/* ---------- Portfolio ---------- */
function renderPortfolio(){
  const p = D.portfolio;
  $("#portfolioProfile").innerHTML = `
    <div class="avatar">${p.user.split(" ").map(x=>x[0]).join("")}</div>
    <h3>${p.user}</h3>
    <div class="role">${p.role}</div>
    <div class="stats-mini">
      <div><b>${p.hours}</b><span>Verified hours</span></div>
      <div><b>${p.tasks}</b><span>Tasks done</span></div>
      <div><b>${p.certs}</b><span>Certificates</span></div>
    </div>
    <div style="font-size:13px;color:var(--muted);margin-bottom:8px">Skills</div>
    <div style="display:flex;gap:6px;flex-wrap:wrap">${p.skills.map(s=>`<span class="badge cause">${s}</span>`).join("")}</div>
    <div style="margin-top:14px;font-size:13px;color:var(--muted)">Reliability rating: <b style="color:var(--brand)">${p.rating}/5</b></div>
  `;
  $("#completedList").innerHTML = p.completed.map(c=>`
    <div class="cert"><div><div class="name">${c.title}</div><div class="muted" style="font-size:12px">${c.hours}h · ${c.status}</div></div>
      ${c.status.includes("cert")?`<button class="btn btn-sm btn-ghost" onclick="toast('Certificate downloaded (demo)')">Download cert</button>`:`<span class="badge pending">Pending</span>`}
    </div>
  `).join("");
  $("#certList").innerHTML = p.certs.map(c=>`
    <div class="cert">
      <div><div class="name">🎓 ${c.title}</div><div class="muted" style="font-size:12px">Issued by ${c.issuer} · ${c.date} · ${c.hours} verified hours</div></div>
      <span class="badge verified">Verified</span>
    </div>
  `).join("");
}

/* ---------- Donations ---------- */
function renderCampaigns(){
  $("#campaignGrid").innerHTML = D.campaigns.map(c=>{
    const pct = Math.round(c.raised/c.goal*100);
    return `<article class="camp-card">
      <h3 style="margin:0">${c.title}</h3>
      <div class="ngo">${c.ngo}</div>
      <p class="muted" style="font-size:14px">${c.purpose}</p>
      <div class="progress"><div style="width:${pct}%"></div></div>
      <div class="camp-meta"><span>₹${c.raised.toLocaleString()} raised</span><span>Goal ₹${c.goal.toLocaleString()} (${pct}%)</span></div>
      <div style="margin-top:12px;display:flex;gap:8px">
        <button class="btn btn-accent btn-sm" onclick="donate(${c.id})">Donate</button>
        ${c.updates.map(u=>`<span style="font-size:11px;color:var(--muted)">• ${u}</span>`).join(" ")}
      </div>
    </article>`;
  }).join("");
}
function donate(id){
  const c = D.campaigns.find(x=>x.id===id);
  $("#modalTitle").textContent = "Donate · " + c.title;
  $("#modalBody").innerHTML = `
    <p class="muted" style="margin-top:0">${c.ngo}</p>
    <div class="form-group"><label>Amount (₹)</label><input type="number" value="500" min="10"></div>
    <div class="form-group"><label>Purpose</label><select><option>General fund</option><option>Specific campaign</option></select></div>
    <button class="btn btn-accent" onclick="closeModal();toast('Payment recorded (demo). Receipt issued by ${c.ngo}.')">Donate now</button>
    <p class="muted" style="font-size:12px;margin-top:10px">You'll receive a payment confirmation and an NGO-issued receipt. Tax-related claims are verified, not auto-promised.</p>
  `;
  openModal();
}

/* ---------- Reporting ---------- */
function renderReports(){
  $("#statusList").innerHTML = D.reports.map(r=>`
    <div class="status-item">
      <div>
        <div style="font-weight:600">${r.type}</div>
        <div class="muted" style="font-size:12px">${r.id} · ${r.location} · ${r.updated}</div>
      </div>
      <span class="status-pill ${r.status}">${statusLabel(r.status)}</span>
    </div>
  `).join("");
}
function statusLabel(s){ return {new:"New",review:"Under review",routed:"Routed to NGO",resolved:"Resolved"}[s]||s; }
function submitReport(e){
  e.preventDefault();
  const type = $("#rType").value;
  const loc = $("#rLoc").value.trim();
  const desc = $("#rDesc").value.trim();
  if (!loc || !desc){ toast("Please fill location and description."); return; }
  const id = "R-" + (1043 + Math.floor(Math.random()*100));
  D.reports.unshift({id, type, location:loc, status:"new", updated:"just now"});
  renderReports();
  toast(`Report ${id} submitted. Routed for human moderation before verification.`);
  e.target.reset();
}

/* ---------- NGO directory ---------- */
function renderNGOs(){
  $("#ngoGrid").innerHTML = D.ngos.map(n=>`
    <div class="ngo-card">
      <h4>${n.name} ${n.verified?'<span class="badge verified">✓ Verified</span>':'<span class="badge pending">Pending</span>'}</h4>
      <div class="cause">${n.cause} · Founded ${n.founded} · ${n.location}</div>
      <p style="font-size:13px;color:var(--ink-soft);margin:8px 0">${n.desc}</p>
      <div class="meta">Needs: ${n.needs.join(", ")}</div>
      ${n.verified?`<button class="btn btn-ghost btn-sm" style="margin-top:8px" onclick="toast('NGO profile opened (demo)')">View profile</button>`:`<span class="muted" style="font-size:12px">Further verification required before listing.</span>`}
    </div>
  `).join("");
}

/* ---------- Impact dashboard ---------- */
function renderImpact(){
  const im = D.impact;
  $("#impactGrid").innerHTML = [
    ["Volunteers", im.volunteers],
    ["Verified hours", im.hours],
    ["Campaigns", im.campaigns],
    ["Verified NGOs", im.ngos],
    ["Tasks completed", im.tasks],
    ["Reports resolved", im.reports],
  ].map(([l,v])=>`<div class="impact-tile"><b>${v.toLocaleString()}</b><span>${l}</span></div>`).join("");
  const wrap = $("#chartBars");
  const max = Math.max(...D.impactMonths);
  wrap.innerHTML = D.impactMonths.map((v,i)=>{
    const h = Math.round(v/max*100);
    return `<div class="bar" style="height:${h}%" data-v="${(v/1000).toFixed(1)}k"></div>`;
  }).join("");
  $("#badges").innerHTML = D.badges.map(b=>`<span class="badge verified" style="margin:4px">${b}</span>`).join("");
}

/* ---------- Chatbot ---------- */
const chatState = { open:false };
function toggleChat(){ chatState.open=!chatState.open; $("#chatPanel").classList.toggle("open", chatState.open); }
function addMsg(text, who="bot", matches=[]){
  const body = $("#chatBody");
  const div = document.createElement("div");
  div.className = "msg "+who;
  let html = text.replace(/\n/g,"<br>");
  if (matches.length){
    html += matches.map(m=>`<div class="match"><b>${m.title}</b> · ${m.ngo}<br><span style="color:var(--muted);font-size:12px">${m.mode} · ${m.hours}h · ${m.cause} · ${m.verified?"✓ verified":"pending"}</span><br><button class="btn btn-sm btn-ghost" style="margin-top:6px" onclick="applyOpp(${m.id})">Apply</button></div>`).join("");
  }
  div.innerHTML = html;
  body.appendChild(div);
  body.scrollTop = body.scrollHeight;
}
function chatReply(q){
  q = q.toLowerCase();
  const all = D.opportunities;
  let matches = [];
  let text = "";
  // detect mode
  const wantsOnline = /online|home|remote|virtual/.test(q);
  const wantsOffline = /offline|on-ground|nearby|event|drive/.test(q);
  // detect hours
  let hours = null;
  const m = q.match(/(\d+)\s*(h|hr|hour|hours)/);
  if (m) hours = Number(m[1]);
  const lowTime = /30\s*min|half hour|short task|small task/.test(q);
  // detect skills
  const skillMap = [["writing","Writing"],["design","Design"],["code","Coding"],["coding","Coding"],["research","Research"],["teach","Teaching"],["translation","Translation"],["video","Video Editing"],["social media","Social Media"],["marketing","Digital Marketing"]];
  const skills = skillMap.filter(([k])=>q.includes(k)).map(([,v])=>v);
  // cause
  const causeKey = D.causes.find(c=>q.includes(c.toLowerCase().split(" ")[0]));
  // student hours / certificates
  if (/certificate|service hour|community service|college|credit/.test(q)){
    text = "Great — Sevora issues verified certificates, but only after the NGO confirms your work is completed (not auto-badges). For community-service hours, pick verified opportunities and your completed hours show up in your Volunteer Portfolio for college approval.";
  }
  // reporting
  if (/report|injured|animal|shelter|food|help needed/.test(q) && !/volunteer/.test(q)){
    text = "You can report an issue via the Community Help section. Reports go through moderation and human review before routing to the right NGO. For urgent harm, please contact local emergency services immediately.";
    addMsg(text); return;
  }
  // donation
  if (/donat|receipt|fund/.test(q)){
    text = "Explore campaigns in the Donations section. Each shows purpose, progress and updates. Receipts are issued by the organizing NGO; tax claims are verified, never auto-promised.";
    addMsg(text); return;
  }
  // match
  let pool = all.filter(o=>{
    if (wantsOnline && o.mode!=="online") return false;
    if (wantsOffline && o.mode!=="offline") return false;
    if (skills.length && !skills.some(s=>o.skills.includes(s))) return false;
    if (causeKey && o.cause !== causeKey) return false;
    if (hours !== null && o.hours > hours+1) return false;
    if (lowTime) return o.hours <= 0.5;
    return true;
  });
  // prefer verified
  pool.sort((a,b)=> (b.verified-a.verified) || (a.hours-b.hours));
  matches = pool.slice(0,4);
  if (!text) text = matches.length
    ? "Here are some matches from the verified opportunity database (Sevora uses its own verified NGO/volunteering DB first; TinyFish web research is an additional source for NGO discovery, not the source of truth):"
    : "I couldn't find an exact match. Try adjusting location, cause or time. You can also browse the Smart Volunteering Marketplace.";
  addMsg(text, "bot", matches);
}
function sendChat(){
  const inp = $("#chatInput");
  const val = inp.value.trim();
  if (!val) return;
  addMsg(val, "user");
  inp.value = "";
  setTimeout(()=>chatReply(val), 400);
}
function initChat(){
  $("#chatFab").addEventListener("click", toggleChat);
  $("#chatSend").addEventListener("click", sendChat);
  $("#chatInput").addEventListener("keydown", e=>{ if(e.key==="Enter") sendChat(); });
  $$(".chat-chips .chip").forEach(c=> c.addEventListener("click", ()=>{ $("#chatInput").value = c.dataset.q; sendChat(); }));
  addMsg("Hi! I'm Sevora's assistant. Tell me your skills, time and whether you prefer online or on-ground volunteering, and I'll suggest verified opportunities. (I answer in your language — pick one in the header.)");
}

/* ---------- Modal ---------- */
function openModal(){ $("#modalBackdrop").classList.add("open"); }
function closeModal(){ $("#modalBackdrop").classList.remove("open"); }

/* ---------- Language (UI labels) ---------- */
const i18n = {
  en: { home:"Home", market:"Marketplace", virtual:"Virtual", events:"Events", portfolio:"Portfolio", donate:"Donations", report:"Report", ngos:"NGOs" },
  hi: { home:"होम", market:"बाज़ार", virtual:"वर्चुअल", events:"कार्यक्रम", portfolio:"प्रोफ़ाइल", donate:"दान", report:"रिपोर्ट", ngos:"NGO" },
  ta: { home:"முகப்பு", market:"சந்தை", virtual:"மெய்நிகர்", events:"நிகழ்வுகள்", portfolio:"சுயவிவரம்", donate:"நன்கொடை", report:"புகார்", ngos:"NGO" },
};
function setLang(lang){
  currentLang = lang;
  const t = i18n[lang] || i18n.en;
  $$("[data-i18n]").forEach(el=>{ const k = el.dataset.i18n; if (t[k]) el.textContent = t[k]; });
  toast("Language set to " + lang.toUpperCase() + " (demo labels). Full multilingual coming via model+translation.");
}

/* ---------- TinyFish note (research demo) ---------- */
async function researchNgoDemo(){
  // illustrative: would call TinyFish Search/Fetch here. We show a mocked summary.
  toast("TinyFish would search+fetch public NGO pages here to prepare a record for human review. (Not called — no API key.)");
}

/* ---------- Init ---------- */
document.addEventListener("DOMContentLoaded", ()=>{
  initNav();
  renderOpps(D.opportunities);
  renderHub();
  renderEvents();
  renderPortfolio();
  renderCampaigns();
  renderReports();
  renderNGOs();
  renderImpact();
  initChat();
  // filters
  ["fSearch","fCause","fMode","fSkill","fHours"].forEach(id=>{ const el=$("#"+id); if(el) el.addEventListener("input", filterOpps); el.addEventListener("change", filterOpps); });
  // lang
  $("#langSelect").addEventListener("change", e=>setLang(e.target.value));
  // modal close
  $("#modalBackdrop").addEventListener("click", e=>{ if(e.target.id==="modalBackdrop") closeModal(); });
  $("#modalClose").addEventListener("click", closeModal);
  // report form
  $("#reportForm").addEventListener("submit", submitReport);
  // research button
  const rb = $("#researchBtn"); if(rb) rb.addEventListener("click", researchNgoDemo);
});
