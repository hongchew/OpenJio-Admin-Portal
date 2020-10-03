import React, {useState, useEffect} from 'react';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//redux app state management
import {connect} from 'react-redux';
import {setInfo} from '../../redux/action/main';
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

import {supportTickets, complaints} from 'variables/general.js';

import styles from 'assets/jss/nextjs-material-dashboard/views/dashboardStyle.js';

const useStyles = makeStyles(styles);

const mapStateToProps = (state) => ({
  userInfo: state.main,
});

function Dashboard(props) {
  const classes = useStyles();
  const {userInfo} = props;
  const [blacklistedUsers, setBlacklistedUsers] = useState();

  //For welcome notification when page first renders
  useEffect(() => {
    console.log('im in');
    welcome();
    retrieveUsers();
  }, []);

  const retrieveUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/users/');
      const body = response.data;
      //Get only blacklisted users
      const blacklisted = body.filter(function (user) {
        return user.isBlackListed === true;
      });
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
    console.log('userInfo saved is: ');
    console.log(userInfo);
  };

  const renderTableHeader = () => {
    let headerElement = ['Name', 'Email', 'Strike Count'];

    return headerElement.map((key, index) => {
      return <th key={index}></th>;
    });
  };

  //return blacklisted users' name, email and strike count
  const selectCol = (user) => {
    return [user.name, user.email, user.strikeCount];
  };

  // Render table body
  const renderTableBody = () => {
    // return (
    //   blacklistedUsers &&
    //   blacklistedUsers.map(({userId, name, email, strikeCount}) => {
    //     return (
    //       <tr key={userId}>
    //         <td>{name}</td>
    //         <td>{email}</td>
    //         <td>{strikeCount}</td>
    //         <td className="operation">
    //           <Button
    //             variant="contained"
    //             color="danger"
    //             className={classes.button}
    //             startIcon={<DeleteIcon />}>
    //             Remove
    //           </Button>
    //         </td>
    //       </tr>
    //     );
    //   })
    // );
    return blacklistedUsers && blacklistedUsers.map(selectCol);
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
                tableHeaderColor="danger"
                tableHead={['Name', 'Admin Type']}
                tableData={[
                  ['User A', '2'],
                  ['User B', '3'],
                  ['User C', '1'],
                  ['User D', '2'],
                  ['User E', '3'],
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="danger">
              <h4 className={classes.cardTitleWhite}>Blacklisted Users</h4>
            </CardHeader>
            <CardBody>
              {/* <Table
                tableHeaderColor="danger"
                tableHead={['Name', 'Email', 'Strike Count']}
                tableData={renderTableBody()}
              /> */}
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
