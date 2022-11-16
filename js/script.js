/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

const movieDB = {
    movies: [
        'Логан',
        'Лига справедливости',
        'Ла-ла лэнд',
        'Одержимость',
        'Скотт Пилигрим против...',
    ],
};

const adv = document.querySelectorAll('.promo__adv img'),
    bgImage = document.querySelector('.promo__bg'),
    movieList = document.querySelector('.promo__interactive-list'),
    genre = bgImage.querySelector('.promo__genre');

// adv.remove(); if it was one not array it will work
adv.forEach((ad) => {
    ad.remove();
});

genre.textContent = 'драма';
bgImage.style.backgroundImage = 'url("img/bg.jpg")';

movieList.innerHTML = ''; // innerHTML есть только у queryselector

movieDB.movies.sort();
// console.log(bgImage.innerHTML) получать элементы со страницы

movieDB.movies.forEach((movie, i) => {
    movieList.innerHTML += `
    <li class="promo__interactive-item"> ${i + 1}) ${movie}
          <div class="delete"></div>
    </li>
    `;
});
