---
title: "Jak stworzyć grę Pong przy użyciu C++ i biblioteki Ncurses część 2"
date: "2022-01-26"
excerpt: "Pierwsza część serii, gdzie opisuję przebieg tworzenia konsolowej gry Pong przy pomocy języka C++ i biblioteki Ncurses. Praktyczny przewodnik na temat podstaw języka i ich zastosowania w programowaniu."
coverImage: "/images/posts/ncursesPong.gif"
keywords:
  - "C++"
  - "Ncurses"
  - Basics
---
~~~js
console.log('It works!')
console.debug('It works!')
~~~

~~~cpp
#include <iostream>

int main() {
    std::cout << "It works!" << std::endl;
    return 0;
}
~~~

## Sed non ex hendrerit, luctus augue ac, suscipit orci. Donec at ultrices urna. Nulla vel imperdiet nisi, nec viverra nunc. Integer bibendum vestibulum est, nec interdum eros feugiat mattis. Suspendisse commodo nibh a enim facilisis scelerisque. Donec ut facilisis dolor. Duis cursus nec libero quis cursus. In placerat eros lacus, vel pretium quam consectetur eu. Donec id ultrices lectus.

Aenean quis interdum augue. Fusce consequat, est ac rutrum finibus, enim ipsum cursus ex, nec condimentum urna lacus at lectus. In fringilla ullamcorper varius. Praesent id efficitur tortor. Curabitur euismod dolor nec risus consequat, vel tincidunt mi tincidunt. Fusce iaculis sit amet dui eget pretium. Morbi gravida condimentum aliquet. Fusce ac est leo. Maecenas id eros ut quam lacinia sodales sit amet convallis dui. Fusce congue urna purus, sit amet venenatis arcu tincidunt sit amet. Nullam maximus a eros vitae dictum. Fusce vitae magna lectus. Aenean vitae imperdiet lorem. In scelerisque, dui eget venenatis tincidunt, tortor nulla mollis nisl, ut ullamcorper erat turpis vitae urna. Cras sodales eros quis enim scelerisque, sed tincidunt nisl venenatis. Donec in nunc nec mauris tristique tempus.

Fusce vehicula dolor eget dui sodales vestibulum. Integer a sagittis erat, vitae vestibulum elit. Sed orci lectus, mattis non finibus nec, blandit eu felis. Maecenas maximus erat ac diam placerat, vitae lobortis nulla lacinia. In accumsan, nisi pulvinar lobortis maximus, erat orci sagittis velit, at mollis nunc ante eget felis. Nunc et fringilla felis. Fusce ultrices nisi quam, eget faucibus lacus tincidunt et. Sed vel ullamcorper tellus. Etiam consequat tellus a iaculis auctor.

Maecenas sit amet sem pulvinar, finibus risus a, tempor dolor. Nullam dignissim nisi eget neque porta, quis ultricies turpis dignissim. Sed nec malesuada purus. Fusce bibendum tempus dignissim. Cras ac sagittis dolor. Vestibulum eget mi a risus gravida suscipit. Donec sit amet semper felis. Ut aliquam ligula a iaculis auctor. Vivamus viverra sapien purus, non posuere velit scelerisque sit amet. Phasellus eros tellus, semper quis turpis malesuada, porta pretium neque. Fusce ipsum nulla, pellentesque eget magna sit amet, viverra pulvinar orci. Sed fermentum lorem vel tellus vehicula commodo. Pellentesque vulputate velit justo, quis suscipit mauris ultricies in. Curabitur rutrum, lorem id ullamcorper posuere, enim nisi porta dolor, at fringilla ante tellus placerat nunc. Donec fringilla vulputate neque, vitae convallis sapien blandit sed.

Mauris convallis ipsum lorem, ut vestibulum lorem vehicula molestie. Mauris nec efficitur lectus. Nam bibendum sem eget imperdiet ornare. Suspendisse vel varius magna. Fusce non magna risus. Phasellus cursus tristique nibh, id dapibus ante pulvinar id. Aliquam hendrerit blandit quam, eu efficitur tortor imperdiet id. Integer eu justo ex. Suspendisse tincidunt rhoncus scelerisque. Integer ligula purus, sodales non massa et, porta facilisis massa. Curabitur finibus faucibus aliquam. Vivamus leo nisi, consectetur ut molestie vitae, pretium in turpis. Morbi lacus ipsum, fermentum id ex vel, suscipit fermentum lorem. Donec imperdiet convallis ex in rhoncus.

Nullam sodales id orci ac ultrices. Phasellus vestibulum sagittis sapien, scelerisque vehicula massa posuere id. Nam pharetra molestie rhoncus. Vivamus consequat eros nec felis pharetra, at pellentesque lacus aliquet. Fusce consectetur purus sit amet nibh venenatis, in molestie odio gravida. Vivamus at nulla ut nisi eleifend porttitor. Pellentesque tincidunt dui sit amet felis varius accumsan. Suspendisse dapibus, dolor et hendrerit hendrerit, risus dui sagittis magna, ut iaculis ante ex eu sapien. Donec in ante a orci viverra consequat sit amet ut nisl. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum luctus, est nec maximus semper, nibh eros posuere lorem, vitae convallis purus orci ac orci. Phasellus eu tortor quis nunc volutpat facilisis. Cras pharetra non nunc et tempus.

