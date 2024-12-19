import { Box } from "@chakra-ui/react";
import "./App.css";
import { Provider } from "./components/ui/provider";
import Layout from "./pages/Layout";
import Notes from "./pages/Notes";
import Categories from "./pages/Categories";
import Create from "./pages/Create";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { useReports } from "./api/ReportsContext";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Layout />}>
        <Route path="/" element={<Notes />} />
        <Route path="categories" element={<Categories />} />
        <Route path="create" element={<Create />} />
      </Route>
    )
  );

  const { theme } = useReports();
  return (
    <Provider>
      <Box
        width="100%"
        pt="10px"
        minHeight="100vh"
        display="flex"
        flexDirection="column"
        className={`App ${theme}`}
      >
        <RouterProvider router={router} />
      </Box>
    </Provider>
  );
}

export default App;
