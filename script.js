/* ============================================
   HOLD LIVE — данные магазина
   Замени emoji на реальные <img src="..."> когда будут фото товаров
   ============================================ */

/* Филиалы — фото галерея. Когда появятся реальные фото, добавь пути в массив
   photos у нужного филиала (можно несколько — стрелки появятся сами). */
const BRANCHES = [
  { address: 'пр-т Чуй 140',                          photos: ['images/branches/chuy-1.jpg'] },
  { address: 'Бета Сторес 2, 1-этаж, 132 бутик',       photos: ['images/branches/beta-1.jpg'] },
  { address: 'ЦУМ 2, 2 этаж, 228 бутик',               photos: ['images/branches/tsum-1.jpg', 'images/branches/tsum-2.webp'] },
  { address: 'ул. Чынгыза Айтматова 80',               photos: ['images/branches/aitmatova-1.jpg'] },
];

let activeBranch = 0;
let activeBranchPhoto = 0;

function renderBranches(){
  const list = document.getElementById('branchList');
  const whatsappBtn = list.querySelector('.branches__whatsapp');

  list.querySelectorAll('.branch-item').forEach(el => el.remove());

  BRANCHES.forEach((b, i) => {
    const btn = document.createElement('button');
    btn.className = 'branch-item' + (i === activeBranch ? ' is-active' : '');
    btn.innerHTML = `<span class="branch-item__icon">📍</span><span>${b.address}</span>`;
    btn.addEventListener('click', () => {
      activeBranch = i;
      activeBranchPhoto = 0;
      renderBranches();
      updateBranchPhoto();
    });
    list.insertBefore(btn, whatsappBtn);
  });
}

function updateBranchPhoto(){
  const branch = BRANCHES[activeBranch];
  const photo = branch.photos[activeBranchPhoto];
  const img = document.getElementById('branchPhotoImg');
  const fallback = document.getElementById('branchPhotoFallback');
  const caption = document.getElementById('branchPhotoCaption');
  const prevBtn = document.getElementById('branchPrev');
  const nextBtn = document.getElementById('branchNext');
  const dots = document.getElementById('branchDots');

  caption.textContent = `Фото филиала «${branch.address}» скоро будет здесь`;

  img.onerror = () => { img.style.display = 'none'; fallback.style.display = 'flex'; };
  img.onload = () => { img.style.display = 'block'; fallback.style.display = 'none'; };
  img.src = photo;

  const hasMultiple = branch.photos.length > 1;
  prevBtn.style.display = hasMultiple ? 'flex' : 'none';
  nextBtn.style.display = hasMultiple ? 'flex' : 'none';

  dots.innerHTML = hasMultiple
    ? branch.photos.map((_, i) => `<span class="branches__dot ${i === activeBranchPhoto ? 'is-active' : ''}" data-i="${i}"></span>`).join('')
    : '';
  dots.querySelectorAll('.branches__dot').forEach(dot => {
    dot.addEventListener('click', () => {
      activeBranchPhoto = Number(dot.dataset.i);
      updateBranchPhoto();
    });
  });
}

document.getElementById('branchPrev').addEventListener('click', () => {
  const branch = BRANCHES[activeBranch];
  activeBranchPhoto = (activeBranchPhoto - 1 + branch.photos.length) % branch.photos.length;
  updateBranchPhoto();
});
document.getElementById('branchNext').addEventListener('click', () => {
  const branch = BRANCHES[activeBranch];
  activeBranchPhoto = (activeBranchPhoto + 1) % branch.photos.length;
  updateBranchPhoto();
});

const CATEGORIES = [
  { id: 'foundation', label: 'Тональные средства', icon: '🧴' },
  { id: 'cushion',    label: 'Кушоны',              icon: '🌸' },
  { id: 'powder',     label: 'Пудры',                icon: '✨' },
  { id: 'blush',      label: 'Румяна',                icon: '🌷' },
  { id: 'highlighter',label: 'Хайлайтеры',            icon: '💫' },
  { id: 'lipstick',   label: 'Помады',                icon: '💄' },
  { id: 'mascara',    label: 'Тушь',                  icon: '🖤' },
  { id: 'palette',    label: 'Палетки',                icon: '🎨' },
  { id: 'cleansing',  label: 'Очищение',              icon: '🧼' },
  { id: 'serum',      label: 'Сыворотки',             icon: '💧' },
  { id: 'toner',      label: 'Тонеры',                icon: '💦' },
  { id: 'mask',       label: 'Маски',                 icon: '🌿' },
  { id: 'cream',      label: 'Кремы',                 icon: '🧴' },
  { id: 'sun',        label: 'СПФ',                   icon: '☀️' },
  { id: 'set',        label: 'Наборы',                icon: '🎁' },
];

/* ============================================
   НАЛИЧИЕ ПО ФИЛИАЛАМ
   Чтобы показать наличие, добавьте товар в STOCK. Порядок филиалов:
     chuy — пр-т Чуй 140, beta — Бета Сторес, tsum — ЦУМ, aitmatova — Айтматова 80
   Значения:  число (например 5) — «в наличии, 5 шт»;  true — «в наличии» (без числа);
              0 или false — «нет в наличии».
   Если все филиалы = 0/false, на карточке будет «Нет в наличии», кнопка «+» отключится.
   Товары, которых нет в STOCK, считаются «В наличии» (как раньше).
   Пример:  p12: { chuy:5, beta:0, tsum:2, aitmatova:true },
   ============================================ */
const BRANCH_KEYS = ['chuy', 'beta', 'tsum', 'aitmatova'];
// ⚠ ПРИМЕРНЫЕ ЦИФРЫ — замените на реальные остатки перед публикацией
const STOCK = {
  p1: { chuy:4, beta:1, tsum:5, aitmatova:12 },
  p2: { chuy:0, beta:0, tsum:8, aitmatova:0 },
  p3: { chuy:4, beta:10, tsum:0, aitmatova:8 },
  p4: { chuy:2, beta:0, tsum:0, aitmatova:5 },
  p5: { chuy:0, beta:0, tsum:0, aitmatova:0 },
  p6: { chuy:8, beta:5, tsum:0, aitmatova:10 },
  p7: { chuy:0, beta:2, tsum:12, aitmatova:12 },
  p8: { chuy:10, beta:0, tsum:10, aitmatova:10 },
  p9: { chuy:5, beta:0, tsum:2, aitmatova:0 },
  p10: { chuy:8, beta:1, tsum:3, aitmatova:5 },
  p11: { chuy:1, beta:8, tsum:0, aitmatova:10 },
  p12: { chuy:3, beta:8, tsum:12, aitmatova:1 },
  p13: { chuy:0, beta:10, tsum:10, aitmatova:12 },
  p14: { chuy:2, beta:4, tsum:0, aitmatova:8 },
  p15: { chuy:0, beta:10, tsum:0, aitmatova:10 },
  p16: { chuy:2, beta:6, tsum:12, aitmatova:8 },
  p17: { chuy:5, beta:4, tsum:6, aitmatova:10 },
  p18: { chuy:6, beta:4, tsum:3, aitmatova:2 },
  p19: { chuy:1, beta:2, tsum:0, aitmatova:10 },
  p20: { chuy:3, beta:8, tsum:6, aitmatova:4 },
  p21: { chuy:6, beta:3, tsum:10, aitmatova:0 },
  p22: { chuy:0, beta:8, tsum:5, aitmatova:1 },
  p23: { chuy:4, beta:1, tsum:6, aitmatova:5 },
  p24: { chuy:0, beta:12, tsum:0, aitmatova:8 },
  p25: { chuy:10, beta:4, tsum:4, aitmatova:4 },
  p26: { chuy:10, beta:6, tsum:10, aitmatova:6 },
  p27: { chuy:0, beta:0, tsum:3, aitmatova:6 },
  p28: { chuy:12, beta:0, tsum:0, aitmatova:3 },
  p29: { chuy:12, beta:10, tsum:12, aitmatova:6 },
  p30: { chuy:3, beta:5, tsum:12, aitmatova:4 },
  p31: { chuy:0, beta:6, tsum:4, aitmatova:1 },
  p32: { chuy:10, beta:0, tsum:6, aitmatova:0 },
  p33: { chuy:2, beta:3, tsum:1, aitmatova:2 },
  p34: { chuy:5, beta:5, tsum:6, aitmatova:0 },
  p35: { chuy:1, beta:6, tsum:5, aitmatova:8 },
  p36: { chuy:3, beta:1, tsum:5, aitmatova:8 },
  p37: { chuy:3, beta:5, tsum:4, aitmatova:12 },
  p38: { chuy:5, beta:2, tsum:1, aitmatova:0 },
  p39: { chuy:1, beta:1, tsum:2, aitmatova:12 },
  p40: { chuy:2, beta:0, tsum:6, aitmatova:10 },
  p41: { chuy:1, beta:3, tsum:3, aitmatova:0 },
  p42: { chuy:1, beta:5, tsum:8, aitmatova:4 },
  p43: { chuy:10, beta:10, tsum:4, aitmatova:1 },
  p44: { chuy:8, beta:10, tsum:12, aitmatova:12 },
  p45: { chuy:true, beta:true, tsum:true, aitmatova:false },
  p46: { chuy:0, beta:6, tsum:12, aitmatova:8 },
  p47: { chuy:5, beta:5, tsum:5, aitmatova:5 },
  p48: { chuy:0, beta:6, tsum:12, aitmatova:5 },
  p49: { chuy:0, beta:2, tsum:0, aitmatova:2 },
  p50: { chuy:6, beta:1, tsum:0, aitmatova:4 },
  p51: { chuy:10, beta:0, tsum:0, aitmatova:0 },
};

