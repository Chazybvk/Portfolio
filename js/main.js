/* ============================================================
   Konstantin Boltyshev — Portfolio
   Clean rewrite (Emerge dependency removed).
   Handles: preloader, hero parallax, scroll reveals,
   project slider, and UI extras (nav dots, progress bar,
   back-to-top, custom cursor).
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Preloader fade-out ---------- */
  function hidePreloader() {
    const pl = document.getElementById("preloader");
    if (!pl) return;
    pl.classList.add("is-hidden");
    setTimeout(() => pl.remove(), 700);
  }
  window.addEventListener("load", () => setTimeout(hidePreloader, 300));
  // Safety net: never let the preloader trap the user.
  setTimeout(hidePreloader, 4000);

  /* ---------- Hero parallax (pointer) ---------- */
  const pBody = document.querySelector(".parallaxBody");
  const pItems = document.querySelectorAll(".parallaxItem");
  if (pBody && pItems.length) {
    const move = (cx, cy) => {
      const r = pBody.getBoundingClientRect();
      const dx = cx - r.left - r.width / 2;
      const dy = cy - r.top - r.height / 2;
      pItems.forEach((el) => {
        const s = parseFloat(el.dataset.speed) || 0;
        el.style.transform = `translate(${(-dx * s).toFixed(2)}px, ${(-dy * s).toFixed(2)}px)`;
      });
    };
    pBody.addEventListener("mousemove", (e) => move(e.clientX, e.clientY));
    pBody.addEventListener("mouseout", () =>
      pItems.forEach((el) => (el.style.transform = ""))
    );
    // Gentle drift on touch devices via scroll.
    if (window.matchMedia("(hover: none)").matches) {
      window.addEventListener(
        "scroll",
        () => {
          const y = window.pageYOffset;
          pItems.forEach((el) => {
            const s = parseFloat(el.dataset.speed) || 0;
            el.style.transform = `translateY(${(y * s * 4).toFixed(2)}px)`;
          });
        },
        { passive: true }
      );
    }
  }

  /* ---------- Scroll reveal (._anim-items -> ._active) ---------- */
  const animItems = document.querySelectorAll("._anim-items");
  if (animItems.length) {
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (en.isIntersecting) en.target.classList.add("_active");
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
      );
      animItems.forEach((el) => io.observe(el));
    } else {
      animItems.forEach((el) => el.classList.add("_active"));
    }
  }

  /* ---------- Project slider (coverflow, data-driven) ---------- */
  const PROJECTS = [
    { img: "onkron_de.jpg", title: "ONKRON DE", url: "https://onkron.de/",
      text: "Немецкий интернет-магазин ONKRON на Shopify — кронштейны и стойки для ТВ и мониторов. Вёрстка и адаптация витрины." },
    { img: "bmgg.jpg", title: "BMGG Europe", url: "https://bmggcorp.com/",
      text: "Корпоративный сайт BMGG Europe GmbH: технологический консалтинг, проектный менеджмент и цифровые решения для бизнеса в Европе." },
    { img: "claretcafe.jpg", title: "Cafe Claret", url: "https://claretcafe.ru/",
      text: "Сайт ресторана Cafe Claret в центре Санкт-Петербурга — атмосфера, меню и онлайн-бронирование столов." },
    { img: "marius.jpg", title: "Marius", url: "https://mariuspub.ru/",
      text: "Классический пивной ресторан в стиле английского паба: меню, пивная карта и бронирование." },
    { img: "tdkmf.jpg", title: "ТД КМФ", url: "https://tdkmf.ru/",
      text: "Лендинг-каталог поставщика нерудных материалов: песок и щебень с карьера, цены и форма заявки." },
    { img: "emaar.png", title: "Тестовое задание EMAAR", url: "https://chazybvk.github.io/EMAAR-test/",
      text: "Тестовое задание на позицию верстальщика: полный адаптив под любой экран и мобильная версия." },
    { img: "claret.jpg", title: "Claret Cafe — лендинг", url: "https://chazybvk.github.io/Portfolio-Claret/",
      text: "Лендинг для ресторана высокой кухни Claret Cafe при отеле «Гельвеция» — первая коммерческая работа." },
    { img: "turnkey.jpg", title: "Вёрстка по макету Figma", url: "https://chazybvk.github.io/Example-for-skillfactory/",
      text: "Вёрстка по макету из Figma: полноэкранная и мобильная версии." },
    { img: "calc.jpg", title: "Calculator JS", url: "https://chazybvk.github.io/CalculatorJS/",
      text: "UI и программирование калькулятора на чистом JavaScript — популярное тестовое задание." },
  ];

  const scene = document.getElementById("sliderScene");
  const descTitle = document.querySelector("#projTitle p");
  const descText = document.querySelector("#projText p");
  const projLink = document.getElementById("projLink");
  const counter = document.getElementById("projCounter");

  if (scene && PROJECTS.length) {
    const slideEls = PROJECTS.map((p, i) => {
      const a = document.createElement("a");
      a.className = "sliderImage";
      a.href = p.url;
      a.target = "_blank";
      a.rel = "noopener";
      a.setAttribute("aria-label", p.title);
      a.style.backgroundImage = `url(images/${p.img})`;
      a.addEventListener("click", (e) => {
        if (i !== active) {
          e.preventDefault();
          active = i;
          render();
        }
      });
      scene.appendChild(a);
      return a;
    });

    let active = 0;
    const render = () => {
      slideEls.forEach((el, i) => {
        const rel = i - active;
        el.style.transform = `translateX(${rel * 100}%)`;
        el.style.scale = rel === 0 ? "1.15" : "0.78";
        el.style.zIndex = String(10 - Math.abs(rel));
        el.style.opacity = Math.abs(rel) > 1 ? "0" : "1";
        el.style.filter = rel === 0 ? "none" : "brightness(0.6)";
      });
      const p = PROJECTS[active];
      if (descTitle) descTitle.textContent = p.title;
      if (descText) descText.textContent = p.text;
      if (projLink) projLink.href = p.url;
      if (counter) counter.textContent = active + 1 + " / " + PROJECTS.length;
    };
    const go = (dir) => {
      active = (active + dir + PROJECTS.length) % PROJECTS.length;
      render();
    };

    const prev = document.querySelector(".previous");
    const next = document.querySelector(".next");
    prev && prev.addEventListener("click", () => go(-1));
    next && next.addEventListener("click", () => go(1));
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    });

    // Swipe support
    let sx = null;
    scene.addEventListener("touchstart", (e) => (sx = e.touches[0].clientX), { passive: true });
    scene.addEventListener("touchend", (e) => {
      if (sx === null) return;
      const dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
      sx = null;
    });

    render();
  }

  /* ---------- Scroll progress bar ---------- */
  const bar = document.getElementById("scroll-progress");
  if (bar) {
    const upd = () => {
      const h = document.documentElement;
      const p = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
      bar.style.transform = `scaleX(${Math.min(p, 1)})`;
    };
    window.addEventListener("scroll", upd, { passive: true });
    upd();
  }

  /* ---------- Section nav dots ---------- */
  const sections = Array.from(document.querySelectorAll(".allsections"));
  const dotsWrap = document.getElementById("nav-dots");
  if (dotsWrap && sections.length) {
    const labels = ["Начало", "Обо мне", "Работы", "Навыки"];
    const dots = sections.map((sec, i) => {
      const d = document.createElement("button");
      d.className = "nav-dot";
      d.type = "button";
      d.setAttribute("aria-label", labels[i] || "Секция " + (i + 1));
      d.dataset.tip = labels[i] || "";
      d.addEventListener("click", () =>
        sec.scrollIntoView({ behavior: "smooth" })
      );
      dotsWrap.appendChild(d);
      return d;
    });
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (en.isIntersecting) {
              const idx = sections.indexOf(en.target);
              dots.forEach((d, i) => d.classList.toggle("is-active", i === idx));
            }
          });
        },
        { threshold: 0.5 }
      );
      sections.forEach((s) => io.observe(s));
    }
  }

  /* ---------- Back to top ---------- */
  const toTop = document.getElementById("to-top");
  if (toTop) {
    window.addEventListener(
      "scroll",
      () => toTop.classList.toggle("is-visible", window.pageYOffset > 600),
      { passive: true }
    );
    toTop.addEventListener("click", () =>
      window.scrollTo({ top: 0, behavior: "smooth" })
    );
  }

  /* ---------- Custom cursor glow (pointer devices only) ---------- */
  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    const glow = document.getElementById("cursor-glow");
    if (glow) {
      let x = 0, y = 0, gx = 0, gy = 0;
      document.addEventListener("mousemove", (e) => {
        x = e.clientX;
        y = e.clientY;
      });
      const loop = () => {
        gx += (x - gx) * 0.18;
        gy += (y - gy) * 0.18;
        glow.style.transform = `translate(${gx}px, ${gy}px)`;
        requestAnimationFrame(loop);
      };
      loop();
    }
  }
})();