Donec vel dolor nibh. Cras et suscipit leo. Nam mi libero, mattis sed ligula a, vulputate scelerisque arcu. Vivamus id orci at ipsum tristique ullamcorper. Sed eget laoreet eros. Vivamus turpis leo, maximus id arcu at, scelerisque mattis sem. Aenean accumsan odio quis semper venenatis.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare in ante vel pretium. Sed nulla turpis, euismod molestie interdum id, maximus nec ipsum. Vivamus sagittis purus id nunc eleifend, nec ultrices orci rhoncus. Nam at libero luctus, euismod ante sit amet, commodo orci. Sed vel libero augue. Praesent ultrices viverra tortor, volutpat pharetra erat ultricies non. Quisque fringilla velit sit amet finibus cursus. Quisque efficitur enim at ante tempor laoreet.

Aenean interdum molestie libero, at malesuada lorem tempus ut. Donec venenatis sapien id egestas pretium. Suspendisse congue interdum aliquet. Donec placerat maximus turpis, eu porta nibh bibendum sed. Etiam id facilisis leo, at volutpat metus. Quisque consequat dapibus lorem, vel congue dolor posuere vel. Vivamus eu tellus rutrum, porttitor lacus sit amet, convallis dui. Duis volutpat purus elit, sit amet cursus erat semper vitae. Cras id dui a nulla euismod rhoncus. Cras ut semper ligula, eu finibus ipsum. Morbi a augue nec ex ornare tempus vel ut tellus. Curabitur vitae augue urna. Curabitur justo risus, laoreet quis efficitur sit amet, sagittis quis ligula. Maecenas ut egestas tortor. Donec ultrices ipsum at lacus ultrices, vitae vulputate sem egestas.

Suspendisse facilisis egestas purus, in auctor orci. Nam quam ante, luctus sed lacus vitae, rutrum dictum lacus. Phasellus tincidunt blandit elit eu pretium. Nam rutrum consectetur blandit. Maecenas vel ligula in mi venenatis tempus venenatis interdum libero. Quisque dictum ante in viverra iaculis. Donec augue diam, dignissim id turpis non, mollis porta tortor. Fusce nec turpis diam. Proin pretium pellentesque ex, id dictum ante consequat eget. Nulla vehicula quam vitae ante feugiat pretium. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec faucibus nisl ut metus mattis, sagittis auctor lectus rhoncus. Maecenas a nunc odio.

Donec ut lectus eget augue ullamcorper blandit in sit amet elit. Pellentesque pulvinar placerat nisl gravida venenatis. Aliquam ut erat congue, sagittis tortor a, malesuada nisl. Nunc aliquet gravida nisl, at sollicitudin sem fermentum sit amet. Praesent nec lacinia odio. Sed viverra felis ligula, nec rhoncus nisl consequat nec. Nunc sagittis efficitur tellus nec tempus. Nam lobortis venenatis convallis.

Phasellus a nibh ut nisi posuere fermentum non in turpis. Etiam ac tellus nisl. Aenean convallis dui erat, bibendum mattis est semper ac. Praesent justo est, congue quis nisi vitae, laoreet consequat erat. Suspendisse quis ultrices purus. Nulla facilisi. Nullam felis elit, molestie et ligula id, pharetra dictum lacus.

Sed vitae tempus ante, ut sagittis ante. Nam luctus porta massa. Sed tellus eros, eleifend sed fermentum et, elementum non risus. In convallis, urna vitae suscipit consectetur, dolor erat venenatis sem, ac sollicitudin dui dolor nec orci. Integer hendrerit est in ligula convallis mattis. Phasellus lobortis, neque sed placerat imperdiet, quam lorem placerat eros, vel facilisis ante dolor ac leo. Nunc ac diam eu libero pharetra dignissim quis ac risus. In non quam id ante bibendum ultrices. Curabitur a elementum justo. Aenean vel massa nibh. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.

Sed congue, est quis congue rhoncus, urna dolor ullamcorper metus, sed ultrices erat ante posuere mi. Suspendisse vestibulum risus nunc, sit amet sodales orci porttitor vitae. Quisque ac eleifend augue. Maecenas finibus justo id efficitur mollis. Aenean mi ex, tristique quis eleifend id, feugiat eget nulla. Donec sed orci non nisi varius aliquet. Duis sit amet orci ac velit tincidunt gravida at in odio. Ut quis dignissim nisl. Vivamus et condimentum magna. Ut nec congue risus. Curabitur sit amet placerat metus. Maecenas eu erat nec justo scelerisque pellentesque at vel diam. Praesent ac nunc non tellus tristique cursus in a justo. Nunc in mi lorem. Proin rhoncus, nisi id volutpat imperdiet, lectus elit suscipit dui, sed luctus ante nulla vitae nisi.

Nullam non lacus non diam lacinia consequat sed at erat. Donec et leo lacinia, feugiat magna non, commodo lacus. Duis sed venenatis leo. Cras ac porttitor neque. Donec non ex ut lacus sodales interdum et sed urna. Suspendisse id ornare nisi. Phasellus accumsan lacinia elit, sed mattis lorem sollicitudin ut. Vivamus vulputate vel nisi sit amet scelerisque. Integer vestibulum metus vel pellentesque viverra.

Mauris eu eros consequat, pellentesque dui eu, mattis urna. Sed auctor tellus vitae ultrices tristique. Proin id mauris lacus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam non nibh leo. Suspendisse dui velit, faucibus nec dui a, aliquam pharetra velit. Proin luctus efficitur neque, vitae scelerisque velit iaculis sed. Maecenas condimentum malesuada nisl, bibendum rhoncus tellus tincidunt volutpat. Integer sed ullamcorper nulla, nec gravida neque. Aenean sodales aliquet erat, non suscipit metus pulvinar sed. Sed et ipsum sollicitudin lorem tristique lacinia. Mauris nisl sapien, eleifend mollis accumsan vel, gravida id purus.
