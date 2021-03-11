import { all, fork, takeLatest, call, put, select } from 'redux-saga/effects';
import axios from 'axios';
import { ADD_TODO_REQUEST, ADD_TODO_SUCCESS, ADD_TODO_FAILURE, LOAD_TODO_LIST_REQUEST, LOAD_TODO_LIST_SUCCESS, LOAD_TODO_LIST_FAILURE, SEARCH_TODO_LIST_REQUEST, SEARCH_TODO_LIST_SUCCESS, SEARCH_TODO_LIST_FAILURE, LOAD_SUBJECT_LIST_REQUEST, LOAD_SUBJECT_LIST_SUCCESS, LOAD_SUBJECT_LIST_FAILURE, COMPLETE_TODO_REQUEST, COMPLETE_TODO_SUCCESS, COMPLETE_TODO_FAILURE, EDIT_TODO_REQUEST, EDIT_TODO_SUCCESS, EDIT_TODO_FAILURE, } from '../reducers/todo';

function addTodoAPI(todoData) {
    return axios.post('/todo', todoData);
}
function* addTodo(action) {
    console.log("action.data:", action.data);
    try {
        const result = yield call(addTodoAPI, action.data);
        yield put({
            type: ADD_TODO_SUCCESS, 
            data: result.data,
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

function loadTodoAPI() {
    return axios.get('/todolist');
}

function* loadTodo() {
    const isLoading = yield select(state => Boolean(state.todo.todoList.length));
    if (isLoading) {
        return ;
    }

    try {
        const result = yield call(loadTodoAPI);
        yield put({
            type: LOAD_TODO_LIST_SUCCESS,
            data: result.data,
        })

    } catch(e) {
        console.error(e)
        yield put({
            type: LOAD_TODO_LIST_FAILURE,
            error: e,
        })
    }
}

function* watchLoadTodo() {
    yield takeLatest(LOAD_TODO_LIST_REQUEST, loadTodo);
}

function searchTodoAPI(conditionData) {
    console.log("conditionData:", conditionData);
    return axios.get(`/todo/search?todoTitle=${conditionData.todoTitle}&allDateCheckState=${conditionData.allDateCheckState}&startDate=${conditionData.startDate}&endDate=${conditionData.endDate}&subjects=${conditionData.subjects}`);
    //return axios.get('/todolist');

}

function* searchTodo(action) {
    try {
        const result = yield call(searchTodoAPI, action.data);
        console.log("result.data:", result.data);
        yield put({
            type: SEARCH_TODO_LIST_SUCCESS,
            data: result.data,
        })

    } catch(e) {
        console.error(e)
        yield put({
            type: SEARCH_TODO_LIST_FAILURE,
            error: e,
        })
    }
}

function* watchSearchTodo() {
    yield takeLatest(SEARCH_TODO_LIST_REQUEST, searchTodo);
}

function loadSubjectAPI() {
    return axios.get('/todo/subjects');
}

function* loadSubject() {
    try {
        const result = yield call(loadSubjectAPI);
        yield put({
            type: LOAD_SUBJECT_LIST_SUCCESS,
            data: result.data,
        })

    } catch(e) {
        console.error(e)
        yield put({
            type: LOAD_SUBJECT_LIST_FAILURE,
            error: e,
        })
    }
}

function* watchLoadSubject() {
    yield takeLatest(LOAD_SUBJECT_LIST_REQUEST, loadSubject);
}

function completeTodoAPI(todoData) {
    return axios.put('/todo/complete', todoData);
}
function* completeTodo(action) {
    console.log("action.data:", action.data);
    try {
        const result = yield call(completeTodoAPI, action.data);
        yield put({
            type: COMPLETE_TODO_SUCCESS, 
            data: result.data,
        })
    } catch (e) {
        console.error(e);
        yield put({
            type: COMPLETE_TODO_FAILURE,
            error: e,
        })
    }
}
function* watchCompleteTodo() {
    yield takeLatest(COMPLETE_TODO_REQUEST, completeTodo);
}

function editTodoAPI(todoData) {
    return axios.put('/todo/edit', todoData);
}
function* editTodo(action) {
    try {
        const result = yield call(editTodoAPI, action.data);
        yield put({
            type: EDIT_TODO_SUCCESS, 
            data: result.data,
        })
    } catch (e) {
        console.error(e);
        yield put({
            type: EDIT_TODO_FAILURE,
            error: e,
        })
    }
}
function* watchEditTodo() {
    yield takeLatest(EDIT_TODO_REQUEST, editTodo);
}

export default function* todoSaga() {
    yield all([
        fork(watchAddTodo),
        fork(watchLoadTodo),
        fork(watchSearchTodo),
        fork(watchLoadSubject),
        fork(watchCompleteTodo),
        fork(watchEditTodo),
    ]);
}