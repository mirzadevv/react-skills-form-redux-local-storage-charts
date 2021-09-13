import React, { useState } from "react";
import "./App.css";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import { Pagination } from "antd";
import { useDispatch, useSelector } from "react-redux";

import Form from "./components/Form";

const App = () => {
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(3);
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.formData);

  const handlePaginationChange = (value) => {
    if (value <= 1) {
      setMinValue(0);
      setMaxValue(3);
    } else {
      setMinValue(maxValue);
      setMaxValue(value * 3);
    }
  };

  // useEffect(() => {
  //   var names = [];
  //   names[0] = prompt("New member name?");
  //   localStorage.setItem("names", JSON.stringify(names));
  // }, []);

  return (
    <div className="app">
      <Form />

      <div className="show-data">
        {formData.length === 0 && (
          <p style={{ fontWeight: "bold" }}> THERE ARE NO DATA TO SHOW </p>
        )}

        {formData &&
          formData.length > 0 &&
          formData.slice(minValue, maxValue).map((item) => (
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
                <div className="item-info">
                  {" "}
                  <span className="title">Skills:</span>{" "}
                  <span className="value">
                    {item?.skills?.value?.map((item) => (
                      <span key={item}> {item}, </span>
                    ))}
                  </span>
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
      <Pagination
        defaultCurrent={1}
        defaultPageSize={3}
        onChange={handlePaginationChange}
        total={formData.length}
      />
    </div>
  );
};

export default App;
