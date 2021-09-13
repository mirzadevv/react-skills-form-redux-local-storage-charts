import React, { useState } from "react";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import { v4 as uuidv4 } from "uuid";

import "./App.css";
import { useDispatch, useSelector } from "react-redux";
const App = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.formData);
  const [data, setData] = useState({
    fullName: "",
    birthDate: "",
  });

  const handleChange = (e) => {
    const newData = { ...data };
    newData[e.target.name] = e.target.value;
    setData(newData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: "add",
      payload: {
        id: uuidv4(),
        fullName: data.fullName,
        birthDate: data.birthDate,
      },
    });
  };

  // useEffect(() => {
  //   var names = [];
  //   names[0] = prompt("New member name?");
  //   localStorage.setItem("names", JSON.stringify(names));
  // }, []);

  console.log(formData);

  return (
    <div className="app">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="fullName"
            name="fullName"
            placeholder="Full Name:"
            value={data.fullName}
            onChange={(e) => handleChange(e)}
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
            value={data.birthDate}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <br />

        {/* <select class="custom-select" multiple>
          <option selected>Open this select menu</option>
          <option value="1">Js</option>
          <option value="2">React</option>
          <option value="3">Angular</option>
        </select> */}

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>

      <div className="show-data">
        {formData.length === 0 && (
          <p style={{ fontWeight: "bold" }}> THERE ARE NO DATA TO SHOW </p>
        )}
        {formData.map((item) => (
          <div key={item.id}>
            <div className="item">
              <div className="item-info">
                {" "}
                <span className="title">FullName:</span>{" "}
                <span className="value">{item.fullName}</span>
              </div>
              <div className="item-info">
                {" "}
                <span className="title">BirthDate:</span>{" "}
                <span className="value">{item.birthDate}</span>
              </div>
              <button
                onClick={() => dispatch({ type: "delete", payload: item })}
                type="button"
                className="btn btn-danger"
              >
                Delete
              </button>
            </div>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
