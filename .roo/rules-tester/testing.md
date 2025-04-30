# Testing Guidelines
Maintain a high ratio of fast unit tests, moderate integration tests, and minimal end-to-end tests.
Integrate static analysis tools (linters, type checkers) to validate code before dynamic testing.
Use semantic queries and AAA structure for unit and component tests, avoiding reliance on implementation details.
Implement end-to-end tests for key workflows using Maestro. Build and run the tests.
Mock platform-specific modules and validate asynchronous network scenarios for cross-platform consistency.
Leverage Expo Router testing utilities for in-memory routing tests to ensure navigation flows.
Track coverage metrics (70–80% target), emphasizing tests around complex or critical logic.