// [{address, qty}] qty: число | null (есть, количество не указано) | 0 (нет); или null, если для товара наличие не задано
function branchStock(p){
  const s = STOCK[p.id];
  if (!s) return null;
  const rows = [];
  BRANCH_KEYS.forEach((k, i) => {
    if (!(k in s) || !BRANCHES[i]) return;
    const v = s[k];
    rows.push({ address: BRANCHES[i].address, qty: typeof v === 'number' ? v : (v ? null : 0) });
  });
  return rows.length ? rows : null;
}
// 'all' | 'some' | 'none' | 'unknown'
function stockLevel(p){
  const rows = branchStock(p);
  if (!rows) return p.stock === false ? 'none' : 'unknown';
  const n = rows.filter(r => r.qty !== 0).length;
  return n === rows.length ? 'all' : (n === 0 ? 'none' : 'some');
}
const STOCK_TEXT = { all:'✓ В наличии во всех филиалах', some:'● В наличии в некоторых филиалах', none:'Нет в наличии', unknown:'✓ В наличии' };
function stockTotalLabel(p){
  const rows = branchStock(p);
  if (!rows || rows.some(r => r.qty === null)) return '';
  const t = rows.reduce((a, r) => a + r.qty, 0);
  return t > 0 ? ` · ${t} шт` : '';
}
function isInStock(p){
  const rows = branchStock(p);
  return rows ? rows.some(r => r.qty !== 0) : p.stock !== false;
}

