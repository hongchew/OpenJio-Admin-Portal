import React, {useState, useEffect} from 'react';
import axios from 'axios';
// @material-ui/core components
import {makeStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
// layout for this page
import Admin from 'layouts/Admin.js';
//redux app state management
import {connect} from 'react-redux';
import {setInfo} from '../../redux/action/main';
import {toast} from 'react-toastify';
import Link from 'next/link';

import Email from '@material-ui/icons/Email';

// core components
import InputAdornment from '@material-ui/core/InputAdornment';
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

import CeoAvatar from 'assets/img/faces/tanwk.png';

const mapDispatchToProps = {
  setInfo: setInfo,
};

const mapStateToProps = (state) => ({
  userInfo: state.main,
});

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

function CreateAdmin(props) {
  const [cardAnimaton, setCardAnimation] = React.useState('cardHidden');
  setTimeout(function () {
    setCardAnimation('');
  }, 700);

  const classes = useStyles();

  const {userInfo, setInfo} = props;

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [adminType, setAdminType] = useState('SUPER_ADMIN');
  const [password, setPassword] = useState();

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
    console.log('Updated email is ' + email);
  };

  const updateAdminType = (e) => {
    e.preventDefault();
    console.log('Input is updating');
    const adminType = e.target.value;
    setAdminType(adminType);
    console.log('Updated Admin Type is ' + adminType);
  };

  const updatePassword = (e) => {
    e.preventDefault();
    console.log('Input is updating');
    const password = e.target.value;
    setPassword(password);
    console.log('Updated password is ' + password);
  };

  async function handleCreateAdmin() {
    try {
      console.log('handle create admin');
      if (!name) {
        // errorNotify('Name field is empty');
        throw 'Name field is blank';
      } else if (!email) {
        // errorNotify('Email field is empty');
        throw 'Email field is blank';
      } else if (!adminType) {
        // errorNotify('Admin Type field is empty');
        throw 'Admin Type field is empty';
      } else if (!password) {
        // errorNotify('Password is empty');
        throw 'Password is empty';
      }
      console.log('Call create admin profile');
      const response = await axios.post(
        'http://localhost:3000/admins/register',
        {
          name: name,
          email: email,
          adminType: adminType,
          password: password,
        }
      );
      console.log(response.data);
      successNotify();
      Router.push('admin-management');
    } catch (e) {
      if (
        e != 'Password is empty' ||
        e != 'Admin Type field is empty' ||
        e != 'Email field is blank' ||
        e != 'Name field is blank'
      ) {
        e = 'Email is in use';
      }
      errorNotify(e);

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
    toast.success('New admin.', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    });
  };

  return (
    <div>
      <GridContainer justify="center">
        <GridItem xs={12} sm={6} md={4}>
          <Card className={classes[cardAnimaton]}>
            <form className={classes.form}>
              <CardHeader color="success" className={classes.cardHeader}>
                <h4 style={{textAlign: 'center'}}>Create admin</h4>
              </CardHeader>
              <CardBody>
                <CustomInput
                  name="name"
                  value={name}
                  onChange={updateName}
                  labelText="Name"
                  id="name"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    type: 'name',
                    endAdornment: (
                      <InputAdornment position="end"></InputAdornment>
                    ),
                  }}
                />
                <CustomInput
                  name="email"
                  value={email}
                  onChange={updateEmail}
                  labelText="Email"
                  id="email"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    type: 'email',
                    endAdornment: (
                      <InputAdornment position="end"></InputAdornment>
                    ),
                  }}
                />
                {/* <CustomInput
                  name="adminType"
                  value={adminType}
                  onChange={updateAdminType}
                  labelText="Admin Type"
                  id="adminType"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    type: 'adminType',
                    endAdornment: (
                      <InputAdornment position="end"></InputAdornment>
                    ),
                    autoComplete: 'off',
                  }}
                /> */}

                <CustomInput
                  name="password"
                  value={password}
                  onChange={updatePassword}
                  labelText="Password"
                  id="pass"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    type: 'password',
                    endAdornment: (
                      <InputAdornment position="end"></InputAdornment>
                    ),
                    autoComplete: 'off',
                  }}
                />
                <br />
                <br />
                <label for="adminType">Admin Type</label>
                <div class="search_categories">
                  <select
                    style={{alignItems: 'center'}}
                    id="adminType"
                    value={adminType}
                    name="adminType"
                    onChange={updateAdminType}>
                    <option value="SUPER_ADMIN">Super Admin</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </div>
              </CardBody>
              <CardFooter className={classes.cardFooter}>
                <Button
                  simple
                  color="primary"
                  size="lg"
                  onClick={handleCreateAdmin}>
                  Create
                </Button>
              </CardFooter>
            </form>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

CreateAdmin.layout = Admin;

export default connect(mapStateToProps, mapDispatchToProps)(CreateAdmin);
