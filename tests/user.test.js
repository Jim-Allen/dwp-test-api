const supertest = require('supertest')
const app = require('../src/app')
const request = supertest(app)

test('Should get users within 50 miles of London Charing Cross', async done => {
    const res = await request.get('/London/users')

    expect(res.status).toBe(200)
    expect(res.body.length).not.toBe(0)
    expect(res.body[0]).toHaveProperty('id')
    done()
})

test('Should fail with 404 not found due to ', async done => {
    const res = await request.get('/London/wrongpath')

    expect(res.status).toBe(404)
    expect(res.body).toBeUndefined
    done()
})