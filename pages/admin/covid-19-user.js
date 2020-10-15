import React, {useState, useEffect} from 'react';
// @material-ui/core components
import {makeStyles, ThemeProvider} from '@material-ui/core/styles'; // layout for this page
import Admin from 'layouts/Admin.js';

//redux app state management
import {connect} from 'react-redux';
import {setInfo} from '../../redux/action/main';
// core components
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import CardFooter from 'components/Card/CardFooter.js';
import Router from 'next/router';
import Typography from '@material-ui/core/Typography';
import {createMuiTheme, responsiveFontSizes} from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import axios from 'axios';

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
  boxJustify: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chipStyle: {
    padding: theme.spacing(2),
    margin: theme.spacing(1),
  },
  cardStyle: {
    width: '10rem',
  },
};

const useStyles = makeStyles(styles);

function Covid19User(props) {
  const {userInfo} = props;
  const [addresses, setAddresses] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    if (userInfo.adminId === '') {
      Router.push('login');
      return;
    }
    retrieveAddressesOfUser();
  }, []);

  const retrieveAddressesOfUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/addresses/${Router.query.userId}`
      );
      const body = response.data;
      setAddresses(body);
    } catch (error) {
      console.error(error);
    }
  };

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
                    <Typography gutterBottom variant="h5" component="h5">
                      Name:
                    </Typography>
                  </Box>

                  <Box className={classes.boxJustify}>
                    <Typography gutterBottom variant="h6" component="h5">
                      {Router.query.name}
                    </Typography>
                  </Box>
                </div>

                <Divider variant="middle" />

                <div className={classes.cardProfile}>
                  <Box className={classes.boxJustify}>
                    <Typography gutterBottom variant="h5" component="h5">
                      Email:
                    </Typography>
                  </Box>

                  <Box className={classes.boxJustify}>
                    <Typography gutterBottom variant="h6" component="h5">
                      {Router.query.email}
                    </Typography>
                  </Box>
                </div>

                <Divider variant="middle" />

                <div className={classes.cardProfile}>
                  <Box className={classes.boxJustify}>
                    <Typography gutterBottom variant="h5" component="h5">
                      Mobile Number:
                    </Typography>
                  </Box>

                  <Box className={classes.boxJustify}>
                    <Typography gutterBottom variant="h6" component="h5">
                      {Router.query.mobileNumber}
                    </Typography>
                  </Box>
                </div>

                <Divider variant="middle" />

                <div className={classes.cardProfile}>
                  <Box className={classes.boxJustify}>
                    <Typography gutterBottom variant="h5">
                      Joined on:
                    </Typography>
                  </Box>
                  <Box className={classes.boxJustify}>
                    <Chip
                      className={classes.chipStyle}
                      label={
                        <Box
                          alignItems="center"
                          justifyContent="center"
                          display="flex">
                          <Typography variant="subtitle1">
                            {new Date(
                              Router.query.createdAt
                            ).toLocaleDateString('en-GB')}
                          </Typography>
                        </Box>
                      }
                      color="secondary"
                    />
                  </Box>
                </div>

                <Divider variant="middle" />

                <div className={classes.cardProfile}>
                  <Box className={classes.boxJustify}>
                    <Typography gutterBottom variant="h5" component="h5">
                      Addresses:
                    </Typography>
                  </Box>
                  <Box className={classes.boxJustify}>
                    {addresses &&
                      addresses.map((address) => (
                        
                        <div key={address.addressId}>

                          {/* Address line 1 */}
                          <Box className={classes.boxJustify}>
                            <Typography
                              gutterBottom
                              variant="h6"
                              component="h5">
                              {address.line1}
                            </Typography>
                          </Box>

                          {/* Address line 2 */}
                          <Box className={classes.boxJustify}>
                            <Typography
                              gutterBottom
                              variant="h6"
                              component="h5">
                              {address.line2}
                            </Typography>
                          </Box>

                          {/* Country + Postal Code */}
                          <Box className={classes.boxJustify}>
                            <Typography
                              gutterBottom
                              variant="h6"
                              component="h5">
                              {address.country} {address.postalCode}
                            </Typography>
                          </Box>

                        </div>
                      ))}
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

Covid19User.layout = Admin;

export default connect(mapStateToProps, mapDispatchToProps)(Covid19User);
