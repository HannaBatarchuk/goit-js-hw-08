import { throttle } from "lodash";
// ключ до локального сховища
const LOCALSTORAGE_KEY = 'feedback-form-state'; 
const inputForm = document.querySelector('.feedback-form');
let localStorageFormData = {};

// при першому завантаженні сторінки перевіряємо чи є якісь дані в localstorage
initForm();

inputForm.addEventListener('input', onFormInputContent);
inputForm.addEventListener('submit', onInputFormSub);
inputForm.addEventListener('change', throttle(onInputChange, 500));

// за допомогою FormData збираємо дані із усіх полів,
// за допомогою методу forEach отримуємо ці дані у вигляді об'єкту
function onFormInputContent(evt) {
    evt.preventDefault();
    const formData = new FormData(inputForm);
    formData.forEach((value, name) => console.log(value, name));
};

// - прослуховуємо зміни в формі за допомогою 'change';
// - cтворюємо окрему перемінну з пустим об'єктом, в якому будемо зберігати дані із форми;
// - [evt.target.name] = evt.target.value; - це значення input, якому відповідає значення textarea;
// - зберігаємо отримані значення в сховище за допомогою setItem, приводимо ці значення у вигляд рядка,
// оскільки ми працюємо з об'єктом;
// - виводимо в консоль для перевірки;

function onInputChange (evt){
    localStorageFormData[evt.target.name] = evt.target.value;
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(localStorageFormData));
    console.log('Отримані дані з форми:', localStorageFormData);

    //варіант, якщо не використовувати пустий об'єкт:
    // let persistedForm = localStorage.getItem(LOCALSTORAGE_KEY);
    // persistedForm = persistedForm ? JSON.parse(persistedForm) : {};
    // persistedForm[evt.target.name] = evt.target.value;
    // localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(persistedForm));
}
// - очищаємо дані в локальному сховищі та формі
function onInputFormSub(evt) {
    localStorage.removeItem(LOCALSTORAGE_KEY);
}

// - отримуємо дані зі сховища
// - перевіряємо чи є дані в сховищі і якщо там щось було, парсимо дані 
// - за допомогою методу об'єкта Object.entries() створюємо масив даних і перебираємо його за допомогою 
// forEach(), визначаємо значення які були збережені в пам'яті і додаємо їх назад у форму

function initForm(){
let persistedForm = localStorage.getItem(LOCALSTORAGE_KEY);
console.log('Збережені дані в сховищі:', persistedForm);
if(persistedForm){
        persistedForm = JSON.parse(persistedForm);
        Object.entries(persistedForm).forEach(([name, value]) => {
        localStorageFormData[name] = value;
        inputForm.elements[name].value = value;
        });
    }   
}



// якщо треба зберігати дані лише з одного поля форми
// import { throttle } from "lodash";

// const STORAGE_KEY = 'feedback-form-state';

// const refs = {
//     form: document.querySelector('.feedback-form'),
//     textarea: document.querySelector('.feedback-form textarea')
// };

// refs.form.addEventListener('submit', onFormSubmit);
// refs.textarea.addEventListener('input', throttle(onTextAreaInput, 500));

// // при першому завантаженні сторінки перевіряємо чи є якісь дані в localstorage
// initForm();

// // - отримуємо значення інпуту та textarea
// // - зберігаємо це значення в localstorage
// function onTextAreaInput(evt){
//     const message = evt.target.value;
//     localStorage.setItem(STORAGE_KEY, message);
// }

// // - відміняємо поведінку за замовчуванням при сабміті
// // - видаляємо повідомлення із localstorage
// // - очищаємо форму
// function onFormSubmit(evt) {
//     evt.preventDefault();
//     evt.currentTarget.reset();
//     localStorage.removeItem(STORAGE_KEY);
//     console.log('Дані відправлено! Форма очищена.')
// }
// // - отримуємо дані зі сховища
// // - якщо там щось було - оновлюємо DOM
// function initForm() {
//     const savedMessage = localStorage.getItem(STORAGE_KEY);
//     if (savedMessage) {
//         console.log('Збережені дані в локальному сховищі:', savedMessage);
//         refs.textarea.value = savedMessage;
//     }
// }