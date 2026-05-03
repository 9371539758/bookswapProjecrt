import{createBrowserRouter} from "react-router";
import Login from "./auth/pages/Login";
import Register from "./auth/pages/Register";
const authRouter = createBrowserRouter([
    {
            path:"/register",
            element:<Register/>
    },{
        path:"/login",
        element:<Login/>
    }
]);
export default authRouter;