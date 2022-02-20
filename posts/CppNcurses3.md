---
title: 'How to get started with C ++ and Ncurses - Vol. 3 - Paddle and controls'
date: '2022-02-17'
excerpt: 'The third part of the guide, in which we re-organize our program, create a paddle and steering functions'
coverImage: '/images/posts/CppNcurses3/main.svg'
keywords:
- C++
- Ncurses
- Basics
---

![Post hero image](/images/posts/CppNcurses3/main.svg#postMiniImage)

## Table of contents

- [Introduction](#introduction)
- [Cleanup](#cleanup)
- [Cleanup, part 2](#cleanup-part--)
- [Paddle](#paddle)
- [Controls](#controls)
- [Summary](#summary)
- [Acknowledgements](#acknowledgements)

## Introduction

In the third part of the guide, we further develop our program - this time we will add a paddle that will bounce the ball. If by some chance you managed to skip the previous two parts of the guide, our current program looked like this (excluding the added balls):

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
mvwprintw(win, ball1.x, ball1.y, "o");
wrefresh(win);
getch();
return 0;
}
```

## Cleanup

Our program works, but the disorder is slowly creeping into it. The whole logic of the program is contained in the main function and thus it ceases to be readable and with time it will be more and more difficult for us to operate it. To facilitate further development, we will divide our program into separate functions - one of them will be responsible for screen initialization, and the other for the game. Let's create a new function in front of the main function called `init_screen ()` to initialize the screen:

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

Remember that a function is nothing more than a piece of code that we can reuse anywhere instead of copying all the lines of code. In this case, the function is of pointer type and returns a pointer to the window. Hence the operator `*`.

If pointers are new to you or you have trouble understanding what they are, the simplest way is to say that pointers are nothing more than an address in memory. Even simpler - sometimes we want to use the same data in the program. Rather than sending all the data or copying all the data, it is more convenient to just send the **pointer** - the address to that data. This way, if one part of the program changes certain data, it will change the data in the rest of the program. If we had initialized this window in a function and didn't use a pointer, our window object would only exist in that function, and the rest of the program would not be able to get to it. Since we return a pointer to this window, our main function and game function can use this window and modify it accordingly if necessary.

If you want to read more about C++ pointers, you can do so here:

[C++ Pointers](https://www.cplusplus.com/doc/tutorial/pointers/)

Now we will create a function responsible for the game mechanics:

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

And in the main function we will initialize the window with our new function `init_screen()` and call our function `single_player()` passing the pointer to the window like this:

```cpp
int main()
{
  WINDOW *win = init_screen();
  single_player(win);
  return 0;
}
```

By combining these three pieces of code, our program will look like this:

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
  @brief Initialize game window
  @return Pointer to the game window
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

Compiled and started with the command:

```bash
g++ main.cpp -o main.out -lncurses && ./main.out
```

It will look like this:

![Base for part 3](/images/posts/CppNcurses3/1.webp#postMiniImage)

## Cleanup, part 2

We have a few more details left that we missed in the previous stages.

As a watchful observer, you may have noticed that a blinking cursor appears next to our ball which is symbolized by the letter 'o'. As we will not enter anything there, we will not need a cursor.
To disable the cursor, we need to use the `curs_set(0)` instruction.

Additionally, each time we pressed a key on the keyboard, it was automatically printed in the terminal window. Our game doesn't need this either, so we'll disable it with the `noecho()` statement.

We will need to use the arrow keys to control our paddle, so we will enable this function with the `keypad(win, TRUE)` function.

Additionally, it is worth adding the `nodelay(stdscr, TRUE)` function, which will allow us to enter keys non-blocking way. Without this call, our program will wait each time for the key to be pressed. The game should play automatically rather than wait for a keypress.

We will also add a call to `endwin ()` to terminate ncurses.

Our window initialization function will now look like this:

```cpp
WINDOW *init_screen()
{
  WINDOW *win;                /* Game window pointer */
  initscr();                  /* Turn on curses mode */
  win = newwin(30, 80, 1, 1); /* Create new game window */
  nodelay(stdscr, TRUE);      /* Don't wait for keypress */
  refresh();                  /* Refreshing screen */
  box(win, 0, 0);             /* Draw a box around the window */
  keypad(stdscr, TRUE);       /* Turn on arrow keys*/
  noecho();                   /* Don't print key pressed to the screen */
  curs_set(0);                /* Hide cursor */
  return win;                 /* Return game window */
}
```

I have added comments to the fragment to explain what is happening there. It is worth leaving comments for other people or ourselves in the future. If we happen to come back to a certain part of code after a long time, we may forget what a certain function is doing. Thanks to the comments, we will remember what a given code fragment is responsible for. Of course, what I did above is quite an extreme version of commenting, because describing each line of code is tedious, time-consuming, and repeatedly unnecessary. It is not worth describing obvious things. As with everything in life - we have to try to find a middle ground, however, if you have doubts about whether to describe a given piece of code or not - it is worth doing it anyway - you will not lose anything on it, and perhaps in the future it will be useful to you or someone else.

As for the code fragments that are not worth describing, e.g.

```cpp
//Declaration of an int variable named x and assigning it the value of 10
int x = 10;
//Print the text 'this is x' to the screen and go to the next line
cout << "this is x" << endl;
```

In this case, it is obvious to any programmer that this code will perform certain actions. It doesn't make any sense to describe it in a comment. Perhaps, while studying at school or college, you have met (or will meet) teachers/lecturers who will say that EVERY piece of code needs to be described ("Because maybe your grandmother will read this code and will not know that this is an assignment to a variable?"). However, you need to distinguish the difference between the programmer and the end-user. Your grandma will not read the code, but rather use the finished program.  Comments inside the code won't be read by your grandma. She will need clear on-screen instructions and explanations but not comments.
The user is not interested in the code, but whether our program is useful and easy to use. On the other hand, the programmer who will read the code will rather know the basic syntax and will know that there is a variable declaration. Common sense is important, but pragmatics shows that it is not worth convincing lecturers/teachers of your point of view. I know from my own experience that the effect will be rather poor and you will not gain any profit. We live in a free country and everyone has the right to be as wrong as they please.

 Therefore, if you write programs at school or college, do it as required, and when creating your projects, try to use common sense when it comes to comments. They are a means to an end, not an end in themselves.

## Paddle

Cleanups done. Now it's time to create a paddle class:

```cpp
class Paddle
{
public:
  int x, y, width;
};
```

The paddle has three variables:

- `x` - paddle position on the X-axis
- `y` - paddle position on the Y-axis
- `width` - the width of the paddle - it may be fixed, but in the future, we may want to change it during the game, it may be smaller on a more difficult level, or it may be changed due to external factors (this game can be later changed into e.g. . Arkanoid, and there, under the influence of boosts, the paddle may increase or decrease its size)

Variables can be declared on separate lines, or, as above, in one line.

And now, in our function `single_player`, right after the ball declaration, we add the paddle declaration and its value:

```cpp
  Paddle paddle1;
  paddle1.x = getmaxx(win) / 2;
  paddle1.y = getmaxy(win) - 2;
  paddle1.width = 5;
```

Here, just like we declared the ball, we now declare our paddle. The difference is that we assign the result of the function `getmaxx(win) / 2` to the variable x inside the paddle - and it returns nothing but the end of the x-axis of the window, which was passed as an argument, and then splits them into two. The function will result in placing our palette in the middle of the screen.
We do the same with the value of y - we want our paddle to be at the bottom of the screen, so we use the function `getmaxy(win) - 2` - which returns the height of the window. If we put the palette on the edge of the window, it will be in line with the frame. Therefore, we have to subtract 2 from this result.
Finally, we set the width of the palette to 5.

The paddle is ready. It's time to add some controls.

## Controls

We continue to divide the program into functions, so we'll start by declaring the `move_paddle` function. This time, instead of describing the function under the code, I will add an appropriate comment in DOXYGEN format - describing all the functions in this way, we can later easily generate documentation for the entire project. I will try to write a post at the end of the guide about generating Doxygen documentation.

```cpp
/**
 * @brief Function that moves the paddle
 *
 * @param win - game window in which the paddle is located
 * @param paddle - paddle to be moved
 * @return int - returns 1 if the user wants to quit the game, 0 otherwise
 */
int move_paddle(WINDOW *win, Paddle &paddle)
{
  // loop responsible for creating paddle blocks
  // e.g if our paddle is of width 5 - then we need to create 5 separate 'blocks'
  for (int i = 0; i < paddle.width; i++)
  {
    mvwprintw(win, paddle.y, paddle.x + i, "-");
  }
  // Get a steering key from the user
  // If it's the 'q' key, return 1 to indicate that the user wants to quit the game
  int ch;
  ch = getch();
  switch (ch)
  {
  case 'q':
    return 1;
  // Move the paddle to the left on left arrow key press `<-`
  case KEY_LEFT:
    if (paddle.x > getbegx(win))
    {
      paddle.x--;
  // loop responsible for creating paddle blocks
  // e.g if our paddle is of width 5 - then we need to create 5 separate 'blocks'
  //Remove the previous paddle blocks
      for (int i = 0; i < paddle.width; i++)
      {
        mvwprintw(win, paddle.y, paddle.x + i, "-");
        mvwprintw(win, paddle.y, paddle.x + i + 1, " ");
      }
    }
    break;
    // Move the paddle to the right on right arrow key press `->`
  case KEY_RIGHT:
    if (paddle.x < getmaxx(win) - 1 - paddle.width)
    {
      paddle.x += 1;
  // loop responsible for creating paddle blocks
  // e.g if our paddle is of width 5 - then we need to create 5 separate 'blocks'
  //Remove the previous paddle blocks
      for (int i = 0; i < paddle.width; i++)
      {
        mvwprintw(win, paddle.y, paddle.x + i, "-");
        // In this conditional if statement, we check if the paddle is at the edge of the window. If it is, we don't want to print a space character
        //We would be printing a space character on the edge of the window, removing our border
        if (paddle.x - i != getbegx(win) - 1)
          mvwprintw(win, paddle.y, paddle.x - i, " ");
      }
    }

    break;
  }
  return 0;
}
```

It's quite a long function, and even though there are comments right away, it's worth following what it does:

- In the 8th line we define the function `move_paddle`, which takes two arguments - a pointer to the window and a reference to the palette to be controlled
- In the 12th line, we use a for loop to print all the paddle fields symbolized by the `-` sign. We have to use the loop because our paddle has a certain width. If it was 1, we might as well use one mvwprintw instruction. In our case, depending on the width of the palette, we have to write a certain number of characters, hence the need for this function.
- Lines 18 and 19 are responsible for retrieving the control key from the user.
- On line 20, we use a switch to check what key was pressed and perform the appropriate action:
  - In each of the variants, we also check that the paddle does not go out of the screen. If not, then we operate.
- The function returns 1 if the user presses the `q` key, which is responsible for quitting the game. Otherwise, it returns 0 and the game continues.

To reflect the changes in the code, we also need to update the single-player function. We're changing the game code to add a while loop that calls the `move_paddle` function and assigns it to the value `int quit`. Thanks to this, we can get out of the game. In addition, we refresh the screen every 500 microseconds to allow the player to control the paddle.

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

## Summary

Our current program code looks like this:

[Code after the third part of tutorial](https://raw.githubusercontent.com/Kielx/ncurses-pong/68c9798b37f3bb7e3d5ba7ea3fe920b93626e020/main.cpp?token=GHSAT0AAAAAABOVH5I53OQYWPLVYAFYRFHEYQ34YYQ)

And after compiling and running:

![Effect of compiling and running the program](/images/posts/CppNcurses3/3.webm#postVideo)

## Acknowledgements

When creating this post, I used the following sources extensively, which are worth checking out if you want to reinforce your knowledge of Ncurses and other topics that I covered in this post:

- [Ncurses Programming HowTo](https://tldp.org/HOWTO/NCURSES-Programming-HOWTO/)
- [Ncurses Man Pages](https://invisible-island.net/ncurses/announce.html)
- [Ncurses - Linux man page](https://linux.die.net/man/3/ncurses)
