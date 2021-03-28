import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import boardReducer from './reducers/BoardGame'

const rootReducer = combineReducers({
    board: boardReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store