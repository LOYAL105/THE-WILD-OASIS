import { FormLabel, Grid, TextField, Typography } from "@mui/material";
const textFieldStyle = {
  "& .MuiInputBase-root": {
    height: "40px",
    width: "100%",
  },
};
const labelStyle = {
  marginRight: "20px",
};

const errorMsgStyle = {
  color: "red",
};
const gridStyle = {
    marginTop: "10px",
  };

function FormRow({ label, error, children }) {
  return (
    <Grid sx={label!=='Cabin Name'?gridStyle:''} container spacing={3}>
      <Grid item xs={4}>
              <FormLabel sx={labelStyle}>{ label}</FormLabel>
      </Grid>
      <Grid item xs={4}>
        {children}
      </Grid>
      <Grid item xs={4}>
        {error && (
          <Typography sx={errorMsgStyle} variant="span">
            {error}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
}

export default FormRow;
