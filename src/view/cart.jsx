import { useContext } from "react";
import { DataContext } from "../context/DataProvider";
import Button from 'react-bootstrap/Button';
import '../css/cart.css'
import { useDatabase, useUser } from "reactfire";
import { set, ref } from "firebase/database";

const Cart = () => {
  const { cart, setCart } = useContext(DataContext)

  const db = useDatabase();
  const { data: user } = useUser();




  const ClearCart = () => {
    if (user) {
      set(ref(db , 'cart/' + user.uid), null)
    }
    setCart({ size: 0, tota: 0, bike: {} });

  }
  const AddBike = (id) => {
    let copyCart = { ...cart };
    console.log(copyCart)
    copyCart.size++;
    copyCart.total += Math.floor(copyCart.bike[id].data.price * 100) / 100
    copyCart.bike[id].quantity++;
    if (user) {
      set(ref(db, 'cart/' + user.uid), copyCart);
    }
    setCart(copyCart);
  }
  const RemoveBike = (id) => {
    let copyCart = { ...cart };
    copyCart.size--;
    copyCart.total -= Math.floor(copyCart.bike[id].data.price * 100) / 100
    copyCart.bike[id].quantity > 1 ?
      copyCart.bike[id].quantity--
      : delete copyCart.bike[id]
    if (user) {
      set(ref(db, 'cart/' + user.uid), copyCart)
    }
    setCart(copyCart);
  }
  const DeleteBike = (id) => {
    let copyCart = { ...cart };
    copyCart.size -= copyCart.bike[id].quantity
    copyCart.total -= copyCart.bike[id].quantity * (Math.floor(copyCart.bike[id].data.price * 100) / 100);
    delete copyCart.bike[id]
  
    if (user) {
      set(ref(db, 'cart/' + user.uid), copyCart)
    }
    setCart(copyCart);
  }

 
  return (
    <>
      <h1 id="cart" className="d-flex justify-content-center">CART <i className="fa fa-cart-arrow-down me-3" aria-hidden="true"></i></h1>

      {Object.values(cart.bike).map((b, index) => {
        return (

          <div className="container" key={index}>
            <div className="row">
              <div className="col-md-5">
                <img src={b.data.img} alt={b.data.title} height='250' width='250'></img>
                <h1 className="text-uppercase text-black-50">{b.data.title}</h1>
                <h3 className="display-5" >{b.data.make}</h3>
                <p className="lead fw-bold">
                  rating {b.data.rating} <i className="fa fa-star"></i>
                </p>
                <h3 className="display-5 fw-bold my-4" >${b.data.price}</h3>
                <h2 className="lead">{b.data.model}</h2>
                <h2 className="lead">{b.data.year}</h2>
                <Button className="btn-cl-de" variant="dark" onClick={() => DeleteBike(b.data.id)}>clear</Button>
                <Button className="btn-cl-de" variant="danger" onClick={() => ClearCart()}>Delete</Button>
                <div className="tot">{cart.total ? <h4>Total: <i className="fa fa-usd" aria-hidden="true"></i>
                  {cart.total}</h4> : null}
                  <Button href="/check-out" variant="success" >check out</Button>
                </div>
              </div>
              <div className="col-5 d-flex-justify-content-center">
                <span className="span">
                  <Button  className="add-btn-cart" variant="secondary" onClick={() => AddBike(b.data.id)}>add</Button>
                  <h2 className="quan">{b.quantity}</h2>
                  <Button variant="light" onClick={() => RemoveBike(b.data.id)}>remove</Button>
                </span>

              </div>
              <hr></hr>
            </div>
          </div>

        )

      })}

    </>
  )
}

export default Cart;