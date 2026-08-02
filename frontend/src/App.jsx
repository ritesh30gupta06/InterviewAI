import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Resume from "./pages/Resume";
import Interview from "./pages/Interview";
import Analytics from "./pages/Analytics";

import ProtectedRoute from "./components/ProtectedRoute";

export default function App(){

return(

<Routes>

<Route
path="/"
element={<Login/>}
/>

<Route
path="/register"
element={<Register/>}
/>

<Route
path="/dashboard"
element={
<ProtectedRoute>
<Dashboard/>
</ProtectedRoute>
}
/>

<Route
path="/resume"
element={
<ProtectedRoute>
<Resume/>
</ProtectedRoute>
}
/>

<Route
path="/interview"
element={
<ProtectedRoute>
<Interview/>
</ProtectedRoute>
}
/>

<Route
path="/analytics"
element={
<ProtectedRoute>
<Analytics/>
</ProtectedRoute>
}
/>

</Routes>

);

}