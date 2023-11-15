import { Routes, Route } from 'react-router-dom';

import Layout from './Components/Layout';
import RequireAuth from './Components/RequireAuth'
import Home from './Components/Home'
import Login from './Components/login'
import UserForm from './Components/createResume/UserForm';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        {/* we want to protect these routes */}
        <Route element={<RequireAuth  />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<RequireAuth  />}>
          <Route path="newResume" element={<UserForm />} />
        </Route>


        
      </Route>
    </Routes>
  );
}

export default App;