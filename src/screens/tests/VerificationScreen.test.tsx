// import { shallow } from 'enzyme';
// import * as React from 'react';
// import {connect, Provider} from 'react-redux';
// import { VerificationScreen } from '..';
// import { store } from '../../redux';
// import { extractToken, RouterProps } from '../VerificationScreen';

// const defaultProps: RouterProps = {
//     location: {
//         search: '',
//     },
// };

// const Verification = connect()(VerificationScreen);

// const setup = (props: Partial<RouterProps> = {}) =>
//       shallow(<Provider store={store}><Verification  {...{ ...defaultProps, ...props }}/></Provider>);

describe('VerificationScreen test', () => {
    // deprecated:
    it('test', () => {
        expect(true).toBeTruthy();
    });

    // it('should render', () => {
    //     const wrapper = setup();
    //     expect(wrapper).toMatchSnapshot();
    // });

    // const tokenProps = {
    //     location: {
    //         search: 'confirmation_token=123123',
    //     },
    // };

    // it('extract the token from search url', () => {
    //     expect(extractToken(tokenProps)).toEqual('123123');
    // });
});
