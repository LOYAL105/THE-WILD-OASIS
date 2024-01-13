import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  styled,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteCabin, getCabins } from "../../services/apiCabins";
import { formatCurrency } from "../../utils/helpers";
import toast from "react-hot-toast";
import CreateCabinForm from "./CreateCabinForm";
import { useState } from "react";
const CabinImg = styled("img")({
  display: "block",
  width: "6.4rem",
});

function CabinTable() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };
  const [selectedData, setSelectedData] = useState(null);

  const { isLoading, data: cabins } = useQuery({
    queryKey: ["cabin"],
    queryFn: getCabins,
  });

  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: (id) => deleteCabin(id),
    onSuccess: () => {
      toast.success("Cabin successfully deleted");
      queryClient.invalidateQueries({ queryKey: ["cabin"] });
    },
    onError: (err) => toast.error(err.message),
  });

  const handleEdit = (cabin) => {
    setSelectedData(cabin);
    setOpen(true);
  };

  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <TableContainer sx={{ width: "70%", margin: "auto" }} component={Paper}>
          <Table sx={{ minWidth: 450 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell align="left">Cabin</TableCell>
                <TableCell align="left">Capacity</TableCell>
                <TableCell align="left">Price</TableCell>
                <TableCell align="left">Discount</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            {cabins.map((cabin) => (
              <>
                <TableRow
                  key={cabin.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <CabinImg src={cabin.image} />
                  </TableCell>
                  <TableCell>{cabin.name}</TableCell>
                  <TableCell>{cabin.maxCapacity}</TableCell>
                  <TableCell>{formatCurrency(cabin.regularPrice)}</TableCell>
                  <TableCell>{formatCurrency(cabin.discount)}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleEdit(cabin)}
                      variant="contained"
                      color="warning"
                      disabled={isDeleting}
                      sx={{ mr: 1 }}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => mutate(cabin.id)}
                      variant="outlined"
                      color="error"
                      disabled={isDeleting}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              </>
            ))}
          </Table>
        </TableContainer>
      )}
      {selectedData && (
        <CreateCabinForm
          open={open}
          handleOpen={handleOpen}
          handleClose={handleClose}
          cabinToEdit={selectedData}
        />
      )}
    </>
  );
}

export default CabinTable;
