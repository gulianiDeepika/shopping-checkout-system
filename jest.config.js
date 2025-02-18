/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
  moduleFileExtensions: [
    "js",
    "json",
    "ts"
  ],
  rootDir: "./",
  testMatch: [
    "**/test/**/*.(spec|test).ts?(x)",
  ],
  transform: {
    "^.+\\.(t|j)s$": "ts-jest"
  },
  coverageReporters: [
    "text",
    "html"
  ],
  collectCoverageFrom: [
    "**/src/**/**/*.{ts,tsx,js,jsx}",
    "!app.ts",
    "!index.ts",
    "!dist/**"
  ],
  coverageDirectory: "/test/.coverage",
  testEnvironment: "node"
};
