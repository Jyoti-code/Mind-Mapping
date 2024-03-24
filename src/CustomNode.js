import React from 'react';

const CustomNode = ({ data }) => {
  return (
    <div style={{ background: '#fff', padding: '10px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
      <p>{data.label}</p>
    </div>
  );
};

export default CustomNode;
