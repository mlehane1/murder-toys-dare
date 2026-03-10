import { useState, useEffect } from "react";

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Boogaloo&family=Fredoka+One&family=Share+Tech+Mono&family=Nunito:wght@400;600;700;900&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg:           #1a1410;
      --bg2:          #221c16;
      --card:         #2a2018;
      --border:       #3a2e22;
      --neon-pink:    #FF2D9B;
      --neon-cyan:    #00E5FF;
      --neon-yellow:  #F5E642;
      --neon-green:   #39FF14;
      --neon-orange:  #FF6B1A;
      --blood:        #CC2222;
      --white:        #F5F0E8;
      --muted:        #9A8E7E;
      --font-display: 'Fredoka One', cursive;
      --font-fun:     'Boogaloo', cursive;
      --font-body:    'Nunito', sans-serif;
      --font-mono:    'Share Tech Mono', monospace;
      --nav-h:        56px;
      --tab-h:        60px;
    }

    html { font-size: 16px; -webkit-text-size-adjust: 100%; }
    body {
      background: var(--bg);
      color: var(--white);
      font-family: var(--font-body);
      overflow-x: hidden;
      /* space for bottom tab bar on mobile */
      padding-bottom: var(--tab-h);
    }
    @media (min-width: 640px) { body { padding-bottom: 0; } }

    ::-webkit-scrollbar { width: 3px; }
    ::-webkit-scrollbar-track { background: var(--bg2); }
    ::-webkit-scrollbar-thumb { background: var(--neon-pink); border-radius: 2px; }

    /* Prevent iOS zoom on input focus — must be >= 16px */
    input, textarea, select {
      background: #1e1710;
      border: 1px solid var(--border);
      color: var(--white);
      font-family: var(--font-body);
      font-size: 16px;
      padding: 13px 14px;
      border-radius: 10px;
      width: 100%;
      outline: none;
      transition: border-color .2s, box-shadow .2s;
      -webkit-appearance: none;
      appearance: none;
    }
    input:focus, textarea:focus, select:focus {
      border-color: var(--neon-cyan);
      box-shadow: 0 0 0 3px rgba(0,229,255,.1);
    }
    input::placeholder, textarea::placeholder { color: #5a4e3e; }

    button { cursor: pointer; font-family: var(--font-body); -webkit-tap-highlight-color: transparent; }
    a { color: inherit; text-decoration: none; -webkit-tap-highlight-color: transparent; }

    /* Min touch target */
    .tap { min-height: 44px; min-width: 44px; display: flex; align-items: center; justify-content: center; }

    .neon-sign {
      display: inline-flex;
      align-items: center;
      border: 2px solid currentColor;
      border-radius: 4px;
      padding: 3px 10px;
      font-family: var(--font-mono);
      font-size: 10px;
      letter-spacing: 1.5px;
      font-weight: 700;
      white-space: nowrap;
    }

    .checkbox-row { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 14px; }
    .checkbox-row input[type=checkbox] {
      width: 22px; height: 22px; min-width: 22px; margin-top: 1px;
      accent-color: var(--neon-pink); cursor: pointer;
    }

    .grain-overlay {
      position: fixed; inset: 0; pointer-events: none; z-index: 998; opacity: .025;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
      background-size: 200px 200px;
    }

    @keyframes flicker   { 0%,96%,100%{opacity:1} 97%{opacity:.3} 98%{opacity:1} 99%{opacity:.6} }
    @keyframes float     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
    @keyframes slide-up  { from{transform:translateY(20px);opacity:0} to{transform:translateY(0);opacity:1} }
    @keyframes pulse-sign{ 0%,100%{opacity:1} 50%{opacity:.7} }
    @keyframes fade-in   { from{opacity:0} to{opacity:1} }
    @keyframes slide-down{ from{transform:translateY(-10px);opacity:0} to{transform:translateY(0);opacity:1} }

    .flicker    { animation: flicker 5s infinite; }
    .float      { animation: float 3s ease-in-out infinite; }
    .slide-up   { animation: slide-up .35s ease forwards; }
    .pulse-sign { animation: pulse-sign 2.5s ease-in-out infinite; }
    .fade-in    { animation: fade-in .3s ease forwards; }

    /* Responsive grid */
    .char-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 14px;
    }
    @media (min-width: 480px) { .char-grid { grid-template-columns: 1fr 1fr; } }
    @media (min-width: 900px) { .char-grid { grid-template-columns: repeat(4, 1fr); } }

    /* Admin cards on mobile */
    .admin-table { display: none; }
    .admin-cards { display: flex; flex-direction: column; gap: 10px; }
    @media (min-width: 768px) {
      .admin-table { display: table; width: 100%; border-collapse: collapse; }
      .admin-cards { display: none; }
    }

    /* Two-col grid for review page */
    .review-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 12px;
    }
    @media (min-width: 600px) { .review-grid { grid-template-columns: 1fr 1fr; } }

    /* Stats strip wrap */
    .stats-strip {
      display: flex;
      gap: 10px;
      flex-wrap: nowrap;
      overflow-x: auto;
      padding-bottom: 4px;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
    }
    .stats-strip::-webkit-scrollbar { display: none; }

    /* Page padding */
    .page { max-width: 1200px; margin: 0 auto; padding: 20px 16px 32px; }
    @media (min-width: 640px) { .page { padding: 32px 24px 40px; } }
  `}</style>
);

// ─── DATA ─────────────────────────────────────────────────────────────────────
const CHARACTERS = [
  { id:1, name:"BLOODY MARY",    emoji:"🦄", neon:"#FF2D9B", bgTint:"#2a0a1a", bounty:500,  score:847, dareTitle:"The Red Mirror Dare",      dareDesc:"Film yourself saying 'Bloody Mary' 3x in a dark bathroom, turn on the lights and react. Must show full face reveal.", status:"open",   endDate:"Aug 15", tags:["#BloodyMaryDare","#MurderToys"], submissions:42 },
  { id:2, name:"DR. STITCH",     emoji:"🪡", neon:"#39FF14", bgTint:"#0a1a0a", bounty:750,  score:612, dareTitle:"The Franken-Fit Dare",      dareDesc:"Create a DIY costume using only items you can find in 10 minutes. Document the whole process in a single uncut video.", status:"open",   endDate:"Aug 20", tags:["#FrankenFit","#MurderToys"],     submissions:28 },
  { id:3, name:"THE PUPPET",     emoji:"🎭", neon:"#FF6B1A", bgTint:"#1a0e00", bounty:1000, score:290, dareTitle:"Strings Attached Dare",     dareDesc:"Act out an entire conversation as if someone else is controlling your movements. No breaks. Minimum 60 seconds.", status:"open",   endDate:"Sep 1",  tags:["#StringsAttached","#MurderToys"], submissions:11 },
  { id:4, name:"CHAINSAW CATHY", emoji:"⚙️", neon:"#FF2D9B", bgTint:"#1a0a18", bounty:600,  score:755, dareTitle:"Rev It Up Dare",            dareDesc:"Do your morning routine at 2x speed while narrating everything in the most intense voice possible.", status:"open",   endDate:"Aug 25", tags:["#RevItUp","#MurderToys"],         submissions:37 },
  { id:5, name:"GHOST GRIP",     emoji:"👻", neon:"#00E5FF", bgTint:"#001a1a", bounty:450,  score:441, dareTitle:"Vanishing Act Dare",        dareDesc:"Pretend to be invisible for an entire shopping trip. React to everything as if no one can see you.", status:"closed", endDate:"Jul 30", tags:["#VanishingAct","#MurderToys"],    submissions:19 },
  { id:6, name:"VOODOO PETE",    emoji:"🪆", neon:"#BF5FFF", bgTint:"#150a1a", bounty:800,  score:333, dareTitle:"Pin Drop Dare",             dareDesc:"Find the most dramatic 'silence' moment — restaurant, library, elevator — and drop something. Film the reactions.", status:"open",   endDate:"Sep 10", tags:["#PinDrop","#MurderToys"],         submissions:15 },
  { id:7, name:"TOXIC TED",      emoji:"☢️", neon:"#39FF14", bgTint:"#091a04", bounty:550,  score:520, dareTitle:"Contamination Dare",        dareDesc:"Wear a hazmat-inspired outfit in public and act completely normal. Film at least 3 different people reacting.", status:"open",   endDate:"Aug 30", tags:["#ContaminationDare","#MurderToys"],submissions:24 },
  { id:8, name:"WIDOW BLADE",    emoji:"🗡️", neon:"#F5E642", bgTint:"#1a1800", bounty:900,  score:178, dareTitle:"The Cut Dare",              dareDesc:"Edit a 60-second video using only jump cuts, switching between 5+ locations. All in one day. Must feel cinematic.", status:"open",   endDate:"Sep 15", tags:["#TheCutDare","#MurderToys"],      submissions:7  },
];

const MOCK_SUBS = [
  { id:1, charId:1, name:"Jake Morrison", email:"jake@example.com",   phone:"555-0101", displayName:"JakeMo_Dares",  instagram:"https://instagram.com/p/abc123", tiktok:"https://tiktok.com/@jake/video/111",   facebook:"https://facebook.com/posts/222", status:"pending_review", submittedAt:"Jul 18 · 2:32pm", notes:"",                    duplicate:false },
  { id:2, charId:1, name:"Sara Chen",     email:"sara@example.com",   phone:"555-0102", displayName:"SaraScreams",   instagram:"https://instagram.com/p/def456", tiktok:"https://tiktok.com/@sara/video/222",   facebook:"https://facebook.com/posts/333", status:"approved",       submittedAt:"Jul 17 · 9:15am", notes:"Great energy!",       duplicate:false },
  { id:3, charId:2, name:"Marcus T.",     email:"marcus@example.com", phone:"555-0103", displayName:"MarcusThrills", instagram:"https://instagram.com/p/ghi789", tiktok:"https://tiktok.com/@marcus/video/333", facebook:"https://facebook.com/posts/444", status:"winner",         submittedAt:"Jul 16 · 6:44pm", notes:"Best costume",        duplicate:false },
  { id:4, charId:4, name:"Priya K.",      email:"priya@example.com",  phone:"555-0104", displayName:"PriyaFast",     instagram:"https://instagram.com/p/jkl012", tiktok:"https://tiktok.com/@priya/video/444", facebook:"https://facebook.com/posts/555", status:"rejected",       submittedAt:"Jul 15 · 11:20am",notes:"Missing end-tag",     duplicate:false },
  { id:5, charId:1, name:"Jake Morrison", email:"jake@example.com",   phone:"555-0101", displayName:"JakeMo_Dares",  instagram:"https://instagram.com/p/abc123", tiktok:"https://tiktok.com/@jake/video/111",   facebook:"https://facebook.com/posts/226", status:"submitted",      submittedAt:"Jul 19 · 8:01am", notes:"",                    duplicate:true  },
  { id:6, charId:7, name:"Devon Black",   email:"devon@example.com",  phone:"555-0105", displayName:"DevonDanger",   instagram:"https://instagram.com/p/xyz999", tiktok:"https://tiktok.com/@devon/video/555", facebook:"https://facebook.com/posts/666", status:"paid",           submittedAt:"Jul 14 · 4:00pm", notes:"Paid via Venmo",      duplicate:false },
];

const STATUS_CFG = {
  submitted:      { label:"Submitted",      color:"#60A5FA", bg:"#0a1528" },
  pending_review: { label:"Pending Review", color:"#FBBF24", bg:"#1e1500" },
  approved:       { label:"Approved",       color:"#39FF14", bg:"#091a04" },
  rejected:       { label:"Rejected",       color:"#FF4444", bg:"#1a0404" },
  disqualified:   { label:"Disqualified",   color:"#BF5FFF", bg:"#12051a" },
  winner:         { label:"Winner 🏆",      color:"#F5E642", bg:"#1a1500" },
  paid:           { label:"Paid ✓",         color:"#39FF14", bg:"#051a05" },
};

// ─── SHARED COMPONENTS ────────────────────────────────────────────────────────
const NeonSign = ({ text, color, size=10, style={} }) => (
  <span className="neon-sign pulse-sign"
    style={{ color, borderColor:color, boxShadow:`0 0 6px ${color}55, inset 0 0 6px ${color}11`, fontSize:size, ...style }}>
    {text}
  </span>
);

const MurderMeter = ({ score, neon }) => {
  const pct = Math.round(score / 10);
  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", fontFamily:"var(--font-mono)", fontSize:10, color:"#6a5a4a", marginBottom:4 }}>
        <span>MURDER METER</span>
        <span style={{ color:neon }}>{pct}%</span>
      </div>
      <div style={{ height:7, background:"#1a1410", borderRadius:4, overflow:"hidden", border:"1px solid #3a2e22" }}>
        <div style={{ height:"100%", width:`${pct}%`, background:`linear-gradient(90deg,${neon}55,${neon})`, boxShadow:`0 0 8px ${neon}77`, borderRadius:4 }} />
      </div>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const cfg = STATUS_CFG[status] || { label:status, color:"#888", bg:"#222" };
  return (
    <span style={{ display:"inline-block", padding:"3px 10px", borderRadius:20, background:cfg.bg, color:cfg.color, border:`1px solid ${cfg.color}44`, fontFamily:"var(--font-mono)", fontSize:11, whiteSpace:"nowrap" }}>
      {cfg.label}
    </span>
  );
};

const BackBtn = ({ onClick, label="← Back" }) => (
  <button onClick={onClick}
    style={{ background:"none", border:"1px solid #3a2e22", color:"#6a5a4a", padding:"10px 18px", fontFamily:"var(--font-fun)", fontSize:15, marginBottom:24, borderRadius:20, minHeight:44 }}>
    {label}
  </button>
);

// ─── TOP NAV (desktop) ────────────────────────────────────────────────────────
const Nav = ({ view, setView, adminMode, setAdminMode }) => (
  <nav style={{ background:"linear-gradient(180deg,#120e0a,#1a1410)", borderBottom:"2px solid #3a2e22", padding:"0 16px", display:"flex", alignItems:"center", justifyContent:"space-between", height:"var(--nav-h)", position:"sticky", top:0, zIndex:100, boxShadow:"0 4px 20px rgba(0,0,0,.5)" }}>
    {/* Logo */}
    <div className="flicker" style={{ lineHeight:1 }}>
      <div style={{ fontFamily:"var(--font-display)", fontSize:20, color:"#CC2222", textShadow:"0 0 12px #CC222277" }}>☠ MURDER TOYS</div>
      <div style={{ fontFamily:"var(--font-mono)", fontSize:8, color:"#6a5a4a", letterSpacing:2 }}>DARE PLATFORM</div>
    </div>

    {/* Desktop nav links — hidden on mobile (bottom tab bar used instead) */}
    <div style={{ display:"flex", gap:8, alignItems:"center" }}>
      <div style={{ display:"none", gap:8, alignItems:"center" }} className="desktop-nav">
        {!adminMode && <>
          <NavBtn active={view==="home"}        onClick={()=>setView("home")}        color="#FF2D9B">DARES</NavBtn>
          <NavBtn active={view==="leaderboard"} onClick={()=>setView("leaderboard")} color="#F5E642">RANKINGS</NavBtn>
        </>}
        {adminMode && <>
          <NavBtn active={view==="admin"}       onClick={()=>setView("admin")}       color="#FF2D9B">SUBMISSIONS</NavBtn>
          <NavBtn active={view==="admin-chars"} onClick={()=>setView("admin-chars")} color="#00E5FF">CHARACTERS</NavBtn>
        </>}
      </div>
      <button onClick={()=>{ setAdminMode(!adminMode); setView(adminMode?"home":"admin"); }}
        style={{ padding:"8px 14px", background:adminMode?"#1a0010":"#1e1710", color:adminMode?"#FF2D9B":"#6a5a4a", border:`1px solid ${adminMode?"#FF2D9B55":"#3a2e22"}`, fontFamily:"var(--font-mono)", fontSize:10, letterSpacing:1, borderRadius:20, minHeight:36, boxShadow:adminMode?"0 0 10px #FF2D9B33":"none" }}>
        {adminMode ? "◀ EXIT" : "ADMIN"}
      </button>
    </div>
  </nav>
);

const NavBtn = ({ children, active, onClick, color }) => (
  <button onClick={onClick}
    style={{ padding:"8px 16px", background:active?`${color}22`:"transparent", color:active?color:"#6a5a4a", border:`1px solid ${active?color+"77":"#3a2e22"}`, fontFamily:"var(--font-fun)", fontSize:15, letterSpacing:1, borderRadius:20, minHeight:38 }}>
    {children}
  </button>
);

// ─── BOTTOM TAB BAR (mobile only) ────────────────────────────────────────────
const BottomTabs = ({ view, setView, adminMode }) => {
  const publicTabs = [
    { id:"home",        icon:"☠",  label:"DARES"    },
    { id:"leaderboard", icon:"🏆", label:"RANKINGS" },
  ];
  const adminTabs = [
    { id:"admin",       icon:"📋", label:"SUBS"     },
    { id:"admin-chars", icon:"🎭", label:"CHARS"    },
  ];
  const tabs = adminMode ? adminTabs : publicTabs;

  return (
    <div style={{ position:"fixed", bottom:0, left:0, right:0, zIndex:200, background:"#120e0a", borderTop:"2px solid #3a2e22", display:"flex", height:"var(--tab-h)", boxShadow:"0 -4px 20px rgba(0,0,0,.5)" }}
      className="mobile-tabs">
      <style>{`
        .mobile-tabs { display: flex; }
        @media (min-width: 640px) { .mobile-tabs { display: none !important; } }
      `}</style>
      {tabs.map(tab => {
        const active = view === tab.id;
        return (
          <button key={tab.id} onClick={()=>setView(tab.id)}
            style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:2, background:"none", border:"none", color:active?"#FF2D9B":"#4a3e32", transition:"color .2s" }}>
            <span style={{ fontSize:20, filter:active?"drop-shadow(0 0 6px #FF2D9B)":"none" }}>{tab.icon}</span>
            <span style={{ fontFamily:"var(--font-mono)", fontSize:9, letterSpacing:1 }}>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
const HomePage = ({ setView, setSelectedChar }) => {
  const sorted = [...CHARACTERS].sort((a,b) => b.score - a.score);
  return (
    <div className="page">
      {/* Hero */}
      <div style={{ textAlign:"center", marginBottom:32 }}>
        <div style={{ display:"flex", justifyContent:"center", gap:8, marginBottom:16, flexWrap:"wrap" }}>
          <NeonSign text="NO REFUNDS" color="#FF2D9B" />
          <NeonSign text="LOST PARTS" color="#00E5FF" />
          <NeonSign text="OPEN LATE"  color="#F5E642" />
        </div>
        <h1 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(38px,10vw,80px)", lineHeight:.9, marginBottom:10 }}>
          <span style={{ color:"#CC2222", textShadow:"0 0 30px #CC222255" }}>DO THE DARE.</span><br />
          <span style={{ color:"#F5F0E8", fontSize:"72%" }}>WIN THE BOUNTY.</span>
        </h1>
        <p style={{ fontFamily:"var(--font-mono)", fontSize:11, color:"#6a5a4a", letterSpacing:1.5, marginBottom:20, lineHeight:1.6 }}>
          PICK A CHARACTER · COMPLETE THE DARE<br />POST · SUBMIT · GET PAID
        </p>
        {/* Stat pills */}
        <div style={{ display:"flex", justifyContent:"center", gap:10, flexWrap:"wrap" }}>
          {[["8","DARES","#FF2D9B"],["$5,550","BOUNTY","#F5E642"],["183","ENTRIES","#00E5FF"]].map(([v,l,c])=>(
            <div key={l} style={{ background:"#221c16", border:`1px solid ${c}33`, borderRadius:10, padding:"10px 18px", textAlign:"center" }}>
              <div style={{ fontFamily:"var(--font-display)", fontSize:24, color:c, textShadow:`0 0 10px ${c}66` }}>{v}</div>
              <div style={{ fontFamily:"var(--font-mono)", fontSize:9, color:"#6a5a4a", letterSpacing:1 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Character grid */}
      <div className="char-grid">
        {sorted.map((char,i) => (
          <CharCard key={char.id} char={char} rank={i+1} onClick={()=>{ setSelectedChar(char); setView("dare"); }} />
        ))}
      </div>
    </div>
  );
};

const CharCard = ({ char, rank, onClick }) => {
  const [pressed, setPressed] = useState(false);
  return (
    <div onClick={onClick}
      onTouchStart={()=>setPressed(true)} onTouchEnd={()=>setPressed(false)}
      onMouseEnter={()=>setPressed(true)}  onMouseLeave={()=>setPressed(false)}
      style={{ background:`linear-gradient(145deg,${char.bgTint},#1a1410)`, border:`1px solid ${pressed?char.neon+"88":"#3a2e22"}`, borderRadius:16, padding:"18px 16px", cursor:"pointer", transition:"all .2s", transform:pressed?"scale(0.98)":"scale(1)", boxShadow:pressed?`0 8px 32px ${char.neon}33`:"0 2px 8px rgba(0,0,0,.4)", position:"relative" }}>

      {/* Status + rank row */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
        {char.status==="open"
          ? <NeonSign text="OPEN" color={char.neon} />
          : <span style={{ fontFamily:"var(--font-mono)", fontSize:9, color:"#4a3e32", border:"1px solid #3a2e22", padding:"2px 8px", borderRadius:4 }}>CLOSED</span>}
        <span style={{ fontFamily:"var(--font-mono)", fontSize:10, color:rank<=3?"#F5E642":"#4a3e32", textShadow:rank<=3?"0 0 8px #F5E64288":"none" }}>#{rank}</span>
      </div>

      {/* Emoji + name */}
      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:12 }}>
        <div style={{ fontSize:40, filter:pressed?`drop-shadow(0 0 10px ${char.neon})`:"none", transition:"filter .2s", flexShrink:0 }}>
          {char.emoji}
        </div>
        <div>
          <div style={{ fontFamily:"var(--font-display)", fontSize:18, color:char.neon, letterSpacing:1, lineHeight:1.1 }}>{char.name}</div>
          <div style={{ fontFamily:"var(--font-body)", fontSize:12, color:"#9a8e7e", fontWeight:600, lineHeight:1.3 }}>{char.dareTitle}</div>
        </div>
      </div>

      {/* Bounty + entries */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
        <div>
          <div style={{ fontFamily:"var(--font-mono)", fontSize:8, color:"#6a5a4a" }}>BOUNTY</div>
          <div style={{ fontFamily:"var(--font-display)", fontSize:20, color:"#F5E642", textShadow:"0 0 8px #F5E64255" }}>${char.bounty}</div>
        </div>
        <div style={{ textAlign:"right" }}>
          <div style={{ fontFamily:"var(--font-mono)", fontSize:8, color:"#6a5a4a" }}>ENTRIES</div>
          <div style={{ fontFamily:"var(--font-display)", fontSize:18, color:"#9a8e7e" }}>{char.submissions}</div>
        </div>
      </div>

      <MurderMeter score={char.score} neon={char.neon} />

      <div style={{ marginTop:12, borderTop:"1px solid #3a2e22", paddingTop:10, textAlign:"right" }}>
        <span style={{ fontFamily:"var(--font-fun)", fontSize:13, color:char.neon }}>SEE THE DARE →</span>
      </div>
    </div>
  );
};

