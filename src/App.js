import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/header/header';
import Options from './components/options/options';
import Students from './components/students/students';
import Complaints from './components/complaints/complaints';
import AdminLogin from './components/adminLogin/adminLogin';
import AdminHome from './components/adminHome/adminHome';
import ProtectedRoute from './components/common/protectedRoute';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <div className="optionsAppDiv">
                <Options />
              </div>
            }
          />
          <Route path='/students' element={<div className="optionsAppDiv">
                <Students />
              </div>}></Route>
          <Route path='/admin' element={<div className="optionsAppDiv">
                <AdminLogin />
              </div>}></Route>
          <Route path='/complaints' element={<div className="optionsAppDiv">
                <Complaints />
              </div>}></Route>
          <Route path='/admin/home' element={
            <ProtectedRoute>
              <AdminHome/>
            </ProtectedRoute>
          }></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
