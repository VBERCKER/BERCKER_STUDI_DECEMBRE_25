

export default {
   
    "transform": {
      "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest"
    },
   
    "moduleFileExtensions": [
      "js",
      "cjs",
      "jsx",
      "json",
      "node"
    ],
    "testEnvironment": 'jsdom',
     "setupFiles": ['jest-fetch-mock'],
    
  }