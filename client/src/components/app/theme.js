import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";

// colors
const primary = "#7f5af0";
const secondary = "#fffffe";
const tertiary = "#2cb67d";
const black = "#16161a";
const darkBlack = "#010101";
const background = "#242629";
const alertRed = "#ef4565";
const grey = "#72757e";
const textPrimary = "#94a1b2";
const warningLight = "rgba(253, 200, 69, .3)";
const warningMain = "rgba(253, 200, 69, .5)";
const warningDark = "rgba(253, 200, 69, .7)";

// border
const borderWidth = 2;
const borderColor = "rgba(0, 0, 0, 0.13)";

// breakpoints
const xl = 1920;
const lg = 1280;
const md = 960;
const sm = 600;
const xs = 0;

// spacing
const spacing = 8;

const theme = createMuiTheme({
  palette: {
    primary: { main: primary },
    secondary: { main: secondary },
    tertiary: { main: tertiary },
    textPrimary: textPrimary,
    common: {
      black,
      darkBlack,
      grey,
      alertRed
    },
    warning: {
      light: warningLight,
      main: warningMain,
      dark: warningDark
    },
    // Used to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
    background: {
      default: background
    },
    spacing
  },
  breakpoints: {
    // Define custom breakpoint values.
    // These will apply to Material-UI components that use responsive
    // breakpoints, such as `Grid` and `Hidden`. You can also use the
    // theme breakpoint functions `up`, `down`, and `between` to create
    // media queries for these breakpoints
    values: {
      xl,
      lg,
      md,
      sm,
      xs
    }
  },
  border: {
    borderColor: borderColor,
    borderWidth: borderWidth
  },
  overrides: {
    MuiExpansionPanel: {
      root: {
        position: "static"
      }
    },
    MuiTableCell: {
      root: {
        paddingLeft: spacing * 2,
        paddingRight: spacing * 2,
        borderBottom: `${borderWidth}px solid ${borderColor}`,
        [`@media (max-width:  ${sm}px)`]: {
          paddingLeft: spacing,
          paddingRight: spacing
        }
      }
    },
    MuiPaper: {
      root: {
        backgroundColor: black
      }
    },
    MuiDivider: {
      root: {
        backgroundColor: grey,
        height: borderWidth
      }
    },
    MuiTypography: {
      root: {
        color: secondary
      },
      body1: {
        fontSize: "1.2rem"
      },
      body2: {
        fontSize: "0.9rem",
        fontWeight: "600"
      }
    },
    MuiPrivateNotchedOutline: {
      root: {
        borderWidth: borderWidth
      }
    },
    MuiListItem: {
      divider: {
        borderBottom: `${borderWidth}px solid ${borderColor}`
      }
    },
    MuiDialog: {
      paper: {
        width: "100%",
        maxWidth: 430,
        marginLeft: spacing,
        marginRight: spacing
      }
    },
    MuiTooltip: {
      tooltip: {
        backgroundColor: darkBlack
      }
    },
    MuiExpansionPanelDetails: {
      root: {
        [`@media (max-width:  ${sm}px)`]: {
          paddingLeft: spacing,
          paddingRight: spacing
        }
      }
    },
    MuiInputLabel: {
      root: {
        color: secondary
      }
    },
    MuiInputBase: {
      input: {
        color: tertiary,
        fontFamily: "proxima-nova, sans-serif"
      }
    },
    MuiCardHeader: {
      subheader: {
        color: textPrimary
      }
    },
    MuiOutlinedInput: {
      notchedOutline: {
        borderColor: secondary
      }
    }
  },
  typography: {
    fontFamily: "proxima-nova, sans-serif",
    useNextVariants: true
  }
});

export default responsiveFontSizes(theme);
