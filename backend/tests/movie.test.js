const request = require('supertest')
jest.mock('../src/services/registermail', () => ({
  sendRegistrationConfirmationEmail: jest.fn().mockResolvedValue(true),
}))
const app = require('../src/app')
const User = require('../src/models/user')

describe('Movie', () => {
  it('Create a new user named Jenny', async () => {
    const firstName = 'Jenny'
    const surName = 'Smith'
    const email = `jenny.${Date.now()}@example.com`
    const password = 'Test1234!'
    const expectedOutput = {
      firstName,
      surName,
      watched: [],
      watch: [],
      reviews: [],
    }

    const actualOutput = await request(app).post('/users').send({ firstName, surName, email, password })

    expect(actualOutput.body.firstName).toBe(expectedOutput.firstName)
    expect(actualOutput.body.surName).toBe(expectedOutput.surName)
    expect(actualOutput.body.watched).toEqual(expectedOutput.watched)
    expect(actualOutput.body.watch).toEqual(expectedOutput.watch)
    expect(actualOutput.body).toMatchObject(expectedOutput)
  })
})
