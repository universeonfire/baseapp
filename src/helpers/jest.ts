import Axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { Action, Middleware } from 'redux';
import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';

import { Config, Cryptobase } from '../api';


// tslint:disable-next-line
import * as WebSocket from 'ws';
import { rootSaga } from '../redux/saga';

const mockConfig: Config = {
    api: {
        authUrl: '/api/v2/barong',
        tradeUrl: '/api/v2/peatio',
        applogicUrl: '/api/v2/applogic',
        rangerUrl: '/api/v2/ranger',
        finexUrl: '/api/v2/finex',
    },
    minutesUntilAutoLogout: '5',
    rangerReconnectPeriod: '1',
    withCredentials: true,
    storage: {},
    gaTrackerKey: '',
    incrementalOrderBook: false,
    finex: false,
    isResizable: false,
    isDraggable: false,
    languages: ['en', 'ru'],
    sessionCheckInterval: '15000',
    balancesFetchInterval: '3000',
    passwordEntropyStep: 0,
    showLanding: true,
    sentryEnabled: false,
};

// tslint:disable no-any no-console
export const loggerMiddleware: Middleware = (store: {}) => (next: any) => (action: Action) => {
    console.log(`dispatching: ${JSON.stringify(action)}`);

    return next(action);
};

export const setupMockStore = (appMiddleware: Middleware, log = false) => {
    const middlewares = log ? [loggerMiddleware, appMiddleware] : [appMiddleware];

    return configureMockStore(middlewares);
};

export const generateMockStore = (debug = false, content:any = undefined): MockStoreEnhanced => {
    const sagaMiddleware = createSagaMiddleware();
    const store: MockStoreEnhanced = setupMockStore(sagaMiddleware, debug)(content) as any;
    sagaMiddleware.run(rootSaga);

    return store;
}


export const setupMockAxios = () => {
    Cryptobase.config = mockConfig;

    return new MockAdapter(Axios);
};

export const mockNetworkError = (mockAxios: any) => {
    mockAxios.onAny().networkError();
};

export const createEchoServer = (port: number, debug: boolean) => {
    const server = new WebSocket.Server({ port: port });
    server.on('connection', (ws, request) => {
        if (debug) {
            ws.addEventListener('open', () => {
                console.log(`Ping Server: listening on port ${port}`);
            });
        }
        ws.on('message', (message: string) => {
            if (debug) {
                console.log(`Ping Server: sending back ${message}`);
            }
            ws.send(message);
        });
    });

    return server;
};
