---
title: 'Jak zacząć przygodę z C++ i Ncurses - Cz. 5 - Doxygen' date: '2022-04-10' excerpt: 'W tej części tworzymy
dokumentację do napisanego wcześniej kodu w formacie Doxygen' coverImage: '/images/posts/CppNcurses5/doxygen.webp'
keywords:
- C++
- Ncurses
- Doxygen
- Podstawy

---

![Obraz główny](/images/posts/CppNcurses5/doxygen.webp#postMainImage)

## Spis treści

## Wstęp

W trakcie pisania kodu zapewne zauważyłeś, że tworzyliśmy bloki z komentarzami przed każdą funkcją i być może
zastanawiałeś się, do czego są one potrzebne. W tej części poradnika wyjaśnimy to wszystko — dowiemy się, co to jest
Doxygen i jak z niego korzystać oraz jak wygenerować dokumentację do kodu, który napisaliśmy wcześniej.

## Co to jest Doxygen?

Doxygen to przydatny program, który pozwala na generowanie dokumentacji kodu na podstawie komentarzy. Dzięki temu nie
musisz tworzyć osobnej dokumentacji dla projektu, gdyż wystarczy wstawić odpowiednie komentarze do kodu, a na ich
podstawie program wygeneruje całą strukturę w przystępnej formie w plikach .html. Dzięki niej później łatwiej zrozumieć
nasz kod oraz to jak działają poszczególne funkcje. Dokumentacja taka jest przydatna w licznych przypadkach, ale
niejednokrotnie może się okazać, że także Ty, wracając do własnego kodu po dłuższym czasie, nie będziesz pamiętał, za co
odpowiadają poszczególne funkcje lub fragmenty kodu. Jeśli dobrze udokumentujesz kod, to łatwiej Ci będzie do niego
wrócić w przyszłości. Dodatkowo inne osoby, które być może będą musiały lub chciały pracować z Twoim kodem, będą mogły
łatwiej z niego korzystać i łatwiej im będzie zrozumieć jego strukturę.

## Jak wyglądają komentarze Doxygen

Poniżej wstawię kilka przykładów na to, jak wyglądają komentarze w formacie Doxygen.

Opis klasy:

```cpp
/**
 * @brief Klasa reprezentująca piłkę, którą gracz odbija w trakcie gry
 *
 */
class Ball
{
public:
  int x;       /**< Współrzędna x piłki */
  int y;       /**< Współrzędna y piłki */
  int x_speed; /**< Prędkość piłki w osi X */
  int y_speed; /**< Prędkość piłki w osi Y */
};
```

Opis funkcji:

```cpp
/**
 * @brief Funkcja odpowiedzialna za odbijanie piłki od paletki i ścian
 *
 * @param win wskaźnik na okno gry
 * @param ball referencja do obiektu piłki
 * @param paddle referencja do obiektu paletki
 * @param score referencja do obiektu wyniku
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

Każda funkcja lub klasa opisywana jest w bloku rozpoczynającym komentarz `/**` i kończącym komentarzem `*/`. W tych
blokach możemy zawierać rozmaite słowa kluczowe jak np. `@brief` które opisuje krótko daną funkcję czy `@return`, które
opisuje zwracaną wartość. Słowo kluczowe `@param` opisuje parametry funkcji. Dodatkowo możemy opisywać zmienne lub
funkcje w bloku komentarza `/**<comment>*/`. Pełną listę komend możesz znaleźć
tu: [Lista Komend](https://www.doxygen.nl/manual/commands.html)

## Jak zacząć korzystać z Doxygen?

Aby zacząć korzystać z Doxygen, musimy go najpierw zainstalować.

By to zrobić, trzeba wpisać w okno terminala następujące polecenie:

```bash
sudo apt update
sudo apt install doxygen doxygen-doc graphviz
```

Pierwsze polecenie zaktualizuje bazę danych pakietów, a następne polecenie zainstaluje główną bibliotekę doxygen,
dokumentację oraz graphviz. Doxygen-doc może się przydać, jeśli zechcesz zapoznać się bliżej z dokumentacją biblioteki,
a graphviz jest potrzebny, by wygenerować grafy zależności.

### Doxyfile / Doxyconfig

By skorzystać z Doxygen w naszym projekcie, musimy najpierw wygenerować plik konfiguracyjny (lub użyć istniejącego pliku
konfiguracyjnego, ale zakładam, że zaczynamy od zera, dlatego wygenerujemy nowy plik)

By to zrobić, musimy w folderze z naszym projektem uruchomić polecenie:

```bash
doxygen -g doxyfile
```

Polecenie to stworzy nowy plik konfiguracyjny o nazwie `doxyfile` (choć nazwa jest dowolna i możesz ten plik nazwać jak
chcesz, to pamiętaj, żeby później w kodzie odwoływać się do wybranej nazwy)

![Wygenerowany plik konfiguracyjny](/images/posts/CppNcurses5/doxygenConfig.webp#postMiniImage)

### Uruchamiamy doxygen

By wygenerować dokumentację dla naszego projektu, musimy skorzystać z polecenia

```bash
doxygen doxyfile
```

Po tym w naszym folderze pojawią się pliki z dokumentacją, które znajdziemy w folderach html i latex. Wchodząc do
folderu html, możemy uruchomić znajdujący się tam plik index.html, by wyświetlić zawartą w nim dokumentację:

```bash
cd html
firefox index.html
```

Oczywiście polecenie firefox możesz zastąpić wybraną przez Ciebie przeglądarką internetową. Ewentualnie możesz po prostu
przejść do tego folderu w systemowej przeglądarce plików.

Obecnie w wygenerowanej dokumentacji nie ma zbyt wiele. Wynika to z faktu, że domyślnie Doxygen nie generuje dokumentacji dla plików, które nie zostały celowo opisane za pomocą bloku zawierającego instrukcję @file.

By to zmienić, możemy albo opisać każdy plik po kolei lub użyć opcji `EXTRACT_ALL = TRUE` w pliku konfiguracyjnym. Warto jednak opisać każdy plik, by móć później łatwiej zrozumieć jego zawartość. Dlatego w naszym głównym pliku, w pierwszej linii, jeszcze przed #include dodajmy opis:

```cpp
/**
 * @file main.cpp
 * @author Twoje dane (Ty@TwojaDomena.com)
 * @brief Główny plik programu
 * @version 0.1
 * @date 2022-04-09
 * 
 * @copyright Copyright (c) 2022
 * 
 */
 // Reszta programu...
```

Po dodaniu tego komentarza na początku pliku, nasza dokumentacja będzie już zawierać opis pliku `main.cpp`.

W pliku doxyfile warto też zmienić kilka istotnych opcji — możesz je dopasować wedle swojego uznania. W szczególności
warto wymienić kilka najczęściej przeze mnie używanych:

```doxygen
PROJECT_NAME = "Nazwa projektu"
OUTPUT_DIRECTORY = "docs"
PROJECT_BRIEF = "Opis projektu"
PROJECT_LOGO = "logo.png"
EXTRACT_ALL = TRUE
OUTPUT_LANGUAGE = Polish
USE_MDFILE_AS_MAINPAGE = "README.md"
GENERATE_LATEX = NO
```

Po dokonaniu zmian w pliku Doxyfile ponownie generujemy dokumentację, która będzie się już znajdować w folderze `docs`.
Zwróć uwagę, że w międzyczasie dodałem też plik `logo.png` i `README.md` do projektu. Jeśli ich nie masz, to możesz
zmienić opcję `PROJECT_LOGO = "logo.png"` na `PROJECT_LOGO = ` oraz `USE_MDFILE_AS_MAINPAGE = "README.md"`
na `USE_MDFILE_AS_MAINPAGE = `

```bash
doxygen doxyfile
```

## Podsumowanie

To wszystko! Udało nam się wygenerować dokumentację w formacie Doxygen. Warto jednak zapoznać się z resztą możliwości
konfiguracyjnych dostępnych w programie. W naszym projekcie konieczne jest opisanie pozostałych funkcji i klas, których
nie opisaliśmy wcześniej, ale by nie przeciągać — nie będę ich tu wstawiał, możesz się z nimi zapoznać i ewentualnie
skopiować stąd:

- [Plik main.cpp z opisanymi funkcjami](https://raw.githubusercontent.com/Kielx/ncurses-pong/pl/main.cpp)
- [Plik Doxyfile](https://raw.githubusercontent.com/Kielx/ncurses-pong/pl/doxyfile)

Aktualny kod programu, po wykonaniu tej części poradnika, możesz znaleźć tutaj:

[Kod programu z Doxygen](https://github.com/Kielx/ncurses-pong/tree/pl)

A oto przykład wygenerowanej przez Doxygen strony:

![Wygenerowana dokumentacja Doxygen](/images/posts/CppNcurses5/doxygen.webp#postMiniImage)