const PRODUCTS = [
  { id:'p1', name:'Стойкий тональный крем Fit Me',     cat:'foundation',  price:1450, oldPrice:null, icon:'🧴', tag:'new',  stock:true },
  { id:'p2', name:'Матовая тональная основа Air Fit',   cat:'foundation',  price:1690, oldPrice:1950, icon:'🧴', tag:'sale', stock:true },
  { id:'p3', name:'Кушон Torriden Dive In',              cat:'cushion',     price:1980, oldPrice:null, icon:'🌸', tag:'new',  stock:true },
  { id:'p4', name:'Увлажняющий кушон Glow Skin',         cat:'cushion',     price:1750, oldPrice:null, icon:'🌸', tag:null,   stock:true },
  { id:'p5', name:'Компактная пудра Silk Touch',         cat:'powder',      price:980,  oldPrice:null, icon:'✨', tag:null,   stock:true },
  { id:'p6', name:'Рассыпчатая пудра Baking Soft',       cat:'powder',      price:1120, oldPrice:1350, icon:'✨', tag:'sale', stock:true },
  { id:'p7', name:'Румяна-суфле Peach Cloud',            cat:'blush',       price:890,  oldPrice:null, icon:'🌷', tag:'new',  stock:true },
  { id:'p8', name:'Кремовые румяна Rosy Tint',           cat:'blush',       price:820,  oldPrice:null, icon:'🌷', tag:null,   stock:true },
  { id:'p9', name:'Хайлайтер Moon Glow',                 cat:'highlighter', price:1050, oldPrice:null, icon:'💫', tag:null,   stock:true },
  { id:'p10',name:'Жидкий хайлайтер Liquid Light',       cat:'highlighter', price:1180, oldPrice:1400, icon:'💫', tag:'sale', stock:true },
  { id:'p11',name:'Матовая помада Velvet Rouge',         cat:'lipstick',    price:760,  oldPrice:null, icon:'💄', tag:null,   stock:true },
  { id:'p12',name:'Тинт для губ Berry Stain',            cat:'lipstick',    price:640,  oldPrice:null, icon:'💄', tag:'new',  stock:true },
  { id:'p13',name:'Тушь для объёма Volume Boost',        cat:'mascara',     price:590,  oldPrice:null, icon:'🖤', tag:null,   stock:true },
  { id:'p14',name:'Водостойкая тушь All Day',            cat:'mascara',     price:650,  oldPrice:790,  icon:'🖤', tag:'sale', stock:true },
  { id:'p15',name:'Палетка теней Sunset Nude',           cat:'palette',     price:1590, oldPrice:null, icon:'🎨', tag:'new',  stock:true },
  { id:'p16',name:'Палетка для скульптурирования Sculpt',cat:'palette',     price:1420, oldPrice:null, icon:'🎨', tag:null,   stock:true },
  { id:'p17',name:'AXIS-Y Sunday Morning Refreshing Cleansing Foam', cat:'cleansing', price:750, oldPrice:null, icon:'🧼', tag:'new', stock:true,
    desc:'Мягкое слабокислотное средство с pH 5.5, которое бережно очищает кожу от загрязнений и излишков себума, не пересушивая её и не оставляя ощущения стянутости. Формула содержит берёзовый сок, комплекс Aquaxyl и зелёный чай. Подходит для всех типов кожи.' },
  { id:'p18',name:'AXIS-Y Dark Spot Correcting Glow Serum', cat:'serum', price:950, oldPrice:null, icon:'💧', tag:'new', stock:true,
    desc:'Осветляющая сыворотка от пигментных пятен корректирует неровный тон лица, отбеливает гиперпигментацию, осветляет веснушки, следы постакне и признаки фотостарения, придаёт равномерный тон и здоровое сияние, улучшает текстуру кожи. Содержит 5% ниацинамида, экстракты облепихи, растительный сквалан. Подходит для всех типов кожи.' },
  { id:'p19',name:'AXIS-Y Dark Spot Correcting Glow Toner', cat:'toner', price:1050, oldPrice:null, icon:'💦', tag:'new', stock:true,
    desc:'Осветляющий тонер-мист корректирует несовершенства кожи: убирает постакне и заживляет воспаление, выравнивает тон и устраняет красноту, помогает избавиться от пигментации, увлажняет кожу. Содержит глутатион, ниацинамид, экстракт коры белой ивы и витамин С. Подходит для нормальной и комбинированной кожи.' },
  { id:'p20',name:'AXIS-Y Daily Purifying Treatment Toner', cat:'toner', price:1020, oldPrice:null, icon:'💦', tag:'new', stock:true,
    desc:'Тоник для проблемной кожи деликатно отшелушивает ороговевшие клетки, разглаживает текстуру и выравнивает тон, также очищает поры, абсорбирует излишки себума и препятствует образованию комедонов. Содержит BHA (0,05%), AHA и PHA кислоты, экстракты центеллы азиатской, чайного дерева, алоэ и хауттюйнии. Подходит для комбинированной, жирной и проблемной кожи.' },
  { id:'p21',name:'AXIS-Y Triple PDRN Gel Toner', cat:'toner', price:1100, oldPrice:null, icon:'💦', tag:'new', stock:true,
    desc:'Гелевый тонер уменьшает покраснение и раздражение, снижает чувствительность и восстанавливает защитный барьер кожи, что делает её гладкой и сияющей. Содержит растительный ПДРН Triple Berry PDRN, коллаген, пептид Syn-Ake, астаксантин.' },
  { id:'p22',name:'AXIS-Y Vegan Collagen Eye Serum', cat:'serum', price:1100, oldPrice:null, icon:'💧', tag:'new', stock:true,
    desc:'Пептидная сыворотка для век с массажным аппликатором разглаживает кожу вокруг глаз, сокращает глубину морщин, подтягивает и уплотняет. Предотвращает сухость, уменьшает тёмные круги и устраняет признаки усталости. Содержит 5 пептидов, веганский коллаген, церамиды, экстракты центеллы.' },
  { id:'p23',name:'AXIS-Y Mugwort Pore Clarifying Wash Off Pack', cat:'mask', price:980, oldPrice:null, icon:'🌿', tag:'new', stock:true,
    desc:'Очищающая глиняная маска с полынью. Осветляет чёрные точки и сальные нити, предотвращает появление воспалений. Деликатно отшелушивает омертвевшие клетки, сглаживает рельеф. Содержит 61% экстракта полыни, содержит глину, порошок древесного угля, экстракты артишока, хауттюйнии. Подходит для нормальной, комбинированной, жирной и проблемной кожи.' },
  { id:'p24',name:'AXIS-Y TXA 2.5% Intensive Brightening Cream', cat:'cream', price:1050, oldPrice:null, icon:'🧴', tag:'new', stock:true,
    desc:'Осветляющий крем увлажняет, устраняет тусклость и выравнивает тон. Уменьшает выраженность пигментных пятен и препятствует их появлению. Содержит 2,5% транексамовой кислоты, 2,5% ниацинамида, глутатион, церамиды, гиалуроновую кислоту. Подходит для сухой, нормальной и комбинированной кожи.' },
  { id:'p25',name:'AXIS-Y Dark Spot Correcting Glow Cream', cat:'cream', price:980, oldPrice:null, icon:'🧴', tag:'new', stock:true,
    desc:'Корректирующий гель-крем мягко осветляет постакне и гиперпигментацию, препятствует её появлению, снимает красноту. Освежает цвет лица, борется с тусклым тоном и придаёт здоровое сияние. Содержит альфа-арбутин, ниацинамид, витамин C, экстракт центеллы и церамиды. Подходит для нормальной, комбинированной и жирной кожи.' },
  { id:'p26',name:'AXIS-Y Complete No-Stress Physical Sunscreen V. 3 SPF50+ PA++++', cat:'sun', price:880, oldPrice:null, icon:'☀️', tag:'new', stock:true,
    desc:'Лёгкий минеральный солнцезащитный крем защищает от ультрафиолета, предотвращая солнечные ожоги и появление пигментных пятен. Имеет невесомую текстуру гелевой эссенции, не оставляет белых следов. Содержит гипоаллергенный физический УФ-фильтр оксид цинка, а также 2% ниацинамида, сквалан, экстракты полыни. Подходит для нормальной, комбинированной, жирной и проблемной кожи.' },
  { id:'p27',name:'AXIS-Y Kojic Yuzu Cleansing Water', cat:'cleansing', price:950, oldPrice:null, icon:'🧼', tag:'new', stock:true,
    desc:'Мицеллярная вода удаляет стойкий макияж, солнцезащитное и тональное средства. Глубоко очищает от загрязнений, деликатно отшелушивает. Содержит койевую кислоту, экстракт юдзу, витамин C, гидролат риса и церамиды. Подходит для всех типов кожи.' },
  { id:'p28',name:'AXIS-Y Kojic Yuzu Pack Cleanser', cat:'cleansing', price:1050, oldPrice:null, icon:'🧼', tag:'new', stock:true,
    desc:'Очищающее средство объединяет в себе свойства пенки для умывания и маски-эксфолианта. Удаляет загрязнения и деликатно отшелушивает ороговевшие клетки, смягчает и разглаживает текстуру, выравнивает тон. Содержит койевую и транексамовую кислоты, экстракт юдзу, витамин C. Подходит для нормальной, комбинированной и жирной кожи.' },
  { id:'p29',name:'AXIS-Y Glass Skin Duo Set', cat:'set', price:1650, oldPrice:null, icon:'🎁', tag:'new', stock:true,
    desc:'Внутри набора 2 полноразмерных продукта: 1) AXIS-Y Dark Spot Correcting Glow Serum; 2) AXIS-Y Vegan Collagen Eye Serum.' },
  { id:'p30',name:'AXIS-Y Glow Your Own Way Set', cat:'set', price:1000, oldPrice:null, icon:'🎁', tag:'new', stock:true,
    desc:'Внутри набора 3 полноразмерных продукта: 1) AXIS-Y Dark Spot Correcting Glow Toner; 2) AXIS-Y Dark Spot Correcting Glow Serum; 3) AXIS-Y Vegan Collagen Eye Serum. А также фирменное зеркало AXIS-Y You Glow.' },
  { id:'p31',name:'AXIS-Y The Mini Glow Trio', cat:'set', price:650, oldPrice:null, icon:'🎁', tag:'new', stock:true,
    desc:'В набор входит 3 миниатюрных средства: 1) Dark Spot Correcting Glow Toner, 12 мл; 2) Dark Spot Correcting Glow Serum, 5 мл; 3) Dark Spot Correcting Glow Cream, 5 мл. А также наклейки.' },
  { id:'p32',name:'Beplain Mung Bean Cleansing Oil', cat:'cleansing', price:1350, oldPrice:null, icon:'🧼', tag:'new', stock:true,
    desc:'Гидрофильное масло удаляет загрязнения, стойкий макияж, тональные и солнцезащитные средства. Проникает глубоко в поры, очищает, сокращает выраженность чёрных точек и сальных нитей. Содержит масло зелёного чая, экстракты сафлора и гардении, пантенол. Подходит для всех типов кожи.' },
  { id:'p33',name:'Beplain Mung Bean Pore Clay Mask', cat:'mask', price:1150, oldPrice:null, icon:'🌿', tag:'new', stock:true,
    desc:'Глиняная маска проникает глубоко в поры, выводит из них все загрязнения и помогает в борьбе с чёрными точками. Регулирует выработку себума, сужает расширенные поры и осветляет сальные нити. Содержит несколько видов глины, скорлупу кокоса и измельчённые водоросли.' },
  { id:'p34',name:'Beplain Mung Bean pH-Balanced Cleansing Foam', cat:'cleansing', price:1020, oldPrice:null, icon:'🧼', tag:'new', stock:true,
    desc:'Балансирующая пенка для глубокого очищения эффективно удаляет все виды загрязнений, остатки макияжа, тонального и солнцезащитного средства и уменьшает жирность кожи. Содержит экстракт бобов маш, экстракт листьев ним, какао-бобов и инжира.' },
  { id:'p35',name:'Beplain Sunmuse Moisture Sunscreen SPF 50+ PA++++', cat:'sun', price:1120, oldPrice:null, icon:'☀️', tag:'new', stock:true,
    desc:'Увлажняющий солнцезащитный крем на химических фильтрах с невесомой освежающей консистенцией быстро впитывается, без липкости и эффекта маски. Содержит токоферол, аденозин и ниацинамид. Подходит для всех типов кожи.' },
  { id:'p36',name:'Beplain Mung Bean Cleansing Water', cat:'cleansing', price:1080, oldPrice:null, icon:'🧼', tag:'new', stock:true,
    desc:'Липосомальная очищающая вода деликатно удаляет загрязнения, смывает макияж любой стойкости. Содержит 5 видов церамидов, 8 видов гиалуроновой кислоты, аллантоин и пантенол.' },
  { id:'p37',name:'SKIN1004 Madagascar Centella Ampoule Foam', cat:'cleansing', price:780, oldPrice:null, icon:'🧼', tag:'new', stock:true,
    desc:'Пенка удаляет загрязнения, ороговевшие клетки и излишки себума, не приводит к сухости и не вызывает ощущения стянутости. Главным активным компонентом является 30% экстракт центеллы азиатской. Подходит для всех типов кожи.' },
  { id:'p38',name:'SKIN1004 Madagascar Centella Light Cleansing Oil', cat:'cleansing', price:1020, oldPrice:null, icon:'🧼', tag:'new', stock:true,
    desc:'Гидрофильное масло растворяет макияж и загрязнения, также успокаивает и смягчает чувствительную кожу. Очищает поры, удаляет излишки себума и ороговевшие клетки. Основной компонент — 10% экстракт центеллы азиатской. Подходит для всех типов кожи.' },
  { id:'p39',name:'SKIN1004 Madagascar Centella Toning Toner 210 мл', cat:'toner', price:1050, oldPrice:null, icon:'💦', tag:'new', stock:true,
    desc:'Тонер смягчает, увлажняет и успокаивает кожу после умывания, оказывает мягкий пилинг-эффект и поддерживает чистоту кожи. Содержит PHA, ниацинамид и аденозин. Подходит для всех типов кожи.' },
  { id:'p40',name:'SKIN1004 Madagascar Centella Ampoule', cat:'serum', price:880, oldPrice:null, icon:'💧', tag:'new', stock:true,
    desc:'Ампула для лица содержит высококонцентрированный экстракт центеллы азиатской. Успокаивает раздражённую кожу, способствует восстановлению, снижает чувствительность и укрепляет сосуды. Подходит для всех типов кожи.' },
  { id:'p41',name:'SKIN1004 Madagascar Centella Quick Calming Pad', cat:'toner', price:1100, oldPrice:null, icon:'💦', tag:'new', stock:true,
    desc:'Успокаивающие пэды с 49% центеллы моментально снимают раздражение и покраснение, смягчают и восстанавливают кожу, снижают чувствительность к внешним раздражителям. Подходит для всех типов кожи.' },
  { id:'p42',name:'SKIN1004 Madagascar Centella Toning Toner 400 мл', cat:'toner', price:1450, oldPrice:null, icon:'💦', tag:'new', stock:true,
    photos:['images/products/p39.jpg'],
    desc:'Тонер смягчает, увлажняет и успокаивает кожу после умывания, оказывает мягкий пилинг-эффект и поддерживает чистоту кожи. Содержит PHA, ниацинамид и аденозин. Подходит для всех типов кожи.' },
  { id:'p43',name:'SKIN1004 Madagascar Centella Cream', cat:'cream', price:1180, oldPrice:null, icon:'🧴', tag:'new', stock:true,
    desc:'Питательный крем наполняет кожу влагой, устраняет сухость, шелушение и чувство стянутости, укрепляет естественный защитный барьер, смягчает и разглаживает. Главным действующим компонентом является 9,8% экстракт центеллы азиатской. Подходит для всех типов кожи.' },
  { id:'p44',name:'SKIN1004 Madagascar Centella Soothing Cream', cat:'cream', price:1100, oldPrice:null, icon:'🧴', tag:'new', stock:true,
    desc:'Охлаждающий защитный крем снимает раздражение и покраснение, смягчает, стимулирует процесс восстановления и устраняет шелушение. Содержит 72% экстракт центеллы азиатской, церамиды, транексамовую кислоту. Подходит для комбинированной кожи.' },
  { id:'p45',name:'SKIN1004 Madagascar Centella Teca Soothing Toner', cat:'toner', price:1050, oldPrice:null, icon:'💦', tag:'new', stock:true,
    desc:'Усиленный тонер с центеллой и ПДРН восстанавливает, успокаивает и смягчает после умывания, разглаживает и придаёт сияние. Избавляет от сухости и чувства стянутости, уменьшает покраснение и раздражение. Помимо центеллы и ПДРН ещё входит LHA, цинк, пантенол и стволовые клетки яблока. Подходит для всех типов кожи, чувствительной и обезвоженной.' },
  { id:'p46',name:'SKIN1004 Madagascar Centella Teca Ampoule', cat:'serum', price:880, oldPrice:null, icon:'💧', tag:'new', stock:true,
    desc:'Усиленная версия классической ампулы с восстанавливающим и антивозрастным действием. Укрепляет защитный барьер, повышает эластичность и разглаживает рельеф. Содержит комплекс центеллы TECA, ПДРН, пептиды, коллаген, пробиотики и PHA. Подходит для всех типов кожи, особенно для зрелой.' },
  { id:'p47',name:'SKIN1004 Madagascar Centella Teca Cream', cat:'cream', price:1050, oldPrice:null, icon:'🧴', tag:'new', stock:true,
    desc:'Усиленный крем с центеллой и ПДРН оказывает мощное восстанавливающее действие, повышает плотность и упругость, придаёт коже сияние и гладкий рельеф, избавляет от сухости, успокаивает раздражение. Входит комплекс центеллы TECA, ПДРН, ниацинамид, альфа-арбутин. Подходит для чувствительной, раздражённой кожи.' },
  { id:'p48',name:'SKIN1004 Madagascar Centella Probio-Cica Enrich Cream 50 мл', cat:'cream', price:1200, oldPrice:null, icon:'🧴', tag:'new', stock:true,
    desc:'Ламеллярный крем укрепляет липидный барьер и усиливает защитные функции и подавляет рост бактерий. Интенсивно питает, устраняет сухость и шелушение. Содержит экстракт центеллы азиатской, масла макадамии и моринги, сквалан и церамиды. Подходит для сухой, нормальной и чувствительной кожи.' },
  { id:'p49',name:'SKIN1004 Madagascar Centella Probio-Cica Enrich Cream 15 мл', cat:'cream', price:380, oldPrice:null, icon:'🧴', tag:'new', stock:true,
    photos:['images/products/p48.jpg'],
    desc:'Ламеллярный крем укрепляет липидный барьер и усиливает защитные функции и подавляет рост бактерий. Интенсивно питает, устраняет сухость и шелушение. Содержит экстракт центеллы азиатской, масла макадамии и моринги, сквалан и церамиды. Подходит для сухой, нормальной и чувствительной кожи.' },
  { id:'p50',name:'SKIN1004 Madagascar Centella Probio-Cica Essence Toner', cat:'toner', price:1080, oldPrice:null, icon:'💦', tag:'new', stock:true,
    desc:'Тонер-эссенция с пробиотиками восстанавливает кислотно-щелочной баланс и поддерживает здоровую микробиоту кожи, блокируя рост и развитие бактерий. Мгновенно восполняет недостаток влаги. Содержит экстракт центеллы азиатской, гиалуроновую кислоту и трегалозу. Подходит для сухой, нормальной и комбинированной кожи.' },
  { id:'p51',name:'SKIN1004 Madagascar Centella Probio-Cica Intensive Ampoule', cat:'serum', price:1050, oldPrice:null, icon:'💧', tag:'new', stock:true,
    desc:'Ампула с пробиотиками обладает выраженным восстанавливающим действием, укрепляет барьерные функции, стимулирует заживление мелких воспалений и снижает чувствительность. Входит экстракт центеллы азиатской, церамиды, масло макадамии. Подходит для сухой, нормальной и чувствительной кожи.' },
];

