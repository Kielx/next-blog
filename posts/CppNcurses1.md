---
title: 'How to get started with C++ and Ncurses - Vol. 1 - Introduction'
date: '2022-02-01'
excerpt: The first part of the series, where I describe the process of creating a console game Pong using the C++ language and the Ncurses library. A practical guide to the basics of the language and their application to programming.
coverImage: '/images/posts/CppNcurses1/1b-opt.webm'
keywords:
  - 'C++'
  - 'Ncurses'
  - Basics
---

![What does the game look like](/images/posts/CppNcurses1/1b-opt.webm#postVideo)

## Table of contents

- [Introduction](#introduction)
- [What are we going to create?](#what-are-we-going-to-create)
  - [Who is this guide for and why are we going to create this game?](#who-is-this-guide-for-and-why-are-we-going-to-create-this-game)
- [What will you need to get started?](#what-will-you-need-to-get-started)
- [Ok, I have installed Ubuntu, what next?](#ok-i-have-installed-ubuntu-what-next)
- [I have installed Ubuntu and VSCode, can I finally write programs?](#i-have-installed-ubuntu-and-vscode-can-i-finally-write-programs)
  - [And what are the commands I have to type in the terminal?](#and-what-are-the-commands-i-have-to-type-in-the-terminal)
  - [And how am I supposed to remember all these commands?](#and-how-am-i-supposed-to-remember-all-these-commands)
  - [We install the GCC compiler](#we-install-the-gcc-compiler)
  - [Let's create a code file](#lets-create-a-code-file)
- [Compile and run](#compile-and-run)
- [Classic Hello World](#classic-hello-world)
  - [What has changed?](#what-has-changed)
- [Summary](#summary)
- [Second part of the Tutorial](#second-part-of-the-tutorial)

## Introduction

In this post, I will try to help beginners who want to start their adventure with C++ programming.
This post can be seen as a prequel to the main game development process. It briefly describes the main steps you need to take to prepare for creating a game. This is by no means a complete guide to the language and its functions, but rather a short intro to its use in programming. The additional materials and documentation for the language are included in the summary of the post.

## What are we going to create?

The goal is to create a simple Pong game in which the player controls the paddle and hits the ball in the terminal window. Each successful bounce means points for the player, while if the ball falls outside the map, you lose. To create this game, we will use the C++ language and an additional library called NCurses.

### Who is this guide for and why are we going to create this game?

Perhaps you are a novice programmer who is already familiar with the main syntax of the language and would like to easily translate it into practical applications. Maybe you are a student who needs to create something with Ncurses in the course of his studies. Anyway, I hope what I wrote will help you in your further development and in achieving your goals.

Most tutorials focus either on pure theory - such as how functions and classes work, or only on the practical part of program preparation.

Many times, when reading the documentation, I missed practical examples of using a specific solution and I asked the question - "Well, this is a class, but what do I need it for? How should I use it in real life (programming)?". It is much easier to understand a specific concept as long as we have a basis to put it into practice.

So should we just focus on practice? There are advantages to this, but then it may turn out that we are just copying exactly what the author of the guide did. As a result - after completing the entire project, when we try to create something of our own, we feel void again.

Therefore, when creating these posts, I want to a middle ground and combine the right dose of theory with practice for beginners in such a way that they can transfer the acquired knowledge to the ground of new projects.

## What will you need to get started?

Before reading, please know that I do not assume any programming knowledge on your part. I will try to guide you through all the steps and explain in the simplest possible way what we are going to do.

The only requirement is that you have a working Linux system - which might put a newbie away - however, it's not as scary as it might seem at first. You can read a lot about the advantages of this operating system on the Internet, for example [here](https://itsfoss.com/linux-better-than-windows/). But if this is your first contact with this system, the most convenient way in my opinion is to create a virtual machine with Ubuntu.

What is a Virtual Machine? In simple terms - it is as if our operating system emulated the operation of a new computer, with the parameters we choose, and only on this virtual computer will we install our system. Don't be discouraged - launching such a system will take you a few minutes and basically comes down to three steps - downloading Virtualbox and installing it, then downloading the ISO image (disc image with the system), and finally installing it on our virtual machine. Thanks to this, we can safely discover what the Linux system offers, and at the same time, we do not have to worry about breaking something. The detailed installation method is described here [How to install Linux on virtualbox](https://ubuntu.com/tutorials/how-to-run-ubuntu-desktop-on-a-virtual-machine-using-virtualbox#1-overview). The whole process should not take more than a few minutes, depending on your connection speed and hardware capabilities.

## Ok, I have installed Ubuntu, what next?

To write programs, basically any text editor is enough for us. However, such a solution will be, in short, not optimal. To make better use of our time, it is worth using the help of the Integrated Development Environment (IDE) - a program that allows you to write programs faster and more efficiently. I personally use and recommend Visual Studio Code - it is a light and easy-to-use program that has gained widespread recognition among programmers around the world.

The instruction [How to download and install Visual Studio Code for Linux can be found here](https://code.visualstudio.com/docs/setup/linux)

You can usually launch the terminal by using the ctrl + alt + T shortcut. Alternatively, you can find it in the main programs menu. If you have a problem with the instructions above and your distribution supports Snap packages (Ubuntu supports them), you can install Visual Studio Code with the command

```Bash
sudo snap install code --classic
```

## I have installed Ubuntu and VSCode, can I finally write programs?

In theory, yes, but in practice, we need a few more things. First of all, a compiler that you will need to compile our programs. In our case, it will be GCC (GNU Compiler Collection).

What is a compiler and what is it needed for? Simply put - a compiler is a program that translates what we wrote in one programming language into code in another - here into machine code that can be understood and used by a computer. So our work process will be as follows:

1. We will write a program in C++
2. We compile the program written by our program, ie we translate it into the machine language using a compiler
3. We run the program and enjoy the results

### And what are the commands I have to type in the terminal?

Good question - at the very beginning of my adventure with Linux I was wondering what it all meant.

```Bash
sudo
```

It stands for SuperUser DO - which means doing something as the system administrator. In Windows, during the installation of programs, a window pops up asking us to confirm that we want to install the program as an administrator. There is no such window in Linux, we do it with the sudo command.

```Bash
apt-get install gcc
```

This is the command that allows you to install packages. Packages contain various useful programs that we can use on our system. APT (Advanced Packaging Tool) is the Ubuntu package manager responsible for installing, updating, and removing packages. In the above-mentioned command, we pass the command to the terminal to use APT to install the package with the specified name - in this case, GCC, which is a package that contains the compiler program.

### And how am I supposed to remember all these commands?

You don't have to remember them. In the future, I assume two versions of the events:

- You will use these or similar commands frequently enough that you will simply remember them.
- If you do not remember the commands, you can easily find them through an effective Google search. Maybe it's worth writing a separate post about it, but knowing what you want to do, and not knowing the command, just enter the search phrase in Google and after a while you will find information, post or documentation that shows what you need to do. Just look for the phrase "How to install Ubuntu packages" and a dozen or so pages will pop up, showing you step by step what you need to do.

### We install the GCC compiler

The first thing we need to do is run the terminal (ctrl + alt + T) and type the command:

```Bash
sudo apt-get install gcc
```

We also need tools for compiling our programs and debugging.

With this command, we install the required packages:

```Bash
sudo apt-get install build-essential gdb
```

Finally, we install the Ncurses library

```Bash
sudo apt-get install libncurses5-dev libncursesw5-dev
```

Congratulations, you have managed to complete all the necessary steps to configure your environment to work with C++ and Ncurses. In the next section, we'll move on to writing programs and building our game from scratch.

If you need to quickly install all the packages that are necessary for compiling and running the program, use the following command in the terminal, which you can open with the Ctrl + Alt + T shortcut:

```Bash
sudo apt-get install gcc build-essential gdb libncurses5-dev libncursesw5-dev
```

### Let's create a code file

If you haven't already closed the terminal, you can use it to create a projects folder and a new file called `main.cpp` as follows:

```Bash
mkdir ~/projects/CppNcurses
cd ~/projects/CppNcurses
touch main.cpp
```

Then enter the following command to open VSCode in it:

```Bash
code main.cpp
```

Alternatively, you can also open VSCode with the `code` command or by finding it in the main 'start' menu.
When you open the program, you'll see a welcome screen that should resemble something like this:

![VSCode welcome screen](/images/posts/CppNcurses1/2.webp#postMiniImage)

From this screen, select Open Folder:

![Create a new folder](/images/posts/CppNcurses1/3.webp#postMiniImage)

Then it is always a good idea to create a separate folder for our projects and in it another folder for a particular project:

![Create a new folder2](/images/posts/CppNcurses1/4.webp#postMiniImage)

So I'm assuming you've successfully created a projects folder and a CppNcurses folder in it, which you then need to select and open.

After you create a folder and try to open it, a screen may appear asking if you trust the authors of the files in that folder. My tacit assumption is that you trust yourself, so click on OK.

![Warning from VSCode](/images/posts/CppNcurses1/5.webp#postMiniImage)

Now we create our file on which we will work

![Create new file](/images/posts/CppNcurses1/6.webp#postMiniImage)

After creating a new file, we need to create the main function that handles our program.
Let's create this function - in the new window enter:

```Cpp
int main()
{
return 0;
}
```

It sounds quite enigmatic - but what you see above is the main function of the program. Every program has to start and end somewhere, which is what the main function is responsible for. Imagine that a function is just a piece of code that we can execute at a certain point in time and reuse.

Let's break down what we wrote into prime factors. What I wrote above can be represented symbolically in this way - (in square brackets I wrote what is what):

```Cpp
[Type of return value by the function][Name of the function]([List of arguments])
{
[Function code]
[Return Value];
}
```

- **`Type of the value returned by the function`** - here it is `int` - before its name, each function must define what type of data it will return. This lets the compiler know what to expect at the end of the function. The developers decided that the main function needed to return an integer value, so we typed int.
- **`Function name`** - here `main` - the main function must always be called main, other functions can be called (almost) arbitrarily, there are a few rules that we have to follow, but we will get to this when we start creating other functions.
- **`List of arguments`** - which must be in parentheses - At the moment we don't have to pass anything as an argument.
- **`{}`** - curly braces inside which the function code must be.
- **`Return value`** - the keyword`return` must appear and what value is returned must follow so - 0 in our case, which means nothing else than that the main function has been executed correctly.
- **;** - A very important part of each program are semicolons, which indicate the end of a given code fragment. Without them, the program will not work and the compiler will display an error.

If what you read above seems complicated, remember that you can always come back to this post later, or type in the search engine a phrase, for example, "C++ main function", and then you will find a lot of materials to refresh your syntax.

Remember that programming is not about memorizing the syntax of a language. Sooner or later you will remember it anyway. It is much more important that you remember certain concepts, such as in this case - the main function - and then, if necessary, be able to find them yourself. If you forget how to create a main function in C++, just Google it. Likewise with all other parts of the language.

After entering the above code, save the file.

## Compile and run

To compile the program we wrote, we need to enter the following command in the terminal:

```Bash
g ++ main.cpp -o main.out
```

Let's break it down into prime factors to know what we're dealing with:

```Bash
[Command Name] [Name of the file we want to compile] [Flags] [Name of the output file]
```

- **`Command name`** - for us`g ++`- the command that runs the g ++ compiler
- **`Name of the file we want to compile`** - with us`main.cpp` - or another name of the file that contains the code of our program
- **`Flags`** - with us`-o` - this way in most commands we can pass arguments with which a given program is to be called. Normally, if you run g++ and specify an input file name (e.g. `main.cpp`) the compiler output file will be named`a.out`, thanks to the `-o` flag we can rename the output file.
- **`Name of the output file`** - here`main.out` - but you can name this file anything you want. Linux, unlike Windows, doesn't care what extension the output file has.

In Visual Studio Code, we can open a terminal in the main window using the Ctrl + ` keyboard shortcut (the key is usually on the left 1 and under the ESC key).

![Terminal opening in VSCode](/images/posts/CppNcurses1/7.webp#postMiniImage)

After compiling the program, we can run it with the following command:

```Bash
./main.out
```

- **`./`** - this means that we run the program from the current directory.
- **`main.out`** - is the name of the output file that has been compiled.

![Starting the first program](/images/posts/CppNcurses1/8.webp#postMiniImage)

You may not see it, but we just compiled and ran our first program. There is nothing in it, so the console looks empty. It's time to change it - the classic way.

## Classic Hello World

It has been accepted in the programming world that learning programming begins with writing Hello World. Let's do it this time - we need to make the following changes to our program:

```Cpp
#include <iostream>

int main () {
std::cout << "Hello World!" << std::endl;
return 0;
}
```

We will now compile and run the program as before, and in a moment I will explain what has changed:

```Bash
g++ main.cpp -o main.out && ./main.out
```

Here I combined the previous two commands with the double sign Ampersand. The Linux shell reads this character as a logical AND operator - without going into the details - thus combining two commands, the second of which will only run if the first is executed correctly.

And here is the result of our program:

![Terminal opening in VSCode](/images/posts/CppNcurses1/9.webp#postMiniImage)

### What has changed?

The following changes have been made to the program code

- **`# include <iostream>`** - This line adds the library `<iostream>` to our program. It is an abbreviation of Input-Output Stream. A library is a collection of functions, classes, and other useful tools that someone else wrote that we can use in our program to carry out specific activities. Thanks to this, we do not have to rewrite all functionalities, and we can use those that have been created and tested earlier by others. Instead of writing our own function to output text, we can use functions from the library like for example `std::cout`.

- **`std::cout << "Hello World!" << std::endl;`** - This line prints the text`Hello World!`to the screen. A lot of new stuff comes up here - `std::` is a combination of two things - the so-called namespace type in this case, `std` and the scope operator `::`. Imagine that in your program, you created the function count() and you want to use another library, where its author also named his function count(). What now? Which function will be called? To avoid such problems, we use a namespace, which is something like a collective name - or rather a prefix - for the name of all functions in it. To use standard library functions such as `cout`, we need to add the scope operator `std::` first, which ultimately gives us `std::cout`. Further to `std::cout`, with the `<<` operator, we pass the text we want to display, i.e.`Hello World`, and then again with the `<<` operator, we pass `std::endl` - that is, the end of the line. If we were to add another text now, it will be displayed on a new line, e.g. like this (note that the semicolon `;` is also moved to the end of the line):

```Cpp
#include <iostream>

int main() {
std::cout << "Hello World!" << std::endl << " and more..." ;
return 0;
}
```

Compile and run

```Bash
g++ main.cpp -o main.out && ./main.out
```

And the effect:

![Effect of compilation and running of new program](/images/posts/CppNcurses1/11.webp#postMiniImage)

## Summary

As I wrote at the beginning, this text is only a minimal introduction to the language and it definitely does not cover all the functions and options it offers. Nevertheless, after completing all these steps, you should have a prepared environment and elementary knowledge to be able to perform the next steps that I will describe in the coming posts.

This is my first post, so it is possible that there were bugs in it, so if you reveal any, please contact me. Perhaps you have any comments, suggestions for improvement, or some sections are described vaguely or plainly wrong - in that case, please contact me and I will try to fix it.

I hope this post will be helpful, and if you want to deepen your knowledge of the things that I have described, you will find a lot of materials and documentation along with tutorials at the following links:

- <https://en.cppreference.com/w/>
- <https://www.cplusplus.com/reference/>

## Second Part of the Tutorial

You can see the second part of the Tutorial here: [How to get started with C++ and Ncurses - Vol. 2 - Screen and ball](/posts/CppNcurses2)
