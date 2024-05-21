import React, { useState, useEffect } from "react";
import countryData from "../resources/countryData.json";
import "../src/App.css";

const App = () => {
  const [SearchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.trim() !== "") {
      const filteredSuggestions = countryData.filter((country) =>
        country.name.toLowerCase().includes(term.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key == "Escape") {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div>
      <input
        type="text"
        value={SearchTerm}
        onChange={handleChange}
        placeholder="Search"
      />
      {suggestions.length > 0 && (
        <ul>
          {suggestions.map((suggestion) => (
            <li key={suggestion.code}>{suggestion.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
