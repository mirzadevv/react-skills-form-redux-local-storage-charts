import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { Select } from "antd";
const { Option } = Select;

const Form = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    fullName: "",
    birthDate: "",
    skills: [],
  });
  const [errors, setErrors] = useState({});
  const [skills, setSkills] = useState([]);

  const handleValidate = () => {
    const errors = {};
    if (data.fullName.trim() === "") errors.fullName = "FULL NAME IS REQUIRED";
    if (data.birthDate.trim() === "")
      errors.birthdate = "BIRTH DATE IS REQUIRED";
    return Object.keys(errors).length === 0 ? null : errors;
  };

  const handleChange = (e) => {
    const newData = { ...data };
    newData[e.target.name] = e.target.value;
    setData(newData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = handleValidate();
    setErrors({ errors: errors || {} });
    if (errors) return;
    dispatch({
      type: "add",
      payload: {
        id: uuidv4(),
        fullName: data.fullName,
        birthDate: data.birthDate,
        skills: skills,
      },
    });
    data.fullName = "";
    data.birthDate = "";
    setSkills([]);
  };

  function handleSelectChange(value) {
    const haveFound = skills.find((skill) => skill.value === value);
    if (skills.length === 0 || !haveFound) {
      const skillObject = {
        id: uuidv4(),
        value: value,
      };
      const newSkills = [...skills];
      newSkills.push(skillObject);
      setSkills(newSkills);
    }
  }

  const handleDeleteSkill = (skillId) => {
    const newSkills = skills.filter((skill) => skill.id !== skillId);
    setSkills(newSkills);
  };

  return (
    <>
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
          <span style={{ color: "red", fontSize: "0.7rem" }}>
            {errors?.errors?.fullName}
          </span>
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
          <span style={{ color: "red", fontSize: "0.7rem" }}>
            {errors?.errors?.birthdate}
          </span>
        </div>
        <br />
        <Select
          showSearch
          style={{ width: "100%" }}
          placeholder="Select the skills"
          optionFilterProp="children"
          onChange={handleSelectChange}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          <Option value="javascript">javascript</Option>
          <Option value="python">python</Option>
          <Option value="php">php</Option>
        </Select>

        <div className="skills">
          {skills.map((skill) => (
            <div key={skill.id} className="skill-item">
              {" "}
              {skill.value}
              <i
                className="far fa-trash-alt delete-icon"
                onClick={() => handleDeleteSkill(skill.id)}
              ></i>
            </div>
          ))}
        </div>

        <button
          style={{ marginTop: "1rem" }}
          type="submit"
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default Form;
