
import { all, call } from 'redux-saga/effects';
import axios from 'axios';
import todo from './todo';
import Dday from './dday';
import user from './user';

axios.defaults.baseURL = "http://localhost:3065/api";

export default function* rootSaga() {
    yield all([
        call(todo),
        call(Dday),
        call(user),
    ])
}