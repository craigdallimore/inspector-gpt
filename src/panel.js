const $form = document.getElementById('api-key-form');
const $input = $form.querySelector('input');
const $error = document.getElementById('error');
const $main = document.querySelector('main');

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
    showErrorMessage('API key must not be empty!');
  } else {
    browser.storage.local.set({ OPENAI_API_KEY: value });
    $form.classList.add('is-hidden');
    $main.classList.remove('is-hidden');
  }

}

$form.addEventListener('submit', (e) => {

  e.preventDefault();
  const value = $input.value.trim();
  onSubmit(value);

});

// ----------------------------------------------------------------------------

function main() {

  browser.storage.local.get("OPENAI_API_KEY", (result) => {
    console.log(result.key);

    if (result.key) {
      $main.classList.remove('is-hidden');
      console.log(result.key);
    } else {
      $form.classList.remove('is-hidden');
    }

  });

}

main();
