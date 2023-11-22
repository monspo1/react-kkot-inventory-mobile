import { DefaultTheme, configureFonts, MD2LightTheme, MD3LightTheme, MD3DarkTheme, MD5LightTheme,
} from 'react-native-paper';

//# ------------------------------------------------------
export const customTheme1 = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'orange',
      accent: 'yellow',
    },
}


//# ------------------------------------------------------
const fontConfig2 = {
  web: {
    regular: {
      fontFamily: 'sans-serif',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'sans-serif-medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'sans-serif-light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'sans-serif-thin',
      fontWeight: 'normal',
    },
  },
  ios: {
    regular: {
      fontFamily: 'sans-serif',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'sans-serif-medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'sans-serif-light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'sans-serif-thin',
      fontWeight: 'normal',
    },
  },
  android: {
    regular: {
      fontFamily: 'sans-serif',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'sans-serif-medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'sans-serif-light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'sans-serif-thin',
      fontWeight: 'normal',
    },
  }
};

export const customTheme2 = {
  ...MD2LightTheme,
  fonts: configureFonts({config: fontConfig2, isV3: false}),
};

//# ------------------------------------------------------ 
const fontConfigMD3 = {
  customVariant: {
    fontFamily: Platform.select({
      web: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
      ios: 'System',
      default: 'sans-serif',
    }),
    fontWeight: '400',
    letterSpacing: 0.5,
    lineHeight: 22,
    fontSize: 20,
  }
};

export const customTheme3 = {
  ...MD3LightTheme,
  fonts: configureFonts({config: fontConfigMD3}),
}

export const customTheme4 = {
  ...DefaultTheme,
  dark: false,
  roundness: 4,
  colors: {
    ...DefaultTheme.colors,
    primary: "#FF0000",
    primaryContainer: "#7FAF73",
    secondary: "#00FF00",
    secondaryContainer: "#FFFF00",
    tertiary: "#800080",
    tertiaryContainer: "#FFA500",
    surface: "#FFC0CB",
    surfaceVariant: "#008080",
    surfaceDisabled: "#808080",
    background: "#FFFFFF",
    error: "#A52A2A",
    errorContainer: "#808080",
    onPrimary: "#00FFFF",
    onPrimaryContainer: "#FFFFFF",
    onSecondary: "#00FF00",
    onSecondaryContainer: "#808000",
    onTertiary: "#800000",
    onTertiaryContainer: "#000080",
    onSurface: "#C0C0C0",
    onSurfaceVariant: "#FFD700",
    onSurfaceDisabled: "#808080",
    onError: "#4B0082",
    onErrorContainer: "#FF7F50",
    onBackground: "#F5F5DC",
    outline: "#CD853F",
    outlineVariant: "#708090",
    inverseSurface: "#7FFFD4",
    inverseOnSurface: "#BDB76B",
    inversePrimary: "#DA70D6",
    shadow: "#E6E6FA",
    scrim: "#D8BFD8",
    backdrop: "#808080",
  },
};

export const customTheme5Light = {
  ...DefaultTheme,
  colors: {
    "primary": "rgb(53, 107, 0)",
    "onPrimary": "rgb(255, 255, 255)",
    "primaryContainer": "rgb(156, 250, 81)",
    "onPrimaryContainer": "rgb(12, 32, 0)",
    "secondary": "rgb(86, 98, 75)",
    "onSecondary": "rgb(255, 255, 255)",
    "secondaryContainer": "rgb(218, 231, 201)",
    "onSecondaryContainer": "rgb(20, 30, 12)",
    "tertiary": "rgb(56, 102, 101)",
    "onTertiary": "rgb(255, 255, 255)",
    "tertiaryContainer": "rgb(187, 236, 234)",
    "onTertiaryContainer": "rgb(0, 32, 31)",
    "error": "rgb(186, 26, 26)",
    "onError": "rgb(255, 255, 255)",
    "errorContainer": "rgb(255, 218, 214)",
    "onErrorContainer": "rgb(65, 0, 2)",
    "background": "rgb(253, 253, 245)",
    "onBackground": "rgb(26, 28, 24)",
    "surface": "rgb(253, 253, 245)",
    "onSurface": "rgb(26, 28, 24)",
    "surfaceVariant": "rgb(224, 228, 214)",
    "onSurfaceVariant": "rgb(68, 72, 62)",
    "outline": "rgb(116, 121, 109)",
    "outlineVariant": "rgb(196, 200, 186)",
    "shadow": "rgb(0, 0, 0)",
    "scrim": "rgb(0, 0, 0)",
    "inverseSurface": "rgb(47, 49, 44)",
    "inverseOnSurface": "rgb(241, 241, 234)",
    "inversePrimary": "rgb(129, 221, 54)",
    "elevation": {
      "level0": "transparent",
      "level1": "rgb(243, 246, 233)",
      "level2": "rgb(237, 241, 225)",
      "level3": "rgb(231, 237, 218)",
      "level4": "rgb(229, 236, 216)",
      "level5": "rgb(225, 233, 211)"
    },
    "surfaceDisabled": "rgba(26, 28, 24, 0.12)",
    "onSurfaceDisabled": "rgba(26, 28, 24, 0.38)",
    "backdrop": "rgba(45, 50, 40, 0.4)",
    "custom0": "rgb(135, 82, 0)",
    "onCustom0": "rgb(255, 255, 255)",
    "custom0Container": "rgb(255, 221, 186)",
    "onCustom0Container": "rgb(43, 23, 0)"
  },
}

