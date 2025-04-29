export type RootStackParamList = {
  AuthChoice: undefined;
  CreateAccount: undefined;
  ImportAccount: undefined;
  // Add other screens as needed
};

// Extend this type to include all screens in your app
export type AppScreens = keyof RootStackParamList;