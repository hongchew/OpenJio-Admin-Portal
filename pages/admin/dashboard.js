import React, {useState, useEffect} from 'react';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Router from 'next/router';
//redux app state management
import {connect} from 'react-redux';
// @material-ui/core
import {makeStyles} from '@material-ui/core/styles';
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

import axios from 'axios';

import {supportTickets, complaints} from 'variables/general.js';

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

  useEffect(() => {
    if (userInfo.adminId === '') {
      Router.push('login');
      return;
    }
    welcome();
    retrieveBlacklistedUsers();
    retrieveAdmins();
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
                  <Tasks
                    checkedIndexes={[0, 3]}
                    tasksIndexes={[0, 1, 2, 3, 4]}
                    tasks={supportTickets}
                  />
                ),
              },
              {
                tabName: 'Complaints',
                tabIcon: ComplaintIcon,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0]}
                    tasksIndexes={[0, 1, 2]}
                    tasks={complaints}
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
