/* MAKHANAM – script.js
   Images: /images/makhana-*.png (cropped from your reference, all at the SAME scale,
   so display them at equal box sizes to keep the true relative sizes). */
const $ = id => document.getElementById(id);
const IMG = k => `images/makhana-${k}.png`;

// Spec values other than the 7+ row are placeholders – replace with your lab data.
const GRADES = [
  { 
    key: '7', 
    tag: 'GRADE 7 SUTA (SUPER JUMBO)', 
    badge: '7 Suta (21mm+)', 
    label: 'Handpicked Super', 
    size: '21mm+', 
    mm: 21, 
    gold: 0,
    name: 'Handpicked Super Premium Foxnut', 
    range: 'Greater than 21 mm', 
    count: '75 - 85 pieces', 
    moisture: '< 7.5%', 
    yield: '98% Fully Opened', 
    density: '65 - 70 g/L',
    usage: 'Top-tier export quality and specialty packaging.'
  },
  { 
    key: '6', 
    tag: 'GRADE 6+ SUTA (JUMBO)', 
    badge: '6+ Suta (19–26mm)', 
    label: 'Jumbo Export', 
    size: '19mm', 
    mm: 19, 
    gold: 1,
    name: '6+ Suta Jumbo Foxnut', 
    range: '19 – 26 mm', 
    count: '95 - 105 pieces', 
    moisture: '< 7.5%', 
    yield: '97% Fully Opened', 
    density: '68 - 73 g/L',
    usage: 'High-end gourmet markets, luxury gifting, and international exports.' 
  },
  { 
    key: '5', 
    tag: 'GRADE 5 SUTA (ROYAL)', 
    badge: '5 Suta (15.9–19mm)', 
    label: 'Premium Select', 
    size: '15.9mm', 
    mm: 15.9, 
    gold: 1,
    name: '5 Suta Royal Foxnut', 
    range: '15.9 – 19.0 mm', 
    count: '120 - 135 pieces', 
    moisture: '< 8%', 
    yield: '96% Fully Opened', 
    density: '72 - 77 g/L',
    usage: 'Premium retail packs, flavored makhana D2C brands, and snacking.' 
  },
  { 
    key: '4', 
    tag: 'GRADE 4 SUTA (CLASSIC)', 
    badge: '4 Suta (12.7–15.8mm)', 
    label: 'Standard Commercial', 
    size: '12.7mm', 
    mm: 12.7, 
    gold: 0,
    name: '4 Suta Classic Foxnut', 
    range: '12.7 – 15.8 mm', 
    count: '160 - 180 pieces', 
    moisture: '< 8%', 
    yield: '95% Fully Opened', 
    density: '76 - 82 g/L',
    usage: 'Everyday roasting, snacking, and household cooking.' 
  },
  { 
    key: 'medium', 
    tag: 'GRADE 3 SUTA (PEARL)', 
    badge: '3 Suta (9–12.7mm)', 
    label: 'Medium Processing', 
    size: '9mm', 
    mm: 9, 
    gold: 0,
    name: '3 Suta Pearl Foxnut', 
    range: '9 – 12.7 mm', 
    count: '220 - 250 pieces', 
    moisture: '< 8.5%', 
    yield: '93% Fully Opened', 
    density: '80 - 87 g/L',
    usage: 'Industrial processing, makhana flour, or sweets.' 
  },
  { 
    key: 'small', 
    tag: 'SMALL INDUSTRIAL', 
    badge: 'Small (<9mm)', 
    label: 'Small Industrial', 
    size: '<9mm', 
    mm: 8, 
    gold: 0,
    name: 'Small Industrial Foxnut', 
    range: 'Below 9 mm', 
    count: '300+ pieces', 
    moisture: '< 9%', 
    yield: '90% Fully Opened', 
    density: '88 - 96 g/L',
    usage: 'Makhana flour, powder, kheer and sweet-dish ingredients, and other further-processed products.' 
  }
];

let current = 0;

// ---------- Grade cards ----------
function renderGrid() {
  $('makhana-grid').innerHTML = GRADES.map((g, i) => `
    <button class="grade-card ${g.gold ? 'gold' : ''} ${i === current ? 'active' : ''}" data-i="${i}" aria-pressed="${i === current}">
      <span class="grade-pill">${g.badge}</span>
      <span class="grade-img"><img src="${IMG(g.key)}" alt="${g.label} makhana, ${g.size}" loading="lazy"></span>
      <span class="grade-name">${g.label}</span>
      <span class="grade-size">${g.size}</span>
    </button>`).join('');
  $('makhana-grid').querySelectorAll('.grade-card').forEach(b => b.onclick = () => selectGrade(+b.dataset.i));
}

