import React, { useEffect, useState } from 'react';
import './Orders.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [statistics, setStatistics] = useState({
    foodProcessing: 0,
    onYourWay: 0,
    delivered: 0,
    totalRevenue: 0,
  });

  // Fetch all orders
  const fetchAllOrders = async () => {
    const response = await axios.get(url + '/api/order/list');
    if (response.data.success) {
      setOrders(response.data.data);
      calculateStatistics(response.data.data);
    } else {
      toast.error('Error fetching orders');
    }
  };

  // Calculate statistics for the chart and total revenue
  const calculateStatistics = (orders) => {
    let foodProcessing = 0;
    let onYourWay = 0;
    let delivered = 0;
    let totalRevenue = 0;

    orders.forEach((order) => {
      if (order.status === 'Food Processing') foodProcessing++;
      if (order.status === 'On your way') onYourWay++;
      if (order.status === 'Delivered') delivered++;
      totalRevenue += order.amount;
    });

    setStatistics({ foodProcessing, onYourWay, delivered, totalRevenue });
  };

  // Handle order status change
  const statusHandler = async (event, orderId) => {
    const response = await axios.post(url + '/api/order/status', {
      orderId,
      status: event.target.value,
    });
    if (response.data.success) {
      await fetchAllOrders();
    } else {
      toast.error('Error updating order status');
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  // Data for the bar chart
  const chartData = {
    labels: ['Food Processing', 'On your way', 'Delivered'],
    datasets: [
      {
        label: 'Order Status',
        data: [
          statistics.foodProcessing,
          statistics.onYourWay,
          statistics.delivered,
        ],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(75, 192, 192, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(75, 192, 192, 1)'],
        borderWidth: 1,
      },
    ],
  };

  // Options for the bar chart
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Order Status Statistics',
      },
    },
  };

  return (
    <div className="order-page">
      <h3>Order Management</h3>

      {/* Statistics Overview */}
      <div className="order-summary">
        <div className="summary-item">
          <h4>Total Orders</h4>
          <p>{orders.length}</p>
        </div>
        <div className="summary-item">
          <h4>Total Revenue</h4>
          <p>${statistics.totalRevenue.toFixed(2)}</p>
        </div>
      </div>

      {/* Statistics Chart */}
      <div className="order-statistics-chart">
        <Bar data={chartData} options={chartOptions} />
      </div>

      {/* Orders List */}
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.food_delivery} alt="Order Icon" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, index) => (
                  <span key={index}>{item.name} x {item.quantity}{index !== order.items.length - 1 ? ', ' : ''}</span>
                ))}
              </p>
              <p className="order-item-name">{order.address.firstName} {order.address.lastName}</p>
              <p className="order-item-address">{order.address.street}, {order.address.city}</p>
              <p className="order-item-phone">{order.address.phone}</p>
              <p className="order-item-date">
                <strong>Order Date:</strong> {new Date(order.date).toLocaleDateString()}
              </p>
            </div>
            <p>Items: {order.items.length}</p>
            <p>${order.amount.toFixed(2)}</p>
            <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="On your way">On your way</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;

