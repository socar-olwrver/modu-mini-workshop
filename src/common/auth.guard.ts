import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'

/**
 * 워크샵용 가짜 JWT Guard.
 *
 * 진짜 JWT 검증 대신 "demo-XXX" 토큰만 통과시킵니다.
 * 강의 1 #19의 Stateless 약속 — "매 요청마다 토큰을 들고 와야 한다" — 가 여기로 표현됩니다.
 *
 * 실제로는 @nestjs/jwt + passport-jwt 조합 쓰는데, 그건 인증 강의에서.
 */
@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(ctx: ExecutionContext): boolean {
    const req = ctx.switchToHttp().getRequest()
    const raw = req.headers.authorization
    const token = raw?.replace('Bearer ', '')

    if (!token || !token.startsWith('demo-')) {
      throw new UnauthorizedException()
    }

    // 디코딩한 결과를 req에 꽂아두면 컨트롤러가 @Req()로 받아 씁니다
    req.user = { id: token.replace('demo-', '') }
    return true
  }
}
