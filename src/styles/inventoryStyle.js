import {makeStyles} from "@material-ui/core/styles";

const drawerWidth = 215;
// const navBarColor = "#f95d6a";
// const navBarColor = "#d45087";
// const navBarColor = "#ff7c43";
// const navBarColor = "#006064";
const navBarColor = "#1b2433";

const styles = theme => ({
    root: {
        flexGrow: 1,
        display: 'flex',
        backgroundColor: theme.palette.background.paper,
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        // background: 'linear-gradient(45deg, #211e20 30%, #a01315 90%)',
        background: navBarColor,
        [theme.breakpoints.up('sm')]: {
            background: "#fff",
        },
    },
    appBarLogoPlaceholder: {
        background: navBarColor,
        color: '#fff',
        position: 'absolute',
        left: '50px',
        [theme.breakpoints.up('sm')]: {
            left: '0px',
        },
        width: drawerWidth,
        height: '100%',
    },
    appBarLogo: {
        height: '100%',
        textAlign: 'left',
        paddingLeft: '5px',
        paddingTop: '12px',
        [theme.breakpoints.up('sm')]: {
            textAlign: 'center',
            paddingLeft: '0px',
            paddingTop: '16px',
        },
    },
    menuIcon: {
        marginLeft: theme.spacing(2),
        color: "#fff",
    },
    menu: {
        // marginLeft: theme.spacing(1),
        minWidth: 0,
        color: "#fff",
    },
    menuName: {
        marginLeft: theme.spacing(1),
        marginTop: 0,
        marginBottom: 0,
    },
    menuAlign: {
        padding:'10px 0 10px 0',
    },
    menuNested:{
        minWidth: 0,
        color: "#fff",
        paddingLeft: theme.spacing(5),
    },
    menuNestedSelected:{
        minWidth: 0,
        color: "#fff",
        paddingLeft: theme.spacing(5),
        backgroundColor: "#000"
    },
    menuExpandIcon:{
        marginRight: 5,
    },
    menuSelector:{
        backgroundColor: "#0c88ef",
        position: 'absolute',
        width: '5%',
        left: 0,
        height: '100%',
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    navBar: {
        backgroundColor: navBarColor,
        height: "100%",
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    logo:{
        marginRight: 'auto',
        marginLeft: 0,
        width: drawerWidth,
        height: 55,
    },
    LogoutMenu:{
        position: 'fixed',
        bottom: theme.spacing(1),
        width: drawerWidth,
        padding:'10px 0 10px 0',
    },
});

export const inventoryStyles = makeStyles(theme => styles(theme));
export const inventoryStylesCore = theme => styles(theme);
