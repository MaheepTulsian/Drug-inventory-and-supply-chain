import { Box, Button, TextField, MenuItem } from "@mui/material";
import { Formik, FieldArray } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../../../components/Header";

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  return (
    <Box m="20px">
      <Header title="ADD MEDICINE" subtitle="List a new medicine with details" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="20px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Medicine ID"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.medicine_id}
                name="medicine_id"
                error={!!touched.medicine_id && !!errors.medicine_id}
                helperText={touched.medicine_id && errors.medicine_id}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Medicine Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.medicine_name}
                name="medicine_name"
                error={!!touched.medicine_name && !!errors.medicine_name}
                helperText={touched.medicine_name && errors.medicine_name}
                sx={{ gridColumn: "span 4" }}
              />

              <FieldArray name="batches">
                {() => (
                  <>
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Batch ID"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.batches[0].batch_id}
                      name="batches[0].batch_id"
                      error={!!touched.batches?.[0]?.batch_id && !!errors.batches?.[0]?.batch_id}
                      helperText={touched.batches?.[0]?.batch_id && errors.batches?.[0]?.batch_id}
                      sx={{ gridColumn: "span 4" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="date"
                      label="Manufacture Date"
                      InputLabelProps={{ shrink: true }}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.batches[0].manufacture_date}
                      name="batches[0].manufacture_date"
                      error={!!touched.batches?.[0]?.manufacture_date && !!errors.batches?.[0]?.manufacture_date}
                      helperText={touched.batches?.[0]?.manufacture_date && errors.batches?.[0]?.manufacture_date}
                      sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="date"
                      label="Expiry Date"
                      InputLabelProps={{ shrink: true }}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.batches[0].expiry_date}
                      name="batches[0].expiry_date"
                      error={!!touched.batches?.[0]?.expiry_date && !!errors.batches?.[0]?.expiry_date}
                      helperText={touched.batches?.[0]?.expiry_date && errors.batches?.[0]?.expiry_date}
                      sx={{ gridColumn: "span 2" }}
                    />

                    {/* <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Expiry Status"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.batches[0].expiry_status}
                      name="batches[0].expiry_status"
                      error={!!touched.batches?.[0]?.expiry_status && !!errors.batches?.[0]?.expiry_status}
                      helperText={touched.batches?.[0]?.expiry_status && errors.batches?.[0]?.expiry_status}
                      sx={{ gridColumn: "span 2" }}
                    /> */}

                    <TextField
                      select
                      fullWidth
                      variant="filled"
                      label="Product Category"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.batches[0].product_categories}
                      name="batches[0].product_categories"
                      error={!!touched.batches?.[0]?.product_categories && !!errors.batches?.[0]?.product_categories}
                      helperText={touched.batches?.[0]?.product_categories && errors.batches?.[0]?.product_categories}
                      sx={{ gridColumn: "span 4" }}
                    >
                      <MenuItem value="Tablets">Tablets</MenuItem>
                      <MenuItem value="Syrup">Syrup</MenuItem>
                      <MenuItem value="Injection">Injection</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </TextField>

                    {values.batches[0].product_categories === "Tablets" && (
                      <>
                        <TextField
                          fullWidth
                          variant="filled"
                          type="number"
                          label="Strip Quantity"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.batches[0].strip_quantity}
                          name="batches[0].strip_quantity"
                          error={!!touched.batches?.[0]?.strip_quantity && !!errors.batches?.[0]?.strip_quantity}
                          helperText={touched.batches?.[0]?.strip_quantity && errors.batches?.[0]?.strip_quantity}
                          sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                          fullWidth
                          variant="filled"
                          type="number"
                          label="Tablets per Strip"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.batches[0].tablets_per_strip}
                          name="batches[0].tablets_per_strip"
                          error={!!touched.batches?.[0]?.tablets_per_strip && !!errors.batches?.[0]?.tablets_per_strip}
                          helperText={touched.batches?.[0]?.tablets_per_strip && errors.batches?.[0]?.tablets_per_strip}
                          sx={{ gridColumn: "span 2" }}
                        />
                      </>
                    )}

                    <TextField
                      fullWidth
                      variant="filled"
                      type="number"
                      label="Quantity"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={
                        values.batches[0].product_categories === "Tablets"
                          ? values.batches[0].strip_quantity * values.batches[0].tablets_per_strip || ""
                          : values.batches[0].quantity
                      }
                      name="batches[0].quantity"
                      error={!!touched.batches?.[0]?.quantity && !!errors.batches?.[0]?.quantity}
                      helperText={touched.batches?.[0]?.quantity && errors.batches?.[0]?.quantity}
                      sx={{ gridColumn: "span 2" }}
                      InputProps={{
                        readOnly: values.batches[0].product_categories === "Tablets" ? true : false, // Set to readOnly if category is "Tablets"
                      }}
                    />

                    <TextField
                      fullWidth
                      variant="filled"
                      type="number"
                      label="MRP"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.batches[0].mrp}
                      name="batches[0].mrp"
                      error={!!touched.batches?.[0]?.mrp && !!errors.batches?.[0]?.mrp}
                      helperText={touched.batches?.[0]?.mrp && errors.batches?.[0]?.mrp}
                      sx={{ gridColumn: "span 2" }}
                    />

                    <TextField
                      fullWidth
                      variant="filled"
                      type="number"
                      label="Selling Price"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.batches[0].selling_price}
                      name="batches[0].selling_price"
                      error={!!touched.batches?.[0]?.selling_price && !!errors.batches?.[0]?.selling_price}
                      helperText={touched.batches?.[0]?.selling_price && errors.batches?.[0]?.selling_price}
                      sx={{ gridColumn: "span 2" }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="number"
                      label="Cost Price"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.batches[0].cost_price}
                      name="batches[0].cost_price"
                      error={!!touched.batches?.[0]?.cost_price && !!errors.batches?.[0]?.cost_price}
                      helperText={touched.batches?.[0]?.cost_price && errors.batches?.[0]?.cost_price}
                      sx={{ gridColumn: "span 2" }}
                    />
                    {/* <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Batch Status"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.batches[0].batch_status}
                      name="batches[0].batch_status"
                      error={!!touched.batches?.[0]?.batch_status && !!errors.batches?.[0]?.batch_status}
                      helperText={touched.batches?.[0]?.batch_status && errors.batches?.[0]?.batch_status}
                      sx={{ gridColumn: "span 2" }}
                    /> */}
                  </>
                )}
              </FieldArray>
            </Box>
            <Box display="flex" justifyContent="center" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Submit
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  medicine_id: yup.string().required("Required"),
  medicine_name: yup.string().required("Required"),
  batches: yup.array().of(
    yup.object().shape({
      batch_id: yup.string().required("Required"),
      manufacture_date: yup.string().required("Required"),
      expiry_date: yup.string().required("Required"),
      expiry_status: yup.string().required("Required"),
      product_categories: yup.string().required("Required"),
      quantity: yup.number().required("Required"),
      mrp: yup.number().required("Required"),
      selling_price: yup.number().required("Required"),
      cost_price: yup.number().required("Required"),
      batch_status: yup.string().required("Required"),
    })
  ),
});

const initialValues = {
  medicine_id: "",
  medicine_name: "",
  batches: [
    {
      batch_id: "",
      manufacture_date: "",
      expiry_date: "",
      expiry_status: "",
      product_categories: "",
      quantity: "",
      mrp: "",
      selling_price: "",
      cost_price: "",
      batch_status: "",
    },
  ],
};

export default Form;
