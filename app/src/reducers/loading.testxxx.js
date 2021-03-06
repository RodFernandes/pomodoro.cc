/* global expect */
import loading, { defaultState } from './loading'
import {
  LOAD_USER_REQUEST,
  LOAD_USER_ERROR,
  API_GET_TODOLIST_SUCCESS,
  API_GET_TODOLIST_ERROR,
  API_GET_ANALYTICS_SUCCESS,
  API_GET_ANALYTICS_ERROR,
  API_GET_POMODOROS_FOR_DATE_SUCCESS,
  API_GET_POMODOROS_FOR_DATE_ERROR
} from '../actions'

describe('loading reducer', () => {
  it('.loadingUser is true when user is being updated', () => {
    expect(
      loading(defaultState, { type: LOAD_USER_REQUEST, payload: null })
    ).toStrictEqual(Object.assign({}, defaultState, { loadingUser: true }))
  })
  it('.loadingUser is false when user loading failed', () => {
    expect(
      loading(defaultState, { type: LOAD_USER_ERROR, payload: null })
    ).toStrictEqual(Object.assign({}, defaultState, { loadingUser: false }))
  })
  it('.loadingTodolist is true when todolist is being updated', () => {
    expect(
      loading(defaultState, { type: API_GET_TODOLIST_SUCCESS, payload: null })
    ).toStrictEqual(Object.assign({}, defaultState, { loadingTodolist: true }))
  })
  it('.loadingTodolist is false when todolist loading failed', () => {
    expect(
      loading(defaultState, { type: API_GET_TODOLIST_ERROR, payload: null })
    ).toStrictEqual(Object.assign({}, defaultState, { loadingTodolist: false }))
  })
  it('.loadingAnalytics is true when analytics is being updated', () => {
    expect(
      loading(defaultState, { type: API_GET_ANALYTICS_SUCCESS, payload: null })
    ).toStrictEqual(Object.assign({}, defaultState, { loadingAnalytics: true }))
  })
  it('.loadingAnalytics is false when analytics loading failed', () => {
    expect(
      loading(defaultState, { type: API_GET_ANALYTICS_ERROR, payload: null })
    ).toStrictEqual(Object.assign({}, defaultState, { loadingAnalytics: false }))
  })
  it('.loadingPomodorosForDate is true when analytics is being updated', () => {
    expect(
      loading(defaultState, { type: API_GET_POMODOROS_FOR_DATE_SUCCESS, payload: null })
    ).toStrictEqual(Object.assign({}, defaultState, { loadingPomodorosForDate: true }))
  })
  it('.loadingPomodorosForDate is false when analytics loading failed', () => {
    expect(
      loading(defaultState, { type: API_GET_POMODOROS_FOR_DATE_ERROR, payload: null })
    ).toStrictEqual(Object.assign({}, defaultState, { loadingPomodorosForDate: false }))
  })
})
