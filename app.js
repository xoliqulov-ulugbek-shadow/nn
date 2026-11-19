'use strict';
const API = 'https://api.audius.co/v1', APP = 'app_name=MegaMusic';
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const L = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d } catch { return d } }, S = (k, v) => localStorage.setItem(k, JSON.stringify(v));
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const ic = n => `<svg><use href="#i-${n}"/></svg>`;

const T = {
    uz: {
        home: 'Bosh sahifa', fav: 'Sevimlilar', pls: 'Pleylistlar', arch: 'Arxiv',
        login: 'Kirish', reg: "Ro'yxatdan o'tish", nick: 'Nik', pass: 'Parol', pass8: 'Parol (kamida 8 belgi)',
        search: 'Qo‘shiq yoki ijrochi qidirish...', trend: 'Trend qo‘shiqlar', uzb: 'O‘zbek qo‘shiqlari',
        world: 'Chet el qo‘shiqlari', empty: 'Hozircha bo‘sh', none: 'Hech narsa topilmadi',
        load: 'Yuklanmoqda...', err: 'Xatolik: internet yoki API bilan muammo', profile: 'Profil',
        lang: 'Til', out: 'Chiqish', weak: 'Kuchsiz', mid: 'O‘rtacha', strong: 'Kuchli',
        vstrong: 'Juda kuchli', bad: 'Nik yoki parol noto‘g‘ri', taken: 'Bu nik band',
        mail: 'Email noto‘g‘ri', short: 'Parol kamida 8 belgi', res: 'Natijalar',
        repeatOn: 'Qayta eshitish yoqildi', repeatOff: 'Qayta eshitish o‘chirildi',
        clearAll: 'Hammasini tozalash', newPl: 'Yangi pleylist', plName: 'Pleylist nomi...',
        create: 'Yaratish', addToPl: 'Pleylistga qo‘shish', addedToPl: 'Pleylistga qo‘shildi',
        alreadyInPl: 'Allaqachon pleylistda bor', share: 'Ulashish', linkCopied: 'Havola nusxalandi!',
        sharedPl: 'Ulashilgan pleylist', importPl: 'O‘zimga saqlash', imported: 'Pleylist saqlandi!',
        songsCount: 'ta qo‘shiq', addSong: 'Qo‘shiq qo‘shish', addCustom: 'O‘z qo‘shig‘ingizni qo‘shing (nomi / havola)',
        songTitle: 'Qo‘shiq nomi', songArtist: 'Ijrochi nomi', songUrl: 'Audio URL (ixtiyoriy, bo‘sh qolsa qidiriladi)',
        add: 'Qo‘shish', changePhoto: 'Rasm yuklash', removePhoto: 'O‘chirish', photoSaved: 'Profil rasmi yangilandi', switchAcc: 'Akkaunt ochish / Kirish',
        playAll: 'Hammasini ijro etish'
    },
    en: {
        home: 'Home', fav: 'Favorites', pls: 'Playlists', arch: 'History',
        login: 'Log in', reg: 'Sign up', nick: 'Nickname', pass: 'Password', pass8: 'Password (min 8 chars)',
        search: 'Search songs or artists...', trend: 'Trending', uzb: 'Uzbek songs',
        world: 'International', empty: 'Nothing here yet', none: 'Nothing found',
        load: 'Loading...', err: 'Error: network or API problem', profile: 'Profile',
        lang: 'Language', out: 'Log out', weak: 'Weak', mid: 'Medium', strong: 'Strong',
        vstrong: 'Very strong', bad: 'Wrong nickname or password', taken: 'Nickname taken',
        mail: 'Invalid email', short: 'Password min 8 chars', res: 'Results',
        repeatOn: 'Repeat track ON', repeatOff: 'Repeat track OFF',
        clearAll: 'Clear all', newPl: 'New playlist', plName: 'Playlist name...',
        create: 'Create', addToPl: 'Add to playlist', addedToPl: 'Added to playlist',
        alreadyInPl: 'Already in playlist', share: 'Share link', linkCopied: 'Share link copied!',
        sharedPl: 'Shared Playlist', importPl: 'Save to my playlists', imported: 'Playlist saved!',
        songsCount: 'songs', addSong: 'Add song', addCustom: 'Add any song (search or URL)',
        songTitle: 'Song title', songArtist: 'Artist name', songUrl: 'Audio URL (optional)',
        add: 'Add', changePhoto: 'Upload photo', removePhoto: 'Remove', photoSaved: 'Profile photo updated', switchAcc: 'Switch / Sign up account',
        playAll: 'Play all'
    },
    ru: {
        home: 'Главная', fav: 'Избранное', pls: 'Плейлисты', arch: 'История',
        login: 'Войти', reg: 'Регистрация', nick: 'Ник', pass: 'Пароль', pass8: 'Пароль (мин. 8 символов)',
        search: 'Поиск песен или артистов...', trend: 'В тренде', uzb: 'Узбекские песни',
        world: 'Зарубежные', empty: 'Пока пусто', none: 'Ничего не найдено',
        load: 'Загрузка...', err: 'Ошибка сети или API', profile: 'Профиль',
        lang: 'Язык', out: 'Выйти', weak: 'Слабый', mid: 'Средний', strong: 'Сильный',
        vstrong: 'Очень сильный', bad: 'Неверный ник или пароль', taken: 'Ник занят',
        mail: 'Неверный email', short: 'Пароль мин. 8 символов', res: 'Результаты',
        repeatOn: 'Повтор трека включен', repeatOff: 'Повтор трека выключен',
        clearAll: 'Очистить всё', newPl: 'Новый плейлист', plName: 'Название плейлиста...',
        create: 'Создать', addToPl: 'Добавить в плейлист', addedToPl: 'Добавлено в плейлист',
        alreadyInPl: 'Уже в плейлисте', share: 'Поделиться', linkCopied: 'Ссылка скопирована!',
        sharedPl: 'Общий плейлист', importPl: 'Сохранить себе', imported: 'Плейлист сохранён!',
        songsCount: 'песен', addSong: 'Добавить песню', addCustom: 'Добавить любую песню (поиск или URL)',
        songTitle: 'Название песни', songArtist: 'Исполнитель', songUrl: 'Ссылка на аудио (необязательно)',
        add: 'Добавить', changePhoto: 'Загрузить фото', removePhoto: 'Удалить', photoSaved: 'Фото профиля обновлено', switchAcc: 'Сменить / Создать аккаунт',
        playAll: 'Слушать всё'
    }
};

