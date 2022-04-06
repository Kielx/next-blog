---
title: 'Jak zacząć przygodę z C++ i Ncurses - Cz. 5 - Doxygen i Makefile'
date: '2022-04-10'
excerpt: 'W tej częsci tworzymy dokumentację do napisanego wcześniej kodu w formacie Doxygen oraz tworzymy plik Makefile, który usprawni proces kompilacji'
coverImage: '/images/posts/CppNcurses5/main.svg'
keywords:
- C++
- Ncurses
- Doxygen
- Makefile
- Podstawy
---

![Obraz główny](/images/posts/CppNcurses5/main.svg#postMiniImage)

## Spis treści

- [Wstęp](#wstęp)
- [Ruch piłki](#ruch-piłki)
- [Odbicie piłki](#odbicie-piłki)
  - [Porządki](#porządki)
- [Punkty i przegrana](#punkty-i-przegrana)
- [Podsumowanie](#podsumowanie)
- [Źródła](#źródła)

## Wstęp

W czwartej części poradnika kończymy tworzyć logikę odpowiedzialną za grę. Musimy wprawić w ruch piłeczkę oraz sprawić by odbijała się ona od paletki.

Kod naszego obecnego programu wygląda tak:

[Kod programu po wykonaniu trzeciej czesci poradnika](https://raw.githubusercontent.com/Kielx/ncurses-pong/33b75b6e96af9b7cb3091bd669d2962f9f05879f/main.cpp?token=GHSAT0AAAAAABOVH5I5OME3RSQNX26UE3YSYQ2AWTQ)

## Ruch piłki

By piłka mogła się poruszać konieczne będzie dodanie dwóch zmiennych, które będą określać kierunek a jednocześnie prędkość na płaszczyznach X i Y.

Do naszej klasy Ball musimy dodać dwie zmienne - `x_speed` i `y_speed` by nasza klasa wyglądała tak:

```cpp 5
class Ball
{
public:
int x, y,
int x_speed, y_speed;
};
```

Założenie jest proste - nasza piłka przesuwa się automatycznie po osi X i Y o wartość jej prędkości - co określony przedział czasowy (do przedziału czasowego dojdziemy nieco później). Ustawiając prędkość na 0, piłka nie będzie się poruszać, ustawiająć prędkość na 1, piłka będzie się poruszać o jedną jednostkę w danym kierunku, ustawiając prędkość na -1, piłka będzie się poruszać o jedną jednostkę w odwrotnym kierunku.

Odbijanie piłki będzie się odbywać poprzez sprawdzenie czy piłka graniczy z naszą paletką, a wówczas zmienimy jej kierunek ruchu na przeciwny. Tak samo zrobimy jeżeli piłka napotka krawędź ekranu. Jeśli piłka przejdzie za paletkę to gracz przegrywa.

W naszej funkcji single_player dodajemy następujące linie:

```cpp 7-8,16-18
// ...Pozostała część programu 
void single_player(WINDOW *win)
{
  Ball ball1;
  ball1.x = 10;
  ball1.y = 10;
  ball1.x_speed = 1;
  ball1.y_speed = 1;
  mvwprintw(win, ball1.y, ball1.x, "o");
  Paddle paddle1;
  paddle1.x = getmaxx(win) / 2;
  paddle1.y = getmaxy(win) - 2;
  paddle1.width = 5;
  while (true)
  {
    ball1.x += ball1.x_speed;
    ball1.y += ball1.y_speed;
    mvwprintw(win, ball1.y, ball1.x, "o");
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

- Linia 7-8 ustawia prędkość x i y piłki na 1
- Linia 16-18 sprawia, że co iteracja naszej gry pozycja naszej piłki zwiększa się o prędkość x i y piłki.

W teorii nasz program powinien zadziałać tak, że piłka będzie się przesuwać po ekranie, aż z niego nie wyleci. Sprawdźmy czy tak jest.
Kompilujemy i uruchamiamy program:

```bash
g++ main.cpp -o main.out -lncurses && ./main.out
```

A efekt po uruchomieniu wygląda mniej więcej tak:

![Efekt uruchomienia programu z piłką](/images/posts/CppNcurses4/1.webp#postMiniImage)

Jak widać nie jest to nasz oczekiwany cel. Piłka w sekundzie przemieściła się na koniec ekranu i zostawiła niepotrzebne ślady.
Naprawmy te błędy.

W funkcji `single_player` w pętli `while` dodajemy 4 linię, która będzie usuwać poprzednią pozycję piłki.

```cpp 4
while (true)
  {
    /* ... */ 
    mvwprintw(win, ball1.y, ball1.x, " ");
    ball1.x += ball1.x_speed;
    ball1.y += ball1.y_speed;
    mvwprintw(win, ball1.y, ball1.x, "o");
    int quit = move_paddle(win, paddle1);
    /* ... */ 
  }
```

Po uruchomieniu programu w takiej wersji szybko zauważymy jednak, że dalej piłka w mgnieniu oka wymyka się poza ekran - śladu faktycznie nie ma, ale piłka też znikła.

Mogli byśmy teraz zmienić naszą funkcję `usleep` i dodać do niej większą wartość czasu. Spowoduje to, że piłka będzie się przesuwać wolniej, gdyż pętla while w której piłka się porusza będzie się wykonywać co dłuższy odstęp czasu. Problem w tym, że wtedy nasza paletka takżę stanie się mniej responsywna - będzie się przesuwać wolniej, gdyż będzie oczekiwać taką samą ilość czasu jak piłka.

By rozwiązać ten problem, musimy zrobić coś co jednocześnie spowolni piłkę, ale nie spowolni naszej paletki.
Wpadłem na pomysł by rozwiązać to w następujący sposób:

- Tworzymy nową zmienną o nazwie `counter`
- W pętli while co każdą iterację pętli (czyli w co każdej klatce gry) zwiększamy zmienną `counter` o 1.
- Teraz musimy sprawić, że nasza piłka będzie się przesuwać np. co 300 klatka, a paletka może się przesuwać co każda klatka.
- By to zrobić za każdym razem będziemy spradzać za pomocą operatora modulo `%` czy zmienna `counter` jest podzielna przez 300. Jeśli tak, to będziemy przesuwać piłkę o pole. Natomiast niezależnie od tego, w każdej iteracji pętli możemy przesuwać paletkę.

By nasz plan zadziałał wprowadźmy następujące zmiany w pętli `while` znajdującej się w funkcji `single_player` (do funkcji dodałem też komentarze by opisać nasz kod na przyszłość):

```cpp 21-22,27-35
/**
 * @brief Funkcja odpowiedzialna za gre dla jednego gracza
 *
 * @param win - okno, w którym odbywa się gra
 */
void single_player(WINDOW *win)
{
  // Deklaracja piłki oraz jej początkowej pozycji i prędkości
  Ball ball1;
  ball1.x = 10;
  ball1.y = 10;
  ball1.x_speed = 1;
  ball1.y_speed = 1;
  mvwprintw(win, ball1.y, ball1.x, "o");
  // Deklaracja paletki, jej pozycji w połowie ekranu na osi X oraz na przedostatniej linii osi Y
  Paddle paddle1;
  paddle1.x = getmaxx(win) / 2;
  paddle1.y = getmaxy(win) - 2;
  paddle1.width = 5;

  /* Counter pozwala na przesuwanie piłki z opóźnieniem */
  int counter = 0;

  // Pętla w której znajduje się cała logika gry
  while (true)
  {
    counter++;
    // Co 300 klatek przesuwamy piłkę, usuwając stary ślad
    if (counter % 300 == 0)
    {
      mvwprintw(win, ball1.y, ball1.x, " ");
      ball1.x += ball1.x_speed;
      ball1.y += ball1.y_speed;
      mvwprintw(win, ball1.y, ball1.x, "o");
    }
    // Funkcja odpowiedzialna za przesuwanie paletki
    int quit = move_paddle(win, paddle1);
    if (quit == 1)
    {
      break;
    }
    // Usypiamy program na 500 mikrosekund i odświeżamy okno z nowymi danymi
    usleep(500);
    wrefresh(win);
  }
}
```

Udało się! Teraz piłka faktycznie przesuwa się, a nasza paletka działa płynnie. Piłka jednak cały czas wylatuje za ekran i nie odbija się od paletki. Pora to zmienić.

## Odbicie piłki

Zasady odbijania piłki są relatywnie proste:

- Piłka domyślnie przesuwa się o jedno pole w prawo i jedno pole w dół - czyli co iteracja pętli while dodajemy 1 do współrzędnej X i Y piłki.
- Jeżeli piłka odbija się od ściany lub paletki to zmieniamy kierunek poruszania - więc przesuwać będziemy wtedy współrzędne X i Y co iterację każdą iterację o -1.
- Jedyna trudność polega na tym, że piłka musi się odbijać od paletki - musimy więc sprawdzić dwie rzeczy:
  - Czy piłka znajduje się w wierszu bezpośrednio nad paletką
  - Czy w momencie gdy znajduje się tam piłka, znajduje się tam także paletka od której ma się odbić piłka
  - Żeby spełnić powyższy podpunkt, musimy też sprawdzić wszystkie pola paletki (która ma określoną szerokość) czy piłka znajduje się na jednym z tych miejsc
  
Plan jest gotowy - bierzmy się do roboty!

Wprowadźmy następujące zmiany do pętli `while(true)` znajdującej się w funkcji `single_player`:

```cpp 14-37
// Pętla w której znajduje się logika gry
  while (true)
  {
    counter++;
    // Co 300 klatek przesuwamy piłkę, usuwając stary ślad
    if (counter % 200 == 0)
    {
      mvwprintw(win, ball1.y, ball1.x, " ");
      ball1.x += ball1.x_speed;
      ball1.y += ball1.y_speed;
      mvwprintw(win, ball1.y, ball1.x, "o");
    }

    /* Odbijanie piłki */
    if (ball1.y == getmaxy(win) - 3)
    {
      for (int i = paddle1.x; i < paddle1.x + paddle1.width; i++)
      {
        if (ball1.x == i)
        {
          ball1.y_speed = -1;
        }
      }
    }
    if (ball1.y == getbegx(win))
    {
      ball1.y_speed = 1;
    }
    if (ball1.x == getmaxx(win) - 2)
    {
      ball1.x_speed = -1;
    }
    if (ball1.x == getbegx(win))
    {
      ball1.x_speed = 1;
    }
    /* Odbijanie piłki */

    // Pętla odpowiedzialna za przesuwanie paletki
    int quit = move_paddle(win, paddle1);
    if (quit == 1)
    {
      break;
    }
    // Usypiamy program na 500 mikrosekund i odświeżamy okno z nowymi danymi
    usleep(500);
    wrefresh(win);
  }
```

Nasze nowe warunki `if` sprawdzają:

- Linie 15-24 - Czy piłka znajduje się w wierszu nad paletka i styka się z nią. Jeżeli tak to zmieniamy prędkość y na -1,
- Linie 25-28 - Czy piłka odbija się od górnej części ekranu - jeśli tak to ustawiamy prędkość y na 1,
- Linie 29-32 - Czy piłka odbija się od prawej częsci ekranu - jesli tak to ustawiamy prędkość x na -1
- Linie 33-36 - Czy piłka odbija się od lewej części ekranu - jesli tak to ustawiamy prędkość x na 1.

### Porządki

Z zasady program powinien najpierw działać, a dopiero później powinniśmy się zajmować jego optymalizacją. Dlatego też, skoro nasze odbijanie działa, warto teraz uporzadkować program i przenieść logikę odpowiedzialną za odbijanie piłki do innej funkcji by nie zaśmiecała nam funkcji `single_player`.

Wycinamy kod z warunkami spomiędzy komentarza `/* odbijanie piłki */` i wstawiamy go do nowej funkcji:

```cpp
int ball_bounce(WINDOW *win, Ball &ball, Paddle &paddle)
{
  if (ball.y == getmaxy(win) - 3)
  {
    for (int i = paddle.x; i < paddle.x + paddle.width; i++)
    {
      if (ball.x == i)
      {
        ball.y_speed = -1;
      }
    }
  }
  if (ball.y == getbegx(win))
  {
    ball.y_speed = 1;
  }
  if (ball.x == getmaxx(win) - 2)
  {
    ball.x_speed = -1;
  }
  if (ball.x == getbegx(win))
  {
    ball.x_speed = 1;
  }

}
```

W funkcji `single_player` zmieniamy kod tak, żeby wywoływała się funkcja `ball_bounce` zamiast warunków if `if`:

```cpp
    /* Odbijanie piłki */
    ball_bounce(win, ball1, paddle1);
```

## Punkty i przegrana

By nazwać nasz program **grą** potrzebujemy jeszcze dwóch rzeczy:
Możliwości zdobywania punktów i możliwości przegranej - oczywiście tylko wtedy, gdy piłka wyleci za ekran.

Najlepszą metodą jesli chodzi o programowanie jest rozbijanie problemu na coraz mniejsze problemy, aż do momentu w którym jesteśmy w stanie zacząć je rozwiązywać. Następnie po kolei rozwiązujemy te mikro problemy, aż dojdziemy do momentu, gdy mamy ukończony program. Tak i tym razem rozbijmy nasz problem na na mniejsze i wypiszmy sobie listę wszystkich rzeczy, które potrzebujemy.

By gracz mógł przegrać nasza piłka musi wylecieć za ekran - innymi słowy musi się znaleźć co najmniej na poziomie paletki. W naszej wcześniejszej funkcji sprawdzaliśmy czy piłka jest na pozycji o jeden większej od pozycji paletki na osi Y. Jeśli tak było to piłka się odbijała. W przeciwnym wypadku zakładamy, że piłka znalazła się na równi z paletką, co oznacza, że gracz przegrał.

Więc nasz warunek jest prosty - Jeśli piłka znajduje się na pozycji takiej samej jak paletka, to gracz przegrał.

W kodzie będzie to wyglądać tak:

```cpp
  if (ball1.y == getmaxy(win) - 1) {
    /* Przegrana */
  }
```

Sprawdzamy czy pole .y naszej piłki jest równe maksymalnemu poziomowi-Y naszego ekranu `win` -1 (bo tam jest paletka). Jeśli tak to robimy coś, co oznacza, że gracz przegrał.

W grze po przegranej dobrze jest wyświetlić informację o przegranej oraz wyświetlić wynik gracza. Zrobimy to, ale musimy pamiętać, że musimy najpierw wyczyścić ekran, by usunąc z niego paletkę. W tym celu użyjemy funkcji `wclear(win)` z curses. Po jej użyciu musimy ponownie narysować ramkę, gdyż funkcja wyczyściła cały ekran. Następnie możemy wypisać stosowne komunikaty.

W naszej funkcji `single_player` w pętli `while(true)` po linii odpowiedzialnej za odbijanie piłki dodajemy następujący kod:

```cpp 3-11
/* ... */
    ball_bounce(win, ball1, paddle1, score);
    if (ball1.y == getmaxy(win) - 1)
    {
      wclear(win);
      box(win, 0, 0);
      mvwprintw(win, getmaxy(win) / 2, getmaxx(win) / 2, "GAME OVER");
      mvwprintw(win, getmaxy(win) / 2 + 1, getmaxx(win) / 2, "Your score: %d", score / 300);
      mvwprintw(win, getmaxy(win) / 2 + 2, getmaxx(win) / 2, "Press any key to continue");
      mvwprintw(win, getmaxy(win) / 2 + 3, getmaxx(win) / 2, "Press q to quit");
      wrefresh(win);
    }
/* ... */
```

Po skompilowaniu jednak dalej pojawia nam się paletka i możemy nią sterować. Możemy wyjść z gry, ale nasza opcja wyboru by kontynuować grę nie działa.

Wobec tego musimy zrobić następujące rzeczy:

- Sprawić by paletka zniknęłą po wyświetleniu ekranu końcowego
- Umożliwić graczowi wybór pomiędzy kontynuowaniem gry, a wyjściem z niej

Zrobimy to zmieniając kod wyżej w następujący sposób:

```cpp 1, 44-57
int single_player(WINDOW *win)
{
  // Deklaracja piłki oraz jej początkowej pozycji i prędkości
  Ball ball1;
  ball1.x = 10;
  ball1.y = 10;
  ball1.x_speed = 1;
  ball1.y_speed = 1;
  mvwprintw(win, ball1.y, ball1.x, "o");
  // Deklaracja paletki, jej pozycji w połowie ekranu na osi X oraz na przedostatniej linii osi Y
  Paddle paddle1;
  paddle1.x = getmaxx(win) / 2;
  paddle1.y = getmaxy(win) - 2;
  paddle1.width = 5;

  /* Counter pozwala na przesuwanie piłki z opóźnieniem */
  int counter = 0;
  int score = 0;
  // Pętla w której znajduje się cała logika gry
  while (true)
  {
    counter++;
    mvwprintw(win, 0, 0, "Score: %d", score / 300);
    // Co 300 klatek przesuwamy piłkę, usuwając stary ślad
    if (counter % 300 == 0)
    {
      mvwprintw(win, ball1.y, ball1.x, " ");
      ball1.x += ball1.x_speed;
      ball1.y += ball1.y_speed;
      mvwprintw(win, ball1.y, ball1.x, "o");
    }

    /* Odbijanie piłki */
    ball_bounce(win, ball1, paddle1, score);
    if (ball1.y == getmaxy(win) - 1)
    {
      wclear(win);
      box(win, 0, 0);
      mvwprintw(win, getmaxy(win) / 2, getmaxx(win) / 2, "GAME OVER");
      mvwprintw(win, getmaxy(win) / 2 + 1, getmaxx(win) / 2, "Your score: %d", score / 300);
      mvwprintw(win, getmaxy(win) / 2 + 2, getmaxx(win) / 2, "Press any key to continue");
      mvwprintw(win, getmaxy(win) / 2 + 3, getmaxx(win) / 2, "Press q to quit");
      wrefresh(win);
      nodelay(stdscr, FALSE);
      int ch;
      ch = getch();

      if (ch == 'q' || ch == 'Q')
        return 1;
      else
      {
        wclear(win);
        box(win, 0, 0);
        nodelay(stdscr, TRUE);
        return single_player(win);
      }
    }
    // Funkcja odpowiedzialna za przesuwanie paletki
    int quit = move_paddle(win, paddle1);
    if (quit == 1)
    {
      break;
    }
    // Usypiamy program na 500 mikrosekund i odświeżamy okno z nowymi danymi
    usleep(500);
    wrefresh(win);
  }
  return 0;
}
```

- Ustawiamy typ zmiennej na int - będziemy zwracać jej wartość w funkcji `main`
- Ustawiamy opcję `nodelay(stdcr, FALSE)` - oznacza to, że program nie będzie kontynuował swojego działania dopóki nie wprowadzimy jakiegoś klawisza. Naszym celem jest wyświetlić ekran z wynikiem, a później oczekiwać na wprowadzenie klawisza do kontynuowania gry lub wyjścia z gry.
- Linie 13-14 umożliwiają pobranie klawisza z klawiatury od użytkownika za pomoca funkcji `getch()`
- W linii 16 sprawdzamy czy klawisz wyjścia z gry został naciśnięty - jesli tak to wychodzimy z funkcji `single_player` zwracająć wartość 1 by program wiedział, że opuściliśmy grę dla jednego gracza (może się to przydać w przyszłości np. gdybyśmy chcieli stworzyć menu z różnymi opcjami gry)
- W 18 linii w warunku else ustalamy, że jeśli gracz nie wybrał klawisza 'q' lub 'Q' to czyścimy poprzedni ekran, tworzymy nową ramkę oraz ustawiamy opcję `nodelay(stdscr, TRUE)`, która pozwoli na dalszą grę bez blokowania klatek w oczekiwaniu na klawisz od gracza (nasza piłka powinna się przesuwać bez względu na to czy ruszamy paletką czy nie - bez tej opcji nie będzie się ona poruszać dopóki nie naciśniemy klawisza).Na koniec zwracamy funkcję single player używając `return`. Gdybyśmy nie użyli return, tylko wstawili samą funkcję `single_player(win)` to została by ona wywołana [rekurencyjnie](https://www.youtube.com/watch?v=jNi_X5bvmQ0) przez pierwszą funkcję. Teoretycznie gra by działała prawidłowo ALE przy próbie wyjścia, po naciśnięciu klawisza 'q' wyszlibyśmy tylko z jednej funkcji, a nie z całej gry. Pozostałe wywołania by dalej były aktywne, więć wyjście z gry by było możliwe dopiero po naciśnięciu 'q' tyle razy, ile razy uruchomiliśmy ponownie grę. Użycie słowa kluczowego `return` pozwala nam zakończyć bieżące wywołanie funkcji i uruchomić nowe.

## Podsumowanie

Sukces! Nasza gra działa zgodnie z wszystkimi założeniami.

![Ukończona gra](/images/posts/CppNcurses4/finishedGameplay.webm#postVideo)

[Kod programu z ukończoną grą](https://raw.githubusercontent.com/Kielx/ncurses-pong/42c0b01acfddf02de8a484be41f23b0cca41e186/main.cpp)

**Co udało nam się stworzyć:**

- Klasy i obiekty - piłka i paletka
- Ekran główny gry
- Logika gry
  - Sterowanie paletką
  - Odbijanie piłki
  - Punktacja

**Programistyczne koncepcje wykorzystane podczas tworzenia tej gry:**

- Prymitywne typy danych
- Zmienne
- Komentarze
- Pętle
- Funkcje
- Klasy i obiekty
- Zewnętrzne biblioteki
- Wskaźniki / Przekazywanie jako wartość / Referencje

## Źródła

Tworząc tego posta korzystałem intensywnie z poniższych źródeł, które warto sprawdzić jeśli chcesz pogłębić swoją wiedzę na temat Ncurses i innych tematów, które poruszałem w tym poście:

- [Film Mirosława Zelenta na temat Rekurencji](https://www.youtube.com/watch?v=jNi_X5bvmQ0)
- [Ncurses Programming HowTo](https://tldp.org/HOWTO/NCURSES-Programming-HOWTO/)
- [Ncurses Man Pages](https://invisible-island.net/ncurses/announce.html)
- [Ncurses - Linux man page](https://linux.die.net/man/3/ncurses)
