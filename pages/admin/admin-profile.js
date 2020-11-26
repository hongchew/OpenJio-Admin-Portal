import React, {useState, useEffect} from 'react';
// @material-ui/core components
import {makeStyles, ThemeProvider} from '@material-ui/core/styles';
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
import Typography from '@material-ui/core/Typography';
import {createMuiTheme, responsiveFontSizes} from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';
import Link from 'next/link';
import Avatar, {bold} from 'assets/img/profile/admin.png';
import Divider from '@material-ui/core/Divider';

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
    h6: {
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
};

//API call to update
async function updateProfile() {
  Router.push('/admin-profile-edit');
}

const useStyles = makeStyles(styles);

function AdminProfile(props) {
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

      <GridContainer justify="center">

        {/* New UI */}
        <GridItem xs={12} sm={12} md={6}>
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
                    <Typography gutterBottom variant="h5" component="h5">
                      Name:
                    </Typography>
                  </Box>

                  <Box b={5}>
                    <Typography gutterBottom variant="h6" component="h5">
                      {userInfo.name}
                    </Typography>
                  </Box>
                </div>

                <Divider variant="middle" />

                <div className={classes.cardProfile}>
                  <Box b={5}>
                    <Typography gutterBottom variant="h5" component="h5">
                      Email:
                    </Typography>
                  </Box>

                  <Box b={5}>
                    <Typography gutterBottom variant="h6" component="h5">
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

            <CardFooter>
              <Button color="primary">
                <Link href="admin-profile-edit">
                  <a id="editProfileBut">Edit Profile</a>
                </Link>
              </Button>

              <Button color="primary">
                <Link href="admin-profile-password">
                  <a id="changePassBut">Change password</a>
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

AdminProfile.layout = Admin;

export default connect(mapStateToProps, mapDispatchToProps)(AdminProfile);