let lang = L('mm_lang', 'uz'), user = L('mm_user', null), queue = [], idx = -1, view = 'home', lists = [], cache = {};
let repeatOne = L('mm_rep', false);
let activePlId = null, sharedData = null;

const t = k => T[lang]?.[k] || k;
const hash = s => { let h = 5381; for (const c of s + 'mm~salt') h = (h * 33 ^ c.charCodeAt(0)) >>> 0; return h.toString(36) };
const favs = () => user ? L('mm_fav_' + user.nick, []) : [];
const arch = () => user ? L('mm_arch_' + user.nick, []) : [];
const pls = () => user ? L('mm_pls_' + user.nick, []) : [];
const savePls = a => user && S('mm_pls_' + user.nick, a);
const isFav = id => user && favs().some(x => x.id === id);

let toastT;
function toast(msg) {
    const el = $('#toast');
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastT);
    toastT = setTimeout(() => el.classList.remove('show'), 2200);
}

/* ---------- Shared Playlist URL Parser ---------- */
function checkSharedLink() {
    try {
        const h = location.hash;
        if (h.startsWith('#pl=')) {
            const raw = decodeURIComponent(escape(atob(h.slice(4))));
            const parsed = JSON.parse(raw);
            if (parsed && parsed.name && Array.isArray(parsed.tracks)) {
                parsed.tracks.forEach(tr => cache[tr.id] = tr);
                sharedData = parsed;
            }
        }
    } catch { }
}
checkSharedLink();

/* ---------- i18n / theme ---------- */
function setLang(l) {
    lang = l;
    S('mm_lang', lang);
    applyLang();
}

function applyLang() {
    document.documentElement.lang = lang;
    $$('[data-i]').forEach(e => e.textContent = t(e.dataset.i));
    $$('[data-p]').forEach(e => e.placeholder = t(e.dataset.p));
    $$('[data-gl]').forEach(b => b.classList.toggle('on', b.dataset.gl === lang));
    if ($('#q')) $('#q').placeholder = t('search');
    meter();
    // Only re-render local views (profile, favs, pls, arch, pl_detail, shared) without hitting API on home/search
    if ((user || sharedData) && ['profile', 'favs', 'pls', 'arch', 'pl_detail', 'shared'].includes(view)) {
        show(view);
    } else if (user || sharedData) {
        // Update visible section headings & empty/loading texts cleanly in place
        $$('h2.sec').forEach(h => {
            if (h.dataset.k) h.textContent = t(h.dataset.k);
        });
        $$('.empty').forEach(p => {
            p.textContent = (view === 'search') ? t('none') : t('empty');
        });
        $$('.load').forEach(p => p.textContent = t('load'));
    }
}

$$('[data-gl]').forEach(b => b.onclick = () => setLang(b.dataset.gl));

function setTheme(v) {
    document.documentElement.dataset.theme = v;
    S('mm_theme', v);
    const icon = v === 'dark' ? '#i-sun' : '#i-moon';
    if ($('#th use')) $('#th use').setAttribute('href', icon);
    if ($('#th-d use')) $('#th-d use').setAttribute('href', icon);
}
setTheme(L('mm_theme', 'dark'));
$('#th').onclick = () => setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
if ($('#th-d')) $('#th-d').onclick = () => setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');

