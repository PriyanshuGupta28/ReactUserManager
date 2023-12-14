import React from "react";
import { TextField, Typography, Grid, Autocomplete } from "@mui/material";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { City, Country, State } from "country-state-city";

// FormDialogField component for rendering form fields with different types
const FormDialogField = ({
  label,
  name,
  value,
  onChange,
  error,
  onPhoneChange,
  countryIsoCode,
  countryStateCode,
}) => {
  // Check the type of field based on the 'name' prop
  const isMobileField = name === "mobile";
  const isCountryField = name === "country";
  const isStateField = name === "state";
  const isCityField = name === "city";

  console.log(value, "value");

  // Handle country change in Autocomplete
  const handleCountryChange = (newValue) => {
    // When country changes, reset state and city
    onChange(name, {
      value: newValue ? newValue.value : "",
      countryName: newValue ? newValue.label : "",
    });
  };

  // Handle state change in Autocomplete
  const handleStateChange = (newValue) => {
    // When state changes, reset city
    onChange(name, {
      isoCode: newValue ? newValue.value : "",
      countryCode: newValue ? newValue.countryCode : "",
      stateName: newValue ? newValue.label : "",
    });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={12}>
        <div style={{ marginTop: 16 }}>
          {isCountryField ? (
            // Autocomplete for country selection
            <Autocomplete
              disablePortal
              id="country-autocomplete"
              options={[
                value?.countryName,
                ...Country.getAllCountries().map((country) => ({
                  label: country.name,
                  value: country.isoCode,
                })),
              ]}
              value={value?.countryName}
              onChange={(event, newValue) => handleCountryChange(newValue)}
              renderInput={(params) => (
                <TextField {...params} label={label} fullWidth />
              )}
            />
          ) : isStateField ? (
            // Autocomplete for state selection
            <Autocomplete
              disablePortal
              id="state-autocomplete"
              options={[
                value?.stateName,
                ...State.getStatesOfCountry(countryIsoCode).map((state) => ({
                  label: state?.name,
                  value: state?.isoCode,
                  countryCode: state?.countryCode,
                })),
              ]}
              value={value?.stateName}
              onChange={(event, newValue) => handleStateChange(newValue)}
              renderInput={(params) => (
                <TextField {...params} label={label} fullWidth />
              )}
            />
          ) : isCityField ? (
            // Autocomplete for city selection
            <Autocomplete
              disablePortal
              id="city-autocomplete"
              options={[
                value?.cityName,
                ...City.getCitiesOfState(countryIsoCode, countryStateCode).map(
                  (city) => ({
                    label: city.name,
                    value: city.stateCode,
                  })
                ),
              ]}
              value={value?.cityName}
              onChange={(event, newValue) =>
                onChange(name, {
                  isoCode: newValue ? newValue.value : "",
                  cityName: newValue ? newValue.label : "",
                })
              }
              renderInput={(params) => (
                <TextField {...params} label={label} fullWidth />
              )}
            />
          ) : isMobileField ? (
            // Phone input for mobile number
            <PhoneInput
              country={"in"}
              enableSearch={true}
              value={value}
              onChange={onPhoneChange}
              inputStyle={{ width: "100%" }}
            />
          ) : (
            // Default text field for other types
            <TextField
              fullWidth
              label={label}
              value={value}
              onChange={(e) => onChange(name, e.target.value)}
            />
          )}
        </div>
      </Grid>

      {error && (
        // Display error message if there is an error
        <Grid item xs={12}>
          <Typography variant="caption" color="error" style={{ marginTop: 8 }}>
            {error}
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default FormDialogField;
