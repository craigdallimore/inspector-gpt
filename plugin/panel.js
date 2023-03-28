const KEY = "OPENAI_API_KEY";

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
async function onSubmit(value) {

  hideErrorMessage();

  if (value === '') {
    showErrorMessage('API key must not be empty!');
  } else {

    const url = "https://api.openai.com/v1/models";

    try {

      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${value}`,
        }
      });

      if (!response.ok) {
        throw "Something went wrong";
      }

      const data = await response.json();

      console.log({data});
      browser.storage.local.set({ [KEY]: value });

      $form.classList.add('is-hidden');
      $main.classList.remove('is-hidden');

    } catch (e) {

      console.error(e);
      showErrorMessage(e.message);

    }


  }

}

$form.addEventListener('submit', (e) => {

  e.preventDefault();
  const value = $input.value.trim();
  onSubmit(value);

});

// ----------------------------------------------------------------------------

function main() {

  browser.storage.local.get(KEY, (result) => {

    if (result[KEY]) {
      $main.classList.remove('is-hidden');
    } else {
      $form.classList.remove('is-hidden');
    }

  });

}

main();