/* ---------- Avatar Helper ---------- */
function getAvatar() {
    if (!user) return '';
    return L('mm_av_' + user.nick, '');
}
function renderNavAvatar() {
    const av = getAvatar();
    const el = $('#nav-av');
    if (!el) return;
    el.innerHTML = av ? `<img src="${av}" alt="">` : ic('user');
}

/* ---------- auth ---------- */
$$('.tabs button').forEach(b => b.onclick = () => {
    $$('.tabs button').forEach(x => x.classList.toggle('on', x === b));
    $('#fl').hidden = b.dataset.t !== 'login';
    $('#fr').hidden = b.dataset.t !== 'reg';
    $('#am').textContent = '';
});
function score(p) {
    let s = 0;
    if (p.length >= 8) s++;
    if (p.length >= 12) s++;
    if (/[A-Z]/.test(p) && /[a-z]/.test(p)) s++;
    if (/\d/.test(p)) s++;
    if (/[^\w\s]/.test(p)) s++;
    return Math.min(s, 4);
}
function meter() {
    const p = $('#rp').value, s = p ? score(p) : 0, c = ['#ef4444', '#f59e0b', '#84cc16', '#4ade80', '#16a34a'];
    $('#mb').style.width = (s / 4 * 100) + '%';
    $('#mb').style.background = c[s];
    $('#ml').textContent = p ? t(['weak', 'weak', 'mid', 'strong', 'vstrong'][s]) : '';
}
$('#rp').oninput = meter;
$('#fr').onsubmit = e => {
    e.preventDefault();
    const em = $('#re').value.trim(), n = $('#rn').value.trim(), p = $('#rp').value, us = L('mm_users', {}), m = $('#am');
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em)) return m.textContent = t('mail');
    if (n.length < 2) return m.textContent = t('nick');
    if (us[n.toLowerCase()]) return m.textContent = t('taken');
    if (p.length < 8) return m.textContent = t('short');
    us[n.toLowerCase()] = { nick: n, email: em, ph: hash(p) };
    S('mm_users', us);
    enter({ nick: n, email: em });
};
$('#fl').onsubmit = e => {
    e.preventDefault();
    const u = L('mm_users', {})[$('#ln').value.trim().toLowerCase()];
    if (!u || u.ph !== hash($('#lp').value)) return $('#am').textContent = t('bad');
    enter({ nick: u.nick, email: u.email });
};
function enter(u) {
    user = u;
    S('mm_user', u);
    $('#auth').hidden = true;
    $('#app').hidden = false;
    $('#nk').textContent = u.nick;
    $('#am').textContent = '';
    renderNavAvatar();
    show(sharedData ? 'shared' : 'home');
}
function logout() {
    au.pause();
    $('#mini').hidden = true;
    $('#full').classList.remove('open');
    queue = [];
    idx = -1;
    user = null;
    localStorage.removeItem('mm_user');
    $('#app').hidden = true;
    $('#auth').hidden = false;
}

/* ---------- API ---------- */
async function get(p) {
    const r = await fetch(`${API}${p}${p.includes('?') ? '&' : '?'}${APP}`);
    if (!r.ok) throw new Error(r.status);
    return (await r.json()).data.filter(x => x.is_streamable !== false).map(x => {
        const o = { id: x.id, title: x.title, artist: x.user?.name || '', art: x.artwork?.['480x480'] || x.artwork?.['150x150'] || '' };
        cache[o.id] = o;
        return o;
    });
}
const UZ = ['Munisa Rizayeva', 'Ozodbek Nazarbekov', "Sherali Jo'rayev", 'Sherali Jorayev', 'Konsta', 'Shahzoda', 'Rayhon', 'Jaloliddin Ahmadaliyev', 'Ulugbek Rahmatullayev', 'Xamdam Sobirov', 'Cheksiz', 'Malikli', 'Lola Yuldasheva', 'Ziyoda', "Dilso'z", 'Benom'];
async function itu(q, n = 6, byArtist = false) {
    const r = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(q)}&media=music&entity=song&limit=${n}${byArtist ? '&attribute=artistTerm' : ''}`);
    if (!r.ok) throw new Error(r.status);
    return (await r.json()).results.filter(x => x.previewUrl).map(x => {
        const o = { id: 'it' + x.trackId, title: x.trackName, artist: x.artistName, art: (x.artworkUrl100 || '').replace('100x100', '400x400'), src: x.previewUrl };
        cache[o.id] = o;
        return o;
    });
}
const uniq = a => { const m = new Set; return a.filter(x => !m.has(x.id) && m.add(x.id)) };
const ok = async ps => uniq((await Promise.allSettled(ps)).flatMap(r => r.status === 'fulfilled' ? r.value : []));
const sq = (q, n = 12) => get(`/tracks/search?query=${encodeURIComponent(q)}&limit=${n}`);

/* ---------- Views & Components ---------- */
const card = (x, n, i) => `
<div class="card" data-l="${n}" data-i="${i}">
    <div class="cv">${x.art ? `<img src="${esc(x.art)}" loading="lazy" alt="" onerror="this.remove()">` : ''}<i class="pl">▶</i></div>
    <b>${esc(x.title)}</b>
    <small>${esc(x.artist)}</small>
    <div class="card-acts">
        <button class="ib ab" data-add="${esc(x.id)}" title="${t('addToPl')}">${ic('plus')}</button>
        <button class="ib hb ${isFav(x.id) ? 'on' : ''}" data-id="${esc(x.id)}">${ic('heart')}</button>
    </div>
