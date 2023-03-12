import Dashboard from "./components/Dashboard/Dashboard";
import ProductsProvider from "./context/productsContext";

function App() {
  return (
    <ProductsProvider >
      <Dashboard />
    </ProductsProvider>
  );
}

export default App;
