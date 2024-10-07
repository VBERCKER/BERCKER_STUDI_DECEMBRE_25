// jest.config.js
export default {
    transform: {
        "^.+\\.jsx?$": "babel-jest"
      },
      transformIgnorePatterns: ["/node_modules/"],
      moduleNameMapper: {
        "\\.(css|less|scss|sass)$": "identity-obj-proxy"
      },
    verbose: true,
    
  };