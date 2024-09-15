import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
  Container, Box, Typography, TextField, Button, MenuItem,
  FormControl, InputLabel, Select, ThemeProvider, createTheme,
  CssBaseline, useMediaQuery
} from '@mui/material';
import animationData from '../../assets/AuthAnimation.json';
import Lottie from '../../utils/Lottie';
import { Stack } from '@mui/material';
import axios from 'axios';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    background: {
      default: '#141b2d',
      paper: '#1f2a40',
    },
    text: {
      primary: '#ffffff',
    },
  },
});

const roles = ['Manufacturer', 'Wholesaler', 'Retailer', 'Hospitals/Medical Institutions'];

const SignupSchema = Yup.object().shape({
  role: Yup.string().required('Role is required'),
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
  phone: Yup.string().required('Required'),
  company_name: Yup.string().required('Required'),
  GST_No: Yup.string().required('Required'),
  address: Yup.object().shape({
    street: Yup.string().required('Required'),
    city: Yup.string().required('Required'),
    state: Yup.string().required('Required'),
    postal_code: Yup.string().required('Required')
  })
});

const AuthPage = () => {
  const [isSignup, setIsSignup] = useState(true);
  const [role, setRole] = useState('');
  const [step, setStep] = useState(0); // Step control
  const [formData, setFormData] = useState(() => {
    // Load initial data from localStorage or use default values
    const savedData = localStorage.getItem('signupFormData');
    return savedData ? JSON.parse(savedData) : {
      role: '', name: '', email: '', password: '', phone: '', company_name: '', GST_No: '',
      address: { street: '', city: '', state: '', postal_code: '' }
    };
  });

  const isMobile = useMediaQuery('(max-width: 600px)'); 

  useEffect(() => {
    localStorage.setItem('signupFormData', JSON.stringify(formData));
  }, [formData]);

  const toggleAuthMode = () => {
    setIsSignup(!isSignup);
  };

  const handleNext = (values) => {
    setFormData({ ...formData, ...values });
    setStep(step + 1);
  };
  
  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (values) => {
    const formattedValues = {
      ...values,
      address: {
        street: values.address.street,
        city: values.address.city,
        state: values.address.state,
        postal_code: values.address.postal_code,
        country: "India", // Always send 'India' as the country
      },
    };
  
    const roleAPI = {
      Manufacturer: "http://localhost:3000/api/manufacturer/signup",
      Wholesaler: "http://localhost:3000/api/wholesaler/signup",
      Retailer: "http://localhost:3000/api/retailer/signup",
      Hospital: "http://localhost:3000/api/hospital/signup",
    };
  
    try {
      const response = await axios.post(roleAPI[formattedValues.role], formattedValues,{
        withCredentials: true // Send cookies also
      });
      console.log("Signup response", response);
      alert("Signup successful!");
    } catch (error) {
      console.error("Signup error", error);
      alert("Error during signup. Please check the inputs or server.");
    }
  };
  
  

  const stepTitles = ['Select Role & Personal Info', 'Company Info', 'Address Info'];

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container
        sx={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between', // Or use justifyContent: 'center' if you want both centered
          gap: 16, // Adjust the gap value as needed (e.g., 4, 6, 8)
          padding: 0,
        }}
      >
        {!isMobile && (
          <Box
            sx={{
              width: '50%',
              height: '100vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Lottie Link={animationData} />
          </Box>
        )}

        <Box
          sx={{
            width: isMobile ? '100%' : '50%',
            backgroundColor: 'background.paper',
            padding: 4,
            borderRadius: 2,
            boxShadow: 3,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            {isSignup ? stepTitles[step] : 'Login'}
          </Typography>

          {isSignup && (
            <Formik
              initialValues={formData}
              validationSchema={SignupSchema}
              onSubmit={step === 2 ? handleSubmit : handleNext}
            >
              {({ errors, touched, handleChange, values }) => (
                <Form>
                  {step === 0 && (
                    <>
                      <FormControl fullWidth margin="normal">
                        <InputLabel>Role</InputLabel>
                        <Field
                          name="role"
                          as={Select}
                          value={values.role}
                          onChange={handleChange}
                          error={touched.role && !!errors.role}
                        >
                          {roles.map((role) => (
                            <MenuItem key={role} value={role}>
                              {role}
                            </MenuItem>
                          ))}
                        </Field>
                        {touched.role && errors.role && (
                          <Typography color="error">{errors.role}</Typography>
                        )}
                      </FormControl>
                      <Field
                        name="name"
                        as={TextField}
                        fullWidth
                        label="Name"
                        variant="outlined"
                        margin="normal"
                        error={touched.name && !!errors.name}
                        helperText={touched.name && errors.name}
                      />
                      <Field
                        name="email"
                        as={TextField}
                        fullWidth
                        label="Email"
                        variant="outlined"
                        margin="normal"
                        error={touched.email && !!errors.email}
                        helperText={touched.email && errors.email}
                      />
                      <Field
                        name="password"
                        as={TextField}
                        fullWidth
                        label="Password"
                        variant="outlined"
                        type="password"
                        margin="normal"
                        error={touched.password && !!errors.password}
                        helperText={touched.password && errors.password}
                      />
                      <Button fullWidth variant="contained" onClick={() => handleNext(values)}>
                        Next
                      </Button>
                    </>
                  )}

                  {step === 1 && (
                    <>
                      <Field
                        name="company_name"
                        as={TextField}
                        fullWidth
                        label="Company Name"
                        variant="outlined"
                        margin="normal"
                        error={touched.company_name && !!errors.company_name}
                        helperText={touched.company_name && errors.company_name}
                      />
                      <Field
                        name="phone"
                        as={TextField}
                        fullWidth
                        label="Phone"
                        variant="outlined"
                        margin="normal"
                        error={touched.phone && !!errors.phone}
                        helperText={touched.phone && errors.phone}
                      />
                      <Field
                        name="GST_No"
                        as={TextField}
                        fullWidth
                        label="GST No."
                        variant="outlined"
                        margin="normal"
                        error={touched.GST_No && !!errors.GST_No}
                        helperText={touched.GST_No && errors.GST_No}
                      />
                      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                        <Button fullWidth variant="contained" onClick={handlePrevious}>
                          Previous
                        </Button>
                        <Button fullWidth variant="contained" onClick={() => handleNext(values)}>
                          Next
                        </Button>
                      </Box>
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <Stack direction="column" flex={1}>
                          <Field
                            name="address.street"
                            as={TextField}
                            fullWidth
                            label="Street"
                            variant="outlined"
                            margin="normal"
                            error={touched.address?.street && !!errors.address?.street}
                            helperText={touched.address?.street && errors.address?.street}
                          />
                          <Field
                            name="address.state"
                            as={TextField}
                            fullWidth
                            label="State"
                            variant="outlined"
                            margin="normal"
                            error={touched.address?.state && !!errors.address?.state}
                            helperText={touched.address?.state && errors.address?.state}
                          />
                        </Stack>
                        <Stack direction="column" flex={1}>
                          <Field
                            name="address.city"
                            as={TextField}
                            fullWidth
                            label="City"
                            variant="outlined"
                            margin="normal"
                            error={touched.address?.city && !!errors.address?.city}
                            helperText={touched.address?.city && errors.address?.city}
                          />
                          <Field
                            name="address.postal_code"
                            as={TextField}
                            fullWidth
                            label="Postal Code"
                            variant="outlined"
                            margin="normal"
                            error={touched.address?.postal_code && !!errors.address?.postal_code}
                            helperText={touched.address?.postal_code && errors.address?.postal_code}
                          />
                        </Stack>
                      </Stack>
                      <TextField
                        fullWidth
                        label="Country"
                        variant="outlined"
                        margin="normal"
                        value="India"
                        disabled
                      />
                      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                        <Button fullWidth variant="contained" onClick={handlePrevious}>
                          Previous
                        </Button>
                        <Button type="submit" fullWidth variant="contained">
                          Submit
                        </Button>
                      </Box>
                    </>
                  )}
                </Form>
              )}
            </Formik>
          )}

          {!isSignup && (
            <Formik
              initialValues={{ email: '', password: '', role: '' }} // Add role in initial values
              validationSchema={Yup.object().shape({
                email: Yup.string().email('Invalid email').required('Email is required'),
                password: Yup.string().required('Password is required'),
                role: Yup.string().required('Role is required'), // Validation for role
              })}
              onSubmit={async (values) => {
                const loginAPI = {
                  Manufacturer: "http://localhost:3000/api/manufacturer/login",
                  Wholesaler: "http://localhost:3000/api/wholesaler/login",
                  Retailer: "http://localhost:3000/api/retailer/login",
                  "Hospitals/Medical Institutions": "http://localhost:3000/api/hospital/login",
                };

                try {
                  const response = await axios.post(loginAPI[values.role], {
                    email: values.email,
                    password: values.password,
                  }, {
                    withCredentials: true // Send cookies with
                  }
                );
                  console.log("Login response", response);
                  alert("Login successful!");
                } catch (error) {
                  console.error("Login error", error);
                  alert("Login failed. Please check your credentials and role.");
                }
              }}
            >
              {({ errors, touched, handleChange, values }) => (
                <Form>
                  {/* Role Dropdown for Login */}
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Role</InputLabel>
                    <Field
                      name="role"
                      as={Select}
                      value={values.role}
                      onChange={handleChange}
                      error={touched.role && !!errors.role}
                    >
                      {roles.map((role) => (
                        <MenuItem key={role} value={role}>
                          {role}
                        </MenuItem>
                      ))}
                    </Field>
                    {touched.role && errors.role && (
                      <Typography color="error">{errors.role}</Typography>
                    )}
                  </FormControl>

                  <Field
                    name="email"
                    as={TextField}
                    fullWidth
                    label="Email"
                    variant="outlined"
                    margin="normal"
                    error={touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                  />
                  <Field
                    name="password"
                    as={TextField}
                    fullWidth
                    label="Password"
                    variant="outlined"
                    margin="normal"
                    type="password"
                    error={touched.password && !!errors.password}
                    helperText={touched.password && errors.password}
                  />


                  <Button fullWidth type="submit" variant="contained" color="primary">
                    Login
                  </Button>
                </Form>
              )}
            </Formik>
          )}


          <Button fullWidth variant="text" onClick={toggleAuthMode}>
            {isSignup ? 'Already have an account? Login' : 'Don’t have an account? Sign Up'}
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default AuthPage;
