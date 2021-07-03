import { all, fork, takeLatest, call, put, select } from 'redux-saga/effects';
import axios from 'axios';
import { ADD_TODO_REQUEST, ADD_TODO_SUCCESS, ADD_TODO_FAILURE, LOAD_TODO_LIST_REQUEST, LOAD_TODO_LIST_SUCCESS, LOAD_TODO_LIST_FAILURE, SEARCH_TODO_LIST_REQUEST, SEARCH_TODO_LIST_SUCCESS, SEARCH_TODO_LIST_FAILURE, LOAD_SUBJECT_LIST_REQUEST, LOAD_SUBJECT_LIST_SUCCESS, LOAD_SUBJECT_LIST_FAILURE, COMPLETE_TODO_REQUEST, COMPLETE_TODO_SUCCESS, COMPLETE_TODO_FAILURE, EDIT_TODO_REQUEST, EDIT_TODO_SUCCESS, EDIT_TODO_FAILURE, DELETE_TODO_REQUEST, DELETE_TODO_SUCCESS, DELETE_TODO_FAILURE, LOAD_TODAY_TODO_LIST_REQUEST, LOAD_TODAY_TODO_LIST_SUCCESS, LOAD_TODAY_TODO_LIST_FAILURE, LOAD_NOW_TODO_LIST_REQUEST, LOAD_NOW_TODO_LIST_SUCCESS, LOAD_NOW_TODO_LIST_FAILURE, } from '../reducers/todo';

function addTodoAPI(todoData) {
    return axios.post('/todo', todoData, {
        withCredentials: true,
    });
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

function loadTodoAPI(lastId=0, page=1, limit=10) {
    return axios.get(`/todolist?lastId=${lastId}&limit=${limit}&page=${page}`, {
        withCredentials: true,
    });
}

function* loadTodo(action) {
    try {
        const result = yield call(loadTodoAPI, action.lastId, action.page);
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

function loadNowTodoAPI() {
    return axios.get(`/todolist/now`, {
        withCredentials: true,
    });
}

function* loadNowTodo(action) {

    try {
        const result = yield call(loadNowTodoAPI);
        yield put({
            type: LOAD_NOW_TODO_LIST_SUCCESS,
            data: result.data,
        })

    } catch(e) {
        console.error(e)
        yield put({
            type: LOAD_NOW_TODO_LIST_FAILURE,
            error: e,
        })
    }
}

function* watchLoadNowTodo() {
    yield takeLatest(LOAD_NOW_TODO_LIST_REQUEST, loadNowTodo);
}

function loadTodayTodoAPI(page=1, limit=10) {
    return axios.get(`/todolist/today?page=${page}&limit=${limit}`, {
        withCredentials: true,
    });
}

function* loadTodayTodo(action) {
    try {
        const result = yield call(loadTodayTodoAPI, action.page);
        yield put({
            type: LOAD_TODAY_TODO_LIST_SUCCESS,
            data: result.data,
        })

    } catch(e) {
        console.error(e)
        yield put({
            type: LOAD_TODAY_TODO_LIST_FAILURE,
            error: e,
        })
    }
}

function* watchLoadTodayTodo() {
    yield takeLatest(LOAD_TODAY_TODO_LIST_REQUEST, loadTodayTodo);
}

function searchTodoAPI(conditionData, lastId=0, page=1, limit=10) {
    console.log("conditionData:", conditionData);
    return axios.get(`/todo/search?todoTitle=${conditionData.todoTitle}&allDateCheckState=${conditionData.allDateCheckState}&startDate=${conditionData.startDate}&endDate=${conditionData.endDate}&subjects=${conditionData.subjects}&lastId=${lastId}&limit=${limit}&page=${page}`, {
        withCredentials: true,
    });
    //return axios.get('/todolist');

}

function* searchTodo(action) {
    try {
        const result = yield call(searchTodoAPI, action.data, action.lastId, action.page);
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
    return axios.get('/todo/subjects', {
        withCredentials: true,
    });
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
    return axios.put('/todo/complete', todoData, {
        withCredentials: true,
    });
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
    return axios.put('/todo/edit', todoData, {
        withCredentials: true,
    });
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

function deleteTodoAPI(todoData) {
    return axios.delete(`/todo/${todoData.id}`, {
        withCredentials: true,
    });
}
function* deleteTodo(action) {
    try {
        const result = yield call(deleteTodoAPI, action.data);
        yield put({
            type: DELETE_TODO_SUCCESS, 
            data: result.data,
        })
    } catch (e) {
        console.error(e);
        yield put({
            type: DELETE_TODO_FAILURE,
            error: e,
        })
    }
}
function* watchDeleteTodo() {
    yield takeLatest(DELETE_TODO_REQUEST, deleteTodo);
}

export default function* todoSaga() {
    yield all([
        fork(watchAddTodo),
        fork(watchLoadTodo),
        fork(watchLoadTodayTodo),
        fork(watchSearchTodo),
        fork(watchLoadSubject),
        fork(watchCompleteTodo),
        fork(watchEditTodo),
        fork(watchDeleteTodo),
        fork(watchLoadNowTodo)
    ]);
}