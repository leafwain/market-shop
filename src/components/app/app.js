import { Routes, Route } from 'react-router-dom';
import Header from '../header/';
import { AllProducts, Smartphones, Furniture, Laptops, HomeDecoration, Groceries, Cart } from '../pages';

const App = () => {

  return (
    <>
      <Header /> 
      <Routes>
          <Route path="/" element={<AllProducts />}/>
          <Route path="/smartphones" element={<Smartphones />}/>
          <Route path="/furniture" element={<Furniture />}/>
          <Route path="/laptops" element={<Laptops />}/>
          <Route path="/home-decoration" element={<HomeDecoration />}/>
          <Route path="/groceries" element={<Groceries />}/>
          <Route path="/cart" element={<Cart />}/>
      </Routes>           
    </>
  );
}

export default App;
