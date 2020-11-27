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
import Button from 'components/CustomButtons/Button.js';
import Router from 'next/router';
import Typography from '@material-ui/core/Typography';
import {createMuiTheme, responsiveFontSizes} from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import axios from 'axios';
// Example image

// To generate PDF Document
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  PDFDownloadLink,
  BlobProvider
} from '@react-pdf/renderer';

// To generate CSV
import { CSVLink } from "react-csv";

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
      fontSize: 16,
    },
    h6: {
      fontWeight: 500,
      fontSize: 16,
    },
    subtitle1: {
      fontSize: 14,
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
    margin: theme.spacing(3.5, 1, 3.5, 1),
  },
  boxJustify: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxJustifyWithoutFlex: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxJustifyWithoutFlex: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxJustifyLeft: {
    display: 'flex',
    justifyContent: 'flex-start', // Horizontal alignment: 'flex-start, center, flex-end'
    alignItems: 'center', // Vertical alignment
    bgcolor: '', // Set background color of box
    marginBottom: theme.spacing(2),
  },
  boxJustifyLeftLast: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    bgcolor: '',
    marginBottom: theme.spacing(4),
  },
  boxTextLeft: {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: theme.spacing(4),
    // backgroundColor: 'rgba(0,0,0,0.3)',
  },
  chipStyle: {
    padding: theme.spacing(2),
    margin: theme.spacing(1),
  },
  cardStyle: {
    width: '100%',
    padding: 0,
    // paddingLeft: 100,
    // paddingRight: 100,
    backgroundColor: '#F4F4F4',
  },
  cardBottom: {
    marginBottom: theme.spacing(4),
  },
};

// PDF Styles
const pdfStyles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  itemContainer: {
    backgroundColor: '#f6f6f5',
    display: 'flex',
    flexDirection: 'row',
    padding: 5,
  },
  itemDetails: {
    display: 'flex',
    marginLeft: 5,
  },
  itemTitle: {
    fontSize: 15,
    marginBottom: 10,
  },
  itemOverview: {
    fontSize: 10,
  },

  image: {
    height: 200,
    width: 150,
  },
  subtitle: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: 150,
    alignItems: 'center',
    marginBottom: 12,
  },
});

const useStyles = makeStyles(styles);

