import React, { createContext, useState, useEffect } from "react";

const ReportsContext = createContext();

export const ReportsProvider = ({ children }) => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const API_URL = "https://api.jsonbin.io/v3/b/67565865ad19ca34f8d7e85d";
  const API_KEY =
    "$2a$10$wYLVusv1vQx5beP6t.0AjO0ijZWX6aaEJ7JgTQJx2wMJQhSPtaNNa";

  // Fetch data
  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL, {
          method: "GET",
          headers: {
            "X-Master-Key": API_KEY,
          },
        });
        const data = await response.json();

        console.log("Fetched data:", data);

        if (data && data.record && Array.isArray(data.record.record)) {
          setReports(data.record.record);
        } else {
          console.error(
            "Expected 'data.record' to be an array, but it is:",
            data.record
          );
          setReports([]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [API_URL, API_KEY]);

  // Function to create a new report

  const createReport = async (newReport) => {
    try {
      setLoading(true);
      // Prepare report data without image field
      const reportData = {
        title: newReport.title,
        report: newReport.report,
        category: newReport.category,
        image: newReport.image,
      };

      const response = await fetch(API_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": API_KEY,
        },
        body: JSON.stringify({ record: [...reports, reportData] }),
      });

      const data = await response.json();

      if (response.ok) {
        // Update the local reports state without the image field
        setReports((prevReports) => [...prevReports, reportData]);
        console.log("Report created successfully!");
      } else {
        throw new Error("Failed to create report.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to update a report
  const updateReport = async (id, updatedReport) => {
    try {
      setLoading(true);
      const updatedReports = reports.map((report) =>
        report.id === id ? { ...report, ...updatedReport } : report
      );
      const response = await fetch(API_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": API_KEY,
        },
        body: JSON.stringify({ record: updatedReports }),
      });
      const data = await response.json();
      if (Array.isArray(data.record)) {
        setReports(data.record);
      } else {
        console.error("Unexpected response format:", data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to delete a report
  const deleteReport = async (id) => {
    try {
      setLoading(true);
      const updatedReports = reports.filter((report) => report.id !== id);
      const response = await fetch(API_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": API_KEY,
        },
        body: JSON.stringify({ record: updatedReports }),
      });
      const data = await response.json();
      if (Array.isArray(data.record)) {
        setReports(data.record);
      } else {
        console.error("Unexpected response format:", data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  //search filter

  // Filter reports based on the search term
  const filteredReports = reports.filter((report) =>
    report.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ReportsContext.Provider
      value={{
        reports,
        loading,
        error,
        createReport,
        updateReport,
        deleteReport,
        filteredReports,
        searchTerm,
        setSearchTerm,
      }}
    >
      {children}
    </ReportsContext.Provider>
  );
};

export const useReports = () => {
  const context = React.useContext(ReportsContext);
  if (!context) {
    throw new Error("useReports must be used within a ReportsProvider");
  }
  return context;
};
