import React, {useState, useEffect} from 'react';
// @material-ui/core components
import {makeStyles} from '@material-ui/core/styles';
// layout for this page
import Admin from 'layouts/Admin.js';

//redux app state management
import {connect} from 'react-redux';
import {setInfo} from '../../redux/action/main';
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

import Link from 'next/link';

import Avatar from 'assets/img/profile/admin.png';

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

//API call to update
async function updateProfile() {
  Router.push('admin-profile-edit-form');
}

const useStyles = makeStyles(styles);

function UserProfile(props) {
  const {userInfo} = props;
  const classes = useStyles();

  useEffect(() => {
    if (userInfo.adminId === '') {
      Router.push('login');
      return;
    }
  }, []);

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="info">
              <h4
                className={classes.cardTitleWhite}
                style={{textAlign: 'center'}}>
                User Profile
              </h4>
            </CardHeader>
            <CardBody>
              <br />

              <GridContainer>
                <GridItem xs={12} sm={12} md={5} style={{margin: 'auto'}}>
                  <CardHeader color="success">
                    <h4
                      style={{textAlign: 'center'}}
                      className={classes.cardTitleWhite}>
                      Name
                    </h4>
                  </CardHeader>
                  <h6 style={{textAlign: 'center'}}>{Router.query.name}</h6>
                </GridItem>
              </GridContainer>

              <br />

              <GridContainer>
                <GridItem xs={12} sm={12} md={5} style={{margin: 'auto'}}>
                  <CardHeader color="success">
                    <h4
                      style={{textAlign: 'center'}}
                      className={classes.cardTitleWhite}>
                      Mobile Number
                    </h4>
                  </CardHeader>
                  <h6 style={{textAlign: 'center'}}>
                    {Router.query.mobileNumber}
                  </h6>
                </GridItem>
              </GridContainer>

              <br />
              <GridContainer>
                <GridItem xs={12} sm={12} md={5} style={{margin: 'auto'}}>
                  <CardHeader color="success">
                    <h4
                      style={{textAlign: 'center'}}
                      className={classes.cardTitleWhite}>
                      Email
                    </h4>
                  </CardHeader>
                  <h6 style={{textAlign: 'center'}}>{Router.query.email}</h6>
                </GridItem>
              </GridContainer>

              <br />

              <GridContainer>
                <GridItem style={{margin: 'auto'}} xs={12} sm={12} md={5}>
                  <CardHeader color="success">
                    <h4
                      style={{textAlign: 'center'}}
                      className={classes.cardTitleWhite}>
                      Strike Count
                    </h4>
                  </CardHeader>
                  <h6 style={{textAlign: 'center'}}>
                    {Router.query.strikeCount}
                  </h6>
                </GridItem>
              </GridContainer>
              
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

UserProfile.layout = Admin;

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
