# RooCode: Testable Code Guidelines for Coding Agent

rules:
  - id: separation_of_concerns
    description: |
      Split each feature into three layers—UI components, business logic, and I/O/effects—so each can be tested in isolation.

  - id: dependency_injection
    description: |
      Always inject external dependencies (services, data fetchers, native adapters) via props, hooks, or constructor parameters rather than importing them directly.

  - id: pure_functions
    description: |
      Write utilities and calculations as pure functions with no side-effects. Accept inputs and return outputs deterministically.

  - id: thin_ui_components
    description: |
      Keep React components “thin”: delegate state, data fetching, and logic to custom hooks or service modules.

  - id: native_facade
    description: |
      Wrap all native/NDK-Mobile and network calls behind JavaScript adapters or facades to enable easy mocking in tests.

  - id: avoid_globals
    description: |
      Do not use singletons or global state. Favor instance-based services passed in via DI to allow test overrides.

  - id: test_first_design
    description: |
      Design APIs, hooks, and components with testability in mind—ideally writing failing tests first (TDD) to drive implementation.

  - id: consistent_scaffolding
    description: |
      Use shared render helpers (e.g., `renderWithProviders`) and mock utilities so tests remain uniform and easy to author.

