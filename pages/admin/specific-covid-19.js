import React from 'react';
// @material-ui/core components
import {makeStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import axios from 'axios';
// layout for this page
import Admin from 'layouts/Admin.js';

// core components
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import CustomInput from 'components/CustomInput/CustomInput.js';
import Button from 'components/CustomButtons/Button.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardAvatar from 'components/Card/CardAvatar.js';
import CardBody from 'components/Card/CardBody.js';
import CardFooter from 'components/Card/CardFooter.js';
import Primary from 'components/Typography/Primary.js';

import CeoAvatar from 'assets/img/faces/tanwk.png';

const styles = {
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
};

const useStyles = makeStyles(styles);

function SpecificCovidCase(props) {
  const classes = useStyles();

  const urlPath = window.location.search;
  console.log('pathname user id is: ' + urlPath);
  // printed: ?userId=09c4a8d1-bef4-41c4-88fa-87fca7e321c0

  let userId = urlPath.split('?')[1]; // removed ?
  console.log('pathname user id is: ' + userId);
  // printed: userId=09c4a8d1-bef4-41c4-88fa-87fca7e321c0

  userId = userId.substring(7);
  console.log('pathname user id is: ' + userId);
  // printed: 09c4a8d1-bef4-41c4-88fa-87fca7e321c0

  // Direct to individual case (dynamically created)
  const retrieveSpecificCase = async (userId) => {
    let retrieveUserDetailsHttpReq = `http://localhost:3000/users/${userId}`;
    try {
      let user = await axios.get(retrieveUserDetailsHttpReq);
      console.log('testing1: ' + user.name);
      this.setState({user: user});
      return user;
    } catch (e) {
      console.error(e);
    }
  };

  // Comment out
  //   const renderSpecificCovidUi = (userId) => {
  //     let user = retrieveSpecificCase(userId);
  //     console.log("testing2: " + user);
  //     // return (
  //     //   user &&
  //     //   user.map(({userId, name, email, address}) => {
  //     //     return (
  //     //       <tr key={userId}>
  //     //         <td>{name}</td>
  //     //         <td>{email}</td>
  //     //         <td>{address}</td>
  //     //       </tr>
  //     //     );
  //     //   })
  //     // );
  //   };

  return (
    <div>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={(e) => e.preventDefault()}>
                <img src={CeoAvatar} alt="..." />
              </a>
            </CardAvatar>

            <CardBody profile>
              <strong className={classes.cardTitle}>{this.state.user.name}</strong>
              <Primary className={classes.cardTitle}>
                <b>{this.state.user.email}</b>
              </Primary>
              {/* <br></br>
              <strong>Description:</strong>
              <p className={classes.description}>
                I hope that everyone will play their part to fight the COVID-19
                pandemic.
              </p> */}
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

SpecificCovidCase.layout = Admin;

export default SpecificCovidCase;
