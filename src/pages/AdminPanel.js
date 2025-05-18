import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminPanel() {
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPayments = async (monthToFetch) => {
    setLoading(true);
    try {
      const res = await axios.get(`/admin/payments/${monthToFetch}`);
      setPayments(res.data);
    } catch (e) {
      alert('Failed to load payments');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPayments(month);
  }, [month]);

  const markCompleted = async (paymentId) => {
    try {
      await axios.patch(`/admin/payments/${paymentId}/complete`);
      setPayments((prev) =>
        prev.map((p) => (p._id === paymentId ? { ...p, status: 'Completed' } : p))
      );
    } catch {
      alert('Failed to mark completed');
    }
  };

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>
      <label>
        Select Month:
        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />
      </label>
      {loading ? (
        <p>Loading payments...</p>
      ) : payments.length === 0 ? (
        <p>No payments for this month.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Payee</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Screenshot</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p._id}>
                <td>{p.payeeName}</td>
                <td>{p.reason || '-'}</td>
                <td>{p.status}</td>
                <td>
                  <a href={p.screenshotUrl} target="_blank" rel="noopener noreferrer">
                    View
                  </a>
                </td>
                <td>
                  {p.status !== 'Completed' && (
                    <button onClick={() => markCompleted(p._id)}>Mark Completed</button>
                  )}
                  {p.status === 'Completed' && <span>✓</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