</div>`;

const grid = a => {
    lists.push(a);
    const n = lists.length - 1;
    return a.length ? `<div class="grid">${a.map((x, i) => card(x, n, i)).join('')}</div>` : `<p class="empty">${t('none')}</p>`;
};

const rows = (a, opts = {}) => {
    if (!a.length) return `<p class="empty">${t('empty')}</p>`;
    lists.push(a);
    const n = lists.length - 1;
    return a.map((x, i) => {
        cache[x.id] = x;
        return `<div class="row" data-l="${n}" data-i="${i}">
            <img src="${esc(x.art)}" alt="" onerror="this.style.visibility='hidden'">
            <div class="r-info"><b>${esc(x.title)}</b><small>${esc(x.artist)}</small></div>
            ${x.at ? `<time>${new Date(x.at).toLocaleDateString(lang)}<br>${new Date(x.at).toLocaleTimeString(lang, { hour: '2-digit', minute: '2-digit' })}</time>` : ''}
            <div class="row-acts">
                ${opts.archIdx ? `<button class="ib" data-del-arch="${i}" title="O'chirish">${ic('x')}</button>` : ''}
                ${opts.plId ? `<button class="ib" data-del-pltr="${opts.plId}:${i}" title="O'chirish">${ic('x')}</button>` : ''}
                ${!opts.archIdx && !opts.plId ? `<button class="ib" data-add="${esc(x.id)}" title="${t('addToPl')}">${ic('plus')}</button>` : ''}
                <button class="ib hb ${isFav(x.id) ? 'on' : ''}" data-id="${esc(x.id)}">${ic('heart')}</button>
            </div>
        </div>`;
    }).join('');
};

const sec = (k, h, extra = '') => `<div class="sec-hd"><h2 class="sec" data-k="${k}">${t(k)}</h2>${extra}</div>${h}`;

let token = 0;
async function show(v, q) {
    view = v;
    const my = ++token;
    lists = [];
    $$('nav button,.prof').forEach(b => b.classList.toggle('on', b.dataset.v === v || (v === 'pl_detail' && b.dataset.v === 'pls')));
    const el = $('#view'), done = h => { if (my === token) el.innerHTML = h };

    if (v === 'favs') return done(sec('fav', rows(favs())));

    if (v === 'arch') {
        const a = arch();
        const clearBtn = a.length ? `<button class="btn sm sec-btn" id="clear-arch">${ic('x')} ${t('clearAll')}</button>` : '';
        return done(sec('arch', rows(a, { archIdx: true }), clearBtn));
    }

    if (v === 'pls') {
        const list = pls();
        const createBtn = `<button class="btn sm" id="new-pl-btn">${ic('plus')} ${t('newPl')}</button>`;
        const body = list.length ? `<div class="pl-grid">${list.map(p => `
            <div class="pl-card" data-open-pl="${esc(p.id)}">
                <div class="pl-top">
                    <div class="pl-ico">${ic('list')}</div>
                    <div class="pl-meta">
                        <b>${esc(p.name)}</b>
                        <small>${p.tracks.length} ${t('songsCount')}</small>
                    </div>
                </div>
                <div class="pl-btns">
                    <button class="ib" data-share-pl="${esc(p.id)}" title="${t('share')}">${ic('share')}</button>
                    <button class="ib" data-del-pl="${esc(p.id)}" title="Delete">${ic('x')}</button>
                </div>
            </div>`).join('')}</div>` : `<p class="empty">${t('empty')}</p>`;
        return done(sec('pls', body, createBtn));
    }

    if (v === 'pl_detail') {
        const p = pls().find(x => x.id === activePlId);
        if (!p) return show('pls');
        return done(`
            <div class="pl-banner">
                <div>
                    <h2 style="margin-bottom:4px">${esc(p.name)}</h2>
                    <small>${p.tracks.length} ${t('songsCount')}</small>
                </div>
                <div class="h-acts" style="flex-wrap:wrap">
                    ${p.tracks.length ? `<button class="btn sm" id="play-pl-all">▶ ${t('playAll')}</button>` : ''}
                    <button class="btn sm sec-btn" id="add-custom-tr">${ic('plus')} ${t('addSong')}</button>
                    <button class="btn sm sec-btn" data-share-pl="${esc(p.id)}">${ic('share')} ${t('share')}</button>
                </div>
            </div>
            ${rows(p.tracks, { plId: p.id })}
        `);
    }

    if (v === 'shared' && sharedData) {
        return done(`
            <div class="pl-banner">
                <div>
                    <small style="text-transform:uppercase;letter-spacing:1px">${t('sharedPl')}</small>
                    <h2 style="margin:4px 0">${esc(sharedData.name)}</h2>
                    <small>${sharedData.tracks.length} ${t('songsCount')}</small>
                </div>
                <div class="h-acts" style="flex-wrap:wrap">
                    ${sharedData.tracks.length ? `<button class="btn sm" id="play-sh-all">▶ ${t('playAll')}</button>` : ''}
                    ${user ? `<button class="btn sm sec-btn" id="import-sh">${ic('plus')} ${t('importPl')}</button>` : ''}
                </div>
            </div>
            ${rows(sharedData.tracks)}
        `);
    }

    if (v === 'profile') {
        const av = getAvatar();
        const a = arch();
        const clearBtn = a.length ? `<button class="btn sm sec-btn" id="clear-arch">${ic('x')} ${t('clearAll')}</button>` : '';
        return done(`
            <h2 class="sec">${t('profile')}</h2>
            <div class="pbox">
                <div class="ph">
                    <div class="av-wrap" id="pick-av" title="${t('changePhoto')}">
                        <span class="av lg">${av ? `<img src="${av}" alt="">` : ic('user')}</span>
                        <span class="av-cam">${ic('cam')}</span>
                    </div>
                    <div class="p-info">
                        <b>${esc(user.nick)}</b>
                        <small>${esc(user.email)}</small>
                        <div class="av-acts" style="margin-top:6px">
                            <button class="btn sm sec-btn" id="btn-av-up">${t('changePhoto')}</button>
                            ${av ? `<button class="btn sm out" id="btn-av-del">${t('removePhoto')}</button>` : ''}
                        </div>
                    </div>
                    <input type="file" id="av-file" accept="image/*" hidden>
                </div>
                <div class="lab">${t('lang')}</div>
                <div class="seg">
                    ${[['uz', "O'zbekcha"], ['en', 'English'], ['ru', 'Русский']].map(([l, n]) => `<button data-lg="${l}" class="${l === lang ? 'on' : ''}"><b>${l.toUpperCase()}</b>${n}</button>`).join('')}
                </div>
                <div style="display:grid;gap:8px">
                    <button class="btn sec-btn" id="open-auth-reg">${t('switchAcc')}</button>
                    <button class="btn out" id="lo">${t('out')}</button>
                </div>
            </div>
            ${sec('fav', rows(favs()))}
            ${sec('arch', rows(a, { archIdx: true }), clearBtn)}
        `);
    }

    el.innerHTML = `<p class="load">${t('load')}</p>`;
    try {
        if (v === 'search') {
            const a = await ok([itu(q, 20), sq(q, 20)]);
            return done(sec('res', grid(a)));
        }
        const R = await Promise.allSettled([get('/tracks/trending?limit=20'), ok(UZ.map(x => itu(x, 5, true))), ok([itu('Konsta', 8, true), sq('Konsta', 8)]), sq('Eminem')]);
        const g = i => R[i].status === 'fulfilled' ? R[i].value : [];
        if (R.every(r => r.status === 'rejected')) throw 0;
        done(sec('uzb', grid(g(1))) + sec('trend', grid(g(0))) + '<h2 class="sec">Konsta</h2>' + grid(g(2)) + sec('world', grid(g(3))));
    } catch {
        done(`<p class="empty">${t('err')}</p>`);
    }
}

/* ---------- Modal Logic ---------- */
const modal = $('#modal'), mbody = $('#mbody');
const closeModal = () => modal.hidden = true;
modal.onclick = e => { if (e.target === modal) closeModal(); };

function openCreatePlModal(trackToAdd = null) {
    mbody.innerHTML = `
        <div class="mhead"><b>${t('newPl')}</b><button class="ib" id="mclose">${ic('x')}</button></div>
        <form id="cpl-form" style="display:grid;gap:12px">
            <input id="cpl-name" placeholder="${t('plName')}" required maxlength="50">
            <button class="btn">${t('create')}</button>
        </form>`;
    modal.hidden = false;
    $('#mclose').onclick = closeModal;
    $('#cpl-name').focus();
    $('#cpl-form').onsubmit = e => {
        e.preventDefault();
        const name = $('#cpl-name').value.trim();
        if (!name) return;
        const list = pls();
        const np = { id: 'pl_' + Date.now().toString(36), name, tracks: trackToAdd ? [trackToAdd] : [] };
        list.unshift(np);
        savePls(list);
        closeModal();
        toast(trackToAdd ? t('addedToPl') : t('newPl'));
        if (view === 'pls') show('pls');
    };
}

function openAddToPlModal(tr) {
    if (!tr) return;
    const list = pls();
    mbody.innerHTML = `
        <div class="mhead"><b>${t('addToPl')}</b><button class="ib" id="mclose">${ic('x')}</button></div>
        <div class="mlist">
            <button class="mitem" id="m-new-pl"><b>+ ${t('newPl')}</b></button>
            ${list.map(p => `<button class="mitem" data-pick-pl="${esc(p.id)}"><span>${esc(p.name)}</span><small>${p.tracks.length} ${t('songsCount')}</small></button>`).join('')}
        </div>`;
    modal.hidden = false;
    $('#mclose').onclick = closeModal;
    $('#m-new-pl').onclick = () => openCreatePlModal(tr);
    $$('[data-pick-pl]').forEach(btn => btn.onclick = () => {
        const list = pls();
        const p = list.find(x => x.id === btn.dataset.pickPl);
        if (p) {
            if (p.tracks.some(x => x.id === tr.id)) {
                toast(t('alreadyInPl'));
            } else {
                p.tracks.unshift({ id: tr.id, title: tr.title, artist: tr.artist, art: tr.art, src: tr.src });
                savePls(list);
                toast(t('addedToPl'));
            }
        }
        closeModal();
    });
}

function openAddCustomSongModal(plId) {
    mbody.innerHTML = `
        <div class="mhead"><b>${t('addCustom')}</b><button class="ib" id="mclose">${ic('x')}</button></div>
        <form id="csong-form" style="display:grid;gap:10px">
            <input id="cs-title" placeholder="${t('songTitle')}" required>
            <input id="cs-artist" placeholder="${t('songArtist')}">
            <input id="cs-url" placeholder="${t('songUrl')}">
            <button class="btn">${t('add')}</button>
        </form>`;
    modal.hidden = false;
    $('#mclose').onclick = closeModal;
    $('#cs-title').focus();
    $('#csong-form').onsubmit = async e => {
        e.preventDefault();
        const title = $('#cs-title').value.trim();
        const artist = $('#cs-artist').value.trim() || 'Unknown';
        const url = $('#cs-url').value.trim();
        if (!title) return;

        const list = pls();
        const p = list.find(x => x.id === plId);
        if (!p) return closeModal();

        if (url) {
            const tr = { id: 'cust_' + Date.now().toString(36), title, artist, art: '', src: url };
            cache[tr.id] = tr;
            p.tracks.unshift(tr);
            savePls(list);
            closeModal();
            toast(t('addedToPl'));
            show('pl_detail');
        } else {
            // Search matching song automatically
            const found = await ok([itu(`${title} ${artist}`, 1), sq(`${title} ${artist}`, 1)]);
            const tr = found[0] || { id: 'cust_' + Date.now().toString(36), title, artist, art: '', src: '' };
            cache[tr.id] = tr;
            p.tracks.unshift(tr);
            savePls(list);
            closeModal();
            toast(t('addedToPl'));
            show('pl_detail');
        }
    };
}

function sharePlaylist(plId) {
    const p = pls().find(x => x.id === plId);
    if (!p) return;
    const payload = {
        name: p.name,
        tracks: p.tracks.slice(0, 25).map(x => ({ id: x.id, title: x.title, artist: x.artist, art: x.art, src: x.src || '' }))
    };
    const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
    const url = `${location.origin}${location.pathname}#pl=${encoded}`;
    if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => toast(t('linkCopied'))).catch(() => prompt('Link:', url));
    } else {
        prompt('Link:', url);
    }
}

