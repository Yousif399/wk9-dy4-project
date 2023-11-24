import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import '../css/navbar.css'
import { DataContext } from '../context/DataProvider';
import { useContext, useEffect } from 'react';
import { useAuth, useSigninCheck, useDatabase, useUser } from 'reactfire';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { get, ref, child } from 'firebase/database';




const MyNav = () => {
    const { cart, setCart } = useContext(DataContext);
    const db = useDatabase();

    const auth = useAuth();
    const { data: user } = useUser();
    const { signinStatus } = useSigninCheck();
    const signin = async () => {
        let provider = new GoogleAuthProvider();
        let user = await signInWithPopup(auth, provider);
        console.log(user)

    }
    const signout = async () => {

        await signOut(auth).then(() => console.log('u have benn signed out'))
        
    }

    useEffect(() => {
        if (user) {
            get(child(ref(db), `cart/${user.uid}`)).then((snapshot) => {
                if (snapshot.exists()) {
                    console.log('snapppp',snapshot.val());
                    setCart(snapshot.val());
                } else {
                    console.log('no data avilable');
                }
            }).catch((error) => {
                console.error(error);
            });
        } else {
            setCart({ size: 0, tota: 0, bike: {} });
        }
    }, [user])





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

                            {
                                signinStatus == 'loading' ?
                                    <Button variant='dark' disabled> Looadignnnnn....</Button> :
                                    user ?
                                        <>
                                            <span>{user.displayName}</span>
                                            <Button variant='dark' onClick={signout}> Log-out</Button>
                                        </> :
                                        <Button variant='dark' onClick={signin}> Log-in</Button>
                            }
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