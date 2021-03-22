import React, { useState, useEffect } from "react";
import { Button, Grid, Typography } from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import { Link } from "react-router-dom";

import CustomTextField from "./CustomTextField";
import CustomSelectField from "./CustomSelectField";

import { commerce } from "../../lib/commerce";

export default function AddressForm({ checkoutToken, next }) {
  const methods = useForm();
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");

  //Fetch Shipping countries from commerce js
  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    );

    const countriesArr = Object.keys(countries).map((key) => ({
      id: key,
      label: countries[key],
    }));

    setShippingCountries(countriesArr);
    // setShippingCountry(countriesArr[0]);
  };

  //Fetch Shipping subdivisions of country from commerce js
  const fetchSubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    );
    const subdivisionsArr = Object.keys(subdivisions).map((key) => ({
      id: key,
      label: subdivisions[key],
    }));
    setShippingSubdivisions(subdivisionsArr);
  };

  //Fetch Shipping option for a give country from commerce js
  const fetchShippingOptions = async (
    checkoutTokenId,
    country,
    region = null
  ) => {
    const sOptions = await commerce.checkout.getShippingOptions(
      checkoutTokenId,
      { country, region }
    );
    const options = sOptions.map((sOption) => ({
      id: sOption.id,
      label: `${sOption.description} - (${sOption.price.formatted_with_symbol})`,
    }));
    setShippingOptions(options);
    setShippingOption(options[0].id);
  };

  useEffect(() => {
    if (checkoutToken) fetchShippingCountries(checkoutToken.id);
    // fetchShippingCountries(checkoutToken.id);
  }, [checkoutToken]);

  useEffect(() => {
    if (shippingCountry) fetchSubdivisions(shippingCountry);
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingSubdivision)
      fetchShippingOptions(
        checkoutToken.id,
        shippingCountry,
        shippingSubdivision
      );
  }, [shippingSubdivision]);

  const onFormSubmit = (formData) => {
    next({ ...formData, shippingCountry, shippingSubdivision, shippingOption });
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping Address
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((data) => onFormSubmit(data))}>
          <Grid container spacing={3}>
            <CustomTextField name="firstName" label="First Name" />
            <CustomTextField name="lastName" label="Last Name" />
            <CustomTextField name="address1" label="Address" />
            <CustomTextField name="email" label="Email" />
            <CustomTextField name="city" label="City" />
            <CustomTextField name="postalCode" label="Postal Code" />

            <CustomSelectField
              inputLabel="Shipping Country"
              name="shippingCountry"
              option={shippingCountry}
              options={shippingCountries}
              setOptions={setShippingCountry}
            />
            {methods.errors.shippingCountry && <p>Please fill</p>}
            <CustomSelectField
              inputLabel="Shipping Subdivisions"
              name="shippingSubdivision"
              option={shippingSubdivision}
              options={shippingSubdivisions}
              setOptions={setShippingSubdivision}
            />

            <CustomSelectField
              inputLabel="Shipping Options"
              name="shippingOption"
              option={shippingOption}
              options={shippingOptions}
              setOptions={setShippingOption}
            />
          </Grid>
          <br />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button component={Link} to="/cart" variant="outlined">
              Back to Cart
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Next
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
