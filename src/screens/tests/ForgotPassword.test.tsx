import { shallow } from 'enzyme';
import * as React from 'react';
import { InjectedIntlProps } from 'react-intl';
import { connect, Provider } from 'react-redux';
import { store } from '../../redux';
import { ForgotPasswordScreen } from '../ForgotPassword';

const ForgotPassword = connect()(ForgotPasswordScreen);

const setup = (props: Partial<InjectedIntlProps> = {}) =>
    shallow(
        <Provider store={store}>
            <ForgotPassword />
        </Provider>,
    );

describe('ForgotPasswordScreen', () => {
    const wrapper = setup();

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
    });
});