/* ============================================
   Telegram — уведомления сотрудникам о заказах
   ============================================ */
// 1) Впиши сюда токен бота, который дал @BotFather
const TELEGRAM_BOT_TOKEN = '8677024699:AAFnNc3GGZzpgxTQGcgYOGyq87IknMYnOho';
// 2) Впиши сюда ID группы сотрудников (отрицательное число вида -1001234567890)
const TELEGRAM_CHAT_ID = '-1003943974440';

function buildOrderMessage(orderItems, total, customer){
  const itemsText = orderItems
    .map(({ p, qty }) => `• ${p.name} × ${qty} = ${fmt(p.price * qty)}`)
    .join('\n');

  return (
    `🛍️ НОВЫЙ ЗАКАЗ — HOLD LIVE\n\n` +
    `${itemsText}\n\n` +
    `Итого: ${fmt(total)}\n\n` +
    `👤 Имя: ${customer.name}\n` +
    `📞 Телефон: ${customer.phone}\n` +
    `📍 Адрес: ${customer.address}\n` +
    (customer.comment ? `💬 Комментарий: ${customer.comment}\n` : '') +
    `\n💵 Оплата: наличными/переводом при получении`
  );
}

async function sendOrderToTelegram(orderItems, total, customer){
  const text = buildOrderMessage(orderItems, total, customer);
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  try{
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text })
    });
    if (!res.ok) throw new Error('Telegram API error: ' + res.status);
    return true;
  }catch(err){
    console.error('Не удалось отправить заказ в Telegram:', err);
    return false;
  }
}

/* ============================================
   Состояние
   ============================================ */
let activeFilter = 'all';   // all | new | sale | category id
let searchQuery = '';       // текст из строки поиска
/* ============================================
   БРЕНДЫ
   Бренд товара определяется по началу названия (или полем brand:'id' у товара).
   Официальные логотипы: положите файлы в images/brands/ (roundlab.png, romand.png,
   skin1004.png). Пока файла нет — показывается текстовое название бренда.
   ============================================ */
const BRANDS = [
  { id:'roundlab', name:'ROUND LAB', match:['round lab','roundlab'], logo:'images/brands/roundlab.png', style:'roundlab' },
  { id:'romand',   name:'rom&nd',    match:['rom&nd','romand'],      logo:'images/brands/romand.png',   style:'romand' },
  { id:'skin1004', name:'SKIN1004',  match:['skin1004'],             logo:'images/brands/skin1004.png', style:'skin1004' },
];
function brandOf(p){
  if (p.brand) return p.brand;
  const n = p.name.toLowerCase();
  const b = BRANDS.find(b => b.match.some(m => n.startsWith(m)));
  return b ? b.id : null;
}
const brandCount = id => PRODUCTS.filter(p => brandOf(p) === id).length;
function plural(n, a, b, c){ const m = n % 100, d = n % 10; return (m > 10 && m < 20) ? c : d === 1 ? a : (d >= 2 && d <= 4) ? b : c; }
let activeBrand = null;

let cart = {};              // { productId: qty }

/* ============================================
   Утилиты
   ============================================ */
const fmt = (n) => n.toLocaleString('ru-RU') + ' сом';
const getProduct = (id) => PRODUCTS.find(p => p.id === id);

function cartCount(){
  return Object.values(cart).reduce((sum, q) => sum + q, 0);
}
function cartTotal(){
  return Object.entries(cart).reduce((sum, [id, q]) => sum + getProduct(id).price * q, 0);
}

/* ============================================
   Рендер категорий
   ============================================ */
function renderCategories(){
  const row = document.getElementById('categoryRow');
  row.innerHTML = CATEGORIES.map(c => `
    <button class="category-pill ${activeFilter === c.id ? 'is-active' : ''}" data-cat="${c.id}">
      <span class="category-pill__icon">${c.icon}</span>
      <span class="category-pill__label">${c.label}</span>
    </button>
  `).join('');

  row.querySelectorAll('.category-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.cat;
      activeFilter = (activeFilter === cat) ? 'all' : cat;
      syncFilterUI();
      renderCatalog();
      document.getElementById('catalog').scrollIntoView({ behavior:'smooth', block:'start' });
    });
  });
}

function syncFilterUI(){
  document.querySelectorAll('.chip').forEach(chip => {
    chip.classList.toggle('is-active', chip.dataset.filter === activeFilter || (chip.dataset.filter === 'all' && !['new','sale'].includes(activeFilter) && !CATEGORIES.find(c=>c.id===activeFilter)));
  });
  document.querySelectorAll('.category-pill').forEach(pill => {
    pill.classList.toggle('is-active', pill.dataset.cat === activeFilter);
  });
}

/* ============================================
   Рендер каталога
   ============================================ */
function matchesFilter(p){
  if (activeBrand && brandOf(p) !== activeBrand) return false;
  if (searchQuery && !p.name.toLowerCase().includes(searchQuery)) return false;
  if (activeFilter === 'all') return true;
  if (activeFilter === 'new') return p.tag === 'new';
  if (activeFilter === 'sale') return p.tag === 'sale';
  return p.cat === activeFilter;
}

function renderCatalog(){
  const grid = document.getElementById('catalogGrid');
  const list = PRODUCTS.filter(matchesFilter);

  syncCatalogBar();
  if (!list.length){
    const b = BRANDS.find(x => x.id === activeBrand);
    if (b && brandCount(b.id) === 0){
      grid.innerHTML = `<div class="empty"><span class="empty__mark">✦</span><h3>${b.name} скоро в HOLD LIVE</h3><p>Товары этого бренда пока готовим. Загляните позже или выберите другой бренд.</p><button type="button" class="btn btn--primary" data-empty-reset>Смотреть все товары</button></div>`;
    } else {
      grid.innerHTML = `<div class="empty"><span class="empty__mark">🔍</span><h3>Ничего не найдено</h3><p>${searchQuery ? 'Попробуйте изменить запрос или' : 'Попробуйте'} выбрать другой бренд или категорию.</p><button type="button" class="btn btn--primary" data-empty-reset>Сбросить фильтры</button></div>`;
    }
    grid.querySelector('[data-empty-reset]').addEventListener('click', resetAllFilters);
    return;
  }

  grid.innerHTML = list.map((p, i) => {
    const qty = cart[p.id] || 0;
    return `
    <article class="product-card${isInStock(p) ? '' : ' is-out'}" style="animation-delay:${Math.min(i * 0.04, 0.4)}s">
      <div class="product-card__media" data-view="${p.id}">
        ${p.tag ? `<span class="product-card__tag product-card__tag--${p.tag}">${p.tag === 'new' ? 'Новинка' : 'Акция'}</span>` : ''}
        <img src="${(p.photos && p.photos[0]) || `images/products/${p.id}.jpg`}" alt="${p.name}" class="product-card__photo" loading="lazy" decoding="async"
             onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
        <span class="product-card__icon-fallback">${p.icon}</span>
      </div>
      <div class="product-card__body">
        <span class="product-card__cat">${CATEGORIES.find(c=>c.id===p.cat).label}</span>
        <h3 class="product-card__name" data-view="${p.id}">${p.name}</h3>
        <span class="product-card__stock is-${stockLevel(p)}">${STOCK_TEXT[stockLevel(p)]}</span>
        <div class="product-card__row">
          <span class="product-card__price">
            ${p.oldPrice ? `<del>${fmt(p.oldPrice)}</del>` : ''}${fmt(p.price)}
          </span>
          <div class="product-card__control" data-id="${p.id}">
            ${qty > 0 ? qtyControlHTML(p.id, qty) : (isInStock(p)
              ? `<button class="add-btn" data-add="${p.id}" aria-label="Добавить в корзину">+</button>`
              : `<button class="add-btn" disabled aria-label="Нет в наличии">+</button>`)}
          </div>
        </div>
      </div>
    </article>
  `;
  }).join('');

  grid.querySelectorAll('[data-add]').forEach(btn => {
    btn.addEventListener('click', () => addToCart(btn.dataset.add));
  });
  grid.querySelectorAll('[data-view]').forEach(el => {
    el.style.cursor = 'pointer';
    el.addEventListener('click', () => openProductModal(el.dataset.view));
  });
  bindQtyControls(grid);
}

