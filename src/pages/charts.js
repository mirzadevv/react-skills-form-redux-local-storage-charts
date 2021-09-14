import React, { useState } from "react";
import { PieChart, Pie, Tooltip } from "recharts";
import { useSelector } from "react-redux";
import { paginate } from "../utils/paginate";
import Pagination from "../components/Pagination";

const Chart = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;
  const formData = useSelector((state) => state.formData);
  const paginateFormData = paginate(formData, currentPage, pageSize);
  const hanlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      {formData.length === 0 && <h1>There are no charts to show </h1>}
      <div className="chart-container">
        {paginateFormData.map((item) => (
          <div className="pie-chart">
            <PieChart width={400} height={400}>
              <Pie
                dataKey="value"
                isAnimationActive={false}
                data={item.skills}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              />
              <Tooltip />
            </PieChart>
            <p className="chart-title">{item.fullName}</p>
          </div>
        ))}
      </div>
      <Pagination
        itemsCount={formData.length}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={hanlePageChange}
      />
    </>
  );
};

export default Chart;
