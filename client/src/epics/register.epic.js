// import { Observable } from 'rxjs'
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

import { REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS } from '../actions/types';
import {
  registerUser$,
  registerUserFail,
  registerUserSuccess
} from '../actions/index';
// import {
//   registerUser$,
//   registerUserSuccess,
//   registerUserFail
// } from '../actions'

export const registerUserEpic = action$ =>
  action$
    .ofType(REGISTER_USER_REQUEST)
    .mergeMap(({ payload }) => registerUser$(payload))
    .map(payload => {
      const action = { payload: payload.data.user };
      return registerUserSuccess({ action });
    })
    .catch(error => Observable.of(registerUserFail(error.response.data.error)));

export const registerUserSuccessEpic = action$ =>
  action$.ofType(REGISTER_USER_SUCCESS).map(({ payload }) => {
    console.log('payload success', payload);
  });
