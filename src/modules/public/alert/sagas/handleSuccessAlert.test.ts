import MockAdapter from 'axios-mock-adapter';
import { MockStoreEnhanced } from 'redux-mock-store';
import { Cryptobase, defaultConfig } from '../../../../api';
import { generateMockStore, setupMockAxios } from '../../../../helpers/jest';
import { alertPush } from '../actions';
import { ALERT_DATA, ALERT_DELETE, ALERT_PUSH } from '../constants';

const debug = false;

describe('Alert success handler', () => {
    let store: MockStoreEnhanced;
    let mockAxios: MockAdapter;

    afterEach(() => {
        mockAxios.reset();
    });

    beforeEach(() => {
        mockAxios = setupMockAxios();
        store = generateMockStore(debug);
        Cryptobase.config = {
            ...defaultConfig,
            msAlertDisplayTime: '0.01',
        };
    });

    const successActionPayload = {
            message: ['Success message'],
            type: 'success',
        };

    const expectedSuccessAlertPushAction = {
            type: ALERT_PUSH,
            payload: successActionPayload,
        };

    const expectedSuccessAlertDataAction = {
            type: ALERT_DATA,
            payload: successActionPayload,
        };

    const expectedSuccessAlertDeleteAction = {
            type: ALERT_DELETE,
        };

    it('should handle success alert', async () => {
        const promise = new Promise(resolve => {
            store.subscribe(() => {
                const actions = store.getActions();
                switch (actions.length) {
                    case 1:
                        expect(actions).toEqual([expectedSuccessAlertPushAction]);
                        setTimeout(resolve, 0.01);
                        break;
                    case 2:
                        expect(actions).toEqual([expectedSuccessAlertPushAction, expectedSuccessAlertDataAction]);
                        setTimeout(resolve, 0.01);
                        break;
                    case 3:
                        expect(actions).toEqual([expectedSuccessAlertPushAction, expectedSuccessAlertDataAction, expectedSuccessAlertDeleteAction]);
                        setTimeout(resolve, 0.01);
                        break;
                    default:
                        fail();
                }
            });
        });
        store.dispatch(alertPush(successActionPayload));

        return promise;
    });
});
