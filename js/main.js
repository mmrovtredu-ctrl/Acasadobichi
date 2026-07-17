/* =========================================================
   A CASA DO BICHO — main.js
   Dados (config) separados da lógica: edite só o bloco
   CONFIG abaixo para trocar unidades, telefones e textos.
   ========================================================= */
"use strict";

/* ---------- CONFIG (dados do cliente) ---------- */
const CONFIG = {
  unidades: [
    {
      id: "olegario",
      nome: "Unidade Olegário",
      bairro: "Recreio dos Bandeirantes",
      fixo: "(21) 2492-5153",
      whatsappLabel: "(21) 98578-3707",
      whatsapp: "5521985783707",
    },
    {
      id: "americas",
      nome: "Unidade Américas",
      bairro: "Av. das Américas",
      fixo: "(21) 2498-3080",
      whatsappLabel: "(21) 98578-3708",
      whatsapp: "5521985783708",
    },
    {
      id: "glaucio-gil",
      nome: "Unidade Glaucio Gil",
      bairro: "Recreio dos Bandeirantes",
      fixo: null,
      whatsappLabel: "(21) 98661-5555",
      whatsapp: "5521986615555",
    },
    {
      id: "recreio-shopping",
      nome: "Unidade Recreio Shopping",
      bairro: "Recreio Shopping",
      fixo: null,
      whatsappLabel: "(21) 98555-4901",
      whatsapp: "5521985554901",
    },
  ],
};

/* ---------- Helpers ---------- */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

document.documentElement.classList.add("js");

/* ---------- Menu mobile ---------- */
(function initMenu() {
  const toggle = $("#menuToggle");
  const nav = $("#menuNav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  });

  // Fecha o menu ao clicar num link (navegação por âncora)
  $$("a", nav).forEach((link) =>
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    })
  );
})();

/* ---------- Render das unidades (cards + select) ---------- */
(function renderUnits() {
  const grid = $("#unitsGrid");
  const select = $("#fUnidade");
  if (!grid) return;

  CONFIG.unidades.forEach((u) => {
    const card = document.createElement("article");
    card.className = "card unit";
    card.innerHTML = `
      <h3>${u.nome}</h3>
      <p class="unit__addr">${u.bairro} · Rio de Janeiro/RJ</p>
      <ul class="unit__phones">
        ${u.fixo ? `<li>Fixo: ${u.fixo}</li>` : ""}
        <li>WhatsApp: ${u.whatsappLabel}</li>
      </ul>
      <a class="btn" href="https://wa.me/${u.whatsapp}?text=${encodeURIComponent(
        `Olá! Vim pelo site e quero agendar um horário na ${u.nome}. 🐾`
      )}" target="_blank" rel="noopener">Chamar no WhatsApp</a>
    `;
    grid.appendChild(card);

    if (select) {
      const opt = document.createElement("option");
      opt.value = u.id;
      opt.textContent = u.nome;
      select.appendChild(opt);
    }
  });
})();

/* ---------- Formulário → WhatsApp ---------- */
(function initForm() {
  const form = $("#bookingForm");
  if (!form) return;

  const okMsg = $("#formOk");

  const setError = (input, message) => {
    const field = input.closest(".form__field");
    field.classList.toggle("has-error", Boolean(message));
    field.querySelector(".form__error").textContent = message || "";
  };

  const validators = {
    nome: (v) => (v.trim().length >= 2 ? "" : "Digite seu nome."),
    whatsapp: (v) =>
      v.replace(/\D/g, "").length >= 10 ? "" : "Digite um WhatsApp válido com DDD.",
    pet: (v) => (v.trim().length >= 1 ? "" : "Digite o nome do pet."),
    servico: (v) => (v ? "" : "Escolha o serviço."),
    unidade: (v) => (v ? "" : "Escolha a unidade."),
  };

  // Validação ao sair do campo (feedback cedo, sem ser chato)
  $$("input, select", form).forEach((el) =>
    el.addEventListener("blur", () => setError(el, validators[el.name](el.value)))
  );

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    let firstInvalid = null;
    $$("input, select", form).forEach((el) => {
      const message = validators[el.name](el.value);
      setError(el, message);
      if (message && !firstInvalid) firstInvalid = el;
    });

    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    const data = Object.fromEntries(new FormData(form));
    const unidade = CONFIG.unidades.find((u) => u.id === data.unidade);
    if (!unidade) return;

    const texto = [
      "Olá! Vim pelo site e quero agendar. 🐾",
      `*Nome:* ${data.nome.trim()}`,
      `*WhatsApp:* ${data.whatsapp.trim()}`,
      `*Pet:* ${data.pet.trim()}`,
      `*Serviço:* ${data.servico}`,
      `*Unidade:* ${unidade.nome}`,
    ].join("\n");

    okMsg.hidden = false;

    window.open(
      `https://wa.me/${unidade.whatsapp}?text=${encodeURIComponent(texto)}`,
      "_blank",
      "noopener"
    );
  });
})();

/* ---------- Reveal on scroll (leve, respeita reduced-motion) ---------- */
(function initReveal() {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const targets = $$(".card, .review, .checklist li");
  if (reduced || !("IntersectionObserver" in window)) return;

  targets.forEach((el) => el.classList.add("reveal"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  targets.forEach((el) => observer.observe(el));
})();

/* ---------- Ano do rodapé ---------- */
(function setYear() {
  const el = $("#year");
  if (el) el.textContent = new Date().getFullYear();
})();
