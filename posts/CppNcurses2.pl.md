---
title: 'Jak zacząć przygodę z C++ i Ncurses - Cz. 2 - Okno i sterowanie'
date: '2022-02-02'
excerpt: 'Druga część serii - tym razem przechodzimy do prawdziwego programowania i stworzymy okno z wykorzystaniem biblioteki Ncurses. '
coverImage: '/images/posts/CppNcurses2/1.jpg'
keywords:
  - 'C++'
  - 'Ncurses'
  - Podstawy
---

![Dziewczyna grająca w tenisa](/images/posts/CppNcurses2/1.jpg#postMainImage)

## Spis treści

- [Spis treści](#spis-treści)
- [Co będzie potrzebne by zacząć?](#co-będzie-potrzebne-by-zacząć)

## Co będzie potrzebne by zacząć?

W tym poście skupimy się na tworzeniu głównej pętli i inicjalizacji okna w Ncurses. Jeśli jeszcze tego nie zrobiłeś to warto w tym momencie zapoznać się z pierwszym postem, gdzie tłumaczyłem jak zainstalować system i jakie pakiety będą potrzebne by zacząć programować w C++ z wykorzystaniem Ncurses w systemie Ubuntu.

[Pierwszy post](/pl/posts/CppNcurses1)

Jeśli na szybko potrzebujesz zainstalować wszystkie pakiety, które są niezbędne do kompilowania i działania programu skorzystaj z następującego polecenia w terminalu, który możesz otworzyć za pomoca skrótu Ctrl + Alt + T:

~~~Bash
sudo apt-get install gcc build-essential gdb libncurses5-dev libncursesw5-dev
~~~

### Stwórzmy plik z kodem

Jeśli jeszcze nie zdążyłeś zamknąc terminala to możesz za jego pomocą stworzyć folder na projekty i nowy plik o nazwie `main.cpp` w następujący sposób:

~~~Bash
mkdir ~/projects/CppNcurses
cd ~/projects/CppNcurses
touch main.cpp
~~~

Następnie przejdź do folderu z projektem i wpisz następującą komendę by otworzyć w nim VSCode:

~~~Bash
code main.cpp
~~~

Ewentualnie możesz też otworzyć VSCode za pomoca polecenia `code` lub znajdując go w głównym menu 'start'.
Po otwarciu programu pojawi się ekran powitalny, który powinien przypominać coś w tym rodzaju:

![Ekran powitalny VSCode](/images/posts/CppNcurses2/2.webp#postMiniImage)

Z tego ekranu wybieramy otwórz folder

![Tworzymy nowy folder](/images/posts/CppNcurses2/3.webp#postMiniImage)

Następnie warto założyć folder na projekty, a w nim kolejny folder o nazwie naszego projektu

![Tworzymy nowy folder2](/images/posts/CppNcurses2/4.webp#postMiniImage)

Zakładam więc, że stworzyłeś folder projects a w nim folder CppNcurses, który następnie musisz wybrać i otworzyć.

Po tym jak stworzysz folder i spróbujesz go otworzyć, może wyświetlić się ekran z zapytaniem czy ufasz autorom plików w tym folderze. Przyjmuję milczące założenie, że ufasz sam sobie, dlatego też kliknij na OK.

![Ostrzeżenie od VSCode](/images/posts/CppNcurses2/5.webp#postMiniImage)

Teraz tworzymy już nasz plik na którym będziemy pracować

![Tworzenie nowego pliku](/images/posts/CppNcurses2/6.webp#postMiniImage)

Po stworzeniu nowego pliku musimy stworzyć główną funkcję, która obsługuje nasz program.
Stwórzmy tą funkcję - wpisując w nowym, oknie następujący tekst, a następnie opiszę czym jest i co robi:

~~~Cpp
int main()
{
  return 0;
}
~~~

Brzmi dość enigmatycznie - ale to co widzisz wyżej jest właśnie główną funkcją programu. Każdy program gdzieś musi się rozpoczynać i kończyć, a za to odpowiedzialna jest główna funkcja. Wyobraź sobie, że funkcja to po prostu kawałek kodu, który możemy wykonać w określonym momencie.

Rozbijmy to co napisaliśmy na czynniki pierwsze. To co napisałem wyżej, można przedstawić symbolicznie w taki sposób - w nawiasach kwadratowych wpisuję co jest czym:

~~~Cpp
[Typ zwracanej wartości przez funkcję][Nazwa funkcji]([Lista argumentów])
{
  [Kod funkcji]
  [Zwracana wartość];
}
~~~

- **`Typ zwracanej wartości przez funkcję`** - u nas `int` - każda funkcja przed jej nazwą musi określić jaki typ danych będzie zwracać. Dzięki temu kompilator wie, czego się spodziewać po zakończeniu funkcji. Twórcy języka uznali, że główna funkcja musi zwracać wartość liczby całkowitej, więc wpisaliśmy int.
- **`Nazwa funkcji`** - u nas `main` - główna funkcja zawsze musi się nazywać main, inne funkcje możemy nazywać w sposób (prawie)dowolny, istnieje kilka reguł, których musimy przestrzegać, ale o tym przy okazji tworzenia innych funkcji.
- **`Lista argumentów`** - która musi znajdować się w nawiasach okrągłych - Na chwilę obecną nic nie musimy przekazywać jako argument.
- **`{}`** - nawiasy klamrowe, wewnątrz których musi się znajdować kod funkcji.
- **`Zwracana wartość`** - musi wystąpić słowo kluczowe `return` oraz jaka wartość jest zwracana - u nas 0, co oznacza nic innego jak to, że funkcja główna wykonała się prawidłowo. `return` w języku angielskim oznacza nic innego jak po prostu zwróć coś.
- **;** - Bardzo istotnym fragmentem każdego programu są średniki, które wskazują na kończenie danego fragmentu kodu. Bez nich program nie będzie działał, a kompilator wyświetli nam błąd.
  
Jeśli to co przeczytałeś wyżej wydaje Ci się skomplikowane, to pamiętaj, że zawsze możesz wrócić do tego posta później, albo wpisać w wyszukiwarkę frazę np. "Funkcja główna C++", a wtedy znajdziesz wiele materiałów, dzięki którym odświeżysz sobie składnię.

Zapamiętaj, że w programowaniu nie chodzi o to by uczyć się na pamięc składni języka. Prędzej czy później i tak zapamiętasz ją samoistnie. Dużo ważniejsze jest to żebyś zapamiętał określone koncepcje, takie jak w tym przypadku - główna funkcja - a później w razie potrzebny potrafił je samemu wyszukać. Jeśli zapomnisz jak tworzy się główną funkcję w C++ to po prostu wpisz taką frazę w Google. Analogicznie z wszystkimi innymi częściami języka.

Po wpisaniu powyższego kodu, zapisz plik.

## Kompilowanie i uruchamianie

Żeby skompilować napisany przez nas program, musimy wpisać w terminalu polecenie:

~~~Bash
g++ main.cpp -o main.out
~~~

Rozbijmy to na czynniki pierwsze by wiedzieć z czym mamy do czynienia:

~~~Bash
[Nazwa polecenia][Nazwa pliku, który chcemy skompilować][Flagi][Nazwa pliku wyjściowego]
~~~

- **`Nazwa polecenia`** - u nas `g++` - polecenie, które uruchamia kompilator g++
- **`Nazwa pliku, który chcemy skompilować`** - u nas `main.cpp` - lub inna nazwa pliku, który zawiera kod naszego programu
- **`Flagi`** - u nas `-o` - w ten sposób w większości poleceń możemy przekazywać argumenty z jakimi ma być wywołany dany program. Normalnie, jeśli uruchomisz g++ i podasz nazwę pliku wejściowego (np. `main.cpp`) to kompilator plik wyjściowy nazwie `a.out`, dzięki fladze `-o` możemy zmienić nazwę pliku wyjściowego.
- **`Nazwa pliku wyjściowego`** - u nas `main.out` - ale możesz ten plik nazwać dowolnie. Linux w przeciwieństwie do Windowsa nie dba o to jakie rozszerzenie ma plik wyjściowy.

W Visual Studio Code za pomocą skrótu klawiszowego Ctrl + ` możemy otworzyć terminal w oknie głównym.

![Otwieranie terminala w VSCode](/images/posts/CppNcurses2/7.webp#postMiniImage)

Po skompilowaniu programu możemy go uruchomić następującym poleceniem:

~~~Bash
./main.out
~~~

- **`./`** - to jest skrót, który oznacza, że uruchamiamy program z katalogu w którym obecnie się znajdujemy.
- **`main.out`** - to nazwa pliku wyjściowego, który został skompilowany.

![Uruchamianie pierwszego programu](/images/posts/CppNcurses2/8.webp#postMiniImage)

Może tego nie widać, ale właśnie skompilowaliśmy i uruchomiliśmy nasz pierwszy program. Nic w nim nie ma, więc konsola wygląda na pustą. Pora to zmienić, klasycznym sposobem.

## Klasyczny Hello World

W świecie programistów przyjęło się, że naukę programowania zaczyna się od napisania programu Hello World. Zróbmy to i tym razem - musimy dokonać następujących zmian w naszym programie:

~~~Cpp
#include <iostream>

int main() {
    std::cout << "Hello World!" << std::endl;
    return 0;
}
~~~

Skompilujemy teraz i uruchomimy program tak jak poprzednio, a za chwilę wytłumaczę co się zmieniło:

~~~Bash
g++ main.cpp -o main.out && ./main.out
~~~

Tu połączyłem dwa poprzednie polecenia podwójnym znakiem Ampersand. Powłoka linuxowa odczytuje ten znak jako logiczny AND - nie wnikając w szczegóły - łącząc tym sposobem dwa polecenia, drugie z nich uruchomi się tylko wtedy, gdy pierwsze zostanie wykonane prawidłowo.

I oto wynik naszego programu:

![Otwieranie terminala w VSCode](/images/posts/CppNcurses2/9.webp#postMiniImage)

### Co się zmieniło?

W kodzie programu pojawiły się następujące zmiany

- **`#include <iostream>`** - Ta linia dodaje bibliotekę `<iostream>` do naszego programu. Jest to skrót od Input-Output Stream - strumień wejścia wyjścia. Biblioteka to zbiór funkcji, klas i innych przydatnych narzędzi, które napisał ktoś inny, a który możemy użyć w naszym programie by zrealizować określone czynności. Dzięki temu nie musimy od nowa pisać wszystkich funkcjonalności, a możemy wykykorzystać te, które zostały stworzone i przetestowane wcześniej przez innych. Zamiast pisać swoją funkcję, która będize wypisywać tekst, możemy użyć funkcji z biblioteki `std::cout`.
  - **`std::cout << "Hello World!" << std::endl;`** - Ta linia wypisuje tekst `Hello World!` na ekran. Pojawia się tu sporo nowych rzeczy - std:: to tak zwany rodzaj przestrzeni nazw `std` i operator zakresu `::`. Wyobraź sobie, że w swoim programie stworzyłeś funkcję licz() i chcesz skorzystać z innej biblioteki, gdzie jej autor też nazwał swoją funkcję licz(). Co teraz? Która funkcja będzie wywołana? Aby uniknąc takich problemów korzystamy z przestrzeni nazw, czyli czegoś w rodzaju zbiorczej nazwy - a raczej przedrostka - dla nazwy wszystkich funkcji. By skorzystać z funkcji z biblioteki standardowej takich jak np. cout musimy więc na początku dodać operator zakresu `std::`, co finalnie daje nam `std::cout`. Dalej do `std::cout` przy pomocy operatora `<<` przekazujemy nasz tekst który chcemy wyświetlić czyli `Hello World`, a następnie ponownie przy pomocy operatora `<<` przekazujemy `std::endl` - czyli koniec linii. Gdybyśmy teraz dodali kolejny tekst to wyświetli się on w nowej linii np. tak (zauważ, że średnik `;` przesuwamy też na koniec linii):

~~~Cpp
#include <iostream>

int main() {
    std::cout << "Hello World!" << std::endl << " i jeszcze..." ;
    return 0;
}
~~~

Kompilujemy i uruchamiamy:

~~~Bash
g++ main.cpp -o main.out && ./main.out
~~~

I efekt:

![Wynik kompilacji z tekstem w nowej linii](/images/posts/CppNcurses2/9.webp#postMiniImage)

## Podsumowanie

Tak jak napisałem na początku, ten tekst jest tylko minimalnym wprowadzeniem do języka i definitywnie nie wyczerpuje całości zagadnień jakie on oferuje. Niemniej jednak po wykonaniu wszystkich tych kroków powinieneś mieć przygotowane środowisko i elementarną wiedzę by móc wykonać dalsze kroki, które będę opisywał w następnych postach.

Jest to mój pierwszy post, więc możliwe, że znalazły się w nim błędy, dlatego jeśli takie ujawnisz to proszę o kontakt. Być może masz jakies uwagi, propozycje poprawek lub niektóre sekcje są opisane niejasno lub zbyt ogólnikowo - w takim wypadku również proszę o kontakt, a postaram się poprawić to w najbliższym czasie.

Mam nadzieję, że ten post okaże się pomocny, a jeśli chcesz pogłębić swoją wiedzę na temat rzeczy, które opisywałem to ogrom materiałów i dokumentacji wraz z poradnikami znajdziesz pod następującymi linkami:

<https://cpp0x.pl/>
https://en.cppreference.com/w/
https://www.cplusplus.com/reference/