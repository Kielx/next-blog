---
title: 'How to get started with C++ and Ncurses - Vol. 5 - Doxygen' 
date: '2022-04-10' 
excerpt: 'Time to create documentation for the previously written code in the Doxygen format' 
coverImage: '/images/posts/CppNcurses5/doxygenEN.webp'
keywords:
- C++
- Ncurses
- Doxygen
- Basics
---

![Main Image](/images/posts/CppNcurses5/doxygenEN.webp#postMiniImage)

## Table of Contents

- [Introduction](#introduction)
- [What's Doxygen?](#what-s-doxygen)
- [What Doxygen comments look like](#what-doxygen-comments-look-like)
- [How to start using Doxygen?](#how-to-start-using-doxygen)
  - [Doxyfile](#doxyfile)
  - [Starting Doxygen](#starting-doxygen)
- [Summary](#summary)

## Introduction

As you were writing the code, you probably noticed that we were creating blocks with comments in front of each function,
and maybe you wondered what they are needed for. In this part of the tutorial, we'll explain all of this - we'll find
out what Doxygen is - how to use it and how to generate documentation for the code we wrote earlier.

## What's Doxygen?

Doxygen is a handy program that allows you to generate code documentation from comments. Thanks to this, you don't have to create separate documentation for the project, because you just need to add the appropriate comments inside the code and the program will generate the entire documentation structure in an accessible form. Thanks to such documentation it is easier to understand our code and how each function works. Such documentation is useful in many cases, but eventually, it may turn out that even you, when you return to your own code after a long time, will not remember what specific functions or code fragments were responsible for. If you document the code well, it will be easier for you to
come back to it in the future. Additionally, other people who may have to or want to work with your code will be able to understand it and use more easily

## What Doxygen Comments Look Like

Below, I am going to insert a few examples of what the Doxygen comments look like.

Class description:

```cpp
/**
 * @brief Class representing a ball, that moves around the screen
 *
 */
class Ball
{
public:
  int x;       /**< X coordinate of the ball */
  int y;       /**< Y coordinate of the ball */
  int x_speed; /**< X speed of the ball */
  int y_speed; /**< Y speed of the ball */
};
```

Function description:

```cpp
/**
 * @brief Function responsible for ball bouncing off the walls and paddle
 *
 * @param win - pointer to the game window in which the ball is located
 * @param ball - reference to the ball object
 * @param paddle - reference to the paddle object
 * @param score - reference to the score object
 */
void ball_bounce(WINDOW *win, Ball &ball, Paddle &paddle, int &score)
{
  if (ball.y == getmaxy(win) - 3)
  {
    for (int i = paddle.x; i < paddle.x + paddle.width; i++)
    {
      if (ball.x == i)
      {
        ball.y_speed = -1;
        score++;
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

Each function or class is described in the block that starts with the comment `/**` and ends with the comment `*/`. In these blocks, we can use various keywords such as `@brief` which briefly describes a given function or `@return` which
describes the function return value. The `@param` keyword describes the parameters of the function. Additionally, we can describe the variables or functions in the comment block `/** <comment> */`. You can find the complete list of commands here: [Commands list](https://www.doxygen.nl/manual/commands.html)

## How to start using Doxygen?

To start using Doxygen we need to install it first.

To do this, type the following command in a terminal window:

```bash
sudo apt update
sudo apt install doxygen doxygen-doc graphviz
```

The first command will update the packages database and the next command will install the main doxygen library,
documentation and graphviz. Doxygen-doc may come in handy if you want to read more about the library's documentation,
and graphviz is needed to generate dependency graphs.

### Doxyfile

To use Doxygen in our project, we first need to generate a configuration file (or use an existing
configuration, but I'm assuming we're starting from scratch, so we'll generate a new file)

To do this, we need to run the command in our project folder:

```bash
doxygen -g doxyfile
```

This command will create a new configuration file called `doxyfile` (although the name is optional, and you can name it
as you want, remember to refer to the chosen name later in the code)

![Generated configuration file](/images/posts/CppNcurses5/doxygenConfig.webp#postMiniImage)

### Starting Doxygen

To generate documentation for our project, we need to use the command

```bash
doxygen doxyfile
```

After that, the documentation files will appear in our folder. It can be found in the html and latex folders. Entering the html folder, we can run the index.html file there to view the documentation it contains:

```bash
cd html
firefox index.html
```

Of course, you can replace the firefox command with your chosen web browser. Alternatively you can just
navigate to this folder in the system file browser.

Currently, there is not much in the generated documentation. This is because, by default, Doxygen does not generate
documentation for files that are not explicitly described with a comment block containing the @file statement.

To change this, we can either describe each file in turn or use the `EXTRACT_ALL = TRUE` option in the configuration
file. Please note that, it is worth describing each file to make it easier to understand its content later. Therefore,
in our main file, in the first line, before `#include`, let's add a description:

```cpp
/**
 * @file main.cpp
 * @author Your name (You@YourDomain.com)
 * @brief Main file of Cpp Ncurses Pong game
 * @version 0.1
 * @date 2022-04-09
 * 
 * @copyright Copyright (c) 2022
 * 
 */
 // Reszta programu...
```

After adding this comment at the beginning of the file, our documentation will contain a description of the `main.cpp` file.

There are also some important options in the doxyfile that you should change - but you can adjust them as you see fit. It is worth to mention a few of the most frequently used by me:

```doxygen
PROJECT_NAME = "Cpp Ncurses Pong"
OUTPUT_DIRECTORY = "docs"
PROJECT_BRIEF = "Cpp Ncurses Pong game"
PROJECT_LOGO = "logo.png"
EXTRACT_ALL = TRUE
OUTPUT_LANGUAGE = English
USE_MDFILE_AS_MAINPAGE = "README.md"
GENERATE_LATEX = NO
```

After making changes to the Doxyfile file, we generate the documentation again, which will be located in the `docs` folder.
Note that in the meantime I've also added a `logo.png` and `README.md` files to the project. If you don't have them, you can change an option `PROJECT_LOGO = "logo.png"` to `PROJECT_LOGO = ` and `USE_MDFILE_AS_MAINPAGE = "README.md"`
to `USE_MDFILE_AS_MAINPAGE = `

Then run:

```bash
doxygen doxyfile
```

## Summary

That's all! We managed to generate documentation in the Doxygen format. However, it is worth to spend some more time learning about the rest of the possible configuration options in the program. We have to describe the remaining functions and classes which are not documented in our project, but  for the sake of brevity - I will not insert them here, pointing you to the following links:

- [main.cpp file with function descriptions](https://raw.githubusercontent.com/Kielx/ncurses-pong/master/main.cpp)
- [Doxyfile](https://raw.githubusercontent.com/Kielx/ncurses-pong/master/doxyfile)

The current code of the program, after completing this part of the guide, can be found here:

[Program code with Doxygen documentation](https://github.com/Kielx/ncurses-pong)

Here is an example screenshot of a website generated by Doxygen:

![Doxygen generated documentation](/images/posts/CppNcurses5/doxygenEN.webp#postMiniImage)
