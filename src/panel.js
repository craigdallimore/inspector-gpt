const $form = document.getElementById('api-key-form');
const $input = $form.querySelector('input');
const $error = document.getElementById('error');

function hideErrorMessage() {
  $error.classList.add('is-hidden');
}

/**
  * @param {string} message
  */
function showErrorMessage(message) {
  $error.classList.remove('is-hidden');
  $error.textContent = message;
}

/**
  * @param {string} value
  */
function onSubmit(value) {

  hideErrorMessage();

  if (value === '') {
    showErrorMessage('API key must not be empty');
  }

}

$form.addEventListener('submit', (e) => {

  e.preventDefault();
  const value = $input.value.trim();
  onSubmit(value);

});
