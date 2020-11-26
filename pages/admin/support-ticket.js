import React, {useState, useEffect} from 'react';
// @material-ui/core components
import {makeStyles, ThemeProvider} from '@material-ui/core/styles'; // layout for this page
import Admin from 'layouts/Admin.js';

//redux app state management
import {connect} from 'react-redux';
import {setInfo} from '../../redux/action/main';
// core components
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import CardFooter from 'components/Card/CardFooter.js';
import Button from 'components/CustomButtons/Button.js';
import Router from 'next/router';
import Typography from '@material-ui/core/Typography';
import {createMuiTheme, responsiveFontSizes} from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import axios from 'axios';

// To generate PDF Document
// import Pdf from 'react-to-pdf';

const mapDispatchToProps = {
  setInfo: setInfo,
};

const mapStateToProps = (state) => ({
  userInfo: state.main,
});

let theme = createMuiTheme({
  spacing: 5,
  typography: {
    h5: {
      color: '#808080',
      fontWeight: 500,
      fontSize: 18,
    },
    subtitle1: {
      fontSize: 16,
      fontWeight: 500,
      fontStyle: 'regular',
    },
  },
});
theme = responsiveFontSizes(theme);

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
  cardProfile: {
    justifyContent: 'center',
    margin: theme.spacing(3.5, 1, 3.5, 1),
  },
  boxJustify: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxJustifyWithoutFlex:{
    justifyContent: 'center',
    alignItems: 'center',
  },
  chipStyle: {
    padding: theme.spacing(2),
    margin: theme.spacing(1),
  },
  cardStyle: {
    width: '100%',
    padding: 0,
    paddingLeft: 100,
    paddingRight: 100,
    backgroundColor: '#F8F8F8',
  },
};

const useStyles = makeStyles(styles);

function SupportTicket(props) {

  const {userInfo} = props;

  const [supportTicket, setSupportTicket] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    if (userInfo.adminId === '') {
      Router.push('login');
      return;
    }
    retrieveSupportTicket();
  }, []);

  const retrieveSupportTicket = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/supportTickets/ticket-info/${Router.query.supportTicketId}`
      );
      const body = response.data;
      setSupportTicket(body);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="info">
                <h4
                  className={classes.cardTitleWhite}
                  style={{textAlign: 'center'}}>
                  Support Ticket
                </h4>
              </CardHeader>

              <CardBody>
                {supportTicket.title}
              </CardBody>
              
            </Card>
          </GridItem>
        </GridContainer>
    </div>
  );
}

SupportTicket.layout = Admin;

export default connect(mapStateToProps, mapDispatchToProps)(SupportTicket);
