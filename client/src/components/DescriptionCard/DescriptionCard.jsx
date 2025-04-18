import React from 'react';

function DescriptionCard({ data, loading }) {
  if (loading) {
    return (
      <div style={{
        padding: '1rem',
        border: '1px solid #ddd',
        borderRadius: '8px',
        marginTop: '1rem',
        backgroundColor: '#f9f9f9'
      }}>
        <h3>Description</h3>
        <p style={{ color: '#aaa' }}>Loading...</p>
      </div>
    );
  }

  if (!data?.description) return null;

  return (
    <div style={{
      padding: '1rem',
      border: '1px solid #ddd',
      borderRadius: '8px',
      marginTop: '1rem',
      backgroundColor: '#f9f9f9',
      color:"#333"
    }}>
      <h3>Description</h3>
      <p>
        {data.description.en}
      </p>
    </div>
  );
}

export default DescriptionCard;
