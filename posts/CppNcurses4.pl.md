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

Do naszej klasy Ball musimy dodać dwie zmienne by klasa wyglądała tak:

```cpp
class Ball
{
public:
int x, y, x_speed, y_speed;
};
```

Założenie jest proste - nasza piłka przesuwa się automatycznie po osi X i Y o jej prędkość co określony przedział czasowy. Ustawiając prędkość na 0, piłka nie będzie się poruszać, ustawiająć prędkość na 1, piłka będzie się poruszać o jedną jednostkę w każdym kierunku, ustawiając prędkość na -1, piłka będzie się poruszać o jedną jednostkę w odwrotnym kierunku.

Odbijanie piłki będzie się odbywać poprzez sprawdzenie czy piłka graniczy z naszą paletką, a wówczas zmienimy jej kierunek ruchu na przeciwny. Tak samo zrobimy jeżeli piłka napotka krawędź ekranu.

W naszej funkcji single_player dodajemy następujące linie:



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
