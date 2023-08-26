import { useContext } from "react";
import { Context } from "../../context";
import UserRoute from "../../Components/routes/UserRoute";

const UserIndex = () => {
  const {
    state: { user },
  } = useContext(Context);

  return (
    <UserRoute>
      <h1 className="jumbotron text-center square">User dashboard</h1>
    </UserRoute>
  );
};

export default UserIndex;