/* ---------- View Event Delegation ---------- */
$('#view').onclick = e => {
    const g = e.target.closest('[data-lg]');
    if (g) return setLang(g.dataset.lg);

    const h = e.target.closest('.hb');
    if (h) return fav(cache[h.dataset.id]);

    const addBtn = e.target.closest('[data-add]');
    if (addBtn) return openAddToPlModal(cache[addBtn.dataset.add]);

    const delArch = e.target.closest('[data-del-arch]');
    if (delArch) {
        const idxToDel = +delArch.dataset.delArch;
        const a = arch();
        a.splice(idxToDel, 1);
        S('mm_arch_' + user.nick, a);
        return show(view);
    }

    if (e.target.closest('#clear-arch')) {
        S('mm_arch_' + user.nick, []);
        return show(view);
    }

    if (e.target.closest('#new-pl-btn')) return openCreatePlModal();

    const shBtn = e.target.closest('[data-share-pl]');
    if (shBtn) return sharePlaylist(shBtn.dataset.sharePl);

    const delPl = e.target.closest('[data-del-pl]');
    if (delPl) {
        const id = delPl.dataset.delPl;
        savePls(pls().filter(x => x.id !== id));
        return show('pls');
    }

    const delPlTr = e.target.closest('[data-del-pltr]');
    if (delPlTr) {
        const [pid, tidx] = delPlTr.dataset.delPltr.split(':');
        const list = pls();
        const p = list.find(x => x.id === pid);
        if (p) {
            p.tracks.splice(+tidx, 1);
            savePls(list);
        }
        return show('pl_detail');
    }

    const openPl = e.target.closest('[data-open-pl]');
    if (openPl) {
        activePlId = openPl.dataset.openPl;
        return show('pl_detail');
    }

    if (e.target.closest('#play-pl-all')) {
        const p = pls().find(x => x.id === activePlId);
        if (p && p.tracks.length) play(p.tracks, 0);
        return;
    }

    if (e.target.closest('#add-custom-tr')) return openAddCustomSongModal(activePlId);

    if (e.target.closest('#play-sh-all') && sharedData?.tracks?.length) {
        return play(sharedData.tracks, 0);
    }

    if (e.target.closest('#import-sh') && sharedData) {
        const list = pls();
        list.unshift({ id: 'pl_' + Date.now().toString(36), name: sharedData.name, tracks: sharedData.tracks });
        savePls(list);
        toast(t('imported'));
        return;
    }

    if (e.target.closest('#pick-av') || e.target.closest('#btn-av-up')) {
        return $('#av-file').click();
    }

    if (e.target.closest('#btn-av-del')) {
        localStorage.removeItem('mm_av_' + user.nick);
        renderNavAvatar();
        toast(t('photoSaved'));
        return show('profile');
    }

    const c = e.target.closest('[data-l]');
    if (c) play(lists[c.dataset.l], +c.dataset.i);

    if (e.target.id === 'lo') logout();
    if (e.target.id === 'open-auth-reg') openAuthScreen('reg');
};

