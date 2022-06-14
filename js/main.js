//таби
//получения елементов
const tabContents = document.querySelectorAll(".tabcontent");
const tabheader__items = document.querySelectorAll('.tabheader__item');
//спрятать таби
const hideTabFunc = () => {
    tabContents.forEach((e) => {
        e.classList.remove('tabcontent__active');
    });
    tabheader__items.forEach((e) => {
        e.classList.remove('active');
    });
}
//показать таби
const showActiveTab = (number) => {
    tabContents[number].classList.add('tabcontent__active');
    tabheader__items[number].classList.add('active');
}
//функционал
tabheader__items.forEach((v, b) => {
    v.addEventListener('click', () => {
        hideTabFunc();
        showActiveTab(b)
    })
})
//таймер
//получения елементов страници
const days = document.querySelector('#days');
const hours = document.querySelector('#hours');
const minutes = document.querySelector('#minutes');
const seconds = document.querySelector('#seconds');

// 13.02.2022/
//день конца таймера
const endDay = new Date(2022, 1, 13);
//функция по добавлению нуля к цифрам
const getZero = (num) => {
    if (num < 10) {
        return `0${num}`
    } else {
        return num;
    }
}
//основная функция
const timerFunction = () => {
    const nowTime = new Date();
    //получения разници между концом и сегодняшним временим
    const differenceTime = new Date(endDay - nowTime);
    //изменения значений на сайте
    days.innerHTML = `${getZero(differenceTime.getDate())}`;
    hours.innerHTML = `${getZero(differenceTime.getHours())}`;
    minutes.innerHTML = `${getZero(differenceTime.getMinutes())}`;
    seconds.innerHTML = `${getZero(differenceTime.getSeconds())}`;
}
timerFunction()
setInterval(timerFunction, 1000);

//modal window
//получения необходимих елементов страници(глобальні переменнв)
const modalWindow = document.querySelector('.modal');
const buttons = document.querySelectorAll('[data-open]');
let thanksModal;
let previousModalDialog = document.querySelector('.modal__dialog');

//функция откривания окна 
const openModal = () => {
    modalWindow.style.display = 'block';
    document.body.style.overflow = 'hidden';
    clearTimeout(openTime);

}
//функция закривания окна
const closeModal = () => {
    modalWindow.style.display = 'none';
    document.body.style.overflowY = 'scroll';
    previousModalDialog.classList.remove('hide');
    thanksModal.remove();

}
//открития окна по кнопке на сайте
buttons.forEach((e) => {
    e.addEventListener('click', () => {
        openModal()
        clearInterval(openModal);
    })
})
//открития окна после 5 секунд
const openTime = setTimeout(openModal, 5000);
//открития модального окна после скрола до конца страници
const scrollOpeningModal = () => {
    if (Math.round(window.pageYOffset + document.documentElement.clientHeight) >= document.documentElement.scrollHeight) {
        openModal()
        // window.removeEventListener('scroll',scrollOpeningModal)
    }
}
window.addEventListener('scroll', scrollOpeningModal)
//закрития окна по хрестику
//закрития по клику мимо окна
modalWindow.addEventListener('click', (e) => {
    if (e.target === modalWindow || e.target.getAttribute('data-close') == '') {
        closeModal();
    }
})
//закрития окна по кнопке escape
document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && modalWindow.style.display === 'block') {
        closeModal();
        console.log('dsfkjhaf');
    }
})

//class 
//Створення шаблону
class MenuCard {
    constructor(img, alt, title, description, price, parenSelector) {
        this.img = img;
        this.alt = alt;
        this.title = title;
        this.description = description;
        this.price = price;
        this.parenSelector = document.querySelector(parenSelector);
    }
    createCard() {
        const div = document.createElement('div');
        div.innerHTML = `
                 <div class="menu__item">
                    <img src="${this.img}" alt=${this.alt}>
                    <h3 class="menu__item-subtitle">Меню "${this.title}"</h3>
                    <div class="menu__item-descr">${this.description} </div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
                </div>
        `
        this.parenSelector.append(div);
    }
}
//створення карточок з данних із сервера за допомогою бібліотеки axios 
axios.get('http://localhost:3000/menu')
    .then(data => data.data.forEach((e => {
        new MenuCard(
            e.img,
            e.altimg,
            e.title,
            e.descr,
            e.price * 30,
            '.menu .container'
        ).createCard();
    })))


