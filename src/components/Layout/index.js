import React, {Component, Fragment} from 'react';
import {Link, withRouter} from 'react-router-dom';
import { compose } from 'recompose'
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import { inventoryStylesCore } from "../../styles";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import {ExpandLess, ExpandMore} from "@material-ui/icons";

class Layout extends Component {
    state = {
        mobileOpen: false,
        open: ("/" === this.props.location.pathname || "/a" === this.props.location.pathname || "/b" === this.props.location.pathname),
    };

    handleDrawerToggle = () => {
        this.setState({ mobileOpen: !this.state.mobileOpen })
    };

    handleClick = () => {
        this.setState({ open: !this.state.open })
    };

    render() {
        const {  classes, location: { pathname }, container, children} = this.props;
        const { mobileOpen } = this.state;
        // this.setState({open: ("/" === pathname || "/a" === pathname || "/b" === pathname)});

        const drawer = (
            <div className={classes.navBar}>
                <div className={classes.toolbar} />
                <Divider />

                <List disablePadding>
                    <ListItem
                        classes={{root: classes.menuAlign}}
                        className={classes.menu}
                        selected={"/" === pathname || "/a" === pathname || "/b" === pathname}
                        button
                        onClick={this.handleClick}
                    >
                        <ListItemIcon className={classes.menu}>
                            <ShoppingCartOutlinedIcon className={classes.menuIcon}/>
                        </ListItemIcon>
                        <ListItemText className={classes.menuName} primary="Items" />
                        {this.state.open ? <ExpandLess className={classes.menuExpandIcon} /> : <ExpandMore className={classes.menuExpandIcon} />}

                    </ListItem>
                    <Divider/>
                    <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                        <List
                            component="div"
                            disablePadding
                        >
                            <ListItem
                                component={Link} to="/"
                                // selected={"/" === pathname}
                                className={ "/" === pathname ? classes.menuNestedSelected : classes.menuNested}
                                button
                            >
                                {
                                    "/" === pathname ?
                                        <div className={classes.menuSelector} />
                                        :
                                        null
                                }
                                <ListItemText className={classes.menuName} primary="Item Categories" />
                            </ListItem>
                            <ListItem
                                component={Link} to="/a"
                                // selected={"/a" === pathname}
                                className={ "/a" === pathname ? classes.menuNestedSelected : classes.menuNested}
                                button
                            >
                                {
                                    "/a" === pathname ?
                                        <div className={classes.menuSelector} />
                                        :
                                        null
                                }
                                <ListItemText className={classes.menuName} primary="Items" />
                            </ListItem>
                            <ListItem
                                component={Link} to="/b"
                                // selected={"/b" === pathname}
                                className={ "/b" === pathname ? classes.menuNestedSelected : classes.menuNested}
                                button
                            >
                                {
                                    "/b" === pathname ?
                                        <div className={classes.menuSelector} />
                                        :
                                        null
                                }
                                <ListItemText className={classes.menuName} primary="Price List" />
                            </ListItem>
                        </List>
                    </Collapse>
                    <ListItem
                        component={Link} to="/sdc"
                        classes={{root: classes.menuAlign}}
                        selected={"/sdc" === pathname}
                        className={classes.menu}
                        button
                    >
                        <ListItemIcon className={classes.menu}>
                            <PersonOutlineIcon className={classes.menuIcon}/>
                        </ListItemIcon>
                        <ListItemText className={classes.menuName} primary="Customers" />
                    </ListItem>
                </List>
            </div>
        );

        return (
            <Fragment>
                <CssBaseline />
                <div className={classes.root}>
                    <AppBar position="fixed" className={classes.appBar} elevation={8}>
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                edge="start"
                                onClick={this.handleDrawerToggle}
                                className={classes.menuButton}
                            >
                                <MenuIcon />
                            </IconButton>
                            <span className={classes.appBarLogoPlaceholder}>
                                <Typography variant="h6" className={classes.appBarLogo} noWrap>
                                    SoftGo Inventory
                                </Typography>
                            </span>
                            {/*<img src={Logo} alt="logo" className={classes.logo}/>*/}
                        </Toolbar>
                    </AppBar>
                    <nav className={classes.drawer} aria-label="menu">
                        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                        <Hidden smUp implementation="css">
                            <Drawer
                                container={container}
                                variant="temporary"
                                open={mobileOpen}
                                onClose={this.handleDrawerToggle}
                                classes={{
                                    paper: classes.drawerPaper,
                                }}
                                ModalProps={{
                                    keepMounted: true, // Better open performance on mobile.
                                }}
                            >
                                {drawer}
                            </Drawer>
                        </Hidden>
                        <Hidden xsDown implementation="css">
                            <Drawer
                                classes={{
                                    paper: classes.drawerPaper,
                                }}
                                variant="permanent"
                                open
                            >
                                {drawer}
                            </Drawer>
                        </Hidden>
                    </nav>
                    <main className={classes.content}>
                        <div className={classes.toolbar} />
                        {children}
                    </main>
                </div>
            </Fragment>
        );
    }
}

export default compose(
    withRouter,
    withStyles(inventoryStylesCore)
)(Layout);