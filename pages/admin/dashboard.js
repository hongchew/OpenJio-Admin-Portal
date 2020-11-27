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
import Chip from '@material-ui/core/Chip';

// Data Table Components
import MUIDataTable from 'mui-datatables';
// MUI styles
import {createMuiTheme, responsiveFontSizes} from '@material-ui/core/styles';

import axios from 'axios';

import {complaints} from 'variables/general.js';
import {Typography} from '@material-ui/core';

// import styles from 'assets/jss/nextjs-material-dashboard/views/dashboardStyle.js';

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
      fontSize: 16,
      fontWeight: 500,
      fontStyle: 'bold',
    },
    subtitle2: {
      color: '#808080',
      fontSize: 14,
      fontWeight: 500,
      fontStyle: 'regular',
    },
    body1: {
      fontSize: 14,
      fontWeight: 300,
    },
  },
});
theme = responsiveFontSizes(theme);

const styles = {
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
  boxJustifyWithoutFlex: {
    justifyContent: 'center',
    alignItems: 'center',
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
  tableFormat: {
    boxShadow: 'none',
  },
};

const useStyles = makeStyles(styles);

function Dashboard(props) {
  const classes = useStyles();
  const {userInfo} = props;
  const [blacklistedUsers, setBlacklistedUsers] = useState([]);
  const [admins, setAdmins] = useState([]);
  // const [supportTickets, setSupportTickets] = useState([]);
  const [mostRecentComments, setMostRecentComments] = useState([]);
  const [mostRecentcomplaints, setMostRecentComplaints] = useState([]);

  // MUI Data Table
  const [responsive, setResponsive] = useState('standard'); // options: vertical, standard, simple
  const [tableBodyHeight, setTableBodyHeight] = useState('auto');
  const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState('');
  // Off the buttons on the table:
  const [searchBtn, setSearchBtn] = useState(true); // true
  const [downloadBtn, setDownloadBtn] = useState(false);
  const [printBtn, setPrintBtn] = useState(false);
  const [viewColumnBtn, setViewColumnBtn] = useState(false);
  const [filterBtn, setFilterBtn] = useState(true); // true
  // End of MUI Data Table custom attributes

  useEffect(() => {
    if (userInfo.adminId === '') {
      Router.push('login');
      return;
    }
    // welcome();
    retrieveAdmins();
    retrieveBlacklistedUsers();
    retrieveMostRecentComments();
    retrieveMostRecentComplaints();
  }, []);

  const retrieveAdmins = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3000/admins/retrieve-all'
      );
      const body = response.data;
      setAdmins(body);
      // console.log('Admins are:');
      console.log(body);
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

  const retrieveMostRecentComments = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3000/supportComments/most-recent'
      );
      const body = response.data;
      setMostRecentComments(body);
    } catch (error) {
      console.log(error);
    }
  };

  const retrieveMostRecentComplaints = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3000/complaints/most-recent'
      );
      const body = response.data;
      setMostRecentComplaints(body);
    } catch (error) {
      console.log(error);
    }
  };

  toast.configure();

  // Remove the welcome message because it keeps appearing
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
  // Remove select stuff on top ^^

  function upperCaseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function lowerCaseAllWordsExceptFirstLetters(string) {
    return string.replace(/\S*/g, function (word) {
      return word.charAt(0) + word.slice(1).toLowerCase();
    });
  }

  // View specific support ticket
  async function handleViewSupportTicket(supportTicketId, userName) {
    Router.push({
      pathname: `support-ticket`,
      query: {
        supportTicketId: supportTicketId,
        userName: userName,
      },
    });
  }

  //   View specific complaint
  async function handleComplaint(
    complaintId,
    description,
    complaintStatus,
    createdAt,
    adminResponse,
    complainerUserId,
    requestId
  ) {
    Router.push({
      pathname: 'complaint-details',
      query: {
        complaintId: complaintId,
        description: description,
        adminResponse: adminResponse,
        complaintStatus: complaintStatus,
        createdAt: createdAt,
        requestId: requestId,
        complainerUserId: complainerUserId,
        requestId: requestId,
      },
    });
  }

  // Start of Admins Material UI Data Table Render
  const adminsColumns = [
    // Example: 1f80761d-a8cc-481d-9d77-e6c23056ad06 (Hidden from table, for routing purposes only)
    {
      name: 'adminId',
      label: 'Admin ID',
      options: {
        filter: false,
        sort: false,
        display: 'excluded', // Hidden
      },
    },
    // Example: Error with the navigation
    {
      name: 'name',
      label: 'Name',
      options: {
        filter: false,
        sort: false,
      },
    },
    // Example: I need help
    {
      name: 'email',
      label: 'Email',
      options: {
        filter: false,
        sort: false,
      },
    },
    // Example: Super Admin
    {
      name: 'adminType',
      label: 'Admin Type',
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Chip
              label={value === 'SUPER_ADMIN' ? 'Super Admin' : 'Admin'}
              value={value === 'SUPER_ADMIN' ? 'Super Admin' : 'Admin'}
              color="primary"
            />
          );
        },
      },
    },
  ];

  const blacklistedColumns = [
    // Example: 1f80761d-a8cc-481d-9d77-e6c23056ad06 (Hidden from table, for routing purposes only)
    {
      name: 'userId',
      label: 'User ID',
      options: {
        filter: false,
        sort: false,
        display: 'excluded', // Hidden
      },
    },
    // Example: Error with the navigation
    {
      name: 'name',
      label: 'Name',
      options: {
        filter: false,
        sort: false,
      },
    },
    // Example: I need help
    {
      name: 'email',
      label: 'Email',
      options: {
        filter: false,
        sort: false,
      },
    },
    // Example: Super Admin
    {
      name: 'strikeCount',
      label: 'Strike Count',
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <Chip label={value} value={value} color="primary" />;
        },
      },
    },
  ];

  // Start of Comments Material UI Data Table Render
  const commentsColumns = [
    // Example: 1f80761d-a8cc-481d-9d77-e6c23056ad06 (Hidden from table, for routing purposes only)
    {
      name: 'SupportTicket.supportTicketId',
      label: 'Support Ticket ID',
      options: {
        filter: false,
        sort: false,
        display: 'excluded', // Hidden
      },
    },
    // Example: Error with the navigation
    {
      name: 'SupportTicket.title',
      label: 'Support Ticket Title',
      options: {
        filter: false,
        sort: false,
      },
    },
    // Example: I need help
    {
      name: 'description',
      label: 'Comments from Users',
      options: {
        filter: false,
        sort: false,
      },
    },
    // Example: PROFILE, SYSTEM, PAYMENT, JIO, REQUEST, HEALTH
    {
      name: 'SupportTicket.supportType',
      label: 'Support Type',
      options: {
        filter: true,
        sort: false,
      },
    },
    // Submitted on date example: 28/11/2020
    {
      name: 'createdAt',
      label: 'Commented On',
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Chip
              label={new Date(value).toLocaleDateString('en-GB')}
              value={new Date(value).toLocaleDateString('en-GB')}
              // change={(event) => updateValue(event)}
              color="primary"
            />
          );
        },
      },
    },
    // Example: Tom, Paul
    {
      name: 'SupportTicket.User.name',
      label: 'User',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'actions',
      label: 'Actions',
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRenderLite: (dataIndex, rowIndex) => {
          return (
            <Button
              variant="contained"
              color="info"
              className={classes.button}
              onClick={() => {
                let supportTicketId =
                  commentsData[dataIndex].SupportTicket.supportTicketId;
                // let title = data[dataIndex].title;
                let userName = commentsData[dataIndex].SupportTicket.User.name;

                // Window alert for testing

                // window.alert(
                //   `Clicked data index: ${dataIndex} +
                //   row index: ${rowIndex} +
                //   supportTicketId: ${supportTicketId} +
                //   username: ${userName}
                //   `
                // );

                handleViewSupportTicket(supportTicketId, userName);
              }}
              startIcon={<VisibilityIcon />}>
              View
            </Button>
          );
        },
      },
    },
  ];

  const complaintsColumns = [
    // Example: 1f80761d-a8cc-481d-9d77-e6c23056ad06 (Hidden from table, for routing purposes only)
    {
      name: 'complaintId',
      label: 'Complaint ID',
      options: {
        filter: false,
        sort: false,
        display: 'excluded', // Hidden
      },
    },
    // Example: Error with the navigation
    {
      name: 'description',
      label: 'Complaint Info',
      options: {
        filter: false,
        sort: false,
      },
    },
    // Example: I need help
    {
      name: 'Request.title',
      label: 'Request Title',
      options: {
        filter: false,
        sort: false,
      },
    },
    // Example: PROFILE, SYSTEM, PAYMENT, JIO, REQUEST, HEALTH
    {
      name: 'complaintStatus',
      label: 'Complaint Status',
      options: {
        filter: true,
        sort: false,
      },
    },
    // Submitted on date example: 28/11/2020
    {
      name: 'createdAt',
      label: 'Complained On',
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Chip
              label={new Date(value).toLocaleDateString('en-GB')}
              value={new Date(value).toLocaleDateString('en-GB')}
              // change={(event) => updateValue(event)}
              color="primary"
            />
          );
        },
      },
    },
    // Example: Tom, Paul
    {
      name: 'Request.User.name',
      label: 'User',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'actions',
      label: 'Actions',
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRenderLite: (dataIndex, rowIndex) => {
          return (
            <Button
              variant="contained"
              color="info"
              className={classes.button}
              onClick={() => {
                let complaintId = complaintData[dataIndex].complaintId;
                let description = complaintData[dataIndex].description;
                let complaintStatus = complaintData[dataIndex].complaintStatus;
                let createdAt = complaintData[dataIndex].createdAt;
                let adminResponse = complaintData[dataIndex].adminResponse;
                let complainerUserId =
                  complaintData[dataIndex].complainerUserId;
                let requesterId = complaintData[dataIndex].Request.requestId;

                // Window alert for testing
                // window.alert(
                //   `Clicked data index: ${dataIndex} +
                //   row index: ${rowIndex} +
                //   complaintId: ${complaintId} +
                //   description: ${description} +
                //   requesterId: ${requesterId}`
                // );

                handleComplaint(complaintId, description, complaintStatus, createdAt,
                  adminResponse, complainerUserId, requesterId)

              }}
              startIcon={<VisibilityIcon />}>
              View
            </Button>
          );
        },
      },
    },
  ];

  // MUI Data Table options
  const options = {
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 15, 20],
    pagination: false, // Remove pagination
    jumpToPage: false, // Remove jump to page
    selectableRows: 'single',
    selectableRowsHeader: false,
    selectableRowsHideCheckboxes: true,
    selectableRowsOnClick: true,
    search: searchBtn,
    download: downloadBtn,
    print: printBtn,
    viewColumns: viewColumnBtn,
    filter: filterBtn,
    filterType: 'dropdown',
    responsive,
    tableBodyHeight,
    tableBodyMaxHeight,
    enableNestedDataAccess: '.', // allows nested data separated by "." Example: User.name
    selectToolbarPlacement: 'none', // Hide select toolbar
    onTableChange: (action, state) => {
      console.log(action);
      console.dir(state);
    },
  };

  // MUI Data Table options
  const options2 = {
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 15, 20],
    pagination: false, // Remove pagination
    jumpToPage: false, // Remove jump to page
    selectableRows: 'single',
    selectableRowsHeader: false,
    selectableRowsHideCheckboxes: true,
    selectableRowsOnClick: true,
    // search: searchBtn,
    search: false,
    download: downloadBtn,
    print: printBtn,
    viewColumns: viewColumnBtn,
    // filter: filterBtn,
    filter: false,
    filterType: 'dropdown',
    responsive,
    tableBodyHeight,
    tableBodyMaxHeight,
    enableNestedDataAccess: '.', // allows nested data separated by "." Example: User.name
    selectToolbarPlacement: 'none', // Hide select toolbar
    onTableChange: (action, state) => {
      console.log(action);
      console.dir(state);
    },
  };

  // Set data for the table;
  const commentsData = mostRecentComments;
  const complaintData = mostRecentcomplaints;
  const adminData = admins;
  const blacklistedUsersdata = blacklistedUsers;

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Admin Accounts</h4>
            </CardHeader>

            {/* <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={['Name', 'Email', 'Admin Type']}
                tableData={admins.map(selectColAdmin)}
              />
            </CardBody> */}

            <CardBody>
              <MUIDataTable
                className={classes.tableFormat}
                title={''}
                data={adminData}
                columns={adminsColumns}
                options={options2}
              />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Blacklisted Users</h4>
            </CardHeader>

            {/* <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={['Name', 'Email', 'Strike Count']}
                tableData={blacklistedUsers.map(selectCol)}
              />
            </CardBody> */}

            <CardBody>
              <MUIDataTable
                className={classes.tableFormat}
                title={''}
                data={blacklistedUsersdata}
                columns={blacklistedColumns}
                options={options2}
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
                // Most recent support ticket comments table:
                tabName: 'Support Tickets',
                tabIcon: CustomerSupport,
                tabContent: (
                  <MUIDataTable
                    className={classes.tableFormat}
                    title={
                      <Typography variant="h6" component="h5">
                        Most Recent Comments
                      </Typography>
                    }
                    data={commentsData}
                    columns={commentsColumns}
                    options={options}
                  />
                ),
              },
              {
                tabName: 'Complaints',
                tabIcon: ComplaintIcon,
                tabContent: (
                  <MUIDataTable
                    className={classes.tableFormat}
                    title={
                      <Typography variant="h6" component="h5">
                        Most Recent Complaints
                      </Typography>
                    }
                    data={complaintData}
                    columns={complaintsColumns}
                    options={options}
                  />
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
