
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const JobSearch = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to job board with search parameters
    navigate("/job-board");
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      <span className="ml-3 text-gray-600">Redirecting to Job Board...</span>
    </div>
  );
};

export default JobSearch;