// ─── DARE PAGE ────────────────────────────────────────────────────────────────
const DarePage = ({ char, setView }) => {
  if (!char) return null;
  return (
    <div className="page slide-up">
      <BackBtn onClick={()=>setView("home")} label="← All Dares" />

      {/* Hero card */}
      <div style={{ background:`linear-gradient(135deg,${char.bgTint},#1a1410)`, border:`1px solid ${char.neon}44`, borderRadius:18, padding:"24px 20px", marginBottom:16, position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:-10, right:-10, fontSize:90, opacity:.07, transform:"rotate(-8deg)", pointerEvents:"none" }}>{char.emoji}</div>

        <div style={{ display:"flex", gap:10, alignItems:"center", marginBottom:12, flexWrap:"wrap" }}>
          {char.status==="open" ? <NeonSign text="DARE OPEN" color={char.neon} /> : <NeonSign text="DARE CLOSED" color="#6a5a4a" />}
          <span style={{ fontFamily:"var(--font-mono)", fontSize:10, color:"#4a3e32" }}>ENDS {char.endDate}</span>
        </div>

        <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:12 }}>
          <div style={{ fontSize:52, flexShrink:0 }}>{char.emoji}</div>
          <div>
            <div style={{ fontFamily:"var(--font-display)", fontSize:"clamp(26px,6vw,44px)", color:char.neon, textShadow:`0 0 20px ${char.neon}55`, lineHeight:.95 }}>{char.name}</div>
            <div style={{ fontFamily:"var(--font-display)", fontSize:16, color:"#F5F0E8", marginTop:4 }}>{char.dareTitle}</div>
          </div>
        </div>

        <div style={{ display:"flex", gap:12 }}>
          <div style={{ background:"#00000033", borderRadius:10, padding:"10px 16px", flex:1 }}>
            <div style={{ fontFamily:"var(--font-mono)", fontSize:9, color:"#6a5a4a", marginBottom:2 }}>BOUNTY PRIZE</div>
            <div style={{ fontFamily:"var(--font-display)", fontSize:28, color:"#F5E642", textShadow:"0 0 10px #F5E64255" }}>${char.bounty}</div>
          </div>
          <div style={{ background:"#00000033", borderRadius:10, padding:"10px 16px", flex:1 }}>
            <div style={{ fontFamily:"var(--font-mono)", fontSize:9, color:"#6a5a4a", marginBottom:2 }}>SUBMISSIONS</div>
            <div style={{ fontFamily:"var(--font-display)", fontSize:28, color:"#9a8e7e" }}>{char.submissions}</div>
          </div>
        </div>
      </div>

      <Panel title="THE DARE" icon="🎯">
        <p style={{ fontSize:16, lineHeight:1.65, color:"#c8b8a8" }}>{char.dareDesc}</p>
      </Panel>

      <Panel title="POSTING REQUIREMENTS" icon="📋">
        {["Post on Instagram","Post on TikTok","Post on Facebook","Tag @MurderToys on all posts","Include official 5-second branded end-tag video",`Use: ${char.tags.join(", ")}`].map((r,i)=>(
          <div key={i} style={{ display:"flex", gap:10, alignItems:"flex-start", marginBottom:10 }}>
            <span style={{ color:"#CC2222", fontSize:14, marginTop:2, flexShrink:0 }}>●</span>
            <span style={{ fontSize:15, color:"#b0a090", lineHeight:1.5 }}>{r}</span>
          </div>
        ))}
      </Panel>

      <Panel title="BRANDED ASSET" icon="🎬">
        <div style={{ background:"#1a1410", border:"1px dashed #4a3e32", borderRadius:12, padding:"16px" }}>
          <div style={{ fontFamily:"var(--font-mono)", fontSize:12, color:"#F5F0E8", marginBottom:4 }}>murder-toys-endtag-v1.mp4</div>
          <div style={{ fontFamily:"var(--font-mono)", fontSize:10, color:"#6a5a4a", marginBottom:14 }}>5 seconds · Required for all submissions</div>
          <button style={{ width:"100%", background:char.neon, color:"#1a1410", border:"none", padding:"13px", fontFamily:"var(--font-display)", fontSize:17, letterSpacing:1, borderRadius:12, boxShadow:`0 0 16px ${char.neon}55`, minHeight:48 }}>
            ↓ DOWNLOAD BRANDED VIDEO
          </button>
        </div>
      </Panel>

      {char.status==="open" && (
        <button onClick={()=>setView("submit")}
          style={{ width:"100%", padding:"18px", background:"#CC2222", color:"#fff", border:"none", fontFamily:"var(--font-display)", fontSize:20, letterSpacing:2, borderRadius:16, boxShadow:"0 0 24px #CC222255", cursor:"pointer", minHeight:56 }}>
          SUBMIT YOUR DARE ENTRY →
        </button>
      )}
    </div>
  );
};

