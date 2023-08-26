import { useState, useContext,useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../context";
import Link from "next/link";
import { useRouter } from "next/router";

const Login = () => {
  const [email, setEmail] = useState("nandhiniannamalai.17@gmail.com");
  const [password, setPassword] = useState("654321");

 // state
 const {
  state: { user },
  dispatch,
} = useContext(Context);
// const { user } = state;

    // router
    const router = useRouter();

    useEffect(() => {
      if (user !== null) router.push("/");
    }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.table({ name, email, password });
    try {
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API}/Login`, {
        email,
        password,
      });
      //console.log("LOGIN RESPONSE", data);
      dispatch({
        type: "LOGIN",
        payload: data,
      });
        // save in local storage
        window.localStorage.setItem("user", JSON.stringify(data));
        // redirect
        router.push("/");
    } catch (err) {
      if (err.response && err.response.data) {
        toast(err.response.data);
      } else {
        toast("An error occurred while processing your request.");
      }
    }
  };

  return (
    <>
      <h1 className="jumbotron text-center bg-primary square">Login</h1>

      <div className="container col-md-4 offset-md-4 pb-5">
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="form-control mb-4 p-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />

          <input
            type="password"
            className="form-control mb-4 p-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />

          <button type="submit" className="btn btn-block btn-primary">
            Submit
          </button>
        </form>

        <p className="text-center p-3">
          Not yet registered? <Link href="/Register">Register</Link>
        </p>
        <p className="text-center">
          <Link href="/forgot-password">
            <span className="text-danger">Forgot password</span>
          </Link>
        </p>
      </div>
    </>
  );
};

export default Login;
