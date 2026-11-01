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
  { id:'p39',name:'SKIN1004 Madagascar Centella Toning Toner', cat:'toner', price:1050, oldPrice:null, icon:'💦', tag:'new', stock:true,
    desc:'Тонер смягчает, увлажняет и успокаивает кожу после умывания, оказывает мягкий пилинг-эффект и поддерживает чистоту кожи. Содержит PHA, ниацинамид и аденозин. Подходит для всех типов кожи.' },
  { id:'p40',name:'SKIN1004 Madagascar Centella Ampoule', cat:'serum', price:880, oldPrice:null, icon:'💧', tag:'new', stock:true,
    desc:'Ампула для лица содержит высококонцентрированный экстракт центеллы азиатской. Успокаивает раздражённую кожу, способствует восстановлению, снижает чувствительность и укрепляет сосуды. Подходит для всех типов кожи.' },
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
  if (searchQuery && !p.name.toLowerCase().includes(searchQuery)) return false;
  if (activeFilter === 'all') return true;
  if (activeFilter === 'new') return p.tag === 'new';
  if (activeFilter === 'sale') return p.tag === 'sale';
  return p.cat === activeFilter;
}

function renderCatalog(){
  const grid = document.getElementById('catalogGrid');
  const list = PRODUCTS.filter(matchesFilter);

  if (!list.length){
    grid.innerHTML = `<p style="grid-column:1/-1; text-align:center; color:var(--ink-soft);">Ничего не найдено в этой категории.</p>`;
    return;
  }

  grid.innerHTML = list.map((p, i) => {
    const qty = cart[p.id] || 0;
    return `
    <article class="product-card" style="animation-delay:${Math.min(i * 0.04, 0.4)}s">
      <div class="product-card__media" data-view="${p.id}">
        ${p.tag ? `<span class="product-card__tag product-card__tag--${p.tag}">${p.tag === 'new' ? 'Новинка' : 'Акция'}</span>` : ''}
        <img src="images/products/${p.id}.jpg" alt="${p.name}" class="product-card__photo" loading="lazy" decoding="async"
             onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
        <span class="product-card__icon-fallback">${p.icon}</span>
      </div>
      <div class="product-card__body">
        <span class="product-card__cat">${CATEGORIES.find(c=>c.id===p.cat).label}</span>
        <h3 class="product-card__name" data-view="${p.id}">${p.name}</h3>
        <span class="product-card__stock">✓ В наличии</span>
        <div class="product-card__row">
          <span class="product-card__price">
            ${p.oldPrice ? `<del>${fmt(p.oldPrice)}</del>` : ''}${fmt(p.price)}
          </span>
          <div class="product-card__control" data-id="${p.id}">
            ${qty > 0 ? qtyControlHTML(p.id, qty) : `<button class="add-btn" data-add="${p.id}" aria-label="Добавить в корзину">+</button>`}
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
function closeMobileNav(){ nav.classList.remove('is-open'); unlockScrollIfNeeded(); }
burger.addEventListener('click', () => {
  nav.classList.toggle('is-open');
  if (nav.classList.contains('is-open')) lockScroll(); else unlockScrollIfNeeded();
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMobileNav));

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

  document.getElementById('productModalPrice').innerHTML =
    (p.oldPrice ? `<del>${fmt(p.oldPrice)}</del>` : '') + fmt(p.price);

  const qty = cart[p.id] || 0;
  document.getElementById('productModalControl').innerHTML = qty > 0
    ? qtyControlHTML(p.id, qty)
    : `<button class="add-btn" data-add="${p.id}" aria-label="Добавить в корзину">+</button>`;
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
        <img src="images/products/${p.id}.jpg" alt="${p.name}" loading="lazy"
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
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && supportModal.classList.contains('is-open')) closeSupport(); });
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
