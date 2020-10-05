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

  async function handleUpdateProfile() {
    try {
      console.log('handle update profile');
      if (!name) {
        errorNotify('Name field is empty');
        throw 'Name field is blank';
      } else if (!email) {
        errorNotify('Email field is empty');
        throw 'Email field is blank';
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
      console.log(response.data)
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
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="info">
              <h4
                style={{textAlign: 'center'}}
                className={classes.cardTitleWhite}>
                Profile
              </h4>
            </CardHeader>
            <CardBody>
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
            </CardBody>

            <CardFooter style={{margin: 'auto'}}>
              <Button color="info" onClick={handleUpdateProfile}>
                Confirm
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
        </GridItem>
      </GridContainer>
    </div>
  );
}

AdminProfileEdit.layout = Admin;

export default connect(mapStateToProps, mapDispatchToProps)(AdminProfileEdit);
