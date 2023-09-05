module.exports = {
    // ... other Jest configuration ...

    transform: {
        '^.+\\.jsx?$': 'babel-jest',
    },
    moduleNameMapper: {
        '\\.(css|less|sass|scss)$': 'identity-obj-proxy', // Use a CSS modules mock or 'identity-obj-proxy'
    },
    testEnvironment: 'jsdom',
    type: "module",
};
