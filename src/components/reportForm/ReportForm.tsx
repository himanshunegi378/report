import { useState } from "react";
import { ReportStruct, taskStatus } from "./types";
import { v4 } from "uuid";

type ReportFormProps = {
  value: ReportStruct;
  onChange: (value: ReportStruct) => void;
  onDelete: () => void;
};

export const createEmptyReport = (): ReportStruct => {
  return {
    id: v4(),
    date: Date.now().toString(),
    time: 0,
    tasks: [],
  };
};

export function ReportForm({ value, onChange, onDelete }: ReportFormProps) {
  const [report, setReport] = useState(value || createEmptyReport());
  return (
    <div className="w-full p-2 shadow-md shadow-green-200 rounded-md border-2 border-green-300">
      {/* delete icon */}
      <div className="flex justify-end">
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => {
            onDelete();
          }}
        >
          Delete
        </button>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row max-w-xs">
          <div className="w-1/2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="date"
            >
              Date
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="date"
              type="date"
              value={report.date}
              onChange={(e) => {
                const newReport = { ...report, date: e.target.value };
                setReport(newReport);
                onChange(newReport);
              }}
            />
          </div>
          <div className="w-1/2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="time"
            >
              Time
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="time"
              type="number"
              value={report.time}
              onChange={(e) => {
                const newReport = { ...report, time: parseInt(e.target.value) };
                setReport(newReport);
                onChange(newReport);
              }}
            />
          </div>
        </div>
        <div className="flex flex-row">
          <div className="w-full">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="tasks"
            >
              Tasks
            </label>
            {/* input field for each task and status */}
            {report.tasks.map((task) => (
              <div className="flex flex-row mb-1 gap-x-1" key={task.id}>
                <div className="w-full">
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="tasks"
                    type="text"
                    value={task.description}
                    onChange={(e) => {
                      const taskIndex = report.tasks.findIndex(
                        (t) => t.id === task.id
                      );
                      if (taskIndex === -1) {
                        const newReport = { ...report };
                        newReport.tasks.push(task);
                        setReport(newReport);
                        onChange(newReport);
                      } else {
                        const newReport = { ...report };
                        newReport.tasks[taskIndex].description = e.target.value;
                        setReport(newReport);
                        onChange(newReport);
                      }
                    }}
                  />
                </div>
                <div className="max-w-xs">
                  <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="status"
                    value={task.status}
                    onChange={(e) => {
                      const taskIndex = report.tasks.findIndex(
                        (t) => t.id === task.id
                      );
                      if (taskIndex === -1) {
                        const newReport = { ...report };
                        newReport.tasks.push(task);
                        setReport(newReport);
                        onChange(newReport);
                      } else {
                        const newReport = { ...report };
                        newReport.tasks[taskIndex].status = e.target
                          .value as taskStatus;
                        setReport(newReport);
                        onChange(newReport);
                      }
                    }}
                  >
                    {["ongoing", "done", "canceled"].map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
            {/* button to add task */}
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => {
                const newReport = {
                  ...report,
                  tasks: [
                    ...report.tasks,
                    {
                      id: v4(),
                      description: "",
                      status: taskStatus["ongoing"],
                    },
                  ],
                };
                setReport(newReport);
                onChange(newReport);
              }}
            >
              Add task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
