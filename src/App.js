import React, { useState } from "react";
import "./App.css";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import { useDispatch, useSelector } from "react-redux";
import Form from "./components/Form";
import Pagination from "./components/Pagination";
import { paginate } from "./utils/paginate";

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.formData);
  const paginateFormData = paginate(formData, currentPage, pageSize);

  const hanlePageChange = (page) => {
    console.log(page);
    setCurrentPage(page);
  };

  return (
    <div className="app">
      <Form />
      <div className="show-data">
        {formData.length === 0 && (
          <p style={{ fontWeight: "bold" }}> THERE ARE NO DATA TO SHOW </p>
        )}

        {paginateFormData.map((item) => (
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
                  {item?.skills?.map((item) => (
                    <span key={item.id}> {item.value}, </span>
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
        <Pagination
          itemsCount={formData.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={hanlePageChange}
        />
      </div>
    </div>
  );
};

export default App;
