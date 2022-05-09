---
title: 'My-Unsplash'
liveLink: 'https://my-unsplash-mu.vercel.app/'
githubLink: 'https://github.com/Kielx/my-unsplash'
excerpt: Unsplash clone created with Next.js, Firebase, Redux Toolkit and Tailwind CSS.
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

## Table of contents

- [Introduction](#introduction)
- [Project description](#project-description)
  - [What features does My Unsplash have](#what-features-does-my-unsplash-have)
  - [What features does My Unsplash not have](#what-features-does-my-unsplash-not-have)
- [Created with](#created-with)
- [How it's working](#how-it-s-working)
  - [Design](#design)
  - [Performance](#performance)
  - [Firebase](#firebase)
  - [Adding photos](#adding-photos)
  - [Redux Toolkit](#redux-toolkit)
- [Conclusions](#conclusions)

## Introduction

After creating a few projects using external APIs, I wanted to go a step further and gain experience with Firebase and Next.js. I had previously used Firebase when I was creating [Image Uploader](https://github.com/Kielx/image-uploader) - which I also used in this project, but it was a good way to rehearse and practice using Firebase Storage again. In addition, I could limit myself to only using Firebase Storage to make it easier to digest the topic in smaller portions. Additionally, it was a good opportunity to learn how to use Next.js. Previously, I created projects in Gatsby, but seeing the popularity of Next.js, I decided that it is high time to use this framework as well. The whole thing was completed by Redux Toolkit, which I used to handle the global state of the application.

## Project description

My Unsplash is my solution to [challenge](https://devchallenges.io/challenges/rYyhwJAxMfES5jNQ9YsP). This is my version of the application based on the popular Unsplash website. The application is a digital gallery that allows you to add and remove photos and display them in a Masonry layout.

Does that mean all I had to do was copy the finished design and called it my project? Not at all. For this project, I had design files at my disposal, but I had to translate their implementation into TailwindCSS. In addition, I had to choose a solution responsible for Masonry Layout and create all facilities responsible for adding and storing photos.

### What features does My Unsplash have

- The application presents the added photos in the Masonry layout - It is a system in which one axis uses a strict grid system - most often in the case of columns, while the other axis (rows) are matched to the gaps formed by shorter elements. The items in the following lines float up to fill the gaps completely.
- Users can add photos to the gallery using a dedicated drag'n'drop component
- New photos are displayed immediately after being added at the very top of the gallery
- A progress bar is displayed while adding images
- Users can delete photos from the gallery
- Users can search photos by name
- Photos are dynamically loaded using the infinite scroll
- Dark and light mode, the photos adjust the contrast accordingly for easier viewing against a dark background
- The website works as an SPA (Single Page Application)
- The application is responsive and should look correct on all types of devices that support modern browsers
- IP Tracker can be operated with just the keyboard

### What features does My Unsplash not have

- The site does not have login and user accounts, so each user can add photos with a maximum size of 5MB
- Due to the above, in theory, anyone can remove all photos from the gallery (the question remains, what for?). I do not aspire to compete with professional websites such as Unsplash or Pexels, and the project is only a hobby solution, so I did not implement login and user accounts.
- Due to the fact that the page loads only a certain number of photos when searching, it is limited to searching only among those that have already been downloaded. Due to time constraints, I did not create another option, although in the future I may solve it by creating a separate search window and displaying results based on the searched phrase.

![App in action](/images/projects/myUnsplash/myUnsplash.mp4#postVideo)

## Created with

- [Next.js](https://nextjs.org/)
- [Firebase](https://firebase.google.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)

## How it's working

For the application to work as intended, it was necessary to create the following functionalities:

### Design

The idea was to recreate the existing Masonry-style interface. The website had to be fully responsive and display a button that allows you to delete the photo after hovering over it with the mouse cursor. The masonry layout is provided by the [React Masonry CSS](https://www.npmjs.com/package/react-masonry-css). The website has also been equipped with the Dark Mode.

### Performance

Downloading and uploading all photos from the gallery is a huge challenge even for the best internet connection. Users using mobile devices would have to wait a long time before the page loads. One of my top priorities when creating any website is speed. It is no different with My-Unsplash. I have decided all photos must be in webp format for best performance. In addition, they are loaded as part of the infinite scroll, and only such a number is displayed to keep the page loading time to a minimum. Consecutive photos are loaded as you scroll the page. Thanks to this, I was able to achieve high lighthouse results, despite the fact that the website consists of only photos.

![Lighthouse scores](/images/projects/myUnsplash/my-unsplash-scores.webp#postMiniImage)

### Firebase

Photos need to be stored somewhere. I considered creating my own backend for this purpose, but the simplicity of implementation, the possibility of theoretically infinite scaling, and a generous free tier made me use Firebase Storage.

### Adding photos

The component I created earlier - [Image Uploader](https://github.com/Kielx/image-uploader) is responsible for adding photos. It allows you to add photos via drag'n'drop, and also displays a notification in the event of incorrect file size or format. Additionally, the progress bar displays information about the file upload progress.

### Redux Toolkit

The application logic required me to use an additional solution to store the application state. I decided to use Redux Toolkit because the application had a large number of variables stored in the state of individual components, which had to cooperate with each other. In addition, I wanted to use Redux Toolkit due to its popularity and usefulness in other projects.

## Conclusions

I created My Unsplash with the intention of deepening my knowledge of Next.js, Firebase, Redux Toolkit, and Tailwind CSS. After some time, I can say that I achieved this goal, and the project turned out to be an important milestone on my development path.

If you haven't done it yet, check out [My Unsplash live](https://my-unsplash-mu.vercel.app/) and take a look at [GitHub code](https://github.com/Kielx/my-unsplash).

![App Mockup](/images/projects/myUnsplash/my-unsplash2.webp#postMiniImage 'App Mockup')
