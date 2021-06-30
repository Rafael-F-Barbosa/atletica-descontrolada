import React from 'react';
import ReactDOM from 'react-dom';

// Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';


import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import loginReducer from './store/reducers/auth'
import errorReducer from './store/reducers/error'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
	login: loginReducer,
	error: errorReducer
})

const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(thunk))
)

const app = (
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
);

ReactDOM.render(app, document.getElementById('root'));
