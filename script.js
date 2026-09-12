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
        <img src="images/products/${p.id}.jpg" alt="${p.name}" class="product-card__photo"
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
         nav.classList.contains('is-open');
}
function lockScroll(){ document.body.style.overflow = 'hidden'; }
function unlockScrollIfNeeded(){ if (!isAnyOverlayOpen()) document.body.style.overflow = ''; }

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
renderCategories();
renderCatalog();
renderCartDrawer();
renderBranches();
updateBranchPhoto();
