import { shallow } from 'enzyme';
import * as React from 'react';
import { InjectedIntlProps } from 'react-intl';
import { connect, Provider } from 'react-redux';
import { store } from '../../redux';
import { ChangeForgottenPasswordScreen } from '../ChangeForgottenPasswordScreen';

const ChangeForgottenPasswordTab = connect()(ChangeForgottenPasswordScreen);

const setup = (props: Partial<InjectedIntlProps> = {}) =>
    shallow(
        <Provider store={store}>
            <ChangeForgottenPasswordTab/>
        </Provider>,
    );

describe('ChangeForgottenPasswordScreen test', () => {
    it('should render', () => {
        const wrapper = setup();
        expect(wrapper).toMatchSnapshot();
        expect(wrapper).toBeDefined();
    });
});
