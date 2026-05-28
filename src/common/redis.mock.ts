/**
 * 워크샵용 인메모리 Redis 흉내.
 *
 * Step 6의 IdempotencyInterceptor가 SET NX EX를 쓸 수 있게 최소 시그니처만 맞췄습니다.
 * 강의 1 #26에서 던진 "Redis SET key val NX EX 86400"이 여기서 작동합니다.
 *
 * 실제 운영에서는 ioredis 등으로 갈아끼우면 끝. 인터페이스가 같아서 호출부 안 바뀝니다.
 */
export interface RedisLike {
  get(key: string): Promise<string | null>
  set(key: string, val: string, ...args: any[]): Promise<'OK' | null>
}

type Entry = { val: string; exp?: number }

export class InMemoryRedis implements RedisLike {
  private store = new Map<string, Entry>()

  async get(key: string): Promise<string | null> {
    const e = this.store.get(key)
    if (!e) return null
    if (e.exp && Date.now() > e.exp) {
      this.store.delete(key)
      return null
    }
    return e.val
  }

  async set(key: string, val: string, ...args: any[]): Promise<'OK' | null> {
    // NX: 키가 없을 때만 set — 원자적 락의 핵심
    const nx = args.includes('NX')
    if (nx && this.store.has(key)) return null

    // EX <seconds>: TTL
    const exIdx = args.indexOf('EX')
    const ttlMs = exIdx >= 0 ? Number(args[exIdx + 1]) * 1000 : undefined

    this.store.set(key, {
      val,
      exp: ttlMs ? Date.now() + ttlMs : undefined,
    })
    return 'OK'
  }
}