function qtyControlHTML(id, qty){
  return `
    <div class="qty-control">
      <button data-minus="${id}" aria-label="Уменьшить количество">−</button>
      <span>${qty}</span>
      <button data-plus="${id}" aria-label="Увеличить количество">+</button>
    </div>
  `;
}

function bindQtyControls(scope){
  scope.querySelectorAll('[data-plus]').forEach(btn => {
    btn.addEventListener('click', () => addToCart(btn.dataset.plus, false));
  });
  scope.querySelectorAll('[data-minus]').forEach(btn => {
    btn.addEventListener('click', () => removeOneFromCart(btn.dataset.minus));
  });
}

/* ============================================
   Логика корзины
   ============================================ */
function addToCart(id, bump = true){
  const _p = getProduct(id);
  if (_p && !isInStock(_p)) return;
  cart[id] = (cart[id] || 0) + 1;
  onCartChange(bump);
}

function removeOneFromCart(id){
  if (!cart[id]) return;
  cart[id] -= 1;
  if (cart[id] <= 0) delete cart[id];
  onCartChange(false);
}

function removeFromCart(id){
  delete cart[id];
  onCartChange(false);
}

function onCartChange(bump){
  renderCatalog();
  renderCartDrawer();
  updateCartCount(bump);
  if (productModal.classList.contains('is-open')) renderProductModal();
}

function updateCartCount(bump){
  saveCart();
  const el = document.getElementById('cartCount');
  el.textContent = cartCount();
  const tc = document.getElementById('tabCartCount');
  if (tc){ tc.textContent = cartCount(); tc.style.display = cartCount() ? 'flex' : 'none'; }
  if (bump){
    const cartBtn = document.getElementById('cartBtn');
    cartBtn.classList.remove('is-bumping');
    void cartBtn.offsetWidth; // restart animation
    cartBtn.classList.add('is-bumping');
  }
}

/* ============================================
   Панель корзины (drawer)
   ============================================ */
function renderCartDrawer(){
  const body = document.getElementById('cartBody');
  const ids = Object.keys(cart);

  if (!ids.length){
    body.innerHTML = `<p class="cart-empty">Корзина пока пуста.<br>Загляните в каталог 💄</p>`;
  } else {
    body.innerHTML = ids.map(id => {
      const p = getProduct(id);
      const qty = cart[id];
      return `
        <div class="cart-item">
          <div class="cart-item__icon">${p.icon}</div>
          <div class="cart-item__info">
            <p class="cart-item__name">${p.name}</p>
            <p class="cart-item__price">${fmt(p.price)} × ${qty} = ${fmt(p.price * qty)}</p>
          </div>
          <div class="qty-control">
            <button data-minus="${id}" aria-label="Уменьшить">−</button>
            <span>${qty}</span>
            <button data-plus="${id}" aria-label="Увеличить">+</button>
          </div>
        </div>
      `;
    }).join('');
    bindQtyControls(body);
  }

  document.getElementById('cartTotal').textContent = fmt(cartTotal());
  document.getElementById('checkoutBtn').disabled = ids.length === 0;
}

/* ============================================
   Блокировка прокрутки фона, пока открыто окно
   ============================================ */
function isAnyOverlayOpen(){
  return cartDrawer.classList.contains('is-open') ||
         checkoutModal.classList.contains('is-open') ||
         productModal.classList.contains('is-open') ||
         (typeof supportModal !== 'undefined' && supportModal.classList.contains('is-open')) ||
         nav.classList.contains('is-open');
}
/* Блокировка прокрутки страницы под открытыми окнами.
   Одного overflow:hidden на body мало: iOS Safari его игнорирует, и фон ездит при свайпах.
   Поэтому «замораживаем» body через position:fixed, запоминаем позицию прокрутки
   и точно возвращаем её после закрытия. */
let scrollLockY = 0;
let scrollLocked = false;

function lockScroll(){
  if (scrollLocked) return;
  scrollLocked = true;
  scrollLockY = window.pageYOffset || document.documentElement.scrollTop || 0;
  const sbw = window.innerWidth - document.documentElement.clientWidth; // ширина полосы прокрутки (ПК)
  const b = document.body;
  b.style.position = 'fixed';
  b.style.top = `-${scrollLockY}px`;
  b.style.left = '0';
  b.style.right = '0';
  b.style.width = '100%';
  b.style.overflow = 'hidden';
  if (sbw > 0) b.style.paddingRight = sbw + 'px'; // чтобы страница не «прыгала» вбок
  document.documentElement.classList.add('is-scroll-locked');
}
function unlockScrollIfNeeded(){
  if (isAnyOverlayOpen() || !scrollLocked) return;
  scrollLocked = false;
  const b = document.body;
  b.style.position = '';
  b.style.top = '';
  b.style.left = '';
  b.style.right = '';
  b.style.width = '';
  b.style.overflow = '';
  b.style.paddingRight = '';
  document.documentElement.classList.remove('is-scroll-locked');
  window.scrollTo({ top: scrollLockY, left: 0, behavior: 'instant' }); // без плавной анимации
}

/* iOS Safari: не даём фону двигаться свайпом.
   Разрешаем движение только внутри прокручиваемого блока окна и только если
   он ещё может прокрутиться в нужную сторону (на краях цепочку прокрутки обрываем). */
let touchStartY = 0;
document.addEventListener('touchstart', e => {
  if (e.touches.length) touchStartY = e.touches[0].clientY;
}, { passive:true });
document.addEventListener('touchmove', e => {
  if (!scrollLocked) return;
  const dy = e.touches[0].clientY - touchStartY; // >0 — палец вниз (прокрутка к началу)
  let el = e.target;
  while (el && el !== document.body && el !== document.documentElement){
    if (el.nodeType === 1){
      const oy = getComputedStyle(el).overflowY;
      if ((oy === 'auto' || oy === 'scroll') && el.scrollHeight > el.clientHeight){
        const atTop = el.scrollTop <= 0;
        const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
        if ((dy > 0 && atTop) || (dy < 0 && atBottom)) break; // край — блокируем
        return; // внутри блока можно прокручивать
      }
    }
    el = el.parentNode;
  }
  e.preventDefault();
}, { passive:false });

/* ============================================
   Открытие/закрытие корзины
   ============================================ */
const overlay = document.getElementById('overlay');
const cartDrawer = document.getElementById('cartDrawer');

function openCart(){
  cartDrawer.classList.add('is-open');
  overlay.classList.add('is-visible');
  lockScroll();
}
function closeCart(){
  cartDrawer.classList.remove('is-open');
  overlay.classList.remove('is-visible');
  unlockScrollIfNeeded();
}

document.getElementById('cartBtn').addEventListener('click', openCart);
document.getElementById('cartClose').addEventListener('click', closeCart);
overlay.addEventListener('click', () => { closeCart(); closeCheckout(); closeMobileNav(); closeProductModal(); });

/* ============================================
   Мобильное меню
   ============================================ */
const nav = document.getElementById('nav');
const burger = document.getElementById('burger');
const navBackdrop = document.getElementById('navBackdrop');
const isMobileNav = () => window.matchMedia('(max-width: 720px)').matches;
function setNavOpen(open, keepInline){
  nav.classList.toggle('is-open', open);
  navBackdrop.classList.toggle('is-open', open);
  burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  if (!keepInline){ nav.style.transform = ''; nav.style.transition = ''; }
  if (open){ pinHeader(); lockScroll(); } else { unpinHeader(); unlockScrollIfNeeded(); }
}
/* Когда страница заблокирована (body: fixed), липкая шапка уезжает вместе с телом —
   и кнопка «✕» пропадает. Пока меню открыто, закрепляем шапку у верха экрана. */
let headerSpacer = null;
function pinHeader(){
  const hdr = document.querySelector('.header');
  if (!hdr || headerSpacer || scrollLocked) return;
  const r = hdr.getBoundingClientRect();
  headerSpacer = document.createElement('div');
  headerSpacer.style.height = r.height + 'px';
  hdr.parentNode.insertBefore(headerSpacer, hdr);
  hdr.style.cssText += `;position:fixed;top:${r.top}px;left:0;right:0;`;
}
function unpinHeader(){
  const hdr = document.querySelector('.header');
  if (!headerSpacer) return;
  headerSpacer.remove(); headerSpacer = null;
  hdr.style.position = ''; hdr.style.top = ''; hdr.style.left = ''; hdr.style.right = '';
}
function closeMobileNav(){ if (nav.classList.contains('is-open')) setNavOpen(false); }
burger.addEventListener('click', () => setNavOpen(!nav.classList.contains('is-open')));
navBackdrop.addEventListener('click', closeMobileNav);
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMobileNav));
window.addEventListener('resize', () => { if (!isMobileNav()) closeMobileNav(); });



/* ============================================
   Фильтр-чипы каталога
   ============================================ */
document.querySelectorAll('.chip').forEach(chip => {
  chip.addEventListener('click', () => {
    activeFilter = chip.dataset.filter;
    syncFilterUI();
    renderCatalog();
  });
});

/* ============================================
   Оформление заказа (модалка, 3 шага)
   ============================================ */
const checkoutModal = document.getElementById('checkoutModal');
const step1 = document.getElementById('checkoutStep1');
const step2 = document.getElementById('checkoutStep2');
const step3 = document.getElementById('checkoutStep3');

