import React, {useState, useEffect} from 'react';
import Router from 'next/router';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
//redux app state management
import {connect} from 'react-redux';
import {setInfo} from '../../redux/action/main';
// @material-ui/core components
import {makeStyles, ThemeProvider} from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
// layout for this page
import Admin from 'layouts/Admin.js';
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
import Typography from '@material-ui/core/Typography';
import {createMuiTheme, responsiveFontSizes} from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';
import Link from 'next/link';
import Avatar, {bold} from 'assets/img/profile/admin.png';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import {Grid} from '@material-ui/core';

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
    margin: theme.spacing(5.5, 1, 5.5, 1),
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

const mapStateToProps = (state) => ({
  userInfo: state.main,
});

const mapDispatchToProps = {
  setInfo: setInfo,
};

function ChangePassword(props) {
  const classes = useStyles();

  useEffect(() => {
    if (userInfo.adminId === '') {
      Router.push('login');
      return;
    }
  }, []);

  //State of password entry
  const [currentPassword, setCurrentPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [newPassword2, setNewPassword2] = useState();
  const {userInfo} = props;
  const [visible, setVisible] = useState(false);

  const updateCurrPassword = (e) => {
    e.preventDefault();
    const currPass = e.target.value;
    setCurrentPassword(currPass);
    console.log('Current password entered is ' + currentPassword);
  };

  const updateNewPassword = (e) => {
    e.preventDefault();
    const newPass = e.target.value;
    setNewPassword(newPass);
    console.log('New password entered is ' + newPassword);
  };

  const updateNewPassword2 = (e) => {
    e.preventDefault();
    const newPass2 = e.target.value;
    setNewPassword2(newPass2);
    console.log('Current password re-entered is ' + newPassword2);
  };

  const updateVisibility = (e) => {
    e.preventDefault();
    setVisible(!visible);
  };

  //API call to change password
  async function handlePassChange() {
    try {
      if (newPassword !== newPassword2) {
        errorNotify('You sure the new password entered is the same bro?');
        throw 'New password entered is different';
      }
      console.log('fetching the change-password API');
      console.log(
        `Sending these user info email:${userInfo.email} currentpassword:${currentPassword} newpassword:${newPassword}`
      );
      try {
        const response = await axios.put(
          'http://localhost:3000/admins/change-password',
          {
            email: userInfo.email,
            currPassword: currentPassword,
            newPassword: newPassword,
          }
        );
        successNotify();
        setInfo(response.data);
        Router.push('admin-profile');
      } catch (error) {
        errorNotify('Current password is incorrect!');
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  }

  // To enable toast notifications
  toast.configure();
  const errorNotify = (error) => {
    toast.error(error, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    });
  };
  const successNotify = () => {
    toast.success('Password is successfully changed.', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    });
  };

  return (
    <div>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Change password</h4>
              <p className={classes.cardCategoryWhite}>
                Enter your new password
              </p>
            </CardHeader>
            <CardBody>
              {/* Current Password */}
              <GridContainer justify="center">
                {/* Current password */}
                <GridItem xs={12} sm={12} md={6}>
                  {visible ? (
                    <CustomInput
                      name="currentPassword"
                      value={currentPassword}
                      onChange={updateCurrPassword}
                      labelText="Enter your current password"
                      id="current-password"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: 'text',
                        endAdornment: (
                          <InputAdornment position="end">
                            <VisibilityIcon
                              className={classes.inputIconsColor}
                              onClick={updateVisibility}
                            />
                          </InputAdornment>
                        ),
                        autoComplete: 'off',
                      }}
                    />
                  ) : (
                    <CustomInput
                      name="currentPassword"
                      value={currentPassword}
                      onChange={updateCurrPassword}
                      labelText="Enter your current password"
                      id="current-password"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: 'password',
                        endAdornment: (
                          <InputAdornment position="end">
                            <VisibilityOffIcon
                              className={classes.inputIconsColor}
                              onClick={updateVisibility}
                            />
                          </InputAdornment>
                        ),
                        autoComplete: 'off',
                      }}
                    />
                  )}
                </GridItem>
              </GridContainer>

              {/* New password */}
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={6}>
                  {visible ? (
                    <CustomInput
                      name="newPassword"
                      value={newPassword}
                      onChange={updateNewPassword}
                      labelText="Enter your new password"
                      id="new-password"
                      // error={newPassword !== newPassword2 ? true : false}
                      // helperText={newPassword !== newPassword2 ? "Password does not match!": ""}
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: 'text',
                        endAdornment: (
                          <InputAdornment position="end">
                            <VisibilityIcon
                              className={classes.inputIconsColor}
                              onClick={updateVisibility}
                            />
                          </InputAdornment>
                        ),
                        autoComplete: 'off',
                      }}
                    />
                  ) : (
                    <CustomInput
                      name="newPassword"
                      value={newPassword}
                      onChange={updateNewPassword}
                      labelText="Enter your new password"
                      id="new-password"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: 'password',
                        endAdornment: (
                          <InputAdornment position="end">
                            <VisibilityOffIcon
                              className={classes.inputIconsColor}
                              onClick={updateVisibility}
                            />
                          </InputAdornment>
                        ),
                        autoComplete: 'off',
                      }}
                    />
                  )}
                </GridItem>
              </GridContainer>

              {/* Repeat new password */}
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={6}>
                  {visible ? (
                    <CustomInput
                      name="newPassword2"
                      value={newPassword2}
                      onChange={updateNewPassword2}
                      labelText="Re-enter your new password"
                      id="new-password-2"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: 'text',
                        endAdornment: (
                          <InputAdornment position="end">
                            <VisibilityIcon
                              className={classes.inputIconsColor}
                              onClick={updateVisibility}
                            />
                          </InputAdornment>
                        ),
                        autoComplete: 'off',
                      }}
                    />
                  ) : (
                    <CustomInput
                      name="newPassword2"
                      value={newPassword2}
                      onChange={updateNewPassword2}
                      labelText="Re-enter your new password"
                      id="new-password-2"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: 'password',
                        endAdornment: (
                          <InputAdornment position="end">
                            <VisibilityOffIcon
                              className={classes.inputIconsColor}
                              onClick={updateVisibility}
                            />
                          </InputAdornment>
                        ),
                        autoComplete: 'off',
                      }}
                    />
                  )}
                </GridItem>
              </GridContainer>
            </CardBody>

            <CardFooter style={{margin: 'auto'}}>
            <div className={classes.cardProfile}>
              <Button color="primary" onClick={handlePassChange}>
                Update Password
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

      </GridContainer>
    </div>
  );
}

ChangePassword.layout = Admin;

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
