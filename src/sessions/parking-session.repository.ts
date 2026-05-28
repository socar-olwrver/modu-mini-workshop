import { Injectable } from '@nestjs/common'

export type ParkingSession = {
  id: number
  parkinglotId: number
  carNumber: string
  enteredAt: Date
  exitedAt?: Date
  paidAt?: Date
  paidAmount?: number
}

@Injectable()
export class ParkingSessionRepository {
  private sessions = new Map<number, ParkingSession>()
  private nextId = 1

  create(data: Omit<ParkingSession, 'id'>): ParkingSession {
    const session = { ...data, id: this.nextId++ }
    this.sessions.set(session.id, session)
    return session
  }

  findOne(id: number) {
    return this.sessions.get(id)
  }

  update(id: number, patch: Partial<ParkingSession>) {
    const s = this.sessions.get(id)
    if (!s) return undefined
    Object.assign(s, patch)
    return s
  }
}
