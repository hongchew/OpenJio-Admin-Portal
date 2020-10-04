import React, {useState, useEffect} from 'react';
// import {Link, useHistory} from 'react-router-dom';
import axios from 'axios';
// @material-ui/core components
import {makeStyles} from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Chip from '@material-ui/core/Chip';

// Toast alert
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Backend API services
import adminService from '../../services/adminService.js';

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
// End of styles section

function AdminManagement() {
  // Connection to backend API
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    // if (userInfo.adminId === '') {
    //   Router.push('login');
    //   return;
    // }
    retrieveAdmins();
  }, []);

  const retrieveAdmins = () => {
    adminService
      .getAllAdminAccounts()
      .then((response) => {
        setAdmins(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteAdminAccount = (adminId, name) => {
    let deleteHttpReq = `http://localhost:3000/admins/${adminId}`;

    axios.delete(deleteHttpReq).then((res) => {
      // Or retrieveAdmins after deleting
      const afterDeleteList = admins.filter(
        (admin) => adminId !== admin.adminId
      );
      setAdmins(afterDeleteList);
      deleteSuccessfulAlert(name);
      console.log('res', res);
    });
  };

  // End of connection to backend API

  // Rendering custom  table
  // Render table header
  const renderTableHeader = () => {
    let headerElement = ['Name', 'Email', 'Admin Type', 'Actions'];

    return headerElement.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  };

  // Render table body
  const renderTableBody = () => {
    return (
      admins &&
      admins.map(({adminId, name, email, adminType}) => {
        return (
          <tr key={adminId}>
            <td>{name}</td>
            <td>{email}</td>

            {/* Conditional argument according to the admin type */}
            <td>
              {adminType === 'SUPER_ADMIN' ? (
                <Chip label="Super Admin" color="secondary" />
              ) : (
                <Chip label="Admin" color="primary" />
              )}
            </td>

            <td className="opration">
              <Button
                variant="contained"
                color="danger"
                className={classes.button}
                startIcon={<DeleteIcon />}
                onClick={() => deleteAdminAccount(adminId, name)}>
                Delete
              </Button>
            </td>
          </tr>
        );
      })
    );
  };
  // End of rendering table

  // To enable toast notifications
  toast.configure();
  const deleteSuccessfulAlert = (adminName) => {
    toast.success('Successfully deleted: ' + adminName, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    });
  };

  const classes = useStyles();

  return (
    <div>
      {/* Admin management panel */}
      <GridContainer justify="center">
        <GridItem xs={11} sm={11} md={11}>
          <Card>
            <CardHeader color="primary">
              <h3
                className={classes.cardTitleWhite}
                style={{
                  display: 'inline-block',
                  float: 'left',
                  alignItems: 'center',
                }}>
                Admin Management Panel
              </h3>
              <div style={{float: 'right'}}>
                <Button
                  variant="contained"
                  color="warning"
                  size="sm"
                  className={classes.button}
                  startIcon={<PersonAddIcon />}
                  href="create-admin">
                  Create
                </Button>
              </div>
            </CardHeader>

            <CardBody>
              {/* Custom table */}
              <table id="admin-management-table" style={{width: '100%'}}>
                <thead align="left">
                  <tr>{renderTableHeader()}</tr>
                </thead>

                <tbody>{renderTableBody()}</tbody>
              </table>

              {/* Template table not intuitive */}
              {/* <Table
                tableHeaderColor="primary"
                tableHead={["Name", "Email", "Admin Type", "Actions"]}
                // Just to prevent error
                tableData={[
                  renderTableBody()
                ]}

                Placeholder data
                tableData={[
                  ["Prof. Tan Wee Kek", "tanwk@comp.nus.edu.sg", "Super Admin", buttons],
                  ["Ying Hui", "yinghuiseah@u.nus.edu", "Super Admin", buttons],
                ]}
              /> */}
              
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

AdminManagement.layout = Admin;

export default AdminManagement;
