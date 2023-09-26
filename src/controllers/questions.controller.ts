import { Controller, Post, UseGuards, Body, Get, Query } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { CurrentUser } from 'src/auth/current-user.decorator'
import { UserPayload } from 'src/auth/jwt.strategy'
import { z } from 'zod'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { PrismaService } from 'src/prisma/prisma.service'

const createQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string(),
})

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const bodyValidationPipe = new ZodValidationPipe(createQuestionBodySchema)
const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>
type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class QuestionsController {
  constructor(private prisma: PrismaService) {}

  @Post()
  async createQuestion(
    @Body(bodyValidationPipe) body: CreateQuestionBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { title, content } = body
    const { sub: userId } = user

    await this.prisma.question.create({
      data: {
        title,
        content,
        slug: this.convertToSlug(title),
        authorId: userId,
      },
    })
  }

  @Get()
  async listRecentQuestions(
    @Query('page', queryValidationPipe) page: PageQueryParamSchema,
  ) {
    const perPage = 1

    const questions = await this.prisma.question.findMany({
      take: perPage,
      skip: (page - 1) * perPage,
      orderBy: {
        createdAt: 'desc',
      },
    })

    return {
      questions,
    }
  }

  private convertToSlug(input: string): string {
    const sanitizedString = input
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, '-')
      .trim()

    return sanitizedString
  }
}
