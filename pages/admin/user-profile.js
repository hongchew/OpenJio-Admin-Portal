import React, {useState, useEffect} from 'react';
// @material-ui/core components
import {makeStyles, ThemeProvider} from '@material-ui/core/styles';// layout for this page
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
import Divider from '@material-ui/core/Divider';
import Link from 'next/link';

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
      fontSize: 16,
      fontWeight: 500,
      fontStyle: 'regular',
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
    justifyContent: 'center',
    margin: theme.spacing(5, 1, 5, 1),
  },
  boxJustify:{
    display:'flex',
    justifyContent:'center',
    alignItems: 'center',
  },
  chipStyle:{
    padding: theme.spacing(2),
    margin: theme.spacing(1),
  }
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
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="info">
              <h4
                className={classes.cardTitleWhite}
                style={{textAlign: 'center'}}>
                User Profile
              </h4>
            </CardHeader>

            <CardBody profile>
              <ThemeProvider theme={theme}> 
                <div className={classes.cardProfile}>
                  <Box className={classes.boxJustify}>
                    <Typography gutterBottom variant="h5" component="h8">
                      Name:
                    </Typography>
                  </Box>

                  <Box className={classes.boxJustify}>
                    <Typography gutterBottom variant="h6" component="h8">
                      {Router.query.name}
                    </Typography>
                  </Box>
                </div>

                <Divider variant="middle" />

                <div className={classes.cardProfile}>
                  <Box className={classes.boxJustify}>
                    <Typography gutterBottom variant="h5" component="h8">
                      Email:
                    </Typography>
                  </Box>

                  <Box className={classes.boxJustify}>
                    <Typography gutterBottom variant="h6" component="h8">
                      {Router.query.email}
                    </Typography>
                  </Box>
                </div>

                <Divider variant="middle"/>

                <div className={classes.cardProfile}>
                  <Box className={classes.boxJustify}>
                    <Typography gutterBottom variant="h5" component="h8">
                      Mobile Number:
                    </Typography>
                  </Box>

                  <Box className={classes.boxJustify}>
                    <Typography gutterBottom variant="h6" component="h8">
                      {Router.query.mobileNumber}
                    </Typography>
                  </Box>
                </div>

                <Divider variant="middle"/>

                <div className={classes.cardProfile}>
                <Box className={classes.boxJustify}>
                  <Typography gutterBottom variant="h5">
                    Number of Strikes:
                  </Typography>
                </Box>
                <Box className={classes.boxJustify}>
                {Router.query.strikeCount >= 3 ? (
                  <Chip 
                  className={classes.chipStyle}
                  label={  
                  <Box alignItems="center" justifyContent="center" display="flex">                
                    <Typography variant="subtitle1">
                      {Router.query.strikeCount}
                    </Typography>
                  </Box>  }
                  color="secondary" />
                ) : (
                  <Chip 
                  className={classes.chipStyle}
                  label={  
                  <Box alignItems="center" justifyContent="center" display="flex">                
                    <Typography variant="subtitle1">
                      {Router.query.strikeCount}
                    </Typography>
                  </Box>  }
                  color="info" />
                )}
                </Box>
                </div>

              </ThemeProvider>
            </CardBody>

          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

UserProfile.layout = Admin;

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
