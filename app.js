// PartyRent By Jan — JS minimal

// Mobile nav toggle
(function () {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }
})();

// Footer year
document.getElementById('year')?.append(new Date().getFullYear());

// Contact form: build mailto link and open client
(function () {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const qp = new URLSearchParams(window.location.search);
  const preset = qp.get('oferta');
  if (preset) {
    const pachet = document.getElementById('pachet');
    if (pachet) pachet.value = preset;
  }

  function buildSummary(values) {
    const lines = [
      `Nume: ${values.nume}`,
      `Telefon: ${values.telefon}`,
      `Email: ${values.email}`,
      `Data: ${values.data || '-'}`,
      `Locație: ${values.locatie || '-'}`,
      `Pachet: ${values.pachet || '-'}`,
      `Detalii: ${values.mesaj || '-'}`,
    ];
    return lines.join('\n');
  }

  function getValues() {
    const f = form;
    return {
      nume: f.nume.value.trim(),
      telefon: f.telefon.value.trim(),
      email: f.email.value.trim(),
      data: f.data.value,
      locatie: f.locatie.value.trim(),
      pachet: f.pachet.value.trim(),
      mesaj: f.mesaj.value.trim(),
    };
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const v = getValues();
    const subject = encodeURIComponent('Cerere oferta — PartyRent By Jan');
    const body = encodeURIComponent(buildSummary(v));
    // TODO: set real email below
    const email = document.getElementById('mail-link')?.getAttribute('href')?.replace('mailto:', '') || 'contact@partyrentbyjan.ro';
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  });

  document.getElementById('copy-summary')?.addEventListener('click', async () => {
    const v = getValues();
    const text = buildSummary(v);
    try {
      await navigator.clipboard.writeText(text);
      alert('Sumar copiat în clipboard');
    } catch {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = text; document.body.appendChild(ta); ta.select();
      document.execCommand('copy'); document.body.removeChild(ta);
      alert('Sumar copiat (fallback)');
    }
  });
})();

// Placeholders for phone/WhatsApp links: replace with real number
(function () {
  const tel = '+407xxxxxxxx'; // TODO: înlocuiește cu număr real
  const telLink = document.getElementById('tel-link');
  const waLink = document.getElementById('wa-link');
  const footerTel = document.getElementById('footer-tel');
  if (telLink) telLink.href = `tel:${tel}`;
  if (waLink) waLink.href = `https://wa.me/${tel.replace(/\D/g,'')}`;
  if (footerTel) footerTel.href = `tel:${tel}`;
})();