---
title: 'My-Unsplash'
liveLink: 'https://my-unsplash-mu.vercel.app/'
githubLink: 'https://github.com/Kielx/my-unsplash'
excerpt: Klon Unsplash stworzony na bazie Next.js, Firebase, Redux Toolkit oraz Tailwind CSS. 
coverImage: '/images/projects/myUnsplash/my-unsplash.webp#postImage'
techUsed:
  - 'React'
  - 'TailwindCSS'
  - 'Leaflet JS'
---

![App Screenshot](/images/projects/myUnsplash/my-unsplash-mockup-1278.webp#postMiniImage 'Screenshot of app')

## Spis treści

- [Opis projektu](#opis-projektu)
- [Stworzony przy pomocy](#stworzony-przy-pomocy)
- [Jak to działa](#jak-to-działa)
  - [Design](#design)
  - [Wyszukiwanie lokalizacji użytkownika](#wyszukiwanie-lokalizacji-użytkownika)
  - [Lokalizacja](#lokalizacja)
  - [Wyświetlanie lokalizacji](#wyświetlanie-lokalizacji)
- [Wnioski](#wnioski)

## Opis projektu

My Unsplash to moje rozwiązanie [wyzwania](https://devchallenges.io/challenges/rYyhwJAxMfES5jNQ9YsP). Jest to moja wersja aplikacji wzorowanej na popularnym serwisie Unsplash. Aplikacja to cyfrowa galeria pozwalająca na dodawanie i usuwanie zdjęć oraz wyświetlanie ich w układzie masonry.

## Stworzony przy pomocy

- [Next.js](https://nextjs.org/)
- [Firebase](https://firebase.google.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
  
## Jak to działa

By aplikacja działała, niezbędne było stworzenie następujących funkcjonalności:

### Design

Założeniem była implementacja istniejącego interfejsu na podstawie jednego zdjęcia. Nie miałem dostępu do żadnych plików ze szkicami lub designem. Oczywiście cała strona musiała być responsywny i działać na wszystkich urządzeniach.

![Phone Mockup](/images/projects/IPTracker/PhoneMockup2.webp#postMiniImage 'Phone App Mockup')

### Wyszukiwanie lokalizacji użytkownika

By stworzyć tę funkcjonalność, posłużyłem się [API Geolokalizacyjnym](https://geo.ipify.org/). Zwraca ono dane o lokalizacji użytkownika po wykonaniu właściwego żądania do API. Z uwagi na fakt, że API jest zabezpieczone kluczem oraz posiada ograniczoną ilość żądań dla darmowego użytkownika, musiałem zabezpieczyć żądanie poprzez wywołanie funkcji serverless obsługiwanej przez Netlify. W przeciwnym wypadku każdy miałby dostęp do klucza API i mógłby z niego korzystać.

```javascript
const fetch = require('node-fetch')

exports.handler = async (event, context) => {
  const API_ENDPOINT = `https://geo.ipify.org/api/v1?apiKey=${process.env.GEO_API_KEY}&${event.queryStringParameters.query}=${event.queryStringParameters.ip}`
  try {
    const response = await fetch(API_ENDPOINT)
    const data = await response.json()
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    }
  } catch (error) {
    console.log(error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed fetching data' }),
    }
  }
}
```

### Lokalizacja

Samo wywołanie API geolokalizacyjnego dla adresu IP to za mało. Musiałem przygotować testy wyrażeń regularnych — REGEXP, które sprawdzają, czy użytkownik chce sprawdzić lokalizacją na podstawie adresu IP, adresu strony lub adresu E-mail. Następnie wywołując żądanie właściwe dla danego adresu, zwraca ono dane o lokalizacji użytkownika.

Dodatkowo należało rozważyć przypadki, kiedy użytkownik loguje się po raz pierwszy — wtedy aplikacja wyświetlić powinna jego aktualną lokalizację. Jeżeli użytkownik wyszukiwał już adres, to w bieżącej sesji powinien być on zapisany i wyświetlony. Do tego skorzystałem z SessionStorage.

```javascript
useEffect(() => {
  if (
    sessionStorage.getItem('geoIP') !== null &&
    sessionStorage.getItem('geoIP') !== ''
  ) {
    setGeoIP(JSON.parse(sessionStorage.getItem('geoIP')))
  } else {
    async function getLocalIP() {
      try {
        const response = await fetch('https://jsonip.com', { mode: 'cors' })
        let data = await response.json()
        setLocalIP(data.ip)
        getGeoIP(data.ip)
        return
      } catch (e) {
        getGeoIP('1.1.1.1')
        console.log(e)
        return
      }
    }
    getLocalIP()
  }
}, [])
```

### Wyświetlanie lokalizacji

Kolejnym niezbędnym elementem było wyświetlenie lokalizacji. Tu z pomocą przyszło API Leafleta, która w prosty sposób tworzy interaktywną mapę, na której możemy wyświetlać ustaloną wcześniej lokalizację. Efektowność przejść pomiędzy lokalizacjami zapewnia funkcja Leafleta - `map.flyTo(position)`, która umożliwia piękne i płynne przejścia pomiędzy wyszukiwanymi lokalizacjami.

```javascript
// /components/Map.js
import React from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import LoadingSpinner from './LoadingSpinner'

function MapComponent({ position }) {
  const map = useMap()
  map.flyTo(position)
  return null
}

const Map = ({ lat, lng }) => {
  if (!lat || !lng) {
    return <LoadingSpinner />
  }

  const position = [lat, lng]

  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={true}
      style={{
        height: '100%',
        width: '100%',
        zIndex: 0,
      }}
    >
      <MapComponent position={position}></MapComponent>
      <Marker position={position}>
        <Popup>You are here!</Popup>
      </Marker>
    </MapContainer>
  )
}

export default Map
```

## Wnioski

IP Tracker okazał się ciekawym i przyjemnym w realizacji projektem. Wszystkie API wykorzystane w projekcie posiadają przejrzystą dokumentację i są niezwykle łatwe w obsłudze. Tworząc ten projekt, rozwinąłem swoje umiejętności z zakresu Reacta, obsługi i komunikacji z API, a także kolejny raz miałem przyjemność korzystać z TailwindCSS do obsługi styli.

Jeśli jeszcze tego nie zrobiłeś, to sprawdź, jak wygląda [IP Tracker live](https://ip-tracker.pantak.net/) i zerknij na [kod na GitHub](https://github.com/kielx/ip-tracker).

![App Mockup](/images/projects/IPTracker/LaptopMockup.webp#postMiniImage 'App Mockup')