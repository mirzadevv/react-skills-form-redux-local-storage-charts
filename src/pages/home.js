import React, { useState } from "react";
import Form from "../components/Form";
import Pagination from "../components/Pagination";
import { paginate } from "../utils/paginate";
import { useDispatch, useSelector } from "react-redux";
import "antd/dist/antd.css";
import { Link } from "react-router-dom";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.formData);
  const paginateFormData = paginate(formData, currentPage, pageSize);

  const hanlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
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
                    <span key={item.id}> {item.name}, </span>
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
      <Link to="/charts">
        <h2 className="chart-link">Go To Charts Page</h2>
      </Link>
    </>
  );
};

export default Home;
