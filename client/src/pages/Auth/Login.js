// import { Button, TextField } from '@mui/material';
// import { Formik } from 'formik'
// import React from 'react'
// import * as yup from 'yup';
// import Layout from '../../components/Layout/Layout';
// import { toast } from 'react-hot-toast'
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/auth';


// const loginSchema = yup.object().shape({
//     email: yup.string().required('required'),
//     password: yup.string().required('required')
// });

// const initialValuesLogin = {
//     email: "",
//     password: "",
// };

// const Login = () => {

//     const [auth, setAuth] = useAuth();

//     const navigate = useNavigate();
//     const handleFormSubmit = async (values, onSubmitProps) => {
//         try {
//             const loggedinUserResponse = await fetch(
//                 `${process.env.REACT_APP_API}/api/v1/auth/login`,
//                 {
//                     method:"POST",
//                     headers:{"Content-Type":"application/json"},
//                     body:JSON.stringify(values),
//                 }
//             );

//             const loggedinUser = await loggedinUserResponse.json();
//             if(loggedinUser.success){
//                 toast.success(loggedinUser.message);
//                 setAuth({
//                     ...auth,
//                     user: loggedinUser.user,
//                     token: loggedinUser.token,
//                 })
//                 localStorage.setItem('auth',JSON.stringify(loggedinUser));
//                 navigate('/');
//             }else{
//                 toast.error(loggedinUser.message);
//             }
//         } catch (error) {
//             console.log(error);
//             toast.error('Something went wrong');
            
//         }

//         onSubmitProps.resetForm();
//     }
//     return (
//         <>
//             <Layout>
//                 <h1>Login Page</h1>
//                 <Formik
//                     onSubmit={handleFormSubmit}
//                     initialValues={initialValuesLogin}
//                     validationSchema={loginSchema}
//                 >{({
//                     values,
//                     errors,
//                     touched,
//                     handleBlur,
//                     handleChange,
//                     handleSubmit,
//                     setFieldValue,
//                     resetForm,
//                 }) => (
//                     <form onSubmit={handleSubmit}>
//                         <>
//                             <TextField
//                                 label="Email"
//                                 onBlur={handleBlur}
//                                 onChange={handleChange}
//                                 value={values.email}
//                                 name="email"
//                                 error={Boolean(touched.email) && Boolean(errors.email)}
//                                 helperText={touched.email && errors.email}
//                                 sx={{ gridColumn: "span 4" }}
//                             />
//                             <TextField
//                                 label="Password"
//                                 type='password'
//                                 onBlur={handleBlur}
//                                 onChange={handleChange}
//                                 value={values.password}
//                                 name='password'
//                                 error={Boolean(touched.password) && Boolean(errors.password)}
//                                 helperText={touched.password && errors.password}
//                                 sx={{ gridColumn: "span 4" }}
//                             />
//                         </>
//                         <Button
//                             type='submit'
//                         >
//                             Login
//                         </Button>
//                         <Button
//                             type='button'
//                             onClick={() => {navigate('/forgot-password')}}
//                         >
//                             Forgot Password?
//                         </Button>
//                     </form>
//                 )}

//                 </Formik>
//             </Layout>
//         </>
//     )
// }

// export default Login

import { Button, TextField } from '@mui/material';
import { Formik } from 'formik'
import React from 'react'
import * as yup from 'yup';
import Layout from '../../components/Layout/Layout';
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import './login.css';


const loginSchema = yup.object().shape({
    email: yup.string().required('required'),
    password: yup.string().required('required')
});

const initialValuesLogin = {
    email: "",
    password: "",
};

const Login = () => {

    const [auth, setAuth] = useAuth();

    const navigate = useNavigate();
    const handleFormSubmit = async (values, onSubmitProps) => {
        try {
            const loggedinUserResponse = await fetch(
                `${process.env.REACT_APP_API}/api/v1/auth/login`,
                {
                    method:"POST",
                    headers:{"Content-Type":"application/json"},
                    body:JSON.stringify(values),
                }
            );

            const loggedinUser = await loggedinUserResponse.json();
            if(loggedinUser.success){
                toast.success(loggedinUser.message);
                setAuth({
                    ...auth,
                    user: loggedinUser.user,
                    token: loggedinUser.token,
                })
                localStorage.setItem('auth',JSON.stringify(loggedinUser));
                navigate('/');
            }else{
                toast.error(loggedinUser.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
            
        }

        onSubmitProps.resetForm();
    }
    return (
        <>
            <Layout>
            <div className='container width'>
                <h1>Login Page</h1>
                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={initialValuesLogin}
                    validationSchema={loginSchema}
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
                        <Button
                            type='submit'
                            className='submit-button'
                        >
                            Login
                        </Button>
                        <Button
                            type='button'
                            onClick={() => {navigate('/forgot-password')}}
                            className='forget-password-button'
                        >
                            Forgot Password?
                        </Button>
                    </form>
                )}

                </Formik>
                </div>
            </Layout>
        </>
    )
}

export default Login