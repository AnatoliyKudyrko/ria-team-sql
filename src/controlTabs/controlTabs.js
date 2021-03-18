import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import {SelectContainer} from "../selectContainer/selectContainer";
import {SelectViewContainer} from "../SelectViewContainer/SelectViewContainer";
import {PageSelect} from "../pageSelect/pageSelect";
import {Container, Paper} from "@material-ui/core";

const TabPanel = (props) => {
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

const a11yProps = (index) => {
    return {
        id: `nav-tab-${index}`,
        'aria-controls': `nav-tabpanel-${index}`,
    };
}

const LinkTab = (props) => {
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
    flex: {
        display: 'flex',
        flexDirection:'row'
    },
}));

 const ControlTabs = (props)=> {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root} >
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
           <Paper>
            <TabPanel value={value} index={0} >
                    <SelectContainer />
            </TabPanel>
               <TabPanel value={value} index={1}>

               </TabPanel>
            <TabPanel value={value} index={2}>
                Page Three
            </TabPanel>
           </Paper>
        </div>
    );
}
export default ControlTabs;