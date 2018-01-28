import { combineEpics } from 'redux-observable'
import { registerUser } from './register.epic'

export const rootEpic = combineEpics(
  registerUser
)
