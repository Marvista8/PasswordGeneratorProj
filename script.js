/*
The user should arrive to the homepage.
The user should be greeted with a welcome page then push the button that leads them to the next page.
They be able to have a choice between uppercase, lowercase, numbers and symbols in their password with the click of a button.
There should be checkboxes that let them decide between the values stated.
The user should be able to select their character length between the slider or enter a number in the number input.
The main header should be able to transform and reveal the password.
EXTRA NOTE event target was not working because was undefined evt pram changed to e and e.target then dot notation to value imput for slider and number input.
Learned about toUppercase today should have used that, lesson learned.
*/

//button for first page leads to the generator.
function nextPage() {
    let nextBtn = document.getElementsByClassName("bgnBtn");
    console.log(nextBtn);
    nextBtn = onclick(location.href="password.html");
}

//These are all of the global elements that are seen and are called by the functions, this includes all the unicode values that were set up.
const charAmountRange = document.getElementById('characterAmountRange')
const charAmountNumber = document.getElementById('characterAmountNumber')
const includeUppercaseEl = document.getElementById('includeUppercase')
const includeNumbersEl = document.getElementById('includeNumbers')
const includeSymbolsEl = document.getElementById('includeSymbols')
const pswdForm = document.getElementById('passwordGeneratorForm')
const passwordDisplay = document.getElementById('passwordDisplay')

//unicode letter, number, and symbol values for arrays (new trick did not know about .concat to combine items)
const uppercaseChars = hiLowArray(65, 90)     //uppercase letters a #97
const lowercaseChars = hiLowArray(97, 122)    //lowercase lettrs A #65
const numberChars = hiLowArray(48, 57)    //numbers 0 - 9 #48 - 57
const symbolChars = hiLowArray(33, 47).concat(        //Symbols #33 - 47 concatenate together to prepare for loop (4 arrays into 1)
  hiLowArray(58, 64)
).concat(
  hiLowArray(91, 96)
).concat(
  hiLowArray(123, 126)
)

//eventlisteners for the inputs to be synced together

charAmountNumber.addEventListener('input', syncCharacterAmount)
charAmountRange.addEventListener('input', syncCharacterAmount)

//form to stop the page refreshing(kept getting error at first needed ot put in default to set values before submit plus testing was a pain without it)

pswdForm.addEventListener('submit', e => {      //using e for event parameter
  e.preventDefault()
  const characterAmount = charAmountNumber.value
  const includeUppercase = includeUppercaseEl.checked       //dom recongised checked mdn:
  const includeNumbers = includeNumbersEl.checked
  const includeSymbols = includeSymbolsEl.checked
  const password = generatePassword(characterAmount, includeUppercase, includeNumbers, includeSymbols)
  passwordDisplay.innerText = password     //Displays the password when clicked(grabs values)
})
//function that combines all of the character code values in a if statment that does the math and prepares for the loop to get random values
function generatePassword(characterAmount, includeUppercase, includeNumbers, includeSymbols) {
  let charCodes = lowercaseChars      //CharCodes takes all strings and numbers and pushes into the pswd characters array (string.fromCharcode(characterCode)) unicode values numbers
  if (includeUppercase) charCodes = charCodes.concat(uppercaseChars)  //might change
  if (includeSymbols) charCodes = charCodes.concat(symbolChars)   //might change
  if (includeNumbers) charCodes = charCodes.concat(numberChars)   //might change
  console.log(uppercaseChars, symbolChars, numberChars);
  const pswdCharacters = []
  for (let i = 0; i < characterAmount; i++) {
    const characterCode = charCodes[Math.floor(Math.random() * charCodes.length)]
    pswdCharacters.push(String.fromCharCode(characterCode))
  }
  return pswdCharacters.join('')      //joins all the values in the checkboxes 
}

function hiLowArray(low, high) {        //low and high gauge for the loop sequence returns the newly created array.
  const array = []                                //declares new array.
  for (let i = low; i <= high; i++) {     //iterates and adds index into array.
    array.push(i)
  }
  return array                //returns array
}

function syncCharacterAmount(e) {     //syncs the inputs together via event.target trigger = value
  const value = e.target.value
  charAmountNumber.value = value
  charAmountRange.value = value
}
