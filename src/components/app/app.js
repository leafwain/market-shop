import { Routes, Route } from 'react-router-dom';
import Header from '../header/';
import { AllProducts, Smartphones, Furniture, Laptops, HomeDecoration, Groceries, Cart, ProductDetails } from '../pages';

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
          <Route path="/products/:productId" element={<ProductDetails />}/>
      </Routes>           
    </>
  );
}

export default App;
