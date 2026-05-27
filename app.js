// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// Live APK size, version & downloads from GitHub
fetch('https://api.github.com/repos/SibamDash/MadMoney/releases/latest')
  .then(r => r.json())
  .then(data => {
    if (data.tag_name) document.getElementById('apkVersion').textContent = 'Version ' + data.tag_name;
    const asset = data.assets && data.assets.find(a => a.name.endsWith('.apk'));
    if (asset) {
      document.getElementById('apkSize').textContent = (asset.size / 1048576).toFixed(1) + ' MB';
      const count = asset.download_count;
      const rounded = Math.floor(count / 10) * 10;
      document.getElementById('apkDownloads').textContent = (rounded > 0 ? rounded + '+' : count) + ' downloads';
    }
  })
  .catch(() => { document.getElementById('apkSize').textContent = '~18 MB'; });
const feedbackForm = document.querySelector('.feedback-form');
if (feedbackForm) {
  feedbackForm.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = feedbackForm.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Sending…';
    try {
      const res = await fetch(feedbackForm.action, {
        method: 'POST',
        body: new FormData(feedbackForm),
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        feedbackForm.reset();
        document.getElementById('feedbackSuccess').classList.add('show');
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch {
      alert('Network error. Please try again.');
    }
    btn.disabled = false;
    btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Send Feedback';
  });
}
