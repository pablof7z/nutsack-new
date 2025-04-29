export type AppTheme = {
  colors: {
    // Core UI colors
    background: string;
    foreground: string;
    primary: string;
    primaryForeground: string;
    secondary: string;
    secondaryForeground: string;

    // Transaction colors
    incoming: string;
    outgoing: string;

    // Status indicators
    success: string;
    warning: string;
    error: string;

    // UI Elements
    cardBackground: string;
    buttonBackground: string;
    buttonForeground: string;
    muted: string;

    // Border and shadows
    border: string;
    shadow: string;
  };

  typography: {
    fontFamily: string;
    sizes: {
      xl: number;
      lg: number;
      base: number;
      sm: number;
      xs: number;
    };
    weights: {
      bold: string;
      medium: string;
      regular: string;
    };
  };

  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };

  borderRadius: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };

  shadows: {
    sm: string;
    md: string;
    lg: string;
  };
};

export const lightTheme: AppTheme = {
  colors: {
    background: "#ffffff",
    foreground: "#18181b",
    primary: "#1a73e8",
    primaryForeground: "#ffffff",
    secondary: "#6b7280",
    secondaryForeground: "#ffffff",
    incoming: "#22c55e",
    outgoing: "#ef4444",
    success: "#22c55e",
    warning: "#facc15",
    error: "#ef4444",
    cardBackground: "#f9fafb",
    buttonBackground: "#1a73e8",
    buttonForeground: "#ffffff",
    muted: "#9ca3af",
    border: "#e5e7eb",
    shadow: "rgba(0,0,0,0.1)",
  },

  typography: {
    fontFamily: "Inter, sans-serif",
    sizes: {
      xl: 24,
      lg: 20,
      base: 16,
      sm: 14,
      xs: 12,
    },
    weights: {
      bold: "700",
      medium: "500",
      regular: "400",
    },
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },

  borderRadius: {
    sm: 4,
    md: 8,
    lg: 16,
    xl: 24,
  },

  shadows: {
    sm: "0px 1px 2px rgba(0,0,0,0.05)",
    md: "0px 4px 6px rgba(0,0,0,0.1)",
    lg: "0px 10px 15px rgba(0,0,0,0.15)",
  },
};

export const darkTheme: AppTheme = {
  colors: {
    background: "#121212",
    foreground: "#f9fafb",
    primary: "#3b82f6",
    primaryForeground: "#ffffff",
    secondary: "#374151",
    secondaryForeground: "#ffffff",
    incoming: "#4ade80",
    outgoing: "#f87171",
    success: "#4ade80",
    warning: "#facc15",
    error: "#f87171",
    cardBackground: "#1f2937",
    buttonBackground: "#3b82f6",
    buttonForeground: "#ffffff",
    muted: "#6b7280",
    border: "#374151",
    shadow: "rgba(0,0,0,0.5)",
  },

  typography: {
    fontFamily: "Inter, sans-serif",
    sizes: {
      xl: 24,
      lg: 20,
      base: 16,
      sm: 14,
      xs: 12,
    },
    weights: {
      bold: "700",
      medium: "500",
      regular: "400",
    },
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },

  borderRadius: {
    sm: 4,
    md: 8,
    lg: 16,
    xl: 24,
  },

  shadows: {
    sm: "0px 1px 3px rgba(0,0,0,0.2)",
    md: "0px 4px 8px rgba(0,0,0,0.3)",
    lg: "0px 10px 20px rgba(0,0,0,0.4)",
  },
};
