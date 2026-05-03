import { RouterProvider } from "react-router";
import authRouter from "./features/auth.routes";

const App = ()=>{
  return<>
  <RouterProvider router={authRouter} />
  
  </>
}
export default App;