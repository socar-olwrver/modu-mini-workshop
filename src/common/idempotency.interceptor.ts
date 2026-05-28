import {
  CallHandler,
  ConflictException,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { Observable, of, tap } from 'rxjs'
import { RedisLike } from './redis.mock'

/**
 * 같은 Idempotency-Key 두 번 = 결제 한 번.
 * 강의 1 #11에서 약속, #26에서 race·Redis NX 단서 던진 거.
 *
 * 흐름
 *  ① 캐시된 응답 있으면 그대로 (핸들러 호출 안 함)
 *  ② SET key NX EX 60 — 원자적 락. 동시 요청이면 둘 중 하나만 통과
 *  ③ 핸들러 실행 + 응답을 24h TTL로 캐시
 */
@Injectable()
export class IdempotencyInterceptor implements NestInterceptor {
  constructor(@Inject('REDIS') private readonly redis: RedisLike) {}

  async intercept(
    ctx: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const req = ctx.switchToHttp().getRequest()
    const key = req.headers['idempotency-key']
    if (!key) return next.handle()

    // ① 이전 응답이 있으면 그대로
    const cached = await this.redis.get(`idem:${key}`)
    if (cached) return of(JSON.parse(cached))

    // ② 원자적 락
    const acquired = await this.redis.set(`lock:${key}`, '1', 'NX', 'EX', 60)
    if (!acquired) {
      throw new ConflictException('동시에 같은 키로 두 요청')
    }

    // ③ 응답 캐시
    return next.handle().pipe(
      tap(async (result) => {
        await this.redis.set(`idem:${key}`, JSON.stringify(result), 'EX', 86400)
      }),
    )
  }
}
