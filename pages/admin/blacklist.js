import React, {useState, useEffect} from 'react';
import Link from 'next/router';
import axios from 'axios';
import {connect} from 'react-redux';
import Router from 'next/router';
// @material-ui/core components
import {makeStyles} from '@material-ui/core/styles';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import VisibilityIcon from '@material-ui/icons/Visibility';

// import Edit from "@material-ui/icons/Edit";
import Close from '@material-ui/icons/Close';
// Toast alert
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// layout for this page
import Admin from 'layouts/Admin.js';
// core components
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Table from 'components/Table/Table.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import Button from 'components/CustomButtons/Button.js';

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

function BlacklistManagement(props) {
  const [users, setUsers] = useState([]);
  const {userInfo} = props;

  useEffect(() => {
    if (userInfo.adminId === '') {
      Router.push('login');
      return;
    }
    retrieveUsers();
  }, []);

  //Retrieve all users when page first renders using useEffect
  const retrieveUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/users/');
      const body = response.data;
      //Get only blacklisted users
      const blacklisted = body.filter(function (user) {
        return user.isBlackListed === true;
      });
      setUsers(blacklisted);
    } catch (error) {
      console.error(error);
    }
  };

  //Edit blacklisted user
  async function editBlacklistedUser(userId, name) {
    try {
      const afterRemovalList = users.filter((user) => userId !== user.userId);
      const userToUpdate = users.filter((user) => userId === user.userId)[0];
      // console.log(
      //   `User to update blacklist is: ${JSON.stringify(userToUpdate)}`
      // );
      //clearing the blacklist and strike counts
      const updatedUser = updateUser(userToUpdate);
      axios.put('http://localhost:3000/users/update-user-details', updatedUser);
      // console.log('user successfully removed');
      editSuccessfulAlert(name);
      setUsers(afterRemovalList);
    } catch (error) {
      console.log(error);
    }
  }

  function updateUser(userToUpdate) {
    userToUpdate.isBlackListed = false;
    userToUpdate.strikeCount = 0;
    return userToUpdate;
  }

  const renderTableHeader = () => {
    // 'Mobile Number' <-- Remove to make the table more concise
    let headerElement = ['Name', 'Email', 'Mobile Number', 'Strike Count', 'Actions'];

    return headerElement.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  };

  async function handleViewUser(name, mobileNumber, email, strikeCount) {
    Router.push({
      pathname: 'user-profile',
      query: {
        name: name,
        email: email,
        mobileNumber: mobileNumber,
        strikeCount: strikeCount,
      },
    });
  }

  // Render table body
  const renderTableBody = () => {
    return (
      users &&
      users.map((user) => {
        return (
          <tr key={user.userId}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.mobileNumber}</td>
            <td>{user.strikeCount}</td>
            <td className="operation">
              {/* simple <-- took out to align with the header */}
              {/* size="lg" */}
              <Button
                value={user}
                color="info"
                startIcon={<VisibilityIcon />}
                onClick={() =>
                  handleViewUser(
                    user.name,
                    user.mobileNumber,
                    user.email,
                    user.strikeCount
                  )
                }>
                View
              </Button>

              {/* size="lg" */}
              <Button
                color="danger"
                variant="contained"
                className={classes.button}
                startIcon={<LockOpenIcon />}
                onClick={() => editBlacklistedUser(user.userId, user.name)}>
                Unban
              </Button>
              
            </td>
            {/* <td className="operation"> */}
              {/* simple <-- took out to align with the header */}
              {/* <Button
                size="lg"
                color="danger"
                variant="contained"
                className={classes.button}
                startIcon={<DeleteIcon />}
                onClick={() => editBlacklistedUser(user.userId, name)}>
                Remove
              </Button>
            </td> */}
          </tr>
        );
      })
    );
  };

  // To enable toast notifications
  toast.configure();
  const editSuccessfulAlert = (name) => {
    toast.success(`${name} has been removed from the blacklist!`, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    });
  };

  const classes = useStyles();

  const buttons = [{color: 'danger', icon: Close}].map((prop, key) => {
    return (
      <Button color={prop.color} className={classes.actionButton} key={key}>
        <prop.icon className={classes.icon} />
      </Button>
    );
  });

  return (
    <div>
      {/* Admin management panel */}
      <GridContainer justify="center">
        <GridItem xs={11} sm={11} md={11}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>
                Blacklist Management Panel
              </h4>
              <p className={classes.cardCategoryWhite}>
                List of users who have been blacklisted.
              </p>
            </CardHeader>

            <CardBody>
              {/* Custom table */}
              <table id="admin-management-table" style={{width: '70vw'}}>
                <thead align="left">
                  <tr>{renderTableHeader()}</tr>
                </thead>

                <tbody>{renderTableBody()}</tbody>
              </table>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

BlacklistManagement.layout = Admin;
export default connect(mapStateToProps)(BlacklistManagement);
