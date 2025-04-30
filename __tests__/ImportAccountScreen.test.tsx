// All imports moved to the bottom after mocks
// Mock react-native first
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  const React = require('react');
  return {
    ...RN,
    View: function View(props) {
      return React.createElement('view', props);
    }
  };
});

// Mock expo-linear-gradient
jest.mock('expo-linear-gradient', () => {
  const React = require('react');
  return {
    LinearGradient: function LinearGradient(props) {
      const RN = require('react-native');
      return React.createElement(RN.View, props);
    }
  }
});

// Mock AcornLogo
jest.mock('../../components/AcornLogo', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: function AcornLogo(props) {
      const RN = require('react-native');
      return React.createElement(RN.View, { ...props, testID: "acorn-logo" });
    }
  }
});

// Mock NDK dependencies
jest.mock('@nostr-dev-kit/ndk-mobile', () => ({
  NDKPrivateKeySigner: jest.fn().mockImplementation(function(key) {
    return {
      key: key,
      type: 'nsec'
    };
  }),
  NDKNip46Signer: jest.fn().mockImplementation(function(ndk, url) {
    return {
      ndk: ndk,
      url: url,
      type: 'bunker'
    };
  }),
  useNDKSessionLogin: jest.fn().mockReturnValue(jest.fn())
}));

// Mock router
jest.mock('expo-router', () => ({
  router: {
    replace: jest.fn()
  }
}));

// Mock NDK singleton
jest.mock('../../lib/ndk', () => ({
  __esModule: true,
  default: {
    connect: jest.fn()
  }
}));

// Import after mocks
import ImportAccountScreen from '../app/(auth)/ImportAccountScreen';
import { router } from 'expo-router';

describe('ImportAccountScreen', () => {
  const mockNdkLogin = jest.fn() as jest.MockedFunction<(signer: any) => Promise<void>>;
  
  beforeEach(() => {
    jest.clearAllMocks();
    // Setup the mock for useNDKSessionLogin
    const { useNDKSessionLogin } = require('@nostr-dev-kit/ndk-mobile');
    (useNDKSessionLogin as jest.Mock).mockReturnValue(mockNdkLogin);
  });

  test('renders correctly with initial state', () => {
    // Arrange & Act
    const { getByText, getByPlaceholderText } = render(<ImportAccountScreen />);
    
    // Assert
    expect(getByText('Import Account')).toBeTruthy();
    expect(getByPlaceholderText('Paste nsec or bunker://')).toBeTruthy();
    expect(getByText('IMPORT')).toBeTruthy();
  });

  test('button is disabled when input is empty', () => {
    // Arrange
    const { getByText } = render(<ImportAccountScreen />);
    const importButton = getByText('IMPORT').parent.parent;
    
    // Assert
    expect(importButton.props.disabled).toBeTruthy();
  });

  test('button is enabled when input is not empty', () => {
    // Arrange
    const { getByText, getByPlaceholderText } = render(<ImportAccountScreen />);
    const input = getByPlaceholderText('Paste nsec or bunker://');
    
    // Act
    fireEvent.changeText(input, 'nsec1abcdef');
    const importButton = getByText('IMPORT').parent.parent;
    
    // Assert
    expect(importButton.props.disabled).toBeFalsy();
  });

  test('shows error for invalid input format', async () => {
    // Arrange
    const { getByText, getByPlaceholderText } = render(<ImportAccountScreen />);
    const input = getByPlaceholderText('Paste nsec or bunker://');
    
    // Act
    fireEvent.changeText(input, 'invalid-key');
    fireEvent.press(getByText('IMPORT').parent.parent);
    
    // Assert
    await waitFor(() => {
      expect(getByText('Invalid key format. Please enter a valid nsec or bunker:// key.')).toBeTruthy();
    });
  });

  test('creates NDKPrivateKeySigner for nsec input and calls login', async () => {
    // Arrange
    const { getByText, getByPlaceholderText } = render(<ImportAccountScreen />);
    const input = getByPlaceholderText('Paste nsec or bunker://');
    const { NDKPrivateKeySigner } = require('@nostr-dev-kit/ndk-mobile');
    mockNdkLogin.mockResolvedValueOnce();
    
    // Act
    fireEvent.changeText(input, 'nsec1abcdef');
    fireEvent.press(getByText('IMPORT').parent.parent);
    
    // Assert
    await waitFor(() => {
      expect(NDKPrivateKeySigner).toHaveBeenCalledWith('nsec1abcdef');
      expect(mockNdkLogin).toHaveBeenCalled();
      expect(router.replace).toHaveBeenCalledWith('/(tabs)');
    });
  });

  test('creates NDKNip46Signer for bunker:// input and calls login', async () => {
    // Arrange
    const { getByText, getByPlaceholderText } = render(<ImportAccountScreen />);
    const input = getByPlaceholderText('Paste nsec or bunker://');
    const { NDKNip46Signer } = require('@nostr-dev-kit/ndk-mobile');
    mockNdkLogin.mockResolvedValueOnce();
    
    // Act
    fireEvent.changeText(input, 'bunker://example.com');
    fireEvent.press(getByText('IMPORT').parent.parent);
    
    // Assert
    await waitFor(() => {
      expect(NDKNip46Signer).toHaveBeenCalled();
      expect(mockNdkLogin).toHaveBeenCalled();
      expect(router.replace).toHaveBeenCalledWith('/(tabs)');
    });
  });

  test('shows error when login fails', async () => {
    // Arrange
    const { getByText, getByPlaceholderText } = render(<ImportAccountScreen />);
    const input = getByPlaceholderText('Paste nsec or bunker://');
    mockNdkLogin.mockRejectedValueOnce(new Error('Login failed'));
    
    // Act
    fireEvent.changeText(input, 'nsec1abcdef');
    fireEvent.press(getByText('IMPORT').parent.parent);
    
    // Assert
    await waitFor(() => {
      expect(getByText('Login failed')).toBeTruthy();
    });
  });

  test('shows loading indicator when login is in progress', async () => {
    // Arrange
    const { getByText, getByPlaceholderText } = render(<ImportAccountScreen />);
    const input = getByPlaceholderText('Paste nsec or bunker://');
    
    // Setup a promise that won't resolve immediately
    let resolveLogin: (value: void | PromiseLike<void>) => void = () => {};
    mockNdkLogin.mockImplementationOnce(() => new Promise<void>(resolve => {
      resolveLogin = resolve;
    }));
    
    // Act
    fireEvent.changeText(input, 'nsec1abcdef');
    fireEvent.press(getByText('IMPORT').parent.parent);
    
    // Assert - ActivityIndicator should be visible
    await waitFor(() => {
      expect(() => getByText('IMPORT')).toThrow();
    });
    
    // Resolve the login promise
    resolveLogin();
    
    // Assert - Button text should be visible again
    await waitFor(() => {
      expect(getByText('IMPORT')).toBeTruthy();
    });
  });
});