import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import GoalsForm from "./GoalsForm";
import GoalsTable from "./GoalsTable";
const GoalsHandler = () => {
 

  return (
    <div className="flex flex-col h-screen w-full background">

      <div className="flex-1 flex justify-center items-center flex-col ">
        <div>
         <h1 className="p-2 text-2xl  text-white font-bold">Add Goal</h1>
         </div>
      <div className="w-[80%]">
      <GoalsForm/>
      </div>
    </div>
      
     
    <div className="flex-1 overflow-y-auto">
    <GoalsTable/>
    </div>
    

    </div>
  );
};

export default GoalsHandler;