import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Primary from "components/Typography/Primary.js";

import Link from "next/link";

import CeoAvatar from "assets/img/faces/tanwk.png";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};

const useStyles = makeStyles(styles);

function ChangePassword() {
  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Change password</h4>
              <p className={classes.cardCategoryWhite}>Enter your new password</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                {/* Current password */}
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Enter your current password"
                    id="current-password"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
              </GridContainer>

              {/* New password */}
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Enter your new password"
                    id="new-password"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "password",
                      endAdornment: (
                        <InputAdornment position="end">
                          {/* <LockIcon className={classes.inputIconsColor}/> */}
                        </InputAdornment>
                      ),
                      autoComplete: "off"
                    }}
                  />
                </GridItem>
              </GridContainer>
              
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Re-enter your new password"
                    id="new-password"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>

            <CardFooter>
              <Button color="primary">Update Password</Button>
            </CardFooter>

          </Card>

        </GridItem>

        <GridItem xs={12} sm={12} md={4}>
          
          <Card profile>

            <CardAvatar profile>
              <a href="#pablo" onClick={(e) => e.preventDefault()}>
                <img src={CeoAvatar} alt="..." />
              </a>
            </CardAvatar>

            <CardBody profile>
              <h6 className={classes.cardCategory}>CEO / CO-FOUNDER</h6>
              <h4 className={classes.cardTitle}>Prof. Tan Wee Kek</h4>
              <Primary className={classes.cardTitle}><b>Super Admin</b></Primary>
              <br></br>

              <strong>Description:</strong>
              <p className={classes.description}>
                I hope that everyone will play their part to fight the COVID-19
                pandemic.
              </p>

              {/* // Old description
              <p className={classes.description}>
                Don{"'"}t be scared of the truth
              </p> */}

              {/* // Random button for navigation next time perhaps?
              <Button color="primary" round>
                Follow
              </Button> */}
            </CardBody>

          </Card>

        </GridItem>
      </GridContainer>

    </div>
  );
}

ChangePassword.layout = Admin;

export default ChangePassword;
