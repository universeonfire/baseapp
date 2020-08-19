import { applyMiddleware, compose, createStore } from 'redux';
import sagaMiddlewareFactory from 'redux-saga';
import { rangerSagas } from '../modules/public/ranger';
import { rootReducer } from './reducer';
import { rootSaga } from './saga';

const sagaMiddleware = sagaMiddlewareFactory();
const rengerMiddleware = sagaMiddlewareFactory();

// tslint:disable-next-line:no-any
const composeEnhancer: typeof compose = (window as any)
    .__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancer(
        applyMiddleware(
            sagaMiddleware,
            rengerMiddleware,
        ),
    ),
);

// then run the saga
sagaMiddleware.run(rootSaga);
rengerMiddleware.run(rangerSagas);

export {
    store,
};
