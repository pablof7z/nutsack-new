# RooCode Testing Guidelines

You should run tests, not instruct the user to run them themselves.

rules:
  # Apply the core principle of the testing pyramid:
  # heavy emphasis on unit tests, a balanced layer of integration tests, and minimal E2E tests.
  - id: testing_pyramid
    description: "Maintain a high ratio of fast unit tests, moderate integration tests, and minimal end-to-end tests."

  # Catch errors as early as possible via static analysis before running dynamic tests.
  - id: static_analysis
    description: "Integrate static analysis tools (linters, type checkers) to validate code before dynamic testing."

  # Validate pure functions and UI components with clear Arrange–Act–Assert patterns and semantic queries.
  - id: unit_component_tests
    description: "Use semantic queries and AAA structure for unit and component tests, avoiding reliance on implementation details."

  # Cover critical user journeys (e.g., sending, receiving, subscriptions) with robust end-to-end tests.
  - id: end_to_end
    description: "Implement end-to-end tests for key workflows using frameworks like Detox for local and cloud-based execution."

  # Ensure mobile-specific edge cases are handled, mocking native modules and testing async interactions.
  - id: mobile_best_practices
    description: "Mock platform-specific modules and validate asynchronous network scenarios for cross-platform consistency."

  # Bridge gaps between unit and E2E tests by verifying routing and navigation logic.
  - id: integration_tests
    description: "Leverage Expo Router testing utilities for in-memory routing tests to ensure navigation flows."

  # Monitor and enforce test coverage targets, focusing on high-risk areas rather than blanket percentages.
  - id: code_coverage
    description: "Track coverage metrics (70–80% target), emphasizing tests around complex or critical logic."

  # Treat all LLM-generated code and tests as drafts: require peer review, refine iteratively, and reference LLM pitfalls research.
  - id: llm_guidance
    description: "Enforce critical review of LLM-generated code/tests, iterating based on empirical findings about LLM code-generation errors."

