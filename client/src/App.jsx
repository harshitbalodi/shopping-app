import {Route, Routes, BrowserRouter as Router} from 'react-router-dom';
import ProductList from './components/ProductList/ProductList';
import Cart from './components/Cart/Cart';
import Header from './components/Header/Header';
import './App.css';

function App() {

  return (
    <Router>
      <div className='App'>
        <Header/>
        <Routes>
          <Route path='/' element={<ProductList/>}/>
          <Route path='/cart' element={<Cart/>}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App
