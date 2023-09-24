import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { AccountController } from './controllers/account.controller'
import { PrismaService } from './prisma/prisma.service'

@Module({
  imports: [AuthModule],
  controllers: [AccountController],
  providers: [PrismaService],
})
export class AppModule {}