$('#view').onchange = e => {
    if (e.target.id === 'av-file' && e.target.files?.[0]) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = ev => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const size = 240;
                canvas.width = size;
                canvas.height = size;
                const ctx = canvas.getContext('2d');
                const min = Math.min(img.width, img.height);
                const sx = (img.width - min) / 2;
                const sy = (img.height - min) / 2;
                ctx.drawImage(img, sx, sy, min, min, 0, 0, size, size);
                const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
                S('mm_av_' + user.nick, dataUrl);
                renderNavAvatar();
                toast(t('photoSaved'));
                show('profile');
            };
            img.src = ev.target.result;
        };
        reader.readAsDataURL(file);
    }
};

$$('[data-v]').forEach(b => b.onclick = () => show(b.dataset.v));
$('#sf').onsubmit = e => { e.preventDefault(); const q = $('#q').value.trim(); q && show('search', q) };

/* ---------- favorites / archive ---------- */
function fav(tr) {
    if (!tr || !user) return;
    let a = favs();
    a = a.some(x => x.id === tr.id) ? a.filter(x => x.id !== tr.id) : [{ id: tr.id, title: tr.title, artist: tr.artist, art: tr.art, src: tr.src }, ...a];
    S('mm_fav_' + user.nick, a);
    syncHearts();
    if (view === 'favs' || view === 'profile') show(view);
}
function syncHearts() {
    $$('.hb[data-id]').forEach(b => b.classList.toggle('on', isFav(b.dataset.id)));
    const c = queue[idx];
    ['#mh', '#fh'].forEach(s => $(s).classList.toggle('on', !!c && isFav(c.id)));
}
function log(tr) {
    if (!user) return;
    const a = arch();
    a.unshift({ id: tr.id, title: tr.title, artist: tr.artist, art: tr.art, src: tr.src, at: Date.now() });
    S('mm_arch_' + user.nick, a.slice(0, 200));
    if (view === 'arch') show('arch');
}

