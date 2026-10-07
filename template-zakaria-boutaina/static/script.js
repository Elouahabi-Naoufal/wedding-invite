(function () {
  const seal = document.getElementById('seal');
  const envelope = document.getElementById('envelope');
  const invite = document.getElementById('invite');
  const audio = document.getElementById('ayah-audio');
  const toggle = document.getElementById('audio-toggle');

  // Envelope opening
  seal.addEventListener('click', () => {
    audio.play().catch(() => {});
    // Add opening animation
    document.querySelector('.envelope').classList.add('opening');
    // Wait for animation then fade out
    setTimeout(() => {
      envelope.style.opacity = '0';
      setTimeout(() => {
        envelope.remove();
        invite.hidden = false;
        toggle.hidden = false;
        // Trigger scroll animations
        initScrollAnimations();
      }, 1000);
    }, 800);
  });

  // Audio toggle
  toggle.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
      toggle.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24"><path d="M3,9v6h4l5,5V4L7,9H3z M16.5,12c0-1.77-1.02-3.29-2.5-4.03v8.05C15.48,15.29 16.5,13.77 16.5,12z" fill="#FFFAFA"/></svg>';
    } else {
      audio.pause();
      toggle.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24"><path d="M16.5,12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45,2.45C16.45,12.42 16.5,12.21 16.5,12z M19,12c0,0.94-0.2,1.82-0.54,2.64l1.51,1.51C20.63,14.91 21,13.5 21,12c0-4.28-2.99-7.86-7-8.77v2.06c2.89,0.86 5,3.54 5,6.71zM4.27,3L3,4.27L7.73,9H3v6h4l5,5v-6.73l4.25,4.25c-0.67,0.52-1.42,0.93-2.25,1.18v2.06c1.38,-0.31 2.63,-0.95 3.69,-1.81L19.73,21L21,19.73l-9,-9L4.27,3zM12,4L9.91,6.09L12,8.18V4z" fill="#FFFAFA"/></svg>';
    }
  });

  // Countdown
  const target = new Date(window.WEDDING_DATE).getTime();
  function tick() {
    const diff = target - Date.now();
    if (diff <= 0) {
      ['cd-days','cd-hours','cd-mins','cd-secs'].forEach(id => {
        document.getElementById(id).textContent = '0';
      });
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
  tick();
  setInterval(tick, 1000);

  // Scroll animations
  function initScrollAnimations() {
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });

    sections.forEach(section => {
      section.style.opacity = '0';
      section.style.transform = 'translateY(30px)';
      section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      observer.observe(section);
    });
  }

  // RSVP form
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
        message: data.get('message'),
      }),
    });
    const msg = document.getElementById('rsvp-msg');
    if (res.ok) {
      msg.textContent = 'شكراً! تم تسجيل ردكم ✅';
      form.reset();
    } else {
      const j = await res.json();
      msg.textContent = j.error || 'حدث خطأ';
    }
  });

  // WhatsApp share
  const wa = document.getElementById('wa-share');
  wa.href = 'https://wa.me/?text=' + encodeURIComponent(location.href);
})();
