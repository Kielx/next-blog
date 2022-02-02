---
title: 'Jak zacząć przygodę z C++ i Ncurses - Cz. 2 - Okno i sterowanie'
date: '2022-02-01'
excerpt: 'Pierwsza część serii, gdzie opisuję przebieg tworzenia konsolowej gry Pong przy pomocy języka C++ i biblioteki Ncurses. Praktyczny przewodnik na temat podstaw języka i ich zastosowania w programowaniu.'
coverImage: '/images/posts/CppNcurses2/1.jpg'
keywords:
  - 'C++'
  - 'Ncurses'
  - Podstawy
---

![Dziewczyna grająca w tenisa](/images/posts/CppNcurses2/1.jpg#postMainImage)

## Spis treści

- [Spis treści](#spis-treści)
- [Wstęp](#wstęp)
- [Co będziemy tworzyć?](#co-będziemy-tworzyć)
  - [W jakim celu będziemy tworzyć tą grę?](#w-jakim-celu-będziemy-tworzyć-tą-grę)
- [Co będzie potrzebne by zacząć?](#co-będzie-potrzebne-by-zacząć)
- [Ok, zainstalowałem Ubuntu, co dalej?](#ok-zainstalowałem-ubuntu-co-dalej)
- [Zainstalowałem Ubuntu i VSCode, czy wreszcie mogę pisać programy?](#zainstalowałem-ubuntu-i-vscode-czy-wreszcie-mogę-pisać-programy)
  - [A co to za polecenia, które mam wpisywać w terminal?](#a-co-to-za-polecenia-które-mam-wpisywać-w-terminal)
  - [A jak ja mam zapamiętać te wszystkie polecenia?](#a-jak-ja-mam-zapamiętać-te-wszystkie-polecenia)
  - [Instalujemy kompilator GCC](#instalujemy-kompilator-gcc)
- [Podsumowanie](#podsumowanie)

## Wstęp

W tym poście, postaram się pomóc początkującym, którzy chcą rozpocząć swoją przygodę z programowaniem w języku C++. Celem jest stworzenie prostej gry Pong, w której gracz steruje paletką i odbija piłkę w oknie terminala. Każde udane odbicie to punkty dla gracza, natomiast spadnięcie piłki za mapę oznacza przegraną. By stworzyć tą grę, korzystać będziemy z języka C++ oraz dodatkowej biblioteki o nazwie NCurses.

## Co będziemy tworzyć?

![Pong gameplay](/images/posts/How-to-get-started-with-cpp-and-ncurses/2.gif#postMiniImage)

### W jakim celu będziemy tworzyć tą grę?

Większość poradników skupia się albo na czystej teorii - np. jak działają funkcje i klasy lub wyłącznie na praktycznej części przygotowania programu.

Wielokrotnie podczas czytania dokumentacji brakowało mi praktycznych przykładów zastosowania określonego rozwiązania i pojawiało się u mnie pytanie - "No dobrze, to jest np. klasa, ale do czego jest mi ona potrzebna? Jak mam ją wykorzystać w prawdziwym życiu (programowaniu)?". Dużo łatwiej zrozumieć określone pojęcie o ile mamy podstawę by zastosować je w praktyce.

Czy powinniśmy więc skupić się tylko na praktyce? Są tego plusy, jednak wtedy może się okazać, że po prostu kopiujemy dokładnie to co robił autor poradnika. W efekcie - po wykonaniu całego projektu, kiedy spróbujemy stworzyć coś swojego znowu mamy pustkę w głowie.

Dlatego też podczas tworzenia tych postów chcę znaleźć złoty środek i połączyć odpowiednią dawkę teorii z praktyką dla początkujących w taki sposób by mogli przenieść zdobytą wiedzę na grunt nowych projektów.

## Co będzie potrzebne by zacząć?

Przed przystąpieniem do lektury wiedz, że nie zakładam żadnej wiedzy programistycznej z Twojej strony. Postaram się poprowadzić Cię przez wszystkie kroki i wytłumaczyć w możliwie najprostszy sposób co będziemy robić.

Jedynym wymaganiem jest posiadanie działającego systemu Linux - co może odstraszyć początkujących - jednak nie jest to nic strasznego. O zaletach tego systemu operacyjnego można przeczytać wiele w internecie np. [tu](https://teamquest.pl/blog/843_ubuntu-linux-dla-dewelopera). Ale jeśli będzie to Twój pierwszy kontakt z tym systemem to moim zdaniem najwygodniejszym sposobem będzie stworzenie maszyny wirtualnej z systemem Ubuntu.

Co to jest maszyna wirtualna? W uproszczeniu - to tak jak gdyby nasz system operacyjny, emulowal działanie nowego komputera, o parametrach które wybierzemy i dopiero na tym wirtualnym komputerze zainstalujemy nasz system. Nie zniechęcaj się - uruchomienie takiego systemu zajmie Ci kilka minut i sprowadza się w zasadzie do trzech kroków - pobrania virtualboxa i zainstalowania go, następnie pobrania obrazu ISO (obrazu płyty z systemem) i finalnie zainstalowanie go na naszej maszynie wirtualnej. Dzięki temu możemy bezpiecznie odkrywać co oferuje system Linux, a jednocześnie nie musimy się martwić, że coś zepsujemy. Szczegółowy sposób instalacji opisano tu [Jak zainstalować Linuxa na virtualbox](https://www.download.net.pl/jak-zainstalowac-linuxa-na-virtualbox-dowolna-dystrybucja/n/15416/). Całość nie powinna zająć więcej niż kilka minut, w zależności od szybkości Twojego łączą i możliwości sprzętowych.

## Ok, zainstalowałem Ubuntu, co dalej?

By pisać programy w zasadzie wystarczy nam dowolny edytor tekstu. Takie rozwiązanie jednak będzie krótko mówiąc mało optymalne. By lepiej wykoryzstać nasz czas warto skorzystać z pomocy Zintegrowanego Środkowiska Programistycznego (ang. IDE - Integrated Development Environment) - czyli programu, który pozwala na szybsze i wydajniejsze pisanie programów. Osobiście korzystam na codzień i polecam Visual Studio Code - jest to lekki i prosty w obsłudze program, który zyskał powszechne uznanie wśród programistów na całym świecie.

Instrukcję [Jak pobrać i zainstalować Visual Studio Code dla Linuxa znajdziesz tu](https://newsblog.pl/jak-zainstalowac-program-microsoft-visual-studio-code-w-systemie-linux/#:~:text=Krok%201%3A%20Zainstaluj%20pakiety%20Base,Git%20na%20swoim%20komputerze%20Arch.&text=Krok%202%3A%20Sklonuj%20pakiet%20Visual%20Studio%20Code%20AUR%20za%20pomoc%C4%85%20Git.&text=Krok%203%3A%20CD%20do%20folderu%20kodu.&text=Krok%204%3A%20Skompiluj%20pakiet%20i%20zainstaluj%20go%20na%20komputerze%20Arch%20Linux.)

Terminal możesz uruchomić zazwyczaj poprzez użycie skrótu ctrl + alt + T. Ewentualnie możesz znaleźć go w głównym menu programów. Jeśli masz problem z powyższymi instrukcjami, a Twoja dystrybucja obsługuje pakiety Snap (Ubuntu je obsługuje), możesz zainstalować Visual Studio Code za pomocą polecenia

~~~Bash
sudo snap install code --classic
~~~

## Zainstalowałem Ubuntu i VSCode, czy wreszcie mogę pisać programy?

W teorii tak, jednak w praktyce potrzebujemy kilku rzeczy. Przede wszystkim kompilatora, który będzie potrzebny do kompilowania naszych programów. W naszym przypadku będzie to GCC (GNU Compiler Collection).

A co to jest kompilator i do czego jest potrzebny? Najprościej rzecz ujmując - kompilator to program, który tłumaczy to co napisaliśmy w jednym języku programowania na kod w innym języku - tu na kod maszynowy, który może być zrozumiany i wykorzystany przez komputer. Więc nasz proces pracy będzie wyglądał następująco:

1. Napiszemy program w języku C++
2. Kompilujemy napisany przez nasz program, czyli tłumaczymy go za pomocą kompilatora na język maszynowy
3. Uruchamiamy program i cieszymy się z efektów

### A co to za polecenia, które mam wpisywać w terminal?

Dobre pytanie - sam na początku mojej przygody z Linuxem zastanawiałem się co to wszystko znaczy.

~~~Bash
sudo
~~~

To skrót od SuperUser DO - czyli zrób coś jako administrator systemu. W systemie Windows podczas instalacji programów wyskakuje nam okienko, które prosi o potwierdzenie, że chcemy zainstalować program jako administrator. W Linuxie nie ma takiego okienka, a robimy to poprzez polecenie sudo.

~~~Bash
apt-get install gcc
~~~

To polecenie, które pozwala na zainstalowanie pakietów. Pakiety to paczki, które zawierają różne przydatne programy, które możemy używać w naszym systemie. APT (Advanced Packaging Tool) to menadżer pakietów systemu Ubuntu, który odpowiada za instalowanie, aktualizowanie i usuwanie pakietów. We wspomnianym wyżej poleceniu przekazujemy do terminala komendę, by przy pomocy APT'a zainstalował pakiet o określonej nazwie - tu GCC czyli paczkę, która zawiera program kompilatora.

### A jak ja mam zapamiętać te wszystkie polecenia?

Nie musisz ich zapamiętywać. W przyszłości zakładam dwie wersje wydarzeń:

- Bedziesz używał takich lub podobnych poleceń na tyle często, że po prostu je zapamiętasz samoistnie.
- Jeśli nie zapamiętasz poleceń, to w łatwy sposób możesz je znaleźć poprzez skuteczne wyszukiwanie w Google. Może warto napisać o tym odrębny post, ale wiedząc co chcesz zrobić, a nie znajać polecenia wystarczy wpisać szukaną frazę w google i po chwili znajdziesz informację, post lub dokumentację, która przedstawia co musisz zrobić. Wystarczy poszukać frazy "Jak instalować pakiety Ubuntu" a zaraz wyskoczy kilkanaście stron, które krok po kroku pokazują co musisz zrobić.

### Instalujemy kompilator GCC

Pierwsze co musimy zrobić to uruchomić terminal (ctrl + alt + T) i wpisać polecenie:

~~~Bash
sudo apt-get install gcc
~~~

Potrzebujemy jeszcze potrzebne narzędzia do kompilowania naszych programów i debugowania.

Tym poleceniem instalujemy wymagane pakiety:

~~~Bash
sudo apt-get install build-essential gdb
~~~

Na koniec instalujemy biliotekę Ncurses

~~~Bash
sudo apt-get install libncurses5-dev libncursesw5-dev
~~~

## Podsumowanie

Gratuluję, udało Ci się przejść wszystkie niezbędne kroki by skonfigurować swoje środowisko do pracy z C++ i Ncurses. W następnej części przejdziemy do pisania programów i tworzenia naszej gry od podstaw.