/* ---------- player ---------- */
const mini = $('#mini'), full = $('#full');
let hideT;
[...full.children].forEach((c, i) => c.style.setProperty('--d', i));
const au = $('#au'), fmt = s => isFinite(s) ? Math.floor(s / 60) + ':' + String(Math.floor(s % 60)).padStart(2, '0') : '0:00';

function syncRepeatUI() {
    ['#mrp', '#frp'].forEach(s => $(s).classList.toggle('active-loop', repeatOne));
}
syncRepeatUI();

function toggleRepeat() {
    repeatOne = !repeatOne;
    S('mm_rep', repeatOne);
    syncRepeatUI();
    toast(repeatOne ? t('repeatOn') : t('repeatOff'));
}
$('#mrp').onclick = $('#frp').onclick = toggleRepeat;
$('#fpl-add').onclick = () => { if (queue[idx]) openAddToPlModal(queue[idx]); };

function play(list, i) {
    if (!list || !list[i]) return;
    queue = list;
    idx = i;
    const tr = queue[i];
    au.src = tr.src || `${API}/tracks/${tr.id}/stream?${APP}`;
    au.play().catch(() => { });
    log(tr);
    clearTimeout(hideT);
    mini.classList.remove('out');
    mini.hidden = false;
    $('#mi').src = $('#fi').src = $('#fbg img').src = tr.art || '';
    $('#mti').textContent = $('#fti').textContent = tr.title;
    $('#mar').textContent = $('#far').textContent = tr.artist;
    syncHearts();
}
const step = d => { if (queue.length) play(queue, (idx + d + queue.length) % queue.length) };
const toggle = () => au.paused ? au.play() : au.pause();
au.onplay = au.onpause = () => $$('.pp use').forEach(u => u.setAttribute('href', au.paused ? '#i-play' : '#i-pause'));
au.onended = () => {
    if (repeatOne) {
        au.currentTime = 0;
        au.play().catch(() => { });
    } else {
        step(1);
    }
};
au.onerror = () => { if (queue.length > 1) step(1) };
au.ontimeupdate = () => {
    $('#tc').textContent = fmt(au.currentTime);
    $('#td').textContent = fmt(au.duration);
    if (au.duration) {
        const p = au.currentTime / au.duration * 100;
        $('#sk').value = p;
        $('#mpg').style.width = p + '%';
    }
};
$('#sk').oninput = e => { if (au.duration) au.currentTime = e.target.value / 100 * au.duration };
$('#vl').oninput = e => au.volume = +e.target.value;
au.volume = .8;
$('#mp').onclick = $('#fp').onclick = toggle;
$('#nx').onclick = () => step(1);
$('#pv').onclick = () => step(-1);
$('#b10').onclick = () => au.currentTime = Math.max(0, au.currentTime - 10);
$('#f10').onclick = () => au.currentTime = Math.min(au.duration || 0, au.currentTime + 10);
$('#mh').onclick = $('#fh').onclick = () => fav(queue[idx]);
$('#mx').onclick = () => {
    au.pause();
    au.removeAttribute('src');
    closeFull();
    mini.classList.add('out');
    hideT = setTimeout(() => { mini.hidden = true; mini.classList.remove('out') }, 350);
    queue = [];
    idx = -1;
};
const openFull = () => full.classList.add('open'), closeFull = () => full.classList.remove('open');
$('#mu').onclick = openFull;
$('#fb').onclick = closeFull;

