import { createStyleSheet } from "react-native-unistyles";

export const stylesheet = createStyleSheet({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    padding: 16,
  },
  text: {
    fontSize: 20,
    fontWeight: "400",
    color: "#333",
  },
});