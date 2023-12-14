import React, { useState } from "react";
import { TextField, Typography, Grid, Autocomplete } from "@mui/material";
import { City, Country, State } from "country-state-city";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const FormField = ({
  label,
  name,
  value,
  onChange,
  error,
  onPhoneChange,
  countryIsoCode,
  countryStateCode,
}) => {
  // Determine the type of field based on the 'name' prop
  const isMobileField = name === "mobile";
  const isCountryField = name === "country";
  const isStateField = name === "state";
  const isCityField = name === "city";

  // Log cities of a state (Example usage of City.getCitiesOfState)
  console.log(City?.getCitiesOfState("IN", "BR"), "isCityField");

  // State for storing data related to the form field
  const [data, setData] = useState({
    countryIsoCode: "",
    stateIsoCode: "",
  });

  // Log the form field data
  console.log(data, "data");

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={12}>
        <div style={{ marginTop: 16 }}>
          {isMobileField ? (
            // Phone input for mobile numbers
            <PhoneInput
              country={"in"}
              enableSearch={true}
              value={value}
              onChange={onPhoneChange}
            />
          ) : isCountryField ? (
            // Autocomplete for country selection
            <Autocomplete
              disablePortal
              id="country-autocomplete"
              options={Country.getAllCountries().map((country) => ({
                label: country.name,
                value: country.isoCode,
              }))}
              onChange={(event, newValue) => {
                setData(newValue.value);
                console.log(newValue, "Country");
                // Update state with selected country data
                onChange(name, {
                  value: newValue ? newValue.value : "",
                  countryName: newValue ? newValue?.label : "",
                });
              }}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Country" />
              )}
            />
          ) : isStateField ? (
            // Autocomplete for state selection
            <Autocomplete
              disablePortal
              id="state-autocomplete"
              options={State?.getStatesOfCountry(countryIsoCode).map(
                (state) => ({
                  label: state?.name,
                  value: state?.isoCode,
                  countryCode: state?.countryCode,
                })
              )}
              onChange={(event, newValue) => {
                console.log(newValue, "state");
                // Update state with selected state data
                onChange(name, {
                  isoCode: newValue ? newValue.value : "No Data",
                  countryCode: newValue ? newValue.countryCode : "No Data",
                  stateName: newValue ? newValue.label : "No Data",
                });
              }}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="State" />}
            />
          ) : isCityField ? (
            // Autocomplete for city selection
            <Autocomplete
              disablePortal
              id="city-autocomplete"
              options={City?.getCitiesOfState(
                countryIsoCode,
                countryStateCode
              ).map((city) => ({
                label: city.name,
                value: city.stateCode,
              }))}
              onChange={(event, newValue) => {
                console.log(newValue, "city");
                // Update state with selected city data
                onChange(name, {
                  isoCode: newValue ? newValue.value : "",
                  cityName: newValue ? newValue.label : "",
                });
              }}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="City" />}
            />
          ) : (
            // Default text field for other types
            <TextField
              label={label}
              name={name}
              fullWidth
              value={value}
              onChange={(e) => onChange(name, e.target.value)}
            />
          )}
        </div>
        {error && (
          // Display error message if there is an error
          <Typography variant="caption" color="error" style={{ marginTop: 8 }}>
            {error}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default FormField;
