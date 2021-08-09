const axios = require('axios')
class HomeworkService {
  async getHomeworkData(url, type, amount){
    const html = await this.fetchHtml(url)
    const plainText = this.replacePlainText(html, type)
    const { letters, digits } = this.extractAlphanumeric(plainText)
    const ascendLetters = this.ascendSortLetters(letters)
    const ascendDigits = this.ascendSortDigits(digits)
    const result = this.mixAlphanumeric(ascendLetters, ascendDigits)
    return this.divide(result.length, amount)
  }

  async fetchHtml(url){
    const response = await axios.get(url)
    return response?.data
  }

  replacePlainText(html, type){
    const regexTotal = /(<([^>]+)>)/ig;
    const regexExceptTag = /(<)|(\/?>)/gi

    return type === 'total'
      ? html.replace(regexTotal, '')
      : html.replace(regexExceptTag, '')
  }

  extractAlphanumeric(text){
    const NotLetterAndDigit = /[^a-zA-Z0-9]+/g
    const splitLetterAndDigit = /[a-zA-Z]+|[0-9]+/g

    return text
      .replace(NotLetterAndDigit, '')
      .match(splitLetterAndDigit)
      .reduce(
        (acc, cur) => {
          isNaN(Number(cur))
            ? acc.letters.push(cur)
            : acc.digits.push(Number(cur))

          return acc
        },
        {
          letters: [],
          digits: []
        })
  }

  ascendSortLetters(letters){
    return letters
      .join('')
      .split('')
      .sort((a, b) => {
        const compare =  a.toLowerCase().localeCompare(b.toLowerCase())
          if(compare === 0){
            return a.toUpperCase() === a ? -1 : 1
          }
          return compare
      })
  }

  ascendSortDigits(digits){
    return digits
      .join('')
      .split('')
      .sort((a, b) => a - b)
  }

  mixAlphanumeric(letters, digits){
    const letterSize = letters.length
    const digitSize = digits.length

    if(!letterSize)
      return digits.join('')
    if(!digitSize)
      return letters.join('')

    const mix = letters
      .map((letter, index) => `${letter}${digits[index] ?? ''}`)
      .join('')

    if(letterSize < digitSize){
      const restDigits = digits
        .slice(letterSize, digitSize)
        .join('')
      return `${mix}${restDigits}`
    }
    return mix
  }

  divide(x, y){
    return {
      quota: parseInt(x / y),
      remainder: x % y
    }
  }

}

module.exports = new HomeworkService()
