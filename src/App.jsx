import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Loginform from "./pages/Loginform";
import Students from "./pages/Students/Students";
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
import AllStudent from "./pages/Students/All/AllStudent.jsx";
import AddStudent from "./pages/Students/AddStudent/AddStudent";
import StudentPromotions from "./pages/Students/StudentPromotions.jsx";

//Teachers
import AllTeachers from "./pages/Teachers/all/AllTeachers";
import Teachers from "./pages/Teachers/Teachers";
import AddTeacher from "./pages/Teachers/add/AddTeacher";
import {
  loaderTeacherAdd,
  loaderTeacherAll,
} from "./pages/Teachers/utils/Loaders";
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
import {
  loadPath,
  loadStudentData,
  loadStudents,
} from "./Loader/StudentLoader";
import ViewStudent from "./pages/Students/Student/ViewStudent";
import Error from "./pages/Error";
import Teacher from "./pages/Teachers/teacher/Teacher";
import AllSubjects from "./pages/Subjects/All/AllSubjects";
import Subjects from "./pages/Subjects/Subjects";
import Theme from "./Theme";

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
            errorElement: <Error />,
          },
          {
            path: "add_student",
            element: <AddStudent />,
          },
          {
            path: "student_admit_form",
            element: <StudentPromotions />,
          },
          {
            path: "student",
            element: <ViewStudent />,
            loader: loadStudentData,
            // errorElement: <Error />
          },
        ],
      },
      {
        path: "/teachers",
        element: <Teachers />,
        children: [
          {
            path: "",
            element: <Navigate to={"/teachers/all"} />,
          },
          {
            path: "all",
            element: <AllTeachers />,
            loader: loaderTeacherAll,
          },
          {
            path: "add",
            element: <AddTeacher />,
          },
          {
            path: "teacher",
            element: <Teacher />,
          },
        ],
      },
      {
        path: "/subjects",
        element: <Subjects />,
        children: [
          {
            path: "",
            element: <Navigate to={"/subjects/all"} />,
          },
          {
            path: "all",
            element: <AllSubjects />,
          },
        ],
      },
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginForm></LoginForm>,
  },
  {
    path: "/signup",
    element: <SignUp />,
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
      <Theme>
        <ProSidebarProvider>
          <div className="App">
            <ContextProvider>
              <RouterProvider router={router} />
            </ContextProvider>
          </div>
        </ProSidebarProvider>
      </Theme>
    </>
  );
}

export default App;
