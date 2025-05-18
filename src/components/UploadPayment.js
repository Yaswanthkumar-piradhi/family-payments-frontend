import React, { useState } from 'react';
import axios from 'axios';

export default function UploadPayment({ user, selectedMonth, onPaymentUploaded }) {
  const [reason, setReason] = useState('');
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const submit = async e => {
    e.preventDefault();
    setStatus('');
    setError('');
    if (!file) return setError('Please upload a screenshot.');

    const formData = new FormData();
    formData.append('screenshot', file);
    formData.append('payeeName', user.name);
    formData.append('payeeId', user._id);
    formData.append('month', selectedMonth);
    formData.append('reason', reason);

    try {
      const res = await axios.post('/payments', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setStatus('Payment uploaded successfully. Awaiting admin approval.');
      onPaymentUploaded(res.data);
      setReason('');
      setFile(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed');
    }
  };

  return (
    <div className="upload-payment">
      <h3>Upload Payment Screenshot for {selectedMonth}</h3>
      <form onSubmit={submit}>
        <input
          type="text"
          placeholder="Reason (optional)"
          value={reason}
          onChange={e => setReason(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={e => setFile(e.target.files[0])}
        />
        <button type="submit">Upload Payment</button>
      </form>
      {status && <p className="success">{status}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
}
