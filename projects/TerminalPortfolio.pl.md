---
title: 'Terminal Portfolio'
date: '2022-02-01'
excerpt: Portfolio stylizowane na wiersz poleceń. Stworzone z wykorzystaniem Gatsby, strony projektów generowane z plików Markdown, a okna tworzone przy pomocy Winbox.js.
coverImage: 'https://raw.githubusercontent.com/Kielx/terminal-portfolio/master/static/PortfolioSS.png'
techUsed:
  - 'Gatsby'
  - 'React'
  - 'Winbox.js'
  - 'Markdown'
---

![App Screenshot](https://raw.githubusercontent.com/Kielx/terminal-portfolio/master/static/PortfolioSS.png#postMiniImage 'Screenshot of app')

## Co to jest Terminal Portfolio

Od zawsze byłem zafascynowany oknem terminala. Jest proste, lecz niezwykle potężne. Dlatego też zainspirowany filmem o
tworzeniu landing page z wykorzystaniem Winbox.js postanowiłem wykorzystać tą technologię do stworzenia mojego
portfolio. Portfolio stylizowane na okno wiersza poleceń wyglądało na ciekawy i oryginalny projekt, który w prosty
sposób może przedstawić moje programistyczne projekty.

## Jak i dlaczego?

Poniżej przedstawiam jakie technologie wykorzystałem podczas tworzenia mojego portfolio oraz co spowodowało, że zdecydowałem się właśnie na te rozwiązania.

### Szybkość — Gatsby

Każdy programista potrzebuje portfolio, w którym może przedstawić swoją pracę. Nie inaczej było w moim przypadku. Za
podstawę efektywnego portfolio uznałem szybkość działania. Co z tego, że portfolio jest piękne, posiada pomysłowe
animacje oraz setki efektów, jeśli nikt nie będzie chciał go oglądać, gdyż trzeba czekać 15 sekund, aż się załaduje?
Przeglądając portfolio innych programistów w poszukiwaniu inspiracji, zauważyłem, że jeśli ładuje się ono dłużej niż
kilka sekund, to zazwyczaj nie chce mi się czekać i szukam dalej. Czytałem gdzieś, że kilkaset milisekund opóźnienia w
przypadku większych serwisów potrafi skutecznie zniechęcić licznych klientów. Założyłem, że pozostali użytkownicy
również mają podobne podejście. Dlatego też przy tworzeniu portfolio jako framework wybrałem Gatsby.

To był mój pierwszy projekt, który wykonałem, korzystając z Gatsby. W tamtym czasie czytałem sporo na temat możliwości, jakie oferuje, a w szczególności zainteresowała mnie możliwość generowania statycznych stron i obiecywana prędkość, z jaką miała działać aplikacja korzystająca z tego frameworka. Optymalizacja zdjęć, generowanie stron, pluginy do obsługi Markdowna — wszystkie te rzeczy były dość trudne do opanowania za pierwszym razem, jednak finalnie udało mi się stworzyć moje pierwsze portfolio, a przy okazji zdobyć doświadczenie w tworzeniu stron przy użyciu Gatsby.

### Prostota obsługi — Markdown

Kolejnym istotnym dla mnie aspektem przy tworzeniu tego projektu, była łatwość obsługi. Oglądając niektóre portfolia, widziałem w nich bardzo pomysłowe rozwiązania na interakcje ze stroną. Bardzo pomysłowe, ale niejednokrotnie bardzo nieintuicyjne. Uznałem, że takie niestandardowe rozwiązania są bardzo ciekawe, ale mogą utrudnić łatwą nawigację po stronie, a czasem uniemożliwić nawet zapoznanie się z jej sednem — projektami, które ma prezentować. Dlatego też mimo pokusy stworzenia np. interaktywnego okna, w którym użytkownik może wpisywać komendy, wyświetliłem od razu wszystkie projekty w liście do wyboru.

Projekty przechowywane są w folderze projektu w plikach Markdown. Zapewnia to łatwość ich edytowania i niezależność od kolejnych dostawców usług. Nie chciałem łączyć się z odrębnymi serwisami CMS, gdyż edycja plików Markdown jest łatwa i przyjemna, a przesłanie takiego pliku ogranicza się do dodania jednego commita w repozytorium GitHuba.

### Oryginalność - Winbox.js

Projekt zawdzięcza swoją oryginalność zastosowaniu biblioteki Winbox.js, która umożliwia tworzenie osobnych okien wewnątrz przeglądarki. Dzięki temu dla użytkownika, który korzysta z komputera do wyświetlania zawartośći strony, każdy projekt otwierany jest w osobnym oknie stylizowanym na nowe okno terminala. Tam wyświetlane jest zdjęcie lub film przedstawiajacy projekt.

W początkowej wersji chciałem stworzyć grafiki ASCII i wyświetlać je w oknie. Dzięki temu projekt wyglądałby bardziej spójnie i 'hakersko', ale jednocześnie straciłby dużo w kwestii łatwości użycia — a to był przecież mój cel główny. W moim zamyśle portfolio ma w łatwy i przystępny sposób prezentować projekty, a nie służyć za idealną kopię okna terminala.

Jeśli chodzi o kolorystykę, to opierałem się na kolorystyce Cobalt2, która nadała oknom terminala trochę więcej barw niż standardowe czarne i białe. W trybie jasnym użyłem palety opartej na solarized light, która pozwala oczom odetchnąć nieco od całkowicie białego tła.

### Formularz kontaktowy

Formularz kontaktowy obsługiwany jest przez funkcję Lambda na AWS, która jest odpowiednio zabezpieczona przez api gateway. Dzięki temu mogłem ograniczyć ewentualny spam jaki ktoś złośliwy, mógłby chcieć mi wysyłać na podany adres email, a sam formularz jest łatwy do wykorzystania w innych projektach.

## Wnioski

Finalnie, jestem bardzo zadowolony z efektu, jaki udało mi się osiągnąć. Projekt zyskał nawet kilka gwiazdek na GitHubie, co pozwala mi sądzić, że udało mi się zrealizować zamierzone cele.

Jeśli jeszcze tego nie zrobiłeś, to sprawdź, jak wygląda [Portfolio live](https://www.pantak.net) i zerknij na [kod na GitHub](https://github.com/kielx/terminal-portfolio). Tam też znajdziesz instrukcje jak sklonować projekt, jeśli chcesz zaczerpnąć inspiracji podczas tworzenia własnego projektu opartego na tej stronie.