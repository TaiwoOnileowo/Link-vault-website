"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Subscribe = () => {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleSubscribe = async () => {
    const response = await fetch('/api/payments/initialize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        amount:1600,
        plan: 'PLN_xlqts3wsmhzzcvt', 
      }),
    });

    const data = await response.json();
    console.log(data);
    if (response.ok) {
      router.push(data.authorization_url);
    } else {
      console.error('Payment initialization failed:', data);
    }
  };

  return (
    <div>
      <h1>Subscribe to Premium Plan</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />
      <button onClick={handleSubscribe}>Subscribe</button>
    </div>
  );
};

export default Subscribe;