export const MaterialLightTheme = {
  ...MD3LightTheme,
  "colors": {
    "primary": "rgb(17, 96, 164)",
    "onPrimary": "rgb(255, 255, 255)",
    "primaryContainer": "rgb(211, 228, 255)",
    "onPrimaryContainer": "rgb(0, 28, 56)",
    "secondary": "rgb(84, 95, 112)",
    "onSecondary": "rgb(255, 255, 255)",
    "secondaryContainer": "rgb(215, 227, 248)",
    "onSecondaryContainer": "rgb(16, 28, 43)",
    "tertiary": "rgb(108, 86, 119)",
    "onTertiary": "rgb(255, 255, 255)",
    "tertiaryContainer": "rgb(244, 217, 255)",
    "onTertiaryContainer": "rgb(38, 20, 49)",
    "error": "rgb(186, 26, 26)",
    "onError": "rgb(255, 255, 255)",
    "errorContainer": "rgb(255, 218, 214)",
    "onErrorContainer": "rgb(65, 0, 2)",
    "background": "rgb(253, 252, 255)",
    "onBackground": "rgb(26, 28, 30)",
    "surface": "rgb(253, 252, 255)",
    "onSurface": "rgb(26, 28, 30)",
    "surfaceVariant": "rgb(223, 226, 235)",
    "onSurfaceVariant": "rgb(67, 71, 78)",
    "outline": "rgb(115, 119, 127)",
    "outlineVariant": "rgb(195, 198, 207)",
    "shadow": "rgb(0, 0, 0)",
    "scrim": "rgb(0, 0, 0)",
    "inverseSurface": "rgb(47, 48, 51)",
    "inverseOnSurface": "rgb(241, 240, 244)",
    "inversePrimary": "rgb(161, 201, 255)",
    "elevation": {
      "level0": "transparent",
      "level1": "rgb(241, 244, 250)",
      "level2": "rgb(234, 240, 248)",
      "level3": "rgb(227, 235, 245)",
      "level4": "rgb(225, 233, 244)",
      "level5": "rgb(220, 230, 242)"
    },
    "surfaceDisabled": "rgba(26, 28, 30, 0.12)",
    "onSurfaceDisabled": "rgba(26, 28, 30, 0.38)",
    "backdrop": "rgba(44, 49, 55, 0.4)",
    "customHeader": "rgb(255, 255, 255)"
  }
};

export const MaterialDarkTheme = {
  ...MD3DarkTheme,
  "colors": {
    "primary": "rgb(161, 201, 255)",
    "onPrimary": "rgb(0, 50, 91)",
    "primaryContainer": "rgb(0, 72, 128)",
    "onPrimaryContainer": "rgb(0, 52, 77)",
    "secondary": "rgb(187, 199, 219)",
    "onSecondary": "rgb(38, 49, 65)",
    "secondaryContainer": "rgb(60, 72, 88)",
    "onSecondaryContainer": "rgb(215, 227, 248)",
    "tertiary": "rgb(216, 189, 227)",
    "onTertiary": "rgb(60, 41, 71)",
    "tertiaryContainer": "rgb(83, 63, 95)",
    "onTertiaryContainer": "rgb(244, 217, 255)",
    "error": "rgb(255, 180, 171)",
    "onError": "rgb(105, 0, 5)",
    "errorContainer": "rgb(147, 0, 10)",
    "onErrorContainer": "rgb(255, 180, 171)",
    "background": "rgb(26, 28, 30)",
    "onBackground": "rgb(227, 226, 230)",
    "surface": "rgb(26, 28, 30)",
    "onSurface": "rgb(227, 226, 230)",
    "surfaceVariant": "rgb(67, 71, 78)",
    "onSurfaceVariant": "rgb(195, 198, 207)",
    "outline": "rgb(141, 145, 153)",
    "outlineVariant": "rgb(67, 71, 78)",
    "shadow": "rgb(0, 0, 0)",
    "scrim": "rgb(0, 0, 0)",
    "inverseSurface": "rgb(227, 226, 230)",
    "inverseOnSurface": "rgb(47, 48, 51)",
    "inversePrimary": "rgb(17, 96, 164)",
    "elevation": {
      "level0": "transparent",
      "level1": "rgb(33, 37, 41)",
      "level2": "rgb(37, 42, 48)",
      "level3": "rgb(41, 47, 55)",
      "level4": "rgb(42, 49, 57)",
      "level5": "rgb(45, 52, 62)"
    },
    "surfaceDisabled": "rgba(227, 226, 230, 0.12)",
    "onSurfaceDisabled": "rgba(227, 226, 230, 0.38)",
    "backdrop": "rgba(44, 49, 55, 0.4)",
    "customHeader": "rgb(38, 20, 49)"
  }
};
