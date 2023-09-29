import { Module } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { AccountController } from './controllers/account.controller'
import { AuthenticateController } from './controllers/authenticate.controller'
import { QuestionsController } from './controllers/questions.controller'

@Module({
  controllers: [AccountController, AuthenticateController, QuestionsController],
  providers: [PrismaService],
})
export class HttpModule {}
