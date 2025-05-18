import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import UploadPayment from '../components/UploadPayment';
import UserPaymentsList from '../components/UserPaymentsList';

function monthToYYYYMM(date) {
  return date.toISOString().slice(0, 7);
}

export default function Dashboard({ user }) {
  const [selectedMonth, setSelectedMonth] = useState(monthToYYYYMM(new Date()));
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch user payments
  useEffect(() => {
    const fetchPayments = async () => {
      setLoading(true);
      try {
        const res = await axios.get('/payments');
        setPayments(res.data);
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    };
    fetchPayments();
  }, []);

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <Calendar
        onClickMonth={(date) => setSelectedMonth(monthToYYYYMM(date))}
        view="year"
        activeStartDate={new Date(selectedMonth + '-01')}
      />
      <p>Selected Month: {selectedMonth}</p>

      <UploadPayment
        user={user}
        selectedMonth={selectedMonth}
        onPaymentUploaded={(newPayment) => setPayments([...payments, newPayment])}
      />

      <UserPaymentsList payments={payments} selectedMonth={selectedMonth} userId={user._id} loading={loading} />
    </div>
  );
}
