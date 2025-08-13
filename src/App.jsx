import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

const App = () => {

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm();

  const delay = (d) => { 
    return new Promise((resolve, reject) => { 
      setTimeout(() => {
        resolve()
      }, d*1000);
    })
  }

  const onSubmit = async (data) => {
    clearErrors("myform"); // Clear custom error before validating
    await delay(2);
    console.log(data);

    //Validating Credentials Backend
    if (data.email !== "sriramsahu187@gmail.com") {
      setError("myform", { message: "Not a valid email id!" });
    }
  }

  return (
    <>
      <div className="container">
        <p className="heading">Login to your account</p>
        <p className="subheading">
          Enter your Email below to login to your account
        </p>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <p className='labels'>Email</p>
          <input
            {...register("email", {
              required: {
                value: true,
                message: "Enter Email Id",
              },
              onChange: () => clearErrors("myform"), // Clear error on input change
            })}
            className="email"
            type="text"
            placeholder="m@example.com"
          />
          {errors.email &&
            <div className="error">
              <>{errors.email.message}</>
            </div>
          }
          <div className="forgotpass">
            <p className='labels'>Password</p>
            <p className="forgottext">Forgot your password?</p>
          </div>
          <input
            {...register("password", {
              required: {
                value: true,
                message: "Enter password",
              },
              minLength: {
                value: 3,
                message: "Minimum password length is 3",
              },
              
            })}
            className="password"
            type="password"
            placeholder=""
          />
          <input disabled={isSubmitting} className="login-btn" type="submit" value="Login" />
          {errors.password &&
            <div className="error">
              <>{errors.password.message}</>
            </div>
          }
          {isSubmitting && 
            <div className='error'>
              <>Loading...</>
          </div>}
          {isSubmitSuccessful && 
            <div className='error'>
              <>You're successfully Logged in!</>
            </div>}
          { 
            errors.myform && 
            <div className='error'>
                <>{errors.myform.message}</>
            </div>
          }
        </form>
        <div className="signup">
          <p>Dont have an account?</p>
          <p className="forgottext">Sign up</p>
        </div>
      </div>
    </>
  );
}

export default App
