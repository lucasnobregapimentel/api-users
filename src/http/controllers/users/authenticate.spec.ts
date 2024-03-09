import axios from 'axios'
import { app } from '../../../app'
import { env } from '../../../env'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able authenticate a user', async () => {
    await axios.post(`http://localhost:${env.PORT}/users`, {
      name: 'John Doe',
      email: 'johndoeauthenticate@example.com',
      password: '123456',
    })

    const response = await axios.post(
      `http://localhost:${env.PORT}/users/sessions`,
      {
        email: 'johndoeauthenticate@example.com',
        password: '123456',
      },
    )

    expect(response.status).toEqual(200)
    expect(response.data).toEqual({
      token: expect.any(String),
    })
  })
})
