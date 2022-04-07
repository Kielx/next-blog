---
title: 'Jak zacząć przygodę z C++ i Ncurses - Cz. 5 - Doxygen' date: '2022-04-10' excerpt: 'W tej części tworzymy
dokumentację do napisanego wcześniej kodu w formacie Doxygen' coverImage: '/images/posts/CppNcurses5/main.svg' keywords:
- C++
- Ncurses
- Doxygen
- Podstawy

---

![Obraz główny](/images/posts/CppNcurses5/main.svg#postMiniImage)

## Spis treści

## Wstęp

W trakcie pisania kodu zapewne zauważyłeś, że tworzyliśmy bloki z komentarzami przed każdą funkcją i być może
zastanawiałeś się, do czego są one potrzebne. W tej części poradnika wyjaśnimy to wszystko — dowiemy się, co to jest
Doxygen i jak z niego korzystać oraz jak wygenerować dokumentację do kodu, który napisaliśmy wcześniej.

## Co to jest Doxygen?

Doxygen to przydatny program, który pozwala na generowanie dokumentacji kodu na podstawie komentarzy. Dzięki niej
później łatwiej zrozumieć nasz kod oraz to jak działają poszczególne funkcje. Dokumentacja taka jest przydatna w
licznych przypadkach, ale niejednokrotnie może się okazać, że także Ty, wracając do własnego kodu po dłuższym czasie,
nie będziesz pamiętał, za co odpowiadają poszczególne funkcje lub fragmenty kodu. Jeśli dobrze udokumentujesz kod, to
łatwiej Ci będzie do niego wrócić w przyszłości. Dodatkowo inne osoby, które być może będą musiały lub chciały pracować
z Twoim kodem, będą mogły łatwiej z niego korzystać i łatwiej im będzie zrozumieć jego strukturę.

## Jak zacząć korzystać z Doxygen?

Aby zacząć korzystać z Doxygen, musimy go najpierw zainstalować.

By to zrobić trzeba wpisać w okno terminala następujące polecenie:

```bash
sudo apt install doxygen doxygen-doc graphviz
```

To polecenie zainstaluje główną bibliotekę doxygen, dokumentację oraz graphviz, który później możemy użyć by wygenerować grafy zależności.

### Doxyfile / Doxyconfig

By korzystać z Doxygen w naszym projekcie musimy najpierw wygenerować plik konfiguracyjny (lub użyć istniejącego, ale zakładam, że zaczynamy od zera)

By to zrobić musimy w folderze z naszym projektem uruchomić polecenie:

```bash
doxygen -g doxyfile
```

Polecenie to stworzy nowy plik konfiguracyjny o nazwie `doxyfile` (choć nazwa jest dowolna i możesz go nazwać jak chcesz)

### Uruchamiamy doxygen

By wygenerować dokumentację dla naszego projektu musimy skorzystać z polecenia 

```bash
doxygen doxyfile
```

Po tym w naszym folderze pojawią się pliki z dokumentacją, które znajdziemy w folderach html i latex. Wchodząc do folderu html możemy uruchomić znajdujący się tam plik index.html by wyświetlić zawartą w nim dokumentację:

```bash
cd html
firefox index.html
```

W chwili obecnej nie ma w tym pliku zbyt wiele. By to zmienić musimy dokonać pewnych zmian w pliku konfiguracyjnym. Wrócmy do katalogu głównego naszego projektu i edytujmy plik doxyfile, który wygenerowaliśmy wczesniej. 


## Źródła

Tworząc tego posta, korzystałem intensywnie z poniższych źródeł, które warto sprawdzić, jeśli chcesz pogłębić swoją
wiedzę na temat Ncurses i innych tematów, które poruszałem w tym poście:

- [Film Mirosława Zelenta na temat Rekurencji](https://www.youtube.com/watch?v=jNi_X5bvmQ0)
- [Ncurses Programming HowTo](https://tldp.org/HOWTO/NCURSES-Programming-HOWTO/)
- [Ncurses Man Pages](https://invisible-island.net/ncurses/announce.html)
- [Ncurses - Linux man page](https://linux.die.net/man/3/ncurses)
