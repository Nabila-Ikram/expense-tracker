import React from "react";

const Transaction = (props) => {
  return (
    <div
      className="w-full rounded-xl border border-white/20
                 bg-linear-to-r from-[rgba(55,65,81,0.8)]
                 to-[rgba(88,28,135,0.9)]
                 text-white p-5 shadow-lg"
    >
      {/* Top */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="bg-linear-to-r from-orange-500 to-pink-600 px-3 py-1 rounded-lg text-sm">
          {props.id}
        </span>

        <span className="bg-linear-to-r from-orange-500 to-pink-600 px-3 py-1 rounded-lg text-sm">
          {props.date}
        </span>
      </div>

      {/* Middle */}
      <div className="flex gap-2 mb-3">
        <div className="flex-1 bg-gray-500/60 rounded-md py-2 text-center text-sm">
          ${props.amount}
        </div>

        <div className="flex-1 bg-gray-500/60 rounded-md py-2 text-center text-sm">
          {props.category}
        </div>

        <div className="flex-1 bg-gray-500/60 rounded-md py-2 text-center text-sm">
          {props.transaction_type}
        </div>
      </div>

      {/* Description */}
      <p className="bg-gray-500/60 rounded-md p-2 text-sm">
        {props.description}
      </p>
    </div>
  );
};

export default Transaction;