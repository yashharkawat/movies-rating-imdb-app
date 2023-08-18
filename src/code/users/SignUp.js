import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../store/index";
import { db } from "../../config/firebase";
import { addDoc, collection } from "firebase/firestore";
import { auth } from "../../config/firebase";

const signUpSchema = yup.object().shape({
  name: yup.string().required("Enter valid name"),
  password: yup
    .string()
    .min(6, "password is too small")
    .required("password is required"),
  email: yup.string().required("Enter valid email"),
});

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const curUser=useSelector(state=>state);
  const addUser = async (user) => {
    const userCollection = collection(db, "users");
    const data = await addDoc(userCollection, user);
    dispatch(
      actions.changeCurrentUser({
        email: user.email,
        name: user.name,
        id: data.id,
        liked:[],
      })
    );
  };
  const signIn = async (values) => {
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      addUser({ email: values.email, name: values.name, liked: [] });
      navigate("/");
    } catch (err) {
      setError(err);
      console.log(err);
    }
  };
  
  return (
    
    <div className="signup-container">
      <h2 className="signup-title">Sign Up</h2>
      <Formik
        initialValues={{ email: "", password: "", name: "" }}
        validationSchema={signUpSchema}
        onSubmit={(values) => {
          signIn(values);
        }}
      >
        {({
          values,
          handleBlur,
          handleChange,
          handleSubmit,
          errors,
          touched,
        }) => (
          <form noValidate onSubmit={handleSubmit} className="signup-form">
            <input
              name="name"
              type="text"
              placeholder="Enter name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className="signup-input"
            />
            {touched.name && errors.name && (
              <div className="signup-error">{errors.name}</div>
            )}
            <input
              name="email"
              type="email"
              placeholder="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className="signup-input"
            />
            {touched.email && errors.email && (
              <div className="signup-error">{errors.email}</div>
            )}
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className="signup-input"
            />
            {touched.password && errors.password && (
              <div className="signup-error">{errors.password}</div>
            )}

            <button type="submit" className="signup-button">
              Sign up
            </button>
          </form>
        )}
      </Formik>

      {error && (
        <div className="login-text login-error">
          You already have an account
        </div>
      )}
      <div className="login-text">
        <span>Already have an account? </span>
        <Link to="/login" className="signin-link">
          Login
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
