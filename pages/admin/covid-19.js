import React, {useState, useEffect} from 'react';
import Link from 'next/link';
// @material-ui/core components
import {makeStyles} from '@material-ui/core/styles';
import VisibilityIcon from '@material-ui/icons/Visibility';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Chip from '@material-ui/core/Chip';
import axios from 'axios';

import 'react-toastify/dist/ReactToastify.css';

// Backend API services
import covidUserService from '../../services/covidUserService.js';

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
import {method} from 'lodash';

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
// End of styles section

function Covid19() {
  // Connection to backend API
  const [covidUsers, setCovidUsers] = useState([]);

  useEffect(() => {
    retrieveCovidUsers();
  }, []);

  const retrieveCovidUsers = () => {
    covidUserService
      .getAllCovidUserAccounts()
      .then((response) => {
        setCovidUsers(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // Direct to individual case (dynamically created)
  // const viewSpecificCase = async (userId) => {

  //   let viewUserDetailsHttpReq = `http://localhost:3000/users/${userId}`;

  //   try {
  //     let user = await axios.get(viewUserDetailsHttpReq);
  //   } catch (e) {
  //     console.error(e);
  //   }

  //   return null;
  // };

  // End of connection to backend API

  // Rendering custom  table
  // Render table header
  const renderTableHeader = () => {
    let headerElement = ['Name', 'Email', 'Reported on', 'Actions'];

    return headerElement.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  };

  // Render table body
  const renderTableBody = () => {
    return (
      covidUsers &&
      covidUsers.map(({userId, name, email, updatedAt}) => {
        return (
          <tr key={userId}>
            <td>{name}</td>
            <td>{email}</td>
            <td>
              <Chip
                label={new Date(updatedAt).toLocaleDateString('en-GB')}
                color="primary"
              />
            </td>

            <td className="operation">
              <Button
                variant="contained"
                color="success"
                className={classes.button}
                startIcon={<VisibilityIcon />}>View
              </Button>
            </td>
          </tr>
        );
      })
    );
  };
  // End of rendering table

  const classes = useStyles();

  return (
    <div>
      {/* Covid-19 management panel */}
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
                Covid-19 Management Panel
              </h4>
              {/* <p className={classes.cardCategoryWhite}>
                Can include subtitle here 
              </p> */}
            </CardHeader>

            <CardBody>
              {/* Custom table */}
              <table id="covid-19-management-table" style={{width: '100%'}}>
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

Covid19.layout = Admin;

export default Covid19;
