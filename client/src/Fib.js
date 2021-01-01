import React, { useState, useEffect } from "react";
import axios from "axios";

const Fib = () => {
  const [seenIndexes, setSeenIndexes] = useState([]);
  const [calculatedValues, setCalculatedValues] = useState({});
  const [index, setIndex] = useState("");

  useEffect(() => {
    fetchValues();
    fetchIndexes();
  }, []);

  const fetchValues = async () => {
    const { data } = await axios.get("/api/values/current");

    setCalculatedValues(data);
  };

  const fetchIndexes = async () => {
    const { data } = await axios.get("/api/values/all");
    setSeenIndexes(data);
  };

  const renderValues = () => {
    let entries = [];
    for (let key in calculatedValues) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {calculatedValues[key]}
        </div>
      );
    }

    return entries;
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    await axios.post("/api/values", {
      index: index
    });

    setIndex("");
    fetchValues();
    fetchIndexes();
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <label>Enter your index:</label>
        <input value={index} onChange={(e) => setIndex(e.target.value)} />
        <button type="submit">Submit</button>
      </form>

      <h3>Indexes I have seen</h3>
      {seenIndexes &&
        seenIndexes.length > 0 &&
        seenIndexes.map(({ number }) => number).join(", ")}
      <h3>Calculated values</h3>
      {renderValues()}
    </div>
  );
};

export default Fib;
