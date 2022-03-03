/*
The user should arrive to the homepage.
The user should be greeted with a welcome page then push the button that leads them to the next page.
They be able to have a choice between uppercase, lowercase, numbers and symbols in their password with the click of a button.
There should be checkboxes that let them decide between the values stated.
The user should be able to select their character length between the slider or enter a number in the number input.
The main header should be able to transform and reveal the password.
*/

//button for first page
function nextPage() {
    let nextPageBtn = document.getElementsByClassName("bgnBtn");
    console.log(nextPageBtn);
    nextPageBtn = onclick(location.href="/password.html");
}

//These are all of the global elements that are seen and are called by the functions, this includes all the unicode values that were set up.
const characterAmountRange = document.getElementById('characterAmountRange')
const characterAmountNumber = document.getElementById('characterAmountNumber')
const includeUppercaseElement = document.getElementById('includeUppercase')
const includeNumbersElement = document.getElementById('includeNumbers')
const includeSymbolsElement = document.getElementById('includeSymbols')
const form = document.getElementById('passwordGeneratorForm')
const passwordDisplay = document.getElementById('passwordDisplay')
//unicode letter, number, and symbol values for arrays (new trick did not know about .concat to combine items)
const UPPERCASE_CHAR_CODES = arrayFromLowToHigh(65, 90)
const LOWERCASE_CHAR_CODES = arrayFromLowToHigh(97, 122)
const NUMBER_CHAR_CODES = arrayFromLowToHigh(48, 57)
const SYMBOL_CHAR_CODES = arrayFromLowToHigh(33, 47).concat(
  arrayFromLowToHigh(58, 64)
).concat(
  arrayFromLowToHigh(91, 96)
).concat(
  arrayFromLowToHigh(123, 126)
)
//eventlisteners for the inputs to be synced together

characterAmountNumber.addEventListener('input', syncCharacterAmount)
characterAmountRange.addEventListener('input', syncCharacterAmount)

//form to stop the page refreshing(kept getting error at first needed ot put in default to set values before submit plus testing was a pain without it)

form.addEventListener('submit', e => {      //using e for event parameter
  e.preventDefault()
  const characterAmount = characterAmountNumber.value
  const includeUppercase = includeUppercaseElement.checked
  const includeNumbers = includeNumbersElement.checked
  const includeSymbols = includeSymbolsElement.checked
  const password = generatePassword(characterAmount, includeUppercase, includeNumbers, includeSymbols)
  passwordDisplay.innerText = password     //Displays the password when clicked(grabs values)
})
//function that combines all of the character code values in a if statment that does the math and prepares for the loop to get random values
function generatePassword(characterAmount, includeUppercase, includeNumbers, includeSymbols) {
  let charCodes = LOWERCASE_CHAR_CODES
  if (includeUppercase) charCodes = charCodes.concat(UPPERCASE_CHAR_CODES)
  if (includeSymbols) charCodes = charCodes.concat(SYMBOL_CHAR_CODES)
  if (includeNumbers) charCodes = charCodes.concat(NUMBER_CHAR_CODES)
  
  const passwordCharacters = []
  for (let i = 0; i < characterAmount; i++) {
    const characterCode = charCodes[Math.floor(Math.random() * charCodes.length)]
    passwordCharacters.push(String.fromCharCode(characterCode))
  }
  return passwordCharacters.join('')
}

function arrayFromLowToHigh(low, high) {        //low and high gauge for the loop sequence returns the newly created array.
  const array = []
  for (let i = low; i <= high; i++) {
    array.push(i)
  }
  return array
}

function syncCharacterAmount(e) {
  const value = e.target.value
  characterAmountNumber.value = value
  characterAmountRange.value = value
}