function selectGrade(i) {
  current = i;
  const g = GRADES[i];
  document.querySelectorAll('.grade-card').forEach((b, n) => {
    b.classList.toggle('active', n === i); b.setAttribute('aria-pressed', n === i);
  });
  $('detail-grade-tag').textContent = g.tag;
  $('detail-name').textContent = g.name;
  $('detail-subtitle').textContent = `MM Size: ${g.range} | Millimeter Caliper Scaled`;
  $('detail-count').textContent = g.count;
  $('detail-moisture').textContent = g.moisture;
  $('detail-yield').textContent = g.yield;
  $('detail-density').textContent = g.density;
  $('detail-usage').textContent = g.usage;
  $('rfq-grade-name').textContent = 'Grade ' + (g.badge.split(' ')[0]);
  // Real photo instead of the CSS sphere. Image = ~28mm wide on the 0–30mm ruler.
  const s = $('detail-sphere');
  s.style.backgroundImage = `url(${IMG(g.key)})`;
  s.setAttribute('role', 'img'); s.setAttribute('aria-label', g.label + ' makhana');
  const line = document.querySelector('.diameter-line');
  line.style.width = (g.mm / 30 * 100) + '%';
  $('detail-diameter-label').textContent = g.range;
}

// ---------- Compare ----------
function toggleCompareMode() {
  const d = $('comparison-drawer');
  d.classList.toggle('hidden');
  if (!d.classList.contains('hidden')) {
    const opts = GRADES.map((g, i) => `<option value="${i}">${g.tag}</option>`).join('');
    $('compare-select-1').innerHTML = opts; $('compare-select-2').innerHTML = opts;
    $('compare-select-1').value = current; $('compare-select-2').value = (current + 1) % GRADES.length;
    updateComparison();
    d.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}
function updateComparison() {
  $('comparison-grid').innerHTML = [$('compare-select-1').value, $('compare-select-2').value].map(v => {
    const g = GRADES[v];
    return `<div class="compare-col">
      <div class="compare-img"><img src="${IMG(g.key)}" alt="${g.label}"></div>
      <h4>${g.label}</h4>
      <dl><dt>Size</dt><dd>${g.range}</dd><dt>Count / 100g</dt><dd>${g.count}</dd>
      <dt>Moisture</dt><dd>${g.moisture}</dd><dt>Popping yield</dt><dd>${g.yield}</dd>
      <dt>Bulk density</dt><dd>${g.density}</dd></dl></div>`;
  }).join('');
}

// ---------- Freight calculator ----------
const CBM = { '20ft': 33, '40ft': 76 };
const BAG = { '10kg': [10, 0.0995], '12.5kg': [12.5, 0.1244], '8kg': [8, 0.0796] }; // [kg, m³ per pack]
const GRADE_F = { '7': 1.08, '6': 1, '5': 0.94 };                                  // bigger nuts pack bulkier
function calculateFreight() {
  const [kg, vol0] = BAG[$('calc-bag-size').value];
  const vol = vol0 * GRADE_F[$('calc-grade').value];
  const total = CBM[$('calc-container-type').value];
  const bags = Math.floor(total * 0.95 / vol);
  $('res-bags').textContent = bags.toLocaleString() + ' Bags';
  $('res-weight').textContent = (bags * kg).toLocaleString() + ' KG';
  $('res-volume').textContent = (bags * vol / total * 100).toFixed(1) + '% CBM';
}

// ---------- RFQ modal ----------
function openRFQModal() { $('rfq-modal').classList.remove('hidden'); document.body.style.overflow = 'hidden'; }
function closeRFQModal() { $('rfq-modal').classList.add('hidden'); document.body.style.overflow = ''; }
function openRFQForGrade() {
  const k = GRADES[current].key;
  $('rfq-grade-select').value = ['7', '6', '5'].includes(k) ? k : 'all';
  openRFQModal();
}
function openRFQWithFreight() {
  $('rfq-grade-select').value = $('calc-grade').value;
  document.querySelector('#rfq-form textarea').value =
    `Load: ${$('calc-container-type').value} container, ${$('res-bags').textContent} (${$('res-weight').textContent}), ${$('calc-bag-size').selectedOptions[0].text}.`;
  openRFQModal();
}
function handleRFQSubmit(e) {
  e.preventDefault();
  $('rfq-form').innerHTML = '<p class="rfq-ok"><i class="fa-solid fa-circle-check"></i> Thank you. Our export team will reply within 24 hours.</p>';
}

// ---------- Init ----------
document.addEventListener('DOMContentLoaded', () => {
  renderGrid(); selectGrade(0); calculateFreight();
  $('mobile-toggle').onclick = () => $('nav-menu').classList.toggle('open');
  $('nav-menu').onclick = () => $('nav-menu').classList.remove('open');
  $('rfq-modal').onclick = e => { if (e.target.id === 'rfq-modal') closeRFQModal(); };
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeRFQModal(); });
  window.addEventListener('scroll', () => $('navbar').classList.toggle('scrolled', scrollY > 30), { passive: true });
});
