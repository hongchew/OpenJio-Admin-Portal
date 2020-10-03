import React, {useState, useEffect} from 'react';
import Router from 'next/router';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
//redux app state management
import {connect} from 'react-redux';
// @material-ui/core components
import {makeStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
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

import CeoAvatar from 'assets/img/faces/tanwk.png';

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
};

const useStyles = makeStyles(styles);

const mapStateToProps = (state) => ({
  userInfo: state.main,
});

useEffect(() => {
  if (userInfo.adminId === '') {
    Router.push('login');
    return;
  }
}, []);

function ChangePassword(props) {
  const classes = useStyles();

  //State of password entry
  const [currentPassword, setCurrentPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [newPassword2, setNewPassword2] = useState();
  const {userInfo} = props;

  const updateCurrPassword = (e) => {
    e.preventDefault();
    console.log('Input is updating');
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

  //API call to change password
  async function handlePassChange() {
    try {
      const email = 'superadmin@openjio.com';
      if (newPassword !== newPassword2) {
        errorNotify();
        throw 'New password entered is different';
      }
      console.log('fetching the change-password API');
      console.log(
        `Sending these user info email:${email} currentpassword:${currentPassword} newpassword:${newPassword}`
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
        Router.push('admin-profile');
      } catch (error) {
        errorNotify();
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  }

  // To enable toast notifications
  toast.configure();
  const errorNotify = () => {
    toast.error(
      'Current password is incorrect or the new passwords does not match.',
      {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      }
    );
  };
  const successNotify = () => {
    toast.success('Password is successfully changed.', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    });
  };

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Change password</h4>
              <p className={classes.cardCategoryWhite}>
                Enter your new password
              </p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                {/* Current password */}
                <GridItem xs={12} sm={12} md={6}>
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
                    }}
                  />
                </GridItem>
              </GridContainer>

              {/* New password */}
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    name="newPassword"
                    value={newPassword}
                    onChange={updateNewPassword}
                    labelText="Enter your new password"
                    id="new-password"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
              </GridContainer>

              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
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
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>

            <CardFooter>
              <Button color="primary" onClick={handlePassChange}>
                Update Password
              </Button>
            </CardFooter>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={(e) => e.preventDefault()}>
                <img src={CeoAvatar} alt="..." />
              </a>
            </CardAvatar>

            <CardBody profile>
              <h6 className={classes.cardCategory}>CEO / CO-FOUNDER</h6>
              <h4 className={classes.cardTitle}>Prof. Tan Wee Kek</h4>
              <Primary className={classes.cardTitle}>
                <b>Super Admin</b>
              </Primary>
              <br></br>

              <strong>Description:</strong>
              <p className={classes.description}>
                I hope that everyone will play their part to fight the COVID-19
                pandemic.
              </p>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

ChangePassword.layout = Admin;

export default connect(mapStateToProps)(ChangePassword);
