const HomeworkService = require('../../src/services/homwork')


describe('Homework Service 테스트', () => {
  test('fetchHTML 테스트', async () => {
    const url = "https://jestjs.io"

    const html = await HomeworkService.fetchHtml(url)

    expect(html).toMatch('jest')
  })

  test('replacePlainText allText type 테스트', async () => {
    const html = `
    <!doctype html>
    <html lang="en" dir="ltr">
    Hello World
    </html>
    `
    const type = 'allText'
    const plainText = HomeworkService.replacePlainText(html, type)

    expect(plainText).toEqual(expect.stringMatching('doctype'))
  })

  test('replacePlainText exceptTag type 테스트', async () => {
    const html = `
    <!doctype html>
    <html lang="en" dir="ltr">
    Hello World
    </html>
    `
    const type = 'exceptTag'
    const plainText = HomeworkService.replacePlainText(html, type)

    expect(plainText).toEqual(expect.not.stringMatching('doctype'))
  })

  test('extractAlphanumeric 테스트', async () => {
    const text = `wld913-4r!ㄱㄹgㅇ`
    const { letters, digits } = HomeworkService.extractAlphanumeric(text)

    expect(letters).toContainEqual(expect.any(String))
    expect(digits).toContainEqual(expect.any(Number))
  })
})
