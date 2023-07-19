import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import '../css/navbar.css'
import { DataContext } from '../context/DataProvider';
import { useContext } from 'react';


const MyNav = () => {
    const { cart, setCart } = useContext(DataContext)



    return (
        <>
            <div id='navbar'>
                <Navbar className='py-3 shadow-sm' bg="black" data-bs-theme="dark">
                    <Container>

                        <Link className="navbar-brand fw-bold fs-4" to="/">FuN RiDe</Link>
                        <Nav className="mx-auto mb-2 mb-lg-0">
                            <Link className="navbar-brand" to="/">Home</Link>
                            <Link className="navbar-brand" to="/shop">Shop</Link>
                            <Link className="navbar-brand" to="/bike">Bike</Link>
                        </Nav>

                    </Container>
                    {cart.size > 0 ? <div className="cart-cont" >
                        <div className="crt  ms-2 ">
                            <Link id='cart' to='/cart' ><Button> Cart({cart.size}) <i className="fa fa-cart-arrow-down me-3" aria-hidden="true"></i></Button></Link>

                        </div>
                    </div> : <div className="cart-cont" >
                        <div className="crt  ms-2 ">
                            <Link id='cart1' to='/shop' ><Button> Cart({cart.size}) <i className="fa fa-cart-arrow-down me-3" aria-hidden="true"></i></Button></Link>

                        </div>
                    </div>}



                </Navbar>


            </div>


        </>
    )
}

export default MyNav;