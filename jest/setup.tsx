import { configure } from 'enzyme';
import * as EnzymeAdapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';

configure({ adapter: new EnzymeAdapter() });

// jest.mock('common/components', () => {
//     return {
//         // global vars
//     };
// });
