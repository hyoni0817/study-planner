import { all, fork, takeLatest, call, put, select } from 'redux-saga/effects';
import axios from 'axios';
import { ADD_DDAY_REQUEST, ADD_DDAY_SUCCESS, ADD_DDAY_FAILURE, LOAD_DDAY_LIST_REQUEST, LOAD_DDAY_LIST_SUCCESS, LOAD_DDAY_LIST_FAILURE, SEARCH_DDAY_LIST_REQUEST, SEARCH_DDAY_LIST_SUCCESS, SEARCH_DDAY_LIST_FAILURE, EDIT_DDAY_REQUEST, EDIT_DDAY_SUCCESS, EDIT_DDAY_FAILURE, DELETE_DDAY_REQUEST, DELETE_DDAY_SUCCESS, DELETE_DDAY_FAILURE, SHOW_DDAY_REQUEST, SHOW_DDAY_SUCCESS, SHOW_DDAY_FAILURE, LOAD_VIEWABLE_DDAY_LIST_REQUEST, LOAD_VIEWABLE_DDAY_LIST_SUCCESS, LOAD_VIEWABLE_DDAY_LIST_FAILURE } from '../reducers/dday';

function addDdayAPI(DdayData) {
    return axios.post('/dday', DdayData);
}

function* addDday(action) {
    try {
        const result = yield call(addDdayAPI, action.data);
        yield put({
            type: ADD_DDAY_SUCCESS,
            data: result.data,
        })
    } catch (e) {
        console.error(e);
        yield put({
            type: ADD_DDAY_FAILURE,
            error: e,
        })
    }
}

function* watchAddDday() {
    yield takeLatest(ADD_DDAY_REQUEST, addDday);
}

function loadDdayAPI() {
    return axios.get('/ddaylist');
}

function* loadDday() {
    const isLoading = yield select(state => Boolean(state.dday.DdayList.length));
    if (isLoading) {
        return ;
    }

    try {
        const result = yield call(loadDdayAPI);
        yield put({
            type: LOAD_DDAY_LIST_SUCCESS,
            data: result.data,
        })
    } catch(e) {
        console.error(e);
        yield put({
            type: LOAD_DDAY_LIST_FAILURE,
            error: e,
        })
    }
}

function* watchLoadDday() {
    yield takeLatest(LOAD_DDAY_LIST_REQUEST, loadDday);
}

function loadViewableDdayAPI(lastId=0, limit=10) {
    return axios.get(`/ddaylist/viewable?lastId=${lastId}&limit=${limit}`);
}

function* loadViewableDday(action) {
    try {
        const result = yield call(loadViewableDdayAPI, action.lastId);
        yield put({
            type: LOAD_VIEWABLE_DDAY_LIST_SUCCESS,
            data: result.data,
        })

    } catch(e) {
        console.error(e)
        yield put({
            type: LOAD_VIEWABLE_DDAY_LIST_FAILURE,
            error: e,
        })
    }
}

function* watchLoadViewableDday() {
    yield takeLatest(LOAD_VIEWABLE_DDAY_LIST_REQUEST, loadViewableDday);
}

function searchDdayAPI(conditionData, lastId=0, limit=10) {
    return axios.get(`/dday/search?DdayTitle=${conditionData.DdayTitle}&allDateCheckState=${conditionData.allDateCheckState}&startDate=${conditionData.startDate}&endDate=${conditionData.endDate}&memo=${conditionData.memo}&lastId=${lastId}&limit=${limit}`);
}

function* searchDday(action) {
    try {
        const result = yield call(searchDdayAPI, action.data);
        yield put({
            type: SEARCH_DDAY_LIST_SUCCESS,
            data: result.data,
        })

    } catch(e) {
        console.error(e)
        yield put({
            type: SEARCH_DDAY_LIST_FAILURE,
            error: e,
        })
    }
}

function* watchSearchDday() {
    yield takeLatest(SEARCH_DDAY_LIST_REQUEST, searchDday);
}

function editDdayAPI(DdayData) {
    return axios.put('/dday/edit', DdayData);
}
function* editDday(action) {
    try {
        const result = yield call(editDdayAPI, action.data);
        yield put({
            type: EDIT_DDAY_SUCCESS, 
            data: result.data,
        })
    } catch (e) {
        console.error(e);
        yield put({
            type: EDIT_DDAY_FAILURE,
            error: e,
        })
    }
}
function* watchEditDday() {
    yield takeLatest(EDIT_DDAY_REQUEST, editDday);
}

function deleteDdayAPI(DdayData) {
    return axios.delete(`/dday/${DdayData.id}`);
}
function* deleteDday(action) {
    try {
        const result = yield call(deleteDdayAPI, action.data);
        yield put({
            type: DELETE_DDAY_SUCCESS, 
            data: result.data,
        })
    } catch (e) {
        console.error(e);
        yield put({
            type: DELETE_DDAY_FAILURE,
            error: e,
        })
    }
}
function* watchDeleteDday() {
    yield takeLatest(DELETE_DDAY_REQUEST, deleteDday);
}

function showDdayAPI(DdayData) {
    return axios.put('/dday/show', DdayData);
}

function* showDday(action) {
    console.log("action.data:", action.data);
    try {
        const result = yield call(showDdayAPI, action.data);
        yield put({
            type: SHOW_DDAY_SUCCESS, 
            data: result.data,
        })
    } catch (e) {
        console.error(e);
        yield put({
            type: SHOW_DDAY_FAILURE,
            error: e,
        })
    }
}

function* watchCompleteDday() {
    yield takeLatest(SHOW_DDAY_REQUEST, showDday);
}

export default function* DdaySaga() {
    yield all([
        fork(watchAddDday),
        fork(watchLoadDday),
        fork(watchLoadViewableDday),
        fork(watchSearchDday),
        fork(watchEditDday),
        fork(watchDeleteDday),
        fork(watchCompleteDday),
    ])
}