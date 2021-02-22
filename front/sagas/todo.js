import { all, fork, takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import { ADD_TODO_REQUEST, ADD_TODO_SUCCESS, ADD_TODO_FAILURE } from '../reducers/todo';

function addTodoAPI(todoData) {
    return axios.post('/todo', todoData);
}
function* addTodo(action) {
    console.log("action.data:", action.data);
    try {
        yield call(addTodoAPI, action.data);
        yield put({
            type: ADD_TODO_SUCCESS, 
            data: {
                todoId: action.data.todoId,
            }
        })
    } catch (e) {
        console.error(e);
        yield put({
            type: ADD_TODO_FAILURE,
            error: e,
        })
    }
}
function* watchAddTodo() {
    yield takeLatest(ADD_TODO_REQUEST, addTodo);
}
export default function* todoSaga() {
    yield all([
        fork(watchAddTodo),
    ]);
}