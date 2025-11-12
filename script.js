// Kelo Web Tools - Thumbnail Grabber script
document.getElementById('year').textContent = new Date().getFullYear();
const fetchBtn = document.getElementById('fetchBtn');
const clearBtn = document.getElementById('clearBtn');
const videoUrlInput = document.getElementById('videoUrl');
const resultSection = document.getElementById('resultSection');
const thumbGrid = document.getElementById('thumbGrid');

function extractYouTubeID(url){
  try {
    url = url.trim();
    if (!url) return null;
    // If user directly inputs an ID
    if (/^[A-Za-z0-9_-]{11}$/.test(url)) return url;
    // Parse URL robustly
    let u = new URL(url.startsWith('http') ? url : 'https://' + url);
    // youtube.com/watch?v=...
    if (u.hostname.match(/(youtube\\.com|www\\.youtube\\.com)$/i)){
      return u.searchParams.get('v');
    }
    // youtu.be/VIDEO_ID
    if (u.hostname === 'youtu.be'){
      return u.pathname.slice(1);
    }
    // embed paths or other slugs
    let parts = u.pathname.split('/');
    for (let p of parts){
      if (/^[A-Za-z0-9_-]{11}$/.test(p)) return p;
    }
    return null;
  } catch (e){
    // fallback regex
    const m = url.match(/[A-Za-z0-9_-]{11}/);
    return m ? m[0] : null;
  }
}

function createThumbCards(id){
  // common YouTube thumbnail filenames
  const candidates = [
    {key:'maxresdefault', name:'Max Resolution'},
    {key:'sddefault', name:'SD Default'},
    {key:'hqdefault', name:'HQ Default'},
    {key:'mqdefault', name:'MQ Default'},
    {key:'default', name:'Default'}
  ];
  thumbGrid.innerHTML = '';
  candidates.forEach(c => {
    const url = `https://img.youtube.com/vi/${id}/${c.key}.jpg`;
    const card = document.createElement('div');
    card.className = 'thumb-card';
    const img = document.createElement('img');
    img.src = url;
    img.alt = c.name;
    const meta = document.createElement('div');
    meta.className = 'meta';
    meta.textContent = c.name;
    const open = document.createElement('a');
    open.href = url;
    open.target = '_blank';
    open.rel = 'noopener noreferrer';
    open.className = 'download';
    open.textContent = 'Open / Download';
    card.appendChild(img);
    card.appendChild(meta);
    card.appendChild(open);
    thumbGrid.appendChild(card);

    // if image not available, show placeholder and dim link
    img.onerror = function(){
      img.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360"><rect width="100%" height="100%" fill="%23f3f6fb"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%236b7280" font-size="20">Not available</text></svg>';
      open.style.opacity = '0.6';
      // Optionally disable the link if the image is truly unavailable
      // open.style.pointerEvents = 'none';
      // open.removeAttribute('href');
    }
  });
  resultSection.classList.remove('hidden');
  resultSection.scrollIntoView({behavior:'smooth'});
}

// Event listeners
fetchBtn.addEventListener('click', () => {
  const url = videoUrlInput.value || '';
  const id = extractYouTubeID(url);
  if (!id){
    alert('Please enter a valid YouTube video URL or ID.');
    return;
  }
  createThumbCards(id);
});

clearBtn.addEventListener('click', () => {
  videoUrlInput.value = '';
  thumbGrid.innerHTML = '';
  resultSection.classList.add('hidden');
});

// allow Enter to trigger fetch
videoUrlInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') fetchBtn.click();
});
