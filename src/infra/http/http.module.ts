import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { AccountController } from './controllers/account.controller'
import { AuthenticateController } from './controllers/authenticate.controller'
import { QuestionsController } from './controllers/questions.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [AccountController, AuthenticateController, QuestionsController],
})
export class HttpModule {}
