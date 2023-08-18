import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { auth } from "../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../store/index";
import { db } from "../../config/firebase";
import { getDocs, collection } from "firebase/firestore";

const SignInSchema = yup.object().shape({
  email: yup.string().required("email is required"),
  password: yup.string().required("Password is required"),
});

const Login = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const getUser = async (email) => {
    try {
      const userCollection = collection(db, "users");
      const data = await getDocs(userCollection);
      const filterData = data.docs.map((item) => ({
        ...item.data(),
        id: item.id,
      }));
      const currentUser = filterData.filter((data) => data.email === email)[0];

      dispatch(actions.changeCurrentUser(currentUser));
    } catch (err) {
      setError(err);
      console.log(err);
    }
  };
  const signInWithEmail = async (values) => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const confirmUser = user.user;
      getUser(confirmUser.email);
      navigate("/");
      //console.log(selector);
    } catch (err) {
      //setSignedIn(false);
      setError(err);
    }
  };
  return (
    <div className="login-container">
      <h3 className="login-title">Sign In</h3>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={SignInSchema}
        onSubmit={(values) => {
          signInWithEmail(values);
        }}
      >
        {({
          handleBlur,
          handleChange,
          handleSubmit,
          values,
          touched,
          errors,
        }) => (
          <form noValidate onSubmit={handleSubmit} className="login-form">
            <div>
              <input
                type="text"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="email"
                placeholder="Enter email"
                className="login-input"
              />
              <br />
              {touched.email && !!errors.email && (
                <div className="login-error">{errors.email}</div>
              )}
            </div>
            <div>
              <input
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="current-password"
                placeholder="Enter password"
                className="login-input"
              />
              <br />
              {touched.password && !!errors.password && (
                <div className="login-error">{errors.password}</div>
              )}
            </div>
            <button type="submit" className="login-button">
              Sign In
            </button>
          </form>
        )}
      </Formik>
      {error && (
        <div className="login-text login-error">
          Incorrect email or password
        </div>
      )}
      <div className="login-text">
        <span>Don't have an account? </span>
        <Link to="/sign-up" className="signin-link">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Login;
