import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {
 Checkbox
} from "@material-ui/core";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`nav-tabpanel-${index}`}
            aria-labelledby={`nav-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `nav-tab-${index}`,
        'aria-controls': `nav-tabpanel-${index}`,
    };
}

function LinkTab(props) {
    return (
        <Tab
            component="a"
            onClick={(event) => {
                event.preventDefault();
            }}
            {...props}
        />
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
    },
    colum: {
        display: 'flex',
        flexDirection:'row'
    },
}));

export default function ControlTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs
                    variant="fullWidth"
                    value={value}
                    onChange={handleChange}
                >
                    <LinkTab label="Виборка" href="/select" {...a11yProps(0)} />
                    <LinkTab label="Запити" href="/request" {...a11yProps(1)} />
                    <LinkTab label="Аналітика" href="/analytics" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0} className={{width: '100%'}}>
                            <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}  size="small" />
                            <span>mviews.calltracking</span>
            </TabPanel>
            <TabPanel value={value} index={1}>
                Page Two
            </TabPanel>
            <TabPanel value={value} index={2}>
                Page Three
            </TabPanel>
        </div>
    );
}