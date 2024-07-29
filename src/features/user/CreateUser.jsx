import { useState } from "react";

function CreateUser() {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <p className="mb-4 text-sm text-stone-700 md:text-base">
        👋 Welcome! Please start by telling us your name:
      </p>

      <input
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-72 rounded p-1"
      />

      {username !== "" && (
        <div>
          <button type="submit">Start ordering</button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
