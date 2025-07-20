import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import useAxios from '../../Utilities/Axios/UseAxios';

const CheckOutBox = () => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxios();

  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements || !amount || !name || !email) return;

    const takaAmount = parseFloat(amount);
    if (takaAmount < 10) {
      Swal.fire('Error', 'Minimum payment amount is ৳10', 'error');
      return;
    }

    setLoading(true);

    try {
      // Step 1: Create payment intent (backend expects Taka)
      const res = await axiosSecure.post('/create-payment-intent', {
        amount: takaAmount,
      });

      const clientSecret = res.data.clientSecret;

      // Step 2: Confirm payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name,
            email,
          },
        },
      });

      if (result.error) {
        Swal.fire('Error', result.error.message, 'error');
      } else if (result.paymentIntent.status === 'succeeded') {
        // Step 3: Save payment
        await axiosSecure.post('/payments', {
          amount: takaAmount,
          name,
          email,
          transactionId: result.paymentIntent.id,
          date: new Date(),
        });

        Swal.fire('Success', 'Payment completed successfully!', 'success');
        setAmount('');
        setName('');
        setEmail('');
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Payment failed. Try again.', 'error');
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Cardholder Name"
        required
        className="input input-bordered w-full"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email Address"
        required
        className="input input-bordered w-full"
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter Amount (৳)"
        required
        className="input input-bordered w-full"
        min="10"
      />
      <div className="p-4 border rounded">
        <CardElement />
      </div>
      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={!stripe || loading}
      >
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  );
};

export default CheckOutBox;
