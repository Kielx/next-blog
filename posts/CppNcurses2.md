---
title: 'How to get started with C++ and Ncurses - Vol. 2 - Screen and controls'
date: '2022-02-14'
excerpt: 'Second part of the tutorial where we create a window with a ball class and object'
coverImage: '/images/posts/CppNcurses2/1.webm'
keywords:
- C++
- Ncurses
- Basics
---

![What are we going to create](/images/posts/CppNcurses2/1.webm#postVideo)

## Table of contents

- [Introduction](#introduction)
- [Main loop](#main-loop)
- [We create a ball for the game](#we-create-a-ball-for-the-game)
  - [What is a class and an object?](#what-is-a-class-and-an-object)
- [Something extra - we create more balls](#something-extra---we-create-more-balls)
  - [Let's make the balls move](#let-s-make-the-balls-move)
- [Summary](#summary)
- [Acknowledgements](#acknowledgements)

## Introduction

In this post, we go into real action. We leave the configuration behind us, and we focus on creating the game.
Every game needs a window to play in, and a pong game needs a ball to bounce.
We start with these two things.

## Main loop

In the first post, we have already created a main loop that displays the string `Hello World` after compilation.

```cpp
#include <iostream>

int main() {
std::cout << "Hello World!" << std::endl;
return 0;
}
```

We edit the `main.cpp` file and change it as follows to create the base for the game:

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

We changed the following things - line by line:

- `#include <ncurses.h>` - we import the Ncurses library - thanks to this our program knows that we will use the code previously written by the authors of the library - in other words - we inform OUR program that it will use the code written by the authors of the Ncurses library and we give him access to it.
- `int main ()` - The beginning of our main loop
- `Window * win` - We create a variable of type`WINDOW`, which will hold the pointer to the window in which we will work. It is not a typical window like we imagine in normal windowing systems. It is more like a canvas on which we can draw or display what we need.
- `initscr` - We initialize the screen and the Ncurses library. This function determines which terminal we use and initializes all data structures we will use later.
- `win = newwin (30, 80, 1, 1);` - We create a new window with dimensions of 30x80, in position 1,1. The first two arguments of this function are the height and width of the window, and the next two indicate the initial position of the window, i.e. the x and y coordinates, where the window should begin.
- **`refresh`** - This is a very important function that refreshes the window. Its task is to display all changes that have been made in the window. In Ncurses, all changes we make, such as typing some text, are saved in memory and will not be displayed on the screen until we refresh the window with the `refresh` function.
- `box (win, 0, 0);` - We create a frame around the window. The first argument is the pointer to the window we want to modify, and the next arguments are the characters the frame will be made of. For us, the standard is enough, so we give 0.0.
- `mvprintw (win, 1, 1," Hello World! ");` - Enter text into the window. This function operates on the window given as the first argument, and then moves the cursor (hence the `m` in the name starting with`move`) to the position - 1.1. The next argument is the text we print.
- `wrefresh (win);` - Refresh the window, given as an argument. It is necessary for our changes to be displayed on the screen. This function differs from the `refresh` function in that it refreshes the given window as an argument, rather than refreshing the main window.
- `getch ();` - This function waits for a key to be pressed, so the program will not exit without pressing a key on the keyboard.

To run and compile the program, we need to add an additional -lncurses flag to include the Ncurses library. We do it as follows:

```bash
g++ main.cpp -o main.out -lncurses && ./main.out
```

The result is a beautiful window with a frame with our text in it:

![Opening of first window](/images/posts/CppNcurses2/2.webp#postMiniImage)

## We create a ball for the game

There is no ping pong game without a ball. What must the ball have? In the beginning, the location, i.e. the x and y coordinates on the axis.
Theoretically, it would be enough for us to have two variables - one variable `x` and the other variable `y`, which would contain the position of the ball. However, soon it will turn out that we may want to change the speed of the ball or create more balls, so instead of creating variables, let's just create the ball class and the appropriate object that we will display on the screen.

### What is a class and an object?

Based on my own example and the examples of my friends, I know that these concepts create many problems and at the beginning, it may be unclear what they are all about.

A class is nothing more than a formula that describes some characteristics of an object. An object is one instance of a class. So our class will describe the ball and what features it has - it will be a pattern for the objects. And the object will be something like a physical entity that has these qualities. As another example of a class and objects, I can give e.g. a house plan and a physical house - structure. A plan is a class - something that describes what a house will look like, it can have a certain number of rooms, a certain number of windows, and doors. However, based on this plan, we can create one or more objects - buildings.

Another interesting way to explain what classes and objects are is by starting not with the class but with the object.

Let's take the car as an example this time. You see a car in the street and how do you find out if what you see is a car? How do you explain to a stranger that what you see is a car and not a  for example a cake? A car has things that make a car a car right? What are these things? For example wheels, lights, steering wheel, seats, windows, turn signals, etc. This makes what we see in front of us a car. Similarly, then, a CLASS car has all the above-mentioned features, and moreover, it can do everything that a car does - it can accelerate, brake, turn, etc. So these features will be attributes (variables), and accelerating, braking, turning will be methods (functions) of car class. However, this specific car that you saw on the street is an object (instance) of this class car. So based on one class - a car design - we can create an unlimited number of objects of this type.

One example is worth more than a thousand words, so we will create a class - a pattern of our ball. This is done as follows - after the `#include` declarations, and before the main`int main` loop, we create a class:

```cpp
class Ball {
public:
int x;
int y;
}
```

Doesn't look so terrible huh? This is a class that has two variables - `x` and `y`. These variables are public, so we can change them from outside the class. In the future, we can use private variables, but in this case, we will not use them to simplify the program.

Now let's create a ball object that we can display on the screen. At the beginning of the `int main` function we add an object:

```cpp
Ball ball1;
ball1.x = 10;
ball1.y = 10;
```

- `Ball` - is the name of the class. In cpp, we first need to define what type the object is and then give it a name - for us, it will be ball1.
- `ball1.x = 10;` - this is an initialization of the variable `x` of the object ball1 and assigning it the value 10. To get to the value of an object variable we must use the dot operator `.` A dot after the object name means that we want to access the variable of an object with a name like after the period. In this case, we want to access the `x` variable of the `ball1` object.
- We do the same with the variable `y`.

Now, instead of printing the message `Hello World`, we change the function `mvprintw` as follows, which prints to the screen:

```cpp
mvwprintw(win, ball1.y, ball1.x, "o");
```

As the first argument to the mvprintw function, we pass our window named win, because we want to draw our object in it. Then we give the coordinates - again using the variables of our object, which we have to access using the dot operator `.`
In the last argument, we give `o` - the letter o symbolizes the ball.

Our program now looks like this:

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

We check that it works correctly - compile and run:

```bash
g++ main.cpp -o main.out -lncurses && ./main.out
```

And here is the effect:

![The ball in terminal window](/images/posts/CppNcurses2/3.webp#postMiniImage)

Great, our ball came to the screen!
You've probably noticed a blinking cursor next to our ball - take it easy, we'll get into that in a moment.
Now let's do something extra to better understand why we created the ball class and object.

## Something extra - we create more balls

For object-oriented training, let's now create some new balls and display them on the screen.
In the main loop, after the first ball, we add the next three:

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

And after the mvprintw function we show our three more balls on the screen:

```cpp
mvwprintw(win, ball2.x, ball2.y, "o");
mvwprintw(win, ball3.x, ball3.y, "o");
mvwprintw(win, ball4.x, ball4.y, "o");
```

Effect:

![Four balls in the terminal window](/images/posts/CppNcurses2/4.webp#postMiniImage)

### Let's make the balls move

What are we after four balls if we can't do anything with them? Now let's create a simple loop that will set them in motion:

At the beginning of the file we add:

```cpp
#include <unistd.h>
```

and to the function `main` before the function `getch()`we add a loop:

```cpp
for (int i = 0; i < 70; i++)
{
ball1.y--;
ball2.x++;
ball3.y++;
ball4.x--;
wclear(win);
box(win, 0, 0);
mvwprintw(win, ball1.x, ball1.y, "o");
mvwprintw(win, ball2.x, ball2.y, "o");
mvwprintw(win, ball3.x, ball3.y, "o");
mvwprintw(win, ball4.x, ball4.y, "o");
usleep(50000);
wrefresh(win);
}
```

In this loop, we change the coordinates of the balls on every iteration, then clean the window with `wclear (win)` - to prevent the ball from leaving marks on the screen. Then we display the edges with the box, and finally, draw the balls on the screen. Finally, we put the program to sleep for 50 milliseconds, because without it, the balls will quickly get outside the screen. For the effects to be visible on the screen, we need to call the `wrefresh (win)` function, which will display the contents of the virtual window on the screen.

Our file now looks like this:

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
mvwprintw(win, ball1.x, ball1.y, "o");
mvwprintw(win, ball2.x, ball2.y, "o");
mvwprintw(win, ball3.x, ball3.y, "o");
mvwprintw(win, ball4.x, ball4.y, "o");
wrefresh(win);
for (int i = 0; i < 70; i++)
{
ball1.y--;
ball2.x++;
ball3.y++;
ball4.x--;
wclear(win);
box(win, 0, 0);
mvwprintw(win, ball1.x, ball1.y, "o");
mvwprintw(win, ball2.x, ball2.y, "o");
mvwprintw(win, ball3.x, ball3.y, "o");
mvwprintw(win, ball4.x, ball4.y, "o");
usleep(50000);
wrefresh(win);
}

getch();
return 0;
}
```

And here is the final effect:

![Final look of the program after changes](/images/posts/CppNcurses2/1.webm#postVideo)

## Summary

In this part, we managed to create a simple program in which, using the Ncurses library, we created a screen and displayed objects symbolizing balls on it. We mastered the basics of objectivity by creating a ball class and four objects which we then set in motion. With these foundations, we're on our way to creating a fully functional game.

## Acknowledgements

When creating this post, I used the following sources extensively, which are worth checking out if you want to reinforce your knowledge of Ncurses and other topics that I covered in this post:

[Ncurses Programming HowTo](https://tldp.org/HOWTO/NCURSES-Programming-HOWTO/)
[Ncurses Man Pages](https://invisible-island.net/ncurses/announce.html)
[Ncurses - Linux man page](https://linux.die.net/man/3/ncurses)
[Beautiful explanation of classes and objects](https://www.reddit.com/r/explainlikeimfive/comments/65658b/comment/dg8nxqk/?utm_source=share&utm_medium=web2x&context=3)
