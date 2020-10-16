import React, {useState, useEffect} from 'react';
import axios from 'axios';
// @material-ui/core components
import {makeStyles, ThemeProvider} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
// layout for this page
import Admin from 'layouts/Admin.js';
//redux app state management
import {connect} from 'react-redux';
import {setInfo} from '../../redux/action/main';
import {toast} from 'react-toastify';
// core components
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import CustomInput from 'components/CustomInput/CustomInput.js';
import Button from 'components/CustomButtons/Button.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardAvatar from 'components/Card/CardAvatar.js';
import CardBody from 'components/Card/CardBody.js';
import CardFooter from 'components/Card/CardFooter.js';
import Primary from 'components/Typography/Primary.js';
import Router from 'next/router';
import Typography from '@material-ui/core/Typography';
import {createMuiTheme, responsiveFontSizes} from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';
import Link from 'next/link';
import Avatar, {bold} from 'assets/img/profile/admin.png';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import {Grid} from '@material-ui/core';

const mapDispatchToProps = {
  setInfo: setInfo,
};

const mapStateToProps = (state) => ({
  userInfo: state.main,
});

let theme = createMuiTheme({
  spacing: 5,
  typography: {
    h5: {
      color: '#808080',
      fontWeight: 500,
      fontSize: 18,
    },
    subtitle1: {
      fontSize: 12,
    },
    body1: {
      fontWeight: 500,
    },
    button: {
      fontStyle: 'italic',
    },
  },
});
theme = responsiveFontSizes(theme);

const styles = {
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0',
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
  },
  cardProfile: {
    margin: theme.spacing(6, 1, 6, 1),
  },
  inputStyle: {
    '& .MuiTextField-root': {
      margin: theme.spacing(0),
      marginBottom: '1em',
      marginTop: '1em',
      width: '100%',
    },
  },
  formHeader: {
    marginTop: '3.5em',
    marginBottom: '-1em',
  },
};

const useStyles = makeStyles(styles);

