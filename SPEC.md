# ElektroDen — Спецификация сайта v2

> Рабочая спека для разработки. Источники: `specyfikacja_i_seo_elektronika.pdf` (черновик, июнь 2026) + правки Кирилла от 06.07.2026 + данные из Google/FB/IG/объявления владельца. **При расхождении с PDF — верен этот файл.**
> Язык сайта: польский. Все финальные тексты (copy) в этом файле — на польском.

---

## 0. Ключевые решения (правки к PDF)

| # | Решение | Было в PDF |
|---|---------|-----------|
| 1 | **Многостраничник, 6 страниц** (не одностраничный лендинг) | одностраничный LP |
| 2 | **Только WhatsApp. Telegram убрать полностью** — из CTA, футера, всех текстов | WhatsApp + Telegram |
| 3 | **Контактная форма остаётся** (в дополнение к WhatsApp и телефону) | «no-form» воронка |
| 4 | Hero: **аутентичное видео приборки** (щиток приборов / кокпит), не фото | фото из мастерской |
| 5 | **BLOK 4 (кейсы/Realizacje) — отложен**, добавим позже | 3 кейса на главной |
| 6 | BLOK 5: + **ссылка на «прогретый» Facebook** (983 подписчика) и интеграция отзывов Google, если возможно | только Google-виджет |
| 7 | BLOK 6: добавить **все соцпрофили** (FB, IG, Threads, YouTube) | только карта и CTA |
| 8 | Услуг **6** (добавлен Retrofit по образцу retrofitlab.pl); порядок изменён — «Szukanie zwarć» первым | 5 услуг, первым был мобильный сервис |
| 9 | SEO-ядро расширено: VAG/ретрофит-фразы из оффера владельца + локальные Gdańsk/Trójmiasto | 4 таблицы, без city-фраз и VAG |

**ЦА (подтверждено):** частники — TAK · флоты — TAK · перекупы/комисы — TAK · другие СТО (B2B-подряд) — **NIE** (сайт сознательно не для них).

**USP:** *«Podejmujemy się napraw tam, gdzie inni rozłożyli ręce»*. Отсекаем «kasowanie błędów za 50 zł», позиционируемся как эксперт по сложным случаям, альтернатива ASO. Цен на сайте нет (кроме принципа «stała cena za znalezienie przyczyny» в диагностике).

---

## 1. Бизнес-факты (для контента и schema.org)

- **Бренд на сайте:** **elektroden** — всё строчными (решение Кирилла 06.07.2026). В логотипе/шапке/футере — строчное написание; в schema.org `name` держим «ElektroDen» как в визитке Google ради NAP-консистентности (либо позже привести визитку к строчному виду — решить при запуске). Прочие профили: FB «Elektryk Den», IG/Threads @el_gdansk.
- **Домен:** **elektroden.pl** — план купить; DNS не резолвится на 06.07.2026 → скорее всего свободен (подтвердить в панели регистратора)
- **Адрес:** Zawodzie 35, 80-726 Gdańsk (новый адрес с марта 2026)
- **Телефон:** +48 571 287 125 · **WhatsApp: тот же номер (подтверждено)** → `wa.me/48571287125`
- **Часы (подтверждено 06.07.2026 со скриншота Google):** Pn 10:00–19:00 · Wt 10:00–18:00 · Śr 10:00–19:00 · Cz 10:00–19:30 · Pt 10:00–16:00 · So 09:00–17:00 · Nd zamknięte
- **Отзывы:** Google 5,0★ / 29 opinii · FB 983 подписчика · IG ~920
- **Соцсети:**
  - FB: https://www.facebook.com/people/Elektryk-Den/61576662312808/
  - IG: https://www.instagram.com/el_gdansk/
  - Threads: https://www.threads.com/@el_gdansk
  - YouTube: есть канал (URL — TBC)
- **Марки:** все марки; специализация VAG (VW/Audi/Seat/Škoda), онлайн-кодирование GeKo/ODIS
- **Языки клиентов:** PL + RU (отзывы и посты владельца частично на русском)
- **Конкурент-референс по ретрофиту:** https://retrofitlab.pl/ (Konwersja lamp / Konwersja multimediów / Doposażenia / Chip Tuning; премиум-марки, «Jesteś gotowy na mocną zmianę?»)

