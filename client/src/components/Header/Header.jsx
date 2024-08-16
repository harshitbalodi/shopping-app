import './Header.css';
import CartIcon from '../../assets/custom-svg-react-icon/CartIcon';
import {Link} from 'react-router-dom'

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="company-name">Product-versal</Link>
        <Link to="/cart" className="cart-icon">
          <CartIcon height="20" width="20" color="#fff" />
          <div>Cart</div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
