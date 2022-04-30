---
title: 'IP Tracker'
liveLink: 'https://ip-tracker.pantak.net/'
githubLink: 'https://github.com/Kielx/ip-tracker'
excerpt: A web application that allows users to find a location on the map based on the provided IP address, website address or e-mail address
coverImage: '/images/projects/IPTracker/new60OPT.webm#postVideo'
techUsed:
  - 'React'
  - 'TailwindCSS'
  - 'Leaflet JS'
---

![App Screenshot](/images/projects/IPTracker/new60OPT.webm#postVideo 'Screenshot of app')

## Table of contents

- [Project description](#project-description)
- [Created with](#created-with)
- [How it works](#how-it-works)
  - [Design](#design)
  - [Search for user's location](#search-for-user-s-location)
  - [Location](#location)
  - [Location display](#location-display)
- [Summary](#summary)

## Project description

IP Tracker is my solution to [challenge](https://www.frontendmentor.io/challenges/ip-address-tracker-I8-0yYAH0), the purpose of which was to create a web application,
that lets the user find geolocation and display location data based on the provided IP address, website address or e-mail address.
The application uses React and three separate APIs to create a simple and effective tracker. User current location should be displayed on the first visit of the website.

## Created with

- [React](https://reactjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [GetJSONIP](https://getjsonip.com/)
- [IP Geolocation API](https://geo.ipify.org/)
- [Leaflet JS](https://leafletjs.com/)
- [Netlify Serverless Functions](https://www.netlify.com/docs/functions/)

## How it works

Following features were required for application to work:

### Design

Implementation of existing interface based on provided photo was one of project requirements. No sketch or figma design files were provided. The entire website had to be responsive and work on all devices.

![Phone Mockup](/images/projects/IPTracker/PhoneMockup2.webp#postMiniImage 'Phone App Mockup')

### Search for user's location

To create this functionality, I used the [Geolocation API](https://geo.ipify.org/). It returns data about the user's location after making the appropriate request to the API. Due to the fact that the API is secured with a key and has a limited number of requests for a free user, I had to secure the request by calling the serverless function hosted on Netlify. Otherwise, everyone would have access to my API key that they could then abuse.

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

### Location

Merely calling the geolocation API for an IP address is not enough. I had to prepare regular expression tests - REGEXP, which check whether the user wants to check the location based on an IP address, website address or E-mail address. Then, when making a request specific to a given address, it returns data about the user's location.

Additionally, it was necessary to consider the cases when the user logs in for the first time - then the application should display his current location. If the user has already searched for an address, it should be saved and displayed in the current session. For this I used SessionStorage.

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

### Location display

Actual displaying of location was another key feature. Here, the Leaflet API came in handy, which easily creates an interactive map on which we can display a predetermined location. The smooth transitions between locations are ensured by the Leaflet function - `map.flyTo (position)`.

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

## Summary

IP Tracker turned out to be an interesting and fun project. All APIs used in the project have clear documentation and are extremely easy to use. By creating this project, I developed my skills in the field of React, handling and communication with external APIs, and once again I had the pleasure of using TailwindCSS to handle styling.

If you haven't done it already, check out [IP Tracker live](https://ip-tracker.pantak.net/) and take a look at [GitHub code](https://github.com/kielx/ip-tracker).

![App Mockup](/images/projects/IPTracker/LaptopMockup.webp#postMiniImage 'App Mockup')
