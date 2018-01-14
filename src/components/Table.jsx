import React from 'react';

const Table = ({ list, onClick }) => (
  <div className="table">
    {list.map(item =>
      <div key={item.objectID} className="table-row">
        <span style={{ width: '40%' }}>
          <a href={item.url}>{item.title}</a>
        </span>
        <span style={{ width: '30%' }}>
          {item.author}
        </span>
        <span style={{ width: '10%' }}>
          {item.num_comments}
        </span>
        <span style={{ width: '10%' }}>
          {item.points}
        </span>
        <button
          style={{ width: '10%' }}
          onClick={(e) => onClick(item.objectID, e)}>X
        </button>
      </div>
    )}
  </div>
);

export default Table;
