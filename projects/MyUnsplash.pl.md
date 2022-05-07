---
title: 'My-Unsplash'
liveLink: 'https://my-unsplash-mu.vercel.app/'
githubLink: 'https://github.com/Kielx/my-unsplash'
excerpt: Klon Unsplash stworzony na bazie Next.js, Firebase, Redux Toolkit oraz Tailwind CSS.
coverImage: '/images/projects/myUnsplash/my-unsplash.webp'
techUsed:
  - 'Next.js'
  - 'Firebase'
  - 'Redux'
  - 'TailwindCSS'
ribbonColor: '#000000'
ribbonIcon: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Next.js</title><path fill="white" d="M11.5725 0c-.1763 0-.3098.0013-.3584.0067-.0516.0053-.2159.021-.3636.0328-3.4088.3073-6.6017 2.1463-8.624 4.9728C1.1004 6.584.3802 8.3666.1082 10.255c-.0962.659-.108.8537-.108 1.7474s.012 1.0884.108 1.7476c.652 4.506 3.8591 8.2919 8.2087 9.6945.7789.2511 1.6.4223 2.5337.5255.3636.04 1.9354.04 2.299 0 1.6117-.1783 2.9772-.577 4.3237-1.2643.2065-.1056.2464-.1337.2183-.1573-.0188-.0139-.8987-1.1938-1.9543-2.62l-1.919-2.592-2.4047-3.5583c-1.3231-1.9564-2.4117-3.556-2.4211-3.556-.0094-.0026-.0187 1.5787-.0235 3.509-.0067 3.3802-.0093 3.5162-.0516 3.596-.061.115-.108.1618-.2064.2134-.075.0374-.1408.0445-.495.0445h-.406l-.1078-.068a.4383.4383 0 01-.1572-.1712l-.0493-.1056.0053-4.703.0067-4.7054.0726-.0915c.0376-.0493.1174-.1125.1736-.143.0962-.047.1338-.0517.5396-.0517.4787 0 .5584.0187.6827.1547.0353.0377 1.3373 1.9987 2.895 4.3608a10760.433 10760.433 0 004.7344 7.1706l1.9002 2.8782.096-.0633c.8518-.5536 1.7525-1.3418 2.4657-2.1627 1.5179-1.7429 2.4963-3.868 2.8247-6.134.0961-.6591.1078-.854.1078-1.7475 0-.8937-.012-1.0884-.1078-1.7476-.6522-4.506-3.8592-8.2919-8.2087-9.6945-.7672-.2487-1.5836-.42-2.4985-.5232-.169-.0176-1.0835-.0366-1.6123-.037zm4.0685 7.217c.3473 0 .4082.0053.4857.047.1127.0562.204.1642.237.2767.0186.061.0234 1.3653.0186 4.3044l-.0067 4.2175-.7436-1.14-.7461-1.14v-3.066c0-1.982.0093-3.0963.0234-3.1502.0375-.1313.1196-.2346.2323-.2955.0961-.0494.1313-.054.4997-.054z"/></svg>'
---

