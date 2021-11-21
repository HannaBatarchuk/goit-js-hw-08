import { throttle } from "lodash";
const LOCALSTORAGE_KEY = 'feedback-form-state';
const inputForm = document.querySelector('.feedback-form');

initForm();

inputForm.addEventListener('input', onFormInputContent);
inputForm.addEventListener('submit', onInputFormSub);
inputForm.addEventListener('change', throttle(onInputChange, 500));

function onFormInputContent(evt) {
    evt.preventDefault();
    const formData = new FormData(inputForm);
    formData.forEach((value, name) => console.log(value, name));
};

function onInputFormSub(evt) {
    localStorage.removeItem(LOCALSTORAGE_KEY);
}

function onInputChange (evt){
    let persistedForm = localStorage.getItem(LOCALSTORAGE_KEY);
    persistedForm = persistedForm ? JSON.parse(persistedForm) : {};
    persistedForm[evt.target.name] = evt.target.value;
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(persistedForm));
}

function initForm(){
let persistedForm = localStorage.getItem(LOCALSTORAGE_KEY);
if(persistedForm){
    persistedForm = JSON.parse(persistedForm);
    Object.entries(persistedForm).forEach(([name, value]) => {
        inputForm.elements[name].value = value;
    });
}
}
