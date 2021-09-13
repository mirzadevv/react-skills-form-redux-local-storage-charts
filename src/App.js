import React, { useState } from "react";
import "./App.css";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import { v4 as uuidv4 } from "uuid";
import { Pagination } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Select } from "antd";
const { Option } = Select;

const App = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.formData);
  const [data, setData] = useState({
    fullName: "",
    birthDate: "",
    skills: [],
  });

  var [skills, setSkills] = useState({});
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(3);

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
        skills: skills,
      },
    });
  };

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

  function handleSelectChange(value) {
    console.log(`selected ${value}`);
    const skillObj = {
      id: uuidv4(),
      value: value,
    };
    console.log("skillObj", skillObj);

    setSkills(skillObj);
  }

  console.log("skills", skills);

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
        <Select
          mode="multiple"
          style={{ width: "100%" }}
          placeholder="select your skill"
          // defaultValue={["china"]}
          onChange={handleSelectChange}
          optionLabelProp="label"
        >
          <Option value="javascript" label="javascript">
            <div className="demo-option-label-item">JavaScript</div>
          </Option>
          <Option value="python" label="python">
            <div className="demo-option-label-item">Python</div>
          </Option>
          <Option value="php" label="php">
            <div className="demo-option-label-item">PHP</div>
          </Option>
        </Select>

        <button
          style={{ marginTop: "1rem" }}
          type="submit"
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>

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
                    {item?.skills?.value.map((item) => (
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
