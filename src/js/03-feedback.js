import throttle from 'lodash.throttle';

const inputEl = document.querySelector('input');
const messageEl = document.querySelector('textarea');
const form = document.querySelector('.feedback-form');
const FORM_STATE = 'feedback-form-state';

let formData = {
  email: '',
  message: '',
};

updateForm();

function handleInput(event) {
    const { name, value } = event.target;
    formData[name] = value;
    localStorage.setItem(FORM_STATE, JSON.stringify(formData));
  }
  
  inputEl.addEventListener('input', throttle(handleInput, 500));
  messageEl.addEventListener('input', throttle(handleInput, 500));

messageEl.addEventListener(
  'input',
  throttle(() => {
    formData.message = messageEl.value;
    localStorage.setItem(FORM_STATE, JSON.stringify(formData));
  }, 500)
);

form.addEventListener('submit', handleSubmit);

function updateForm() {
    const formDataJSON = localStorage.getItem(FORM_STATE);

    if (formDataJSON) {
        const formData = JSON.parse(formDataJSON);
        inputEl.value = formData.email;
        messageEl.value = formData.message;
    }
}

function handleSubmit(event) {
  event.preventDefault();

  if (inputEl.value && messageEl.value) {
    console.log(formData);
    localStorage.clear();
    event.currentTarget.reset();
    formData = {
      email: '',
      message: '',
    };
  } else {
    alert('Please make sure all fields are filled!');
  }
}
