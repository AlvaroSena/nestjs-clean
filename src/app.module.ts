import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { AccountController } from './controllers/account.controller'
import { AuthenticateController } from './controllers/authenticate.controller'
import { QuestionsController } from './controllers/questions.controller'
import { envSchema } from './env'
import { PrismaService } from './prisma/prisma.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
  ],
  controllers: [AccountController, AuthenticateController, QuestionsController],
  providers: [PrismaService],
})
export class AppModule {}
