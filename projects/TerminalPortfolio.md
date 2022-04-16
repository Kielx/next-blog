---
title: 'Terminal Portfolio'
liveLink: 'https://pantak.net'
githubLink: 'https://github.com/Kielx/terminal-portfolio'
excerpt: A command-line styled portfolio. Created with Gatsby, project pages generated from Markdown files, and windows created with Winbox.js
coverImage: 'https://raw.githubusercontent.com/Kielx/terminal-portfolio/master/static/PortfolioSS.png'
techUsed:
  - 'Gatsby'
  - 'React'
  - 'Winbox.js'
  - 'Markdown'
---

![App Screenshot](https://raw.githubusercontent.com/Kielx/terminal-portfolio/master/static/PortfolioSS.png#postMiniImage 'Screenshot of app')

## Table of contents

- [What Terminal Portfolio is](#what-terminal-portfolio-is)
- [Built with](#built-with)
- [How and why?](#how-and-why)
  - [Speed - Gatsby](#speed---gatsby)
  - [Ease of use - Markdown](#ease-of-use---markdown)
  - [Uniqueness - Winbox.js](#uniqueness---winbox-js)
  - [Contact form](#contact-form)
- [Conclusions](#conclusions)

## What Terminal Portfolio is

I have always been fascinated by the terminal window. It is simple but extremely powerful. Therefore, inspired by the YouTube video about creating a landing page using Winbox.js, I decided to use this technology to create my portfolio. The command-line styled portfolio looked like an interesting and original design that can present my programming projects simply and cleanly.

## Built with

- [React](https://reactjs.org/)
- [Gatsby](https://www.gatsbyjs.com/)
- [Winbox.js](https://github.com/nextapps-de/winbox)
- [Markdown](https://www.markdownguide.org/getting-started/)
- [AWS API Gateway / Lambda Functions](https://aws.amazon.com/)

## How and why?

Below I present what technologies I used to create my portfolio and what made me decide on these solutions, as well as the problems I encountered and my way to solve them.

### Speed - Gatsby

Every developer needs a portfolio where they can present their work. It was no different in my case. I found speed to be the most important part of an effective portfolio. So what if the portfolio is beautiful, it has ingenious animations and hundreds of effects if nobody wants to watch it, because you have to wait 15 seconds for it to load? While browsing through other developers' portfolios for inspiration, I noticed that if it takes longer than
a few seconds, I usually don't want to wait. I read somewhere that several hundred milliseconds delay can effectively discourage numerous customers. I assumed other users would
also have a similar approach. Therefore, when creating a portfolio, I chose Gatsby as a framework.

This was the first project that I created using Gatsby. At that time, I read a lot about the possibilities that this framework offers, and in particular, I was interested in the ability to generate static pages and the promised speed at which an application using Gatsby was supposed to run. Optimizing photos, generating pages, Markdown plugins - all these things were quite difficult to learn the first time, but finally, I managed to create my portfolio and gain experience by using Gatsby's features.

### Ease of use - Markdown

Another important aspect for me when creating this project was the ease of use. While watching some of the portfolios, I saw many projects using creative solutions for user interactions. Very ingenious, but often very counter-intuitive. I found such non-standard solutions to be very interesting, but they can make it difficult to navigate through the website, and sometimes even make it impossible to get to know its essence - the projects it is supposed to present. Therefore, despite the temptation to create, for example, an interactive window in which the user can enter commands, I immediately displayed all the projects in the list to choose from.

Projects are stored in the projects folder in separate Markdown files. This ensures that they are easy to edit and independent from other service providers. I did not want to connect to separate CMS services, because editing Markdown files is easy and fun, and one commit is all that separates me from uploading the updated version to GitHub.

### Uniqueness - Winbox.js

The project owes its uniqueness to the use of the Winbox.js library, which allows users to create separate windows inside the browser. As a result, for the user who uses the desktop computer to display the page content, each project opens in a separate window styled as a new terminal window. There, a photo or video of the project is displayed. For mobile users, the project windows are displayed as separate static pages for a better user experience.

In the initial release, I wanted to create ASCII graphics and display them in a window. This would make the design look more coherent and 'hackerish', but at the same time lose a lot in terms of ease of use - and ease of use was my main goal after all. The portfolio is supposed to present projects in an easy and accessible way, and not to serve as a perfect copy of the terminal window.

As for the color scheme, I relied on the Cobalt2 color scheme, which gave the terminal windows a little more color than the standard black and white. In light mode, I used a solarized light-based palette, which allows the eyes to take a break from the completely white background.

### Contact form

It is enough to provide an e-mail address and someone who would like to contact me could send a message, right? In theory, yes, but it's a simple way to flood your mail with spam in case some malicious person thinks it's a good idea to send me unwanted messages.

To avoid such a situation, the only solution was to create a contact form, where a normal user who wants to write a message to me will provide his e-mail address and write a message. The form should then mail it to my address, without disclosing it to a wider public.

Therefore, I had to take several considerations into account when creating this form:

- Since the form is handled by the frontend, hardcoding the e-mail address in JavaScript was not an option, because anyone could view the content of the network request and check the address to which we are sending the message.
- An API key to secure and authenticate sent messages could not be stored in the frontend for the same reason.
- I also had to take into account that you can easily send hundreds of messages using this form. Therefore I had to somehow prevent such an eventuality. Any attempts to limit this on the frontend are bound to be unsuccessful because a properly determined person can easily change all my security features.

I solved it as follows:

- The user enters his e-mail address and message in the contact form and sends a message via the website.
- Then a request is sent to the lambda function hosted on Netlify, in which the AWS gateway data and API key are stored to confirm that the request comes from my site. Of course, this data is stored as environment variables on Netlify, so it cannot be previewed from within the code. This function, which received a request from the portfolio page, forwards it to the AWS API Gateway.
- After receiving this request, AWS API Gateway checks if the request comes from my site and limits messages to 3 per second and 30 messages a day - thanks to this, there is no possibility of flooding me with spam, and my AWS spending limit will not be exceeded.
- If the request comes from my website, it is then sent to the AWS lambda function, which uses AWS SES to send a message to my e-mail address.

Perhaps it is not the simplest or the most optimal solution. Sendgrid offers 100 free e-mails a day and a simple API - that's a fact, but by creating this form I learned how some cloud technologies work, and at the same time I was able to maintain (at least to some extent) independence from paid, external APIs.

## Conclusions

Finally, I am very pleased with the effect I have achieved. The project even got a few stars on GitHub, which leads me to believe that I managed to achieve my goals.

If you haven't done it yet, check out [Portfolio live](https://www.pantak.net) and take a look at [GitHub code](https://github.com/kielx/terminal-portfolio). There you will also find instructions on how to clone a project if you want to get inspiration when creating your own project based on this website.
