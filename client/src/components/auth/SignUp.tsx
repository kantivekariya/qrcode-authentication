import { Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { SignUpIProps, userSignUp } from "../../reduce/action/auth/AuthAction";
import { useAppDispatch } from "../../utils/hooks/dispatchHooks";

const signUpSchema = Yup.object()
  .shape({
    firstName: Yup.string()
      .min(2, "First name is too short!")
      .required("First name is required!"),
    lastName: Yup.string()
      .min(2, "Last name is too short!")
      .required("Last name is required!"),
    email: Yup.string().email("Invalid email").required("Email is required!"),
    country: Yup.string().required("Country is required!"),
    address: Yup.string().required("Address is required!"),
    phone: Yup.string()
      .matches(
        /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
        "Phone number is not valid!"
      )
      .required("Phone is required!"),
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
  const dispatch = useAppDispatch();

  const onHandleSubmit = async (formData: SignUpIProps) => {
    await dispatch(userSignUp(formData));
    await navigate("/login", { replace: true });
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
              firstName: "",
              lastName: "",
              email: "",
              country: "",
              address: "",
              phone: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={signUpSchema}
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
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-3 md:mb-0">
                      <label className="block" htmlFor="email">
                        First Name
                      </label>
                      <input
                        type="text"
                        placeholder="First Name"
                        name="firstName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.firstName}
                        className="mb-2 w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                      />
                      {errors.firstName && touched.firstName && (
                        <span className="text-red-600 text-sm w-full block">
                          {errors.firstName}
                        </span>
                      )}
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-3 md:mb-0">
                      <label className="block" htmlFor="email">
                        Last Name
                      </label>
                      <input
                        type="text"
                        placeholder="Last Name"
                        name="lastName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.lastName}
                        className="mb-2 w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                      />
                      {errors.lastName && touched.lastName && (
                        <span className="text-red-600 text-sm w-full block">
                          {errors.lastName}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-3 md:mb-0">
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
                    <div className="w-full md:w-1/2 px-3 mb-3 md:mb-0">
                      <label className="block" htmlFor="email">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        placeholder="Phone"
                        name="phone"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.phone}
                        className="mb-2 w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                      />
                      {errors.phone && touched.phone && (
                        <span className="text-red-600 text-sm w-full block">
                          {errors.phone}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-3 md:mb-0">
                      <label className="block" htmlFor="email">
                        Country
                      </label>
                      <input
                        type="text"
                        placeholder="Country"
                        name="country"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.country}
                        className="mb-2 w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                      />
                      {errors.country && touched.country && (
                        <span className="text-red-600 text-sm w-full block">
                          {errors.country}
                        </span>
                      )}
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-3 md:mb-0">
                      <label className="block" htmlFor="email">
                        Address
                      </label>
                      <input
                        type="text"
                        placeholder="Address"
                        name="address"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.address}
                        className="mb-2 w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                      />
                      {errors.address && touched.address && (
                        <span className="text-red-600 text-sm w-full block">
                          {errors.address}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-3 md:mb-0">
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
                    <div className="w-full md:w-1/2 px-3 mb-3 md:mb-0">
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
