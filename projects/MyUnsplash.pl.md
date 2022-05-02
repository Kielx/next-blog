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

![App Screenshot](/images/projects/myUnsplash/my-unsplash-mockup-1278.webp#postMiniImage 'Screenshot of app')

## Spis treści

- [Opis projektu](#opis-projektu)
- [Stworzony przy pomocy](#stworzony-przy-pomocy)
- [Jak to działa](#jak-to-działa)
  - [Design](#design)
  - [Wydajność](#wydajność)
  - [Firebase](#firebase)
  - [Dodawanie zdjęć](#dodawanie-zdjęć)
  - [Redux Toolkit](#redux-toolkit)
- [Wnioski](#wnioski)

## Opis projektu

My Unsplash to moje rozwiązanie [wyzwania](https://devchallenges.io/challenges/rYyhwJAxMfES5jNQ9YsP). Jest to moja wersja aplikacji wzorowanej na popularnym serwisie Unsplash. Aplikacja to cyfrowa galeria pozwalająca na dodawanie i usuwanie zdjęć oraz wyświetlanie ich w układzie masonry.

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

### Firebase

Zdjęcia muszą być gdzieś przechowywane. Rozważałem stworzenie w tym celu własnego backendu, jednak prostota implementacji, możliwość teoretycznie nieskończonego skalowania oraz hojna darmowa oferta skłoniły mnie do skorzystania z Firebase Storage.

### Dodawanie zdjęć

Za dodawanie zdjęć odpowiedzialny jest stworzony przeze mnie wcześniej komponent — [Image Uploader](https://github.com/Kielx/image-uploader). Umożliwia on dodawanie zdjęć przez drag'n'drop, a także wyświetla informację w przypadku nieprawidłowego rozmiaru lub formatu pliku. Dodatkowo progress bar wyświetla informację o postępie wysyłania pliku.

### Redux Toolkit

Logika aplikacji wymagała ode mnie skorzystania z dodatkowego rozwiązania do przechowywania stanu aplikacji. Zdecydowałem się na zastosowanie Redux Toolkit, gdyż aplikacja posiadała znaczną ilość zmiennych przechowywanych w stanie poszczególnych komponentów, a które to musiały ze sobą współpracować. Dodatkowo chciałem zastosować Redux Toolkit z uwagi na jego popularność oraz przydatność w innych projektach.

## Wnioski

IP Tracker okazał się ciekawym i przyjemnym w realizacji projektem. Wszystkie API wykorzystane w projekcie posiadają przejrzystą dokumentację i są niezwykle łatwe w obsłudze. Tworząc ten projekt, rozwinąłem swoje umiejętności z zakresu Reacta, obsługi i komunikacji z API, a także kolejny raz miałem przyjemność korzystać z TailwindCSS do obsługi styli.

Jeśli jeszcze tego nie zrobiłeś, to sprawdź, jak wygląda [IP Tracker live](https://ip-tracker.pantak.net/) i zerknij na [kod na GitHub](https://github.com/kielx/ip-tracker).

![App Mockup](/images/projects/IPTracker/LaptopMockup.webp#postMiniImage 'App Mockup')
