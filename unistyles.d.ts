import "react-native-unistyles";
import type { AppTheme } from "./constants/theme";


declare module 'react-native-unistyles' {
    export interface UnistylesThemes extends AppTheme {}
}

export {};