import { useEffect, useState } from 'react'
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import '../css/checkout.css'

const CheckoutForm = () => {

    const stripe = useStripe();
    const elements = useElements();
    //    create payment intent (cart going to flask)
    //    if loded submit payment
    //    processiing of payment
    //    show status (went or no)
    //    show msg

    const [showPay, setShowPay] = useState(true);
    const [showForm, setShowForm] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');

    const handlePay = async (e) => {
        e.preventDefault();
        setShowPay(false); //disable form 
        const data = await stripe.confirmPayment({
            elements,
            redirect: 'if_required'
        });
        console.log('payement recived: ', data);
        if (data['error']) {
            console.log(data['error']['code']);
            setErrorMsg(data['error']['message']);
            setShowForm('error');
        } else {
            setShowForm(false);
        }

    }

    return (
        <div className="conatiner">
            {
                showForm === true ?
                    <form id="payment" onSubmit={handlePay}>
                        <PaymentElement id="payment-element " />
                        <button className='form' disabled={!showPay || !elements || !stripe} id="submit-form " >
                            <span id="button-text">
                                {showPay ? 'Submit Payemnt' : 'Processing....'}
                            </span>
                        </button>
                    </form>
                    :
                    showForm === 'error' ?
                        <>
                            <h3>Something went wrong try again later</h3>
                            <h4>{errorMsg}</h4>
                        </>
                        :
                        <h2>Payement Accepted Thank you So Much</h2>
            }
        </div>
    )
}
export default CheckoutForm