function AdminProfileEdit(props) {
  const classes = useStyles();
  useEffect(() => {
    if (userInfo.adminId === '') {
      Router.push('login');
      return;
    }
  }, []);

  const {userInfo, setInfo} = props;
  const [name, setName] = useState(props.userInfo.name);
  const [email, setEmail] = useState(props.userInfo.email);

  // For form validation
  const [emailErrorCheck, setEmailErrorCheck] = useState(false);
  const [emailErrorText, setEmailErrorText] = useState();

  const validateEmail = (email) => {
    let regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  };

  const updateName = (e) => {
    e.preventDefault();
    console.log('Input is updating');
    const name = e.target.value;
    setName(name);
    console.log('Updated name is ' + name);
  };

  const updateEmail = (e) => {
    e.preventDefault();
    console.log('Input is updating');
    const email = e.target.value;
    setEmail(email);
    // Check if email is in the right format
    if (validateEmail(email)) {
      setEmailErrorCheck(false);
      setEmailErrorText('');
    } else {
      setEmailErrorCheck(true);
      setEmailErrorText('Invalid email format!');
    }
  };

  async function handleUpdateProfile() {
    try {
      console.log('handle update profile');
      if (!name) {
        errorNotify('Name field is empty');
        throw 'Name field is blank';
      } else if (!email) {
        errorNotify('Email field is empty');
        throw 'Email field is blank';
      } else if (!validateEmail(email)) {
        errorNotify('Email format is invalid');
        throw 'Email format is invalid'
      }
      console.log('Call update profile API');
      const response = await axios.put(
        'http://localhost:3000/admins/update-admin',
        {
          adminId: userInfo.adminId,
          name: name,
          email: email,
        }
      );
      console.log('change success!');
      console.log(response.data);
      setInfo(response.data);
      successNotify();
      Router.push('admin-profile');
    } catch (e) {
      console.error(e);
    }
  }

  toast.configure();

  const errorNotify = (err) => {
    toast.error(err, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    });
  };

  const successNotify = () => {
    toast.success('User profile updated successfully!', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    });
  };

  return (
    <div>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            {/* Card header */}
            <CardHeader color="info">
              <h4
                style={{textAlign: 'center'}}
                className={classes.cardTitleWhite}>
                Edit Profile Details
              </h4>
            </CardHeader>

            {/* New UI Testing */}
            <CardBody>
              <GridContainer justify="center">
                {/* style={{margin: 'auto'}} */}
                <GridItem xs={12} sm={12} md={8}>
                  <form
                    className={classes.inputStyle}
                    noValidate
                    autoComplete="off">
                    {/* Name */}
                    <div className={classes.formHeader}>
                      <Typography gutterBottom variant="h5" component="h8">
                        Name:
                      </Typography>
                      <TextField
                        required
                        id="outlined-name-required"
                        // label="Name"
                        value={name}
                        onChange={updateName}
                        error={name === '' ? true : false}
                        helperText={name === '' ? "Name is required": ""}
                        variant="outlined"></TextField>
                    </div>

                    {/* Email */}
                    <div className={classes.formHeader}>
                      <Typography gutterBottom variant="h5" component="h8">
                        Email:
                      </Typography>
                      <TextField
                        required
                        id="outlined-email-required"
                        // label="Email"
                        type="email"
                        value={email}
                        onChange={updateEmail}
                        error={Boolean(emailErrorCheck)}
                        helperText={emailErrorText}
                        variant="outlined"></TextField>
                    </div>
                  </form>
                </GridItem>
              </GridContainer>
            </CardBody>

            {/* Old UI */}
            {/* <CardBody>
              <GridContainer>
                <GridItem style={{margin: 'auto'}} xs={12} sm={12} md={6}>
                  <br />
                  <CardHeader color="primary">
                    <h6
                      style={{textAlign: 'center'}}
                      className={classes.cardTitleWhite}>
                      Name
                    </h6>
                  </CardHeader>
                  <CustomInput
                    name="name"
                    value={name}
                    onChange={updateName}
                    id="name"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: 'text',
                    }}
                  />
                </GridItem>
              </GridContainer>

              <br />

              <GridContainer>
                <GridItem style={{margin: 'auto'}} xs={12} sm={12} md={6}>
                  <CardHeader color="primary">
                    <h6
                      style={{textAlign: 'center'}}
                      className={classes.cardTitleWhite}>
                      Email
                    </h6>
                  </CardHeader>
                  <CustomInput
                    name="email"
                    value={email}
                    onChange={updateEmail}
                    id="email"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: 'text',
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody> */}

            {/* Confirm button */}
            <CardFooter style={{margin: 'auto'}}>
              <div className={classes.cardProfile}>
                <Button color="info" onClick={handleUpdateProfile}>
                  Confirm
                </Button>
              </div>
            </CardFooter>
          </Card>
        </GridItem>

        {/* Profile Info at the right side */}
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            {/* Avatar Image */}
            <CardAvatar profile>
              <a href="#pablo" onClick={(e) => e.preventDefault()}>
                <img src={Avatar} alt="..." />
              </a>
            </CardAvatar>

            <CardBody profile>
              <ThemeProvider theme={theme}>
                <div className={classes.cardProfile}>
                  <Box b={2}>
                    <Typography gutterBottom variant="h5" component="h8">
                      Name:
                    </Typography>
                  </Box>

                  <Box b={5}>
                    <Typography gutterBottom variant="h6" component="h8">
                      {userInfo.name}
                    </Typography>
                  </Box>
                </div>

                <Divider variant="middle" />

                <div className={classes.cardProfile}>
                  <Box b={5}>
                    <Typography gutterBottom variant="h5" component="h8">
                      Email:
                    </Typography>
                  </Box>

                  <Box b={5}>
                    <Typography gutterBottom variant="h6" component="h8">
                      {userInfo.email}
                    </Typography>
                  </Box>
                </div>

                <Divider variant="middle" />

                <div className={classes.cardProfile}>
                  <Box b={5}>
                    <Typography gutterBottom variant="h5">
                      Admin Type:
                    </Typography>
                  </Box>
                  {userInfo.adminType === 'SUPER_ADMIN' ? (
                    <Chip label="Super Admin" color="secondary" />
                  ) : (
                    <Chip label="Admin" color="secondary" />
                  )}
                </div>
              </ThemeProvider>
            </CardBody>
          </Card>
        </GridItem>

        {/* Old Section */}
        {/* <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={(e) => e.preventDefault()}>
                <img src={Avatar} alt="..." />
              </a>
            </CardAvatar>

            <CardBody profile>
              <strong className={classes.cardTitle}>{userInfo.name}</strong>
              <Primary className={classes.cardTitle}>
                <b>{userInfo.adminType}</b>
              </Primary>
              <br></br>

              <strong>Description:</strong>
              <p className={classes.description}>
                I hope that everyone will play their part to fight the COVID-19
                pandemic.
              </p>
            </CardBody>
          </Card>
        </GridItem> */}
      </GridContainer>
    </div>
  );
}

AdminProfileEdit.layout = Admin;

export default connect(mapStateToProps, mapDispatchToProps)(AdminProfileEdit);
