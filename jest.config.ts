import type {Config} from '@jest/types';

const config: Config.InitialOptions = {
    preset: 'ts-jest',
    verbose: true,
    transform: {
        '^.+\\.ts?$': 'ts-jest',
    },
    bail: 1,
    moduleNameMapper: {
        "@app/(.*)": "<rootDir>/src/$1",
        "@config/(.*)": "<rootDir>/src/config/$1",
        "@config": "<rootDir>/src/config/",
        "@interfaces/(.*)": "<rootDir>/src/interfaces/$1",
        "@middlewares/(.*)": "<rootDir>/src/middlewares/$1",
        "@modules/(.*)": "<rootDir>/src/modules/$1",
        "@utils/(.*)": "<rootDir>/src/utils/$1",
        "@docs/(.*)": "<rootDir>/src/docs/$1",
        "@exceptions/(.*)": "<rootDir>/src/exceptions/$1",
    },
    roots: ["./src"]
};
export default config;
