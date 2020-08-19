import MockAdapter from 'axios-mock-adapter';
import { MockStoreEnhanced } from 'redux-mock-store';
import { generateMockStore, mockNetworkError, setupMockAxios } from '../../../../helpers/jest';
import { sendAccessToken, sendAccessTokenData, sendAccessTokenError } from '../actions';

describe('blacklistAccessFetchSaga test', () => {
    let store: MockStoreEnhanced;
    let mockAxios: MockAdapter;

    beforeEach(() => {
        mockAxios = setupMockAxios();
        store = generateMockStore();
    });

    afterEach(() => {
        mockAxios.reset();
    });

    const fakeResponse = 1;

    const mockRequest = () => {
        mockAxios.onPost('/identity/users/access').reply(200, fakeResponse);
    };

    it('should send access token', async () => {
        const expectedActions = [
            sendAccessToken({ whitelink_token: '' }),
            sendAccessTokenData(),
        ];
        mockRequest();

        const promise = new Promise(resolve => {
            store.subscribe(() => {
                const actions = store.getActions();
                if (actions.length === expectedActions.length) {
                    expect(actions).toEqual(expectedActions);
                    resolve();
                }
            });
        });
        store.dispatch(sendAccessToken({ whitelink_token: '' }));

        return promise;
    });


    it('should trigger an error', async () => {
        const expectedActions = [
            sendAccessToken({ whitelink_token: '' }),
            sendAccessTokenError(),
        ];
        mockNetworkError(mockAxios);

        const promise = new Promise(resolve => {
            store.subscribe(() => {
                const actions = store.getActions();
                if (actions.length === expectedActions.length) {
                    expect(actions).toEqual(expectedActions);
                    resolve();
                }
            });
        });
        store.dispatch(sendAccessToken({ whitelink_token: '' }));

        return promise;
    });
});
