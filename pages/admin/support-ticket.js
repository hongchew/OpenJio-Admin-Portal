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
import CardActions from 'components/Card/CardFooter.js';
import Button from 'components/CustomButtons/Button.js';
import Quote from 'components/Typography/Quote.js';
import Router from 'next/router';
import Typography from '@material-ui/core/Typography';
import {createMuiTheme, responsiveFontSizes} from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import {toast} from 'react-toastify';

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
    // For comment's name
    subtitle1: {
      fontSize: 16,
      fontWeight: 500,
      fontStyle: 'bold',
    },
    // For comment's data
    subtitle2: {
      color: '#808080',
      fontSize: 14,
      fontWeight: 500,
      fontStyle: 'regular',
    },
    // For comment's description
    body1: {
      fontSize: 14,
      fontWeight: 300,
    },
  },
});
theme = responsiveFontSizes(theme);

const styles = {
  root: {
    width: '100%',
    display: 'flex',
    // Multiline text format
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      // backgroundColor: 'rgba(0,0,0,0.3)',
    },
  },
  root2: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    backgroundColor: '',
  },
  textField: {
    marginLeft: '',
    marginRight: '',
    width: '',
  },
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
  boxJustifyComment: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing(-5),
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
  boxReplyLeft: {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: theme.spacing(-4),
    marginTop: theme.spacing(-3),
    // backgroundColor: 'rgba(0,0,0,0.3)',
  },
  boxButtonLeft: {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: theme.spacing(0),
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  boxButtonRight: {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: theme.spacing(0),
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  chipStyle: {
    padding: theme.spacing(2),
    margin: theme.spacing(0),
  },
  cardStyle: {
    width: '100%',
    padding: 0,
    '&:last-child': {
      paddingBottom: 0,
      paddingTop: 0,
    },
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#F4F4F4',
    borderColor: '#F4F4F4', // Border color
    border: '0px solid', // Border size
  },
  cardStyleGreen: {
    width: '100%',
    padding: 0,
    '&:last-child': {
      paddingBottom: 0,
      paddingTop: 0,
    },
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#9AFF9E',
  },
  cardStyleBlue: {
    width: '100%',
    padding: 0,
    '&:last-child': {
      paddingBottom: 0,
      paddingTop: 0,
    },
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#D8FEFF',
  },
  cardActionStyle: {
    margin: theme.spacing(2, 4, 4, 4), // top, right, bottom, left
    // marginBottom: theme.spacing(4),
    // marginTop: theme.spacing(2),
  },
};

const useStyles = makeStyles(styles);

function SupportTicket(props) {
  const {userInfo} = props;

  const [supportTicket, setSupportTicket] = useState([]);
  const [reply, setReply] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    if (userInfo.adminId === '') {
      Router.push('login');
      return;
    }
    retrieveSupportTicket();
  }, []);

  const retrieveSupportTicket = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/supportTickets/ticket-info-with-admin/${Router.query.supportTicketId}`
      );
      const body = response.data;
      setSupportTicket(body);
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

  const updateReply = (e) => {
    e.preventDefault();
    const reply = e.target.value;
    setReply(reply);
    console.log(`Reply is: ${reply}`);
  };

  // Function to submit reply
  async function submitReply() {
    try {
      // Check if reply is empty
      if (!reply) {
        errorNotify('Please fill in the reply form to submit a reply');
        throw 'Name field is empty';
      }

      // console.log(
      //   `Reply is: ${reply} \n
      //   adminID is: ${userInfo.adminId} \n
      //   supportTicketID is: ${supportTicket.supportTicketId}
      //   `
      // )

      const response = await axios.post(
        'http://localhost:3000/supportComments/create-comment',
        {
          description: reply,
          isPostedByAdmin: true,
          adminId: userInfo.adminId,
          supportTicketId: supportTicket.supportTicketId,
        }
      );
      console.log(response.data);
      successNotify('Reply successfully submitted!');
      // Call the retrieve again to update the current page (Might need to .then)
      retrieveSupportTicket();
      // Resetting form
      document.getElementById('reply-form').reset();
    } catch (e) {
      console.error(e);
    }
  }

  // Function to resolve ticket
  async function resolveTicket() {
    try {
      console.log(`Closing/Resolving ticket`);
      const response = await axios.put(
        `http://localhost:3000/supportTickets/resolve/${supportTicket.supportTicketId}`
      );
      console.log(response.data);
      successNotify('Successfully resolved the ticket');
      retrieveSupportTicket();
    } catch (e) {
      console.error(e);
    }
  }

  toast.configure();

  const successNotify = (msg) => {
    toast.success(msg, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    });
  };

  const errorNotify = (err) => {
    toast.error(err, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    });
  };

  // const retrieveAdminById = async (adminId) => {
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:3000/admins/retrieve/${adminId}`
  //     );
  //     const body = response.data;
  //     return body;
  //   } catch (error){
  //     console.error(error);
  //   }
  // };

  return (
    <div>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="info">
              <h4
                className={classes.cardTitleWhite}
                style={{textAlign: 'center'}}>
                Support Ticket
              </h4>
            </CardHeader>

            <CardBody>
              <ThemeProvider theme={theme}>
                <div className={classes.cardProfile}>
                  {/* Ticket number */}
                  <Box className={classes.boxJustifyLeft}>
                    <Typography variant="h5" component="h5">
                      Ticket Number: &nbsp;
                    </Typography>
                    <Typography variant="h6" component="h5">
                      {supportTicket.supportTicketId}
                    </Typography>
                  </Box>

                  {/* Support Ticket Title */}
                  <Box className={classes.boxJustifyLeft}>
                    <Typography variant="h5" component="h5">
                      Title: &nbsp;
                    </Typography>
                    <Typography variant="h6" component="h5">
                      {supportTicket.title}
                    </Typography>
                  </Box>

                  {/* Support Ticket Type */}
                  <Box className={classes.boxJustifyLeft}>
                    <Typography variant="h5" component="h5">
                      Support Type: &nbsp;
                    </Typography>
                    <Chip
                      className={classes.chipStyle}
                      label={
                        <Box className={classes.boxJustify}>
                          <Typography variant="h6">
                            {supportTicket.supportType}
                          </Typography>
                        </Box>
                      }
                      color="default"
                    />
                  </Box>

                  {/* Support Ticket Status */}
                  <Box className={classes.boxJustifyLeftLast}>
                    <Typography variant="h5" component="h5">
                      Support Status: &nbsp;
                    </Typography>
                    <Chip
                      className={classes.chipStyle}
                      label={
                        <Box className={classes.boxJustify}>
                          <Typography variant="h6">
                            {supportTicket.supportStatus}
                          </Typography>
                        </Box>
                      }
                      color="primary"
                    />
                  </Box>

                  <Divider variant="middle" />

                  {/* First comment = the support ticket's description */}
                  <Box className={classes.boxJustifyComment}>
                    <Card className={classes.cardStyle} variant="outlined">
                      <CardBody profile>
                        {/* Username */}
                        <Box className={classes.boxJustifyLeftLast}>
                          <Typography variant="subtitle1" component="h5">
                            {Router.query.userName}
                          </Typography>
                        </Box>

                        {/* Divider + margin bottom */}
                        {/* <Divider />
                        <Box className={classes.boxJustifyLeftLast}></Box> */}
                        {/* End of Divider */}

                        {/* Description*/}
                        <Box className={classes.boxJustifyLeftLast}>
                          {/* <p style={{fontSize:"20px"}}>{supportTicket.description}</p> */}
                          <Typography variant="body1">
                            {supportTicket.description}
                          </Typography>
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
                            {formatDateAndTime(supportTicket.createdAt)}
                          </Typography>
                        </Box>
                      </CardBody>
                    </Card>
                  </Box>
                  {/* End of first comment */}

                  {/* Testing: If the support comments are retrieving properly */}
                  {/* {console.log("What is this: " + supportTicket.SupportComments[0].createdAt)} */}

                  {/* Support Comments / Responses */}
                  <Box className={classes.boxJustifyWithoutFlex}>
                    {supportTicket.SupportComments &&
                      supportTicket.SupportComments.map((comment) => (
                        <div key={comment.supportCommentId}>
                          {/* <Box className={classes.boxJustify} borderColor="#D3D3D3" border={2} borderRadius="10%"> */}
                          <Box className={classes.boxJustifyComment}>
                            <Card
                              className={comment.isPostedByAdmin ?
                                classes.cardStyleBlue : classes.cardStyle}
                              variant="outlined">
                              <CardBody profile>
                                {/* Username / Admin name */}
                                <Box className={classes.boxJustifyLeftLast}>
                                  <Typography variant="h6" component="h5">
                                    {comment.isPostedByAdmin
                                      ? comment.Admin.name
                                      : Router.query.userName}
                                    {/* {console.log('What is the value of: ' + comment.Admin.name)} */}
                                  </Typography>
                                </Box>

                                {/* Divider + margin bottom */}
                                {/* <Divider/>
                                <Box className={classes.boxJustifyLeftLast}></Box> */}
                                {/* End of Divider */}

                                {/* Description*/}
                                <Box className={classes.boxJustifyLeftLast}>
                                  <Typography variant="body1">
                                    {comment.description}
                                  </Typography>
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
                                    {formatDateAndTime(comment.createdAt)}
                                  </Typography>
                                </Box>
                              </CardBody>
                            </Card>
                          </Box>
                          {/* </Box> */}
                        </div>
                      ))}
                  </Box>

                  {/* Render only when ticket is marked as "resolved" */}
                  {supportTicket.supportStatus === 'RESOLVED' ? (
                    <Box className={classes.boxJustifyComment}>
                      <Card
                        className={classes.cardStyleGreen}
                        variant="outlined">
                        <CardBody profile>
                          {/* This ticket was marked as Resolved */}
                          <Box className={classes.boxJustifyLeftLast}>
                            <Typography variant="subtitle1" component="h5">
                              *This ticket was marked as Resolved*
                            </Typography>
                          </Box>
                        </CardBody>
                      </Card>
                    </Box>
                  ) : (
                    ''
                  )}
                  {/* End of render if */}
                </div>
              </ThemeProvider>
            </CardBody>

            {/* className={classes.cardProfile} */}
            <CardFooter>
            {supportTicket.supportStatus === 'RESOLVED' ? (
                ''
              ) : (
              <Box className={classes.boxReplyLeft}>
                <form
                  id="reply-form"
                  className={classes.root}
                  noValidate
                  autoComplete="off">
                  <div className={classes.root2}>
                    <TextField
                      id="outlined-multiline-static"
                      label="Reply"
                      required
                      multiline
                      fullWidth
                      rows={5}
                      placeholder="Please enter your reply here"
                      variant="outlined"
                      error={reply === '' ? true : false}
                      helperText={
                        reply === '' ? 'Please fill in your reply' : ''
                      }
                      onChange={updateReply}
                    />
                  </div>
                </form>
              </Box>
              )}
            </CardFooter>

            <CardActions className={classes.cardActionStyle}>
            {supportTicket.supportStatus === 'RESOLVED' ? (
                ''
              ) : (
              <Button color="primary" onClick={submitReply}>
                Submit Reply
              </Button>)}
              {supportTicket.supportStatus === 'RESOLVED' ? (
                ''
              ) : (
                <Button color="primary" onClick={resolveTicket}>
                  Resolve Ticket
                </Button>
              )}
            </CardActions>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

SupportTicket.layout = Admin;

export default connect(mapStateToProps, mapDispatchToProps)(SupportTicket);
