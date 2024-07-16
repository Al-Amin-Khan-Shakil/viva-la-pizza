import { useState } from 'react';

function CreateUser() {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>👋 Welcome! Please start by telling us your name:</p>

      <input
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      {username !== '' && (
        <div>
          <button type="submit">Start ordering</button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
