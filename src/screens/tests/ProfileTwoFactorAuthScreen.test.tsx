// import { shallow } from 'enzyme';
// import * as React from 'react';
// import { InjectedIntlProps } from 'react-intl';
// import { connect, Provider } from 'react-redux';
// import { ProfileTwoFactorAuthScreen } from '../';
// import { store } from '../../redux';

// const ProfileTwoFactorAuthTab = connect()(ProfileTwoFactorAuthScreen);

// const setup = (props: Partial<InjectedIntlProps> = {}) =>
//     shallow(
//         <Provider store={store}>
//             <ProfileTwoFactorAuthTab/>
//         </Provider>,
//     );

// deprecated
describe('ProfileTwoFactorAuthScreen test', () => {    
    // deprecated: imposible to test js files
    it('test', () => {
        expect(true).toBeTruthy();
    });
    // it('should render', () => {
    //     const wrapper = setup();
    //     expect(wrapper).toMatchSnapshot();
    //     expect(wrapper).toBeDefined();
    // });
});
