import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import {
  Select,
  Button,
  Container,
  Grid,
  Typography,
  TextField,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  IconButton
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState(0);
  const [photo, setPhoto] = useState(null);

  // Get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while getting categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // Handle product creation
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/create-product`,
        productData
      );
      if (data?.success) {
        toast.success("Product Created Successfully");
        setName("");
        setDescription("");
        setPrice("");
        setCategory("");
        setQuantity("");
        setShipping(0);
        setPhoto(null);
        // navigate("/dashboard/admin/products");

      } else {
        toast.error(data?.message);
        setName("");
        setDescription("");
        setPrice("");
        setCategory("");
        setQuantity("");
        setShipping(0);
        setPhoto(null);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Dashboard - Create Product">
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <AdminMenu />
          </Grid>
          <Grid item xs={12} md={9}>
            <Typography variant="h4" component="h1">
              Create Product
            </Typography>

            <Box mt={2}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel>Select a category</InputLabel>
                <Select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  label="Select a category"
                >
                  <MenuItem value="">
                    <em>Select a category</em>
                  </MenuItem>
                  {categories?.map((c) => (
                    <MenuItem key={c._id} value={c._id}>
                      {c.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box mt={2} sx={{ marginBottom: 2 }}>
              <FormControl fullWidth>
                <label htmlFor="upload-photo" className="btn btn-outline-secondary col-md-12">
                  <input
                    id="upload-photo"
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                  <IconButton color="default" component="span">
                    <CloudUploadIcon />
                  </IconButton>
                  <span>{photo ? photo.name : "Upload Photo"}</span>
                </label>
              </FormControl>

            </Box>
            {photo && (
              <Box mt={2} display="flex" justifyContent="center">
                <img
                  src={URL.createObjectURL(photo)}
                  alt="product_photo"
                  height={"200px"}
                />
              </Box>
            )}

            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mb-3"
              sx={{ marginBottom: 2 }}
            />
            <TextField
              fullWidth
              label="Description"
              variant="outlined"
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mb-3"
              sx={{ marginBottom: 2 }}
            />
            <TextField
              fullWidth
              label="Price"
              variant="outlined"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="mb-3"
              sx={{ marginBottom: 2 }}
            />
            <TextField
              fullWidth
              label="Quantity"
              variant="outlined"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="mb-3"
              sx={{ marginBottom: 2 }}
            />
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Shipping</InputLabel>
              <Select
                value={shipping}
                onChange={(e) => setShipping(e.target.value)}
                label="Shipping"
              >
                <MenuItem value={0}>No</MenuItem>
                <MenuItem value={1}>Yes</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreate}
              sx={{ mt: 3, bgcolor: "#4caf50", "&:hover": { bgcolor: "#45a049" } }}
            >
              CREATE PRODUCT
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default CreateProduct;
