---
title: 'Jak zacząć przygodę z C++ i Ncurses - Cz. 3 - Paletka i sterowanie'
date: '2022-02-17'
excerpt: 'Trzecia część poradnika, w której porządkujemy nasz program, tworzymy paletkę oraz funkcje umożliwiające sterowanie'
coverImage: '/images/posts/CppNcurses3/main.svg'
keywords:
- C++
- Ncurses
- Podstawy
---

![Post hero image](/images/posts/CppNcurses3/main.svg#postMiniImage)

## Spis treści

## Wstęp

W trzeciej części poradnika rozwijamy nasz program - tym razem dodamy do niego paletkę, która będzie odbijać piłkę. Jeśli jakimś trafem udało Ci się ominąć dwie poprzednie części poradnika to nasz dotychczasowy program wyglądał tak (z pominięciem dodanych piłek):

[Program z części 2](https://raw.githubusercontent.com/Kielx/ncurses-pong/12d6f257754e6083f920129bb11f6a362955995c/main.cpp?token=GHSAT0AAAAAABOVH5I5XZIJZ5LQ36FHTNC6YQ2AS3Q)

## Porządkujemy program

Nasz program działa, jednak powoli zaczyna się wkradać do niego nieporządek. Cała logika programu zawarta jest w funkcji głównej i przez to przestaje on być czytelny i z biegiem czasu coraz ciężej będzie nam na nim operować. Aby ułatwić dalszy rozwój podzielimy nasz program na osobne funkcje - jedna z nich będzie odpowiedzialna za inicjalizację ekranu, a druga za grę. Stwórzmy przed funkcją main nową funkcję o nazwie `init_screen()` od initialize screen (inicjalizacja ekranu):

```cpp
WINDOW *init_screen()
{
  WINDOW *win;
  initscr();
  win = newwin(30, 80, 1, 1);
  refresh();
  box(win, 0, 0);
  return win;
}
```

Pamiętaj, że funkcja to nic innego jak fragment kodu, który możemy używać w dowolnym miejscu zamiast kopiować wszystkie linijki. W tym przypadku funkcja jest typu wskaźnikowego i zwraca wskaźnik do okna. Stąd operator `*`.

Jeśli wskaźniki są dla Ciebie czyś nowym lub masz problemy ze zrozumieniem czym są to najprościej rzecz ujmując można powiedzieć, że wskaźniki to nic innego jak adres w pamięci. Jeszcze prościej - czasami w programie chcemy użyć tych samych danych. Zamiast wysyłać całość danych, albo kopiować całe dane, wygodniej jest po prostu przesłać **wskaźnik** czyli adres do tych danych. Ten adres to nic innego jak nasz wskaźnik. Dzięki temu jesli jedna część programu zmieni określone dane, to zmieni się on w pozostałych częściach programu. Gdybyśmy zainicjalizowali to okno w funkcji i nie skorzystali ze wskaźnika, to nasz obiekt okna istniał by tylko w tej funkcji, natomiast pozostąła część programu by nie mogła się do niego dostać. Dzięki temu, że zwracamy wskaźnik do tego okna, nasza główna funkcja i funkcja gry może korzystać z tego okna i odpowiednio go modyfikować w razie konieczności.

Jeśli chcesz poczytać więcej na temat wskaźników w języku C++ możesz to zrobić np. tu:

[Wskaźniki w C++](https://cpp0x.pl/kursy/Kurs-C++/Dodatkowe-materialy/Wskazniki/304)

Teraz stworzymy funkcję odpowiedzialną za grę:

```cpp
void single_player(WINDOW *win)
{
  Ball ball1;
  ball1.x = 10;
  ball1.y = 10;
  mvwprintw(win, ball1.x, ball1.y, "o");
  wrefresh(win);
  getch();
}
```

A w funkcji main zainicjalizujemy okno przy pomocy naszej nowej funkcji `init_screen()` i wywołamy naszą funkcję `single_player()` przekazując do niej wskaźnik do okna w taki sposób:

```cpp
int main()
{
  WINDOW *win = init_screen();
  single_player(win);
  return 0;
}
```

Łącząc te trzy kawałki kodu, nasz program będzie wyglądał tak:

```cpp
#include <ncurses.h>
#include <unistd.h>


class Ball
{
public:
  int x;
  int y;
};

/**
  @brief Inicjalizacja okna gry
  @return Wskaźnik do okna gry
*/
WINDOW *init_screen()
{
  WINDOW *win;
  initscr();
  win = newwin(30, 80, 1, 1);
  refresh();
  box(win, 0, 0);
  return win;
}

void single_player(WINDOW *win)
{
  Ball ball1;
  ball1.x = 10;
  ball1.y = 10;
  mvwprintw(win, ball1.x, ball1.y, "o");
  wrefresh(win);
  getch();
}

int main()
{
  WINDOW *win = init_screen();
  single_player(win);
  return 0;
}
```

Skompilowany i uruchomiony poleceniem

```bash
g++ main.cpp -o main.out -lncurses && ./main.out
```

Będzie wyglądał tak:

![Podstawowy program do 3 etapu](/images/posts/CppNcurses3/1.webp#postMiniImage)

## Porządki cz.2

Pozostało nam jeszcze kilka szczegółów, które pominęliśmy w poprzednich etapach.

Jako czujny obserwator zapewne zauważyłeś, że przy naszych piłkach symbolizowanych przez literę `o` pojawia się migający kursor. Jako, że nie będziemy nic tam wpisywać, to nie będzie nam potrzebny.
By wyłączyć kursor musimy skorzystać z instrukcji `curs_set(0)`.

Dodatkowo za każdym razem gdy naciskaliśmy jakiś klawisz na klawiaturze, to automatycznie był on wypisywany w oknie terminala. Nasza gra również nie potrzebuje tego, więc wyłączymy tą funkcję za pomocą instrukcji `noecho()`.

Na pewno przyda nam się obsługa klawiszy strzałek do kontrolowania naszej paletki, więc włączymy tą funkcję za pomocą funkcji `keypad(win, TRUE)`.

Dodatkowo warto dodać funkcję `nodelay(stdscr, TRUE)`, która pozwoli nam na nieblokujące wprowadzanie klawiszy. Bez tego wywołania nasz program będzie czekał za każdym razem aż wciśniemy jakiś klawisz. Gra powinna chodzić automatycznie, a nie czekać na naciśnięcie klawisza.

Na koniec funkcji głównej dodajemy też wywołanie funkcji `endwin()`, aby zakończyć działanie ncurses.

Nasza funkcja inicjalizująca okno będzie teraz wyglądać tak:

```cpp
WINDOW *init_screen()
{
  WINDOW *win;                /* Okno gry */
  initscr();                  /* Włączamy tryb curses */
  win = newwin(30, 80, 1, 1); /* Tworzymy okno gry */
  refresh();                  /* Odświeżamy ekran */
  box(win, 0, 0);             /* Rysujemy ramkę */
  keypad(stdscr, TRUE);       /* Włączamy klawisze strzałek*/
  noecho();                   /* Nie wyświetlaj klawisza na ekran */
  curs_set(0);                /* Ukryj kursor */
  nodelay(stdscr, TRUE);      /* Nie czekaj na wprowadzenie znaku */
  return win;                 /* Zwracamy okno gry */
}
```

Dodałem do niej komentarze by wyjaśnić, co dzieje się w danym miejscu. Warto zostawiać komentarze dla innych osób lub nas samych. Jeśli zdarzy nam się wrócić do określonego kodu za dłuższy czas to możliwe, że zapomnimy o tym, co robi określona funkcja. Dzięki komentarzom będziemy pamiętać za co odpowiada dany fragment kodu. Oczywiście, to co zrobiłem wyżej jest dość ekstremalną wersją komentowania, gdyż opisywanie każdej linijki kodu jest żmudne, czasochłonne i wielokrotnie niepotrzebne. Nie warto opisywać rzeczy, które są oczywiste. Jak ze wszystkim w życiu - musimy starać się znaleźć złoty środek, niemniej jednak jeśli masz wątpliwości czy opisać dany fragment kodu - to warto to zrobić - nic na tym raczej nie stracisz, a być może w przyszłości Tobie lub innej osobie się to przyda.

Jeśli chodzi o fragmenty kodu, których nie warto opisywać to np.

```cpp
// Deklaracja zmiennej typu int o nazwie x i przypisanie jej wartości 10
int x = 10;
//Wypisanie na ekran tekstu "to jest x" i przejscie do nowej linii
cout << "to jest x" << endl;
```

W tym wypadku dla każdego programisty jest oczywiste, że ten kod będzie wykonywał określone czynności. Nie ma najmniejszego sensu opisywanie tego w komentarzu. Być może w trakcie nauki w szkole lub na studiach spotkałeś się (albo spotkasz) z nauczycielami/wykładowcami, którzy będą twierdzić, iż trzeba opisywać KAŻDY fragment kodu ("Bo może Twoja babcia będzie czytać ten kod i nie będzie wiedziała, że to jest przypisanie zmiennej?"). Tu trzeba jednak odróźnić programistę od użytkownika programu. Bo babcia raczej nie będzie zajmować się kodem, a korzystać z programu - a wtedy istotne będzie to w jaki sposób przedstawisz program i instrukcje na ekranie a nie komentarze do których tak czy owak nie będzie miała dostępu. Użytkownika nie interesuje kod, a to czy nasz program jest użyteczny i łatwy w obsłudze. Natomiast programista, który będzie czytał kod raczej zna podstawową składnię i będzie wiedział, że jest deklaracja zmiennej. Tu kolejny raz warto zadbać o zdrowy rozsądek, niemniej jednak pragmatyka wskazuje na to, że nie warto przekonywać wykładowców/nauczycieli do swojego punktu widzenia. Z własnego doświadczenia wiem, że skutek będzie raczej marny, a zysk dla Ciebie żaden. Żyjemy w wolnym kraju i każdy ma prawo być w tak dużym błędzie jak tylko chce. A naszą rolą nie jest wyprowadzanie innych z błędu, lecz pisanie dobrego kodu.

 Dlatego jeśli piszesz programy w szkole lub studiach to rób to w taki sposób jak wymagają, a przy tworzeniu własnych projektów staraj się zachować zdrowy rozsądek jesli chodzi o komentarze. Są one środkiem do osiągnięcia celu, a nie celem samym w sobie.

## Paletka

 Porządki zrobione. Teraz czas by stworzyć klasę paletki:

```cpp
class Paddle
{
public:
  int x, y, width;
};
```

Paletka ma trzy pola:

- `x` - pozycja paletki na osi X
- `y` - pozycja paletki na osi Y
- `width` - szerokość paletki - może ona być stała, ale w przyszłości być może będziemy chcieli zmieniać ją w trakcie gry, może być np. mniejsza na trudniejszym poziomie, albo ulegać zmianie pod wpływem zewnętrznych czynników (tą grę możemy przerobić później na np. arkanoid, a tam pod wpływem boostów paletka może rosnąc lub zmniejszać się)

Zmienne możemy deklarować na osobnych liniach, albo tak jak wyżej w jednej linii.

Do naszej funkcji `single_player` zaraz po deklaracji piłki, dodajemy więc deklarację paletki i jej wartości:

```cpp
  Paddle paddle1;
  paddle1.x = getmaxx(win) / 2;
  paddle1.y = getmaxy(win) - 2;
  paddle1.width = 5;
```

Tu analogicznie do tego jak deklarowaliśmy piłkę, deklarujemy naszą paletkę. Różnica jest taka, że do zmiennej x przypisujemy wynik funkcji `getbegx(win) + 1` - a zwraca ona nic innego jak początek osi x okna, które przekazano jako argument. My przekazujemy jako argument nasze wcześniej stworzone okno. Efektem wywołania funkcji będzie poczatek naszego okna, tylko, że na pozycji 0 znajduje się ramka. Dlatego musimy dodać do tego wyniku 1. Wtedy nasza paletka będzie znajdować się na pozycji 1 w tym oknie.
Podobnie postępujemy przy wartości y - chcemy by nasza paletka była przy dolnej krawędzi ekranu więc korzystamy z funkcji `getmaxy(win) - 1` - która zwraca wysokość okna. Podobnie jak wcześniej gdybyśmy umieścili paletkę na krawędzi okna, to będzie się ona pokrywać z ramką. Dlatego musimy odjąć od tego wyniku 1.
Na koniec ustawiamy szerokość paletki na 5.

Paletka gotowa. Pora na dodanie sterowania.

## Sterowanie paletka

Kontynuujemy dzielenie programu na funkcje, dlatego zaczniemy od deklaracji funkcji `move_paddle`. Tym razem zamiast opisywać funkcję pod kodem, dodam od razu odpowiedni komentarz w formacie DOXYGEN - opisując w ten sposób wszystkie funkcje możemy w łatwy sposób wygenerować później dokumentację dla całego projektu. O generowaniu dokumentacji postaram się napisać post na koniec poradnika.

```cpp
/**
 * @brief Funkcja odpowiedzialna za sterowanie paletka
 *
 * @param win - okno gry w którym będzie się poruszać paletka
 * @param paddle - paletka, którą sterujemy
 * @return int - zwraca 1 gdy użytkownik chce opuścić grę
 */
int move_paddle(WINDOW *win, Paddle &paddle)
{
  // pętla odpowiedzialna za tworzenie dodatkowych pól w kształcie paletki
  // np. jeśli nasza paletka ma szerokość 5 to musimy stworzyć 5 pól
  for (int i = 0; i < paddle.width; i++)
  {
    mvwprintw(win, paddle.y, paddle.x + i, "-");
  }
  // Pobieramy klawisz sterowania od użytkownika,
  // w przypadku klawisza 'q' opuszczamy grę zwracając 1
  int ch;
  ch = getch();
  switch (ch)
  {
  case 'q':
    return 1;
  // Przesuwamy paletkę o jeden w lewo po naciśnięciu klawisza strzałki w lewo `<-`
  case KEY_LEFT:
    if (paddle.x > getbegx(win))
    {
      paddle.x--;
    // Pętla odpowiedzialna za tworzenie dodatkowych pól w kształcie paletki
    // np. jeśli nasza paletka ma szerokość 5 to musimy stworzyć 5 pól
    // Dodatkowo usuwamy pola paletki z poprzedniego miejsca
      for (int i = 0; i < paddle.width; i++)
      {
        mvwprintw(win, paddle.y, paddle.x + i, "-");
        mvwprintw(win, paddle.y, paddle.x + i + 1, " ");
      }
    }
    break;
  // Przesuwamy paletkę o jeden w prawo po naciśnięciu klawisza strzałki w prawo `->`
  case KEY_RIGHT:
    if (paddle.x < getmaxx(win) - 1 - paddle.width)
    {
      paddle.x += 1;
      // Pętla odpowiedzialna za tworzenie dodatkowych pól w kształcie paletki
      // np. jeśli nasza paletka ma szerokość 5 to musimy stworzyć 5 pól
      // Dodatkowo usuwamy pola paletki z poprzedniego miejsca
      for (int i = 0; i < paddle.width; i++)
      {
        mvwprintw(win, paddle.y, paddle.x + i, "-");
        // W tym warunku sprawdzamy czy nasza paletka nie znajduje się przy krawedzi ekranu
        // Jeśli tak to nie usuwamy znaku sprzed paletki
        // W przeciwnym wypadku zmazywalibyśmy znak krawedzi ekranu
        if (paddle.x - i != getbegx(win) - 1)
          mvwprintw(win, paddle.y, paddle.x - i, " ");
      }
    }

    break;
  }
  return 0;
}
```

To dość długa funkcja i mimo, że są w niej od razu komentarze, to warto prześledzić po kolei co robi:

- W 8 linii definiujemy funkcję `move_paddle`, która przyjmuje dwa argumenty - wskaźnik na okno i referencję do paletki, którą będziemy sterować
- W 12 linii korzystamy z pętli for, by wypisać wszystkie pola paletki symbolizowane znakiem `-`. Musimy skorzystać z pętli, gdyż nasza paletka ma określoną szerokość. Gdyby wynosiłą ona 1, to równie dobrze moglibyśmy skorzystać z jednej instrukcji mvwprintw. W naszym przypadku w zależności od szerokości paletki musimy wypisać określoną liczbę znaków stąd potrzeba tej funkcji.
- Linia 18 i 19 odpowiadają za pobieranie klawisza sterowania od użytkownika.
- W linii 20 za pomocą switcha sprawdzamy jaki klawisz został naciśnięty i wykonujemy odpowiednie działanie:
  - W każdym z wariantów sprawdzamy też czy paletka nie wychodzi za ekran. Jeśli nie to dopiero wtedy wykonujemy daną operację.
- Funkcja zwraca 1 jeśli użytkownik wcisnął klawisz `q`, który odpowiada  za opuszczenie gry. W przeciwnym wypadku zwraca 0, a gra jest kontynuuowana.

By odzwierciedlić zmiany w kodzie musimy też zaktualizować funkcję single player. Zmieniamy kod odpowiedzialny za grę dodająć pętlę while, która wywołuje funkcję `move_paddle` i przypisuje ją do wartości `int quit`. Dzięki temu możemy wyjśc z gry. Dodatkowo odświeżamy ekran co 500 mikrosekund by umożliwić graczowi sterowanie. 

```cpp
void single_player(WINDOW *win)
{
  Ball ball1;
  ball1.x = 10;
  ball1.y = 10;
  mvwprintw(win, ball1.x, ball1.y, "o");
  Paddle paddle1;
  paddle1.x = getmaxx(win) / 2;
  paddle1.y = getmaxy(win) - 2;
  paddle1.width = 5;
  while (true)
  {
    int quit = move_paddle(win, paddle1);
    if (quit == 1)
    {
      break;
    }
    usleep(500);
    wrefresh(win);
  }
}
```

## Podsumowanie

Kod naszego obecnego programu wygląda tak:

[Kod programu po wykonaniu trzeciej czesci poradnika](https://raw.githubusercontent.com/Kielx/ncurses-pong/33b75b6e96af9b7cb3091bd669d2962f9f05879f/main.cpp?token=GHSAT0AAAAAABOVH5I5OME3RSQNX26UE3YSYQ2AWTQ)

A po skompilowaniu i uruchomieniu:

![Efekt po trzeciej części](/images/posts/CppNcurses3/3.webm#postVideo)

## Źródła

Tworząc tego posta korzystałem intensywnie z poniższych źródeł, które warto sprawdzić jeśli chcesz pogłębić swoją wiedzę na temat Ncurses i innych tematów, które poruszałem w tym poście:

[Ncurses Programming HowTo](https://tldp.org/HOWTO/NCURSES-Programming-HOWTO/)
[Ncurses Man Pages](https://invisible-island.net/ncurses/announce.html)
[Ncurses - Linux man page](https://linux.die.net/man/3/ncurses)
