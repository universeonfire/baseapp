import { shallow } from 'enzyme';
import * as React from 'react';
import { InjectedIntlProps } from 'react-intl';
import { Provider } from 'react-redux';
import { store } from '../../redux';
import { MaintenanceScreen } from '../MaintenanceScreen';


const setup = (props: Partial<InjectedIntlProps> = {}) =>
    shallow(
        <Provider store={store}>
            <MaintenanceScreen />
        </Provider>,
    );

describe('MaintenanceScreen', () => {
    const wrapper = setup();

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
    });
});
