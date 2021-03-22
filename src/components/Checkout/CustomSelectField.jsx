import React from "react";

import { Grid, Select, InputLabel, MenuItem } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";

export default function CustomSelectField({
  inputLabel,
  name,
  option,
  options,
  setOptions,
}) {
  const { control } = useForm();

  return (
    <Grid item xs={12} sm={6}>
      <InputLabel>{inputLabel}</InputLabel>
      <Controller
        control={control}
        name={name}
        defaultValue={option}
        rules={{ required: true }}
        // render={({ onChange, onBlur, value }) => (
        render={(props) => (
          <Select
            value={option}
            fullWidth
            onChange={(e) => setOptions(e.target.value)}
          >
            {options.map((country) => (
              <MenuItem key={country.id} value={country.id}>
                {country.label}
              </MenuItem>
            ))}
          </Select>
        )}
      />
    </Grid>
  );
}

/* <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <Select
                value={shippingCountry}
                fullWidth
                onChange={(e) => setShippingCountry(e.target.value)}
              >
                {shippingCountries.map((country) => (
                  <MenuItem key={country.id} value={country.id}>
                    {country.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid> */
