Whenever you add files or important libraries, add them to this inventory.

Make sure to keep concerns clear and properly scoped. Avoid repeating yourself or tightly coupling code. Prefer very small files that do a single thing.

Libraries used:
- @gorhom/bottom-sheet
- @legendapp/list instead of FlatList

# Project File Inventory

- **__tests__/Button-test.tsx**: Unit tests for the Button component.
- **__tests__/ImportAccountScreen-test.tsx**: Unit tests for the Import Account screen.
- **__tests__/Router-test.tsx**: Unit tests for routing logic.
- **app/(auth)/AuthChoiceScreen.tsx**: Screen allowing users to choose between login or account creation.
- **app/(auth)/CreateAccountScreen.tsx**: Screen for creating a new account.
- **app/(auth)/ImportAccountScreen.tsx**: Screen to import existing accounts.
- **app/(auth)/SplashScreen.tsx**: Initial loading or splash screen.
- **app/(tabs)/_layout.tsx**: Layout component for main tab navigation.
- **app/(tabs)/index.tsx**: Main wallet overview and balance display.
- **app/(tabs)/scan.tsx**: QR code scanning interface for transactions.
- **app/(tabs)/settings.tsx**: Screen for user settings and app preferences.
- **app/(tabs)/subscriptions.tsx**: Management screen for user subscriptions.
- **app/_layout.tsx**: Global app layout wrapper.
- **app/mints/management.tsx**: Comprehensive mint configuration and management.
- **app/modal.tsx**: Generic modal component used throughout the app.
- **app/subscriptions/[id].tsx**: Detailed subscription information and management screen.
- **app/subscriptions/creators/[id].tsx**: Creator profile and subscription initiation screen.
- **app/subscriptions/explore.tsx**: Screen for discovering and subscribing to new creators.

## Hooks

## Components
- **components/AcornLogo.tsx**: Logo component for the app.
- **components/DrawerContent.tsx**: Content layout for app drawers.
- **components/EditScreenInfo.tsx**: Component for editing screen information.
- **components/ExternalLink.tsx**: Component for external link handling.
- **components/NDKHeadless.tsx**: Component for headless NDK interaction.
- **components/ReceiveModal.tsx**: Modal component for receiving transactions.
- **components/SendModal.tsx**: Modal component for sending transactions.
- **components/StyledText.tsx**: Styled text component.
- **components/Themed.tsx**: Component managing theming.
- **components/TransactionItem.tsx**: Component displaying individual transaction items.
- **components/TransactionList.tsx**: List component displaying transaction history.
- **components/UserAvatar.tsx**: Component displaying user avatars.
- **components/WalletHeader.tsx**: Wallet header component displaying user balance and actions.
- **components/__tests__/StyledText-test.js**: Unit tests for StyledText component.
- **components/useColorScheme.ts**: Hook to handle color scheme.
- **components/useColorScheme.web.ts**: Web-specific color scheme hook.

## Lib
- **lib/ndk.ts**: NDK library integration and utilities.

