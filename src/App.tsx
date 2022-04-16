import React, { useState } from "react";
import {
  createEmptyReport,
  ReportForm,
} from "./components/reportForm/ReportForm";
import { ReportStruct } from "./components/reportForm/types";

function App() {
  const [reports, setReports] = useState<ReportStruct[]>([]);
  return (
    <div className="px-2 mt-2">
      <div className="mb-4">
        {reports.map((report) => (
          <div className="mb-2" key={report.id}>
            <ReportForm
              value={report}
              onChange={(updatedReport) => {
                const newReports = [...reports];
                const index = newReports.findIndex(
                  (r) => r.id === updatedReport.id
                );
                newReports[index] = updatedReport;
                setReports(newReports);
              }}
              onDelete={() => {
                const newReports = [...reports];
                const index = newReports.findIndex((r) => r.id === report.id);
                newReports.splice(index, 1);
                setReports(newReports);
              }}
            />
          </div>
        ))}
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={() => {
          setReports([...reports, createEmptyReport()]);
        }}
      >
        Add Report
      </button>
    </div>
  );
}

export default App;
