import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from "@material-ui/core/TextField";
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from "@material-ui/core/Button";
import {useSelector} from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },

}));


export default function UserPanel() {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const data = useSelector(state => state.Auth.data);

    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });

    const handleChangePassword = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div className={classes.root}>
            <h2>Особистий кабінет</h2>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography className={classes.heading}>Імя</Typography>
                    <Typography className={classes.secondaryHeading}>{data.map(item=>item.first_name)}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <TextField id="standard-basic" defaultValue= {data.map(item=>item.first_name)} />
                    <Button size="small" color="secondary">
                        Змінити
                    </Button>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2bh-content"
                    id="panel2bh-header"
                >
                    <Typography className={classes.heading}>Прізвище</Typography>
                    <Typography className={classes.secondaryHeading}>
                        {data.map(item=>item.last_name)}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.accordionDetails}>
                    <TextField id="standard-basic" defaultValue= {data.map(item=>item.last_name)} />
                    <Button size="small" color="secondary">
                        Змінити
                    </Button>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3bh-content"
                    id="panel3bh-header"
                >
                    <Typography className={classes.heading}>Email</Typography>
                    <Typography className={classes.secondaryHeading}>
                        {data.map(item=>item.login)}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <TextField
                        id="email"
                        name="email"
                        autoComplete="email"
                        defaultValue = {data.map(item=>item.login)}
                    />
                    <Button size="small" color="secondary">
                        Змінити
                    </Button>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel4bh-content"
                    id="panel4bh-header"
                >
                    <Typography className={classes.heading}>Пароль</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Input
                        id="standard-adornment-password"
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChangePassword('password')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    <Button size="small" color="secondary">
                        Змінити
                    </Button>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

