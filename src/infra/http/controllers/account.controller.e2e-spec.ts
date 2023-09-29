import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('Account (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)

    await app.init()
  })

  test('[POST] /accounts', async () => {
    const response = await request(app.getHttpServer()).post('/accounts').send({
      name: 'John Doe',
      email: 'joedoe@example.com',
      password: '123456',
    })

    expect(response.statusCode).toBe(201)

    const userWasSavedInTheDatabase = await prisma.user.findUnique({
      where: {
        email: 'joedoe@example.com',
      },
    })

    expect(userWasSavedInTheDatabase).toBeTruthy()
  })
})
