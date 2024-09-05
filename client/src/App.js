import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [orderId, setOrderId] = useState('');
  const [orderDetails, setOrderDetails] = useState('');

  const createUser = async () => {
    try {
      const response = await axios.post('http://localhost:3002/create-user', { username, email });
      alert(response.data.message);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const createOrder = async () => {
    try {
      const response = await axios.post('http://localhost:3002/create-order', { orderId, details: orderDetails });
      alert(response.data.message);
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  return (
    <div>
      <h1>Create User and Order</h1>
      
      <div>
        <h2>User Information</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={createUser}>Create User</button>
      </div>

      <div>
        <h2>Order Information</h2>
        <input
          type="text"
          placeholder="Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Order Details"
          value={orderDetails}
          onChange={(e) => setOrderDetails(e.target.value)}
        />
        <button onClick={createOrder}>Create Order</button>
      </div>
    </div>
  );
}

export default App;
