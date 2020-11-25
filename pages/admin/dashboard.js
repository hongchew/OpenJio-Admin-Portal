import React, {useState, useEffect} from 'react';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Router from 'next/router';
import LockOpenIcon from '@material-ui/icons/LockOpen';
//redux app state management
import {connect} from 'react-redux';
// @material-ui/core
import {makeStyles} from '@material-ui/core/styles';
import VisibilityIcon from '@material-ui/icons/Visibility';
// @material-ui/icons
import CustomerSupport from '@material-ui/icons/LiveHelp';
import ComplaintIcon from '@material-ui/icons/Report';
// layout for this page
import Admin from 'layouts/Admin.js';
// core components
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Table from 'components/Table/Table.js';
import Tasks from 'components/Tasks/Tasks.js';
import CustomTabs from 'components/CustomTabs/CustomTabs.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import Button from 'components/CustomButtons/Button.js';

import axios from 'axios';

import {complaints} from 'variables/general.js';

import styles from 'assets/jss/nextjs-material-dashboard/views/dashboardStyle.js';

const useStyles = makeStyles(styles);

const mapStateToProps = (state) => ({
  userInfo: state.main,
});

function Dashboard(props) {
  const classes = useStyles();
  const {userInfo} = props;
  const [blacklistedUsers, setBlacklistedUsers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [supportTickets, setSupportTickets] = useState([]);
  const [complaints, setComplaints] = useState([]);
  // const [supportTicketUsers, setSupportTicketUsers] = useState([]);

  useEffect(() => {
    if (userInfo.adminId === '') {
      Router.push('login');
      return;
    }
    welcome();
    retrieveBlacklistedUsers();
    retrieveAdmins();
    retrieveSupportTickets();
    retrieveComplaints();
  }, []);

  const retrieveAdmins = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3000/admins/retrieve-all'
      );
      const body = response.data;
      setAdmins(body);
      console.log('Admins are:');
      console.log(body);
    } catch (error) {
      console.log(error);
    }
  };

  const retrieveSupportTickets = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3000/supportTickets/active-tickets'
      );
      const body = response.data;

      console.log('Get users of support ticket');
      body.map(getUsers);
      console.log(body);
      // setSupportTicketUsers(supportTicketUsers);
      setSupportTickets(body);
    } catch (error) {
      console.log(error);
    }
  };

  const getUsers = async (supportTicket) => {
    try {
      const response = await axios.get(
        'http://localhost:3000/users/' + supportTicket.userId
      );
      supportTicket.stUser = response.data.name;
      console.log("user's name");
      console.log(supportTicket);
    } catch (error) {
      console.log(error);
    }
  };

  const retrieveComplaints = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3000/complaints/all-pending-complaints'
      );
      const body = response.data;
      body.map(getRequestDetail);
      setComplaints(body);
      console.log('Complaints are:');
      console.log(body);
    } catch (error) {
      console.log(error);
    }
  };
  const getRequestDetail = async (complaint) => {
    try {
      const response = await axios.get(
        'http://localhost:3000/requests/by-requestId/' + complaint.requestId
      );
      complaint.requestTitle = response.data.title;
      console.log('request title');
      console.log(response.data.title);
    } catch (error) {
      console.log(error);
    }
  };

  const retrieveBlacklistedUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/users/');
      const body = response.data;
      //Get only blacklisted users
      const blacklisted = body.filter(function (user) {
        return user.isBlackListed === true;
      });
      console.log('Blacklisted users are:');
      console.log(blacklisted);
      setBlacklistedUsers(blacklisted);
    } catch (error) {
      console.error(error);
    }
  };

  toast.configure();
  const welcome = () => {
    toast.success(`Welcome back ${userInfo.name}`, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    });
  };

  //return blacklisted users' name, email and strike count
  const selectCol = (user) => {
    return [user.name, user.email, user.strikeCount.toString()];
  };

  const selectColAdmin = (admin) => {
    let adminType;
    if (admin.adminType === 'SUPER_ADMIN') {
      adminType = 'Super Admin';
    } else {
      adminType = 'Admin';
    }
    return [admin.name, admin.email, adminType];
  };

  const selectTitle = (supportTicket) => {
    let title;
    title = supportTicket.title;
    return title;
  };

  const selectDescription = (complaint) => {
    let description;
    description = complaint.description;
    return description;
  };
  function upperCaseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function lowerCaseAllWordsExceptFirstLetters(string) {
    return string.replace(/\S*/g, function (word) {
      return word.charAt(0) + word.slice(1).toLowerCase();
    });
  }

  const renderSTHeader = () => {
    // 'Mobile Number' <-- Remove to make the table more concise
    let headerElement = [
      'Title',
      'Description',
      'Support Type',
      'Status',
      'User',
    ];
    return headerElement.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  };
  // Render table body
  const renderSTBody = () => {
    return (
      supportTickets &&
      supportTickets.map((supportTicket) => {
        console.log('before return');
        //check why this is not working....
        console.log(supportTicket.stUser);
        return (
          <tr key={supportTicket.supportTicketId}>
            <td>{supportTicket.title}</td>
            <td>{supportTicket.description}</td>
            <td>
              {upperCaseFirstLetter(
                lowerCaseAllWordsExceptFirstLetters(supportTicket.supportType)
              )}
            </td>
            <td>
              {upperCaseFirstLetter(
                lowerCaseAllWordsExceptFirstLetters(supportTicket.supportStatus)
              )}
            </td>
            <td>{supportTicket.userId}</td>
            <td className="operation">
              {/* simple <-- took out to align with the header */}
              {/* size="lg" */}
              <Button
                value={supportTicket}
                color="info"
                startIcon={<VisibilityIcon />}
                // onClick={() =>}
              >
                View
              </Button>
              <Button
                color="danger"
                variant="contained"
                className={classes.button}
                startIcon={<LockOpenIcon />}
                // onClick={() => }
              >
                Close
              </Button>
            </td>
          </tr>
        );
      })
    );
  };

  const routeComplaintDetails = (complaint) => {
    console.log('before routing');
    console.log(complaint);
    Router.push({
      pathname: 'complaint-details',
      query: {
        complaintId: complaint.complaintId,
        description: complaint.description,
        adminResponse: complaint.adminResponse,
        complaintStatus: complaint.complaintStatus,
        createdAt: complaint.createdAt,
        updatedAt: complaint.updatedAt,
        requestId: complaint.requestId,
      },
    });
  };

  const renderCHeader = () => {
    let headerElement = ['Description', 'Complaint Status', 'Request Id'];
    return headerElement.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  };
  // Render table body
  const renderCBody = () => {
    return (
      complaints &&
      complaints.map((complaint) => {
        console.log('before complaint');
        console.log(complaint);
        console.log(complaint.requestTitle);
        return (
          <tr key={complaint.complaintId}>
            <td>{complaint.description}</td>
            <td>
              {upperCaseFirstLetter(
                lowerCaseAllWordsExceptFirstLetters(complaint.complaintStatus)
              )}
            </td>
            <td>{complaint.requestId}</td>

            <td className="operation">
              <Button
                value={complaint}
                color="info"
                startIcon={<VisibilityIcon />}
                onClick={() => routeComplaintDetails(complaint)}>
                View
              </Button>

              {/* size="lg" */}
              <Button
                color="danger"
                variant="contained"
                className={classes.button}
                startIcon={<LockOpenIcon />}
                // onClick={() => }
              >
                Resolve
              </Button>
            </td>
          </tr>
        );
      })
    );
  };

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Admin Accounts</h4>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={['Name', 'Email', 'Admin Type']}
                tableData={admins.map(selectColAdmin)}
              />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Blacklisted Users</h4>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={['Name', 'Email', 'Strike Count']}
                tableData={blacklistedUsers.map(selectCol)}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>

      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <CustomTabs
            title="Tasks:"
            headerColor="dark"
            tabs={[
              {
                tabName: 'Support Tickets',
                tabIcon: CustomerSupport,
                tabContent: (
                  <Card>
                    <CardBody>
                      <table id="supportTickets" style={{width: '70vw'}}>
                        <thead align="left">
                          <tr>{renderSTHeader()}</tr>
                        </thead>

                        <tbody>{renderSTBody()}</tbody>
                      </table>
                    </CardBody>
                  </Card>
                  // <Tasks
                  //   checkedIndexes={[]}
                  //   tasksIndexes={Array.from(
                  //     Array(supportTickets.length).keys()
                  //   )}
                  //   tasks={supportTickets.map(selectTitle)}
                  // />
                ),
              },
              {
                tabName: 'Complaints',
                tabIcon: ComplaintIcon,
                tabContent: (
                  <Card>
                    <CardBody>
                      <table id="complaints" style={{width: '70vw'}}>
                        <thead align="left">
                          <tr>{renderCHeader()}</tr>
                        </thead>

                        <tbody>{renderCBody()}</tbody>
                      </table>
                    </CardBody>
                  </Card>
                ),
              },
            ]}
          />
        </GridItem>
      </GridContainer>
    </div>
  );
}

Dashboard.layout = Admin;

export default connect(mapStateToProps)(Dashboard);
