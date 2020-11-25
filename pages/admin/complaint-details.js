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
import Avatar, {bold} from 'assets/img/complain.png';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';

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
  commentBox: {
    width: '80',
    marginTop: '100px',
  },
};

const useStyles = makeStyles(styles);

function ComplaintDetails(props) {
  const {userInfo} = props;
  const classes = useStyles();
  const [complaintId, setComplaintId] = useState(Router.query.complaintId);
  const [description, setDescription] = useState(Router.query.description);
  const [complaintStatus, setComplaintStatus] = useState(
    Router.query.complaintStatus
  );
  const [createdAt, setCreatedAt] = useState(Router.query.createdAt);
  const [adminResponse, setAdminResponse] = useState(
    Router.query.adminResponse
  );

  const [textBox, setTextBox] = useState();

  useEffect(() => {
    if (userInfo.adminId === '') {
      Router.push('login');
      return;
    }
    console.log('Complaint details');
    console.log(Router.query.complaintId);
  }, []);

  const updateTextBox = (e) => {
    e.preventDefault();
    console.log('Input is updating');
    const textBox = e.target.value;
    setTextBox(textBox);
    console.log('Updated textBox is ' + name);
  };

  const displayStatus = () => {
    console.log('Complaint Status');
    console.log(complaintStatus);
    if (complaintStatus === 'PENDING') {
      return <Chip label="Pending" color="primary" />;
    } else if (complaintStatus === 'RESOLVED') {
      return <Chip label="Resolved" color="primary" />;
    } else {
      return <Chip label="Rejected" color="secondary" />;
    }
  };

  const handleStrike = async () => {};
  const textBoxEmpty = () => {
    toast.success(`Text required`, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    });
  };

  const handleRespond = async () => {
    try {
      if (textBox === '' || textBox === null) {
        textBoxEmpty;
      } else {
        const response = await axios.put(
          'http://localhost:3000/complaints/update-complaint/',
          {
            complaintId: complaintId,
            adminResponse: textBox,
          }
        );
        const complaint = response.data;
        setComplaintId(complaint.complaintId);
        setDescription(complaint.description);
        setComplaintStatus(complaint.complaintStatus);
        setCreatedAt(complaint.createdAt);
        setAdminResponse(complaint.adminResponse);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleResolve = async () => {
    try {
      const response = await axios.put(
        'http://localhost:3000/complaints/resolve/' + complaintId
      );
      const complaint = response.data;
      setComplaintId(complaint.complaintId);
      setDescription(complaint.description);
      setComplaintStatus(complaint.complaintStatus);
      setCreatedAt(complaint.createdAt);
      setAdminResponse(complaint.adminResponse);
    } catch (error) {
      console.log(error);
    }
  };
  const handleReject = async () => {};

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
                    <Typography gutterBottom variant="h5" component="h8">
                      Complaint
                    </Typography>
                  </Box>

                  <Box b={5}>
                    <Typography gutterBottom variant="h6" component="h8">
                      {description}
                    </Typography>
                  </Box>
                </div>

                <Divider variant="middle" />

                <div className={classes.cardProfile}>
                  <Box b={5}>
                    <Typography gutterBottom variant="h5">
                      Status
                    </Typography>
                  </Box>
                  {displayStatus()}
                </div>
                <Divider variant="middle" />

                <div className={classes.cardProfile}>
                  <Box b={5}>
                    <Typography gutterBottom variant="h5" component="h8">
                      Reported on
                    </Typography>
                  </Box>

                  <Box b={5}>
                    <Typography gutterBottom variant="h6" component="h8">
                      {new Date(createdAt).toLocaleDateString('en-GB')}
                    </Typography>
                  </Box>
                </div>

                <Divider variant="middle" />

                <div className={classes.cardProfile}>
                  <Box b={5}>
                    <Typography gutterBottom variant="h5" component="h8">
                      Admin Comments
                    </Typography>
                  </Box>

                  <Box b={5}>
                    <Typography gutterBottom variant="h6" component="h8">
                      {adminResponse === null || adminResponse === '' ? (
                        <Typography gutterBottom variant="h6" component="h8">
                          No comments yet
                        </Typography>
                      ) : (
                        <Typography gutterBottom variant="h6" component="h8">
                          adminResponse
                        </Typography>
                      )}
                    </Typography>
                  </Box>
                </div>
              </ThemeProvider>
            </CardBody>
            <Divider variant="middle" />
            <div>
              <TextField
                required
                style={{width: '80%', marginTop: '20px', marginBottom: '20px'}}
                label="Comments"
                value={textBox}
                onChange={updateTextBox}
                error={textBox === '' ? true : false}
                helperText={textBox === '' ? 'Text is required' : ''}
                variant="outlined"></TextField>
              <Button
                style={{marginBottom: '20px'}}
                color="primary"
                onClick={() => handleRespond()}>
                <a id="changePassBut"> Respond</a>
              </Button>
            </div>
            <Divider variant="middle" />

            <CardFooter>
              <Button color="primary" onClick={() => handleStrike()}>
                <a id="changePassBut"> Strike and resolve</a>
              </Button>

              <Button color="primary" onClick={() => handleResolve()}>
                <a id="changePassBut">Resolve without strike</a>
              </Button>

              <Button color="primary" onClick={() => handleReject()}>
                <a id="changePassBut">Reject</a>
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

ComplaintDetails.layout = Admin;

export default connect(mapStateToProps, mapDispatchToProps)(ComplaintDetails);
