import React from 'react'
import goals from './GoalsDummy_data';
import { FaEdit, FaTrash } from "react-icons/fa";
const GoalsTable = () => {
  return (
    <div className="p-5">
          <h1 className="text-2xl font-bold text-white mb-5">
            🎯 Financial Goals
          </h1>
    
          <div className="overflow-x-auto rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl">
            <table className="w-full text-white">
              <thead className="bg-white/10">
                <tr className="text-left">
                  <th className="p-4">Goal</th>
                  <th className="p-4">Target</th>
                  <th className="p-4">Saved</th>
                  <th className="p-4">Remaining</th>
                  <th className="p-4">Progress</th>
                  <th className="p-4">Deadline</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
    
              <tbody>
                {goals.map((goal) => {
                  const percentage = Math.round(
                    (goal.saved / goal.target) * 100
                  );
    
                  return (
                    <tr
                      key={goal.id}
                      className="border-t border-white/10 hover:bg-white/5"
                    >
                      <td className="p-4">{goal.goal}</td>
    
                      <td className="p-4">${goal.target}</td>
    
                      <td className="p-4">${goal.saved}</td>
    
                      <td className="p-4">
                        ${goal.target - goal.saved}
                      </td>
    
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-32 h-2 bg-gray-700 rounded-full">
                            <div
                              className="h-full bg-purple-500 rounded-full"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
    
                          <span>{percentage}%</span>
                        </div>
                      </td>
    
                      <td className="p-4">{goal.deadline}</td>
    
                      <td className="p-4">
                        {percentage === 100 ? (
                          <span className="text-green-400 font-semibold">
                            ✅ Completed
                          </span>
                        ) : (
                          <span className="text-yellow-400 font-semibold">
                            ⏳ In Progress
                          </span>
                        )}
                      </td>
    
                      <td className="p-4">
                        <div className="flex gap-4 text-lg">
                          <FaEdit className="cursor-pointer hover:text-blue-400" />
                          <FaTrash className="cursor-pointer hover:text-red-400" />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          </div>
  )
}

export default GoalsTable