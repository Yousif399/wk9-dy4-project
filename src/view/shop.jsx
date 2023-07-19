import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { DataContext } from "../context/DataProvider";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import '../css/shop.css'
import 'react-loading-skeleton/dist/skeleton.css'
import BikeInfo from "./bike";
const ShopBikes = () => {
  useEffect(() => { console.log('shop has been rendered or re-rendered') });

  const getBike = async () => {
    let response = await axios.get('http://127.0.0.1:5000/api/bike');
    console.log('response', response)
    return response.status === 200 ? response.data : 'no data'
  }

  const loadBike = async () => {
    let data = await getBike();
    setBike(data.bike);

  }
  const [bike, setBike] = useState(() => loadBike());
  const { cart, setCart } = useContext(DataContext)

  const addBike = (bike) => {
    let copyCart = { ...cart };
    copyCart.size++;
    copyCart.total += Math.floor(bike.price * 100) / 100
    copyCart.bike[bike.id] ?
      copyCart.bike[bike.id].quantity++
      :
      copyCart.bike[bike.id] = { data: bike, quantity: 1 }
    console.log('hello', copyCart);
    setCart(copyCart);


  }

  return (
    <>
      {/* <div className=" col-md-5 mb-4"> */}
      {console.log(bike)}
      {bike && bike.length > 0 ? bike.map((b, index) => {
        return <>

          <Card key={index} id="shop" className=" h-100 text-center p-4 d " >
            <div className="row" >
              <div className="col">
                <Card.Img className="img-shop" height='200px' variant="top" src={b.img} alt={b.title} />
              </div>
              <div id="txt-shop" className="col">
                <Card.Body className="body">
                  <Card.Title id="title-shop">{b.title}</Card.Title>
                  <Card.Text className="other-txt">{b.make}</Card.Text>
                  <Card.Text className="other-txt">{b.rating} <i className="fa fa-star-half-o" aria-hidden="true"></i>
                  </Card.Text>
                  <Card.Text className="other-txt">{b.year}</Card.Text>
                  <Card.Text className="other-txt">${b.price}</Card.Text>
                  <span className="shop-btn">
                    <Link className="add-btn" to='/cart' ><Button className="btn-outline" onClick={()=>addBike(b)} >Buy</Button></Link>
                    <Button className="add-btn" variant="outline-dark" onClick={() => addBike(b)} > Add to Cart
                    </Button>
                  </span>
                </Card.Body>
              </div>
            </div>
          </Card>

        </>
      }) :
        <>
          <div className="col-md-3">
            <Skeleton height={550} width={500} />
          </div>
          <div className="col-md-3">
            <Skeleton height={550} width={500} />
          </div>
          <div className="col-md-3">
            <Skeleton height={550} width={500} />
          </div>
        </>
      }
      {/* </div> */}
    </>
  )


}

export default ShopBikes;