import MockAdapter from 'axios-mock-adapter';
import { MockStoreEnhanced } from 'redux-mock-store';
import { generateMockStore, mockNetworkError, setupMockAxios } from '../../../../helpers/jest';
import {
    customizationData,
    customizationError,
    customizationFetch,
} from '../actions';
import { CustomizationDataInterface } from '../types';

describe('Saga: customizationFetchSaga', () => {
    let store: MockStoreEnhanced;
    let mockAxios: MockAdapter;

    beforeEach(() => {
        mockAxios = setupMockAxios();
        store = generateMockStore();
    });

    afterEach(() => {
        mockAxios.reset();
    });

    const fakeCustomization: CustomizationDataInterface = {
        settings: '{\"theme_id\": \"1\",\"theme_colors\":[]}',
    };

    const mockCustomization = () => {
        mockAxios.onGet('/customization').reply(200, fakeCustomization);
    };

    const alertDataPayload = {
        message: ['Server error'],
        code: 500,
    };

    it('should fetch customization', async () => {
        const expectedActions = [
            customizationFetch(),
            customizationData(fakeCustomization),
        ];

        mockCustomization();
        const promise = new Promise(resolve => {
            store.subscribe(() => {
                const actions = store.getActions();
                if (actions.length === expectedActions.length) {
                    expect(actions).toEqual(expectedActions);
                    resolve();
                }
            });
        });

        store.dispatch(customizationFetch());

        return promise;
    });


    it('should trigger an error on customization fetch', async () => {
        const expectedActions = [
            customizationFetch(),
            customizationError(alertDataPayload),
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
        store.dispatch(customizationFetch());

        return promise;
    });
});
