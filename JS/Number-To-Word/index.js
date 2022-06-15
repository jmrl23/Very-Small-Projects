// convert to word
const getWord = n => {
  const tens   = ['Ten', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety']
  const teens  = ['Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen']
  const ones   = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine']
  if (n === 0) { return '' }
  if (n > 99 && n < 1000) {
    const firstDigit = getWord(Math.floor(n / 100))
    const leftDigits = getWord(Math.floor(n % 100))
    return `${firstDigit} Hundred ${leftDigits}`.trim()
  }
  if (n > 10 && n < 20) { return teens[n - 11] }
  if (n < 10) { return ones[n - 1] }
  if (n > 9) {
    let output = tens[Math.floor(n / 10) - 1]
    if (n % 10 > 0) { output += ' ' + ones[n % 10 - 1] }
    return output
  }
  return ''
}

// get level
const getLevel = n => {
  const length = `${n}`.length
  if (length > 15) { return { suffix: 'Quadrillion', zero: 15 } }
  if (length > 12) { return { suffix: 'Trillion',    zero: 12 } }
  if (length > 9)  { return { suffix: 'Brillion',    zero: 9  } }
  if (length > 6)  { return { suffix: 'Million',     zero: 6  } }
  if (length > 3)  { return { suffix: 'Thousand',    zero: 3  } }
  if (length > 2)  { return { suffix: 'Hundred',     zero: 2  } }
  return null
}

// output
const output = n => {
  if (input === 0) { return 'Zero' }
  const result = isNegative ? ['Negative'] : []
  while (n > 0) {
    const level = getLevel(n)
    const length = `${n}`.length
    if (level === null || level.suffix === 'Hundred') {
      result.push(getWord(n))
      n = 0
      continue
    }
    const { suffix, zero } = level
    const base = Number(1 + 'e+' + zero)
    const word = getWord(Math.floor(n / base))
    n = n % base
    result.push(word, suffix)
  }
  return result.join(' ')
}

const prompt = require('prompt-sync')({ sigint: true })
let input = prompt('Enter a number: ')

// no input
if (!input) { return }

// convert to integer
input = Number.parseInt(input)

// negate
const isNegative = input < 0
if (isNegative) { input *= -1 }

// validate
if (Number.isNaN(input) || input > Number.MAX_SAFE_INTEGER) { return console.log('invalid') }

// output
console.log('Result:', output(input))