const Panel = ({ title, icon, children }) => (
  <div style={{ background:"#221c16", border:"1px solid #3a2e22", borderRadius:14, padding:"18px 16px", marginBottom:12 }}>
    <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:14 }}>
      <span style={{ fontSize:15 }}>{icon}</span>
      <span style={{ fontFamily:"var(--font-fun)", fontSize:13, color:"#6a5a4a", letterSpacing:2 }}>{title}</span>
    </div>
    {children}
  </div>
);

// ─── SUBMISSION FORM ──────────────────────────────────────────────────────────
const SubmitPage = ({ char, setView }) => {
  const [form, setForm] = useState({
    name:"", email:"", phone:"", displayName:"", instagram:"", tiktok:"",
    facebook:"", handles:"", notes:"",
    terms:false, liability:false, noPurchase:false, postingReqs:false, repost:false
  });
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);

  const set = (k, v) => {
    setForm(p=>({...p,[k]:v}));
    setErrors(p=>{ const n={...p}; delete n[k]; return n; });
  };

  const validate = () => {
    const e = {};
    if (!form.name)    e.name    = "Required";
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email needed";
    if (!form.phone)   e.phone   = "Required";
    if (!form.displayName) e.displayName = "Required";
    if (!form.instagram || !form.instagram.includes("instagram.com")) e.instagram = "Must be an instagram.com URL";
    if (!form.tiktok    || !form.tiktok.includes("tiktok.com"))       e.tiktok    = "Must be a tiktok.com URL";
    if (!form.facebook  || !form.facebook.includes("facebook.com"))   e.facebook  = "Must be a facebook.com URL";
    if (!form.terms)       e.terms       = "Required";
    if (!form.liability)   e.liability   = "Required";
    if (!form.noPurchase)  e.noPurchase  = "Required";
    if (!form.postingReqs) e.postingReqs = "Required";
    if (!form.repost)      e.repost      = "Required";
    return e;
  };

  if (done) return (
    <div style={{ maxWidth:480, margin:"60px auto", padding:"0 16px", textAlign:"center" }} className="slide-up">
      <div className="float" style={{ fontSize:64, marginBottom:12 }}>🏆</div>
      <div style={{ fontFamily:"var(--font-display)", fontSize:40, color:"#F5E642", textShadow:"0 0 20px #F5E64255", marginBottom:8 }}>ENTRY RECEIVED!</div>
      <p style={{ fontSize:15, color:"#9a8e7e", marginBottom:28, lineHeight:1.6 }}>
        Your dare is under review.<br />
        We'll hit you at <strong style={{ color:"#F5F0E8" }}>{form.email}</strong> if you're selected.
      </p>
      <NeonSign text="WATCH THIS SPACE" color="#FF2D9B" size={12} style={{ marginBottom:24 }} />
      <button onClick={()=>setView("home")}
        style={{ width:"100%", background:"#CC2222", color:"#fff", border:"none", padding:"16px", fontFamily:"var(--font-display)", fontSize:18, letterSpacing:2, borderRadius:16, marginTop:16, minHeight:52 }}>
        BACK TO DARES
      </button>
    </div>
  );

  return (
    <div className="page slide-up" style={{ maxWidth:600 }}>
      <BackBtn onClick={()=>setView("dare")} />

      <div style={{ background:`linear-gradient(135deg,${char?.bgTint||"#1a0a0a"},#1a1410)`, border:`1px solid ${char?.neon||"#CC2222"}44`, borderRadius:16, padding:"20px 16px", marginBottom:20 }}>
        <div style={{ fontFamily:"var(--font-display)", fontSize:28, color:char?.neon||"#CC2222", textShadow:`0 0 14px ${char?.neon||"#CC2222"}77`, marginBottom:4 }}>SUBMIT ENTRY</div>
        <div style={{ fontFamily:"var(--font-mono)", fontSize:11, color:"#6a5a4a" }}>{char?.name} · {char?.dareTitle}</div>
      </div>

      <FS title="YOUR INFO" icon="👤">
        <FR label="Full Name *"          error={errors.name}>        <input value={form.name}        onChange={e=>set("name",e.target.value)}        placeholder="Your legal name" autoComplete="name" /></FR>
        <FR label="Email *"              error={errors.email}>       <input type="email" value={form.email} onChange={e=>set("email",e.target.value)} placeholder="email@example.com" autoComplete="email" inputMode="email" /></FR>
        <FR label="Phone *"              error={errors.phone}>       <input type="tel" value={form.phone}   onChange={e=>set("phone",e.target.value)} placeholder="+1 (555) 000-0000" autoComplete="tel" inputMode="tel" /></FR>
        <FR label="Display Name *"       error={errors.displayName}> <input value={form.displayName}  onChange={e=>set("displayName",e.target.value)} placeholder="Public leaderboard name" /></FR>
        <FR label="Social Handles (optional)">                       <input value={form.handles}      onChange={e=>set("handles",e.target.value)}     placeholder="@yourhandle on IG / TT / FB" /></FR>
      </FS>

      <FS title="SOCIAL LINKS" icon="📱">
        <div style={{ background:"#1a1410", border:"1px solid #3a2e22", borderRadius:10, padding:14, marginBottom:14, fontFamily:"var(--font-mono)", fontSize:11, color:"#6a5a4a", lineHeight:1.8 }}>
          ⚠ Posts must include @MurderToys tag + official end-tag video before submitting.
        </div>
        <FR label="Instagram Post URL *" error={errors.instagram}><input value={form.instagram} onChange={e=>set("instagram",e.target.value)} placeholder="https://instagram.com/p/..." inputMode="url" autoCapitalize="none" /></FR>
        <FR label="TikTok Post URL *"    error={errors.tiktok}>   <input value={form.tiktok}    onChange={e=>set("tiktok",e.target.value)}    placeholder="https://tiktok.com/@you/video/..." inputMode="url" autoCapitalize="none" /></FR>
        <FR label="Facebook Post URL *"  error={errors.facebook}>  <input value={form.facebook}  onChange={e=>set("facebook",e.target.value)}  placeholder="https://facebook.com/posts/..." inputMode="url" autoCapitalize="none" /></FR>
        <FR label="Notes (optional)">   <textarea value={form.notes} onChange={e=>set("notes",e.target.value)} rows={3} placeholder="Anything you want us to know..." /></FR>
      </FS>

      <FS title="LEGAL AGREEMENTS" icon="📄">
        {[
          ["terms",       "I accept the Murder Toys Terms & Conditions"],
          ["liability",   "I accept the Liability Waiver and Release of Claims"],
          ["noPurchase",  "I acknowledge no purchase is necessary to enter or win"],
          ["postingReqs", "I confirm I have met all posting requirements (tags + end-tag video)"],
          ["repost",      "I grant Murder Toys permission to repost my content for promotional use"],
        ].map(([k, label]) => (
          <div key={k} className="checkbox-row">
            <input type="checkbox" id={k} checked={form[k]} onChange={e=>set(k,e.target.checked)} />
            <label htmlFor={k} style={{ fontSize:14, color:errors[k]?"#FF4444":"#b0a090", lineHeight:1.5, cursor:"pointer" }}>{label}</label>
          </div>
        ))}
      </FS>

      {Object.keys(errors).length > 0 && (
        <div style={{ background:"#1a0808", border:"1px solid #CC222266", borderRadius:10, padding:14, marginBottom:14, fontFamily:"var(--font-mono)", fontSize:12, color:"#FF6666" }}>
          ⚠ Fix {Object.keys(errors).length} error{Object.keys(errors).length > 1 ? "s" : ""} above before submitting.
        </div>
      )}

      <button
        onClick={()=>{ const e=validate(); if(Object.keys(e).length>0){setErrors(e);return;} setDone(true); }}
        style={{ width:"100%", padding:"18px", background:"#CC2222", color:"#fff", border:"none", fontFamily:"var(--font-display)", fontSize:20, letterSpacing:2, borderRadius:16, boxShadow:"0 0 20px #CC222244", cursor:"pointer", minHeight:56 }}>
        SUBMIT DARE ENTRY →
      </button>
    </div>
  );
};

