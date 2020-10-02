import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";

// Backend API services
import adminService from "../../services/adminService.js";

// layout for this page
import Admin from "layouts/Admin.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import { StayPrimaryLandscape } from "@material-ui/icons";

// Styles section
const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
};

const useStyles = makeStyles(styles);
// End of styles section

function AdminManagement() {
  // Connection to backend API
  const [admins, setAdmins] = useState([]);
  const [currentAdmin, setCurrentAdmin] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
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

  const refreshList = () => {
    retrieveTutorials();
    setCurrentTutorial(null);
    setCurrentIndex(-1);
  };

  const setActiveAdmin = (admin, index) => {
    setCurrentAdmin(admin);
    setCurrentIndex(index);
  };

  const deleteAdminAccount = (adminId) => {

    let deleteHttpReq = `http://localhost:3000/admins/${adminId}`

    axios.delete(deleteHttpReq).then(res => {

        // Or retrieveAdmins after deleting
        const afterDeleteList = admins.filter(admin => adminId !== admin.adminId);
        setAdmins(afterDeleteList);
        console.log('res', res);
    })
}

  // End of connection to backend API

  // Rendering custom  table
  // Render table header
  const renderTableHeader = () => {
    let headerElement = ["Name", "Email", "Admin Type", "Actions"];

    return headerElement.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  };

  // Render table body
  const renderTableBody = () => {
    return (
      admins &&
      admins.map(({ adminId, name, email, adminType }) => {
        return (
          <tr key={adminId}>
            <td>{name}</td>
            <td>{email}</td>
            <td>{adminType}</td>
            <td className="opration">
              <Button
                variant="contained"
                color="danger"
                className={classes.button}
                startIcon={<DeleteIcon />}
                onClick={() => deleteAdminAccount(adminId)}
              >
                Delete
              </Button>
            </td>
          </tr>
        );
      })
    );
  };
  // End of rendering table

  const classes = useStyles();

  const buttons = [
    // Remove edit button
    // { color: "success", icon: Edit },
    { color: "danger", icon: Close },
  ].map((prop, key) => {
    return (
      <Button color={prop.color} className={classes.actionButton} key={key}>
        <prop.icon className={classes.icon} />
      </Button>
    );
  });

  return (
    <div>
      {/* Admin management panel */}
      <GridContainer>
        <GridItem xs={11} sm={11} md={11}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Admin Management Panel</h4>
              <p className={classes.cardCategoryWhite}>
                {/* Can include subtitle here  */}
              </p>
            </CardHeader>

            {/* Table card body */}
            <CardBody>

              <table id="admin-management-table" style={{width: '70vw'}}>

                <thead align="left">
                  <tr>{renderTableHeader()}</tr>
                </thead>

                <tbody>
                  {renderTableBody()}
                </tbody>

              </table>

              {/* Custom Table Not Intuitive */}
              {/* <Table
                tableHeaderColor="primary"
                tableHead={["Name", "Email", "Admin Type", "Actions"]}
                // Just to prevent error
                tableData={[
                  renderTableBody()
                ]}

                // --- UI problem so ignore this section below ---
                // tableData={[
                //   admins &&
                //     admins.map(
                //       (admin) => (
                //         [{admin.name}], [admin.email], [admin.adminType]
                //         <tr key = {admin.adminId}>
                //          <td> {admin.name}, {admin.email} </td>
                //          <td> {admin.email}, </td>
                //          <td> {admin.adminType}</td>
                //         </tr>
                //       )
                //     ),
                // ]}

                // Placeholder data
                // tableData={[
                //   ["Prof. Tan Wee Kek", "tanwk@comp.nus.edu.sg", "Super Admin", buttons],
                //   ["Ying Hui", "yinghuiseah@u.nus.edu", "Super Admin", buttons],
                // ]}
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