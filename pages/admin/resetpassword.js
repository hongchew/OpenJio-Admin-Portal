import React, { useState } from "react";
import axios from 'axios'
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
// core components
import Header from "components/logincomponents/Header/Header.js";
import HeaderLinks from "components/logincomponents/Header/HeaderLinks.js";
import GridContainer from "components/logincomponents/Grid/GridContainer.js";
import GridItem from "components/logincomponents/Grid/GridItem.js";
import Button from "components/logincomponents/CustomButtons/Button.js";
import Card from "components/logincomponents/Card/Card.js";
import CardBody from "components/logincomponents/Card/CardBody.js";
import CardHeader from "components/logincomponents/Card/CardHeader.js";
import CardFooter from "components/logincomponents/Card/CardFooter.js";
import CustomInput from "components/logincomponents/CustomInput/CustomInput.js";

import styles from "assets/jss/nextjs-material-kit/pages/loginPage.js";
//import background image
import image from "assets/img/login-background.jpg";


const useStyles = makeStyles(styles);

function ResetPassword(props) {

  //state
  const [email, setEmail] = useState()

  const updateEmail = e => {
    e.preventDefault()
    const email = e.target.value
    setEmail(email)
    console.log('Input entered is' + email)
  }

  //Password reset API call
  async function handleReset() {
    try {
      const response = await axios.put('http://localhost:3000/admins/reset-password', {
        email: email
      })
      console.log('password reset successful')
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }

  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <Header
        absolute
        color="transparent"
        brand="OpenJio Admin"
        rightLinks={<HeaderLinks />}
        {...rest}
      />  
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={6} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Reset Your Password</h4>
                  </CardHeader>
                  <p className={classes.divider}>Enter your email</p>
                  <CardBody>
                    <CustomInput
                      name="email"
                      value={email}
                      onChange={updateEmail}
                      labelText="Email"
                      id="email"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "email",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button simple color="primary" size="lg" onClick={handleReset}>
                      Reset
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;