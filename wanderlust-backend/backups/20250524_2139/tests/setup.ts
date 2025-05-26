import '@testing-library/jest-dom';
import { jest } from '@jest/globals';
const fetchMock = require('jest-fetch-mock');

// Enable fetch mocks
fetchMock.enableMocks();

// Configure global fetch mock
global.fetch = fetchMock as unknown as typeof global.fetch;

// Reset mocks before each test
beforeAll(() => {
  fetchMock.resetMocks();
});