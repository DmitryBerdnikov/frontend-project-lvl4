import React from 'react';

const Messages = ({ messages }) => {
  if (messages.length === 0) {
    return null;
  }

  return (
    messages.map(({ username, text, id }) => (
      <div
        key={`message-${id}`}
        className="mb-2"
      >
        <span className="fw-bold">{`${username}: `}</span>
        {text}
      </div>
    ))
  );
};

export default Messages;