function openCheckout(){
  if (!cartCount()) return;
  renderModalOrder();
  step1.hidden = false; step2.hidden = true; step3.hidden = true;
  checkoutModal.classList.add('is-open');
  overlay.classList.add('is-visible');
  lockScroll();
  closeCart();
}

function closeCheckout(){
  checkoutModal.classList.remove('is-open');
  overlay.classList.remove('is-visible');
  unlockScrollIfNeeded();
}

function renderModalOrder(){
  const list = document.getElementById('modalOrderList');
  list.innerHTML = Object.entries(cart).map(([id, qty]) => {
    const p = getProduct(id);
    return `<div class="modal__order-row"><span>${p.name} × ${qty}</span><span>${fmt(p.price * qty)}</span></div>`;
  }).join('');
  document.getElementById('modalTotal').textContent = fmt(cartTotal());
}

document.getElementById('checkoutBtn').addEventListener('click', openCheckout);
document.getElementById('checkoutClose').addEventListener('click', closeCheckout);

document.getElementById('confirmOrderBtn').addEventListener('click', () => {
  step1.hidden = true;
  step2.hidden = false;
});

document.getElementById('checkoutStep2').addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const data = Object.fromEntries(new FormData(form));

  // снимок заказа до очистки корзины
  const orderItems = Object.entries(cart).map(([id, qty]) => ({ p: getProduct(id), qty }));
  const total = cartTotal();

  submitBtn.disabled = true;
  submitBtn.textContent = 'Отправляем заказ...';

  const sent = await sendOrderToTelegram(orderItems, total, data);

  submitBtn.disabled = false;
  submitBtn.textContent = 'Отправить заказ';

  if (!sent){
    alert('Не получилось отправить заказ. Проверьте интернет-соединение и попробуйте ещё раз, либо позвоните нам напрямую.');
    return;
  }

  step2.hidden = true;
  step3.hidden = false;

  // очищаем корзину после успешного заказа
  cart = {};
  renderCatalog();
  renderCartDrawer();
  updateCartCount(false);
  form.reset();
});

document.getElementById('closeSuccessBtn').addEventListener('click', () => {
  closeCheckout();
  step1.hidden = false; step2.hidden = true; step3.hidden = true;
});

/* ============================================
   Модалка детального просмотра товара
   ============================================ */
const productModal = document.getElementById('productModal');
let activeProductId = null;
let activeProductPhoto = 0;

function getProductPhotos(p){
  return (p.photos && p.photos.length) ? p.photos : [`images/products/${p.id}.jpg`];
}

function openProductModal(id){
  activeProductId = id;
  activeProductPhoto = 0;
  renderProductModal();
  productModal.classList.add('is-open');
  overlay.classList.add('is-visible');
  lockScroll();
}

function closeProductModal(){
  productModal.classList.remove('is-open');
  overlay.classList.remove('is-visible');
  unlockScrollIfNeeded();
}

function renderProductModal(){
  const p = getProduct(activeProductId);
  const photos = getProductPhotos(p);

  document.getElementById('productModalCat').textContent = CATEGORIES.find(c => c.id === p.cat).label;
  document.getElementById('productModalName').textContent = p.name;
  document.getElementById('productModalDesc').textContent = p.desc || 'Описание уточняется — напишите нам, и мы подскажем состав и особенности средства.';
  document.getElementById('productModalFallbackIcon').textContent = p.icon;
  // наличие по филиалам
  const inStock = isInStock(p);
  const stockEl = document.getElementById('productModalStock');
  stockEl.textContent = STOCK_TEXT[stockLevel(p)];
  stockEl.className = 'product-card__stock is-' + stockLevel(p);
  const brEl = document.getElementById('productModalBranches');
  const rows = branchStock(p);
  if (rows){
    brEl.innerHTML = '<span class="product-modal__branches-title">Наличие в филиалах</span>' + rows.map(r => {
      const has = r.qty !== 0;
      const label = r.qty === null ? 'в наличии' : (r.qty === 0 ? 'нет в наличии' : `в наличии, ${r.qty} шт`);
      return `<div class="branch-stock ${has ? 'is-yes' : 'is-no'}"><span class="branch-stock__addr">${r.address}</span><span class="branch-stock__state">${has ? '✓' : '✕'} ${label}</span></div>`;
    }).join('');
    brEl.hidden = false;
  } else { brEl.innerHTML = ''; brEl.hidden = true; }
  const noteEl = document.getElementById('productModalNote');
  noteEl.textContent = p.note || '';
  noteEl.hidden = !p.note;

  document.getElementById('productModalPrice').innerHTML =
    (p.oldPrice ? `<del>${fmt(p.oldPrice)}</del>` : '') + fmt(p.price);

  const qty = cart[p.id] || 0;
  document.getElementById('productModalControl').innerHTML = qty > 0
    ? qtyControlHTML(p.id, qty)
    : (inStock
        ? `<button class="add-btn" data-add="${p.id}" aria-label="Добавить в корзину">+</button>`
        : `<button class="add-btn" disabled aria-label="Нет в наличии">+</button>`);
  bindQtyControls(document.getElementById('productModalControl'));
  document.getElementById('productModalControl').querySelectorAll('[data-add]').forEach(btn => {
    btn.addEventListener('click', () => { addToCart(btn.dataset.add); renderProductModal(); });
  });

  updateProductModalPhoto(photos);
}

function updateProductModalPhoto(photosArg){
  const p = getProduct(activeProductId);
  const photos = photosArg || getProductPhotos(p);
  const photo = photos[activeProductPhoto];

  const img = document.getElementById('productModalPhotoImg');
  const fallback = document.getElementById('productModalPhotoFallback');
  const prevBtn = document.getElementById('productModalPrev');
  const nextBtn = document.getElementById('productModalNext');
  const dots = document.getElementById('productModalDots');

  img.onerror = () => { img.style.display = 'none'; fallback.style.display = 'flex'; };
  img.onload = () => { img.style.display = 'block'; fallback.style.display = 'none'; };
  img.src = photo;

  const hasMultiple = photos.length > 1;
  prevBtn.style.display = hasMultiple ? 'flex' : 'none';
  nextBtn.style.display = hasMultiple ? 'flex' : 'none';

  dots.innerHTML = hasMultiple
    ? photos.map((_, i) => `<span class="branches__dot ${i === activeProductPhoto ? 'is-active' : ''}" data-i="${i}"></span>`).join('')
    : '';
  dots.querySelectorAll('.branches__dot').forEach(dot => {
    dot.addEventListener('click', () => {
      activeProductPhoto = Number(dot.dataset.i);
      updateProductModalPhoto(photos);
    });
  });
}

document.getElementById('productModalPrev').addEventListener('click', () => {
  const photos = getProductPhotos(getProduct(activeProductId));
  activeProductPhoto = (activeProductPhoto - 1 + photos.length) % photos.length;
  updateProductModalPhoto(photos);
});
document.getElementById('productModalNext').addEventListener('click', () => {
  const photos = getProductPhotos(getProduct(activeProductId));
  activeProductPhoto = (activeProductPhoto + 1) % photos.length;
  updateProductModalPhoto(photos);
});
document.getElementById('productModalClose').addEventListener('click', closeProductModal);

/* ============================================
   Инициализация
   ============================================ */
/* ============================================
   Быстрый доступ на главной: категории, новинки, поиск
   ============================================ */
function renderQuick(){
  const cats = document.getElementById('quickCats');
  cats.innerHTML = CATEGORIES.map(c => `
    <button class="quick-cat" data-cat="${c.id}">
      <span class="quick-cat__icon">${c.icon}</span>
      <span class="quick-cat__label">${c.label}</span>
    </button>`).join('');
  cats.querySelectorAll('.quick-cat').forEach(btn => {
    btn.addEventListener('click', () => {
      activeFilter = btn.dataset.cat;
      searchQuery = ''; document.getElementById('searchInput').value = '';
      syncFilterUI(); renderCatalog();
      document.getElementById('catalog').scrollIntoView({ behavior:'smooth', block:'start' });
    });
  });

  const fresh = PRODUCTS.filter(p => p.tag === 'new').slice(-10).reverse(); // самые последние добавленные
  const strip = document.getElementById('newStrip');
  if (!fresh.length){ document.getElementById('quickHead').style.display = 'none'; strip.style.display = 'none'; return; }
  strip.innerHTML = fresh.map(p => `
    <button class="mini-card" data-view="${p.id}">
      <span class="mini-card__media">
        <img src="${(p.photos && p.photos[0]) || `images/products/${p.id}.jpg`}" alt="${p.name}" loading="lazy"
             onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
        <span class="mini-card__fallback">${p.icon}</span>
      </span>
      <span class="mini-card__name">${p.name}</span>
      <span class="mini-card__price">${fmt(p.price)}</span>
    </button>`).join('');
  strip.querySelectorAll('[data-view]').forEach(el => {
    el.addEventListener('click', () => openProductModal(el.dataset.view));
  });
}

document.querySelector('.quick__all').addEventListener('click', () => {
  activeFilter = 'new'; searchQuery = ''; document.getElementById('searchInput').value = '';
  syncFilterUI(); renderCatalog();
});

const searchInput = document.getElementById('searchInput');
let searchScrolled = false;
searchInput.addEventListener('input', () => {
  searchQuery = searchInput.value.trim().toLowerCase();
  if (searchQuery) activeFilter = 'all';
  syncFilterUI(); renderCatalog();
  if (!searchQuery) searchScrolled = false;
});
searchInput.addEventListener('keydown', e => {
  if (e.key === 'Enter'){
    e.preventDefault(); searchInput.blur();
    document.getElementById('catalog').scrollIntoView({ behavior:'smooth', block:'start' });
  }
});

