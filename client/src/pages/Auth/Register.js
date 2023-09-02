// import { Button, TextField } from '@mui/material';
// import { Formik } from "formik";
// import React from 'react';
// import * as yup from "yup";
// import Layout from '../../components/Layout/Layout';
// import {toast} from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom';

// const registerSchema = yup.object().shape({
//     // firstName: yup.string().required("required"),
//     name: yup.string().required("required"),
//     email: yup.string().email("invalid email").required("required"),
//     password: yup.string().required("required"),
//     phone: yup.string().required("required"),
//     address: yup.string().required("required"),
//     answer: yup.string().required("required")
// });

// const initialValuesRegister = {
//     // firstName: "",
//     name: "",
//     email: "",
//     password: "",
//     phone: "",
//     address: "",
//     answer: ""
// };



// const Register = () => {
//     const navigate = useNavigate();

//     const handleFormSubmit = async(values,onSubmitProps) => {
//         try {
//             const savedUserResponse = await fetch(
//                 `${process.env.REACT_APP_API}/api/v1/auth/register`,
//                 {
//                     method:"POST",
//                     headers:{"Content-Type":"application/json"},
//                     body:JSON.stringify(values),
//                 }
//             );
//             const savedUser = await savedUserResponse.json();
//             if(savedUser.success){
//                 toast.success(savedUser.message);
//                 navigate('/login');
//             }else{
//                 toast.error(savedUser.message);
//             }

//         } catch (error) {
//             console.log(error);
//             toast.error('Something went wrong');

//         }

//         // console.log(values);
//         // console.log(formData);
//         onSubmitProps.resetForm();
//     }

//     return (
//         <>
//             <Layout>
//                 <div className="register">
//                     <h1>Register Page</h1>
//                     <Formik
//                         onSubmit={handleFormSubmit}
//                         initialValues={initialValuesRegister}
//                         validationSchema={registerSchema}
//                     >
//                         {({
//                             values,
//                             errors,
//                             touched,
//                             handleBlur,
//                             handleChange,
//                             handleSubmit,
//                             setFieldValue,
//                             resetForm,
//                         }) => (
//                             <form onSubmit={handleSubmit}>
//                                 <>
//                                     {/* <TextField
//                                         label="First Name"
//                                         onBlur={handleBlur}
//                                         onChange={handleChange}
//                                         value={values.firstName}
//                                         name='firstName'
//                                         error={
//                                             Boolean(touched.firstName) && Boolean(errors.firstName)
//                                         }
//                                         helperText={touched.firstName && errors.firstName}
//                                         sx={{ gridColumn: "span 2" }}
//                                     /> */}
//                                     <TextField
//                                         label="Name"
//                                         onBlur={handleBlur}
//                                         onChange={handleChange}
//                                         value={values.name}
//                                         name='name'
//                                         error={
//                                             Boolean(touched.name) && Boolean(errors.name)
//                                         }
//                                         helperText={touched.name && errors.name}
//                                         sx={{ gridColumn: "span 2" }}
//                                     />
//                                     <TextField
//                                         label="Email"
//                                         onBlur={handleBlur}
//                                         onChange={handleChange}
//                                         value={values.email}
//                                         name="email"
//                                         error={Boolean(touched.email) && Boolean(errors.email)}
//                                         helperText={touched.email && errors.email}
//                                         sx={{ gridColumn: "span 4" }}
//                                     />
//                                     <TextField
//                                         label="Password"
//                                         type='password'
//                                         onBlur={handleBlur}
//                                         onChange={handleChange}
//                                         value={values.password}
//                                         name='password'
//                                         error={Boolean(touched.password) && Boolean(errors.password)}
//                                         helperText={touched.password && errors.password}
//                                         sx={{ gridColumn: "span 4" }}
//                                     />
//                                     <TextField
//                                         label="Phone Number"
//                                         onBlur={handleBlur}
//                                         onChange={handleChange}
//                                         value={values.phone}
//                                         name='phone'
//                                         error={Boolean(touched.phone) && Boolean(errors.phone)}
//                                         helperText={touched.phone && errors.phone}
//                                         sx={{ gridColumn: "span 4" }}
//                                     />
//                                     <TextField
//                                         label="Address"
//                                         onBlur={handleBlur}
//                                         onChange={handleChange}
//                                         value={values.address}
//                                         name='address'
//                                         error={Boolean(touched.address) && Boolean(errors.address)}
//                                         helperText={touched.address && errors.address}
//                                         sx={{ gridColumn: "span 4" }}
//                                     />
//                                     <TextField
//                                         label="What is you favourite game?"
//                                         onBlur={handleBlur}
//                                         onChange={handleChange}
//                                         value={values.answer}
//                                         name='answer'
//                                         error={Boolean(touched.answer) && Boolean(errors.answer)}
//                                         helperText={touched.answer && errors.answer}
//                                         sx={{ gridColumn: "span 4" }}
//                                     />

//                                 </>
//                                 <Button
//                                     fullWidth
//                                     type="submit"
//                                 >
//                                     REGISTER
//                                 </Button>
//                             </form>
//                         )}

//                     </Formik>
//                 </div>

//             </Layout>
//         </>
//     )
// }

// export default Register

