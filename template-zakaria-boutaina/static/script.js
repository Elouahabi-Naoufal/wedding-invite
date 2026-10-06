(function () {
  const seal = document.getElementById('seal');
  const envelope = document.getElementById('envelope');
  const invite = document.getElementById('invite');
  const audio = document.getElementById('ayah-audio');
  const toggle = document.getElementById('audio-toggle');

  seal.addEventListener('click', () => {
    audio.play().catch(() => {});
    envelope.style.opacity = '0';
    setTimeout(() => {
      envelope.remove();
      invite.hidden = false;
      toggle.hidden = false;
    }, 800);
  });

  toggle.addEventListener('click', () => {
    if (audio.paused) { audio.play(); toggle.textContent = '🔊'; }
    else { audio.pause(); toggle.textContent = '🔇'; }
  });

  const target = new Date(window.WEDDING_DATE).getTime();
  function tick() {
    const diff = target - Date.now();
    if (diff <= 0) {
      ['cd-days','cd-hours','cd-mins','cd-secs'].forEach(id => document.getElementById(id).textContent = '0');
      return;
    }
    const d = Math.floor(diff / 864e5);
    const h = Math.floor(diff / 36e5) % 24;
    const m = Math.floor(diff / 6e4) % 60;
    const s = Math.floor(diff / 1e3) % 60;
    document.getElementById('cd-days').textContent = d;
    document.getElementById('cd-hours').textContent = h;
    document.getElementById('cd-mins').textContent = m;
    document.getElementById('cd-secs').textContent = s;
  }
  tick(); setInterval(tick, 1000);

  document.getElementById('copy-rib').addEventListener('click', async () => {
    await navigator.clipboard.writeText(document.getElementById('rib').textContent.trim());
    document.getElementById('copy-rib').textContent = 'تم النسخ ✓';
  });

  const wa = document.getElementById('wa-share');
  wa.href = 'https://wa.me/?text=' + encodeURIComponent(location.href);

  const form = document.getElementById('rsvp-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const res = await fetch('/api/rsvp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        guest_name: data.get('guest_name'),
        attending: data.get('attending'),
        companion: data.get('companion'),
        seats: data.get('seats'),
        transport: data.get('transport'),
        dietary: data.get('dietary'),
        message: data.get('message'),
      }),
    });
    const msg = document.getElementById('rsvp-msg');
    if (res.ok) { msg.textContent = 'شكراً! تم تسجيل ردكم ✅'; form.reset(); }
    else { const j = await res.json(); msg.textContent = j.error || 'حدث خطأ'; }
  });
})();
