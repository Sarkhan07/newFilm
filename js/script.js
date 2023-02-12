/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

window.addEventListener('DOMContentLoaded', () => {
    // чтобы страница загружалась
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
        genre = bgImage.querySelector('.promo__genre'),
        addForm = document.querySelector('form.add'), // я имею форму у которой есть класс add
        addInput = addForm.querySelector('.adding__input'), // in html => <input class="adding__input" type="text" placeholder="Что уже посмотрено...?">
        del = document.querySelector('.delete'),
        checkbox = addForm.querySelector('[type="checkbox"]'), // in index.html it's written so <input type="checkbox">
        formInput = addForm.querySelector('.adding__input');

    const sortArr = (arr) => {
        arr.sort();
    };

    addForm.addEventListener('submit', (event) => {
        // когда это форма то пишем событие submit
        event.preventDefault();

        let newFilm = addInput.value; //то что ввел пользователь

        const favorite = checkbox.checked; // Checked отмечено или нет то есть булиновое значение

        // чтобы когда не пишешь что-то а субмитишь просто нумерации не пошло

        if (newFilm) {
            if (newFilm.length > 21) {
                newFilm = `${newFilm.substring(0, 22)}...`; //возвращает только с 0 до 21 а дальше ставится ...
            }

            if (favorite) {
                console.log('Добавляем любимый фильм');
            }
            // если в инпут ничего не нписать это пустая строка и это false
            movieDB.movies.push(newFilm); // который ввел пользователь сразу попадает

            sortArr(movieDB.movies);

            createMovieList(movieDB.movies, movieList);
        }

        // addForm.reset();
        event.target.reset(); // target это относится к объекту над котором происходит событие, а reset чтобы очистить форму
    });

    // adv.remove(); if it was one not array it will work it's good solution do everything
    const deleteAdv = (arr) => {
        arr.forEach((ad) => {
            ad.remove();
        });
    };

    const makeChanges = () => {
        genre.textContent = 'драма';
        bgImage.style.backgroundImage = 'url("img/bg.jpg")';
    };

    function createMovieList(films, parent) {
        // какой родительский блок будет использовать все это фильмы
        parent.innerHTML = ''; // it was ex => movieList.innerHTML = ''; // innerHTML есть только у queryselector
        sortArr(movieDB.movies); // чтобы сразу и сортировася массив
        // console.log(bgImage.innerHTML) получать элементы со страницы

        films.forEach((movie, i) => {
            // it was ex => movieDB.movies.forEach((movie, i) => {
            parent.innerHTML += `
            <li class="promo__interactive-item"> ${i + 1}) ${movie}
                  <div class="delete"></div>
            </li>
            `;
        });

        document.querySelectorAll('.delete').forEach((btn, i) => {
            // то есть класс delete внутри item, то удаляем родителя
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                movieDB.movies.splice(i, 1); // вырезает опреденный элемент с массива, логика такая что пишем с какого элемента начинать и сколько удалить, а так как наверху уже идет нумерация и поэтому удаление на странице и в массиве происходит одновременно

                createMovieList(films, parent); // рекурсия чтобы отсортировался вызываем функцию
            });
        });
    }

    createMovieList(movieDB.movies, movieList); // это функция сперва вызывается когда страница загружается

    deleteAdv(adv);
    makeChanges();
});
