
// import './App.css';
import AppLayout from './component/AppLayout';

import ProductProvider from './context/productContext';


function App() {
  return (
    <ProductProvider>
      <AppLayout/>
    </ProductProvider>
  );
}

export default App;
