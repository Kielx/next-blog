---
title: 'Terminal Portfolio'
liveLink: 'https://pantak.net'
githubLink: 'https://github.com/Kielx/terminal-portfolio'
excerpt: Portfolio stylizowane na wiersz poleceń. Stworzone z wykorzystaniem Gatsby, strony projektów generowane z plików Markdown, a okna tworzone przy pomocy Winbox.js.
coverImage: 'https://raw.githubusercontent.com/Kielx/terminal-portfolio/master/static/PortfolioSS.png'
techUsed:
  - 'Gatsby'
  - 'React'
  - 'Winbox.js'
  - 'Markdown'
---

![App Screenshot](https://raw.githubusercontent.com/Kielx/terminal-portfolio/master/static/PortfolioSS.png#postMiniImage 'Screenshot of app')

## Spis treści

- [Co to jest Terminal Portfolio](#co-to-jest-terminal-portfolio)
- [Stworzone przy pomocy](#stworzone-przy-pomocy)
- [Jak i dlaczego?](#jak-i-dlaczego)
  - [Szybkość — Gatsby](#szybkość---gatsby)
  - [Prostota obsługi — Markdown](#prostota-obsługi---markdown)
  - [Oryginalność - Winbox.js](#oryginalność---winbox-js)
  - [Formularz kontaktowy](#formularz-kontaktowy)
- [Wnioski](#wnioski)

## Co to jest Terminal Portfolio

Od zawsze byłem zafascynowany oknem terminala. Jest proste, lecz niezwykle potężne. Dlatego też zainspirowany filmem o
tworzeniu landing page z wykorzystaniem Winbox.js postanowiłem wykorzystać tę technologię do stworzenia mojego
portfolio. Portfolio stylizowane na okno wiersza poleceń wyglądało na ciekawy i oryginalny projekt, który w prosty
sposób może przedstawić moje programistyczne projekty.

## Stworzone przy pomocy

- [React](https://reactjs.org/)
- [Gatsby](https://www.gatsbyjs.com/)
- [Winbox.js](https://github.com/nextapps-de/winbox)
- [Markdown](https://www.markdownguide.org/getting-started/)
- [AWS API Gateway / Lambda Functions](https://aws.amazon.com/)
- [Funkcje Netlify](https://www.netlify.com/docs/functions/)

## Jak i dlaczego?

Poniżej przedstawiam jakie technologie wykorzystałem podczas tworzenia mojego portfolio oraz co spowodowało, że zdecydowałem się właśnie na te rozwiązania, a także problemy, na jakie się natknąłem oraz moj sposób na ich rozwiązanie.

### Szybkość — Gatsby

Każdy programista potrzebuje portfolio, w którym może przedstawić swoją pracę. Nie inaczej było w moim przypadku. Za
podstawę efektywnego portfolio uznałem szybkość działania. Co z tego, że portfolio jest piękne, posiada pomysłowe
animacje oraz setki efektów, jeśli nikt nie będzie chciał go oglądać, gdyż trzeba czekać 15 sekund, aż się załaduje?
Przeglądając portfolio innych programistów w poszukiwaniu inspiracji, zauważyłem, że jeśli ładuje się ono dłużej niż
kilka sekund, to zazwyczaj nie chce mi się czekać i szukam dalej. Czytałem gdzieś, że kilkaset milisekund opóźnienia w
przypadku większych serwisów potrafi skutecznie zniechęcić licznych klientów. Założyłem, że pozostali użytkownicy
również mają podobne podejście. Dlatego też przy tworzeniu portfolio jako framework wybrałem Gatsby.

To był mój pierwszy projekt, który wykonałem, korzystając z Gatsby. W owym czasie czytałem sporo na temat możliwości, jakie oferuje ten framework, a w szczególności zainteresowała mnie możliwość generowania statycznych stron i obiecywana prędkość, z jaką miała działać aplikacja korzystająca z Gatsby. Optymalizacja zdjęć, generowanie stron, pluginy do obsługi Markdowna — wszystkie te rzeczy były dość trudne do opanowania za pierwszym razem, jednak finalnie udało mi się stworzyć moje pierwsze portfolio, a przy okazji zdobyć doświadczenie w tworzeniu stron przy użyciu Gatsby.

### Prostota obsługi — Markdown

Kolejnym istotnym dla mnie aspektem przy tworzeniu tego projektu, była łatwość obsługi. Oglądając niektóre portfolia, widziałem w nich bardzo pomysłowe rozwiązania na interakcje ze stroną. Bardzo pomysłowe, ale niejednokrotnie bardzo nieintuicyjne. Uznałem, że takie niestandardowe rozwiązania są bardzo ciekawe, ale mogą utrudnić łatwą nawigację po stronie, a czasem uniemożliwić nawet zapoznanie się z jej sednem — projektami, które ma prezentować. Dlatego też mimo pokusy stworzenia np. interaktywnego okna, w którym użytkownik może wpisywać komendy, wyświetliłem od razu wszystkie projekty w liście do wyboru.

Projekty przechowywane są w folderze projektu w plikach Markdown. Zapewnia to łatwość ich edytowania i niezależność od kolejnych dostawców usług. Nie chciałem łączyć się z odrębnymi serwisami CMS, gdyż edycja plików Markdown jest łatwa i przyjemna, a przesłanie takiego pliku ogranicza się do dodania jednego commita w repozytorium GitHuba.

### Oryginalność - Winbox.js

Projekt zawdzięcza swoją oryginalność zastosowaniu biblioteki Winbox.js, która umożliwia tworzenie osobnych okien wewnątrz przeglądarki. Dzięki temu dla użytkownika, który korzysta z komputera do wyświetlania zawartości strony, każdy projekt otwierany jest w osobnym oknie stylizowanym na nowe okno terminala. Tam wyświetlane jest zdjęcie lub film przedstawiający projekt. Użytkownikom urządzeń mobilnych wyświetlane są osobne strony, dzięki temu nie ma problemów z nawigacją i obsługą okien za pomocą dotyku.

W początkowej wersji chciałem stworzyć grafiki ASCII i wyświetlać je w oknie. Dzięki temu projekt wyglądałby bardziej spójnie i 'hakersko', ale jednocześnie straciłby dużo w kwestii łatwości użycia — a to był przecież mój cel główny. W moim zamyśle portfolio ma w łatwy i przystępny sposób prezentować projekty, a nie służyć za idealną kopię okna terminala.

Jeśli chodzi o kolorystykę, to opierałem się na kolorystyce Cobalt2, która nadała oknom terminala trochę więcej barw niż standardowe czarne i białe. W trybie jasnym użyłem palety opartej na solarized light, która pozwala oczom odetchnąć nieco od całkowicie białego tła.

### Formularz kontaktowy

W zasadzie wystarczyłoby przecież podać adres e-mail i ktoś, kto chciałby się ze mną skontaktować, mógłby wysłać wiadomość prawda? Teoretycznie tak, ale jest to prosta droga do zasypania poczty niechcianym spamem w przypadku, gdy jakiś bot lub ktoś złośliwy uzna, że warto obdarować mnie niechcianymi wiadomościami.

Chcąc uniknąć takiej sytuacji, jedynym wyjściem jest stworzenie formularza kontaktowego, gdzie uczciwa osoba, chcąca napisać do mnie wiadomość poda swój adres e-mail i napisze wiadomość. Formularz powinien wtedy wysłać ją na mój adres, bez ujawniania go szerszej publiczności.

Wobec tego musiałem wziąć kilka okoliczności pod uwagę przy tworzeniu tego formularza:

- Skoro formularz jest obsługiwany przez frontend, to zakodowanie w JavaScript adresu e-mail, na który ma być wysyłana wiadomość, nie wchodziło w grę, gdyż równie dobrze, każdy mógłby podejrzeć zawartość żądania sieciowego i sprawdzić, na jaki adres wysyłamy wiadomość.
- Ewentualny klucz API do obsługi wysyłanych wiadomości również nie mógł być przechowywany we frontendzie, gdyż można by go podejrzeć w taki sam sposób.
- Musiałem też wziąć pod uwagę, że w łatwy sposób można wysłał setki wiadomości za pomocą tego formularza i w jakiś sposób zapobiec takiej ewentualności. Jakiekolwiek próby ograniczenia tego na frontendzie są bezskuteczne, gdyż odpowiednio zdeterminowana osoba bez trudu może zmienić wszystkie moje zabezpieczenia.

Rozwiązałem to w następujący sposób:

- Użytkownik wpisuje swój adres e-mail i wiadomość w formularzu kontaktowym i wysyła wiadomość za pomocą strony.
- Następnie wysyłane jest żądanie do funkcji lambda hostowanej na Netlify, w której zapisane są dane gatewaya AWS oraz klucz API do potwierdzenia, że żądanie pochodzi z mojej strony. Oczywiście dane te są przechowywane jako zmienne środowiskowe na Netlify, więc nie da się ich podejrzeć z poziomu kodu. Funkcja ta, która otrzymała żądanie od strony z portfolio, przesyła je dalej do AWS API Gateway.
- Po otrzymaniu tego żądania API Gateway AWS sprawdza, czy żądanie pochodzi z mojej strony oraz ogranicza wiadomości do 3 na sekundę i 30 wiadomości dziennie — dzięki temu nie ma możliwości zasypania mnie spamem, a mój limit wydatków na AWS nie zostanie przekroczony.
- Jeśli żądanie pochodzi z mojej strony, to zostaje wysyłane do funkcji lambda AWS, która za pomocą AWS SES wysyła wiadomość na mój adres e-mail.

Być może nie jest to rozwiązanie najprostsze lub optymalne. Sendgrid oferuje przecież 100 darmowych e-maili na dzień i proste API — to fakt, ale tworząc ten formularz, chciałem jednocześnie poznać, jak działają niektóre technologie chmury, a przy okazji utrzymać (przynajmniej pozorną) niezależność od płatnych, zewnętrznych API.

## Wnioski

Finalnie, jestem bardzo zadowolony z efektu, jaki udało mi się osiągnąć. Projekt zyskał nawet kilka gwiazdek na GitHubie, co pozwala mi sądzić, że udało mi się zrealizować zamierzone cele.

Jeśli jeszcze tego nie zrobiłeś, to sprawdź, jak wygląda [Portfolio live](https://www.pantak.net) i zerknij na [kod na GitHub](https://github.com/kielx/terminal-portfolio). Tam też znajdziesz instrukcje jak sklonować projekt, jeśli zechcesz zaczerpnąć inspiracji.
