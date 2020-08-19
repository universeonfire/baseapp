import MockAdapter from 'axios-mock-adapter';
import { MockStoreEnhanced } from 'redux-mock-store';
import { generateMockStore, mockNetworkError, setupMockAxios } from '../../../../helpers/jest';
import { alertPush } from '../../../index';
import { ordersCancelAllError, ordersCancelAllFetch } from '../actions';

describe('Orders Cancel All', () => {
    let store: MockStoreEnhanced;
    let mockAxios: MockAdapter;

    beforeEach(() => {
        mockAxios = setupMockAxios();
        store = generateMockStore();
    });

    afterEach(() => {
        mockAxios.reset();
    });

    const fakeError = {
        type: 'error',
        code: 500,
        message: ['Server error'],
    };

    const mockCancelAllOrders = () => {
        mockAxios.onPost('/market/orders/cancel').reply(200);
    };

    const expectedActionsSuccess = [
        ordersCancelAllFetch(),
        alertPush({ message: ['success.order.cancelling.all'], type: 'success'}),
    ];
    const expectedActionsError = [
        ordersCancelAllFetch(),
        ordersCancelAllError(),
        alertPush(fakeError),
    ];

    it('should cancel all open orders', async () => {
        mockCancelAllOrders();
        const promise = new Promise(resolve => {
            store.subscribe(() => {
                const actions = store.getActions();
                if (actions.length === expectedActionsSuccess.length) {
                    expect(actions).toEqual(expectedActionsSuccess);
                    resolve();
                }
            });
        });
        store.dispatch(ordersCancelAllFetch());

        return promise;
    });

    it('should trigger an error', async () => {
        mockNetworkError(mockAxios);
        const promise = new Promise(resolve => {
            store.subscribe(() => {
                const actions = store.getActions();
                if (actions.length === expectedActionsError.length) {
                    expect(actions).toEqual(expectedActionsError);
                    resolve();
                }
            });
        });
        store.dispatch(ordersCancelAllFetch());

        return promise;
    });
});
