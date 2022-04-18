---
title: 'Jak zacząć przygodę z C++ i Ncurses - Cz. 2 - Ekran i piłka'
date: '2022-02-14'
excerpt: 'Druga część poradnika, w której tworzymy okno i obiekt piłki'
coverImage: '/images/posts/CppNcurses2/main.svg'
keywords:
- C++
- Ncurses
- Podstawy
---

![Header image](/images/posts/CppNcurses2/main.svg#postMainImage)

## Spis treści

- [Wstęp](#wstęp)
- [Główna pętla](#główna-pętla)
- [Tworzymy piłkę do gry](#tworzymy-piłkę-do-gry)
  - [Co to jest klasa i obiekt?](#co-to-jest-klasa-i-obiekt)
- [Coś ekstra - tworzymy więcej piłek](#coś-ekstra---tworzymy-więcej-piłek)
  - [Wprawmy piłki w ruch](#wprawmy-piłki-w-ruch)
- [Podsumowanie](#podsumowanie)
- [Źródła](#źródła)
- [Trzecia część poradnika](#trzecia-część-poradnika)

## Wstęp

W tym poście przechodzimy do prawdziwego działania. Konfigurację zostawiamy za nami, a skupiamy się na tworzeniu gry.
Każda gra potrzebuje okna w którym będzie się rozgrywać, a gra w ponga potrzebuje piłeczki, która będzie się odbijać.
Od tych dwóch rzeczy zaczynamy.

## Główna pętla

W pierwszym poście stworzyliśmy już główną pętlę, która wyświetla nam po skompilowaniu napis `Hello World`.

```cpp
#include <iostream>

int main() {
std::cout << "Hello World!" << std::endl;
return 0;
}
```

Edytujemy plik `main.cpp` i zmieniamy go następująco, by stworzyć bazę pod grę:

```cpp
#include <ncurses.h>

int main()
{
WINDOW *win; 
initscr(); 
win = newwin(30, 80, 1, 1);
refresh();
box(win, 0, 0);
mvwprintw(win, 1, 1, "Hello World!");
wrefresh(win);
getch();
return 0;
}
```

Zmieniliśmy następujące rzeczy - linia po linii:

- `#include <ncurses.h>` - importujemy bibliotekę Ncurses - dzięki temu nasz program wie, że będziemy wykorzystywać kod napisany wcześniej przez autorów biblioteki - innymi słowy - informujemy NASZ program o tym, że będzie korzystał z kodu napisanego przez autorów biblioteki Ncurses i dajemy mu do niej dostęp.
- `int main()` - Początek naszej głównej pętli
- `Window *win` - Tworzymy zmienną typu `WINDOW`, która będzie przechowywać wskaźnik na okno, w którym będziemy pracować. Nie jest to typowe okno takie jak wyobrażamy sobie w normalnych systemach okienkowych. Bardziej jest to coś w rodzaju płótna, na którym możemy rysować albo wyświetlać to co potrzebujemy.
- `initscr` - Inicjalizujemy ekran i bibliotekę Ncurses. Funkcja ta ustala z jakiego terminala korzystamy oraz inicjalizuje wszystkie struktury danych z jakich będziemy później korzystać.
- `win = newwin(30, 80, 1, 1);` - Tworzymy nowe okno o wymiarach 30x80, w pozycji 1,1. Pierwsze dwa argumenty tej funkcji to wysokość i szerokość okna, a dwa kolejne wskazują na początkowe położenie okna czyli koordynaty x i y, gdzie okno ma się zaczynać.
- **`refresh`** - Jest to bardzo ważna funkcja, która odświeża okno. Jej zadaniem jest wyświetlenie wszystkich zmian, które zostały dokonane w oknie. W Ncurses wszystkie zmiany jakie wprowadzamy, np. wpisując jakiś tekst, są zapisywane w pamięci i nie wyświetlą się na ekranie, dopóki nie odświeżmy okna za pomocą funkcji `refresh`.
- `box(win, 0, 0);` - Tworzymy ramkę wokół okna. Pierwszy argument to wskaźnik na okno, które chcemy zmodyfikować, a następne argumenty to znaki z jakich stworzona będzie ramka. Dla nas wystarczy standardowa, więc podajemy 0,0.
- `mvprintw(win, 1, 1, "Hello World!");` - Wpisujemy tekst do okna. Funkcja ta operuje na oknie podanym jako pierwszy argument, a następnie przenosi kursor (stąd `m` w nazwie od `move`) do pozycji - u nas 1,1. Kolejnym argumentem jest tekst jaki wypisujemy.
- `wrefresh(win);` - Odświeżamy okno, podane jako argument. Konieczne jest to by nasze zmiany zostały wyświetlone na ekranie. Funkcja ta różni się tym od funkcji `refresh`, że odświeża podane okno jako argument, a nie odświeża okna głównego.
- `getch();` - Funkcja ta czeka na naciśnięcie klawisza, dzięki czemu program nie zostanie zakończony bez naciśnięcia klawisza na klawiaturze.

By uruchomić i skompilować program, do musimy dodać dodatkową flagę -lncurses, by dołączyć bibliotekę Ncurses. Robimy to w następujący sposób:

```bash
g++ main.cpp -o main.out -lncurses && ./main.out
```

A efektem jest piękne okno z ramką, a w niej nasz tekst:

![Uruchamianie pierwszego programu w Ncurses](/images/posts/CppNcurses2/2.webp#postMiniImage)

## Tworzymy piłkę do gry

Nie ma gry w ping ponga bez piłki. Co musi mieć piłka? Na poczatątek położenie czyli koordynaty x i y na osi.
Teoretycznie wystarczyły by nam więc dwie zmienne - jedna zmienna `x` i druga zmienna `y`, które by zawierały położenie piłki. Jednak niedługo okaże się, że może będziemy chcieli zmieniać prędkość piłki, albo stworzyć więcej piłek, dlatego zamiast tworzyć zmienne, stwórzmy po prostu klasę piłki i odpowiedni obiekt, który wyświetlimy na ekranie.

### Co to jest klasa i obiekt?

Na własnym przykładzie i przykładach znajomych wiem, że pojęcia te stwarzają wiele problemów i na początku może być niejasne na czym one polegają.

Klasa to nic innego jak wzór, który opisuje jakieś cechy obiektu. Obiekt to jedna instancja klasy. Tak więc nasza klasa będzie opisywać piłkę i to jakie ma cechy, będzie stanowiła wzór dla obiektów. A obiekt będzie czymś w rodzaju fizycznego tworu, który posiada te cechy. Jako inny przykład klasy i obiektów mogę podać np. plan domu i fizyczny dom - budowlę. Plan to klasa - czyli coś co opisuje jak będzie wyglądał dom, może mieć określoną ilość pokoi, określoną ilość okien i drzwi. Natomiast na podstawie tego planu możemy stworzyć jeden lub więcej obiektów - budynków.

Innym ciekawym sposobem w jaki można wytłumaczyć czym jest klasa i obiekt, zaczyna tłumaczenie nie od klasy a od obiektu.
Weźmy tym razem za przykład samochód. Widzisz samochód na ulicy i w jaki sposób stwierdzisz, że to co widzisz to samochód? W jaki sposób wytłumaczysz obcej osobie, że to co widzisz to samochód, a nie na przykład tort? Samochód ma rzeczy, które sprawiają, że samochód to samochód prawda? A jakie to rzeczy? Na przykład koła, światła, kierownicę, siedzenia, szyby, kierunkowskazy itd. To sprawia, że to co widzimy przed sobą jest samochodem. Analogicznie więc KLASA samochód posiada te wszystkie wyżej wymienione cechy, a ponadto może robić to wszystko co robi samochód - może przyspieszać, hamować, skręcać itd. Więc te cechy to będą atrybuty (zmienne) a przyspieszanie, hamowanie, skręcanie to będą metody (funkcje) klasy samochód. Natomiast ten specyficzny samochód, który zobaczyłeś na ulicy jest obiektem (instancją) tej klasy samochód. Więc na podstawie jednej klasy – wzoru samochodu – możemy stworzyć nieograniczoną ilość obiektów tego typu.

Jeden przykład jest wart więcej niż tysiąc słów więc stwórzymy klasę - wzór naszej piłki. Robi się to następująco - po deklaracjach `#include`, a przed główną pętlą `int main` tworzymy klasę:

```cpp
class Ball {
public:
int x;
int y;
}
```

Nie wygląda tak strasznie co? To jest klasa, która ma dwie zmienne - `x` i `y`. Zmienne te są publiczne, czyli możemy je zmieniać z zewnątrz klasy. W przyszłości możemy zastosować zmienne prywatne, ale w tym przypadku nie będziemy ich używać, by uprościć program.

Stwórzmy teraz obiekt piłki, który będziemy mogli wyświetlić na ekranie. Na początku funkcji `int main` dodajemy obiekt:

```cpp
Ball ball1;
ball1.x = 10;
ball1.y = 10;
```

- `Ball` - to nazwa klasy. W cpp musimy najpierw określić jakiego typu jest obiekt, a następnie nadać mu nazwę - u nas będzie to ball1.
- `ball1.x = 10;` - to jest inicjalizacja zmiennej `x` obiektu ball1 i przypisanie mu wartości 10. By dostać się do wartości zmiennej obiektu musimy zastosować operator `.` Kropka po nazwie obiektu znaczy, że chcemy uzyskać dostęp do zmiennej obiektu o nazwie takiej jak po kropce. W tym przypadku chcemy uzyskać dostęp do zmiennej `x` obiektu `ball1`.
- Analogicznie postępujemy z zmienną `y`.

Teraz zamiast wypisywać na ekranie komunikat `Hello World` zmieniamy w następujący sposób funkcję `mvprintw`, która wypisuje na ekranie:

```cpp
mvwprintw(win, ball1.y, ball1.x, "o");
```

Jako pierwszy argument dla funkcji mvprintw dalej podajemy nasze okno o nazwie win, gdyż w nim chcemy wypisać nasz obiekt. Następnie podajemy współrzędne korzystając ponownie ze zmiennych naszego obiektu, do których mamy dostęp za pomocą operatora kropki `.`
Jako ostatni argument podajemy `o` - litera o symbolizuje piłkę.

Nasz program wygląda teraz tak:

```cpp
#include <ncurses.h>
#include <unistd.h>

class Ball
{
public:
int x;
int y;
};

int main()
{
Ball ball1;
ball1.x = 10;
ball1.y = 10;

WINDOW *win; 
initscr(); 
win = newwin(30, 80, 1, 1);
refresh();
box(win, 0, 0);
mvwprintw(win, ball1.y, ball1.x, "o");
wrefresh(win);
getch();
return 0;
}

```

Sprawdzamy czy działa poprawnie - kompilujemy i uruchamiamy:

```bash
g++ main.cpp -o main.out -lncurses && ./main.out
```

I efekt jest taki:

![Piłka na ekranie terminala](/images/posts/CppNcurses2/3.webp#postMiniImage)

Świetnie, nasza piłka pojawiła się na ekranie!
Zapewne zauważyłeś migający kursor obok naszej piłki - spokojnie, zajmiemy się tym za chwilę.
Teraz zróbmy coś ekstra by lepiej uświadomić sobie, dlaczego stworzyliśmy klasę i obiekt piłki.

## Coś ekstra - tworzymy więcej piłek

W ramach treningu obiektowości stwórzmy teraz kilka nowych piłek i wyświetlmy je na ekranie.
W pętli `main` za pierwszą piłką dodajemy trzy następne:

```cpp
Ball ball2;
ball2.x = 12;
ball2.y = 12;

Ball ball3;
ball3.x = 10;
ball3.y = 14;

Ball ball4;
ball4.x = 8;
ball4.y = 12;
```

A za funkcją mvprintw wypisujemy nasze trzy kolejne piłki na ekran:

```cpp
mvwprintw(win, ball2.y, ball2.x, "o");
mvwprintw(win, ball3.y, ball3.x, "o");
mvwprintw(win, ball4.y, ball4.x, "o");
```

Efekt:

![Cztery piłki na ekranie terminala](/images/posts/CppNcurses2/4.webp#postMiniImage)

Wspaniale, mamy cztery piłki.

### Wprawmy piłki w ruch

Co nam po czterech piłkach skoro nie możemy nic z nimi zrobić? Stwórzmy teraz prostą pętlę, która wprawi je w ruch:

Na początku pliku dodajemy:

```cpp
#include <unistd.h>
```

a do funkcji `main` przed funkcją `getch()` dodajemy pętlę:

```cpp
for (int i = 0; i < 70; i++)
{
ball1.y--;
ball2.x++;
ball3.y++;
ball4.x--;
wclear(win);
box(win, 0, 0);
mvwprintw(win, ball1.y, ball1.x,"o");
mvwprintw(win, ball2.y, ball2.x,"o");
mvwprintw(win, ball3.y, ball3.x,"o");
mvwprintw(win, ball4.y, ball4.x,"o");
usleep(50000);
wrefresh(win);
}
```

W pętli tej zmieniamy co iterację współrzędne piłek, następnie czyścimy okno za pomocą `wclear(win)` - bez tego piłki by zostawiały ślad na ekranie. Następnie wyświetlamy krawędzie za pomocą box, a finalnie wypisujemy piłki na ekranie. Na koniec usypiamy program na 50 milisekund, gdyż bez tego piłki za szybko uciekną poza ekran. By efekty były widoczne na ekranie musimy wywołać funkcję `wrefresh(win)`, która wyświetli zawartość wirtualnego okna na ekran.

Nasz plik wygląda teraz tak:

```cpp
#include <ncurses.h>
#include <unistd.h>

class Ball
{
public:
int x;
int y;
};

int main()
{
Ball ball1;
ball1.x = 10;
ball1.y = 10;

Ball ball2;
ball2.x = 12;
ball2.y = 12;

Ball ball3;
ball3.x = 10;
ball3.y = 14;

Ball ball4;
ball4.x = 8;
ball4.y = 12;

WINDOW *win; 
initscr(); 
win = newwin(30, 80, 1, 1);
refresh();
box(win, 0, 0);
mvwprintw(win, ball1.y, ball1.x, "o");
mvwprintw(win, ball2.y, ball2.x, "o");
mvwprintw(win, ball3.y, ball3.x, "o");
mvwprintw(win, ball4.y, ball4.x, "o");
wrefresh(win);
for (int i = 0; i < 70; i++)
{
ball1.y--;
ball2.x++;
ball3.y++;
ball4.x--;
wclear(win);
box(win, 0, 0);
mvwprintw(win, ball1.y, ball1.x, "o");
mvwprintw(win, ball2.y, ball2.x,"o");
mvwprintw(win, ball3.y, ball3.x,"o");
mvwprintw(win, ball4.y, ball4.x,"o");
usleep(50000);
wrefresh(win);
}

getch();
return 0;
}
```

I oto efekt finalny:

![Jak wygląda gra](/images/posts/CppNcurses2/1.webm#postVideo)

## Podsumowanie

W tej części udało nam się stworzyć prosty program, w którym za pomocą biblioteki Ncurses tworzymy ekran a na nim wyświetlamy obiekty symbolizujące piłki. Opanowaliśmy podstawy obiektowości tworząc klasę piłki i cztery obiekty, które następnie wprawiliśmy w ruch. Dzięki tym podstawom jesteśmy na najlepszej drodze do stworzenia w pełni funkcjonalnej gry.

## Źródła

Tworząc tego posta korzystałem intensywnie z poniższych źródeł, które warto sprawdzić jeśli chcesz pogłębić swoją wiedzę na temat Ncurses i innych tematów, które poruszałem w tym poście:

- [Ncurses Programming HowTo](https://tldp.org/HOWTO/NCURSES-Programming-HOWTO/)
- [Ncurses Man Pages](https://invisible-island.net/ncurses/announce.html)
- [Ncurses - Linux man page](https://linux.die.net/man/3/ncurses)
- [Klasy i obiekty dla pięciolatków](https://www.reddit.com/r/explainlikeimfive/comments/65658b/comment/dg8nxqk/?utm_source=share&utm_medium=web2x&context=3)

## Trzecia część poradnika

Trzecią część poradnika możesz znaleźć tutaj: [Jak zacząć przygodę z C++ i Ncurses - Cz. 2 - Ekran i piłka](/pl/posts/CppNcurses3)
