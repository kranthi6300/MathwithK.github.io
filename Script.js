/* ════════════════════════════════════════════
   MATHVAULT — SCRIPT.JS
   Navigation + PDF Modal Logic
════════════════════════════════════════════ */

// ── PDF LINKS CONFIG ──────────────────────────────
// Replace "#" values with your actual GitHub-hosted PDF URLs.
// Example: 'https://yourusername.github.io/your-repo/pdfs/class6.pdf'
const pdfLinks = {
  'foundation': {
    'Class 6':  '#',
    'Class 7':  '#',
    'Class 8':  '#',
    'Class 9':  '#',
    'Class 10': '#',
  },
  'concept': {
    'Concept Type 1': 'https://raw.githubusercontent.com/kranthi6300/MathwithK.github.io/main/All%20maths%20concepts%20arihant%20.pdf',
    'Concept Type 2': '#',
    'Concept Type 3': '#',
    'Concept Type 4': '#',
    'Concept Type 5': '#',
    'Concept Type 6': '#',
  },
  'pyq': {
    'JEE PYQs':    '#',
    'EAMCET PYQs': '#',
    'BITSAT PYQs': '#',
  },
  'tricks': {
    'Functions':               '#',
    'Mathematical Induction':  '#',
    'Matrices & Determinants': '#',
  },
  'mindmap': {
    'Mind Map Collection': '#',
  },
  'handbook': {
    'Handbook 1': '#',
    'Handbook 2': '#',
    'Handbook 3': '#',
    'Handbook 4': '#',
  },
};

// ── PAGE NAVIGATION ───────────────────────────────
function navigate(pageId) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => {
    p.classList.remove('active');
  });

  // Show target page
  const target = document.getElementById(pageId);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// ── PDF MODAL ─────────────────────────────────────
function openPDF(section, item) {
  const modal    = document.getElementById('pdf-modal');
  const title    = document.getElementById('modal-title');
  const desc     = document.getElementById('modal-desc');
  const linkBtn  = document.getElementById('modal-link');

  const url = (pdfLinks[section] && pdfLinks[section][item]) || '#';

  title.textContent = item;

  if (url === '#') {
    desc.innerHTML = `
      <strong style="color: var(--gold-light)">${item}</strong> PDF is not linked yet.<br><br>
      To add this PDF: open <code>script.js</code>, find the <code>pdfLinks</code> object,
      and replace the <code>"#"</code> for <strong>${item}</strong> with your GitHub-hosted PDF URL.
    `;
    linkBtn.textContent = 'No PDF linked yet';
    linkBtn.style.opacity = '0.5';
    linkBtn.style.pointerEvents = 'none';
    linkBtn.href = '#';
  } else {
    desc.innerHTML = `Opening <strong style="color: var(--gold-light)">${item}</strong>. Click below to read.`;
    linkBtn.textContent = `Open "${item}" PDF →`;
    linkBtn.style.opacity = '1';
    linkBtn.style.pointerEvents = 'auto';
    linkBtn.href = url;
  }

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closePDFModal() {
  document.getElementById('pdf-modal').classList.remove('open');
  document.body.style.overflow = '';
}

function closeModal(event) {
  // Close only if clicking on the overlay itself (not modal box)
  if (event.target.id === 'pdf-modal') {
    closePDFModal();
  }
}

// ── KEYBOARD: ESC closes modal ────────────────────
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closePDFModal();
});

// ── INIT ──────────────────────────────────────────
// Start on landing page
document.addEventListener('DOMContentLoaded', () => {
  navigate('page-landing');
});
