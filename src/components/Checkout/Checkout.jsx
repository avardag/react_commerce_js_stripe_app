import React, { useState, useEffect } from "react";
import {
  CssBaseline,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CircularProgress,
  Divider,
  Button,
} from "@material-ui/core";
// import { Link, useHistory } from 'react-router-dom';
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";

import useStyles from "./Checkout.styles";

const steps = ["Shipping Address", "Payment Details"];

export default function Checkout() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);

  const Form = () => (activeStep === 0 ? <AddressForm /> : <PaymentForm />);

  const Confirmation = () => <div>Confirmation</div>;
  return (
    <>
      <div className={classes.toolbar} />
      <main>
        <Paper className={classes.layout}>
          <Typography variant="h4" align="center">
            Checkout
          </Typography>

          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? <Confirmation /> : <Form />}
        </Paper>
      </main>
    </>
  );
}