/* ============================================
   Запоминание на устройстве клиента (localStorage):
   корзина + имя, телефон, адрес. Данные никуда не отправляются.
   ============================================ */
const LS_CART = 'hl_cart_v1', LS_CONTACT = 'hl_contact_v1';
function lsGet(k){ try { return JSON.parse(localStorage.getItem(k) || 'null'); } catch(e){ return null; } }
function lsSet(k, v){ try { localStorage.setItem(k, JSON.stringify(v)); } catch(e){} }
function saveCart(){ lsSet(LS_CART, cart); }
function loadCart(){
  const saved = lsGet(LS_CART);
  if (!saved || typeof saved !== 'object') return;
  Object.keys(saved).forEach(id => {
    const q = parseInt(saved[id], 10);
    const p = getProduct(id);
    if (p && q > 0 && isInStock(p)) cart[id] = Math.min(q, 99);
  });
}
function bindContactMemory(formId, fields){
  const form = document.getElementById(formId);
  if (!form) return;
  const fill = () => {
    const c = lsGet(LS_CONTACT) || {};
    fields.forEach(n => {
      const el = form.elements[n];
      if (el && !el.value && c[n]) el.value = c[n];
    });
  };
  form.addEventListener('focusin', fill);
  fill();
  form.addEventListener('input', e => {
    const n = e.target && e.target.name;
    if (!fields.includes(n)) return;
    const c = lsGet(LS_CONTACT) || {};
    c[n] = e.target.value.trim();
    lsSet(LS_CONTACT, c);
  });
}
/* ============================================
   Бренды: карточки, фильтр, поиск в каталоге
   ============================================ */
function resetAllFilters(){
  activeBrand = null; activeFilter = 'all'; searchQuery = '';
  const si = document.getElementById('searchInput'); if (si) si.value = '';
  syncFilterUI(); syncBrandUI(); renderCatalog();
}
function renderBrands(){
  const row = document.getElementById('brandRow');
  row.innerHTML = BRANDS.map(b => {
    const n = brandCount(b.id);
    return `<button type="button" class="brand-card brand-card--${b.style}" data-brand="${b.id}" aria-pressed="false">
      <span class="brand-card__logo">
        <img src="${b.logo}" alt="${b.name}" loading="lazy" decoding="async" onerror="this.remove()">
        <span class="brand-card__word">${b.name}</span>
      </span>
      <span class="brand-card__meta">${n ? `${n} ${plural(n, 'товар', 'товара', 'товаров')}` : 'Скоро'}</span>
    </button>`;
  }).join('');
  row.querySelectorAll('.brand-card').forEach(btn => {
    btn.addEventListener('click', () => {
      selectBrand(activeBrand === btn.dataset.brand ? null : btn.dataset.brand, true);
    });
  });
  // если логотип загрузился — прячем текстовое название
  row.querySelectorAll('.brand-card__logo img').forEach(img => {
    const ok = () => img.parentElement.classList.add('has-logo');
    if (img.complete && img.naturalWidth) ok(); else img.addEventListener('load', ok);
  });
}
function selectBrand(id, scroll){
  activeBrand = id;
  activeFilter = 'all';
  syncFilterUI(); syncBrandUI(); renderCatalog();
  if (scroll) document.getElementById('catalog').scrollIntoView({ behavior:'smooth', block:'start' });
}
function syncBrandUI(){
  document.querySelectorAll('.brand-card').forEach(c => {
    const on = c.dataset.brand === activeBrand;
    c.classList.toggle('is-active', on);
    c.setAttribute('aria-pressed', on ? 'true' : 'false');
  });
  document.getElementById('brandReset').hidden = !activeBrand;
}
function syncCatalogBar(){
  const cs = document.getElementById('catalogSearch');
  if (!cs) return;
  if (cs.value.trim().toLowerCase() !== searchQuery) cs.value = searchQuery;
  document.getElementById('catalogSearchClear').hidden = !cs.value;
  const si = document.getElementById('searchInput');
  if (si && si.value.trim().toLowerCase() !== searchQuery) si.value = searchQuery;
  const chip = document.getElementById('brandChip');
  const b = BRANDS.find(x => x.id === activeBrand);
  chip.hidden = !b;
  if (b) chip.innerHTML = `${b.name} <span aria-hidden="true">✕</span>`;
  if (b) chip.setAttribute('aria-label', `Сбросить бренд ${b.name}`);
}
(function initBrands(){
  renderBrands();
  document.getElementById('brandReset').addEventListener('click', () => selectBrand(null, false));
  document.getElementById('brandChip').addEventListener('click', () => selectBrand(null, false));
  const cs = document.getElementById('catalogSearch');
  cs.addEventListener('input', () => {
    searchQuery = cs.value.trim().toLowerCase();
    if (searchQuery) activeFilter = 'all';
    syncFilterUI(); renderCatalog();
  });
  cs.addEventListener('keydown', e => { if (e.key === 'Enter'){ e.preventDefault(); cs.blur(); } });
  document.getElementById('catalogSearchClear').addEventListener('click', () => {
    searchQuery = ''; cs.value = ''; renderCatalog(); cs.focus();
  });
  const header = document.querySelector('.header');
  const setH = () => document.documentElement.style.setProperty('--header-h', (header ? header.offsetHeight : 64) + 'px');
  setH(); window.addEventListener('resize', setH); window.addEventListener('load', setH);
})();

loadCart();
bindContactMemory('checkoutStep2', ['name', 'phone', 'address']);
bindContactMemory('supportStep2', ['name', 'phone']);

renderCategories();
renderQuick();
renderCatalog();
renderCartDrawer();
renderBranches();
updateBranchPhoto();


/* ============================================
   Нижнее меню (как в приложении)
   ============================================ */
(function(){
  const tabs = document.querySelectorAll('.tabbar__item');
  const go = id => document.getElementById(id).scrollIntoView({ behavior:'smooth', block:'start' });
  function setActive(name){ tabs.forEach(t => t.classList.toggle('is-active', t.dataset.tab === name)); }

  tabs.forEach(t => t.addEventListener('click', () => {
    const k = t.dataset.tab;
    if (k === 'home'){ window.scrollTo({ top:0, behavior:'smooth' }); }
    else if (k === 'catalog'){ go('catalog'); }
    else if (k === 'search'){ go('quick'); setTimeout(() => document.getElementById('searchInput').focus({ preventScroll:true }), 450); }
    else if (k === 'cart'){ openCart(); return; }
    else if (k === 'support'){ openSupport(); return; }
    if (k !== 'cart') setActive(k);
  }));

  // подсветка вкладки по тому, где пользователь сейчас на странице
  function spy(){
    if (scrollLocked) return;
    const mid = window.innerHeight * 0.4;
    const top = id => document.getElementById(id).getBoundingClientRect().top;
    let cur = 'home';
    if (top('quick') < mid) cur = 'search';
    if (top('catalog') < mid) cur = 'catalog';
    if (top('about') < mid) cur = 'home';
    setActive(cur);
  }
  window.addEventListener('scroll', spy, { passive:true });
  updateCartCount();
})();


/* ============================================
   Поддержка: жалоба / возврат / отсутствующий товар / другой вопрос
   Отправка в Telegram — ТЕМ ЖЕ способом, тем же ботом и в ту же группу, что и заказы
   (используются те же TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID, новых ключей нет).
   ============================================ */
const supportModal = document.getElementById('supportModal');

const SUPPORT_TYPES = {
  complaint: { name:'⚠️ Жалоба',               title:'Жалоба',               hint:'Расскажите, что случилось — мы разберёмся.',          product:'optional', productLabel:'Название товара (если жалоба на товар)', textLabel:'Описание жалобы',                 ph:'Что произошло? Когда и где?' },
  return:    { name:'↩️ Возврат товара',        title:'Возврат',              hint:'Укажите товар и причину возврата.',                    product:'required', productLabel:'Название товара',                         textLabel:'Причина возврата',                ph:'Почему хотите вернуть товар? Номер или дата заказа, если помните.' },
  missing:   { name:'🔍 Отсутствующий товар',   title:'Отсутствующий товар',  hint:'Напишите, какой товар вы ищете — проверим наличие.',  product:'required', productLabel:'Название товара и бренд',                 textLabel:'Комментарий (необязательно)',     ph:'Объём, оттенок, где видели товар…', textOptional:true },
  other:     { name:'💬 Другой вопрос',         title:'Другой вопрос',        hint:'Напишите ваш вопрос — ответим в WhatsApp.',            product:'none',     productLabel:'',                                         textLabel:'Ваш вопрос',                      ph:'Чем можем помочь?' }
};

let supportType = null;
let supportLastSent = 0;

function openSupport(){
  showSupportStep(1);
  supportModal.classList.add('is-open');
  supportModal.setAttribute('aria-hidden', 'false');
  lockScroll();
}
function closeSupport(){
  supportModal.classList.remove('is-open');
  supportModal.setAttribute('aria-hidden', 'true');
  unlockScrollIfNeeded();
}
function showSupportStep(n){
  document.getElementById('supportStep1').hidden = n !== 1;
  document.getElementById('supportStep2').hidden = n !== 2;
  document.getElementById('supportStep3').hidden = n !== 3;
  supportModal.querySelector('.modal__card').scrollTop = 0;
}
function supportError(msg){
  const el = document.getElementById('supportError');
  el.textContent = msg || '';
  el.hidden = !msg;
}

function normalizePhone(raw){
  // оставляем цифры; 0XXXXXXXXX → +996XXXXXXXXX; 9 цифр без кода → +996…
  let d = raw.replace(/\D/g, '');
  if (d.length === 10 && d.startsWith('0')) d = '996' + d.slice(1);
  else if (d.length === 9) d = '996' + d;
  if (d.length < 11 || d.length > 15) return null;
  if (d.startsWith('996') && d.length === 12) return `+996 ${d.slice(3,6)} ${d.slice(6,9)} ${d.slice(9)}`;
  return '+' + d;
}

