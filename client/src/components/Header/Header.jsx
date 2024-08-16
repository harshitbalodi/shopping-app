import './Header.css';
import CartIcon from '../../assets/custom-svg-react-icon/CartIcon';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="company-name">Product-versal</div>
        <div className="cart-icon">
          <CartIcon height="20" width="20" color="#fff" />
          <div>Cart</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
