import React, { useState } from "react";
import axios from "axios";

function App() {
  const [jsonInput, setJsonInput] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const parsedData = JSON.parse(jsonInput);
      const res = await axios.post(
        "https://b-front-gaurang-singhs-projects.vercel.app/bfhl",
        {
          data: parsedData.data,
        }
      );
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError("Invalid JSON or API error");
      setResponse(null);
    }
  };

  const handleOptionChange = (e) => {
    const { value, checked } = e.target;
    setSelectedOptions((prev) =>
      checked ? [...prev, value] : prev.filter((option) => option !== value)
    );
  };

  const renderResponse = () => {
    if (!response) return null;
    return (
      <div>
        {selectedOptions.includes("Numbers") && (
          <div>Numbers: {response.numbers.join(", ")}</div>
        )}
        {selectedOptions.includes("Alphabets") && (
          <div>Alphabets: {response.alphabets.join(", ")}</div>
        )}
        {selectedOptions.includes("Highest lowercase alphabet") && (
          <div>
            Highest Lowercase Alphabet:{" "}
            {response.highest_lowercase_alphabet.join(", ")}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="App">
      <h1>{response ? response.roll_number : "BFHL Challenge"}</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder='Enter JSON like {"data": ["A", "b", "1"]}'
          rows="5"
          cols="50"
        />
        <button type="submit">Submit</button>
      </form>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {response && (
        <div>
          <label>
            <input
              type="checkbox"
              value="Numbers"
              onChange={handleOptionChange}
            />{" "}
            Numbers
          </label>
          <label>
            <input
              type="checkbox"
              value="Alphabets"
              onChange={handleOptionChange}
            />{" "}
            Alphabets
          </label>
          <label>
            <input
              type="checkbox"
              value="Highest lowercase alphabet"
              onChange={handleOptionChange}
            />{" "}
            Highest lowercase alphabet
          </label>
          {renderResponse()}
        </div>
      )}
    </div>
  );
}

export default App;
