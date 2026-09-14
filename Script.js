const pdfLinks = {
  concept: {
    '1': 'https://kranthi6300.github.io/MathwithK.github.io/All%20maths%20concepts%20arihant%20.pdf',
    'Concept Type 1': 'https://github.com/kranthi6300/MathwithK.github.io/main/All%20maths%20concepts%20arihant%20.pdf.pdf'
  }
};

function navigate(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const p = document.getElementById(id);
  if (p) p.classList.add('active');
  window.scrollTo(0, 0);
}

function openPDF(s, i) {
  const u = pdfLinks[s]?.[i];
  const m = document.getElementById('pdf-modal');
  if (!m) return;

  const titleEl = document.getElementById('modal-title');
  const descEl = document.getElementById('modal-desc');
  const btnEl = document.getElementById('modal-link');

  if (titleEl) titleEl.textContent = i;

  if (u && u !== '#') {
    // Embed Mozilla PDF viewer to render pages directly on mobile browsers
    const viewerUrl = `https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodeURIComponent(u)}`;
    
    if (descEl) {
      descEl.innerHTML = `
        <iframe 
          src="${viewerUrl}" 
          style="width: 100%; height: 65vh; border: none; border-radius: 8px; margin-top: 10px;" 
          allowfullscreen>
        </iframe>
      `;
    }

    if (btnEl) {
      btnEl.href = viewerUrl;
      btnEl.textContent = `Open Fullscreen Viewer ↗`;
      btnEl.target = '_blank';
      btnEl.style.display = 'inline-block';
    }
  } else {
    if (descEl) descEl.textContent = 'PDF not linked yet.';
    if (btnEl) {
      btnEl.href = '#';
      btnEl.textContent = 'No PDF linked yet';
      btnEl.removeAttribute('target');
      btnEl.style.display = 'inline-block';
    }
  }

  m.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closePDFModal() {
  const m = document.getElementById('pdf-modal');
  if (m) m.classList.remove('open');
  document.body.style.overflow = '';
  // Clear iframe on close to stop background rendering
  const descEl = document.getElementById('modal-desc');
  if (descEl) descEl.innerHTML = '';
}

function closeModal(e) {
  if (e.target.id === 'pdf-modal') closePDFModal();
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closePDFModal();
});

let supabaseClient = null;

async function initMathWithK() {
  const c = window.MATH_WITH_K_SUPABASE;
  if (!c || c.publishableKey.includes('PASTE_') || !window.supabase) return;
  supabaseClient = window.supabase.createClient(c.url, c.publishableKey);
  const { data: { session } } = await supabaseClient.auth.getSession();
  updateAuthUI(session);
  supabaseClient.auth.onAuthStateChange((_, s) => updateAuthUI(s));
}

function updateAuthUI(s) {
  document.querySelectorAll('[data-auth-email]').forEach(e => e.textContent = s?.user?.email || 'Guest');
  document.querySelectorAll('[data-auth-only]').forEach(e => e.hidden = !s);
}

async function signUp(e, p) {
  if (!supabaseClient) return alert('Add your Supabase publishable key in supabase-config.js first.');
  const { error } = await supabaseClient.auth.signUp({ email: e, password: p });
  alert(error ? error.message : 'Account created. Check email if confirmation is enabled.');
}

async function signIn(e, p) {
  if (!supabaseClient) return alert('Add your Supabase publishable key in supabase-config.js first.');
  const { error } = await supabaseClient.auth.signInWithPassword({ email: e, password: p });
  if (error) alert(error.message);
}

async function signOut() {
  if (supabaseClient) await supabaseClient.auth.signOut();
}

async function listMaterials() {
  if (!supabaseClient) return [];
  const { data, error } = await supabaseClient.from('materials').select('*').order('created_at', { ascending: false });
  if (error) {
    console.error(error);
    return [];
  }
  return data || [];
}

document.addEventListener('DOMContentLoaded', () => {
  navigate('page-landing');
  initMathWithK();
});
