import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Loginform from "./pages/Loginform";
import Students from "./pages/Student/Students";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import LoginForm from "./pages/Loginform";
import Navbar from "./compenents/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { ProSidebarProvider } from "react-pro-sidebar";
import SideNavbar from "./compenents/SideNavBar";
import ReactSideNav from "./compenents/ReactSideNav.jsx";

//Students
import AllStudent from "./pages/Student/AllStudent.jsx";
import AddStudent from "./pages/Student/AddStudent.tsx";
import StudentPromotions from "./pages/Student/StudentPromotions.jsx";

//Teachers
import AllTeachers from "./pages/Teachers/AllTeachers.jsx";
import AddTeachers from "./pages/Teachers/AddTeachers.jsx";

//Account
import FeesGroup from "./pages/Account/FeesGroup.jsx";
import StudentFees from "./pages/Account/StudentFees.jsx";
import Expenses from "./pages/Account/Expenses.jsx";
import AddExpenses from "./pages/Account/AddExpenses.jsx";

//Dashboard
import Dashboard from "./pages/Dashboard.jsx";

//Subject
import Subject from "./pages/Subject.jsx";

//Settings
import Settings from "./pages/Settings.jsx";
import SharePage from "./pages/SharePage";
import { ContextProvider } from "./context/ContextProvider";
import { SignUp } from "./pages/SignUp";
import { loadPath, loadStudentData, loadStudents } from "./Loader/StudentLoader";
import ViewStudent from "./pages/Student/ViewStudent";
import Error from "./pages/Error"

//Taena mo pol gawin mo to bukas ng umaga

const router = createBrowserRouter([
  {
    path: "/",
    element: <SharePage />,
    children: [
      {
        path: "",
        element: <Navigate to={"/dashboard"} />,
      },
      {
        path: "/dashboard",
        index: true,
        element: <Dashboard />,
      },
      {
        path: "/students",
        element: <Students />,
        loader: loadPath,
        children: [
          {
            path: "",
            element: <Navigate to={"/students/all"} />,
          },
          {
            path: "all",
            index: "true",
            loader: loadStudents,
            element: <AllStudent />,
            errorElement: <Error />
            
          },
          {
            path: "add_student",
            element: <AddStudent />,
          },
          {
            path: 'student_admit_form',
            element: <StudentPromotions />
          },
          {
            path: 'view_profile',
            element: <ViewStudent />,
            loader: loadStudentData
          }
        ],
      },
      {
        path: "*",
        element: <Error />
      }
    ],
  },
  {
    path: "/login",
    element: <LoginForm></LoginForm>,
  },
  {
    path: "/signup",
    element: <SignUp />
  },
  
  // {
  //   path: "/navbar",
  //   element: <Navbar />,
  // },
  // {
  //   path: "/sidenavbar",
  //   element: <SideNavbar />,
  // },
  // {
  //   path: "/reactnav",
  //   element: <ReactSideNav />,
  // },
]);
function App() {
  return (
    <>
    
      <ProSidebarProvider>
        <div className="App">
          <ContextProvider>
            <RouterProvider router={router} />
          </ContextProvider>
        </div>
      </ProSidebarProvider>
    </>
  );
}

export default App;
