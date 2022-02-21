---
title: 'Jak zacząć przygodę z C++ i Ncurses - Cz. 4 - Gra v1.0'
date: '2022-02-24'
excerpt: 'W czwartej części poradnika kończymy tworzyć logikę odpowiedzialną za grę'
coverImage: '/images/posts/CppNcurses4/main.svg'
keywords:
- C++
- Ncurses
- Podstawy
---

![Obraz główny](/images/posts/CppNcurses4/main.svg#postMiniImage)

## Spis treści

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
  mvwprintw(win, ball1.x, ball1.y, "o");
  Paddle paddle1;
  paddle1.x = getmaxx(win) / 2;
  paddle1.y = getmaxy(win) - 2;
  paddle1.width = 5;
  while (true)
  {
    ball1.x += ball1.x_speed;
    ball1.y += ball1.y_speed;
    mvwprintw(win, ball1.x, ball1.y, "o");
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



## Podsumowanie

Kod naszego obecnego programu wygląda tak:

[Kod programu po wykonaniu trzeciej czesci poradnika](https://raw.githubusercontent.com/Kielx/ncurses-pong/33b75b6e96af9b7cb3091bd669d2962f9f05879f/main.cpp?token=GHSAT0AAAAAABOVH5I5OME3RSQNX26UE3YSYQ2AWTQ)

A po skompilowaniu i uruchomieniu:

![Efekt po trzeciej części](/images/posts/CppNcurses3/3.webm#postVideo)

## Źródła

Tworząc tego posta korzystałem intensywnie z poniższych źródeł, które warto sprawdzić jeśli chcesz pogłębić swoją wiedzę na temat Ncurses i innych tematów, które poruszałem w tym poście:

- [Ncurses Programming HowTo](https://tldp.org/HOWTO/NCURSES-Programming-HOWTO/)
- [Ncurses Man Pages](https://invisible-island.net/ncurses/announce.html)
- [Ncurses - Linux man page](https://linux.die.net/man/3/ncurses)
