/**
 * 슬라이드 09 시연용 단일 파일 NestJS 앱.
 *
 * 강의 1 #25b의 raw http 결제 핸들러(80줄)를 NestJS로 옮긴 모습.
 * 슬라이드와 똑같은 코드가 그대로 작동하는 걸 보여주는 게 목적입니다.
 *
 * 실행:  yarn demo:aha
 * 포트:  3001 (워크샵 본 서버 3000과 충돌 안 나게)
 */

import 'reflect-metadata'
import { Body, Controller, Module, Post, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { IsInt, IsPositive } from 'class-validator'

// ─── 강의 1 #25b 결제 핸들러 ─ NestJS 버전 ──────────────────────

class CreatePaymentDto {
  @IsInt()
  @IsPositive()
  parkinglotId: number

  @IsInt()
  @IsPositive()
  amount: number
}

@Controller('payments')
class PaymentController {
  @Post()
  pay(@Body() dto: CreatePaymentDto) {
    return {
      paymentId: Date.now(),
      ...dto,
      status: 'PAID',
    }
  }
}

@Module({
  controllers: [PaymentController],
})
class AppModule {}

// ─── 부트스트랩 ──────────────────────────────────────────────────

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))
  await app.listen(3001)
  // eslint-disable-next-line no-console
  console.log('')
  // eslint-disable-next-line no-console
  console.log('  demo-aha · http://localhost:3001')
  // eslint-disable-next-line no-console
  console.log('  강의 1 결제 핸들러 → NestJS 버전 (슬라이드 09 시연용)')
  // eslint-disable-next-line no-console
  console.log('')
  // eslint-disable-next-line no-console
  console.log('  시연 curl:')
  // eslint-disable-next-line no-console
  console.log("    curl -X POST localhost:3001/payments \\")
  // eslint-disable-next-line no-console
  console.log("      -H 'Content-Type: application/json' \\")
  // eslint-disable-next-line no-console
  console.log("      -d '{\"parkinglotId\":1,\"amount\":3000}'")
  // eslint-disable-next-line no-console
  console.log('')
  // eslint-disable-next-line no-console
  console.log('  검증 시연 (400):')
  // eslint-disable-next-line no-console
  console.log("    curl -X POST localhost:3001/payments \\")
  // eslint-disable-next-line no-console
  console.log("      -H 'Content-Type: application/json' \\")
  // eslint-disable-next-line no-console
  console.log("      -d '{\"amount\":-100}'")
  // eslint-disable-next-line no-console
  console.log('')
}
bootstrap()
