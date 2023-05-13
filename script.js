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

const numPwdSlider = document.getElementById('num-passwords-slider');
const numPwdValue = document.getElementById('num-passwords-value');
numPwdValue.textContent = numPwdSlider.value;
numPwdSlider.oninput = function () {
  numPwdValue.textContent = this.value;
}

const genPwdBtn = document.getElementById('generate-password');
const passwordOutput = document.getElementById('password-output');

const hideAlertMsgOnSelect = document.querySelectorAll('.hide-on-select');
hideAlertMsgOnSelect.forEach(checkbox => {
  checkbox.addEventListener('change', () => {
    const noCharSelectedAlertMsg = genPwdBtn.previousElementSibling;
    noCharSelectedAlertMsg.style.display = 'none';
  });
});

genPwdBtn.addEventListener('click', initialize);

function initialize() {
  const passwordLength = parseInt(document.getElementById('password-length').value);
  const useLowerCase = document.getElementById('lower-case').checked;
  const useUpperCase = document.getElementById('upper-case').checked;
  const useNumbers = document.getElementById('numbers').checked;
  const useCommonSpecial = document.getElementById('common-special').checked;
  const useOtherSpecial = document.getElementById('other-special').checked;
  const useGreekLetters = document.getElementById('greek').checked;
  const useHindiLetters = document.getElementById('hindi').checked;
  const useJapaneseHiragana = document.getElementById('japanese').checked;

  passwordOutput.textContent = '';

  const noCharSelectedAlertMsg = genPwdBtn.previousElementSibling;
  if (!(useLowerCase || useUpperCase || useNumbers || useCommonSpecial || useOtherSpecial || useGreekLetters || useHindiLetters || useJapaneseHiragana)) {
    noCharSelectedAlertMsg.style.display = 'block';
    return;
  }

  for (let i = 0; i < numPwdValue.textContent; i++) {
    const passwordResult = document.createElement('div');
    passwordResult.textContent = renderPassword(passwordLength, useLowerCase, useUpperCase, useNumbers, useCommonSpecial, useOtherSpecial, useGreekLetters, useHindiLetters, useJapaneseHiragana);
    passwordResult.classList.add('password-result');
    passwordResult.addEventListener('click', () => {
      navigator.clipboard.writeText(passwordResult.textContent);
      passwordResult.textContent = "Copied to clipboard!";
    });
    passwordOutput.appendChild(passwordResult);
  }
}

function renderPassword(length, useLowerCase, useUpperCase, useNumbers, useCommonSpecial, useOtherSpecial, useGreekLetters, useHindiLetters, useJapaneseHiragana) {
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';
  const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const commonSpecialChars = '!@#$%^&*()';
  const otherSpecialChars = '`~-_=+[{]}\\|;:\'",<.>/?';
  const greekLetters = "ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρστυφχψω";
  const hindiLetters = "अआइईउऊएऐओऔकखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसह";
  const japaneseHiragana = "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん";

  let characterSet = '';
  if (useUpperCase) characterSet += upperCaseLetters;
  if (useLowerCase) characterSet += lowerCaseLetters;
  if (useNumbers) characterSet += numbers;
  if (useCommonSpecial) characterSet += commonSpecialChars;
  if (useOtherSpecial) characterSet += otherSpecialChars;
  if (useGreekLetters) characterSet += greekLetters;
  if (useHindiLetters) characterSet += hindiLetters;
  if (useJapaneseHiragana) characterSet += japaneseHiragana;

  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characterSet.length);
    password += characterSet[randomIndex];
  }
  return password;
}