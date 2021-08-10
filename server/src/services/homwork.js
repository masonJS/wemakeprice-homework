const axios = require('axios')
const logger = require('../loaders/logger')

const REGEX = {
  allText: /(<)|(\/?>)/gi,
  exceptTag: /(<([^>]+)>)/ig,
  notLetterAndDigit:  /[^a-zA-Z0-9]+/g,
  splitLetterAndDigit: /[a-zA-Z]+|[0-9]+/g
}

class HomeworkService {
  async getHomeworkData(url, type, amount){

    const html = await this.fetchHtml(url)

    const plainText = this.replacePlainText(html, type)
    // 영어, 문자만 출력
    const { letters, digits } = this.extractAlphanumeric(plainText)
    // 오름 차순 정렬
    const ascendLetters = this.sortLettersAscend(letters)
    const ascendDigits = this.sortDigitsAscend(digits)
    // 영어 숫자 Mix
    const result = this.mixAlphanumeric(ascendLetters, ascendDigits)
    // 출력 묶음 단위
    return this.divide(result.length, amount)
  }

  async fetchHtml(url){
    try{
      const response = await axios.get(url)
      if(!response?.data)
        throw new Error('No fetch Data')
      return response?.data
    } catch (e){
      logger.error(e)
      throw e
    }
  }

  replacePlainText(html, type){

    return type === 'allText'
      ? html.replace(REGEX.allText, '')
      : html.replace(REGEX.exceptTag, '')
  }

  extractAlphanumeric(text){

    return text
      .replace(REGEX.notLetterAndDigit, '')
      .match(REGEX.splitLetterAndDigit)
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

  sortLettersAscend(letters){

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

  sortDigitsAscend(digits){

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