/* drag: mini up -> opens, full down -> closes; tap on mini opens */
let y0 = null, dy = 0, mode = '';
const rel = () => { full.classList.remove('drag'); full.style.transform = full.style.opacity = full.style.visibility = '' };
mini.addEventListener('pointerdown', e => { if (e.target.closest('button')) return; y0 = e.clientY; dy = 0; mode = 'up'; mini.setPointerCapture(e.pointerId) });
full.addEventListener('pointerdown', e => { if (e.target.closest('button,input')) return; y0 = e.clientY; dy = 0; mode = 'down' });
addEventListener('pointermove', e => {
    if (y0 === null) return;
    if (mode === 'up') {
        dy = Math.min(0, e.clientY - y0);
        const p = Math.min(1, -dy / 260);
        if (p > .03) {
            full.classList.add('drag');
            full.style.visibility = 'visible';
            full.style.opacity = p;
            full.style.transform = `translateY(${(1 - p) * 22}%) scale(${.55 + .45 * p})`;
        }
    } else {
        dy = Math.max(0, e.clientY - y0);
        const p = Math.min(1, dy / 300);
        full.classList.add('drag');
        full.style.transform = `translateY(${dy * .6}px) scale(${1 - .12 * p})`;
        full.style.opacity = 1 - .5 * p;
    }
});
const end = () => {
    if (y0 === null) return;
    const m = mode, d = dy;
    y0 = null;
    rel();
    if (m === 'up') { if (d < -70 || d > -6) openFull() }
    else if (d > 110) closeFull();
};
addEventListener('pointerup', end);
addEventListener('pointercancel', () => { if (y0 !== null) { y0 = null; rel() } });
document.addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT' || !user) return;
    if (e.code === 'Space') { e.preventDefault(); toggle() }
    if (e.key === 'Escape') closeFull();
});

applyLang();
if (user) {
    enter(user);
} else if (sharedData) {
    // Allow viewing shared playlist even before login, or auto-guest view
    $('#auth').hidden = true;
    $('#app').hidden = false;
    $('#nk').textContent = 'Guest';
    show('shared');
}

function openAuthScreen(tab = 'login') {
    $('#auth').hidden = false;
    const b = $(`.tabs button[data-t="${tab}"]`);
    if (b) b.click();
}
if ($('#go-auth')) $('#go-auth').onclick = () => openAuthScreen('login');
if ($('#go-auth-d')) $('#go-auth-d').onclick = () => openAuthScreen('login');
