import { shallow } from 'enzyme';
import * as React from 'react';
import { InjectedIntlProps } from 'react-intl';
import { Provider } from 'react-redux';
import { store } from '../../redux';
import { RestrictedScreen } from '../RestrictedScreen';


const setup = (props: Partial<InjectedIntlProps> = {}) =>
    shallow(
        <Provider store={store}>
            <RestrictedScreen />
        </Provider>,
    );

describe('RestrictedScreen', () => {
    const wrapper = setup();

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
    });
});
