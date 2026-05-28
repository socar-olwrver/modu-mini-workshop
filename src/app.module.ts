import { Module } from '@nestjs/common'
import { InMemoryRedis } from './common/redis.mock'
import { ParkinglotModule } from './parkinglots/parkinglot.module'
import { ParkingSessionModule } from './sessions/parking-session.module'

@Module({
  imports: [
    ParkinglotModule,
    ParkingSessionModule,
    // Step 5: PaymentModule
  ],
  controllers: [],
  providers: [
    // Step 6에서 Interceptor가 주입받아 쓰는 가짜 Redis
    // 실제 서비스에선 ioredis 같은 클라이언트로 갈아낀다고 생각하면 됩니다
    {
      provide: 'REDIS',
      useValue: new InMemoryRedis(),
    },
  ],
})
export class AppModule {}
