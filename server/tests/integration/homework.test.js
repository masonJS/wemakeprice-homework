const request = require('supertest');
const httpStatus = require('http-status');
const config = require('../../src/config')
const server = request(`http://localhost:${config.port}/`)

describe('Homework API 테스트', () => {
  describe('POST /homework', () => {
    let homeWork;
    beforeAll(() => {
      homeWork = {
        url: "https://jestjs.io",
        type: "except",
        amount: 10
      }
    })

    test('성공 테스트', async () => {
      const res = await server
        .post('api/homework')
        .send(homeWork)
        .expect(httpStatus.OK)

      expect(res.body).toEqual(expect.objectContaining({
        quota: expect.any(Number),
        remainder: expect.any(Number)
      }))
    })

    test('실패 테스트', async () => {
      homeWork.type = 10

      await server
        .post('api/homework')
        .send(homeWork)
        .expect(httpStatus.BAD_REQUEST)
    })

  })
})
