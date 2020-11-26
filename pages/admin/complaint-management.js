import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import {connect} from 'react-redux';
// @material-ui/core components
import {makeStyles} from '@material-ui/core/styles';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Chip from '@material-ui/core/Chip';
import Router from 'next/router';
import axios from 'axios';

import 'react-toastify/dist/ReactToastify.css';

// layout for this page
import Admin from 'layouts/Admin.js';
// core components
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import Button from 'components/CustomButtons/Button.js';

// Data Table Components
import MUIDataTable from 'mui-datatables';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

// Styles section
const styles = {
  cardCategoryWhite: {
    '&,& a,& a:hover,& a:focus': {
      color: 'rgba(255,255,255,.62)',
      margin: '0',
      fontSize: '14px',
      marginTop: '0',
      marginBottom: '0',
    },
    '& a,& a:hover,& a:focus': {
      color: '#FFFFFF',
    },
  },
  a: {
    color: '#FFFFFF',
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
    '& small': {
      color: '#777',
      fontSize: '65%',
      fontWeight: '400',
      lineHeight: '1',
    },
  },
};

const useStyles = makeStyles(styles);

const mapStateToProps = (state) => ({
  userInfo: state.main,
});

function ComplaintManagement(props) {
  // MUI Data Table
  const [responsive, setResponsive] = useState('standard'); // options: vertical, standard, simple
  const [tableBodyHeight, setTableBodyHeight] = useState('500px');
  const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState('');
  const [searchBtn, setSearchBtn] = useState(true);
  const [downloadBtn, setDownloadBtn] = useState(true);
  const [printBtn, setPrintBtn] = useState(true);
  const [viewColumnBtn, setViewColumnBtn] = useState(true);
  const [filterBtn, setFilterBtn] = useState(true);
  // End of MUI Data Table custom attributes

  // Connection to backend API
  const [complaints, setComplaints] = useState([]);

  // Current login admin info
  const {userInfo} = props;

  useEffect(() => {
    if (userInfo.adminId === '') {
      Router.push('login');
      return;
    }
    retrieveComplaints();
  }, []);

  //Retrieve all complaints when page first renders using useEffect
  const retrieveComplaints = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3000/complaints/all-complaints'
      );
      const body = response.data;

      setComplaints(body);
      complaints.map(getUser);
    } catch (error) {
      console.error(error);
    }
  };

  const getUser = async (complaint) => {
    try {
      const response = await axios.get(
        'http://localhost:3000/users/' + complaint.complainerUserId
      );
      complaint['userName'] = response.data.name;

      console.log("user's name");
      console.log(response.data.name);
      console.log(complaint);
    } catch (error) {
      console.log(error);
    }
  };

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

  // End of connection to backend API

  // Start of Material UI Data Table Render
  const columns = [
    // Example: 1f80761d-a8cc-481d-9d77-e6c23056ad06 (Hidden from table)
    {
      name: 'complaintId',
      label: 'Complaint ID',
      options: {
        filter: false,
        sort: true,
        display: 'excluded', // Hidden
      },
    },
    // Example: Error with the navigation
    {
      name: 'description',
      label: 'Description',
      options: {
        filter: false,
        sort: true,
      },
    },
    // Example: PROFILE, SYSTEM, PAYMENT, JIO, REQUEST, HEALTH
    {
      name: 'complainer.name',
      label: 'User',
      options: {
        filter: true,
        sort: false,
      },
    },
    // Example: PENDING, RESOLVED
    {
      name: 'complaintStatus',
      label: 'Status',
      options: {
        filter: true,
        sort: false,
      },
    },
    // Example: Tom, Paul
    {
      name: 'complainerUserId',
      label: 'Complaint Submitted by',
      options: {
        filter: true,
        sort: false,
        display: 'excluded', // Hidden
      },
    },
    // Example: Tom, Paul
    {
      name: 'requestId',
      label: 'Request Id',
      options: {
        filter: true,
        sort: false,
      },
    },
    // Submitted on date example: 28/11/2020
    {
      name: 'createdAt',
      label: 'Submitted On',
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Chip
              label={new Date(value).toLocaleDateString('en-GB')}
              value={new Date(value).toLocaleDateString('en-GB')}
              change={(event) => updateValue(event)}
              color="primary"
            />
          );
        },
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
                let complaintId = data[dataIndex].complaintId;
                let description = data[dataIndex].description;
                let complaintStatus = data[dataIndex].complaintStatus;
                let createdAt = data[dataIndex].createdAt;
                let adminResponse = data[dataIndex].adminResponse;
                let complainerUserId = data[dataIndex].complainerUserId;
                let requesterId = data[dataIndex].requesterId;
                handleComplaint(
                  complaintId,
                  description,
                  complaintStatus,
                  createdAt,
                  adminResponse,
                  complainerUserId,
                  requesterId
                );
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
    jumpToPage: true,
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

  // Set retrieve all support tickets as the data (API)
  const data = complaints;

  const classes = useStyles();

  return (
    <div>
      {/* Complaint Management Panel */}
      <GridContainer justify="center">
        <GridItem xs={11} sm={11} md={11}>
          <Card>
            <CardHeader color="primary">
              <h4
                className={classes.cardTitleWhite}
                style={{
                  display: 'inline-block',
                  float: 'left',
                  alignItems: 'center',
                }}>
                Complaint Management Panel
              </h4>
              {/* <p className={classes.cardCategoryWhite}>
                Can include subtitle here 
              </p> */}
            </CardHeader>

            {/* Render MUI Data Table */}
            {/* <CardBody> */}
            <MUIDataTable
              title={''} // Customer Support
              data={data}
              columns={columns}
              options={options}
            />
            {/* </CardBody> */}
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

ComplaintManagement.layout = Admin;

export default connect(mapStateToProps)(ComplaintManagement);
