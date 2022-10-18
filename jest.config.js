module.exports = {
    preset: 'ts-jest',
    clearMocks: true,
    testEnvironment: "node",
    transform: {
        '^.+\\.ts?$': 'ts-jest',
      },
    testMatch: [
      "**/src/tests/?(*.)+(spec|test).[tj]s?(x)"
    ],
  };
  
  