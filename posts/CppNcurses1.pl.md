---
title: 'Jak zacząć przygodę z C++ i Ncurses - Cz. 1 - Wprowadzenie'
date: '2022-02-01'
excerpt: 'Pierwsza część serii, gdzie opisuję przebieg tworzenia konsolowej gry Pong przy pomocy języka C++ i biblioteki Ncurses. Praktyczny przewodnik na temat podstaw języka i ich zastosowania w programowaniu.'
coverImage: '/images/posts/CppNcurses1/2.gif'
keywords:
  - 'C++'
  - 'Ncurses'
  - Podstawy
---

![Jak wygląda gra](/images/posts/CppNcurses1/2.gif#postMiniImage)

## Spis treści

- [Wstęp](#wstęp)
- [Co będziemy tworzyć?](#co-będziemy-tworzyć)
  - [Dla kogo jest ten poradnik i w jakim celu będziemy tworzyć tą grę?](#dla-kogo-jest-ten-poradnik-i-w-jakim-celu-będziemy-tworzyć-tą-grę)
- [Co będzie potrzebne by zacząć?](#co-będzie-potrzebne-by-zacząć)
- [Ok, zainstalowałem Ubuntu, co dalej?](#ok-zainstalowałem-ubuntu-co-dalej)
- [Zainstalowałem Ubuntu i VSCode, czy wreszcie mogę pisać programy?](#zainstalowałem-ubuntu-i-vscode-czy-wreszcie-mogę-pisać-programy)
  - [A co to za polecenia, które mam wpisywać w terminal?](#a-co-to-za-polecenia-które-mam-wpisywać-w-terminal)
  - [A jak ja mam zapamiętać te wszystkie polecenia?](#a-jak-ja-mam-zapamiętać-te-wszystkie-polecenia)
  - [Instalujemy kompilator GCC](#instalujemy-kompilator-gcc)
  - [Stwórzmy plik z kodem](#stwórzmy-plik-z-kodem)
- [Kompilowanie i uruchamianie](#kompilowanie-i-uruchamianie)
- [Klasyczny Hello World](#klasyczny-hello-world)
  - [Co się zmieniło?](#co-się-zmieniło)
- [Podsumowanie](#podsumowanie)

## Wstęp

W tym poście, postaram się pomóc początkującym, którzy chcą rozpocząć swoją przygodę z programowaniem w języku C++.
Ten post można potraktować jako prequel do głównego procesu tworzenia gry. Opisuję w nim krótko główne kroki jakie trzeba podjąć by przygotować się do tworzenia gry. Nie jest to w żaden sposób pełny przewodnik po języku i jego funkcjach, a raczej drobny skrót do jego zastosowania w programowaniu. Pomocnicze materiały i dokumentację do języka zawarłem w podsumowaniu postu.

## Co będziemy tworzyć?

Celem jest stworzenie prostej gry Pong, w której gracz steruje paletką i odbija piłkę w oknie terminala. Każde udane odbicie to punkty dla gracza, natomiast spadnięcie piłki za mapę oznacza przegraną. By stworzyć tą grę, korzystać będziemy z języka C++ oraz dodatkowej biblioteki o nazwie NCurses.

### Dla kogo jest ten poradnik i w jakim celu będziemy tworzyć tą grę?

Być może jesteś początkującym programistą, który zapoznał się już z główną składnią języka i chciałbyś w prosty sposób przełożyć ją na praktyczne zastosowania. Może jesteś studentem, który w toku studiów musi stworzyć coś przy wykorzystaniu Ncurses. Tak czy inaczej, mam nadzieję, to co napisałem pomoże Ci w dalszym rozwoju i w osiągnięciu swoich celów.

Większość poradników skupia się albo na czystej teorii - np. jak działają funkcje i klasy lub wyłącznie na praktycznej części przygotowania programu.

Wielokrotnie podczas czytania dokumentacji brakowało mi praktycznych przykładów zastosowania określonego rozwiązania i pojawiało się u mnie pytanie - "No dobrze, to jest np. klasa, ale do czego jest mi ona potrzebna? Jak mam ją wykorzystać w prawdziwym życiu (programowaniu)?". Dużo łatwiej zrozumieć określone pojęcie o ile mamy podstawę by zastosować je w praktyce.

Czy powinniśmy więc skupić się tylko na praktyce? Są tego plusy, jednak wtedy może się okazać, że po prostu kopiujemy dokładnie to co robił autor poradnika. W efekcie - po wykonaniu całego projektu, kiedy spróbujemy stworzyć coś swojego znowu mamy pustkę w głowie.

Dlatego też podczas tworzenia tych postów chcę znaleźć złoty środek i połączyć odpowiednią dawkę teorii z praktyką dla początkujących w taki sposób by mogli przenieść zdobytą wiedzę na grunt nowych projektów.

## Co będzie potrzebne by zacząć?

Przed przystąpieniem do lektury wiedz, że nie zakładam żadnej wiedzy programistycznej z Twojej strony. Postaram się poprowadzić Cię przez wszystkie kroki i wytłumaczyć w możliwie najprostszy sposób co będziemy robić.

Jedynym wymaganiem jest posiadanie działającego systemu Linux - co może odstraszyć początkujących - jednak nie jest to nic strasznego. O zaletach tego systemu operacyjnego można przeczytać wiele w internecie np. [tu](https://teamquest.pl/blog/843_ubuntu-linux-dla-dewelopera). Ale jeśli będzie to Twój pierwszy kontakt z tym systemem to moim zdaniem najwygodniejszym sposobem będzie stworzenie maszyny wirtualnej z systemem Ubuntu.

Co to jest maszyna wirtualna? W uproszczeniu - to tak jak gdyby nasz system operacyjny, emulował działanie nowego komputera, o parametrach które wybierzemy i dopiero na tym wirtualnym komputerze zainstalujemy nasz system. Nie zniechęcaj się - uruchomienie takiego systemu zajmie Ci kilka minut i sprowadza się w zasadzie do trzech kroków - pobrania Virtualboxa i zainstalowania go, następnie pobrania obrazu ISO (obrazu płyty z systemem) i finalnie zainstalowanie go na naszej maszynie wirtualnej. Dzięki temu możemy bezpiecznie odkrywać co oferuje system Linux, a jednocześnie nie musimy się martwić, że coś zepsujemy. Szczegółowy sposób instalacji opisano tu [Jak zainstalować Linuxa na virtualbox](https://www.download.net.pl/jak-zainstalowac-linuxa-na-virtualbox-dowolna-dystrybucja/n/15416/). Całość nie powinna zająć więcej niż kilka minut, w zależności od szybkości Twojego łączą i możliwości sprzętowych.

## Ok, zainstalowałem Ubuntu, co dalej?

By pisać programy w zasadzie wystarczy nam dowolny edytor tekstu. Takie rozwiązanie jednak będzie krótko mówiąc mało optymalne. By lepiej wykorzystać nasz czas warto skorzystać z pomocy Zintegrowanego Środowiska Programistycznego (ang. IDE - Integrated Development Environment) - czyli programu, który pozwala na szybsze i wydajniejsze pisanie programów. Osobiście korzystam na codzień i polecam Visual Studio Code - jest to lekki i prosty w obsłudze program, który zyskał powszechne uznanie wśród programistów na całym świecie.

Instrukcję [Jak pobrać i zainstalować Visual Studio Code dla Linuxa znajdziesz tu](https://newsblog.pl/jak-zainstalowac-program-microsoft-visual-studio-code-w-systemie-linux/#:~:text=Krok%201%3A%20Zainstaluj%20pakiety%20Base,Git%20na%20swoim%20komputerze%20Arch.&text=Krok%202%3A%20Sklonuj%20pakiet%20Visual%20Studio%20Code%20AUR%20za%20pomoc%C4%85%20Git.&text=Krok%203%3A%20CD%20do%20folderu%20kodu.&text=Krok%204%3A%20Skompiluj%20pakiet%20i%20zainstaluj%20go%20na%20komputerze%20Arch%20Linux.)

Terminal możesz uruchomić zazwyczaj poprzez użycie skrótu ctrl + alt + T. Ewentualnie możesz znaleźć go w głównym menu programów. Jeśli masz problem z powyższymi instrukcjami, a Twoja dystrybucja obsługuje pakiety Snap (Ubuntu je obsługuje), możesz zainstalować Visual Studio Code za pomocą polecenia

```Bash
sudo snap install code --classic
```

## Zainstalowałem Ubuntu i VSCode, czy wreszcie mogę pisać programy?

W teorii tak, jednak w praktyce potrzebujemy kilku rzeczy. Przede wszystkim kompilatora, który będzie potrzebny do kompilowania naszych programów. W naszym przypadku będzie to GCC (GNU Compiler Collection).

A co to jest kompilator i do czego jest potrzebny? Najprościej rzecz ujmując - kompilator to program, który tłumaczy to co napisaliśmy w jednym języku programowania na kod w innym języku - tu na kod maszynowy, który może być zrozumiany i wykorzystany przez komputer. Więc nasz proces pracy będzie wyglądał następująco:

1. Napiszemy program w języku C++
2. Kompilujemy napisany przez nasz program, czyli tłumaczymy go za pomocą kompilatora na język maszynowy
3. Uruchamiamy program i cieszymy się z efektów

### A co to za polecenia, które mam wpisywać w terminal?

Dobre pytanie - sam na początku mojej przygody z Linuxem zastanawiałem się co to wszystko znaczy.

```Bash
sudo
```

To skrót od SuperUser DO - czyli zrób coś jako administrator systemu. W systemie Windows podczas instalacji programów wyskakuje nam okienko, które prosi o potwierdzenie, że chcemy zainstalować program jako administrator. W Linuxie nie ma takiego okienka, a robimy to poprzez polecenie sudo.

```Bash
apt-get install gcc
```

To polecenie, które pozwala na zainstalowanie pakietów. Pakiety to paczki, które zawierają różne przydatne programy, które możemy używać w naszym systemie. APT (Advanced Packaging Tool) to menadżer pakietów systemu Ubuntu, który odpowiada za instalowanie, aktualizowanie i usuwanie pakietów. We wspomnianym wyżej poleceniu przekazujemy do terminala komendę, by przy pomocy APT'a zainstalował pakiet o określonej nazwie - tu GCC czyli paczkę, która zawiera program kompilatora.

### A jak ja mam zapamiętać te wszystkie polecenia?

Nie musisz ich zapamiętywać. W przyszłości zakładam dwie wersje wydarzeń:

- Będziesz używał takich lub podobnych poleceń na tyle często, że po prostu je zapamiętasz.
- Jeśli nie zapamiętasz poleceń, to w łatwy sposób możesz je znaleźć poprzez skuteczne wyszukiwanie w Google. Może warto napisać o tym odrębny post, ale wiedząc co chcesz zrobić, a nie znajać polecenia wystarczy wpisać szukaną frazę w Google i po chwili znajdziesz informację, post lub dokumentację, która przedstawia co musisz zrobić. Wystarczy poszukać frazy "Jak instalować pakiety Ubuntu" a zaraz wyskoczy kilkanaście stron, które krok po kroku pokazują co musisz zrobić.

### Instalujemy kompilator GCC

Pierwsze co musimy zrobić to uruchomić terminal (ctrl + alt + T) i wpisać polecenie:

```Bash
sudo apt-get install gcc
```

Potrzebne są jeszcze narzędzia do kompilowania naszych programów i debugowania.

Tym poleceniem instalujemy wymagane pakiety:

```Bash
sudo apt-get install build-essential gdb
```

Na koniec instalujemy biliotekę Ncurses

```Bash
sudo apt-get install libncurses5-dev libncursesw5-dev
```

Gratuluję, udało Ci się przejść wszystkie niezbędne kroki by skonfigurować swoje środowisko do pracy z C++ i Ncurses. W następnej części przejdziemy do pisania programów i tworzenia naszej gry od podstaw.

Jeśli na szybko potrzebujesz zainstalować wszystkie pakiety, które są niezbędne do kompilowania i działania programu skorzystaj z następującego polecenia w terminalu, który możesz otworzyć za pomocą skrótu Ctrl + Alt + T:

```Bash
sudo apt-get install gcc build-essential gdb libncurses5-dev libncursesw5-dev
```

### Stwórzmy plik z kodem

Jeśli jeszcze nie zdążyłeś zamknąć terminala to możesz za jego pomocą stworzyć folder na projekty i nowy plik o nazwie `main.cpp` w następujący sposób:

```Bash
mkdir ~/projects/CppNcurses
cd ~/projects/CppNcurses
touch main.cpp
```

Następnie wpisz następującą komendę by otworzyć w nim VSCode:

```Bash
code main.cpp
```

Ewentualnie możesz też otworzyć VSCode za pomocą polecenia `code` lub znajdując go w głównym menu 'start'.
Po otwarciu programu pojawi się ekran powitalny, który powinien przypominać coś w tym rodzaju:

![Ekran powitalny VSCode](/images/posts/CppNcurses1/2.webp#postMiniImage)

Z tego ekranu wybieramy otwórz folder

![Tworzymy nowy folder](/images/posts/CppNcurses1/3.webp#postMiniImage)

Następnie warto założyć folder na projekty, a w nim kolejny folder o nazwie naszego projektu

![Tworzymy nowy folder2](/images/posts/CppNcurses1/4.webp#postMiniImage)

Zakładam więc, że stworzyłeś folder projects a w nim folder CppNcurses, który następnie musisz wybrać i otworzyć.

Po tym jak stworzysz folder i spróbujesz go otworzyć, może wyświetlić się ekran z zapytaniem czy ufasz autorom plików w tym folderze. Przyjmuję milczące założenie, że ufasz sam sobie, dlatego też kliknij na OK.

![Ostrzeżenie od VSCode](/images/posts/CppNcurses1/5.webp#postMiniImage)

Teraz tworzymy już nasz plik na którym będziemy pracować

![Tworzenie nowego pliku](/images/posts/CppNcurses1/6.webp#postMiniImage)

Po stworzeniu nowego pliku musimy stworzyć główną funkcję, która obsługuje nasz program.
Stwórzmy tą funkcję - w nowym oknie wpisz:

```Cpp
int main()
{
return 0;
}
```

Brzmi dość enigmatycznie - ale to co widzisz wyżej jest właśnie główną funkcją programu. Każdy program gdzieś musi się rozpoczynać i kończyć, a za to odpowiedzialna jest główna funkcja. Wyobraź sobie, że funkcja to po prostu kawałek kodu, który możemy wykonać w określonym momencie.

Rozbijmy to co napisaliśmy na czynniki pierwsze. To co napisałem wyżej, można przedstawić symbolicznie w taki sposób - w nawiasach kwadratowych wpisuję co jest czym:

```Cpp
[Typ zwracanej wartości przez funkcję][Nazwa funkcji]([Lista argumentów])
{
[Kod funkcji]
[Zwracana wartość];
}
```

- **`Typ zwracanej wartości przez funkcję`** - u nas `int` - każda funkcja przed jej nazwą musi określić jaki typ danych będzie zwracać. Dzięki temu kompilator wie, czego się spodziewać po zakończeniu funkcji. Twórcy języka uznali, że główna funkcja musi zwracać wartość liczby całkowitej, więc wpisaliśmy int.
- **`Nazwa funkcji`** - u nas `main` - główna funkcja zawsze musi się nazywać main, inne funkcje możemy nazywać w sposób (prawie)dowolny, istnieje kilka reguł, których musimy przestrzegać, ale o tym przy okazji tworzenia innych funkcji.
- **`Lista argumentów`** - która musi znajdować się w nawiasach okrągłych - Na chwilę obecną nic nie musimy przekazywać jako argument.
- **`{}`** - nawiasy klamrowe, wewnątrz których musi się znajdować kod funkcji.
- **`Zwracana wartość`** - musi wystąpić słowo kluczowe `return` oraz jaka wartość jest zwracana - u nas 0, co oznacza nic innego jak to, że funkcja główna wykonała się prawidłowo. `return` w języku angielskim oznacza nic innego jak po prostu zwróć coś.
- **;** - Bardzo istotnym fragmentem każdego programu są średniki, które wskazują na kończenie danego fragmentu kodu. Bez nich program nie będzie działał, a kompilator wyświetli nam błąd.
  Jeśli to co przeczytałeś wyżej wydaje Ci się skomplikowane, to pamiętaj, że zawsze możesz wrócić do tego posta później, albo wpisać w wyszukiwarkę frazę np. "Funkcja główna C++", a wtedy znajdziesz wiele materiałów, dzięki którym odświeżysz sobie składnię.

Zapamiętaj, że w programowaniu nie chodzi o to by uczyć się na pamięć składni języka. Prędzej czy później i tak zapamiętasz ją samoistnie. Dużo ważniejsze jest to żebyś zapamiętał określone koncepcje, takie jak w tym przypadku - główna funkcja - a później w razie potrzebny potrafił je samemu wyszukać. Jeśli zapomnisz jak tworzy się główną funkcję w C++ to po prostu wpisz taką frazę w Google. Analogicznie z wszystkimi innymi częściami języka.

Po wpisaniu powyższego kodu, zapisz plik.

## Kompilowanie i uruchamianie

Żeby skompilować napisany przez nas program, musimy wpisać w terminalu polecenie:

```Bash
g++ main.cpp -o main.out
```

Rozbijmy to na czynniki pierwsze by wiedzieć z czym mamy do czynienia:

```Bash
[Nazwa polecenia][Nazwa pliku, który chcemy skompilować][Flagi][Nazwa pliku wyjściowego]
```

- **`Nazwa polecenia`** - u nas `g++` - polecenie, które uruchamia kompilator g++
- **`Nazwa pliku, który chcemy skompilować`** - u nas `main.cpp` - lub inna nazwa pliku, który zawiera kod naszego programu
- **`Flagi`** - u nas `-o` - w ten sposób w większości poleceń możemy przekazywać argumenty z jakimi ma być wywołany dany program. Normalnie, jeśli uruchomisz g++ i podasz nazwę pliku wejściowego (np. `main.cpp`) to kompilator plik wyjściowy nazwie `a.out`, dzięki fladze `-o` możemy zmienić nazwę pliku wyjściowego.
- **`Nazwa pliku wyjściowego`** - u nas `main.out` - ale możesz ten plik nazwać dowolnie. Linux w przeciwieństwie do Windowsa nie dba o to jakie rozszerzenie ma plik wyjściowy.

W Visual Studio Code za pomocą skrótu klawiszowego Ctrl + ` (znaczek zazwyczaj po lewej stronie 1 i pod klawiszem ESC) możemy otworzyć terminal w oknie głównym.

![Otwieranie terminala w VSCode](/images/posts/CppNcurses1/7.webp#postMiniImage)

Po skompilowaniu programu możemy go uruchomić następującym poleceniem:

```Bash
./main.out
```

- **`./`** - to jest skrót, który oznacza, że uruchamiamy program z katalogu w którym obecnie się znajdujemy.
- **`main.out`** - to nazwa pliku wyjściowego, który został skompilowany.

![Uruchamianie pierwszego programu](/images/posts/CppNcurses1/8.webp#postMiniImage)

Może tego nie widać, ale właśnie skompilowaliśmy i uruchomiliśmy nasz pierwszy program. Nic w nim nie ma, więc konsola wygląda na pustą. Pora to zmienić - klasycznym sposobem.

## Klasyczny Hello World

W świecie programistów przyjęło się, że naukę programowania zaczyna się od napisania programu Hello World. Zróbmy to i tym razem - musimy dokonać następujących zmian w naszym programie:

```Cpp
#include <iostream>

int main() {
std::cout << "Hello World!" << std::endl;
return 0;
}
```

Skompilujemy teraz i uruchomimy program tak jak poprzednio, a za chwilę wytłumaczę co się zmieniło:

```Bash
g++ main.cpp -o main.out && ./main.out
```

Tu połączyłem dwa poprzednie polecenia podwójnym znakiem Ampersand. Powłoka Linuxowa odczytuje ten znak jako logiczny AND - nie wnikając w szczegóły - łącząc tym sposobem dwa polecenia, drugie z nich uruchomi się tylko wtedy, gdy pierwsze zostanie wykonane prawidłowo.

I oto wynik naszego programu:

![Otwieranie terminala w VSCode](/images/posts/CppNcurses1/9.webp#postMiniImage)

### Co się zmieniło?

W kodzie programu pojawiły się następujące zmiany

- **`#include <iostream>`** - Ta linia dodaje bibliotekę `<iostream>` do naszego programu. Jest to skrót od Input-Output Stream - strumień wejścia wyjścia. Biblioteka to zbiór funkcji, klas i innych przydatnych narzędzi, które napisał ktoś inny, a który możemy użyć w naszym programie by zrealizować określone czynności. Dzięki temu nie musimy od nowa pisać wszystkich funkcjonalności, a możemy wykorzystać te, które zostały stworzone i przetestowane wcześniej przez innych. Zamiast pisać swoją funkcję, która będziee wypisywać tekst, możemy użyć funkcji z biblioteki np. `std::cout`.

- **`std::cout << "Hello World!" << std::endl;`** - Ta linia wypisuje tekst `Hello World!` na ekran. Pojawia się tu sporo nowych rzeczy - `std::` to połączenie dwóch rzeczy - tak zwany rodzaj przestrzeni nazw w tym wypadku `std` i operator zakresu `::`. Wyobraź sobie, że w swoim programie stworzyłeś np. funkcję licz() i chcesz skorzystać z innej biblioteki, gdzie jej autor też nazwał swoją funkcję licz(). Co teraz? Która funkcja będzie wywołana? Aby uniknąc takich problemów korzystamy z przestrzeni nazw, czyli czegoś w rodzaju zbiorczej nazwy - a raczej przedrostka - dla nazwy wszystkich funkcji. By skorzystać z funkcji z biblioteki standardowej takich jak np. cout musimy więc na początku dodać operator zakresu `std::`, co finalnie daje nam `std::cout`. Dalej do `std::cout` przy pomocy operatora `<<` przekazujemy nasz tekst który chcemy wyświetlić czyli `Hello World`, a następnie ponownie przy pomocy operatora `<<` przekazujemy `std::endl` - czyli koniec linii. Gdybyśmy teraz dodali kolejny tekst to wyświetli się on w nowej linii np. tak (zauważ, że średnik `;` przesuwamy też na koniec linii):

```Cpp
#include <iostream>

int main() {
std::cout << "Hello World!" << std::endl << " i jeszcze..." ;
return 0;
}
```

Kompilujemy i uruchamiamy:

```Bash
g++ main.cpp -o main.out && ./main.out
```

I efekt:

![Wynik kompilacji z tekstem w nowej linii](/images/posts/CppNcurses1/10.webp#postMiniImage)

## Podsumowanie

Tak jak napisałem na początku, ten tekst jest tylko minimalnym wprowadzeniem do języka i definitywnie nie wyczerpuje całości zagadnień jakie on oferuje. Niemniej jednak po wykonaniu wszystkich tych kroków powinieneś mieć przygotowane środowisko i elementarną wiedzę by móc wykonać dalsze kroki, które będę opisywał w następnych postach.

Jest to mój pierwszy post, więc możliwe, że znalazły się w nim błędy, dlatego jeśli takie ujawnisz to proszę o kontakt. Być może masz jakieś uwagi, propozycje poprawek lub niektóre sekcje są opisane niejasno lub zbyt ogólnikowo - w takim wypadku również proszę o kontakt, a postaram się poprawić to w najbliższym czasie.

Mam nadzieję, że ten post okaże się pomocny, a jeśli chcesz pogłębić swoją wiedzę na temat rzeczy, które opisywałem to ogrom materiałów i dokumentacji wraz z poradnikami znajdziesz pod następującymi linkami:

- <https://cpp0x.pl/>
- <https://en.cppreference.com/w/>
- <https://www.cplusplus.com/reference/>
