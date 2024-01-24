import { Routes, Route } from 'react-router-dom';
import Login from './Login/Login.js';
import UserHome from './Customer/UserHome.js';
import UserConfirm from './Customer/UserConfirm.js';
import Purchase from './Customer/Purchase.js';
import DealerHome from './Dealer/DealerHome.js';
import DealerInventory from './Dealer/DealerInventory.js';
import DealerConfirm from './Dealer/DealerConfirm.js';
import Sales from './Dealer/Sales.js';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/userhome" element={<UserHome />} />
      <Route path="/userconfirm" element={<UserConfirm />} />
      <Route path="/userpurchase" element={<Purchase />} />
      <Route path="/dealerhome" element={<DealerHome />} />
      <Route path="/dealerinventory" element={<DealerInventory />} />
      <Route path="/dealerconfirm" element={<DealerConfirm />} />
      <Route path="/dealersales" element={<Sales />} />
    </Routes>
  );
}

export default App;