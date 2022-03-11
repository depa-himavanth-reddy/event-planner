import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import UserRegistration from './pages/UserRegistration';
import Events from './pages/Events';
import EventCreationPage from './pages/EventCreationPage';
import EventDetails from './pages/EventDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element ={<UserRegistration/>} />
        <Route path='/events' element ={<Events/>} />
        <Route path='/create_event' element ={<EventCreationPage/>} />        
        <Route path='/event_details/:eventID' element ={<EventDetails/>} />        
      </Routes>
    </Router>
  );
}

export default App;
