import { Formik } from "formik";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

const loginSchema = Yup.object()
  .shape({
    email: Yup.string().email("Invalid email").required("Email is Required!"),
    password: Yup.string()
      .min(8, "Password is too short!")
      .max(50, "Password is too long!")
      .required("Password is Required!"),
  })
  .required();

const Login = () => {
  const navigate = useNavigate();
  const isAuth = localStorage.getItem("user");

  useEffect(() => {
    if (isAuth) {
      navigate("/", { replace: true });
    }
  }, [navigate, isAuth]);

  const onHandleSubmit = (formData: { email: string; password: string }) => {
    localStorage.setItem("user", JSON.stringify(formData));
    navigate("/");
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
          <h3 className="text-2xl font-bold text-center">
            Login to your account
          </h3>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={loginSchema}
            onSubmit={onHandleSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <div className="mt-4">
                  <div>
                    <label className="block" htmlFor="email">
                      Email
                    </label>
                    <input
                      type="text"
                      placeholder="Email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      className="mb-2 w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                    {errors.email && touched.email && (
                      <span className="text-red-600 text-sm w-full block">
                        {errors.email}
                      </span>
                    )}
                  </div>
                  <div className="mt-4">
                    <label className="block">Password</label>
                    <input
                      type="password"
                      placeholder="Password"
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      className="mb-2 w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                    {errors.password && touched.password && (
                      <span className="text-red-600 text-sm w-full block">
                        {errors.password}
                      </span>
                    )}
                  </div>
                  <div className="flex items-baseline justify-between">
                    <button
                      type="submit"
                      className="px-6 w-full py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
                    >
                      Login
                    </button>
                  </div>
                </div>
              </form>
            )}
          </Formik>
          <div className="text-center m-4">
            <span>Don't have an account? </span>
            <Link className="text-blue-600" to={"/register"}>
              Register
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
