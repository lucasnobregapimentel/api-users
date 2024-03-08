import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { InvalidCrendetials } from '../../../use-cases/errors/invalid-credentials-error'
import { app } from '../../../app'
import { makeAuthenticateUseCase } from '../../../use-cases/factories/make-authenticate-use-case'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodyRegister = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodyRegister.parse(request.body)

  try {
    const authenticateUseCase = makeAuthenticateUseCase()

    const { user } = await authenticateUseCase.execute({
      email,
      password,
    })

    const token = app.jwt.sign(
      {
        name: user.name,
      },
      {
        sub: user.id,
        expiresIn: '7 days',
      },
    )

    return {
      token,
    }
  } catch (err) {
    if (err instanceof InvalidCrendetials) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
