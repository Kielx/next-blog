---
title: 'How to get started with C++ and Ncurses - Part 1 - Introduction'
date: '2022-02-01'
excerpt: 'First part of series on how to create a terminal Pong game in C++ using ncurses. Hands on guide with detailed explanation of the code for beginners.'
coverImage: '/images/posts/How-to-get-started-with-cpp-and-ncurses/1.svg'
keywords:
  - 'C++'
  - 'Ncurses'
  - Basics
---

![Girl playing tennis](/images/posts/How-to-get-started-with-cpp-and-ncurses/1.svg#postMainImage)

## Table of contents

- [Introduction](#introduction)
- [What are we going to create?](#what-are-we-going-to-create)
  - [For what purpose we are going to create this game?](#for-what-purpose-we-are-going-to-create-this-game)
- [What will you need to get started?](#what-will-you-need-to-get-started)
- [Ok, I have installed Ubuntu, what next?](#ok-i-have-installed-ubuntu-what-next)
- [I have installed Ubuntu and VSCode, can I finally write programs?](#i-have-installed-ubuntu-and-vscode-can-i-finally-write-programs)
  - [And what are the commands I have to type in the terminal?](#and-what-are-the-commands-i-have-to-type-in-the-terminal)
  - [And how am I supposed to remember all these commands?](#and-how-am-i-supposed-to-remember-all-these-commands)
  - [Installing the GCC compiler](#installing-the-gcc-compiler)
- [Summary](#summary)

## Introduction

In this post, I will try to help beginners who want to start their adventure with C ++ programming. The goal is to create a simple Pong game in which the player controls the paddle and hits the ball in the terminal window. Each successful bounce means points for the player, while if the ball falls outside the map, you lose. To create this game, we will use the C ++ language and an additional library called NCurses.

## What are we going to create?

![Pong gameplay](/images/posts/How-to-get-started-with-cpp-and-ncurses/2.gif#postMiniImage)

### For what purpose we are going to create this game?

Most tutorials focus either on pure theory - such as how functions and classes work, or only on the practical part of program preparation.

Many times, when reading the documentation, I missed practical examples of using a specific solution and I asked the question - "Well, this is, for example, a class, but what do I need it for? How should I use it in real life (programming)?". It is much easier to understand a specific concept as long as we have a basis to put it into practice.

So should we just focus on practice? There are advantages to this, but then it may turn out that we are just copying exactly what the author of the guide did. As a result - after completing the entire project, when we try to create something of our own, we feel void again.

Therefore, when creating these posts, I want to find a middle ground and combine the right dose of theory with practice for beginners in such a way that they can transfer the acquired knowledge to the ground of new projects.

## What will you need to get started?

Before reading, you should know that I do not assume any programming knowledge on your part. I will try to guide you through all the steps and explain in the simplest possible way what we are going to do.

The only requirement is that you have a working Linux system - which may scare newbies - however, it's not as scary as it may seem. You can read a lot about the advantages of this operating system on the Internet, for example [here](https://itsfoss.com/linux-better-than-windows/). But if this is your first contact with this system, the most convenient way in my opinion is to create a virtual machine with Ubuntu.

What is a Virtual Machine? In simple terms - it is as if our operating system emulated the operation of a new computer, with the parameters we choose, and only on this virtual computer will we install our system. Don't be discouraged - running such a system will take you a few minutes and comes down to three steps - downloading the VirtualBox and installing it, then downloading the ISO image (disc image with the system), and finally installing it on our virtual machine. Thanks to this, we can safely discover what the Linux system offers, and at the same time, we do not have to worry about breaking something. The detailed installation method is described in [How to install Ubuntu on virtualbox] (https://ubuntu.com/tutorials/how-to-run-ubuntu-desktop-on-a-virtual-machine-using-virtualbox#7-tell-us-your-thoughts). The whole process should not take more than a few minutes, depending on your connection speed and hardware capabilities.

## Ok, I have installed Ubuntu, what next?

To write simple programs, basically, any text editor is enough. However, such a solution will be, in short, not optimal. To make better use of our time, it is worth using the Integrated Development Environment (IDE) - a program that allows you to write programs faster and more efficiently. I personally use and recommend Visual Studio Code - it is a light and easy-to-use program that has gained widespread recognition among programmers around the world.

The instruction on [How to download and install Visual Studio Code for Linux can be found here](https://code.visualstudio.com/docs/setup/linux)

## I have installed Ubuntu and VSCode, can I finally write programs?

In theory, yes, but in practice, we need a few more things. First of all, a compiler that you will need to compile our programs. In our case, it will be GCC (GNU Compiler Collection).

What is a compiler and what is it needed for? Simply put - a compiler is a program that translates what we wrote in one programming language into code in another - here into machine code that can be understood and used by a computer. So our work process will be as follows:

1. We will write a program in C++
2. We compile the program written by us, ie we translate it into the machine language using a compiler
3. We run the program and enjoy the results

### And what are the commands I have to type in the terminal?

Good question - at the very beginning of my adventure with Linux, I was wondering what it all meant.

~~~Bash
sudo
~~~

It stands for SuperUser DO - which means doing something as a system administrator. In Windows, during the installation of programs, a window pops up asking us to confirm that we want to install the program as an administrator. There is no such window in Linux, we do it with the Sudo command.

~~~Bash
apt-get install gcc
~~~

Apt-get install - is the command that allows you to install new packages. Packages contain various useful programs that we can use on our system. APT (Advanced Packaging Tool) is the Ubuntu package manager responsible for installing, updating, and removing packages. With the abovementioned command, we pass the command to the terminal to use APT to install the package named GCC here.

### And how am I supposed to remember all these commands?

You don't have to remember them. In the future, I assume two versions of the events:

- You will use these or similar commands frequently enough that you will simply remember them on your own.
- If you do not remember the commands, you can easily find them through an effective Google search. It may be worth writing a separate post about it, but knowing what you want to do, and not knowing the command, just enter the search phrase in google and after a while, you will find information, post, or documentation that shows what you need to do. Just look for the phrase "How to install Ubuntu packages" and a dozen or so pages will pop up, showing you step by step what you need to do.

### Installing the GCC compiler

The first thing we need to do is run the terminal (ctrl + alt + T) and type the command:

~~~Bash
sudo apt-get install gcc
~~~

We still need the necessary tools for compiling our programs and debugging.

With this command, we install the required packages:

~~~Bash
sudo apt-get install build-essential gdb
~~~

Finally, we install the Ncurses library

~~~Bash
sudo apt-get install libncurses5-dev libncursesw5-dev
~~~

## Summary

Congratulations, you have managed to complete all the necessary steps to configure your environment to work with C ++ and Ncurses. In the next section, we'll move on to writing programs and building our game from scratch.
