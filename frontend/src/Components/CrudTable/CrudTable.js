import React, { useEffect, useState } from "react";
import "react-phone-input-2/lib/style.css";
import { useDispatch, useSelector } from "react-redux";
import {
  // Material-UI components
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Container,
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

// Material-UI Icons
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

// Axios for making HTTP requests
import axios from "axios";

// Custom FormField components
import FormField from "../FormField/FormField";
import FormDialogField from "../FormDialogField/FormDialogField";
import {
  addUser,
  deleteUser,
  fetchUsers,
  setApiMessage,
  updateUser,
} from "../../Actions/HomeActions/HomeActions";

// API base URL
const baseUrl = "https://reactusermanagment.onrender.com/api/users/";

// Fields to render in the table
const fieldsToRender = [
  "firstName",
  "lastName",
  "email",
  "mobile",
  "address1",
  "address2",
  "country",
  "state",
  "city",
  "zipCode",
];

const CrudTable = () => {
  // State for phone input
  const [phone, setPhone] = useState("");

  // State for managing user data
  const [data, setData] = useState([]);

  // State for editing an item
  const [editItemId, setEditItemId] = useState(null);

  // State for controlling Edit Dialog visibility
  const [openEditDialog, setOpenEditDialog] = useState(false);

  // State for controlling Add Dialog visibility
  const [openAddDialog, setOpenAddDialog] = useState(false);

  // State for validation errors in Add form
  const [validationErrorsAdd, setValidationErrorsAdd] = useState({});

  // State for validation errors in Edit form
  const [validationErrorsEdit, setValidationErrorsEdit] = useState({});

  // State for form inputs in the Add form
  const [newItemAdd, setNewItemAdd] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    address1: "",
    address2: "",
    country: "",
    state: "",
    city: "",
    zipCode: "",
  });

  // State for form inputs in the Edit form
  const [newItemEdit, setNewItemEdit] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    address1: "",
    address2: "",
    country: "",
    state: "",
    city: "",
    zipCode: "",
  });

  const dispatch = useDispatch();
  const users = useSelector((state) => state.Home?.userData);
  const usersss = useSelector((state) => state.Home);
  const loading = useSelector((state) => state.Home?.loading);
  const error = useSelector((state) => state.Home?.error);
  const apiMessage = useSelector((state) => state.Home.apiMessage);
  console.log(apiMessage, "users");

  // Function to handle changes in the phone input
  const handlePhone = (phone) => {
    console.log(`+${phone}`);
    setNewItemEdit({ ...newItemEdit, mobile: `+${phone}` });
    setNewItemAdd({ ...newItemAdd, mobile: `+${phone}` });
    setPhone(`+${phone}`);
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Fetch data from the API
  const fetchData = async () => {
    try {
      const response = await axios.get(baseUrl);
      console.log(response?.data);
      setData(response?.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    dispatch(fetchUsers(baseUrl));
  }, [dispatch]);

  // Validation function for email
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validation function for mobile number
  const isValidMobile = (mobile) => {
    return mobile && mobile.length > 0; // Placeholder return, replace with actual validation
  };

  // Validation function for zip code
  const isValidZipCode = (zipCode) => {
    return /^\d+$/.test(zipCode); // Placeholder return, allows only digits
  };

  // Function to add a new item with validation
  const handleAdd = async () => {
    // Validation checks
    const errors = {};
    if (newItemAdd.firstName.trim() === "" || newItemAdd.firstName.length < 5) {
      errors.firstName =
        "First Name is required and must be at least 5 characters.";
    }
    if (newItemAdd.lastName.trim() === "" || newItemAdd.lastName.length < 5) {
      errors.lastName =
        "Last Name is required and must be at least 5 characters.";
    }
    if (!isValidEmail(newItemAdd.email)) {
      errors.email = "Invalid email address.";
    }
    if (!isValidMobile(phone)) {
      errors.mobile = "Invalid mobile number.";
    }
    if (newItemAdd.address1.trim() === "") {
      errors.address1 = "Address 1 is required.";
    }
    if (!isValidZipCode(newItemAdd.zipCode)) {
      errors.zipCode = "Invalid zip code.";
    }

    // Display errors in the UI
    setValidationErrorsAdd(errors);

    // If there are validation errors, do not proceed with adding the new item
    if (Object.keys(errors).length > 0) {
      return;
    }

    // Continue with adding the new item
    dispatch(addUser(baseUrl, newItemAdd));

    // Reset form fields and validation errors after successful addition
    setNewItemAdd({
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      address1: "",
      address2: "",
      country: "",
      state: "",
      city: "",
      zipCode: "",
    });
    setValidationErrorsAdd({});
    setOpenAddDialog(false);
  };

  // Function to edit an item
  const handleEdit = (id) => {
    console.log(id, "handleEdit");
    const selectedItem = data.find((item) => item._id === id);
    setNewItemEdit(selectedItem);
    setEditItemId(id);
    setOpenEditDialog(true);
  };

  // Function to update an item with validation
  const handleUpdate = async (id) => {
    // Validation checks
    const errors = {};
    if (
      newItemEdit.firstName.trim() === "" ||
      newItemEdit.firstName.length < 5
    ) {
      errors.firstName =
        "First Name is required and must be at least 5 characters.";
    }
    if (newItemEdit.lastName.trim() === "" || newItemEdit.lastName.length < 5) {
      errors.lastName =
        "Last Name is required and must be at least 5 characters.";
    }
    if (!isValidEmail(newItemEdit.email)) {
      errors.email = "Invalid email address.";
    }
    if (!isValidMobile(newItemEdit.mobile)) {
      errors.mobile = "Invalid mobile number.";
    }
    if (newItemEdit.address1.trim() === "") {
      errors.address1 = "Address 1 is required.";
    }
    if (!isValidZipCode(newItemEdit.zipCode)) {
      errors.zipCode = "Invalid zip code.";
    }

    // Display errors in the UI
    setValidationErrorsEdit(errors);

    // If there are validation errors, do not proceed with updating the item
    if (Object.keys(errors).length > 0) {
      return;
    }

    // Continue with updating the item
    try {
      dispatch(updateUser(baseUrl, id, newItemEdit));
      setOpenEditDialog(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }

    // Reset validation errors after successful update
    setValidationErrorsEdit({});
  };

  // Function to delete an item
  const handleDelete = async (id) => {
    try {
      dispatch(deleteUser(baseUrl, id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Function to handle changes in the Add form
  const handleChangeAdd = (name, value) => {
    setNewItemAdd((prevNewItemAdd) => ({
      ...prevNewItemAdd,
      [name]: value,
    }));
  };

  // Function to handle changes in the Edit form
  const handleChangeEdit = (name, value) => {
    setNewItemEdit((prevNewItemEdit) => ({
      ...prevNewItemEdit,
      [name]: value,
    }));
  };

  return (
    <>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              React User Manager
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    {fieldsToRender.map((fieldName) => (
                      <TableCell key={fieldName}>{fieldName}</TableCell>
                    ))}
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users &&
                    users.map((item) => (
                      <TableRow
                        key={item._id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        {fieldsToRender.map((fieldName) => (
                          <TableCell key={fieldName}>
                            {fieldName === "state"
                              ? item[fieldName]?.stateName
                              : fieldName === "city"
                              ? item[fieldName]?.cityName
                              : fieldName === "country"
                              ? item[fieldName]?.countryName
                              : item[fieldName] !== undefined
                              ? item[fieldName]
                              : "ID"}
                          </TableCell>
                        ))}
                        <TableCell>
                          <IconButton
                            color="primary"
                            onClick={() => handleEdit(item._id)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            color="secondary"
                            onClick={() => handleDelete(item._id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Container>

      {/* Edit Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit Details</DialogTitle>
        <DialogContent>
          {fieldsToRender.map((fieldName) => (
            <FormDialogField
              key={fieldName}
              label={fieldName}
              name={fieldName}
              value={newItemEdit[fieldName]}
              onPhoneChange={handlePhone}
              onChange={handleChangeEdit}
              error={validationErrorsEdit[fieldName]}
              countryIsoCode={newItemEdit?.country?.value}
              countryStateCode={newItemEdit?.state?.isoCode}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleUpdate(editItemId)} color="primary">
            Done
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Dialog */}
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
        <DialogTitle>Add User</DialogTitle>
        <DialogContent>
          <Grid item xs={12}>
            <Grid>
              {fieldsToRender.map((fieldName) => (
                <FormField
                  key={fieldName}
                  label={fieldName}
                  name={fieldName}
                  value={newItemAdd[fieldName]}
                  onPhoneChange={handlePhone}
                  onChange={handleChangeAdd}
                  error={validationErrorsAdd[fieldName]}
                  countryIsoCode={newItemAdd?.country?.value}
                  countryStateCode={newItemAdd?.state?.isoCode}
                />
              ))}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenAddDialog(false)}
          >
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleAdd}>
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add User Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenAddDialog(true)}
      >
        Add User
      </Button>
    </>
  );
};

export default CrudTable;
