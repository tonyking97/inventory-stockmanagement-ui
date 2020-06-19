import {createMuiTheme} from "@material-ui/core/styles";

const theme = createMuiTheme({
    typography: {
        fontFamily: [
            'Poppins',
            'sans-serif'
        ].join(','),
    },
    palette: {
        primary: {
            main: "#1b2433",
            // main: "#a01315",
            // mainGradient: "linear-gradient(45deg, #211e20 30%, #a01315 90%)",
        },
        secondary: {
            main: "#0c88ef",
            // main: "#fff"
        },
    },
    overrides: {
        MuiTypography: {
            h4: {
                fontSize: "30px",
                fontWeight: "500",
            }
        },
        MuiListItem: {
            root: {
                "&.Mui-selected": {
                    backgroundColor: "#0c88ef",
                    "&:hover": {
                        backgroundColor: "#0c88ef",
                        // borderRadius: "30px 0px 0px 30px",
                    }
                },
            },
            button: {
                "&:hover": {
                    backgroundColor: "rgba(12,136,239,0.5)",
                    color: "#fff",
                },
            },
        },
    }
});

export const Theme = theme;