import { Button, TextField } from '@mui/material';
import { Formik } from "formik";
import React from 'react';
import * as yup from "yup";
import Layout from '../../components/Layout/Layout';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const registerSchema = yup.object().shape({
    // firstName: yup.string().required("required"),
    name: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
    phone: yup.string().required("required"),
    address: yup.string().required("required"),
    answer: yup.string().required("required"),
    accountNo: yup.string().required("required"),
    balance: yup
        .number()
        .typeError("Balance must be a number")
        .min(0, "Balance must be greater than or equal to 0")
        .required("Balance is required")
});

const initialValuesRegister = {
    // firstName: "",
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    answer: "",
    accountNo: "",
    balance: ""
};



const Register = () => {
    const navigate = useNavigate();

    const handleFormSubmit = async (values, onSubmitProps) => {
        try {
            const savedUserResponse = await fetch(
                `${process.env.REACT_APP_API}/api/v1/auth/register`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(values),
                }
            );
            const savedUser = await savedUserResponse.json();

            const bankResponse = await fetch(`${process.env.REACT_APP_BANK_API}/api/v1/bank/create-account`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(values),
                }
            )
            if (savedUser.success) {
                toast.success(savedUser.message);
                navigate('/login');
            } else {
                toast.error(savedUser.message);
            }

        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');

        }

        // console.log(values);
        // console.log(formData);
        onSubmitProps.resetForm();
    }

    return (
        <>
            <Layout>
                <div className="register container fdisplay width2">
                    <div className='heading'>
                        <h1 style={{ fontSize: '30px', color: 'black' }}>Register Page</h1>
                        <img src='/images/register.jpg' alt='register page' />

                    </div>
                    <div className='other'>
                        <Formik
                            onSubmit={handleFormSubmit}
                            initialValues={initialValuesRegister}
                            validationSchema={registerSchema}
                        >
                            {({
                                values,
                                errors,
                                touched,
                                handleBlur,
                                handleChange,
                                handleSubmit,
                                setFieldValue,
                                resetForm,
                            }) => (
                                <form onSubmit={handleSubmit} className='form'>
                                    <>
                                        {/* <TextField
                                        label="First Name"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.firstName}
                                        name='firstName'
                                        error={
                                            Boolean(touched.firstName) && Boolean(errors.firstName)
                                        }
                                        helperText={touched.firstName && errors.firstName}
                                        sx={{ gridColumn: "span 2" }}
                                    /> */}
                                        <div className='form-group'>
                                            <TextField
                                                label="Name"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.name}
                                                name='name'
                                                error={
                                                    Boolean(touched.name) && Boolean(errors.name)
                                                }
                                                helperText={touched.name && errors.name}
                                                sx={{ gridColumn: "span 2" }}
                                            />
                                        </div>
                                        <div className='form-group'>
                                            <TextField
                                                label="Email"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.email}
                                                name="email"
                                                error={Boolean(touched.email) && Boolean(errors.email)}
                                                helperText={touched.email && errors.email}
                                                sx={{ gridColumn: "span 4" }}
                                            />
                                        </div>
                                        <div className='form-group'>
                                            <TextField
                                                label="Password"
                                                type='password'
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.password}
                                                name='password'
                                                error={Boolean(touched.password) && Boolean(errors.password)}
                                                helperText={touched.password && errors.password}
                                                sx={{ gridColumn: "span 4" }}
                                            />
                                        </div>
                                        <div className='form-group'>
                                            <TextField
                                                label="Phone Number"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.phone}
                                                name='phone'
                                                error={Boolean(touched.phone) && Boolean(errors.phone)}
                                                helperText={touched.phone && errors.phone}
                                                sx={{ gridColumn: "span 4" }}
                                            />
                                        </div>
                                        <div className='form-group'>
                                            <TextField
                                                label="Address"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.address}
                                                name='address'
                                                error={Boolean(touched.address) && Boolean(errors.address)}
                                                helperText={touched.address && errors.address}
                                                sx={{ gridColumn: "span 4" }}
                                            />
                                        </div>
                                        <div className='form-group'>
                                            <TextField
                                                label="What is you favourite game?"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.answer}
                                                name='answer'
                                                error={Boolean(touched.answer) && Boolean(errors.answer)}
                                                helperText={touched.answer && errors.answer}
                                                sx={{ gridColumn: "span 4" }}
                                            />
                                        </div>
                                        <div className='form-group'>
                                            <TextField
                                                label="Bank Account Number"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.accountNo}
                                                name='accountNo'
                                                error={Boolean(touched.accountNo) && Boolean(errors.accountNo)}
                                                helperText={touched.accountNo && errors.accountNo}
                                                sx={{ gridColumn: "span 4" }}
                                            />
                                        </div>
                                        <div className='form-group'>
                                            <TextField
                                                label="Deposite Some Money"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.balance}
                                                name='balance'
                                                error={Boolean(touched.balance) && Boolean(errors.balance)}
                                                helperText={touched.balance && errors.balance}
                                                sx={{ gridColumn: "span 4" }}
                                            />
                                        </div>

                                    </>
                                    <Button
                                        fullWidth
                                        type="submit"
                                        className='submit-button'
                                    >
                                        REGISTER
                                    </Button>
                                    <Button
                                        type='button'
                                        onClick={() => { navigate('/login') }}
                                        className='submit-button'
                                    >
                                        Already have account?
                                    </Button>
                                </form>
                            )}

                        </Formik>
                    </div>
                </div>

            </Layout>
        </>
    )
}

export default Register