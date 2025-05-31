import React from 'react';

const DataItem = ({ data }) => {
  const createdAt = data.createdAt 
    ? new Date(data.createdAt).toLocaleString() 
    : 'لا يوجد تاريخ';

  return (
    <div className="data-item">
      <p className="content">{data.content}</p>
      <p className="date">أنشئ في: {createdAt}</p>
    </div>
  );
};

export default DataItem;