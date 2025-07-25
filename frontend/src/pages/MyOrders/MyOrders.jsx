// import React, { useContext, useEffect, useState } from 'react'
// import './MyOrders.css'
// import { StoreContext } from '../../context/StoreContext';
// import axios from 'axios';
// import { assets } from '../../assets/assets';

// const MyOrders = () => {

//   const { url, token } = useContext(StoreContext);
//   const [data, setData] = useState([]);

//   const fetchOrders = async () => {
//     const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
//     setData(response.data.data);
//   }

//   useEffect(() => {
//     if (token) {
//       fetchOrders()
//     }
//   }, [token])

//   return (
//     <div className='my-orders'>
//       <h2>My Orders</h2>
//       <div className="container">
//         {data.map((order, index) => {
//           return (
//             <div key={index} className="my-orders-order">
//               <img src={assets.food_delivery} alt=""/>
//               <p>{order.items.map((item, index) => {
//                 if (index === order.items.length - 1) {
//                   return item.name + " x " + item.quantity
//                 }
//                 else {
//                   return item.name + " x " + item.quantity + ", "
//                 }
//               })}</p>
//               <p>${order.amount}.00</p>
//               <p>Items:{order.items.length}</p>
//               <p>
//                 <span>&#x25cf; </span>
//                 <b>{order.status}</b>
//               </p>
//               <button onClick={fetchOrders}>Track Order</button>
//             </div>

//           )
//         })}
//       </div>
//     </div>
//   )
// }

// export default MyOrders


import React, { useContext, useEffect, useState } from 'react';
import './MyOrders.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [dateRange, setDateRange] = useState({ from: '', to: '' });

  // Fetch orders from API
  const fetchOrders = async () => {
    const response = await axios.post(url + '/api/order/userorders', {}, { headers: { token } });
    setData(response.data.data);
    setFilteredData(response.data.data); // Initialize filtered data
  };

  // Filter orders based on date range
  const filterOrders = () => {
    if (!dateRange.from || !dateRange.to) {
      setFilteredData(data); // Reset to all data if no range is selected
      return;
    }

    const from = new Date(dateRange.from).getTime();
    const to = new Date(dateRange.to).getTime();

    const filtered = data.filter((order) => {
      const orderDate = new Date(order.date).getTime();
      return orderDate >= from && orderDate <= to;
    });

    setFilteredData(filtered);
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className='my-orders'>
      <h2>My Orders</h2>

      {/* Date Range Filter */}
      <div className="date-filter">
        <label>
          From:
          <input
            type="date"
            value={dateRange.from}
            onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
          />
        </label>
        <label>
          To:
          <input
            type="date"
            value={dateRange.to}
            onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
          />
        </label>
        <button onClick={filterOrders}>Apply Filter</button>
        <button onClick={() => window.location.reload()}>Reset</button>
      </div>

      <div className="container">
        {filteredData.map((order, index) => (
          <div key={index} className="my-orders-order">
            <img src={assets.food_delivery} alt="" />
            <p>
              {order.items.map((item, index) =>
                index === order.items.length - 1
                  ? `${item.name} x ${item.quantity}`
                  : `${item.name} x ${item.quantity}, `
              )}
            </p>
            <p>${order.amount}.00</p>
            <p>Items: {order.items.length}</p>
            <p>Date: {new Date(order.date).toLocaleDateString()}</p>
            <p>
              <span>&#x25cf; </span>
              <b>{order.status}</b>
            </p>
            <button onClick={fetchOrders} >Track Order</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
