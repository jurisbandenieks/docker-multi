import React, { useState, useEffect } from "react";
import axios from "axios";

const Fib = () => {
  const [seenIndexes, setSeenIndexes] = useState([]);
  const [values, setValues] = useState({});
  const [index, setIndex] = useState("");

  useEffect(() => {
    fetchValues();
    fetchIndexes();
  }, []);

  const fetchValues = async () => {
    const values = await axios.get("/api/values/current");

    setValues(values);
  };

  const fetchIndexes = async () => {
    const values = await axios.get("/api/values/all");

    setSeenIndexes(values);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    await axios.post("/api/values", {
      index
    });

    setIndex("");
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <label>Enter your index:</label>
        <input value={index} onChange={(e) => setIndex(e.target.value)} />
        <button type="submit">Submit</button>
      </form>

      <h3>Indexes I have seen</h3>
      {seenIndexes.map(({ number }) => number).join(", ")}
      <h3>Calculated values</h3>
      {values &&
        values.values &&
        values.values.map((key, index) => (
          <div key={index}>
            For index {index} I calculated {key}
          </div>
        ))}
    </div>
  );
};

export default Fib;