function buildSupportMessage(type, d){
  const cfg = SUPPORT_TYPES[type];
  const date = new Date().toLocaleString('ru-RU', { timeZone:'Asia/Bishkek', day:'2-digit', month:'2-digit', year:'numeric', hour:'2-digit', minute:'2-digit' }).replace(',', '');
  return (
    `🆘 НОВОЕ ОБРАЩЕНИЕ — HOLD LIVE\n\n` +
    `📌 Тип: ${cfg.name}\n\n` +
    `👤 Имя: ${d.name}\n\n` +
    `📱 WhatsApp: ${d.phone}\n\n` +
    (d.product ? `🛍 Товар: ${d.product}\n\n` : '') +
    `📝 Описание: ${d.text || '—'}\n\n` +
    `📅 Дата: ${date}`
  );
}

// Тот же способ отправки, что и у заказов (sendOrderToTelegram), тот же бот и та же группа.
async function sendSupportToTelegram(type, data){
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  try{
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: buildSupportMessage(type, data) })
    });
    if (!res.ok) throw new Error('Telegram API error: ' + res.status);
    return true;
  }catch(err){
    console.error('Не удалось отправить обращение в Telegram:', err);
    return false;
  }
}

(function(){
  const form = document.getElementById('supportStep2');

  function selectSupportType(t){
    supportType = t;
    const c = SUPPORT_TYPES[t];
    document.getElementById('supportFormTitle').textContent = c.title;
    document.getElementById('supportFormHint').textContent = c.hint;
    document.getElementById('supportTextLabel').textContent = c.textLabel;
    document.getElementById('supportProductLabel').textContent = c.productLabel;
    document.getElementById('supportProductWrap').hidden = c.product === 'none';
    form.elements.text.placeholder = c.ph;
    form.elements.product.value = c.product === 'none' ? '' : form.elements.product.value;
    supportError('');
    showSupportStep(2);
  }

  document.querySelectorAll('.support-type').forEach(b => b.addEventListener('click', () => selectSupportType(b.dataset.type)));
  document.getElementById('supportBack').addEventListener('click', () => showSupportStep(1));
  document.getElementById('supportOpen').addEventListener('click', openSupport);
  document.getElementById('supportClose').addEventListener('click', closeSupport);
  document.getElementById('supportDone').addEventListener('click', closeSupport);
  supportModal.addEventListener('click', e => { if (e.target === supportModal) closeSupport(); });
  document.getElementById('supportNavLink').addEventListener('click', e => { e.preventDefault(); openSupport(); });

  form.addEventListener('submit', async e => {
    e.preventDefault();
    supportError('');
    const c = SUPPORT_TYPES[supportType];
    const name = form.elements.name.value.trim();
    const product = c.product === 'none' ? '' : form.elements.product.value.trim();
    const text = form.elements.text.value.trim();
    const phone = normalizePhone(form.elements.phone.value);

    if (name.length < 2){ supportError('Укажите ваше имя.'); form.elements.name.focus(); return; }
    if (!phone){ supportError('Укажите корректный номер WhatsApp, например +996 700 123 456.'); form.elements.phone.focus(); return; }
    if (c.product === 'required' && !product){ supportError('Укажите название товара.'); form.elements.product.focus(); return; }
    if (!c.textOptional && text.length < 3){ supportError('Заполните описание обращения.'); form.elements.text.focus(); return; }
    if (Date.now() - supportLastSent < 30000){ supportError('Обращение уже отправлено. Подождите немного перед следующим.'); return; }

    const btn = document.getElementById('supportSubmit');
    const label = btn.textContent;
    btn.disabled = true; btn.textContent = 'Отправляем…';
    const ok = await sendSupportToTelegram(supportType, { name, phone, product, text });
    btn.disabled = false; btn.textContent = label;

    if (ok){
      supportLastSent = Date.now();
      form.reset();
      showSupportStep(3);
    } else {
      supportError('Не удалось отправить обращение. Проверьте интернет и попробуйте ещё раз.');
    }
  });
})();

/* ============================================
   ЕДИНОЕ ПОВЕДЕНИЕ ВСЕХ ВЫДВИЖНЫХ ЭЛЕМЕНТОВ
   меню, корзина, оформление заказа, карточка товара, поддержка:
   • клик по пустому месту рядом с окном — закрывает
   • Esc — закрывает верхнее окно
   • свайп влево/вправо — закрывает (окно едет за пальцем и уезжает в сторону свайпа)
   • вертикальная прокрутка внутри окна и поля ввода не затрагиваются
   ============================================ */
const OVERLAYS = [   // порядок = приоритет (верхнее закрывается первым)
  { el: supportModal,  move: supportModal.querySelector('.modal__card'),  isOpen: () => supportModal.classList.contains('is-open'),  close: closeSupport,      kind:'modal' },
  { el: productModal,  move: productModal.querySelector('.modal__card'),  isOpen: () => productModal.classList.contains('is-open'),  close: closeProductModal, kind:'modal' },
  { el: checkoutModal, move: checkoutModal.querySelector('.modal__card'), isOpen: () => checkoutModal.classList.contains('is-open'), close: closeCheckout,     kind:'modal' },
  { el: cartDrawer,    move: cartDrawer,                                  isOpen: () => cartDrawer.classList.contains('is-open'),    close: closeCart,         kind:'panel', extra:[overlay] },
  { el: nav,           move: nav,                                         isOpen: () => nav.classList.contains('is-open'),           close: (k) => setNavOpen(false, k), kind:'panel', extra:[navBackdrop] },
];
function closeTopOverlay(){
  const o = OVERLAYS.find(o => o.isOpen());
  if (o) o.close();
  return !!o;
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeTopOverlay(); });
// клик по затемнённому полю вокруг модального окна
OVERLAYS.filter(o => o.kind === 'modal').forEach(o => {
  o.el.addEventListener('click', e => { if (e.target === o.el) o.close(); });
});
// клик по затемнению за панелями (корзина, меню) — уже обработан отдельными слушателями;
// на всякий случай закрываем верхнее окно и здесь
overlay.addEventListener('click', e => { if (e.target === overlay) closeTopOverlay(); });

(function overlaySwipe(){
  const THRESHOLD = 70, FLICK = 0.5;   // px, px/мс
  function blocked(target){            // свайп не начинаем на полях ввода и в горизонтально прокручиваемых блоках
    for (let n = target; n && n.nodeType === 1; n = n.parentNode){
      if (/^(INPUT|TEXTAREA|SELECT)$/.test(n.tagName) || n.hasAttribute('data-no-swipe')) return true;
      const ox = getComputedStyle(n).overflowX;
      if ((ox === 'auto' || ox === 'scroll') && n.scrollWidth > n.clientWidth + 2) return true;
    }
    return false;
  }
  function attach(o){
    const zones = [o.el].concat(o.extra || []);
    let sx = 0, sy = 0, st = 0, dx = 0, mode = null, active = false, drag = false;
    zones.forEach(z => {
      z.addEventListener('touchstart', e => {
        if (!o.isOpen() || e.touches.length !== 1 || blocked(e.target)) return;
        sx = e.touches[0].clientX; sy = e.touches[0].clientY; st = Date.now();
        dx = 0; mode = null; active = true;
        drag = o.move.contains(e.target) || z === o.el;   // свайп по самому окну/полю окна — окно едет за пальцем
      }, { passive:true });
      z.addEventListener('touchmove', e => {
        if (!active) return;
        const t = e.touches[0], mx = t.clientX - sx, my = t.clientY - sy;
        if (!mode){
          if (Math.abs(mx) < 8 && Math.abs(my) < 8) return;
          mode = Math.abs(mx) > Math.abs(my) ? 'h' : 'v';
        }
        if (mode !== 'h') return;
        dx = mx;
        if (drag){
          o.move.style.transition = 'none';
          const fade = o.kind === 'modal' ? Math.max(0.35, 1 - Math.abs(dx) / (window.innerWidth * 0.9)) : 1;
          o.move.style.transform = o.kind === 'modal' ? `translateX(${dx}px) scale(1)` : `translateX(${dx}px)`;
          if (o.kind === 'modal') o.move.style.opacity = fade;
        }
      }, { passive:true });
      const end = () => {
        if (!active) return; active = false;
        if (mode !== 'h') return;
        const speed = Math.abs(dx) / Math.max(1, Date.now() - st);
        const far = Math.abs(dx) > THRESHOLD || speed > FLICK;
        if (!far){                                   // не дотянули — возвращаем на место
          o.move.style.transition = ''; o.move.style.transform = ''; o.move.style.opacity = '';
          return;
        }
        const dir = dx < 0 ? -1 : 1;
        if (!drag){ o.close(); return; }            // свайп по затемнению — обычное закрытие
        // уезжаем в сторону свайпа, затем закрываем и аккуратно сбрасываем стили
        o.move.style.transition = 'transform .3s cubic-bezier(.22,.8,.3,1), opacity .3s ease';
        o.move.style.transform = `translateX(${dir * (o.kind === 'modal' ? window.innerWidth : o.move.offsetWidth * 1.15)}px)`;
        o.move.style.opacity = o.kind === 'modal' ? '0' : '';
        setTimeout(() => {
          o.close(true);
          setTimeout(() => {
            o.move.style.transition = 'none';
            o.move.style.transform = ''; o.move.style.opacity = '';
            void o.move.offsetWidth;
            o.move.style.transition = '';
          }, 420);
        }, 230);
      };
      z.addEventListener('touchend', end, { passive:true });
      z.addEventListener('touchcancel', end, { passive:true });
    });
  }
  OVERLAYS.forEach(attach);
})();
