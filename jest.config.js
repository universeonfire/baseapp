// module.exports = {
//     'roots': [
//         '<rootDir>'
//     ],
//     'transform': {
//         '^.+\\.(tsx|ts)$': 'ts-jest',
//         '^.+\\.(jsx|js)$': 'babel-jest',
//     },
//     'testRegex': '(/__tests__/.*|(\\.|/)(test|spec))\\.(tsx|jsx)?$',
//     'moduleFileExtensions': [
//         'ts',
//         'tsx',
//         'js',
//         'jsx',
//         'json',
//         'node',
//         'css',
//         'scss',
//     ],
//     'snapshotSerializers': ['enzyme-to-json/serializer'],
//     'transformIgnorePatterns': [
//         "<rootDir>/node_modules/(?!lodash-es)"
//     ],
//     'moduleNameMapper': {
//         '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
//             '<rootDir>/__mocks__/fileMock.js',
//         '\\.(css|scss|pcss)$': '<rootDir>/__mocks__/styleMock.js',
//     },
//     'testURL': "http://localhost",
//     'collectCoverageFrom': [
//         "<rootDir>/src/**/*.{ts,tsx,js,jsx}",
//     ],
//     "coveragePathIgnorePatterns": [
//         "<rootDir>/node_modules/",
//         "<rootDir>/src/charting_library/**",
//     ]
// };

module.exports = {
    setupFilesAfterEnv: ['jest-enzyme', '<rootDir>/jest/setup.tsx'],
    testEnvironment: 'enzyme',
    verbose: true,
    testURL: 'http://localhost/',
    transform: {
        '^.+\\.(j|t)sx?$': 'ts-jest',
        "^.+\\.svg$": "<rootDir>/jest/svg-transform.js",
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    moduleNameMapper: {
        '^.+\\.(css|less|scss)$': 'identity-obj-proxy',
        '^react-scroll-to-component$': 'identity-obj-proxy'
    },
    globals: {
        __webpack_hash__: '1'
    },
    transformIgnorePatterns: ['<rootDir>/node_modules/(?!lodash-es/.*)'],
    snapshotSerializers: ['enzyme-to-json/serializer'],
    reporters: ['jest-silent-reporter']
};


