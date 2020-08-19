import { shallow } from 'enzyme';
import * as React from 'react';
import { InjectedIntlProps } from 'react-intl';
import { connect, Provider } from 'react-redux';
import { store } from '../../redux';
import { SignInScreen } from '../SignInScreen';

const Identity = connect()(SignInScreen);

const setup = (props: Partial<InjectedIntlProps> = {}) =>
    shallow(
        <Provider store={store}>
            <Identity />
        </Provider>,
    );

describe('SignInScreen', () => {
    const wrapper = setup();

    it('should render', () => {
        expect(wrapper).toMatchSnapshot();
    });
});
