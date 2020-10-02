import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
// import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import Chip from '@material-ui/core/Chip';

// Toast alert
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
import { updateAsExpression } from "typescript";

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

function BlacklistManagement() {
  // Connection to backend API
  const [users, setUsers] = useState([]);

  //Retrieve all users when page first renders
  useEffect(() => {
    retrieveUsers()
    console.log(users)
  }, []);

  const retrieveUsers = async () => {
    try {
        const response = await axios.get('http://localhost:3000/users/')
        const body = response.data
        //Get only blacklisted users
        const blacklisted = body.filter(function(user) {
            return user.isBlackListed === true
        }) 
        setUsers(blacklisted)
      } catch (error) {
        console.error(error);
      }
  }

  const editUserBlacklist = (userId, name) => {
    let deleteHttpReq = `http://localhost:3000/users/${userId}`;

    axios.put(deleteHttpReq).then(() => {
      // Or retrieveAdmins after deleting
      const afterEditList = users.filter(
        (user) => userId !== user.userId
      );
      setUsers(afterEditList);
      editSuccessfulAlert(name);
      console.log(users);
    });
  };
  const renderTableHeader = () => {
    let headerElement = ["Name", "Email", "Mobile Number", "Strike Count"];

    return headerElement.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  };

  // Render table body
  const renderTableBody = () => {
    return (
      users &&
      users.map(({ userId, name, email, mobileNumber, strikeCount }) => {
        return (
          <tr key={userId}>
            <td>{name}</td>
            <td>{email}</td>
            <td>{mobileNumber}</td>
            <td>{strikeCount}</td>

            <td className="operation">
              <Button
                variant="contained"
                color="danger"
                className={classes.button}
                startIcon={<DeleteIcon />}
                onClick={() => editUserBlacklist(userId, name)}
              >
                Remove
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
  const editSuccessfulAlert = (userName) => {
    toast.success("Successfully deleted: " + userName, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    });
  };

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
              <h4 className={classes.cardTitleWhite}>Blacklist Management Panel</h4>
              <p className={classes.cardCategoryWhite}>
                List of users who have been blacklisted.
              </p>
            </CardHeader>

            <CardBody>
              {/* Custom table */}
              <table id="admin-management-table" style={{ width: "70vw" }}>
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

BlacklistManagement.layout = Admin;

export default BlacklistManagement;
