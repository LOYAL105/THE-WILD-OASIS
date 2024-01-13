import {
  Backdrop,
  Box,
  Button,
  Fade,
  FormLabel,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  maxHeight: "80vh",
  overflowY: "auto",
};

const closeIconStyle = {
  cursor: "pointer",
};

const textFieldStyle = {
  "& .MuiInputBase-root": {
    height: "40px",
    width: "100%",
  },
};

const gridStyle = {
  marginTop: "10px",
};

export default function CreateCabinForm({
  open,
  handleOpen,
  handleClose,
  cabinToEdit = {},
}) {
  const { id: editId, ...editValues } = cabinToEdit;
  console.log(editValues);
  const isEditSession = Boolean(editId);
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("New cabin successfully created");
      queryClient.invalidateQueries({ queryKey: ["cabin"] });
      reset();
      handleClose();
    },
    onError: (err) => toast.error(err.message),
  });

  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("Cabin successfully edited");
      queryClient.invalidateQueries({ queryKey: ["cabin"] });
      reset();
      handleClose();
    },
    onError: (err) => toast.error(err.message),
  });

  const isWorking = isCreating || isEditing;

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file.name);
      // You can also store the file object in state if needed: setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }
  };

  const onSubmit = (data) => {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    //console.log(data);
    if (isEditSession)
      editCabin({ newCabinData: { ...data, image }, id: editId });
    else createCabin({ ...data, image: image });
  };
  const onError = (errors) => {
    console.log(errors);
  };
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
          sx: { backdropFilter: "blur(8px)" },
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <div></div>
            <CloseOutlinedIcon sx={closeIconStyle} onClick={handleClose} />
          </Box>
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            <FormRow label="Cabin Name" error={errors?.name?.message}>
              <TextField
                id="name"
                variant="outlined"
                sx={textFieldStyle}
                disabled={isWorking}
                fullWidth
                {...register("name", {
                  required: "name is required",
                })}
              />
            </FormRow>
            <FormRow
              label="Maximum Capacity"
              error={errors?.maxCapacity?.message}
            >
              <TextField
                type="number"
                id="maxCapacity"
                variant="outlined"
                disabled={isWorking}
                sx={textFieldStyle}
                fullWidth
                {...register("maxCapacity", {
                  required: "Maximum Capacity is required",
                  min: {
                    value: 1,
                    message: "Capacity should be atleast 1",
                  },
                })}
              />
            </FormRow>
            <FormRow
              label="Regular Price"
              error={errors?.regularPrice?.message}
            >
              <TextField
                type="number"
                id="regularPrice"
                variant="outlined"
                disabled={isWorking}
                sx={textFieldStyle}
                fullWidth
                {...register("regularPrice", {
                  required: "Regular Price is required",
                  min: {
                    value: 1,
                    message: "Capacity should be atleast 1",
                  },
                })}
              />
            </FormRow>

            <FormRow label="Discount" error={errors?.discount?.message}>
              <TextField
                type="number"
                id="discount"
                variant="outlined"
                disabled={isWorking}
                sx={textFieldStyle}
                fullWidth
                defaultValue={0}
                {...register("discount", {
                  required: "Discount is required",
                  validate: (value) =>
                    value <= getValues().regularPrice ||
                    "Discount should be less than regualar price",
                })}
              />
            </FormRow>

            <FormRow
              label="Description for website"
              error={errors?.description?.message}
            >
              <TextField
                type="number"
                id="description"
                disabled={isWorking}
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                {...register("description", {
                  required: "description is required",
                })}
              />
            </FormRow>

            <FormRow label="Choose Photo">
              <Button variant="contained" component="label">
                Upload File
                <input
                  id="inage"
                  type="file"
                  hidden
                  onChange={handleFileChange}
                  {...register("image", {
                    required: isEditSession ? false : "image is required",
                  })}
                />
              </Button>
              {selectedFile && (
                <Typography sx={{ ml: 2 }} variant="span">
                  {selectedFile}
                </Typography>
              )}
            </FormRow>

            <Grid sx={gridStyle} container spacing={2}>
              <Grid item xs={4}></Grid>
              <Grid
                item
                xs={8}
                sx={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Button type="reset" variant="outlined" sx={{ marginRight: 1 }}>
                  Cancel
                </Button>
                <Button disabled={isCreating} type="submit" variant="contained">
                  {isEditSession ? "Edit a Cabin" : "Add a new cabin"}
                </Button>
              </Grid>
              <Grid item></Grid>
            </Grid>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
}
