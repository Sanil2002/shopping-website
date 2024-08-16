
import { Button, Container, Nav, Navbar as NavbarBs, Dropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
// import { useShoppingcart } from '../Context/Shoppingcartcontext';
import { useSelector, useDispatch } from 'react-redux';
import logo from '../assets/logo.png';
import LoginButton from './LoginButton';
import { useAuth0 } from '@auth0/auth0-react';
// import ButtonComponent from '../Utilities/ButtonComponent';
import LogoutButton from './LogoutButtton';
import { RootState } from '../app/store';
import { openCart } from '../features/cartSlice';
// import ButtonComponent from '../Utilities/ButtonComponent';
// import Profile from '../Pages/Profile';

interface CartButtonProps {
  variant: string;
  className: string;
  onClick: () => void;
  quantity: number;
}



const CartButton: React.FC<CartButtonProps> = ({ variant, className, onClick, quantity }) => {


  return (
    <Button variant={variant}
      className={`${className} relative flex items-center justify-center`}
      onClick={onClick}>
      <FontAwesomeIcon icon={faShoppingCart} size="lg" />
      <span className="absolute -top-6 -right-5 flex items-center justify-center w-10 h-10 text-2xl font-extrabold bg-white text-red-700 rounded-full">
        {quantity}
      </span>
    </Button>
  );
};

export function Navbar() {

  // const { openCart, cartQuantity } = useShoppingcart();
  const cartQuantity = useSelector((state: RootState) => state.cart.items.length);
  const { isAuthenticated, user } = useAuth0();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  console.log("useruseruseruser", user)
  const dispatch = useDispatch();

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
  <div className='sticky top-0 z-50'> 
    <NavbarBs className="bg-yellow-300 shadow-sm mb-3 pl-4 pr-8">
      <Container className="relative p-4 flex justify-between items-center">
        <img src={logo} alt="logo" className="h-20 w-20" />
        {/* <NavbarBs.Toggle aria-controls='basic-navbar-nav' /> */}
          <Nav className='md:flex-grow flex items-center text-4xl font-bold'>
            <Nav.Link
              className="pl-5 p-3 text-gray-800 hover:text-pretty duration-700 hover:-translate-y-1 hover:no-underline"
              to="/"
              as={NavLink}>
              Home
            </Nav.Link>
            <Nav.Link
              className="p-3 text-gray-800 hover:text-pretty duration-300 hover:-translate-y-1 hover:no-underline"
              to="/Store"
              as={NavLink}>
              Store
            </Nav.Link>
            <Nav.Link
              className="p-3 text-gray-800 hover:text-pretty duration-300 hover:-translate-y-1 hover:no-underline"
              to="/About"
              as={NavLink}>
              About
            </Nav.Link>
          </Nav>
          <div className="flex gap-7 items-center">
            <Nav>
              {isAuthenticated ? (
                <>
                  <Dropdown align="end" show={dropdownOpen} onClick={toggleDropdown} className='flex flex-col pr-3 gap-10 items-center text-black text-lg' >
                    <Dropdown.Toggle as="div" className="cursor-pointer" onClick={toggleDropdown}>
                      <img src={user?.picture} alt={user?.name} className="w-12 rounded-lg duration-300 drop-shadow-sm shadow-lg hover:shadow-slate-700 hover:-translate-y-2" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu className='items-center text-black text-xl focus:outline-none  hover:translate-y-2 pl-3 '>
                      <Dropdown.Item as={NavLink} to="/Profile" className='pl-4 font-bold '>
                        <div className='flex flex-row gap-2 py-3'>
                          <div className='-py-1'>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              aria-hidden="true"
                              className="w-7 h-7"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              stroke-width="2"
                              stroke="currentColor"
                              fill="none"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            >
                              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                              <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path>
                              <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
                            </svg>
                          </div>
                          <div className='pl-2'>
                            Profile
                          </div>
                        </div>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <div className='flex flex-row py-4'>
                          <div className='py-5 pl-1'>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              aria-hidden="true"
                              className="w-7 h-7"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              stroke-width="2"
                              stroke="currentColor"
                              fill="none"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            >
                              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                              <path
                                d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"
                              ></path>
                              <path d="M9 12h12l-3 -3"></path>
                              <path d="M18 15l3 -3"></path>
                            </svg>
                          </div>
                          <LogoutButton />
                        </div>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </>
              ) : (
                <LoginButton />
              )}
            </Nav>
            <Nav className="ms-auto flex items-center">
              <CartButton
                variant="outline-primary"
                className="relative hover:-translate-y-2 duration-300 drop-shadow-sm flex items-center justify-center text-white bg-black rounded-full hover:bg-red-600 transition-colors shadow-lg hover:shadow-slate-700"
                onClick={() => dispatch(openCart())}
                quantity={cartQuantity}
              />
            </Nav>
          </div>
      </Container>
    </NavbarBs>
  </div>  
  );
}



