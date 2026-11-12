/* Barbearia Padrão — renderização e interações. Dados em config.js */
(function () {
  const S = window.SITE;
  const $ = (q, el = document) => el.querySelector(q);
  const $$ = (q, el = document) => [...el.querySelectorAll(q)];
  const brl = v => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const waLink = msg => `https://wa.me/${S.whatsapp}?text=${encodeURIComponent(msg)}`;
  const ICON = {
    wa: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3z"/></svg>',
    cal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
    blade: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M10 44 46 8l10 10-36 36z"/><path d="M20 54l-8 2 2-8"/><path d="M38 16l10 10"/></svg>'
  };
  const photo = (img, alt, extra = "") =>
    img ? `<img src="${esc(img)}" alt="${esc(alt)}" loading="lazy" decoding="async">`
        : `<div class="ph-art" aria-hidden="true">${extra || ICON.blade}</div>`;

  document.documentElement.classList.remove("no-js");
  var io;

  /* ---------- Serviços ---------- */
  const cats = ["Todos", ...new Set(S.servicos.map(s => s.cat))];
  $("#filtros").innerHTML = cats.map((c, i) => `<button class="chip" role="tab" aria-selected="${i === 0}" data-cat="${c}">${c}</button>`).join("");
  function renderServicos(cat = "Todos") {
    $("#listaServicos").innerHTML = S.servicos.filter(s => cat === "Todos" || s.cat === cat).map(s => `
      <article class="svc reveal">
        ${s.destaque ? '<span class="badge">Mais pedido</span>' : ""}
        <span class="tag">${s.cat} · ${s.min} min</span>
        <h3>${esc(s.nome)}</h3>
        <p>${esc(s.desc)}</p>
        <div class="svc-foot">
          <div class="price"><small>a partir de</small>${brl(s.preco)}</div>
          <div class="svc-actions">
            <a class="icon-btn" href="${waLink(`Olá! Gostaria de agendar *${s.nome}* na Barbearia Padrão. Quais horários estão disponíveis?`)}" target="_blank" rel="noopener" aria-label="Pedir ${esc(s.nome)} pelo WhatsApp">${ICON.wa}</a>
            <button class="btn btn-gold btn-sm" data-agendar="${s.id}">Agendar</button>
          </div>
        </div>
      </article>`).join("");
    observe();
  }
  $("#filtros").addEventListener("click", e => {
    const b = e.target.closest(".chip"); if (!b) return;
    $$(".chip").forEach(c => c.setAttribute("aria-selected", c === b));
    renderServicos(b.dataset.cat);
  });
  $("#listaServicos").addEventListener("pointermove", e => {
    const c = e.target.closest(".svc"); if (!c) return;
    const r = c.getBoundingClientRect();
    c.style.setProperty("--mx", e.clientX - r.left + "px"); c.style.setProperty("--my", e.clientY - r.top + "px");
  });
  renderServicos();

  /* ---------- Equipe ---------- */
  $("#listaEquipe").innerHTML = S.equipe.map(p => `
    <article class="member reveal">
      <div class="ph">${p.img ? photo(p.img, p.nome) : `<div class="ph-art"><span class="initials">${p.nome.split(" ").map(n => n[0]).join("")}</span></div>`}</div>
      <div class="member-body">
        <h3>${esc(p.nome)}</h3><div class="role">${esc(p.cargo)}</div>
        <p>${esc(p.bio)}</p><p class="style">${esc(p.estilo)}</p>
        <button class="btn btn-ghost btn-sm" data-pro="${p.id}">Agendar com ${p.nome.split(" ")[0]}</button>
      </div>
    </article>`).join("");

  /* ---------- Galeria + lightbox ---------- */
  $("#listaGaleria").innerHTML = S.galeria.map((g, i) => `
    <figure class="g-item ph reveal" tabindex="0" role="button" data-i="${i}" aria-label="Ampliar: ${esc(g.titulo)}">
      ${photo(g.img, g.titulo)}
      <figcaption><span>${esc(g.tag)}</span><b>${esc(g.titulo)}</b></figcaption>
    </figure>`).join("");
  const lb = document.createElement("div");
  lb.className = "lightbox"; lb.setAttribute("role", "dialog"); lb.setAttribute("aria-modal", "true");
  lb.innerHTML = '<div class="ph" id="lbImg"></div><button class="btn btn-ghost btn-sm" aria-label="Fechar">Fechar ✕</button>';
  document.body.appendChild(lb);
  let lastFocus;
  const openLb = i => { const g = S.galeria[i]; lastFocus = document.activeElement; $("#lbImg").innerHTML = photo(g.img, g.titulo) + `<figcaption style="position:absolute;bottom:1rem;left:1rem;font:italic 1.3rem Fraunces,serif">${esc(g.titulo)}</figcaption>`; lb.classList.add("open"); $("button", lb).focus(); };
  const closeLb = () => { lb.classList.remove("open"); lastFocus && lastFocus.focus(); };
  $("#listaGaleria").addEventListener("click", e => { const f = e.target.closest(".g-item"); f && openLb(f.dataset.i); });
  $("#listaGaleria").addEventListener("keydown", e => { if ((e.key === "Enter" || e.key === " ") && e.target.matches(".g-item")) { e.preventDefault(); openLb(e.target.dataset.i); } });
  lb.addEventListener("click", e => { if (e.target === lb || e.target.closest("button")) closeLb(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && lb.classList.contains("open")) closeLb(); });

  /* ---------- Espaço ---------- */
  $("#listaEspaco").innerHTML = S.espaco.map(s => `<div class="space-card ph">${photo(s.img, s.titulo)}<span>${esc(s.titulo)}</span></div>`).join("");

  /* ---------- Depoimentos ---------- */
  $("#listaDepoimentos").innerHTML = S.depoimentos.map(d => `
    <article class="review reveal">
      <span class="ilustrativo">Depoimento ilustrativo</span>
      <div class="stars" aria-hidden="true">★★★★★</div>
      <p>“${esc(d.texto)}”</p>
      <footer><span class="avatar">${d.nome[0]}</span><div>${esc(d.nome)}<small>${esc(d.servico)}</small></div></footer>
    </article>`).join("");

  /* ---------- Planos ---------- */
  $("#listaPlanos").innerHTML = S.planos.map(p => `
    <article class="plan reveal ${p.destaque ? "hl" : ""}">
      ${p.destaque ? '<span class="badge">Mais escolhido</span>' : ""}
      <h3>${esc(p.nome)}</h3>
      <div class="amount">${brl(p.preco)}<small>${p.periodo}</small></div>
      <ul>${p.itens.map(i => `<li>${esc(i)}</li>`).join("")}</ul>
      <a class="btn ${p.destaque ? "btn-gold" : "btn-ghost"}" href="${waLink(`Olá! Tenho interesse no plano *${p.nome}* (${brl(p.preco)}${p.periodo}) do Clube Padrão. Como funciona?`)}" target="_blank" rel="noopener">Quero este plano</a>
    </article>`).join("");
  $("#fidelidade").textContent = S.fidelidade;

  /* ---------- Produtos ---------- */
  const bottle = t => {
    const shapes = {
      pomada: '<rect x="18" y="40" width="64" height="34" rx="6"/><rect x="14" y="30" width="72" height="14" rx="4"/>',
      oleo: '<rect x="34" y="34" width="32" height="50" rx="6"/><rect x="42" y="18" width="16" height="16"/><path d="M50 8v10"/>',
      shampoo: '<rect x="28" y="26" width="44" height="60" rx="10"/><rect x="40" y="12" width="20" height="14" rx="3"/>',
      balm: '<rect x="24" y="30" width="52" height="54" rx="8"/><path d="M24 44h52"/>',
      spray: '<rect x="32" y="30" width="36" height="56" rx="8"/><rect x="40" y="16" width="20" height="14"/><path d="M60 20h10"/>'
    };
    return `<svg viewBox="0 0 100 100" fill="none" stroke="#c79a5b" stroke-width="2">${shapes[t]}<path d="M38 60h24" stroke-opacity=".5"/></svg>`;
  };
  $("#listaProdutos").innerHTML = S.produtos.map(p => `
    <article class="product reveal">
      <div class="ph">${bottle(p.tipo)}</div>
      <div class="product-body">
        <h3>${esc(p.nome)}</h3><p>${esc(p.desc)}</p>
        <div class="row"><b>${brl(p.preco)}</b><a class="link" href="${waLink(`Olá! Gostaria de reservar o produto *${p.nome}* (${brl(p.preco)}) para retirar na barbearia.`)}" target="_blank" rel="noopener">Reservar →</a></div>
      </div>
    </article>`).join("");

  /* ---------- Contato / rodapé ---------- */
  const hoje = new Date().getDay();
  const idxHoje = hoje === 0 ? 2 : hoje === 6 ? 1 : 0;
  const horas = S.horarios.map((h, i) => `<li class="${i === idxHoje ? "today" : ""}"><span>${h.dia}${i === idxHoje ? " · hoje" : ""}</span><span>${h.hora}</span></li>`).join("");
  $("#horarios").innerHTML = horas; $("#rodapeHorarios").innerHTML = horas;
  $("#endereco").textContent = S.endereco;
  $("#referencia").textContent = S.referencia;
  $("#ligar").href = "tel:" + S.telefoneLink; $("#ligar").textContent = "Ligar · " + S.telefone;
  $("#contatoTexto").innerHTML = `WhatsApp ${S.whatsappExibicao} · <a href="mailto:${S.email}">${S.email}</a>`;
  $("#rodapeContato").innerHTML = `${S.endereco}<br>${S.telefone} · WhatsApp ${S.whatsappExibicao}<br>${S.email}`;
  $$("[data-rede]").forEach(a => a.href = S.redes[a.dataset.rede] || "#");
  $("#ano").textContent = new Date().getFullYear();
  $$("[data-wa]").forEach(a => { a.href = waLink(S.msgPadrao); a.target = "_blank"; a.rel = "noopener"; });

  /* ---------- Agendamento ---------- */
  const st = { step: 1, servico: null, pro: null, data: null, hora: null };
  $("#optServicos").innerHTML = S.servicos.map(s => `<div class="opt"><input type="radio" name="servico" id="s-${s.id}" value="${s.id}"><label for="s-${s.id}"><b>${esc(s.nome)}</b><span>${s.min} min · ${brl(s.preco)}</span></label></div>`).join("");
  $("#optEquipe").innerHTML = [{ id: "qualquer", nome: "Sem preferência", cargo: "Primeiro disponível" }, ...S.equipe].map(p => `<div class="opt"><input type="radio" name="pro" id="p-${p.id}" value="${p.id}"><label for="p-${p.id}"><b>${esc(p.nome)}</b><span>${esc(p.cargo)}</span></label></div>`).join("");

  const DIAS = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];
  const dias = [...Array(14)].map((_, i) => { const d = new Date(); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() + i); return d; });
  $("#optDias").innerHTML = dias.map((d, i) => `<button type="button" class="day" role="radio" aria-checked="false" data-i="${i}" ${S.grade[d.getDay()] ? "" : "disabled"} aria-label="${d.toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" })}"><small>${i === 0 ? "hoje" : DIAS[d.getDay()]}</small><b>${d.getDate()}</b></button>`).join("");

  // Ocupação demonstrativa determinística (não reflete agenda real)
  const fakeBusy = (d, h) => ((d.getDate() * 7 + h * 13 + (st.pro || "").length * 3) % 5) === 0;
  function renderHoras() {
    const d = st.data, g = S.grade[d.getDay()], dur = (S.servicos.find(s => s.id === st.servico) || { min: 30 }).min;
    const now = new Date(), out = [];
    for (let m = g[0] * 60; m + dur <= g[1] * 60; m += S.intervaloMin) {
      const t = new Date(d); t.setMinutes(m);
      const label = `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
      const dis = t < now || fakeBusy(d, m / 30);
      out.push(`<button type="button" class="slot" role="radio" aria-checked="${st.hora === label}" ${dis ? "disabled" : ""} data-h="${label}">${label}</button>`);
    }
    $("#optHoras").innerHTML = out.join("") || '<p class="hint">Sem horários neste dia.</p>';
  }
  $("#optDias").addEventListener("click", e => {
    const b = e.target.closest(".day"); if (!b || b.disabled) return;
    $$(".day").forEach(x => x.setAttribute("aria-checked", x === b));
    st.data = dias[b.dataset.i]; st.hora = null; renderHoras();
  });
  $("#optHoras").addEventListener("click", e => {
    const b = e.target.closest(".slot"); if (!b || b.disabled) return;
    $$(".slot").forEach(x => x.setAttribute("aria-checked", x === b)); st.hora = b.dataset.h;
  });
  $("#formAgenda").addEventListener("change", e => {
    if (e.target.name === "servico") { st.servico = e.target.value; setTimeout(() => go(2), 220); }
    if (e.target.name === "pro") { st.pro = e.target.value; setTimeout(() => go(3), 220); }
  });
  const whatsInput = $('[name="whats"]');
  whatsInput.addEventListener("input", () => {
    let v = whatsInput.value.replace(/\D/g, "").slice(0, 11);
    if (v.length > 6) v = `(${v.slice(0, 2)}) ${v.slice(2, 3)} ${v.slice(3, 7)}-${v.slice(7)}`;
    else if (v.length > 2) v = `(${v.slice(0, 2)}) ${v.slice(2)}`;
    whatsInput.value = v;
  });

  const err = m => { $("#erro").textContent = m || ""; };
  function validate(n) {
    if (n === 1 && !st.servico) return "Escolha um serviço.";
    if (n === 2 && !st.pro) return "Escolha um profissional (ou “Sem preferência”).";
    if (n === 3 && (!st.data || !st.hora)) return "Escolha uma data e um horário.";
    if (n === 4) {
      const f = $("#formAgenda");
      if (f.nome.value.trim().length < 2) return "Informe seu nome.";
      if (f.whats.value.replace(/\D/g, "").length < 10) return "Informe um WhatsApp válido com DDD.";
      if (f.email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.value)) return "Confira o e-mail.";
      if (!f.lgpd.checked) return "Precisamos do seu consentimento para enviar a solicitação.";
    }
    return "";
  }
  function go(n) {
    st.step = n; err();
    $$(".step").forEach(s => s.classList.toggle("on", +s.dataset.step === n));
    $$("#legenda li").forEach((li, i) => { li.classList.toggle("on", i + 1 === n); li.classList.toggle("done", i + 1 < n); });
    $("#voltar").hidden = n === 1 || n === 5;
    $("#avancar").hidden = n === 5;
    $("#avancar").textContent = n === 4 ? "Revisar solicitação" : "Continuar";
    if (n === 3 && !st.data) {
      // seleciona o primeiro dia que ainda tem horário livre
      for (const d of $$(".day:not(:disabled)")) { d.click(); if ($(".slot:not(:disabled)")) break; }
    }
    else if (n === 3) renderHoras();
    if (n === 5) renderResumo();
    const card = $("#formAgenda"), top = card.getBoundingClientRect().top;
    if (top < 0 || top > innerHeight * .6) card.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  function renderResumo() {
    const f = $("#formAgenda"), s = S.servicos.find(x => x.id === st.servico);
    const p = st.pro === "qualquer" ? "Sem preferência" : S.equipe.find(x => x.id === st.pro).nome;
    const data = st.data.toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long" });
    const msg = `Olá! Gostaria de *solicitar um agendamento* na Barbearia Padrão:\n\n• Serviço: ${s.nome} (${brl(s.preco)})\n• Profissional: ${p}\n• Data: ${data}\n• Horário: ${st.hora}\n• Nome: ${f.nome.value.trim()}\n• WhatsApp: ${f.whats.value}${f.email.value ? `\n• E-mail: ${f.email.value}` : ""}\n\nAguardo a confirmação. Obrigado!`;
    $("#resumo").innerHTML = `<div class="summary">
      <legend>Resumo da solicitação</legend>
      <dl><dt>Serviço</dt><dd>${esc(s.nome)} · ${s.min} min</dd><dt>Profissional</dt><dd>${esc(p)}</dd><dt>Data</dt><dd>${data}</dd><dt>Horário</dt><dd>${st.hora}</dd><dt>Valor</dt><dd>${brl(s.preco)} (demonstrativo)</dd><dt>Cliente</dt><dd>${esc(f.nome.value.trim())} · ${esc(f.whats.value)}</dd></dl>
      <div class="status"><span aria-hidden="true">⏳</span><div><b>Ainda não está confirmado.</b> Envie a solicitação pelo WhatsApp. A barbearia verifica a agenda e responde confirmando o horário ou sugerindo outro.</div></div>
      <a class="btn btn-gold" href="${waLink(msg)}" target="_blank" rel="noopener">Enviar solicitação pelo WhatsApp</a>
      <button type="button" class="btn btn-ghost btn-sm" id="reiniciar" style="width:100%;margin-top:.6rem">Editar ou fazer outro pedido</button></div>`;
    $("#reiniciar").onclick = () => go(1);
    track("generate_lead", { servico: s.id });
    if (S.integracoes.agendaWebhookUrl) {
      fetch(S.integracoes.agendaWebhookUrl, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ servico: s.id, profissional: st.pro, data: st.data.toISOString().slice(0, 10), hora: st.hora, nome: f.nome.value, whatsapp: f.whats.value, email: f.email.value }) }).catch(() => {});
    }
  }
  $("#avancar").onclick = () => { const m = validate(st.step); if (m) return err(m); go(st.step + 1); };
  $("#voltar").onclick = () => go(st.step - 1);

  // Atalhos: botões "Agendar" de serviços e equipe pré-preenchem o formulário
  document.addEventListener("click", e => {
    const a = e.target.closest("[data-agendar]"), p = e.target.closest("[data-pro]");
    if (!a && !p) return;
    if (a) { st.servico = a.dataset.agendar; $(`#s-${st.servico}`).checked = true; }
    if (p) { st.pro = p.dataset.pro; $(`#p-${st.pro}`).checked = true; }
    $("#agendar").scrollIntoView({ behavior: "smooth" });
    go(!st.servico ? 1 : !st.pro ? 2 : 3);
  });

  /* ---------- Fotos opcionais do hero/sobre ---------- */
  // Para usar fotos reais, adicione em config.js: SITE.fotos = { hero: "assets/hero.jpg", sobre: "assets/sobre.jpg" }
  if (S.fotos) $$("[data-photo]").forEach(el => { const src = S.fotos[el.dataset.photo]; if (src) { el.classList.add("has-photo"); el.style.backgroundImage = `url("${src}")`; el.style.backgroundSize = "cover"; } });

  /* ---------- UI: header, menu, reveal, CTA mobile ---------- */
  const header = $(".header"), mcta = $(".mobile-cta");
  const onScroll = () => { header.classList.toggle("scrolled", scrollY > 30); mcta.classList.toggle("show", scrollY > innerHeight * .8 && !isInView($("#agendar"))); };
  const isInView = el => { const r = el.getBoundingClientRect(); return r.top < innerHeight && r.bottom > 0; };
  addEventListener("scroll", onScroll, { passive: true }); onScroll();
  const burger = $("#burger"), nav = $("#nav");
  burger.onclick = () => { const o = burger.getAttribute("aria-expanded") === "true"; burger.setAttribute("aria-expanded", !o); nav.classList.toggle("open", !o); document.body.style.overflow = o ? "" : "hidden"; };
  nav.addEventListener("click", e => { if (e.target.tagName === "A" && nav.classList.contains("open")) burger.click(); });

  function observe() {
    if (!("IntersectionObserver" in window)) { $$(".reveal").forEach(el => el.classList.add("in")); return; }
    io = io || new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } }), { threshold: .12, rootMargin: "0px 0px -40px" });
    $$(".reveal:not(.in)").forEach((el, i) => { el.style.transitionDelay = (i % 4) * 70 + "ms"; io.observe(el); });
  }
  observe();

  /* ---------- Analytics (só carrega se houver ID em config.js) ---------- */
  function track(ev, params) { if (window.gtag) gtag("event", ev, params); if (window.fbq) fbq("track", "Lead"); }
  const { googleAnalyticsId: ga, metaPixelId: px } = S.integracoes;
  if (ga) { const s = document.createElement("script"); s.async = true; s.src = `https://www.googletagmanager.com/gtag/js?id=${ga}`; document.head.appendChild(s); window.dataLayer = window.dataLayer || []; window.gtag = function () { dataLayer.push(arguments); }; gtag("js", new Date()); gtag("config", ga); }
  if (px) { !function (f, b, e, v, n, t, s) { if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments) }; if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = "2.0"; n.queue = []; t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s) }(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js"); fbq("init", px); fbq("track", "PageView"); }
  $$('a[href^="https://wa.me"]').forEach(a => a.addEventListener("click", () => track("contact_whatsapp", {})));
})();
