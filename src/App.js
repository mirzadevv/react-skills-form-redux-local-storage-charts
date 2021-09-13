import React from "react";
import "./App.css";

const App = () => {
  return (
    <div className="app">
      <form>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="fullName"
            name="fullName"
            placeholder="FullName:"
          />
        </div>
        <br />
        <div className="form-group">
          <input
            type="date"
            className="form-control"
            id="birthDate"
            name="birthDate"
            placeholder="BirthDate:"
          />
        </div>
        <br />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default App;
