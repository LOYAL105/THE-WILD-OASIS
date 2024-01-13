import { Box, Button } from "@mui/material";
import CabinTable from "../features/cabins/CabinTable";
import { useState } from "react";
import CreateCabinForm from "../features/cabins/CreateCabinForm";

function Cabins() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <CabinTable />
      <Button
        sx={{ mt: 5, ml: 20 }}
        variant="contained"
        onClick={() => setOpen(true)}
      >
        Add new cabin
      </Button>
      <CreateCabinForm
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
      />
    </Box>
  );
}

export default Cabins;
