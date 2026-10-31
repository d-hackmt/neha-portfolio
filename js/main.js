/* Renders the portfolio from js/data.js. You shouldn't need to edit this file. */
(function () {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const brandById = Object.fromEntries(BRANDS.map((b) => [b.id, b]));
  const collabTitle = (c) => c.title || (brandById[c.brand] || {}).name || "";
  // Instagram post/reel URL -> shortcode (null for profile links)
  const igCode = (url) => (url.match(/instagram\.com\/(?:reel|p)\/([^/?#]+)/) || [])[1] || null;

  /* ---------- Links ---------- */
  const waLink = (text = PROFILE.whatsappMessage) =>
    `https://wa.me/${PROFILE.whatsapp}?text=${encodeURIComponent(text)}`;
  const mailLink = (subject = "Brand collaboration enquiry", body = "") =>
    `mailto:${PROFILE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  $$(".js-whatsapp").forEach((a) => (a.href = waLink()));
  $$(".js-email").forEach((a) => (a.href = mailLink()));
  $$(".js-instagram").forEach((a) => {
    if (PROFILE.instagram.url) a.href = PROFILE.instagram.url;
    else (a.closest("li, figcaption") || a).hidden = true;
  });

  /* ---------- Simple text bindings ---------- */
  const proofPosts = new Set(COLLABS.flatMap((c) => c.links.map((l) => igCode(l.url)).filter(Boolean)));
  const phone = PROFILE.whatsapp.replace(/^(\d{2})(\d{5})(\d+)$/, "+$1 $2 $3");

  const binds = {
    name: PROFILE.name,
    fullName: PROFILE.fullName,
    year: new Date().getFullYear(),
    tagline: PROFILE.tagline,
    role: PROFILE.role,
    experience: PROFILE.experienceYears + "+",
    // "+" because the list doesn't include every venue she has promoted
    brandCount: BRANDS.length + "+",
    followersShort: PROFILE.instagram.followers ? PROFILE.instagram.followers.toLocaleString("en-IN") : "",
    postCount: PROFILE.instagram.posts || proofPosts.size,
    handle: PROFILE.instagram.handle,
    statsUpdated: PROFILE.statsUpdated,
    location: PROFILE.location,
    education: PROFILE.education,
    phonePretty: phone,
    email: PROFILE.email,
  };
  $$("[data-bind]").forEach((el) => {
    const v = binds[el.dataset.bind];
    if (v !== undefined) el.textContent = v;
  });
  $$("[data-bind-html]").forEach((el) => (el.innerHTML = PROFILE[el.dataset.bindHtml] || ""));
  // Hide a hero number whose value is missing (e.g. no follower count yet)
  $$(".hero__stats dd").forEach((dd) => {
    if (!dd.textContent.trim()) dd.parentElement.hidden = true;
  });

  // Images: show an elegant placeholder until a real photo exists
  $$("[data-bind-src]").forEach((img) => {
    const src = PROFILE[img.dataset.bindSrc];
    const markMissing = () => img.parentElement.classList.add("is-missing");
    if (!src) return markMissing();
    img.addEventListener("error", markMissing, { once: true });
    img.src = src;
  });

  /* ---------- Brand wall ---------- */
  // Real logo when we have one, otherwise a serif monogram ("What the Flex" -> "WF")
  const initials = (name) =>
    name
      .split(/[\s–-]+/)
      .filter((w) => /^[A-Za-z]/.test(w) && !/^(the|and|&)$/i.test(w))
      .slice(0, 2)
      .map((w) => w[0].toUpperCase())
      .join("");
  const brandMark = (b) =>
    b.logo
      ? `<img src="${esc(b.logo)}" alt="${esc(b.name)} logo" loading="lazy" />`
      : `<span class="brand__mono" aria-hidden="true">${esc(initials(b.name))}</span>`;

  $("#brandGrid").innerHTML = BRANDS.map((b) => {
    const tag = b.url ? "a" : "div";
    const attrs = b.url ? ` href="${esc(b.url)}" target="_blank" rel="noopener"` : "";
    return `
      <${tag} class="brand reveal${b.logoDark ? " brand--dark" : ""}"${attrs}>
        <span class="brand__mark">${brandMark(b)}</span>
        <span class="brand__info">
          <span class="brand__name">${esc(b.name)}</span>
          <span class="brand__work">${esc(b.work)}</span>
        </span>
        ${b.url ? '<svg class="icon brand__arrow" aria-hidden="true"><use href="#i-arrow"/></svg>' : ""}
      </${tag}>`;
  }).join("");

  /* ---------- Skills ---------- */
  $("#skills").innerHTML = PROFILE.skills.map((n) => `<li class="chip">${esc(n)}</li>`).join("");

  /* ---------- Insights (only shown once real numbers are added) ---------- */
  if (PROFILE.stats.length) {
    $("#stats").innerHTML = PROFILE.stats
      .map(
        (s) => `
        <div class="stat reveal">
          <span class="stat__num" data-count="${s.value}" data-decimals="${s.decimals || 0}" data-suffix="${esc(s.suffix || "")}">0</span>
          <span class="stat__label">${esc(s.label)}</span>
        </div>`
      )
      .join("");

    const bars = (list) =>
      list
        .map(
          (r) => `
        <div class="bar">
          <div class="bar__row"><span>${esc(r.label)}</span><span>${r.value}%</span></div>
          <div class="bar__track"><div class="bar__fill" style="--w:${r.value}%"></div></div>
        </div>`
        )
        .join("");
    const aud = PROFILE.audience;
    [["#audGender", aud.gender], ["#audAge", aud.age], ["#audCities", aud.cities]].forEach(([sel, list]) => {
      if (list.length) $(sel).innerHTML = bars(list);
      else $(sel).closest(".card").hidden = true;
    });
    if (!aud.gender.length && !aud.age.length && !aud.cities.length) $(".audience").hidden = true;
  } else {
    $("#insights").remove();
  }

  /* ---------- Collaborations ---------- */
  const grid = $("#workGrid");
  const tones = [
    "var(--blush)",
    "var(--sand)",
    "color-mix(in srgb, var(--blush) 55%, var(--sand))",
    "color-mix(in srgb, var(--blush) 75%, var(--surface))",
  ];

  // Screenshot if provided, otherwise a tile with the brand's logo or name
  const placeholder = (c, i, shown) => {
    const b = brandById[c.brand];
    const inner = b && b.logo ? `<img src="${esc(b.logo)}" alt="" />` : esc(collabTitle(c));
    const dark = b && b.logoDark ? " work__ph--dark" : "";
    return `<span class="work__ph${dark}${shown ? " is-shown" : ""}${b && b.logo ? " has-logo" : ""}" style="--tone:${tones[i % tones.length]}">${inner}</span>`;
  };
  const media = (c, i) =>
    c.image
      ? `<img src="${esc(c.image)}" alt="${esc(collabTitle(c))} campaign screenshot" loading="lazy"
           onerror="this.parentElement.classList.add('is-missing')" />${placeholder(c, i, false)}`
      : placeholder(c, i, true);

  grid.innerHTML = COLLABS.map(
    (c, i) => `
    <button class="work reveal" type="button" data-index="${i}" data-category="${esc(c.category)}">
      <span class="work__media">
        ${media(c, i)}
        <span class="work__type">${esc(c.type)}</span>
      </span>
      <span class="work__info">
        <span class="work__brand">${esc(collabTitle(c))}</span>
        <span class="work__meta">${esc(c.category)} · ${esc(c.did.slice(0, 2).join(", "))}</span>
      </span>
      <span class="work__arrow" aria-hidden="true"><svg class="icon"><use href="#i-arrow"/></svg></span>
    </button>`
  ).join("");

  // Filters
  const cats = ["All", ...new Set(COLLABS.map((c) => c.category))];
  const filters = $("#filters");
  filters.innerHTML = cats
    .map((c, i) => `<button class="filter${i === 0 ? " is-active" : ""}" role="tab" aria-selected="${i === 0}" data-filter="${esc(c)}">${esc(c)}</button>`)
    .join("");
  filters.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter");
    if (!btn) return;
    $$(".filter", filters).forEach((b) => {
      b.classList.toggle("is-active", b === btn);
      b.setAttribute("aria-selected", b === btn);
    });
    const f = btn.dataset.filter;
    $$(".work", grid).forEach((card) => {
      card.hidden = f !== "All" && card.dataset.category !== f;
    });
  });

  // Modal with a live Instagram preview of the first post
  const modal = $("#modal");
  const modalBody = $("#modalBody");
  const openCollab = (i) => {
    const c = COLLABS[i];
    const code = c.links.length ? igCode(c.links[0].url) : null;
    const preview = code
      ? `<iframe class="modal__embed" src="https://www.instagram.com/p/${esc(code)}/embed/" title="${esc(collabTitle(c))} on Instagram"
           loading="lazy" allowtransparency="true" allow="encrypted-media" scrolling="no"></iframe>`
      : `<div class="work__media">${media(c, i)}</div>`;
    const buttons = c.links
      .map(
        (l, n) => `<a class="btn ${n === 0 ? "btn--dark" : "btn--ghost"} btn--sm" href="${esc(l.url)}" target="_blank" rel="noopener">
          ${n === 0 ? '<svg class="icon" aria-hidden="true"><use href="#i-instagram"/></svg>' : ""}${esc(l.label)}</a>`
      )
      .join("");
    modalBody.innerHTML = `
      <div class="modal__media">${preview}</div>
      <div class="modal__info">
        <p class="eyebrow">${esc(c.category)} · ${esc(c.type)}</p>
        <h3 class="h3" id="modalTitle">${esc(collabTitle(c))}</h3>
        <p class="muted">${esc(c.summary)}</p>
        <div class="modal__did">
          <p class="modal__label">What I did</p>
          <ul>${c.did.map((d) => `<li>${esc(d)}</li>`).join("")}</ul>
        </div>
        <div class="modal__links">${buttons}</div>
      </div>`;
    modal.showModal();
  };
  grid.addEventListener("click", (e) => {
    const card = e.target.closest(".work");
    if (card) openCollab(+card.dataset.index);
  });
  // Shareable deep link to one campaign: ?campaign=kpilates (brand id)
  const wanted = new URLSearchParams(location.search).get("campaign");
  const wantedIndex = COLLABS.findIndex((c) => c.brand && c.brand === wanted);
  if (wantedIndex >= 0) openCollab(wantedIndex);
  const closeModal = () => modal.close();
  modal.addEventListener("close", () => (modalBody.innerHTML = "")); // stops any playing video
  $("#modalClose").addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal(); // click on backdrop
  });

  /* ---------- Services, process, testimonials ---------- */
  $("#services-list").innerHTML = SERVICES.map(
    (s, i) => `
    <article class="service reveal">
      <span class="service__num">${String(i + 1).padStart(2, "0")}</span>
      <h3 class="service__title">${esc(s.title)}</h3>
      <p>${esc(s.text)}</p>
    </article>`
  ).join("");

  $("#processList").innerHTML = PROCESS.map(
    (p, i) => `
    <li class="step reveal">
      <span class="step__num">${i + 1}</span>
      <h3 class="step__title">${esc(p.title)}</h3>
      <p class="muted">${esc(p.text)}</p>
    </li>`
  ).join("");

  if (TESTIMONIALS.length) {
    $("#quotes").innerHTML = TESTIMONIALS.map(
      (t) => `
      <figure class="quote card reveal">
        <blockquote>“${esc(t.quote)}”</blockquote>
        <figcaption><strong>${esc(t.name)}</strong><span>${esc(t.company)}</span></figcaption>
      </figure>`
    ).join("");
  } else {
    $("#testimonials").remove();
  }

  /* ---------- Enquiry form → WhatsApp or email ---------- */
  const formType = $("#formType");
  formType.innerHTML = SERVICES.map((s) => `<option>${esc(s.title)}</option>`).join("") + "<option>Something else</option>";

  $("#enquiry").addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.target;
    const d = Object.fromEntries(new FormData(form));
    const error = $("#formError");
    if (!d.name.trim() || !d.brand.trim() || !d.message.trim()) {
      error.hidden = false;
      return;
    }
    error.hidden = true;
    const text =
      `Hi ${PROFILE.name}, I'm ${d.name} from ${d.brand}.\n\n` +
      `Collaboration: ${d.type}\n` +
      (d.budget ? `Budget: ${d.budget}\n` : "") +
      `\n${d.message}`;
    const via = e.submitter && e.submitter.dataset.via;
    if (via === "email") window.location.href = mailLink(`Collaboration enquiry — ${d.brand}`, text);
    else window.open(waLink(text), "_blank", "noopener");
  });

  $("#printKit").addEventListener("click", () => window.print());

  /* ---------- Navigation ---------- */
  const nav = $("#nav");
  const toggle = $("#navToggle");
  const links = $("#navLinks");
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 10);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const setMenu = (open) => {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open);
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };
  toggle.addEventListener("click", () => setMenu(!nav.classList.contains("is-open")));
  links.addEventListener("click", (e) => e.target.closest("a") && setMenu(false));

  // Highlight the current section in the nav
  const navMap = new Map($$("a", links).map((a) => [a.getAttribute("href").slice(1), a]));
  const sectionObserver = new IntersectionObserver(
    (entries) =>
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        navMap.forEach((a, id) => a.classList.toggle("is-active", id === en.target.id));
      }),
    { rootMargin: "-45% 0px -50% 0px" }
  );
  navMap.forEach((_, id) => {
    const s = document.getElementById(id);
    if (s) sectionObserver.observe(s);
  });

  /* ---------- Reveal + count-up animations ---------- */
  const countUp = (el) => {
    const target = parseFloat(el.dataset.count);
    const dec = +el.dataset.decimals;
    const suffix = el.dataset.suffix;
    const fmt = (v) => (dec ? v.toFixed(dec) : Math.round(v).toLocaleString("en-IN")) + suffix;
    if (reduceMotion) return (el.textContent = fmt(target));
    const start = performance.now();
    const dur = 1400;
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      el.textContent = fmt(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const revealObserver = new IntersectionObserver(
    (entries) =>
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        en.target.classList.add("is-visible");
        $$("[data-count]", en.target).forEach(countUp);
        revealObserver.unobserve(en.target);
      }),
    { threshold: 0.15 }
  );
  $$(".reveal, .card").forEach((el) => revealObserver.observe(el));

  // Make sure the PDF shows final numbers even for sections not scrolled to yet
  window.addEventListener("beforeprint", () => {
    $$("[data-count]").forEach((el) => {
      const dec = +el.dataset.decimals;
      const v = parseFloat(el.dataset.count);
      el.textContent = (dec ? v.toFixed(dec) : v.toLocaleString("en-IN")) + el.dataset.suffix;
    });
  });
})();
