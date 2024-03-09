import axios from 'axios'
import { app } from '../../../app'
import { env } from 'src/env'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register a user', async () => {
    const response = await axios.post(`http://localhost:${env.PORT}/users`, {
      name: 'John Doe',
      email: 'johndoeregister@example.com',
      password: '123456',
    })

    expect(response.status).toEqual(201)
  })
})