//forms 
var forms = document.querySelectorAll('form');
//Об'єкт повідомлень статусу форми
const message = {
    loading: 'Загрузка',
    success: 'Скоро ми с вами свяжемся',
    failure: 'Что-то пошло не так'
}
//Відправка данних з форм
forms.forEach((item) => {
    postDate(item);
    inputLocalStorage(item);
    putInputLocalStorage(item);
});
//Функція відправки данних
function postDate(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formDate = new FormData(form);
        object = {};
        formDate.forEach((e, w) => {
            object[w] = e;
        });
        fetch('server.php', {
            method: "POST",
            headers: {
                'Conten-type': "application/json"
            },
            body: JSON.stringify(object)
        })
            .then(data => data.text())
            .then((data) => {
                console.log(data)
                showThankModal(message.success)
            })
            .catch(() => {
                showThankModal(message.failure)
            }).finally(() => {
                form.reset();
                localStorage.clear();
            })
    });
}
//Показ подяки після відправки данних
function showThankModal(status) {
    modalWindow.style.display = 'block';
    document.body.style.overflow = 'hidden';
    previousModalDialog.classList.add('hide');
    thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
        <div class="modal__content">
            <div data-close class="modal__close">&times;</div>
            <div class="modal__title">${status}</div>
        </div>
        `
    modalWindow.append(thanksModal);

}


//слайдер
const slider = document.querySelector('.offer__slider')
const sliders = document.querySelectorAll('.offer__slide');
const arrowLeft = document.querySelector('.offer__slider-prev');
const arrowRight = document.querySelector('.offer__slider-next');
const currentCouter = document.querySelector('#current');
const total = document.querySelector('#total')
let couter = 0;
//кеш для слайдера 
if (localStorage.getItem('counter')) {
    couter = +localStorage.getItem('counter')
}
//загальна кількість слайдів
total.innerHTML = `0${sliders.length}`;
//показ номеру слайдера
currentCouter.innerHTML = `0${couter + 1}`;
//Ховання слайдерів
const hideSlide = () => {
    sliders.forEach((e) => {
        e.classList.remove('offer__slide--active');
    });
};
//Показування слайдерів
const showSlide = (couter) => {
    sliders[couter].classList.add('offer__slide--active');
};
//Розрахунок індекса слайдера який будуть показувати
const couterPluse = () => {
    ++couter
    if (couter > (sliders.length - 1)) {
        couter = 0;
    };
    //запис кешу
    localStorage.setItem('counter', couter);
};
const couterMinuse = () => {
    --couter
    if (couter < 0) {
        couter = sliders.length - 1;
    };
    //запис кешу
    localStorage.setItem('counter', couter);
};
//створення навігації слайдера, точки
const createNavButton = (counter) => {
    //контейнер
    let sliderNav = document.createElement('div');
    sliderNav.classList.add('sliderNav');
    //точки
    for (let i = 0; i < counter; i++) {
        let navButton = document.createElement('div');
        navButton.classList.add('navButton');
        sliderNav.append(navButton);
    };
    slider.append(sliderNav);
};
createNavButton(sliders.length);
//функція показу слайда при кліку на навігаційну кнопку
const activeButton = (number) => {
    navButtons.forEach(element => {
        element.classList.remove('navButton-active');
    });
    navButtons[number].classList.add('navButton-active');
};
//Масив усіх ствренних навігаційних кнопок ;
const navButtons = document.querySelectorAll('.navButton');
//функція нажимання на навігаційну кнопку 
navButtons.forEach((element, number) => {
    element.addEventListener('click', () => {
        activeButton(number);
        //функціонал по показу слайдерів на кнопки
        hideSlide();
        showSlide(number);
        //counter
        currentCouter.innerHTML = `0${number + 1}`;
    });
});
//Функціонал при кліку на кнопк
const eventOnButtonsInSlider = (button) => {
    button.addEventListener('click', () => {
        if (button === arrowLeft) {
            couterMinuse();
        } else {
            couterPluse();
        }
        currentCouter.innerHTML = `0${couter + 1}`;
        activeButton(couter);

        hideSlide();
        showSlide(couter);
    });
};
activeButton(couter);
showSlide(couter);
eventOnButtonsInSlider(arrowLeft);
eventOnButtonsInSlider(arrowRight);

//добавлення у local storage данні з input 
function inputLocalStorage(form) {
    form.querySelectorAll('input').forEach((e, r) => {
        e.addEventListener('input', () => {
            localStorage.setItem(`${r}input`, e.value);
        })
    });
}
//вивід данних input при перезапуску сторінки з local storage 
function putInputLocalStorage(form) {
    if (localStorage.getItem('0input') && localStorage.getItem('1input')) {
        let firstInput = localStorage.getItem('0input')
        let secondInput = localStorage.getItem('1input')
        form.querySelectorAll('input').forEach((e, r) => {
            if (r == 0) {
                form[0].value = firstInput;
            } else {
                form[1].value = secondInput;
            }
        });
    }
}



//Калькулятор
//Отримання усіх елементів
let height = document.querySelector('#height').value || 1;
let weight = document.querySelector('#weight').value || 1;
let age = document.querySelector('#age').value || 1;
let calories = document.querySelector('.calculating__result').firstElementChild;
const allInputsInCalculator = document.querySelectorAll('input.calculating__choose-item');

//добавлення кнопкам активного класу(зелений колір)
let activeButtons = document.querySelectorAll('.calculating__choose-item_active');
const jj = document.querySelector('.calculating__choose-small');
const dd = document.querySelector('.calculating__choose-big');
function togleClass(block) {
    block.querySelectorAll('.calculating__choose-item').forEach(e => {
        e.addEventListener('click', (element) => {
            block.querySelectorAll('.calculating__choose-item').forEach(e => {
                e.classList.remove('calculating__choose-item_active')
            });
            e.classList.add('calculating__choose-item_active')
            //Записування у let список активних кнопок для розрахункової функції у якості аргумента 
            activeButtons = document.querySelectorAll('.calculating__choose-item_active')
            //розразунок калорій
            mainFunctionCalculating(...activeButtons);

        })
    })
}
togleClass(jj)
togleClass(dd)

//слідкування за інпутом+ добавлення данних з нього у let 
allInputsInCalculator.forEach(element => {
    element.addEventListener('input', (e) => {
        switch (e.target.getAttribute('id')) {
            case 'height':
                height = +e.target.value;
                break;
            case 'weight':
                weight = +e.target.value;
                break;
            case 'age':
                age = +e.target.value;
                break;
        }
        //розразунок калорій
        mainFunctionCalculating(...activeButtons);

    })
})
//розразунок калорій
function mainFunctionCalculating(a, b) {
    a = a.getAttribute('data-gender');
    b = +b.getAttribute('data-active');
    if (a === 'male') {
        const sum = 66 + (13.7 * weight) + (5 * height) - (6.7 * age)
        calories.textContent = Math.round(sum * b);
    } else {
        const sum = 65 + (9, 5 * +weight) + (1, 8 * +height) - (4, 7 * +age);
        calories.textContent = Math.round(sum * b)
    }
}

