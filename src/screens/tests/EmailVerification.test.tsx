import { shallow } from 'enzyme';
import * as React from 'react';
import { InjectedIntlProps } from 'react-intl';
import { connect, Provider } from 'react-redux';
import { store } from '../../redux';
import { EmailVerificationScreen } from '../EmailVerification';

const EmailVerification = connect()(EmailVerificationScreen);

const setup = (props: Partial<InjectedIntlProps> = {}) =>
    shallow(
        <Provider store={store}>
            <EmailVerification />
        </Provider>,
    );

describe('EmailVerificationScreen', () => {
    const wrapper = setup();

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
    });
});
