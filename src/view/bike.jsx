
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../context/DataProvider";
import { Button } from "react-bootstrap";
import '../css/bike.css'
import Skeleton from "react-loading-skeleton";
import Home from "./home";




const BikeInfo = () => {
  const { cart, setCart } = useContext(DataContext)


  const AddBike = (id) => {
    let copyCart = { ...cart };
    console.log(copyCart)
    copyCart.size++;
    copyCart.total += Math.floor(copyCart.bike[id].data.price * 100) / 100
    copyCart.bike[id].quantity++;
    setCart(copyCart);
  }
  const DeleteBike = (id) => {
    let copyCart = { ...cart };
    copyCart.size -= copyCart.bike[id].quantity
    copyCart.total -= Math.floor(copyCart.bike[id].quantity * copyCart.bike[id].price * 100) / 100;
    delete copyCart.bike[id]
    setCart(copyCart);
  }




  return (
    <>
      <h1>Bikes Overview</h1>
      {Object.values(cart.bike).map((b, index) => {

        return (
          <>
            <div className="container" key={b.index}>
              <div className="row">
                <div className="col-4">
                  <img src={b.data.img} alt={b.data.title} height='250' width=''></img>

                  <h1 className="text-uppercase text-black-50">{b.data.title}</h1>
                  <h3 className="display-5" >Make: {b.data.make}</h3>
                  <p className="lead fw-bold">
                    rating {b.data.rating} <i className="fa fa-star"></i>
                  </p>
                  <h3 className="display-5 fw-bold my-4" >${b.data.price}</h3>
                  <h2 className="lead">Model: {b.data.model}</h2>
                  <h2 className="lead">Year: {b.data.year}</h2>
                </div>

                <div className="col">
                  {/* <Button id="add-btn" variant="success">Add to cart</Button> */}
                  <Button className="btn-cl-de" variant="dark" onClick={() => DeleteBike(b.data.id)}>clear</Button>

                </div>
                <hr></hr>
              </div>
            </div>
          </>
        )

      })}


    </>
  )
}

export default BikeInfo;







