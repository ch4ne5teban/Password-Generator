const min = 12;
const max = 84;
const passwordLengthInput = document.getElementById('password-length');
passwordLengthInput.addEventListener('change', () => {
  let inputValue = parseInt(passwordLengthInput.value);

  if (inputValue < min) {
    passwordLengthInput.value = min;
  } else if (inputValue > max) {
    passwordLengthInput.value = max;
  }
});

const nonLatinCharsAlert = document.querySelectorAll('.user-alert');
nonLatinCharsAlert.forEach(checkbox => {
  checkbox.addEventListener('change', event => {
    const targetCheckbox = event.target;
    const mightNotWorkAlertMsg = targetCheckbox.nextElementSibling;
    if (targetCheckbox.checked) {
      mightNotWorkAlertMsg.style.display = 'block';
    } else {
      mightNotWorkAlertMsg.style.display = 'none';
    }
  });
});