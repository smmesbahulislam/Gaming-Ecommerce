// import React from 'react'
// import Layout from '../../components/Layout/Layout'
// import * as yup from 'yup';
// import {Formik} from 'formik'
// import { TextField, Button } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { toast } from 'react-hot-toast';

// const forgotPasswordSchema = yup.object().shape({
//     email:yup.string().required('required'),
//     answer:yup.string().required('required'),
//     newPassword:yup.string().required('required')
// });

// const initialValuesOfForgotPassword = {
//     email: "",
//     answer: "",
//     newPassword: "",
// }

// const ForgotPassword = () => {

//     const navigate = useNavigate();

//     const handleFormSubmit = async(values, onSubmitProps) => {
//         try {
//             const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,values)
//             if(res && res.data.success){
//                 toast.success(res.data && res.data.message);

//                 navigate('/login');
//             }
//         } catch (error) {
//             console.log(error);
//             toast.error("Something went wrong");
//         }
//     }

//   return (
//     <>
//         <Layout>
//             <h1>Set New Password</h1>
//             <Formik
//                 onSubmit={handleFormSubmit}
//                 initialValues={initialValuesOfForgotPassword}
//                 validationSchema={forgotPasswordSchema}
//             >{({
//                 values,
//                 errors,
//                 touched,
//                 handleBlur,
//                 handleChange,
//                 handleSubmit,
//                 setFieldValue,
//                 resetForm,
//             }) => (
//                 <form onSubmit={handleSubmit}>
//                     <>
//                         <TextField
//                             label="Email"
//                             onBlur={handleBlur}
//                             onChange={handleChange}
//                             value={values.email}
//                             name='email'
//                             error={Boolean(touched.email) && Boolean(errors.email)}
//                             helperText={touched.email && errors.email}
//                             sx={{gridColumn: "span 4"}}
//                         />
//                         <TextField
//                             label="What is your favourite game?"
//                             onBlur={handleBlur}
//                             onChange={handleChange}
//                             value={values.answer}
//                             name='answer'
//                             error={Boolean(touched.answer) && Boolean(errors.answer)}
//                             helperText={touched.answer && errors.answer}
//                             sx={{gridColumn: "span 4"}}
//                         />
//                         <TextField
//                             label="New Password?"
//                             onBlur={handleBlur}
//                             onChange={handleChange}
//                             value={values.newPassword}
//                             name='newPassword'
//                             error={Boolean(touched.newPassword) && Boolean(errors.newPassword)}
//                             helperText={touched.newPassword && errors.newPassword}
//                             sx={{gridColumn: "span 4"}}
//                         />
//                     </>
//                     <Button
//                             type='submit'
//                         >
//                             Reset Password
//                         </Button>
//                         <Button
//                             type='button'
//                             onClick={() => {navigate('/login')}}
//                         >
//                             Already have account?
//                         </Button>
//                 </form>
//             )}

//             </Formik>
//         </Layout>
//     </>
//   )
// }

// export default ForgotPassword

import React from 'react'
import Layout from '../../components/Layout/Layout'
import * as yup from 'yup';
import {Formik} from 'formik'
import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import './login.css';

const forgotPasswordSchema = yup.object().shape({
    email:yup.string().required('required'),
    answer:yup.string().required('required'),
    newPassword:yup.string().required('required')
});

const initialValuesOfForgotPassword = {
    email: "",
    answer: "",
    newPassword: "",
}

const ForgotPassword = () => {

    const navigate = useNavigate();

    const handleFormSubmit = async(values, onSubmitProps) => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,values)
            if(res && res.data.success){
                toast.success(res.data && res.data.message);

                navigate('/login');
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    }

  return (
    <>
        <Layout>
        <div className='container width'>
            <h2 style={{fontSize: '28px'}}>Set New Password</h2>
            <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValuesOfForgotPassword}
                validationSchema={forgotPasswordSchema}
            >{({
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
                    <div className='form-group'>
                        <TextField
                            label="Email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.email}
                            name='email'
                            error={Boolean(touched.email) && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                            sx={{gridColumn: "span 4"}}
                        />
                        </div>
                        <div className='form-group'>
                        <TextField
                            label="What is your favourite game?"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.answer}
                            name='answer'
                            error={Boolean(touched.answer) && Boolean(errors.answer)}
                            helperText={touched.answer && errors.answer}
                            sx={{gridColumn: "span 4"}}
                        />
                        </div>
                        <div className='form-group'>
                        <TextField
                            label="New Password?"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.newPassword}
                            name='newPassword'
                            error={Boolean(touched.newPassword) && Boolean(errors.newPassword)}
                            helperText={touched.newPassword && errors.newPassword}
                            sx={{gridColumn: "span 4"}}
                        />
                    </div>
                    <Button
                            type='submit'
                            className='submit-button'
                        >
                            Reset Password
                        </Button>
                        <Button
                            type='button'
                            onClick={() => {navigate('/login')}}
                            className='submit-button'
                        >
                            Already have account?
                        </Button>
                </form>
            )}

            </Formik>
            </div>
        </Layout>
    </>
  )
}

export default ForgotPassword