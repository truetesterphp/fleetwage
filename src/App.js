import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './Component/home';
import CompanyStationPage from './Component/CompanyStationPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:company/:station" element={<CompanyStationPage />} />
      </Routes>
    </Router>  
  );
};

export default App;