const FS = ({ title, icon, children }) => (
  <div style={{ background:"#221c16", border:"1px solid #3a2e22", borderRadius:14, padding:"18px 16px", marginBottom:12 }}>
    <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:16 }}>
      <span>{icon}</span>
      <span style={{ fontFamily:"var(--font-fun)", fontSize:14, color:"#6a5a4a", letterSpacing:2 }}>{title}</span>
    </div>
    {children}
  </div>
);

const FR = ({ label, error, children }) => (
  <div style={{ marginBottom:14 }}>
    <label style={{ display:"block", fontFamily:"var(--font-mono)", fontSize:10, color:error?"#FF6666":"#6a5a4a", letterSpacing:1, marginBottom:6 }}>{label}</label>
    {children}
    {error && <div style={{ fontFamily:"var(--font-mono)", fontSize:11, color:"#FF6666", marginTop:5 }}>↑ {error}</div>}
  </div>
);

// ─── LEADERBOARD ──────────────────────────────────────────────────────────────
const LeaderboardPage = () => {
  const people = [
    { rank:1, name:"SaraScreams",   entries:3, wins:1, char:"BLOODY MARY",    neon:"#FF2D9B" },
    { rank:2, name:"MarcusThrills", entries:2, wins:1, char:"DR. STITCH",      neon:"#39FF14" },
    { rank:3, name:"DevonDanger",   entries:2, wins:0, char:"TOXIC TED",       neon:"#39FF14" },
    { rank:4, name:"JakeMo_Dares",  entries:2, wins:0, char:"BLOODY MARY",    neon:"#FF2D9B" },
    { rank:5, name:"PriyaFast",     entries:1, wins:0, char:"CHAINSAW CATHY", neon:"#FF2D9B" },
  ];
  return (
    <div className="page">
      <div style={{ textAlign:"center", marginBottom:28 }}>
        <div style={{ display:"flex", justifyContent:"center", marginBottom:12 }}>
          <NeonSign text="KILL LEADERBOARD" color="#F5E642" size={12} />
        </div>
        <div style={{ fontFamily:"var(--font-display)", fontSize:"clamp(32px,8vw,56px)", color:"#F5E642", textShadow:"0 0 20px #F5E64277", lineHeight:.9, marginBottom:6 }}>
          TOP DARE<br />PARTICIPANTS
        </div>
        <div style={{ fontFamily:"var(--font-mono)", fontSize:10, color:"#4a3e32", letterSpacing:2 }}>ALL CHARACTERS · ALL TIME</div>
      </div>
      {people.map(p=>(
        <div key={p.rank} style={{ background:p.rank===1?"linear-gradient(90deg,#1a1500,#1e1814)":"#1e1814", border:`1px solid ${p.rank===1?"#F5E64266":"#3a2e22"}`, borderRadius:14, padding:"14px 16px", marginBottom:10, display:"flex", alignItems:"center", gap:14 }}>
          <div style={{ fontSize:28, minWidth:36, textAlign:"center" }}>
            {p.rank<=3 ? ["🥇","🥈","🥉"][p.rank-1] : <span style={{ fontFamily:"var(--font-display)", color:"#3a2e22", fontSize:20 }}>#{p.rank}</span>}
          </div>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontFamily:"var(--font-display)", fontSize:20, color:p.rank===1?"#F5E642":"#F5F0E8", textShadow:p.rank===1?"0 0 10px #F5E64255":"none", letterSpacing:1, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{p.name}</div>
            <div style={{ fontFamily:"var(--font-fun)", fontSize:12, color:p.neon }}>{p.char}</div>
          </div>
          <div style={{ textAlign:"right", flexShrink:0 }}>
            <div style={{ fontFamily:"var(--font-mono)", fontSize:11, color:"#6a5a4a" }}>{p.entries} entries</div>
            {p.wins>0 && <div style={{ fontFamily:"var(--font-mono)", fontSize:11, color:"#F5E642" }}>🏆 {p.wins} win</div>}
          </div>
        </div>
      ))}
    </div>
  );
};

// ─── ADMIN DASHBOARD ──────────────────────────────────────────────────────────
const AdminDashboard = ({ setView, setSelectedSub }) => {
  const [fs, setFs]         = useState("all");
  const [search, setSearch] = useState("");

  const filtered = MOCK_SUBS.filter(s => {
    if (fs !== "all" && s.status !== fs) return false;
    if (search && !s.name.toLowerCase().includes(search.toLowerCase()) && !s.email.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="page">
      <div style={{ marginBottom:20 }}>
        <div style={{ fontFamily:"var(--font-display)", fontSize:28, color:"#CC2222", textShadow:"0 0 14px #CC222255", letterSpacing:2 }}>ADMIN</div>
        <div style={{ fontFamily:"var(--font-mono)", fontSize:10, color:"#4a3e32" }}>MURDER TOYS · DARE PLATFORM · V1</div>
      </div>

      {/* Status filter strip — horizontally scrollable on mobile */}
      <div className="stats-strip" style={{ marginBottom:16 }}>
        {[["all","ALL",MOCK_SUBS.length,"#9a8e7e"], ...Object.entries(STATUS_CFG).map(([k,cfg])=>[k,cfg.label.replace(" 🏆","").replace(" ✓",""),MOCK_SUBS.filter(s=>s.status===k).length,cfg.color])].map(([k,label,count,color])=>{
          const active = fs===k;
          return (
            <button key={k} onClick={()=>setFs(active&&k!=="all"?"all":k)}
              style={{ flexShrink:0, background:active?`${color}22`:"#1e1814", border:`1px solid ${active?color+"88":"#3a2e22"}`, borderRadius:10, padding:"8px 14px", cursor:"pointer", transition:"all .2s", boxShadow:active?`0 0 12px ${color}33`:"none", display:"flex", flexDirection:"column", alignItems:"center", gap:2, minWidth:70 }}>
              <div style={{ fontFamily:"var(--font-display)", fontSize:20, color, textShadow:active?`0 0 10px ${color}88`:"none" }}>{count}</div>
              <div style={{ fontFamily:"var(--font-mono)", fontSize:8, color:active?color:"#4a3e32", letterSpacing:.5, textAlign:"center", lineHeight:1.3 }}>{label.toUpperCase()}</div>
            </button>
          );
        })}
      </div>

      {/* Search */}
      <div style={{ marginBottom:16 }}>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by name or email…" />
      </div>
      <div style={{ fontFamily:"var(--font-mono)", fontSize:11, color:"#4a3e32", marginBottom:12 }}>
        {filtered.length} result{filtered.length!==1?"s":""}
      </div>

      {/* Mobile card list */}
      <div className="admin-cards">
        {filtered.map(sub => {
          const char = CHARACTERS.find(c=>c.id===sub.charId);
          return (
            <div key={sub.id} onClick={()=>{ setSelectedSub(sub); setView("admin-review"); }}
              style={{ background:"#1e1814", border:"1px solid #3a2e22", borderRadius:14, padding:"14px 16px", cursor:"pointer", display:"flex", gap:12, alignItems:"flex-start" }}>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:6, gap:8 }}>
                  <div>
                    <div style={{ fontFamily:"var(--font-body)", fontSize:15, fontWeight:700 }}>{sub.name}</div>
                    <div style={{ fontFamily:"var(--font-fun)", fontSize:12, color:char?.neon }}>{char?.name}</div>
                  </div>
                  <div style={{ display:"flex", gap:6, flexShrink:0, flexDirection:"column", alignItems:"flex-end" }}>
                    <StatusBadge status={sub.status} />
                    {sub.duplicate && <span style={{ background:"#1a0404", color:"#FF6666", border:"1px solid #FF666644", borderRadius:20, padding:"2px 8px", fontFamily:"var(--font-mono)", fontSize:10 }}>⚠ DUP</span>}
                  </div>
                </div>
                <div style={{ fontFamily:"var(--font-mono)", fontSize:10, color:"#6a5a4a" }}>{sub.email} · {sub.submittedAt}</div>
              </div>
              <div style={{ fontFamily:"var(--font-mono)", fontSize:12, color:"#4a3e32", flexShrink:0, marginTop:2 }}>›</div>
            </div>
          );
        })}
        {filtered.length===0 && <div style={{ textAlign:"center", padding:32, fontFamily:"var(--font-mono)", fontSize:12, color:"#4a3e32" }}>No results.</div>}
      </div>

      {/* Desktop table */}
      <div style={{ background:"#1e1814", border:"1px solid #3a2e22", borderRadius:14, overflow:"hidden" }}>
        <table className="admin-table">
          <thead>
            <tr style={{ borderBottom:"1px solid #3a2e22", background:"#221c16" }}>
              {["#","CHARACTER","PARTICIPANT","SUBMITTED","STATUS","FLAGS",""].map(h=>(
                <th key={h} style={{ fontFamily:"var(--font-mono)", fontSize:10, color:"#4a3e32", letterSpacing:1, padding:"12px 14px", textAlign:"left" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(sub => {
              const char = CHARACTERS.find(c=>c.id===sub.charId);
              return (
                <tr key={sub.id} style={{ borderBottom:"1px solid #2a2018", cursor:"pointer", transition:"background .15s" }}
                  onMouseEnter={e=>e.currentTarget.style.background="#28201a"}
                  onMouseLeave={e=>e.currentTarget.style.background="transparent"}
                  onClick={()=>{ setSelectedSub(sub); setView("admin-review"); }}>
                  <td style={{ padding:"12px 14px", fontFamily:"var(--font-mono)", fontSize:11, color:"#4a3e32" }}>#{sub.id}</td>
                  <td style={{ padding:"12px 14px" }}><span style={{ fontFamily:"var(--font-fun)", fontSize:14, color:char?.neon }}>{char?.name}</span></td>
                  <td style={{ padding:"12px 14px" }}>
                    <div style={{ fontSize:14, fontWeight:700 }}>{sub.name}</div>
                    <div style={{ fontFamily:"var(--font-mono)", fontSize:10, color:"#6a5a4a" }}>{sub.email}</div>
                  </td>
                  <td style={{ padding:"12px 14px", fontFamily:"var(--font-mono)", fontSize:10, color:"#6a5a4a" }}>{sub.submittedAt}</td>
                  <td style={{ padding:"12px 14px" }}><StatusBadge status={sub.status} /></td>
                  <td style={{ padding:"12px 14px" }}>{sub.duplicate&&<span style={{ background:"#1a0404", color:"#FF6666", border:"1px solid #FF666644", borderRadius:20, padding:"2px 8px", fontFamily:"var(--font-mono)", fontSize:10 }}>⚠ DUP</span>}</td>
                  <td style={{ padding:"12px 14px", fontFamily:"var(--font-fun)", fontSize:13, color:"#6a5a4a" }}>REVIEW →</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ─── ADMIN REVIEW ─────────────────────────────────────────────────────────────
const AdminReview = ({ sub, setView }) => {
  const [status, setStatus] = useState(sub?.status||"pending_review");
  const [notes,  setNotes]  = useState(sub?.notes||"");
  const [saved,  setSaved]  = useState(false);
  const char = CHARACTERS.find(c=>c.id===sub?.charId);
  if (!sub) return null;

  return (
    <div className="page slide-up">
      <BackBtn onClick={()=>setView("admin")} label="← Submissions" />

      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20, gap:12, flexWrap:"wrap" }}>
        <div>
          <div style={{ fontFamily:"var(--font-display)", fontSize:24, color:"#CC2222", textShadow:"0 0 14px #CC222255", letterSpacing:2 }}>REVIEW #{sub.id}</div>
          <div style={{ fontFamily:"var(--font-mono)", fontSize:10, color:"#4a3e32" }}>{sub.submittedAt}</div>
        </div>
        {sub.duplicate && (
          <div style={{ background:"#1a0404", border:"1px solid #FF666444", borderRadius:10, padding:"10px 14px" }}>
            <div style={{ fontFamily:"var(--font-fun)", fontSize:14, color:"#FF6666" }}>⚠ DUPLICATE</div>
            <div style={{ fontFamily:"var(--font-mono)", fontSize:9, color:"#6a5a4a" }}>Same email + phone</div>
          </div>
        )}
      </div>

      <div className="review-grid" style={{ marginBottom:12 }}>
        <RC title="PARTICIPANT" icon="👤">
          {[["Name",sub.name],["Email",sub.email],["Phone",sub.phone],["Display Name",sub.displayName]].map(([l,v])=><RF key={l} label={l} value={v} />)}
        </RC>
        <RC title="CHARACTER" icon="🎭">
          <RF label="Character" value={<span style={{ color:char?.neon, fontWeight:700 }}>{char?.name}</span>} />
          <RF label="Dare"      value={char?.dareTitle} />
          <RF label="Bounty"    value={<span style={{ color:"#F5E642" }}>${char?.bounty}</span>} />
        </RC>
      </div>

      <RC title="SOCIAL LINKS" icon="📱" style={{ marginBottom:12 }}>
        {[["Instagram",sub.instagram],["TikTok",sub.tiktok],["Facebook",sub.facebook]].map(([p,url])=>(
          <div key={p} style={{ padding:"10px 12px", background:"#1a1410", borderRadius:10, marginBottom:8, border:"1px solid #2a2018" }}>
            <div style={{ fontFamily:"var(--font-mono)", fontSize:9, color:"#4a3e32", marginBottom:4 }}>{p.toUpperCase()}</div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", gap:10 }}>
              <div style={{ fontSize:12, color:"#b0a090", wordBreak:"break-all", flex:1 }}>{url}</div>
              <a href={url} target="_blank" rel="noreferrer"
                style={{ background:"#2a2018", border:"1px solid #3a2e22", color:"#9a8e7e", padding:"8px 12px", fontFamily:"var(--font-mono)", fontSize:10, borderRadius:20, whiteSpace:"nowrap", flexShrink:0, minHeight:36, display:"flex", alignItems:"center" }}>
                OPEN ↗
              </a>
            </div>
          </div>
        ))}
      </RC>

      <div style={{ background:"#221c16", border:"1px solid #3a2e22", borderRadius:14, padding:"18px 16px" }}>
        <div style={{ fontFamily:"var(--font-fun)", fontSize:15, color:"#6a5a4a", letterSpacing:2, marginBottom:14 }}>ADMIN ACTIONS</div>

        {/* Status buttons — wrap on mobile */}
        <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:16 }}>
          {Object.entries(STATUS_CFG).map(([k,cfg])=>(
            <button key={k} onClick={()=>setStatus(k)}
              style={{ padding:"8px 12px", background:status===k?cfg.bg:"transparent", color:status===k?cfg.color:"#4a3e32", border:`1px solid ${status===k?cfg.color+"77":"#3a2e22"}`, fontFamily:"var(--font-mono)", fontSize:10, borderRadius:20, cursor:"pointer", transition:"all .2s", minHeight:38 }}>
              {cfg.label}
            </button>
          ))}
        </div>

        <div style={{ marginBottom:14 }}>
          <label style={{ fontFamily:"var(--font-mono)", fontSize:10, color:"#4a3e32", letterSpacing:1, display:"block", marginBottom:6 }}>ADMIN NOTES</label>
          <textarea value={notes} onChange={e=>setNotes(e.target.value)} rows={3} placeholder="Internal notes…" />
        </div>

        <button onClick={()=>{ setSaved(true); setTimeout(()=>setSaved(false),2500); }}
          style={{ width:"100%", background:saved?"#1a4a1a":"#CC2222", color:"#fff", border:"none", padding:"15px", fontFamily:"var(--font-display)", fontSize:18, letterSpacing:2, borderRadius:12, cursor:"pointer", transition:"background .3s", minHeight:50, boxShadow:saved?"0 0 14px #39FF1444":"0 0 14px #CC222244" }}>
          {saved ? "✓ SAVED!" : "SAVE CHANGES"}
        </button>
      </div>
    </div>
  );
};

const RC = ({ title, icon, children, style={} }) => (
  <div style={{ background:"#1e1814", border:"1px solid #3a2e22", borderRadius:14, padding:"16px", ...style }}>
    <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:12 }}>
      <span>{icon}</span>
      <span style={{ fontFamily:"var(--font-fun)", fontSize:13, color:"#4a3e32", letterSpacing:2 }}>{title}</span>
    </div>
    {children}
  </div>
);

const RF = ({ label, value }) => (
  <div style={{ marginBottom:10 }}>
    <div style={{ fontFamily:"var(--font-mono)", fontSize:9, color:"#4a3e32", letterSpacing:1, marginBottom:2 }}>{label}</div>
    <div style={{ fontSize:14, color:"#c8b8a8", fontWeight:600 }}>{value || <span style={{ color:"#3a2e22" }}>—</span>}</div>
  </div>
);

// ─── ADMIN CHARS ──────────────────────────────────────────────────────────────
const AdminCharsPage = () => (
  <div className="page">
    <div style={{ fontFamily:"var(--font-display)", fontSize:28, color:"#CC2222", textShadow:"0 0 14px #CC222255", letterSpacing:2, marginBottom:4 }}>CHARACTERS</div>
    <div style={{ fontFamily:"var(--font-mono)", fontSize:10, color:"#4a3e32", marginBottom:20 }}>MURDER METER · STATUS · RANKINGS</div>
    {[...CHARACTERS].sort((a,b)=>b.score-a.score).map((c,i)=>(
      <div key={c.id} style={{ background:`linear-gradient(90deg,${c.bgTint},#1e1814)`, border:`1px solid ${i<3?c.neon+"44":"#3a2e22"}`, borderRadius:14, padding:"14px 16px", marginBottom:10, boxShadow:i<3?`0 0 16px ${c.neon}22`:"none" }}>
        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:10 }}>
          <div style={{ fontFamily:"var(--font-display)", fontSize:18, color:i<3?"#F5E642":"#3a2e22", minWidth:28 }}>#{i+1}</div>
          <div style={{ fontSize:26 }}>{c.emoji}</div>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontFamily:"var(--font-display)", fontSize:16, color:c.neon, letterSpacing:1 }}>{c.name}</div>
            <div style={{ fontFamily:"var(--font-body)", fontSize:11, color:"#6a5a4a", fontWeight:600, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{c.dareTitle}</div>
          </div>
          <div style={{ display:"flex", gap:8, alignItems:"center", flexShrink:0 }}>
            <span style={{ fontFamily:"var(--font-display)", fontSize:18, color:"#F5E642" }}>${c.bounty}</span>
            {c.status==="open" ? <NeonSign text="OPEN" color={c.neon} /> : <span style={{ fontFamily:"var(--font-mono)", fontSize:9, color:"#4a3e32", border:"1px solid #3a2e22", padding:"2px 6px", borderRadius:4 }}>CLOSED</span>}
          </div>
        </div>
        <MurderMeter score={c.score} neon={c.neon} />
        <div style={{ fontFamily:"var(--font-mono)", fontSize:9, color:"#4a3e32", marginTop:4 }}>{c.score}/1000 pts · {c.submissions} entries</div>
      </div>
    ))}
  </div>
);

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [view,         setView]         = useState("home");
  const [adminMode,    setAdminMode]    = useState(false);
  const [selectedChar, setSelectedChar] = useState(null);
  const [selectedSub,  setSelectedSub]  = useState(null);

  // Scroll to top on every view change
  useEffect(() => { window.scrollTo({ top:0, behavior:"smooth" }); }, [view]);

  return (
    <>
      <GlobalStyles />
      <div className="grain-overlay" />

      <Nav view={view} setView={setView} adminMode={adminMode} setAdminMode={setAdminMode} />

      <main style={{ minHeight:"calc(100vh - var(--nav-h))" }}>
        {view==="home"         && <HomePage        setView={setView} setSelectedChar={setSelectedChar} />}
        {view==="dare"         && <DarePage        char={selectedChar} setView={setView} />}
        {view==="submit"       && <SubmitPage      char={selectedChar} setView={setView} />}
        {view==="leaderboard"  && <LeaderboardPage />}
        {view==="admin"        && <AdminDashboard  setView={setView} setSelectedSub={setSelectedSub} />}
        {view==="admin-review" && <AdminReview     sub={selectedSub}  setView={setView} />}
        {view==="admin-chars"  && <AdminCharsPage />}
      </main>

      {/* Bottom tab bar — mobile only */}
      <BottomTabs view={view} setView={setView} adminMode={adminMode} />

      <footer style={{ borderTop:"1px solid #2a2018", padding:"20px 16px", textAlign:"center", display:"flex", justifyContent:"center", gap:10, flexWrap:"wrap", alignItems:"center" }}>
        <NeonSign text="NO REFUNDS" color="#FF2D9B" />
        <NeonSign text="LOST PARTS" color="#00E5FF" />
        <NeonSign text="OPEN LATE"  color="#F5E642" />
        <span style={{ fontFamily:"var(--font-mono)", fontSize:9, color:"#3a2e22", letterSpacing:1 }}>☠ MURDER TOYS V1</span>
      </footer>
    </>
  );
}
