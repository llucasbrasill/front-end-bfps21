module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/main/**/*',
    '!<rootDir>/src/presentation/pages/dashboard/**/*',
    '!<rootDir>/src/presentation/pages/auth/signup/**/*',
    '!<rootDir>/src/presentation/components/router/**/*',
    '!<rootDir>/src/presentation/components/index.ts',
    '!<rootDir>/src/presentation/pages/index.ts',
    '!<rootDir>/src/presentation/components/signup/**/*',
    '!<rootDir>/src/presentation/components/translations/**/*',
    '!<rootDir>/src/presentation/components/header/**/*',
    '!<rootDir>/src/domain/models/index.ts',
    '!<rootDir>/src/domain/usecases/index.ts',
    '!**/*.d.ts'
  ],
  coverageDirectory: 'coverage',
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/src/main/test/cypress'
  ],
  testEnvironment: 'jsdom',
  transform: {
    '.+\\.(ts|tsx)$': 'ts-jest'
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    '\\.scss$': 'identity-obj-proxy'
  }
}
