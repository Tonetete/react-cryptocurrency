import { combineEpics } from 'redux-observable';
import { registerUserEpic, registerUserSuccessEpic } from './register.epic';

export const rootEpic = combineEpics(registerUserEpic, registerUserSuccessEpic);
