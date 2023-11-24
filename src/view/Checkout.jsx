import React from 'react'
import  { useState, useEffect, useContext } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { DataContext } from '../context/DataProvider';
import CheckoutForm from '../comp/CheckoutForm';

const stripePromise = loadStripe("pk_test_51NW2QMEErEia9RStlcpJ8XeW359kPi94yjjGUO3ZcFb6G6aDRRlKFyTwvsRLyh1nwH199jw77EOQqbjAH6gT9mzp00V1keMRaJ");

const Checkout = () => {
    const [clientSecret, setClientSecret] = useState("");
    const { cart } = useContext(DataContext)

    useEffect(() => {
        fetch('https://bike-flask.onrender.com/pay/create-payment-intent', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cart),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, []);
    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };
    return (
        <>
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm/>
                </Elements>
            )}
        </>
    )
}

export default Checkout

// http://127.0.0.1:5000/pay/create-payment-intent