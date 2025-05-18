import React from 'react';

export default function UserPaymentsList({ payments, selectedMonth, userId, loading }) {
  if (loading) return <p>Loading payments...</p>;

  const monthPayments = payments.filter(p => p.month === selectedMonth);

  // Show all users payments in month; assume payments contain user info
  if (monthPayments.length === 0) return <p>No payments found for this month.</p>;

  return (
    <div className="payments-list">
      <h3>Payments for {selectedMonth}</h3>
      <table>
        <thead>
          <tr>
            <th>Payee</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Screenshot</th>
          </tr>
        </thead>
        <tbody>
          {monthPayments.map(p => (
            <tr key={p._id} className={p.payeeId === userId ? 'highlight-row' : ''}>
              <td>{p.payeeName}</td>
              <td>{p.reason || '-'}</td>
              <td>{p.status}</td>
              <td>
                <a href={p.screenshotUrl} target="_blank" rel="noopener noreferrer">
                  View
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
