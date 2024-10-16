// src/Components/ReportsLayout/ReportsLayout.js
import React, { useState, useEffect } from 'react';
import './ReportsLayout.css';

const ReportsLayout = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    // Placeholder report data with path to the PDF file
    const placeholderReports = [
      {
        id: 1,
        doctorName: 'Dr. John Doe',
        speciality: 'Cardiology',
        reportFile: '/patient_report.pdf', // Path to the PDF file in the public folder
      },
      // You can add more reports here if needed
    ];
    setReports(placeholderReports);
  }, []);

  const handleViewReport = (report) => {
    // Logic to view the report in a new tab
    window.open(report.reportFile, '_blank'); // Open the report in a new tab
  };

  const handleDownloadReport = (report) => {
    // Logic to download the report
    const link = document.createElement('a');
    link.href = report.reportFile; // Use the reportFile path
    link.download = 'patient_report.pdf'; // Specify the file name for download
    link.click();
  };

  return (
    <div className="reports-container">
      <h2>Reports</h2>
      <table className="reports-table">
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Doctor Name</th>
            <th>Doctor Speciality</th>
            <th>View Report</th>
            <th>Download Report</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report, index) => (
            <tr key={report.id}>
              <td>{index + 1}</td>
              <td>{report.doctorName || 'Doctor not available'}</td>
              <td>{report.speciality || 'Speciality not available'}</td>
              <td>
                <button className="report-btn" onClick={() => handleViewReport(report)}>
                  View Report
                </button>
              </td>
              <td>
                <button className="report-btn" onClick={() => handleDownloadReport(report)}>
                  Download Report
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportsLayout;
