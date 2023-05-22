import { Routes, Route } from 'react-router-dom';
import Header from '../header/';
import { AllProducts, Smartphones, Furniture, Laptops, HomeDecoration, Groceries, Cart } from '../pages';

const App = () => {

  return (
    <>
      <Header /> 
      <Routes>
          <Route path="https://leafwain.github.io/market-shop/" element={<AllProducts />}/>
          <Route path="https://leafwain.github.io/market-shop/smartphones" element={<Smartphones />}/>
          <Route path="https://leafwain.github.io/market-shop/furniture" element={<Furniture />}/>
          <Route path="https://leafwain.github.io/market-shop/laptops" element={<Laptops />}/>
          <Route path="https://leafwain.github.io/market-shop/home-decoration" element={<HomeDecoration />}/>
          <Route path="https://leafwain.github.io/market-shop/groceries" element={<Groceries />}/>
          <Route path="https://leafwain.github.io/market-shop/cart" element={<Cart />}/>
      </Routes>           
    </>
  );
}

export default App;
