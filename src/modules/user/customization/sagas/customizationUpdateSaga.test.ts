import MockAdapter from 'axios-mock-adapter';
import { MockStoreEnhanced } from 'redux-mock-store';
import { generateMockStore, mockNetworkError, setupMockAxios } from '../../../../helpers/jest';
import { CustomizationDataInterface } from '../../../public/customization';
import {
    customizationUpdate,
    customizationUpdateData,
    customizationUpdateError,
} from '../actions';

describe('Saga: customizationUpdateSaga', () => {
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

    const mockCustomizationUpdate = () => {
        mockAxios.onPost('/customization').reply(200);
    };

    const alertDataPayload = {
        message: ['Server error'],
        code: 500,
    };

    it('should update customization', async () => {
        const expectedActions = [
            customizationUpdate(fakeCustomization),
            customizationUpdateData(fakeCustomization),
        ];

        mockCustomizationUpdate();
        const promise = new Promise(resolve => {
            store.subscribe(() => {
                const actions = store.getActions();
                if (actions.length === expectedActions.length) {
                    expect(actions).toEqual(expectedActions);
                    resolve();
                }
            });
        });

        store.dispatch(customizationUpdate(fakeCustomization));

        return promise;
    });


    it('should trigger an error on customization update', async () => {
        const expectedActions = [
            customizationUpdate(fakeCustomization),
            customizationUpdateError(alertDataPayload),
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
        store.dispatch(customizationUpdate(fakeCustomization));

        return promise;
    });
});
