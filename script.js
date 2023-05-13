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