![App Screenshot](/images/projects/myUnsplash/my-unsplash.webp#postMiniImage 'Screenshot of app')

## Spis treści

- [Wstęp](#wstęp)
- [Opis projektu](#opis-projektu)
  - [Jakie funkcje posiada My Unsplash](#jakie-funkcje-posiada-my-unsplash)
  - [Jakich funkcji nie posiada](#jakich-funkcji-nie-posiada)
- [Stworzony przy pomocy](#stworzony-przy-pomocy)
- [Jak to działa](#jak-to-działa)
  - [Design](#design)
  - [Wydajność](#wydajność)
  - [Firebase](#firebase)
  - [Dodawanie zdjęć](#dodawanie-zdjęć)
  - [Redux Toolkit](#redux-toolkit)
- [Wnioski](#wnioski)

## Wstęp

Poniżej prezentuję czym jest My Unsplash. Po lekturze tego opisu będziesz wiedział:

- Czym jest i jakie funkcje posiada aplikacja oraz jakich funkcji nie posiada
- Jakich narzędzi użyłem do przygotowania projektu
- W jaki sposób rozwiązałem niektóre z problemów w procesie tworzenia
- Czego nauczyłem się w procesie tworzenia tego projektu

## Opis projektu

My Unsplash to moje rozwiązanie [wyzwania](https://devchallenges.io/challenges/rYyhwJAxMfES5jNQ9YsP). Jest to moja wersja aplikacji wzorowanej na popularnym serwisie Unsplash. Aplikacja to cyfrowa galeria pozwalająca na dodawanie i usuwanie zdjęć oraz wyświetlanie ich w układzie masonry.

Czy to znaczy, że jedyne co miałem do zrobienia to skopiować gotowy design i nazwałem to moim projektem? Bynajmniej. W przypadku tego projektu miałem do dyspozycji pliki z designem, ale musiałem przełożyć ich implementację na TailwindCSS. Dodatkowo musiałem wybrać rozwiązanie odpowiedzialne za Masonry Layout oraz stworzyć całe zaplecze odpowiedzalne za dodawanie i przechowywanie zdjęć.

### Jakie funkcje posiada My Unsplash

- Aplikacja prezentuje dodane zdjęcia w układzie masonry - Jest to układ w którym jedna oś używa ścisłego układu siatki - najczęściej w przypadku kolumn, natomiast druga oś (wiersze) są dopasowane do luk powstałych po krótszych elementach. Elementy w następnych wierszach unoszą się by całkowicie wypełnić luki.
- Użytkownicy mogą dodawać zdjęcia do galerii przy pomocy dedykowanego komponentu obsługującego drag'n'drop
- Nowe zdjęcia wyświetlane są od razu po dodaniu na samym szczycie galerii
- Podczas dodawania wyświetlany jest pasek postępu
- Użytkownicy mogą usuwać zdjęcia z galerii
- Użytkownicy mogą wyszukiwać zdjęcia po nazwie
- Zdjęcia są ładowane dynamicznie przy wykorzystaniu infinite scroll
- Tryb ciemny i jasny, zdjęcia dopasowują odpowiednio kontrast dla łatwiejszego odbioru na ciemnym tle
- Strona działa jako SPA (Single Page Application)
- Aplikacja jest responsywna i powinna wyglądać prawidłowo na wszystkich rodzajach urządzeń obsługujących nowoczesne przeglądarki
- IP Tracker może być obsługiwany za pomocą samej klawiatury

### Jakich funkcji nie posiada

- Strona nie posiada logowania i kont użytkowników, wobec tego każdy użytkownik może dodawać zdjęcia o maksymalnym rozmiarze 5MB
- Z uwagi na powyższe w teorii każdy może usunąć wszystkie zdjęcia z galerii (otwarte pozostaje pytanie po co?). Nie aspiruję by konkurować z profesjonalnymi serwisami takimi jak Unsplash lub Pexels, a projekt jest tylko rozwiązaniem hobbystycznym, dlatego też nie implementowałem logowania i kont użytkowników.
- Przez fakt, że strona wczytuje tylko określoną liczbę zdjęć, podczas wyszukiwania ogranicza się ona do szukania tylko wśród tych, które zostały już pobrane. Z uwagi na ograniczenia czasowe nie stworzyłem innej opcji, choć w przyszłości być może rozwiążę to poprzez stworzenie osobnego okna wyszukiwania i wyświetlania wyników na podstawie szukanej frazy.

![Film przedstawiający działanie aplikacji](/images/projects/myUnsplash/myUnsplash.mp4#postVideo)

## Stworzony przy pomocy

- [Next.js](https://nextjs.org/)
- [Firebase](https://firebase.google.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)

## Jak to działa

By aplikacja działała zgodnie z założeniami, niezbędne było stworzenie następujących funkcjonalności:

### Design

Założeniem było odtworzenie istniejącego interfejsu stylizowanego na układ Masonry. Strona musiała być w pełni responsywna i wyświetlać przycisk umożliwiający usunięcie zdjęcia po najechaniu na nie kursorem myszy. Układ masonry zapewnia biblioteka [React Masonry Css](https://www.npmjs.com/package/react-masonry-css). Strona została wyposażona także w modny Dark Mode.

### Wydajność

Pobranie i załadowanie wszystkich zdjęć z galerii to ogromne wyzwanie nawet dla najlepszego łącza internetowego. Użytkownicy korzystający z urządzeń mobilnych, zmuszeni by byli do długiego oczekiwania nim strona się załaduje. Jednym z moich priorytetów podczas tworzenia jakiejkolwiek strony jest szybkość jej działania. Nie inaczej jest w przypadku My-Unsplash. Zdecydowałem, że wszystkie zdjęcia muszą być w formacie webp, aby zapewnić najlepszą wydajność. Dodatkowo są one ładowane w ramach infinite scroll, a wyświetlana jest tylko taka ich liczba, by ograniczyć czas ładowania strony do minimum. Kolejne zdjęcia są ładowane podczas scrollowania strony. Dzięki temu udało mi się osiągnąć wysokie wyniki lighthouse, mimo tego, że strona składa się z samych zdjęć.

![Lighthouse scores](/images/projects/myUnsplash/my-unsplash-scores.webp#postMiniImage)

### Firebase

Zdjęcia muszą być gdzieś przechowywane. Rozważałem stworzenie w tym celu własnego backendu, jednak prostota implementacji, możliwość teoretycznie nieskończonego skalowania oraz hojna darmowa oferta skłoniły mnie do skorzystania z Firebase Storage.

### Dodawanie zdjęć

Za dodawanie zdjęć odpowiedzialny jest stworzony przeze mnie wcześniej komponent — [Image Uploader](https://github.com/Kielx/image-uploader). Umożliwia on dodawanie zdjęć przez drag'n'drop, a także wyświetla informację w przypadku nieprawidłowego rozmiaru lub formatu pliku. Dodatkowo progress bar wyświetla informację o postępie wysyłania pliku.

### Redux Toolkit

Logika aplikacji wymagała ode mnie skorzystania z dodatkowego rozwiązania do przechowywania stanu aplikacji. Zdecydowałem się na zastosowanie Redux Toolkit, gdyż aplikacja posiadała znaczną ilość zmiennych przechowywanych w stanie poszczególnych komponentów, a które to musiały ze sobą współpracować. Dodatkowo chciałem zastosować Redux Toolkit z uwagi na jego popularność oraz przydatność w innych projektach.

## Wnioski

Tworzyłem My Unsplash z zamiarem pogłębienia wiedzy na temat Next.js, Firebase, Redux Toolkit oraz Tailwind CSS. Po czasie mogę stwierdzić, że cel ten osiągnąłem, a projekt okazał się być ważnym kamieniem milowym na mojej drodze developera.

Jeśli jeszcze tego nie zrobiłeś, to sprawdź, jak wygląda [My Unsplash live](https://my-unsplash-mu.vercel.app/) i zerknij na [kod na GitHub](https://github.com/Kielx/my-unsplash).

![App Mockup](/images/projects/myUnsplash/my-unsplash2.webp#postMiniImage 'App Mockup')
