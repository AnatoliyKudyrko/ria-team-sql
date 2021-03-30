import React, {useEffect, useState} from "react";
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
import {useDispatch, useSelector} from "react-redux";
import io from "socket.io-client";
import {SERVER} from "../dal/connectService";
import {FetchDataUser} from "../redux/action/action";

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
    const data = useSelector(state => state.Auth.data);
    const dispatch = useDispatch();
    const [expanded, setExpanded] = React.useState(false);
    const [id,setId] = useState(data.map(item=>item.user_id));
    const [loginUser,setLoginUser] = useState('');
    const [first,setFirst] = useState('');
    const [last,setLast] = useState('');
    const [pass,setPass] = useState('');
    const [newData,setNewData] = useState([]);
    const socket = io(SERVER);

    useEffect(()=>{
        setNewData(data)
    },[data])

    const [values, setValues] = useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });

    const handleChangePassword = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
        setPass(values.password)

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

    const handleChangeFirstName = (event) => {
        setFirst(event.target.value)
    };
    const handleChangeLastName = (event) => {
        setLast(event.target.value)
    };
    const handleChangeLogin = (event) => {
        setLoginUser(event.target.value)
    };

    const ChangeFirst = ()=> {
        const {user_id, login, last_name} = data[0];
        socket.emit('updateUser',
            {
                user_id: user_id,
                login: login,
                first_name: first,
                last_name: last_name
            }, (err, res) => {
                dispatch(FetchDataUser(res.data));
            });
    }
    const ChangeLast = ()=> {
        const {user_id, login,first_name} = data[0];
        socket.emit('updateUser',
            {
                user_id: user_id,
                login: login,
                first_name: first_name,
                last_name: last
            }, (err, res) => {

                dispatch(FetchDataUser(res.data));
            });
    }
    const ChangeLogin = ()=> {
        const {user_id,last_name,first_name} = data[0];
        socket.emit('updateUser',
            {
                user_id: user_id,
                login: loginUser,
                first_name: first_name,
                last_name: last_name,

            }, (err, res) => {

                dispatch(FetchDataUser(res.data));
            });
    }
    const ChangePassword = ()=> {
        const {user_id,last_name,first_name,login} = data[0];
        socket.emit('updateUser',
            {
                user_id: user_id,
                login: login,
                first_name: first_name,
                last_name: last_name,
                password:pass
            }, (err, res) => {

                dispatch(FetchDataUser(res.data));
            });
    }
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
                    <TextField id="standard-basic"
                               onChange={handleChangeFirstName}/>
                    <Button size="small" color="secondary" onClick={()=>ChangeFirst()}>
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
                    <TextField id="standard-basic"
                               value={last}
                               onChange={handleChangeLastName}

                    />
                    <Button size="small" color="secondary" onClick={()=>ChangeLast()}>
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
                        value={loginUser}
                        onChange={handleChangeLogin}
                    />
                    <Button size="small" color="secondary" onClick={()=>ChangeLogin()}>
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
                        value={pass}
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
                    <Button size="small" color="secondary" onClick={()=>ChangePassword()}>
                        Змінити
                    </Button>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

