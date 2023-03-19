import Dashboard from "./components/Dashboard/Dashboard";
import ProductsProvider from "./context/productsContext";
import { Routes, Route } from "react-router-dom";
import Root from "./routes/root";
import Favorite from "./pages/favorite/favorite";
import HomePage from "./pages/homePage/homePage";

function App() {
  return (
    <ProductsProvider >
      <Routes>
       <Route path='/' element={<Root />}>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/favorite' element={<Favorite />}></Route>
        </Route>
      </Routes>
    </ProductsProvider>
  );
}

export default App;
