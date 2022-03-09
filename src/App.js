import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import UserRegistration from './pages/UserRegistration';
function App() {
  return (
    <Router>
      <Routes>
        <Route path=''><UserRegistration /></Route>
      </Routes>
    </Router>
  );
}

export default App;
