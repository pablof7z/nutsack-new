import { createStyleSheet } from "react-native-unistyles";
import type { AppTheme } from "../constants/theme";

export const listItemStylesheet = createStyleSheet((theme: AppTheme) => ({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border ?? "#E5E7EB",
    backgroundColor: "transparent",
    marginBottom: 0,
    marginHorizontal: 0,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 12,
    backgroundColor: "#81C784", // default active
  },
  statusDotOverdue: {
    backgroundColor: "#E57373",
  },
  statusDotDueSoon: {
    backgroundColor: "#FFD54F",
  },
  statusDotActive: {
    backgroundColor: "#81C784",
  },
}));