---

## 2. Структура сайта — 6 страниц

| # | Страница | URL | Роль / SEO-фокус |
|---|----------|-----|------------------|
| 1 | Strona główna | `/` | лендинг по блокам ниже; «elektryk samochodowy Gdańsk», «elektronika samochodowa Gdańsk» |
| 2 | Usługi (hub) | `/uslugi/` | обзорная сетка 6 услуг, ссылки на SEO-страницы |
| 3 | Szablon strony usługi | `/uslugi/<slug>/` | SEO-шаблон; первая инстанция: **Szukanie zwarć i diagnostyka** |
| 4 | O nas | `/o-nas/` | экспертность, оборудование, VAG, видео/фото, соцсети |
| 5 | Kontakt | `/kontakt/` | карта, форма, WhatsApp, зона выезда |
| 6 | Realizacje | `/realizacje/` | под BLOK 4 (кейсы) — пока заглушка, вне меню |

> Состав страниц **подтверждён 06.07.2026**: доп. пара = Usługi (hub) + Realizacje.
> Шаблон услуги (#3) далее клонируется под остальные услуги (7–10 страниц в перспективе) — вне текущего скоупа шести.

**Навигация:** Główna · Usługi · O nas · Kontakt (+ Realizacje, когда появится). В шапке: телефон + кнопка WhatsApp. На мобиле — sticky WhatsApp.

---

## 3. Strona główna — блоки

### BLOK 1 — Hero
- **Визуал:** аутентичное **видео приборки** (щиток/кокпит, оживающая панель) — фоновое, muted, loop, `poster` для скорости; фолбэк-картинка на слабом соединении.
- **H1:** `Zaawansowana elektronika samochodowa i programowanie sterowników — Gdańsk`
  (город в H1/Title — требование локального SEO из PDF-рекомендаций)
- **Podnagłówek:** `Rozwiązujemy skomplikowane problemy, od których zrezygnowali inni. Obsługujemy wszystkie marki pojazdów. Szybka diagnoza, trwała naprawa i pełna gwarancja.`
- **CTA (2 кнопки):**
  - `[WhatsApp] Opisz usterkę na WhatsApp` → `wa.me/48571287125` с pre-filled текстом
  - `[Telefon] Zadzwoń: 571 287 125` → `tel:+48571287125`
- Под кнопками мелко: `5,0 ★ Google · 29 opinii` (тянет доверие сразу в hero).

### BLOK 2 — Główne obszary specjalizacji (6 услуг, grid, без цен)
1. **Szukanie Zwarć i Diagnostyka Układów** *(самый прибыльный — первым)* — Lokalizacja i usuwanie przerw w obwodach, zwarć do masy, naprawa wiązek. Stała, przejrzysta cena za faktyczne znalezienie przyczyny usterki, a nie za czas pracy.
2. **Kodowanie i Programowanie Sterowników** — Klonowanie modułów ECU, programowanie i adaptacje sterowników silnika (PCM), skrzyń biegów (TCM), komfortu (BCM), ABS/ESP oraz poduszek powietrznych (SRS), usuwanie crash data. Przywracanie części używanych do pełnej funkcjonalności.
3. **Chiptuning i Moduły Ekologii** — Bezpieczne zwiększanie mocy (Stage 1/2), optymalizacja parametrów pracy silnika. Programowe usuwanie i wyłączanie problematycznych systemów: DPF, EGR, AdBlue, NOX, klap w kolektorze.
4. **Dorabianie Kluczy i Immobilizery** — Kodowanie kluczyków typu Smart Key, naprawa fabrycznych immobilizerów, programowanie nowych kluczy w przypadku całkowitego zagubienia (All Keys Lost).
5. **Mobilny Serwis, Awaryjne Odpalanie i Otwieranie** — Dojazd do pojazdów unieruchomionych oraz zablokowanych. Szybka pomoc na miejscu awarii — Gdańsk i okolice, praca pod Twoim domem albo na miejscu.
6. **Retrofit i Doposażenia** — Konwersja lamp (USA↔EU, kodowanie full LED / Matrix), konwersja multimediów (CarPlay / Android Auto / App Connect, język polski w MMI, mapy MIB), doposażenia: tempomat ACC, kamery + kalibracje, moduły ONLINE (GeKo/ODIS).

Каждая карточка → ссылка на будущую SEO-страницу услуги (пока ведут на первую готовую / якорь).

### BLOK 3 — Dla kogo działamy
- **Klienci indywidualni:** Bezpieczeństwo i pewność, że auto trafia do profesjonalistów, a nie „kasowaczy błędów”.
- **Floty i biznes:** Minimalizacja przestojów pojazdów, faktury VAT, elastyczne terminy.
- **Autokomisy i importerzy:** Przygotowanie elektroniki aut z importu (USA/UE), adaptacja lamp LED, konwersja języków i multimediów, kodowanie kluczy do sprzedawanych aut.

### BLOK 4 — Realizacje / Case studies — **ОТЛОЖЕН**
- На главной пока не выводим. Каркас (Symptom → Diagnoza → Rozwiązanie, кейсы BMW 5 / Sprinter AdBlue / Audi A6 AKL из PDF) держим в запасе для страницы `/realizacje/`.

### BLOK 5 — Dowód społeczny i gwarancja
- **Google:** рейтинг 5,0/29 + 2–3 реальных отзыва (текстом, со ссылкой на визитку «Zobacz wszystkie opinie w Google»). Живой виджет — если найдём лёгкое решение без тормозов; иначе статика + ссылка. Интеграция — TBC.
- **Facebook:** заметная карточка/кнопка «Obserwuj nas na Facebooku» (983 obserwujących, живые посты с ремонтов) → ссылка на профиль. Опционально embed ленты, если не убьёт скорость.
- **Баннер гарантии:** `Na każdą modyfikację oprogramowania, klonowanie sterowników oraz naprawy elektroniczne udzielamy pisemnej gwarancji.`

### BLOK 6 — Kontakt i lokalizacja (footer / action center)
- Google Maps с пином (Zawodzie 35, 80-726 Gdańsk).
- Данные: адрес, часы (TBC), телефон, заметка о выезде: `W sytuacjach awaryjnych — dojazd do klienta na terenie Gdańska i okolic.`
- **Контактная форма** (короткая): imię · telefon · marka/model · opis usterki (+ RODO checkbox). Отправка → TBC (n8n webhook / email).
- Финальный CTA: `Nie czekaj, aż usterka unieruchomi Twoje auto na stałe. Napisz do nas teraz.` + большие кнопки **WhatsApp** и **Zadzwoń** (без Telegram!).
- Иконки соцсетей: Facebook · Instagram · Threads · YouTube.

---

## 4. Остальные страницы

### /uslugi/ — hub (TBC)
Сетка 6 услуг (те же карточки, что BLOK 2, но с расширенными описаниями) + мини-CTA после каждой. H1: `Usługi elektryka i elektronika samochodowego — Gdańsk`.

### /uslugi/<slug>/ — SEO-шаблон страницы услуги
Структура (одинаковая для всех услуг):
1. H1 = ключевая фраза + Gdańsk (напр. `Szukanie zwarć i diagnostyka elektryki samochodowej — Gdańsk`)
2. Лид-абзац: проблема клиента + обещание результата (2–3 предложения, ключи естественно)
3. **Objawy / kiedy do nas** — маркированный список симптомов (сюда ложатся niche-ключи: „auto nie odpala", „brak komunikacji ze sterownikiem"…)
4. **Jak pracujemy** — 3–4 шага (diagnoza → wycena → naprawa → gwarancja)
5. **Dlaczego ElektroDen** — 3 буллета (sprzęt, doświadczenie VAG, stała cena za znalezienie przyczyny)
6. Mini-FAQ (2–3 вопроса, разметка FAQPage schema)
7. CTA-блок: WhatsApp + телефон + форма
8. Ссылки на смежные услуги (внутренняя перелинковка)

Первая инстанция: **Szukanie zwarć i diagnostyka** (money-maker). Остальные услуги — по шаблону следующими итерациями.

### /o-nas/
- История/позиционирование: trudne przypadki, brak komunikacji, wiązki — то, от чего отказались другие.
- Оборудование и доступы: kodowanie ONLINE (GeKo, ODIS), programatory, oscyloskop… (уточнить список у владельца — TBC).
- Специализация VAG + все марки; полный список VAG-работ из оффера (доп. системы, kalibracje radarów ACC/360/kamer, konwersja USA-EU, component protection, kodowanie akumulatorów, odblokowanie funkcji…).
- Фото/видео из мастерской, лицо владельца (на FB уже есть — «нагретый» профиль).
- Блок соцсетей + отзывы.

### /kontakt/
- Всё из BLOK 6 + расширенно: как доехать (21 min от центра по Google), парковка, зона выезда (Gdańsk, Sopot, Gdynia, okolice — TBC формулировка), часы, форма, карта.

### /realizacje/ (TBC, позже)
- Кейсы в формате Symptom → Diagnoza → Rozwiązanie; наполнение из реальных работ (FB-посты владельца — источник). Пока страница-заглушка вне меню.

---

## 5. SEO — ядро ключевых слов (объединённое)

> Объёмы/конкуренция — из PDF, где были. Фразы без цифр — нишевые из оффера владельца и соцсетей (частотность уточним по Keyword Planner при настройке Ads). Всем коммерческим фразам добавляем локальные варианты `… gdańsk`, `… trójmiasto`.

### A. Локальные / главные (Strona główna, Title/H1)
| Фраза | Объём | Конк. | Куда |
|---|---|---|---|
| elektryk samochodowy gdańsk | 2400–5400 | wysoka | H1/Title главной |
| elektronik samochodowy gdańsk | — | — | Title/подзаголовок |
| elektryk samochodowy z dojazdem | 880 | średnia | hero/услуга 5 |
| mobilny elektryk samochodowy | 590 | średnia | услуга 5 |
| diagnostyka komputerowa samochodu (gdańsk) | 1300 | wysoka | услуга 1 / hub |
| naprawa elektroniki samochodowej | — | — | Title/описания |
| wykrywanie usterek elektrycznych auto | 140 | niska | H3 |

### B. Zwarcia / диагностика (страница-инстанция шаблона)
| Фраза | Объём | Конк. |
|---|---|---|
| szukanie zwarcia w samochodzie cena | 210 | niska |
| naprawa wiązki elektrycznej samochodu | — | — |
| brak komunikacji ze sterownikiem | — | — |
| auto nie odpala — usterka elektryczna | — | — |
| naprawa instalacji elektrycznej samochodu | — | — |
| diagnostyka common rail | — | — |
| naprawa przewodów / uszkodzona wiązka po kunach | — | — |

### C. Sterowniki / kodowanie
| Фраза | Объём | Конк. |
|---|---|---|
| naprawa sterowników samochodowych | 880 | średnia |
| programowanie sterowników silnika | 480 | średnia |
| klonowanie sterownika ecu | 320 | niska |
| kodowanie modułu komfortu | 390 | niska |
| adaptacja sterownika skrzyni biegów | 260 | niska |
| usuwanie crash data / naprawa sterownika airbag | — | — |
| kodowanie sterowników gdańsk | — | — |

### D. Chiptuning / ekologia
| Фраза | Объём | Конк. |
|---|---|---|
| chiptuning cena / chiptuning gdańsk | 3600 | wysoka |
| usuwanie adblue (gdańsk) | 590–1200 | średnia |
| zwiększenie mocy silnika mapa | 720 | średnia |
| wyprogramowanie egr cena | 440 | niska |
| wyłączenie dpf programowo | 380 | średnia |
| usuwanie nox / klapy w kolektorze off | — | — |

### E. Klucze / immobilizery
| Фраза | Объём | Конк. |
|---|---|---|
| dorabianie kluczyków samochodowych | 5400 | wysoka |
| kodowanie kluczyków samochodowych | 1900 | średnia |
| zgubione klucze do samochodu co zrobić | 720 | niska |
| naprawa immobilizera cena | 480 | niska |
| programowanie smart key | 310 | średnia |
| awaryjne otwieranie samochodu gdańsk | — | — |

### F. Mobilny serwis / awaryjne
| Фраза | Объём | Конк. |
|---|---|---|
| awaryjne odpalanie samochodu | 480 | średnia (сезон — зима) |
| elektryk samochodowy z dojazdem gdańsk | ↑A | — |
| awaryjne otwieranie auta | — | — |
| rozładowany akumulator odpalanie gdańsk | — | — |

### G. Retrofit / VAG / USA (из оффера владельца + retrofitlab)
| Фраза | Объём | Конк. |
|---|---|---|
| kodowanie lamp led | 720 | średnia |
| konwersja lamp usa eu / przeróbka lamp usa | — | — |
| kodowanie lamp full led / matrix | — | — |
| konwersja multimediów usa→eu | — | — |
| aktywacja carplay android auto (app connect) | — | — |
| doposażenie samochodu (tempomat ACC, kamera cofania) | — | — |
| kalibracja radaru acc / kamery 360 / kamery cofania | — | — |
| kodowanie online geko odis / dopisywanie modułów audi | — | — |
| usuwanie component protection (ochrona komponentów) | — | — |
| język polski mmi / polskie menu vw audi | — | — |
| aktualizacja map mib | — | — |
| kodowanie / rejestracja akumulatora | — | — |
| ukryte funkcje vag (składanie lusterek, klapa z pilota) | — | — |
| kodowanie vag gdańsk | — | — |

**Хэштеги/язык соцсетей владельца** (для консистентности контента): #gdansk #elektroden #trojmiasto #vag #vw #commonrail #mechanic.

---

## 6. Технические требования

- **Стек:** чистый статический сайт (HTML/CSS + минимум JS) — требование скорости из PDF; предлагаю собрать на Astro или чистым HTML с общими партиалами.
- **Домен:** elektroden.pl (купить; на 06.07.2026 DNS пуст — видимо свободен). Хостинг — TBC (для статики подойдёт Cloudflare Pages / Netlify / любой хостинг с PL-CDN).
- **Mobile-first:** >80% трафика по «mobilny elektryk / awaryjne odpalanie» — со смартфонов. **Sticky-кнопка WhatsApp** на мобиле (один клик большим пальцем).
- **Скорость:** hero-видео — сжатое (H.264/WebM, ≤2–3 МБ), `poster`, lazy; никаких тяжёлых библиотек; целимся в зелёный PageSpeed на 4G.
- **Schema.org:** `AutoRepair`/`LocalBusiness` (NAP: ElektroDen, Zawodzie 35, 80-726 Gdańsk, +48 571 287 125, geo, openingHours, aggregateRating 5.0/29), `FAQPage` на страницах услуг.
- **ALT-теги** всех изображений с ключами (напр. `alt="Klonowanie sterownika ECU Bosch w warsztacie elektroniki samochodowej w Gdańsku"`).
- **Title/Description** уникальные на каждую страницу, город в Title.
- OG-теги + favicon (есть лого ElektrykDen с молнией — взять у клиента исходник).
- Форма: поля imię, telefon, marka/model, opis usterki, RODO-checkbox; отправка → n8n webhook (`n8n.codelesslab.ai`) или email — TBC.
- Языковая версия: старт — только PL. (RU-версия — возможное расширение, у базы много русскоязычных; решение позже.)

---

## 7. Открытые вопросы (TBC)

Решено 06.07.2026: страницы = Usługi (hub) + Realizacje · WhatsApp = 571 287 125 · домен = elektroden.pl (купить) · бренд = «elektroden» строчными.

Осталось уточнить (не блокирует сборку — ставим placeholder'ы):
1. Точные **часы работы** (Google: открытие вт 10:00 — а остальная неделя?).
2. **Видео приборки** — есть готовое у владельца (IG/FB reels?) или снимаем/просим снять?
3. Куда шлём **форму** (email владельца / n8n webhook)?
4. Юр. данные для футера (NIP / название ИП) — надо ли выводить?
5. YouTube-канал — точный URL.
6. **Хостинг** для статики (предложу Cloudflare Pages, если нет предпочтений).
