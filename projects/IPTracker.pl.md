---
title: 'IP Tracker'
liveLink: 'https://ip-tracker.pantak.net/'
githubLink: 'https://github.com/Kielx/ip-tracker'
excerpt: Aplikacja webowa, która pozwala na wyszukanie i przedstawienie na mapie lokalizacji na podstawie podanego adresu IP, adresu strony www lub adresu E-mail
coverImage: '/images/projects/IPTracker/new60OPT.webm#postVideo'
techUsed:
  - 'React'
  - 'TailwindCSS'
  - 'Leaflet JS'
---

![App Screenshot](/images/projects/IPTracker/new60OPT.webm#postVideo 'Screenshot of app')

## Spis treści

- [Co to jest Terminal Portfolio](#co-to-jest-terminal-portfolio)
- [Stworzone przy pomocy](#stworzone-przy-pomocy)
- [Jak i dlaczego?](#jak-i-dlaczego)
  - [Szybkość — Gatsby](#szybkość---gatsby)
  - [Prostota obsługi — Markdown](#prostota-obsługi---markdown)
  - [Oryginalność - Winbox.js](#oryginalność---winbox-js)
  - [Formularz kontaktowy](#formularz-kontaktowy)
- [Wnioski](#wnioski)

## Opis projektu

IP Tracker to moje rozwiązanie [wyzwania](https://www.frontendmentor.io/challenges/ip-address-tracker-I8-0yYAH0), którego celem było stworzenie aplikacji webowej,
umożliwiającej wyświetlanie danych i lokalizacji na podstawie podanego adresu IP, adresu strony lub adresu E-mail.
Aplikacja wykorzystuje Reacta oraz trzy odrębne API - by stworzyć prosty i efektywny lokalizator. Dodatkowym założeniem jest wyświetlanie bieżącej lokalizacji użytkownika przy pierwszym odwiedzeniu strony.

## Stworzone przy pomocy

- [React](https://reactjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [GetJSONIP](https://getjsonip.com/)
- [IP Geolocation API](https://geo.ipify.org/)
- [Leaflet JS](https://leafletjs.com/)
- [Funkcje Serverless Netlify](https://www.netlify.com/docs/functions/)

## Jak to działa

By aplikacja działała niezbędne było stowrzenie następujących funkcjonalności:

### Design

Założeniem byłą implementacja istniejącego interfejsu na podstawie jednego zdjęcia. Nie miałem dostępu do żadnych plików ze szkicami lub designem. Oczywiście cała strona musiała być responsywny i działać na wszystkich urządzeniach.

![Phone Mockup](/images/projects/IPTracker/PhoneMockup2.webp#postMiniImage 'Phone App Mockup')

### Wyszukiwanie lokalizacji użytkownika

By stworzyć tą funkcjonalność posłużyłem się [IP Geolokalizacyjnym](https://geo.ipify.org/). Zwraca ono dane o lokalizacji użytkownika po wykonaniu właściwego żądania do API. Z uwagi na fakt, że API jest zabezpieczone kluczem i posiada ograniczoną ilość żądań dla darmowego użytkownika musiałem zabezpieczyć żądanie poprzez wywołanie funkcji serverless obsługiwanej przez Netlify. W przeciwnym wypadku każdy miał by dostęp do klucza API i mógł by z niego korzystać.

```javascript
const fetch = require("node-fetch");

exports.handler = async (event, context) => {
  const API_ENDPOINT = `https://geo.ipify.org/api/v1?apiKey=${process.env.GEO_API_KEY}&${event.queryStringParameters.query}=${event.queryStringParameters.ip}`;
  console.log(event);
  console.log(context);
  try {
    const response = await fetch(API_ENDPOINT);
    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed fetching data" }),
    };
  }
};
```

### Lokalizacja

Samo wywołanie API geolokalizacyjnego dla adresu IP to za mało. Musiałem przygotować testy wyrażeń regularnych - REGEXP, które sprawdzają czy użytkownik chce sprawdzić lokalizacją na podstawie adresu IP, adresu strony lub adresu E-mail. Jeśli tak, to wywołując API geolokalizacyjnego dla danego adresu, zwraca ono dane o lokalizacji użytkownika.

Dodatkowo należało rozważyć przypadki kiedy użytkownik loguje się po raz pierwszy - wtedy aplikacja wyświetlić powinna jego aktualną lokalizację. Jeżeli użytkownik wyszukiwał już adres, to w bieżącej sesji powinien być on zapisany i wyświetlony. Do tego skorzystałem z SessionStorage.

```javascript
useEffect(() => {
    if (
      sessionStorage.getItem("geoIP") !== null &&
      sessionStorage.getItem("geoIP") !== ""
    ) {
      setGeoIP(JSON.parse(sessionStorage.getItem("geoIP")));
    } else {
      async function getLocalIP() {
        try {
          const response = await fetch("https://jsonip.com", { mode: "cors" });
          let data = await response.json();
          setLocalIP(data.ip);
          getGeoIP(data.ip);
          return;
        } catch (e) {
          getGeoIP("1.1.1.1");
          console.log(e);
          return;
        }
      }
      getLocalIP();
    }
  }, []);
```

### Wyświetlanie lokalizacji

Kolejnym niezbędnym elementem było wyświetlenie lokalizacji. Tu z pomocą przyszło API Leafleta, która w prosty sposób tworzy interaktywną mapę, na której możemy wyświetlać ustaloną wcześniej lokalizację. Efektowność przejść pomiędzy lokalizacjami zapewnia funkcja Leafleta - `map.flyTo(position)`, która umożliwia piękne i płynne przejścia pomiędzy wyszukiwanymi lokalizacjami.

![App Mockup](/images/projects/IPTracker/LaptopMockup.webp#postMiniImage 'App Mockup')

## Wnioski

IP Tracker okazał się być ciekawym i przyjemnym w realizacji projektem. Wszystkie API  wykorzystane w projekcie posiadają przejrzystą dokumentację i są niezwykle łatwe w obsłudze. Tworząc ten projekt rozwinąłem swoje umiejętności z zakresu Reacta, obsługi i komunikacji z API, a także kolejny raz miałem przyjemnośc korzystać z TailwindCSS.

Jeśli jeszcze tego nie zrobiłeś, to sprawdź, jak wygląda [IP Tracker live](https://ip-tracker.pantak.net/) i zerknij na [kod na GitHub](https://github.com/kielx/ip-tracker). Tam też znajdziesz instrukcje jak sklonować projekt, jeśli zechcesz zaczerpnąć inspiracji.
