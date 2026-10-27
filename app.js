const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const inr = n => "\u20B9" + n.toLocaleString("en-IN");
const kms = n => n.toLocaleString("en-IN") + " km";
const nameOf = c => c.make + " " + c.model;
const store = {
  get(k) { try { return JSON.parse(localStorage.getItem(k)) || []; } catch (e) { return []; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
};
let favs = store.get("autoshine_favs"), cmp = store.get("autoshine_cmp");
const F = { q: "", price: "", fuel: "", trans: "", year: "", sort: "" };
const FALL = "data:image/svg+xml," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><rect width="800" height="600" fill="#26282d"/><text x="400" y="310" fill="#b8923a" font-size="44" text-anchor="middle" font-family="Georgia,serif">AutoShine</text></svg>');
const photo = (c, w) => `https://images.unsplash.com/${c.img}?auto=format&fit=crop&w=${w}&q=70`;
const img = (c, w, style = "") => `<img src="${photo(c, w)}" alt="${c.year} ${nameOf(c)}" loading="lazy" style="${style}" onerror="this.onerror=null;this.src=FALL">`;

const card = c => `<article class="card">
<a href="#/car/${c.id}" aria-label="View ${nameOf(c)}"><figure>${img(c, 640)}</figure></a>
<button class="fav ${favs.includes(c.id) ? "on" : ""}" data-fav="${c.id}" aria-label="Toggle favourite">\u2665</button>
<div class="b"><h3>${nameOf(c)}</h3>
<p class="meta">${c.year}, ${kms(c.km)}, ${c.fuel}, ${c.trans}</p>
<div class="price">${inr(c.price)}</div>
<div class="row"><button class="chip ${cmp.includes(c.id) ? "on" : ""}" data-cmp="${c.id}">${cmp.includes(c.id) ? "Added to compare" : "Compare"}</button>
<a class="chip" href="#/car/${c.id}">View details</a></div></div></article>`;

const opt = (v, t) => `<option value="${v}">${t}</option>`;
function filtered() {
  const toks = F.q.toLowerCase().split(/\s+/).filter(Boolean);
  const [lo, hi] = F.price ? F.price.split("-").map(Number) : [0, Infinity];
  const out = CARS.filter(c => {
    const hay = nameOf(c).toLowerCase();
    return toks.every(t => hay.includes(t)) && c.price >= lo && c.price <= hi &&
      (!F.fuel || c.fuel === F.fuel) && (!F.trans || c.trans === F.trans) && (!F.year || c.year >= +F.year);
  });
  if (F.sort === "pa") out.sort((a, b) => a.price - b.price);
  if (F.sort === "pd") out.sort((a, b) => b.price - a.price);
  if (F.sort === "yd") out.sort((a, b) => b.year - a.year);
  return out;
}
function results() {
  const L = filtered();
  $("#count").textContent = L.length + (L.length === 1 ? " car found" : " cars found");
  $("#results").innerHTML = L.length ? L.map(card).join("") : `<p class="empty">No cars match these filters. Try widening the price range or resetting the filters.</p>`;
}
function home() {
  $("#app").innerHTML = `<section class="hero"><div class="wrap"><h1>Find a car worth driving</h1>
<p>Browse a curated demo collection of used cars, compare your shortlist and save the ones you love.</p>
<button class="btn" id="go">Search cars</button></div></section>
<section><div class="wrap"><h2>Featured cars</h2><p class="sub">Editor's picks from the demo collection</p>
<div class="grid">${CARS.filter(c => c.feat).map(card).join("")}</div></div></section>
<section class="search" id="search"><div class="wrap"><h2>Search the collection</h2><p class="sub">Search by car name or brand, then narrow it down.</p>
<div class="filters">
<input id="f-q" type="search" placeholder="Search by car name or brand" aria-label="Search">
<select id="f-price" aria-label="Price">${opt("", "Any price")}${opt("0-800000", "Under \u20B98 lakh")}${opt("800000-1500000", "\u20B98 to 15 lakh")}${opt("1500000-3000000", "\u20B915 to 30 lakh")}${opt("3000000-100000000", "Above \u20B930 lakh")}</select>
<select id="f-fuel" aria-label="Fuel type">${opt("", "Any fuel")}${opt("Petrol", "Petrol")}${opt("Diesel", "Diesel")}${opt("Electric", "Electric")}</select>
<select id="f-trans" aria-label="Transmission">${opt("", "Any transmission")}${opt("Manual", "Manual")}${opt("Automatic", "Automatic")}</select>
<select id="f-year" aria-label="Manufacturing year">${opt("", "Any year")}${opt("2023", "2023 or newer")}${opt("2022", "2022 or newer")}${opt("2021", "2021 or newer")}${opt("2020", "2020 or newer")}</select>
<button class="chip" id="reset">Reset</button></div>
<div class="bar"><strong id="count"></strong><select id="f-sort" aria-label="Sort">${opt("", "Sort: Featured")}${opt("pa", "Price: low to high")}${opt("pd", "Price: high to low")}${opt("yd", "Newest first")}</select></div>
<div class="grid" id="results"></div></div></section>`;
  ["q", "price", "fuel", "trans", "year", "sort"].forEach(k => {
    const el = $("#f-" + k); el.value = F[k];
    el.addEventListener("input", () => { F[k] = el.value; results(); });
  });
  $("#reset").onclick = () => { Object.keys(F).forEach(k => { F[k] = ""; $("#f-" + k).value = ""; }); results(); };
  $("#go").onclick = () => $("#search").scrollIntoView({ behavior: "smooth" });
  results();
}
function detail(id) {
  const c = CARS.find(x => x.id === +id);
  if (!c) return $("#app").innerHTML = `<div class="wrap"><p class="empty">That car could not be found. <a href="#/" style="color:var(--gold)">Back to all cars</a></p></div>`;
  const V = [[1, "50% 50%"], [1.8, "12% 65%"], [1.8, "88% 45%"]];
  const sty = v => `transform:scale(${v[0]});transform-origin:${v[1]}`;
  const spec = [["Make", c.make], ["Model", c.model], ["Year", c.year], ["Odometer", kms(c.km)], ["Fuel", c.fuel], ["Transmission", c.trans],
    ["Body type", c.body], ["Power", c.power], ["Efficiency", c.eff], ["Owners", c.owners], ["Colour", c.color], ["Location", c.city]];
  $("#app").innerHTML = `<div class="wrap detail"><div><a class="back" href="#/">Back to all cars</a>
<div class="main">${img(c, 1200, sty(V[0])).replace('id=""', "").replace("<img ", '<img id="gm" ')}</div>
<div class="thumbs">${V.map((v, i) => `<button class="th ${i ? "" : "on"}" data-v="${i}" aria-label="Photo ${i + 1}">${img(c, 400, sty(v))}</button>`).join("")}</div>
<h2 style="margin-top:32px">Overview</h2><p>${c.year} ${nameOf(c)} in ${c.color}, ${c.owners} owner, ${kms(c.km)} driven. This is a demonstration listing with sample details.</p>
<h2 style="margin-top:28px">Specifications</h2><table>${spec.map(s => `<tr><th>${s[0]}</th><td>${s[1]}</td></tr>`).join("")}</table></div>
<aside class="panel"><h1>${nameOf(c)}</h1><div class="price">${inr(c.price)}</div>
<div class="btns"><button class="btn alt fv ${favs.includes(c.id) ? "on" : ""}" data-fav="${c.id}">\u2665 Favourite</button>
<button class="btn alt chip ${cmp.includes(c.id) ? "on" : ""}" data-cmp="${c.id}">${cmp.includes(c.id) ? "Added to compare" : "Compare"}</button></div>
<form id="enq"><h3 style="font-size:28px">Send an enquiry</h3><p class="note">Demo form. Nothing is sent or stored.</p>
<input name="n" required placeholder="Full name" aria-label="Full name">
<input name="p" type="tel" required pattern="[0-9+ ]{10,14}" title="Enter a 10 to 14 digit phone number" placeholder="Phone number" aria-label="Phone">
<input name="e" type="email" required placeholder="Email address" aria-label="Email">
<textarea name="m" rows="3" placeholder="I'd like to know more about this car">I'd like to know more about this car.</textarea>
<button class="btn">Send enquiry</button></form></aside></div>`;
  $$(".th").forEach(b => b.onclick = () => {
    $$(".th").forEach(x => x.classList.toggle("on", x === b));
    const v = V[+b.dataset.v], g = $("#gm"); g.style.transform = `scale(${v[0]})`; g.style.transformOrigin = v[1];
  });
  $("#enq").onsubmit = e => {
    e.preventDefault();
    const d = document.createElement("div"); d.className = "ok";
    d.textContent = `Thank you, ${e.target.elements.n.value.trim()}. This is a demo, so your enquiry about the ${nameOf(c)} was not sent to anyone.`;
    e.target.replaceWith(d);
  };
}
function favPage() {
  const L = favs.map(i => CARS.find(c => c.id === i)).filter(Boolean);
  $("#app").innerHTML = `<section><div class="wrap"><h2>Your favourites</h2><p class="sub">Saved in this browser only.</p>
<div class="grid">${L.length ? L.map(card).join("") : `<p class="empty">No favourites yet. Tap the heart on any car to save it. <a href="#/" style="color:var(--gold)">Browse cars</a></p>`}</div></div></section>`;
}
function compare() {
  const L = cmp.map(i => CARS.find(c => c.id === i)).filter(Boolean);
  const rows = [["Price", c => inr(c.price)], ["Year", c => c.year], ["Odometer", c => kms(c.km)], ["Fuel", c => c.fuel], ["Transmission", c => c.trans],
    ["Body type", c => c.body], ["Power", c => c.power], ["Efficiency", c => c.eff], ["Owners", c => c.owners], ["Colour", c => c.color], ["Location", c => c.city]];
  $("#app").innerHTML = `<section><div class="wrap"><h2>Compare cars</h2><p class="sub">Select up to three cars to compare side by side.</p>` + (L.length ?
    `<div class="cmp"><table><tr><th></th>${L.map(c => `<td><a href="#/car/${c.id}">${img(c, 400)}<h3 style="margin-top:8px">${nameOf(c)}</h3></a><button class="chip" data-cmp="${c.id}">Remove</button></td>`).join("")}</tr>
${rows.map(r => `<tr><th>${r[0]}</th>${L.map(c => `<td>${r[1](c)}</td>`).join("")}</tr>`).join("")}</table></div>` +
    (L.length < 3 ? `<p style="margin-top:20px"><a class="btn" href="#/">Add more cars</a></p>` : "") :
    `<p class="empty">No cars selected. Use the Compare button on any listing. <a href="#/" style="color:var(--gold)">Browse cars</a></p>`) + `</div></section>`;
}
function toast(t) { const el = $("#toast"); el.textContent = t; el.classList.add("show"); clearTimeout(toast.t); toast.t = setTimeout(() => el.classList.remove("show"), 2500); }
function paint() {
  $$("[data-fav]").forEach(b => b.classList.toggle("on", favs.includes(+b.dataset.fav)));
  $$("[data-cmp]").forEach(b => {
    if (b.textContent === "Remove") return;
    const on = cmp.includes(+b.dataset.cmp); b.classList.toggle("on", on); b.textContent = on ? "Added to compare" : "Compare";
  });
  [["#nf", favs.length], ["#nc", cmp.length]].forEach(([s, n]) => { $(s).hidden = !n; $(s).textContent = n; });
  $("#tray").hidden = !cmp.length;
  $("#tray-n").textContent = cmp.length + " of 3 selected";
}
function route() {
  const p = location.hash.split("/"), v = p[1] || "";
  ({ "": home, car: () => detail(p[2]), favourites: favPage, compare: compare }[v] || home)();
  $$("nav a").forEach(a => a.classList.toggle("act", a.getAttribute("href") === "#/" + v));
  paint();
}
function sync() { paint(); if (/^#\/(favourites|compare)/.test(location.hash)) route(); }
document.addEventListener("click", e => {
  const f = e.target.closest("[data-fav]"), m = e.target.closest("[data-cmp]");
  if (f) {
    const id = +f.dataset.fav; favs = favs.includes(id) ? favs.filter(x => x !== id) : [...favs, id];
    store.set("autoshine_favs", favs); sync();
  } else if (m) {
    const id = +m.dataset.cmp;
    if (cmp.includes(id)) cmp = cmp.filter(x => x !== id);
    else if (cmp.length >= 3) return toast("You can compare up to 3 cars. Remove one first.");
    else cmp = [...cmp, id];
    store.set("autoshine_cmp", cmp); sync();
  } else if (e.target.closest("[data-clear]")) { cmp = []; store.set("autoshine_cmp", cmp); sync(); }
});
window.addEventListener("hashchange", () => { route(); window.scrollTo(0, 0); });
route();
