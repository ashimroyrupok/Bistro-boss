import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";
import useAuth from "../../../hooks/useAuth";

const CheckoutForm = () => {
    const stripe = useStripe()
    const [error, setError] = useState('')
    const [transectionId, setTransectionId] =useState('')
    const { user } = useAuth()
    const elements = useElements()
    const axiosSecure = useAxiosSecure()
    const [cart] = useCart()
    const [clientSecret, setClientSecret] = useState('')

    const totalPrice = cart?.reduce((total, item) => total + item.price, 0)

    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret)
                })
        }
    }, [axiosSecure, totalPrice])





    const handleSubmit = async (event) => {
        event.preventDefault()
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement)
        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            setError(error.message)
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setError('')
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || "anonymous",
                        name: user?.displayName || "anonymous"
                    },
                },
            },
        );

        if (confirmError) {
            console.log(confirmError, "confirm error");
        }
        else {
            console.log(paymentIntent, "payment intent");
            if (paymentIntent.status === "succeeded") {

                setTransectionId(paymentIntent?.id)
                // 

             }


        }

    }


        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                    />
                    <button className="btn btn-primary btn-sm my-5" type="submit" disabled={!stripe || !clientSecret}>
                        Pay
                    </button>
                </form>

                <p className="text-red-600"> {error} </p>
                <p className="text-green-600"> Your Transaction id is: {transectionId} </p>

            </div>
        );
    };


export default CheckoutForm;