function Covid19User(props) {
  const {userInfo} = props;
  const [addresses, setAddresses] = useState([]);
  const [requests, setRequests] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    if (userInfo.adminId === '') {
      Router.push('login');
      return;
    }
    retrieveAddressesOfUser();
    retrieveRequestsByUser();
    retrieveAnnouncementsByUser();
  }, []);

  // Create PDF Document Component (Objects: addresses, requests, announcements. Router)
  const PdfDocument = () => (
    <Document>
      <Page size="A4" style={pdfStyles.page}>
        <View style={styles.itemContainer}>
          <View style={pdfStyles.section}>
            <Text>Name of User: {Router.query.name}</Text>
          </View>
          <View style={pdfStyles.section}>
            <Text>Email: {Router.query.email}</Text>
          </View>
          <View style={pdfStyles.section}>
            <Text>Mobile Number: {Router.query.mobileNumber}</Text>
          </View>
          <View style={pdfStyles.section}>
            <Text>Joined On: {Router.query.createdAt}</Text>
          </View>
          <View style={pdfStyles.section}>
            <Text>Addresses:</Text>
          </View>
          {addresses &&
            addresses.map((address) => {
              <div key={address.addressId}>
                <View style={pdfStyles.section}>
                  <Text>{address.line1}</Text>
                </View>
                <View style={pdfStyles.section}>
                  <Text>{address.line2}</Text>
                </View>
                <View style={pdfStyles.section}>
                  <Text>
                    {address.country} {address.postalCode}
                  </Text>
                </View>
              </div>;
            })}
        </View>
        <View style={styles.itemContainer}>
          <View style={pdfStyles.section}>
            <Text>Announcements:</Text>
          </View>
          {announcements &&
            announcements.map((announcement) => {
              <div key={announcement.announcementId}>
                <View style={pdfStyles.section}>
                  <Text>Destination: {announcement.destination}</Text>
                </View>
                <View style={pdfStyles.section}>
                  <Text>Description: {announcement.description}</Text>
                </View>
                <View style={pdfStyles.section}>
                  <Text>Status: {announcement.announcementStatus}</Text>
                </View>
                <View style={pdfStyles.section}>
                  <Text>Posted On: {announcement.createdAt}</Text>
                </View>
              </div>;
            })}
        </View>
        <View style={styles.itemContainer}>
          <View style={pdfStyles.section}>
            <Text>Requests:</Text>
          </View>
          {requests &&
            requests.map((request) => {
              <div key={request.requestId}>
                <View style={pdfStyles.section}>
                  <Text>Destination: {request.Announcement.destination}</Text>
                </View>
                <View style={pdfStyles.section}>
                  <Text>Title: {request.title}</Text>
                </View>
                <View style={pdfStyles.section}>
                  <Text>Description: {request.description}</Text>
                </View>
                <View style={pdfStyles.section}>
                  <Text>Status: {request.requestStatus}</Text>
                </View>
                <View style={pdfStyles.section}>
                  <Text>Posted On: {request.createdAt}</Text>
                </View>
              </div>;
            })}
        </View>
      </Page>
    </Document>
  );

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

  const retrieveRequestsByUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/requests/with-announcement/${Router.query.userId}`
      );
      const body = response.data;
      setRequests(body);
    } catch (error) {
      console.error(error);
    }
  };

  const retrieveAnnouncementsByUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/announcements/all-announcements/${Router.query.userId}`
      );
      const body = response.data;
      setAnnouncements(body);
    } catch (error) {
      console.error(error);
    }
  };

  const formatDateAndTime = (date) => {
    // Returns DD/MM/YYYY, HH:MM:SS
    let dateAndTime = new Date(date).toLocaleString('en-GB');
    // Remove seconds from behind (last 3 characters)
    dateAndTime = dateAndTime.slice(0, -3);
    return dateAndTime;
  };

  return (
    <div>
      {/* <div className="CovidUserProfile" ref={ref}> */}
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={5}>
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
                  {/* Start of revamp */}
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

                {/* End of old UI */}
                <div className={classes.cardProfile}>
                  <Box className={classes.boxJustify}>
                    <Typography variant="h5" component="h5">
                      Addresses:
                    </Typography>
                  </Box>

                  <Box className={classes.boxJustifyWithoutFlex}>
                    {addresses &&
                      addresses.map((address) => (
                        <div key={address.addressId}>
                          {/* <Box className={classes.boxJustify} borderColor="#D3D3D3" border={2} borderRadius="10%"> */}
                          <Box className={classes.boxJustify}>
                            <Card
                              className={classes.cardStyle}
                              variant="outlined">
                              <CardBody profile>
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
                              </CardBody>
                            </Card>
                          </Box>
                          {/* </Box> */}
                        </div>
                      ))}
                  </Box>
                </div>

                {/* End of revamp */}
              </ThemeProvider>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={12} md={6}>
          {/* Announcement section */}
          <Box className={classes.cardBottom}>
            <Card className={classes.cardBottom}>
              <CardHeader color="primary">
                <h4
                  className={classes.cardTitleWhite}
                  style={{textAlign: 'center'}}>
                  Announcements
                </h4>
              </CardHeader>

              <CardBody profile>
                <ThemeProvider theme={theme}>
                  <div className={classes.cardProfile}>
                    <Box className={classes.boxJustifyWithoutFlex}>
                      {announcements &&
                        announcements.map((announcement) => (
                          <div key={announcement.announcementId}>
                            {/* <Box className={classes.boxJustify} borderColor="#D3D3D3" border={2} borderRadius="10%"> */}
                            <Box className={classes.boxJustifyComment}>
                              <Card
                                className={classes.cardStyle}
                                variant="outlined">
                                <CardBody profile>
                                  {/* Announcement Destination*/}
                                  {/* <Box className={classes.boxJustifyLeftLast}>
                                    <Typography variant="h6" component="h5">
                                      Destination: {announcement.destination}
                                    </Typography>
                                  </Box> */}

                                  {/* Announcement Destination */}
                                  <Box className={classes.boxJustifyLeft}>
                                    <Typography variant="h5" component="h5">
                                      Destination: &nbsp;
                                    </Typography>
                                    <Typography variant="h6" component="h5">
                                      {announcement.destination}
                                    </Typography>
                                  </Box>

                                  {/* Divider + margin bottom */}
                                  {/* <Divider/>
                                <Box className={classes.boxJustifyLeftLast}></Box> */}
                                  {/* End of Divider */}

                                  {/* Description*/}
                                  {/* <Box className={classes.boxJustifyLeftLast}>
                                    <Typography variant="body1">
                                      Description: {announcement.description}
                                    </Typography>
                                  </Box> */}

                                  {/* Description */}
                                  <Box className={classes.boxJustifyLeft}>
                                    <Typography variant="h5" component="h5">
                                      Description: &nbsp;
                                    </Typography>
                                    <Typography variant="h6" component="h5">
                                      {announcement.description}
                                    </Typography>
                                  </Box>

                                  {/* Announcement Status */}
                                  {/* <Box className={classes.boxJustifyLeftLast}>
                                    <Typography variant="body1">
                                      Status: {announcement.announcementStatus}
                                    </Typography>
                                  </Box> */}

                                  {/* Announcement Status */}
                                  <Box className={classes.boxJustifyLeftLast}>
                                    <Typography variant="h5" component="h5">
                                      Status: &nbsp;
                                    </Typography>
                                    <Chip
                                      className={classes.chipStyle}
                                      label={
                                        <Box className={classes.boxJustify}>
                                          <Typography variant="subtitle1">
                                            {announcement.announcementStatus}
                                          </Typography>
                                        </Box>
                                      }
                                      color="primary"
                                    />
                                  </Box>

                                  {/* Divider + margin bottom */}
                                  <Divider />
                                  <Box className={classes.boxJustifyLeft}></Box>
                                  {/* End of Divider */}

                                  {/* createdAt */}
                                  <Box className={classes.boxJustifyLeft}>
                                    <Typography
                                      gutterBottom
                                      variant="subtitle2"
                                      component="h5">
                                      Posted on:{' '}
                                      {formatDateAndTime(
                                        announcement.createdAt
                                      )}
                                    </Typography>
                                  </Box>
                                </CardBody>
                              </Card>
                              {/* <Divider variant="middle" /> */}
                            </Box>
                            {/* </Box> */}
                          </div>
                        ))}
                    </Box>
                  </div>
                  {/* <Divider variant="middle" /> */}
                </ThemeProvider>
              </CardBody>
            </Card>
          </Box>

          {/* Jio Section */}
          <Card>
            <CardHeader color="primary">
              <h4
                className={classes.cardTitleWhite}
                style={{textAlign: 'center'}}>
                Requests
              </h4>
            </CardHeader>

            <CardBody profile>
              <ThemeProvider theme={theme}>
                <div className={classes.cardProfile}>
                  <Box className={classes.boxJustifyWithoutFlex}>
                    {requests &&
                      requests.map((request) => (
                        <div key={request.requestId}>
                          {/* <Box className={classes.boxJustify} borderColor="#D3D3D3" border={2} borderRadius="10%"> */}
                          <Box className={classes.boxJustifyComment}>
                            <Card
                              className={classes.cardStyle}
                              variant="outlined">
                              <CardBody profile>
                                {/* Request's Announcement's Destination*/}
                                {/* <Box className={classes.boxJustifyLeftLast}>
                                  <Typography variant="h6" component="h5">
                                    Destination:{' '}
                                    {request.Announcement.destination}
                                  </Typography>
                                </Box> */}

                                {/* Request's Announcement's Destination*/}
                                <Box className={classes.boxJustifyLeft}>
                                  <Typography variant="h5" component="h5">
                                    Destination: &nbsp;
                                  </Typography>
                                  <Typography variant="h6" component="h5">
                                    {request.Announcement.destination}
                                  </Typography>
                                </Box>

                                {/* Divider + margin bottom */}
                                {/* <Divider/>
                                <Box className={classes.boxJustifyLeftLast}></Box> */}
                                {/* End of Divider */}

                                {/* Request Title */}
                                {/* <Box className={classes.boxJustifyLeftLast}>
                                  <Typography variant="body1">
                                    Title: {request.title}
                                  </Typography>
                                </Box> */}

                                {/* Request Title */}
                                <Box className={classes.boxJustifyLeft}>
                                  <Typography variant="h5" component="h5">
                                    Title: &nbsp;
                                  </Typography>
                                  <Typography variant="h6" component="h5">
                                    {request.title}
                                  </Typography>
                                </Box>

                                {/* Request Description*/}
                                {/* <Box className={classes.boxJustifyLeftLast}>
                                  <Typography variant="body1">
                                    Description: {request.description}
                                  </Typography>
                                </Box> */}

                                {/* Request Description*/}
                                <Box className={classes.boxJustifyLeft}>
                                  <Typography variant="h5" component="h5">
                                    Description: &nbsp;
                                  </Typography>
                                  <Typography variant="h6" component="h5">
                                    {request.description}
                                  </Typography>
                                </Box>

                                {/* Request Status */}
                                {/* <Box className={classes.boxJustifyLeftLast}>
                                  <Typography variant="body1">
                                    Status: {request.requestStatus}
                                  </Typography>
                                </Box> */}

                                {/* Request Status */}
                                <Box className={classes.boxJustifyLeftLast}>
                                  <Typography variant="h5" component="h5">
                                    Status: &nbsp;
                                  </Typography>
                                  <Chip
                                    className={classes.chipStyle}
                                    label={
                                      <Box className={classes.boxJustify}>
                                        <Typography variant="subtitle1">
                                          {request.requestStatus}
                                        </Typography>
                                      </Box>
                                    }
                                    color="primary"
                                  />
                                </Box>

                                {/* Divider + margin bottom */}
                                <Divider />
                                <Box className={classes.boxJustifyLeft}></Box>
                                {/* End of Divider */}

                                {/* createdAt */}
                                <Box className={classes.boxJustifyLeft}>
                                  <Typography
                                    gutterBottom
                                    variant="subtitle2"
                                    component="h5">
                                    Posted on:{' '}
                                    {formatDateAndTime(request.createdAt)}
                                  </Typography>
                                </Box>
                              </CardBody>
                            </Card>
                            {/* <Divider variant="middle" /> */}
                          </Box>
                          {/* </Box> */}
                        </div>
                      ))}
                  </Box>
                </div>
                {/* <Divider variant="middle" /> */}
              </ThemeProvider>
            </CardBody>

            {/* <CardFooter className={classes.boxJustify}>
              <div justifyContent="center">
                {/* <PDFDownloadLink
                  document={<PdfDocument />}
                  fileName="covid-19-report.pdf"
                  style={{
                    textDecoration: 'none',
                    padding: '10px',
                    color: '#4a4a4a',
                    backgroundColor: '#f2f2f2',
                    border: '1px solid #4a4a4a',
                  }}
                > Download Pdf
                  {({blob, url, loading, error}) =>
                    loading ? 'Loading document...' : 'Download Pdf'
                  }
                </PDFDownloadLink> */}
                {/* <Button color="primary">
                  Download PDF
                </Button>
              </div>
            </CardFooter> */}

          </Card>
        </GridItem>
      </GridContainer>
      {/* </div> */}
    </div>
  );
}

Covid19User.layout = Admin;

export default connect(mapStateToProps, mapDispatchToProps)(Covid19User);
