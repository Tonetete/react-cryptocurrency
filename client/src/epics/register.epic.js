// import { Observable } from 'rxjs'
import 'rxjs/add/observable/of'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import { Observable } from 'rxjs/Observable'

import { REGISTER_USER_REQUEST } from '../actions/types'
import { registerUser$, registerUserFail, registerUserSuccess } from '../actions/index'
// import {
//   registerUser$,
//   registerUserSuccess,
//   registerUserFail
// } from '../actions'

export const registerUser = (action$) =>
  action$
    .ofType(REGISTER_USER_REQUEST)
    .map(payload => registerUser$(payload.payload))
    .map(payload => registerUserSuccess(payload))
    .catch(error => Observable.of(registerUserFail(error)))
// .mergeMap(payload => registerUser$(payload.formFields))
// .map(payload => registerUserSuccess(payload))
// .catch(error => registerUserFail(error))
