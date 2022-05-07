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
