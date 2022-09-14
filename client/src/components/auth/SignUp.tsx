import { Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

const loginSchema = Yup.object()
  .shape({
    name: Yup.string()
      .min(2, "Name is too short!")
      .required("Name is required!"),
    email: Yup.string().email("Invalid email").required("Email is required!"),
    password: Yup.string()
      .min(8, "Password is too short!")
      .max(50, "Password is too long!")
      .required("Password is required!"),
    confirmPassword: Yup.string()
      .when("password", {
        is: (val: string | any[]) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("password")],
          "Both password need to be the same"
        ),
      })
      .required("Confirm password is required!"),
  })
  .required();

const SignUp = () => {
  const navigate = useNavigate();
  const onHandleSubmit = (formData: { email: string; password: string }) => {
    localStorage.setItem("user", JSON.stringify(formData));
    navigate("/");
  };
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
          <h3 className="text-2xl font-bold text-center">
            Sign Up to your account
          </h3>
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              confirmPassword: "",
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
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="Name"
                      name="name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                      className="mb-2 w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                    {errors.name && touched.name && (
                      <span className="text-red-600 text-sm w-full block">
                        {errors.name}
                      </span>
                    )}
                  </div>
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
                  <div>
                    <label className="block" htmlFor="email">
                      Password
                    </label>
                    <input
                      type="text"
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
                  <div className="mt-4">
                    <label className="block">Confirm Password</label>
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      name="confirmPassword"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.confirmPassword}
                      className="mb-2 w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                    {errors.confirmPassword && touched.confirmPassword && (
                      <span className="text-red-600 text-sm w-full block">
                        {errors.confirmPassword}
                      </span>
                    )}
                  </div>
                  <div className="flex items-baseline justify-between">
                    <button
                      type="submit"
                      className="px-6 w-full py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
                    >
                      Sign In
                    </button>
                  </div>
                </div>
              </form>
            )}
          </Formik>
          <div className="text-center m-4">
            <span>Already have an account? </span>
            <Link className="text-blue-600" to={"/login"}>
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
