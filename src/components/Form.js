import React, { useState } from "react";
import { Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
const { Option } = Select;

const Form = () => {
  const dispatch = useDispatch();
  var [skills, setSkills] = useState({});

  const [data, setData] = useState({
    fullName: "",
    birthDate: "",
    skills: [],
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
        skills: skills,
      },
    });
  };
  function handleSelectChange(value) {
    console.log(`selected ${value}`);
    const skillObj = {
      id: uuidv4(),
      value: value,
    };
    console.log("skillObj", skillObj);

    setSkills(skillObj);
  }
  return (
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
  );
};

export default Form;
