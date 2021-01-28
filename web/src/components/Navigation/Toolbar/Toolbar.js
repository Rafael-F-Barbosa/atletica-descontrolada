import React from 'react';

import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => (
	<header className={classes.Toolbar}>
		<div className={classes.Center}>
			<div className={classes.Logo}>
				<Logo />
			</div>
			<div className={classes.DesktopOnly}>
				<NavigationItems isAuth={props.isAuth} />
			</div>
			<DrawerToggle clicked={props.drawerToggleClicked} />
		</div>
	</header>
);

export default toolbar;
