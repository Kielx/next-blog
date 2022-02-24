---
title: 'How to get started with C ++ and Ncurses - Vol. 4 - Game v1.0'
date: '2022-02-24'
excerpt: 'In the fourth part of the guide, we finish creating the logic responsible for the game'
coverImage: '/images/posts/CppNcurses4/main.svg'
keywords:
- C++
- Ncurses
- Basics
---

![Main image](/images/posts/CppNcurses4/main.svg#postMiniImage)

## Table of contents

- [Wstęp](#wstęp)
- [Ruch piłki](#ruch-piłki)
- [Odbicie piłki](#odbicie-piłki)
  - [Porządki](#porządki)
- [Punkty i przegrana](#punkty-i-przegrana)
- [Podsumowanie](#podsumowanie)
- [Źródła](#źródła)

## Introduction

In the fourth part of the guide, we finish creating the logic responsible for the game. We have to put the ball in motion and make it bounce off the paddle.

The code of our current program looks like this:

[Program code after third part of tutorial](https://raw.githubusercontent.com/Kielx/ncurses-pong/33b75b6e96af9b7cb3091bd669d2962f9f05879f/main.cpp?token=GHSAT0AAAAAABOVH5I5OME3RSQNX26UE3YSYQ2AWTQ)

## Ball movement

In order for the ball to move, it will be necessary to add two variables that will determine the direction and velocity at the same time on the X and Y planes.

We need to add two variables to our Ball class - `x_speed` and `y_speed` to make our class look like this:

```cpp 5
class Ball
{
public:
int x, y,
int x_speed, y_speed;
};
```

The assumption is simple - our ball moves automatically along the X and Y axes by the value of its speed at every specified time interval (we will get to the time interval a bit later). If you set the speed to 0, the ball will not move, set the speed to 1, the ball will move one unit in each direction, if you set the speed to -1, the ball will move one unit in the opposite direction.

Bouncing the ball will take place by checking whether the ball is adjacent to our paddle, and then we will change its direction of movement to the opposite. We will do the same if the ball hits the edge of the screen. If the ball passes behind the paddle, the player loses.

In our single_player function we add the following lines:

```cpp 7-8,16-18
// ...Rest of the program...
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

- Line 7-8 sets the x and y speed of the ball to 1
- Line 16-18 makes the position of our ball increase by the speed of x and y of the ball every iteration of our game.

In theory, our program should work in such a way that the ball will move across the screen until it comes out of it. Let's see if it is so.
We compile and run the program:

```bash
g++ main.cpp -o main.out -lncurses && ./main.out
```

And the effect after launching it looks something like this:

![Effect after launching the program in current state](/images/posts/CppNcurses4/1.webp#postMiniImage)

As you can see, this is not our expected goal. The ball moved to the end of the screen in a second and left unnecessary tracks.
Let's fix these bugs.

In the function `single_player` in the `while` loop, we add a 4th line that will delete the previous position of the ball.

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

In this version we quickly noticed that the ball slipped out of the screen in the blink of an eye. This time there are no tracks left - but the ball also disappeared.

To fix this we could try to change the `usleep` function and increase its time value. This will make the ball move slower -  because the while loop in which the ball is moving, will be paused for longer time. The problem is that then our paddle will also become less responsive - it will move more slowly because it will be also waiting for th same amunt of time as the ball.

To solve this problem, we need to do something that will simultaneously slow the ball down but keep the speed of our paddle.
I found an idea on how to solve this issue:

- We create a new variable named `counter`
- In the while loop, on every iteration of the loop (i.e. every frame of the game) we increment the variable `counter` by 1.
- We make our ball move, but only on (for example) every 300 frame, and the paddle can move every frame.
- To do this, we will check whether the variable `counter` is divisible by 300 using the `%` modulo operator. If so, we will move the ball. Regardless of this, we can move the paddle in each iteration of the loop.

For our plan to work, let's make the following changes to the `while` loop in the `single_player` function (I also added comments to the function to describe our code for the future):

```cpp 21-22,27-35
/**
 * @brief Function for single player game
 *
 * @param win - window in which the game is played
 */
void single_player(WINDOW *win)
{
  // Declaration of ball, its initial position and speed
  Ball ball1;
  ball1.x = 10;
  ball1.y = 10;
  ball1.x_speed = 1;
  ball1.y_speed = 1;
  mvwprintw(win, ball1.y, ball1.x, "o");
  // Declaration of paddle, its initial x position in the middle of the screen on X axis and its penultimate line of the Y axis
  Paddle paddle1;
  paddle1.x = getmaxx(win) / 2;
  paddle1.y = getmaxy(win) - 2;
  paddle1.width = 5;

  /* Counter allows us to move the ball with a delay */
  int counter = 0;

  // Loop containing logic for the game
  while (true)
  {
    counter++;
    // We move the ball each 300 frames, clearing the previous position
    if (counter % 300 == 0)
    {
      mvwprintw(win, ball1.y, ball1.x, " ");
      ball1.x += ball1.x_speed;
      ball1.y += ball1.y_speed;
      mvwprintw(win, ball1.y, ball1.x, "o");
    }
    // Function responsible for paddle steering
    int quit = move_paddle(win, paddle1);
    if (quit == 1)
    {
      break;
    }
    // Sleep for 500 microseconds and refresh the window with new data
    usleep(500);
    wrefresh(win);
  }
}
```

Success! Now the ball is actually moving and our paddle is moving smoothly. The ball, however, continues to fly behind the screen and does not bounce off the paddle. It's time to change that.

## Ball bounce

The rules for bouncing the ball are relatively simple:

- By default, the ball moves one square to the right and one square down - that is - on every iteration of the while loop, we add 1 to the X and Y coordinates of the ball.
- If the ball bounces off the wall or paddle, we change the direction of the movement - so we will move X and Y coordinates on every iteration by -1.
- The only difficulty is the fact that the ball has to bounce off the paddle - so we need to check two things:
  - The ball is in the line directly above the paddle
  - When the ball is there, is the paddle also in the same position as the ball?
  - We also have to make sure to check the point above for all elements of the paddle (the paddle has width - its not a single line)
  
The plan is ready - let's get down to work!

Let's make the following changes to the `while (true)` loop in the `single_player` function:

```cpp 14-37
// Loop containing logic for the game
  while (true)
  {
    counter++;
    // Each 300 frames we move the ball clearing the previous position
    if (counter % 200 == 0)
    {
      mvwprintw(win, ball1.y, ball1.x, " ");
      ball1.x += ball1.x_speed;
      ball1.y += ball1.y_speed;
      mvwprintw(win, ball1.y, ball1.x, "o");
    }

    /* Ball bounce */
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
    /* Ball bounce */

    // Function responsible for paddle steering
    int quit = move_paddle(win, paddle1);
    if (quit == 1)
    {
      break;
    }
    // Sleep the program for 500 microseconds and refresh the window with new data
    usleep(500);
    wrefresh(win);
  }
```

Our new `if` conditions check:

- Lines 15-24 - Whether the ball is in the line above and is touching the paddle. If so, we change the `ball1.y_speed` to -1,
- Lines 25-28 - Does the ball bounce off the top of the screen - if so, set the `ball1.y_speed` to 1,
- Lines 29-32 - Does the ball bounce off the right side of the screen - if so, set the `ball1.x_speed` to -1
- Lines 33-36 - Does the ball bounce off the left side of the screen - if so, set the `ball1.x_speed` to 1.

### Cleanups

As a rule of thumb, the program should be working first, and only then should we optimize it. Therefore, since our ball bouncing works as expected, it is a good idea to clean our program and transfer the logic responsible for bouncing the ball to another function so that it does not clutter the `single_player` function.

We cut the code with conditions from the comment `/* ball bounce */` and paste it into the new function:

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

In the `single_player` function, we change the code so that the `ball_bounce` function is called instead of the if `if` conditions:

```cpp
    /* Ball bounce */
    ball_bounce(win, ball1, paddle1);
```

## Points and loss

To call our program a **game**, we need two more things:
The possibility of scoring points and the possibility of losing - of course only when the ball goes off the screen.

The best method when it comes to programming is to break the problem down into smaller and smaller problems until you are able to start solving them. Then we solve these micro problems one by one until we come to the point where we have the program finished. Let's break down our problem into smaller ones and write down a list of all the things we need.

In order for the player to lose, our ball must fly out of the screen - in other words, it must be at least at the racket level. In our earlier function, we checked if the ball was in a position one greater than the position of the paddle on the Y axis. If so, the ball bounced. If this condition is false we assume that the ball got past the paddle, which means that the player has lost.

So our condition is simple - If the ball is in the same position as the paddle, the player has lost.

In the code it will look like this:

```cpp
  if (ball1.y == getmaxy(win) - 1) {
    /* Game over */
  }
```

We check whether the `ball1.y` field of our ball is equal to the maximum Y-level of our `win - 1` screen (because there is a paddle there). If so, we are free to do something in case of game over.

In the game, after a loss, it is a good idea to display information about the loss and show the player's result. We will do this, but we must remember that we must first clean the screen to remove the paddle from it. For this we will use the `wclear (win)` function from curses. After using it, we need to draw the bpx again, because the function cleared the entire screen (including the border). Then we can print the appropriate messages.

In our `single_player` function in the `while (true)` loop, we add the following code after the line responsible for bouncing the ball:

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
  // Funkcja w której znajduje się cała logika gry
  while (true)
  {
    counter++;
    mvwprintw(win, 0, 0, "Score: %d", score / 125);
    // Co 125 klatek przesuwamy piłkę, usuwając stary ślad
    if (counter % 125 == 0)
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
      mvwprintw(win, getmaxy(win) / 2 + 1, getmaxx(win) / 2, "Your score: %d", score / 125);
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
- Linie 13-14 umożliwiają pobranie klawisza z klawiatury od użytkownika za pomoca funkcji getch()
- W linii 16 sprawdzamy czy klawisz wyjścia z gry został naciśnięty - jesli tak to wychodzimy z funkcji single player zwracająć wartość 1 by program wiedział, że opuściliśmy grę dla jednego gracza (może się to przydać w przyszłości np. gdybyśmy chcieli stworzyć menu z różnymi opcjami gry)
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
