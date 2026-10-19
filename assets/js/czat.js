/* Czat elektroden — asystent AI na stronie.
   Wiadomości idą do n8n (/webhook/czat), ten zapisuje rozmowę i zgłoszenie w bazie.
   Gdy asystent nie odpowiada — w oknie pojawia się krótki formularz, który idzie tą samą drogą co formularz kontaktowy.
   Nic nie ładuje się z zewnątrz i nic nie leci do serwera, dopóki ktoś nie napisze. */
(function () {
  'use strict';

  var API = 'https://n8n.elektroden.pl/webhook/czat';
  var FORMULARZ = 'https://n8n.elektroden.pl/webhook/kontakt';
  var TEL = '+48573568390', TEL_TXT = '+48 573 568 390';
  var WA = 'https://wa.me/48571287125';
  var POWITANIE = 'Dzień dobry! Napisz, co dzieje się z autem, i zostaw numer telefonu — mechanik oddzwoni.';
  var KLUCZ = 'elektroden-czat';
  var LIMIT_ZNAKOW = 600;
  var CZEKAMY_MS = 30000;
  var ZAPROSZENIE_PO_MS = 10000;                 // po ilu sekundach na stronie pokazać zaproszenie
  var ZAPROSZENIE_TEKST = 'Masz problem z autem? Napisz do naszego asystenta — oddzwonimy.';
  var ZAPROSZENIE_PRZERWA_DNI = 3;               // zamknięte krzyżykiem — nie pokazujemy przez tyle dni

  var skrypt = document.currentScript;
  var baza = skrypt ? skrypt.src.replace(/js\/czat\.js.*$/, '') : '/assets/';

  // ---------- stan rozmowy: w sessionStorage, żeby przetrwał przejście na inną podstronę ----------
  function wczytaj() {
    try { var s = JSON.parse(sessionStorage.getItem(KLUCZ) || 'null'); if (s && s.sesja) return s; } catch (e) {}
    return null;
  }
  function zapisz() {
    try { sessionStorage.setItem(KLUCZ, JSON.stringify(stan)); } catch (e) {}
  }
  function nowaSesja() {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    return 'cz-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 12);
  }
  var stan = wczytaj() || { sesja: nowaSesja(), wiadomosci: [], otwarty: false };

  // ---------- style: osobny plik obok, dokładany od razu (lekki) ----------
  var css = document.createElement('link');
  css.rel = 'stylesheet';
  css.href = baza + 'css/czat.css?v=554bb928a1';
  document.head.appendChild(css);

  // ---------- znaczniki ----------
  var IKONA_CZAT = '<svg viewBox="0 0 24 24" aria-hidden="true">' +
    '<rect class="p" x="2" y="3" width="20" height="15" rx="5"/>' +
    '<path class="p" d="M6.5 16v5.1c0 .55.65.85 1.07.5L13.2 17z"/>' +
    '<circle class="k" cx="7.5" cy="10.5" r="1.6"/><circle class="k" cx="12" cy="10.5" r="1.6"/>' +
    '<circle class="k" cx="16.5" cy="10.5" r="1.6"/></svg>';
  var IKONA_TEL = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24c1.12.37 2.33.57 3.6.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z"/></svg>';
  var IKONA_WA = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M17.5 14.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35zM12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.38 5.06L2 22l5.06-1.35A9.94 9.94 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z"/></svg>';
  var IKONA_X = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M6 6l12 12M18 6L6 18"/></svg>';
  var IKONA_NOWA = '<svg viewBox="0 0 24 24" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M12 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-5"/><path d="M17.6 3.6a2 2 0 0 1 2.8 2.8L12 14.8l-3.6.8.8-3.6z"/></g></svg>';
  var IKONA_WYSLIJ = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M3.4 20.4 21 12 3.4 3.6 3.4 10l12.6 2-12.6 2z"/></svg>';

  var przycisk = document.createElement('button');
  przycisk.type = 'button';
  przycisk.className = 'cz-btn';
  przycisk.setAttribute('aria-label', 'Otwórz czat z warsztatem');
  przycisk.setAttribute('aria-expanded', 'false');
  przycisk.innerHTML =
    '<span class="cz-btn-ikona">' + IKONA_CZAT + '</span>' +
    '<span class="cz-btn-txt"><b>Napisz do nas</b><small>Asystent AI · oddzwonimy</small></span>' +
    '<span class="cz-znaczek" hidden>1</span>';

  var zaproszenie = document.createElement('div');
  zaproszenie.className = 'cz-zapr';
  zaproszenie.hidden = true;
  zaproszenie.innerHTML =
    '<button type="button" class="cz-zapr-x" aria-label="Zamknij powiadomienie">' + IKONA_X + '</button>' +
    '<button type="button" class="cz-zapr-tresc">' +
      '<span class="cz-zapr-glowa"><span class="cz-awatar cz-awatar-maly" aria-hidden="true">' + IKONA_CZAT + '</span>Asystent AI · elektroden</span>' +
      '<span class="cz-zapr-tekst"><span class="cz-pisze"><i></i><i></i><i></i></span></span>' +
    '</button>';

  var okno = document.createElement('div');
  okno.className = 'cz-okno';
  okno.setAttribute('role', 'dialog');
  okno.setAttribute('aria-label', 'Czat z warsztatem elektroden');
  okno.hidden = true;
  okno.innerHTML =
    '<div class="cz-glowa">' +
      '<div class="cz-tytul"><span class="cz-awatar" aria-hidden="true">' + IKONA_CZAT + '</span><div>' +
        '<b>Asystent AI</b> <span class="cz-marka">· elektroden</span>' +
        '<div class="cz-pod">Zostaw numer — oddzwonimy</div>' +
      '</div></div>' +
      '<div class="cz-akcje">' +
        '<button type="button" class="cz-x cz-nowa" aria-label="Nowa rozmowa" title="Nowa rozmowa" hidden>' + IKONA_NOWA + '</button>' +
        '<button type="button" class="cz-x cz-zamknij" aria-label="Zamknij czat" title="Zamknij">' + IKONA_X + '</button>' +
      '</div>' +
    '</div>' +
    '<div class="cz-pytanie" hidden><span>Zacząć nową rozmowę?</span>' +
      '<button type="button" class="cz-tak">Tak</button><button type="button" class="cz-anuluj">Anuluj</button></div>' +
    '<div class="cz-skroty">' +
      '<a class="cz-skrot" href="tel:' + TEL + '">' + IKONA_TEL + 'Zadzwoń: ' + TEL_TXT + '</a>' +
      '<a class="cz-skrot cz-wa" href="' + WA + '" target="_blank" rel="noopener">' + IKONA_WA + 'WhatsApp</a>' +
    '</div>' +
    '<div class="cz-lista" aria-live="polite"></div>' +
    '<form class="cz-pole" autocomplete="off">' +
      '<textarea rows="1" maxlength="' + LIMIT_ZNAKOW + '" placeholder="Napisz wiadomość…" aria-label="Twoja wiadomość"></textarea>' +
      '<button type="submit" class="cz-wyslij" aria-label="Wyślij">' + IKONA_WYSLIJ + '</button>' +
    '</form>' +
    '<div class="cz-stopka">Asystent AI. Rozmowę zapisujemy, żeby mechanik mógł oddzwonić. ' +
      '<a href="/polityka-prywatnosci/">Prywatność</a></div>';

  document.body.appendChild(zaproszenie);
  document.body.appendChild(przycisk);
  document.body.appendChild(okno);

  var lista = okno.querySelector('.cz-lista');
  var pole = okno.querySelector('textarea');
  var formularz = okno.querySelector('.cz-pole');
  var wyslijBtn = okno.querySelector('.cz-wyslij');
  var zajety = false;

  // ---------- wiadomości ----------
  function dymek(kto, tekst) {
    var d = document.createElement('div');
    d.className = 'cz-msg cz-' + kto;
    d.textContent = tekst;
    lista.appendChild(d);
    lista.scrollTop = lista.scrollHeight;
    return d;
  }
  function pokazNowa() {
    okno.querySelector('.cz-nowa').hidden = !stan.wiadomosci.length;
  }
  function dodaj(kto, tekst) {
    stan.wiadomosci.push({ kto: kto, tekst: tekst });
    zapisz();
    dymek(kto, tekst);
    pokazNowa();
  }
  function odswiez() {
    pokazNowa();
    lista.innerHTML = '';
    dymek('bot', POWITANIE);
    stan.wiadomosci.forEach(function (m) { dymek(m.kto, m.tekst); });
  }

  function pisze(wl) {
    var p = lista.querySelector('.cz-pisze');
    if (wl && !p) {
      p = document.createElement('div');
      p.className = 'cz-msg cz-bot cz-pisze';
      p.setAttribute('aria-label', 'Asystent pisze');
      p.innerHTML = '<i></i><i></i><i></i>';
      lista.appendChild(p);
      lista.scrollTop = lista.scrollHeight;
    } else if (!wl && p) {
      p.remove();
    }
  }

  function blokuj(wl) {
    zajety = wl;
    okno.querySelector('.cz-nowa').disabled = wl;
    pole.disabled = wl;
    wyslijBtn.disabled = wl;
    pisze(wl);
  }

  // ---------- wysyłanie ----------
  function wyslij(tekst) {
    tekst = (tekst || '').trim().slice(0, LIMIT_ZNAKOW);
    if (!tekst || zajety) return;
    dodaj('ja', tekst);
    blokuj(true);

    var kontroler = window.AbortController ? new AbortController() : null;
    var zegar = setTimeout(function () { if (kontroler) kontroler.abort(); }, CZEKAMY_MS);

    fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sesja: stan.sesja, wiadomosc: tekst, strona: location.pathname,
        urzadzenie: /Mobi|Android|iPhone/i.test(navigator.userAgent) ? 'telefon' : 'komputer'
      }),
      signal: kontroler ? kontroler.signal : undefined
    }).then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json();
    }).then(function (d) {
      if (!d || !d.ok || !d.odpowiedz) throw new Error('brak odpowiedzi');
      dodaj('bot', d.odpowiedz);
    }).catch(function () {
      awaria();
    }).then(function () {
      clearTimeout(zegar);
      blokuj(false);
      pole.focus();
    });
  }

  // asystent nie odpowiedział — numer i tak trafia do mechanika, przez formularz kontaktowy
  function awaria() {
    if (lista.querySelector('.cz-awaria form')) return;
    var box = document.createElement('div');
    box.className = 'cz-msg cz-bot cz-awaria';
    box.innerHTML =
      '<p>Asystent chwilowo nie odpowiada. Zostaw numer — przekażemy go mechanikowi, oddzwoni.</p>' +
      '<form><input type="tel" inputmode="tel" autocomplete="tel" placeholder="Twój numer telefonu" aria-label="Numer telefonu" required>' +
      '<button type="submit">Wyślij</button></form>' +
      '<p class="cz-awaria-alt">Albo od razu: <a href="tel:' + TEL + '">' + TEL_TXT + '</a> · <a href="' + WA + '" target="_blank" rel="noopener">WhatsApp</a></p>';
    lista.appendChild(box);
    lista.scrollTop = lista.scrollHeight;

    var f = box.querySelector('form');
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var tel = f.querySelector('input').value.trim();
      if (tel.replace(/\D/g, '').length < 9) { f.querySelector('input').focus(); return; }
      var opis = stan.wiadomosci.filter(function (m) { return m.kto === 'ja'; })
        .map(function (m) { return m.tekst; }).join(' / ');
      f.querySelector('button').disabled = true;
      fetch(FORMULARZ, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imie: '', email: '', auto: '', telefon: tel,
          opis: 'Z czatu (asystent nie odpowiedział): ' + (opis || '—'),
          strona: location.pathname, jezyk: navigator.language || '' })
      }).then(function (r) {
        if (!r.ok) throw new Error(r.status);
        box.innerHTML = '<p>Dziękujemy! Mechanik oddzwoni w godzinach pracy warsztatu (pn–sb 8:00–20:00).</p>';
      }).catch(function () {
        box.innerHTML = '<p>Nie udało się wysłać. Zadzwoń: <a href="tel:' + TEL + '">' + TEL_TXT +
          '</a> albo napisz na <a href="' + WA + '" target="_blank" rel="noopener">WhatsApp</a>.</p>';
      });
    });
  }

  // ---------- otwieranie i zamykanie ----------
  function otworz() {
    schowajZaproszenie();
    if (!lista.childElementCount) odswiez();
    okno.hidden = false;
    przycisk.setAttribute('aria-expanded', 'true');
    document.documentElement.classList.add('cz-otwarty');
    stan.otwarty = true;
    zapisz();
    setTimeout(function () { pole.focus(); lista.scrollTop = lista.scrollHeight; }, 30);
  }
  function zamknij() {
    okno.hidden = true;
    przycisk.setAttribute('aria-expanded', 'false');
    document.documentElement.classList.remove('cz-otwarty');
    stan.otwarty = false;
    zapisz();
    przycisk.focus();
  }

  przycisk.addEventListener('click', function () { okno.hidden ? otworz() : zamknij(); });
  okno.querySelector('.cz-zamknij').addEventListener('click', zamknij);

  // ---------- nowa rozmowa: nowa sesja, stara zostaje w bazie ----------
  var nowaBtn = okno.querySelector('.cz-nowa');
  var pytanie = okno.querySelector('.cz-pytanie');
  nowaBtn.addEventListener('click', function () {
    if (zajety) return;
    pytanie.hidden = !pytanie.hidden;
    if (!pytanie.hidden) pytanie.querySelector('.cz-tak').focus();
  });
  pytanie.querySelector('.cz-anuluj').addEventListener('click', function () { pytanie.hidden = true; nowaBtn.focus(); });
  pytanie.querySelector('.cz-tak').addEventListener('click', function () {
    if (zajety) return;
    stan = { sesja: nowaSesja(), wiadomosci: [], otwarty: true, zaproszenie: true };
    zapisz();
    pytanie.hidden = true;
    odswiez();
    pole.value = '';
    pole.focus();
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !okno.hidden) zamknij(); });

  formularz.addEventListener('submit', function (e) {
    e.preventDefault();
    var t = pole.value;
    pole.value = '';
    rosnij();
    wyslij(t);
  });
  pole.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); formularz.requestSubmit ? formularz.requestSubmit() : formularz.dispatchEvent(new Event('submit')); }
  });
  function rosnij() {
    pole.style.height = 'auto';
    pole.style.height = Math.min(pole.scrollHeight, 120) + 'px';
  }
  pole.addEventListener('input', rosnij);

  // ---------- zaproszenie po 10 s: raz na wizytę, po krzyżyku — przerwa na kilka dni ----------
  var znaczek = przycisk.querySelector('.cz-znaczek');
  function schowajZaproszenie() {
    zaproszenie.hidden = true;
    znaczek.hidden = true;
  }
  function moznaZaprosic() {
    if (stan.otwarty || stan.zaproszenie || stan.wiadomosci.length || !okno.hidden) return false;
    if (/polityka-prywatnosci/.test(location.pathname)) return false;
    try {
      var kiedy = +localStorage.getItem(KLUCZ + '-zamkniete') || 0;
      if (Date.now() - kiedy < ZAPROSZENIE_PRZERWA_DNI * 864e5) return false;
    } catch (e) {}
    return true;
  }
  function zapros() {
    if (!moznaZaprosic()) return;
    stan.zaproszenie = true;
    zapisz();
    zaproszenie.hidden = false;
    znaczek.hidden = false;
    setTimeout(function () {                        // chwilę „pisze…”, potem tekst
      zaproszenie.querySelector('.cz-zapr-tekst').textContent = ZAPROSZENIE_TEKST;
    }, 1300);
  }
  zaproszenie.querySelector('.cz-zapr-tresc').addEventListener('click', otworz);
  zaproszenie.querySelector('.cz-zapr-x').addEventListener('click', function () {
    schowajZaproszenie();
    try { localStorage.setItem(KLUCZ + '-zamkniete', String(Date.now())); } catch (e) {}
  });
  setTimeout(zapros, ZAPROSZENIE_PO_MS);

  // linki „#czat” na stronie otwierają czat
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href="#czat"]');
    if (a) { e.preventDefault(); otworz(); }
  });
  if (stan.otwarty || location.hash === '#czat') otworz();
})();
