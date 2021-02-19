
import { all, call } from 'redux-saga/effects';
import axios from 'axios';
import todo from './todo';

axios.defaults.baseURL = "http://localhost:3065/api";

export default function* rootSaga() {
    yield all([
        call(todo),
    ])
}