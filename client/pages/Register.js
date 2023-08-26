import { useState,useEffect } from "react";
import axios from 'axios'
import Link from "next/link";
import { toast } from "react-toastify";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
    state: { user },
  } = useContext(Context);

  useEffect(() => {
    if (user !== null) router.push("/");
  }, [user]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.table({ name, email, password });
    try{
    const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API}/Register`, {
      name,
      email,
      password,
    });
    //console.log("REGISTER RESPONSE", data);
    toast("Registration successful. Please login.");
  } catch (err) {
    toast(err.response.data);
  }
  };

  return (
    <>
      <h1 className="jumbotron text-center bg-primary square">Register</h1>

      <div className="container col-md-4 offset-md-4 pb-5">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control mb-4 p-4"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
            required
          />

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
          Already registered?{" "}
          <Link href="/Login">
            Login
          </Link>
        </p>
      </div>
    </>
  );
};

export default Register;
