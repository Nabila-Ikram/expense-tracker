import React from "react";
import Progress_bar from "./Progress_bar";

const CategoryProgress = () => {
  return (
    <div className="grid grid-cols-2 gap-5 p-5">

      <div className="bg-linear-to-r from-gray-900 to-purple-900 rounded-2xl border border-white/20">
        <Progress_bar
          title="🍔 Food Budget"
          spent={200}
          budget={500}
          percentage={40}
        />
      </div>

      <div className="bg-linear-to-r from-gray-900 to-purple-900 rounded-2xl border border-white/20">
        <Progress_bar
          title="🚗 Transport Budget"
          spent={300}
          budget={500}
          percentage={60}
        />
      </div>

      <div className="bg-linear-to-r from-gray-900 to-purple-900 rounded-2xl border border-white/20">
        <Progress_bar
          title="🛍 Shopping Budget"
          spent={450}
          budget={500}
          percentage={90}
        />
      </div>

      <div className="bg-linear-to-r from-gray-900 to-purple-900 rounded-2xl border border-white/20">
        <Progress_bar
          title="⚡ Bills Budget"
          spent={250}
          budget={600}
          percentage={42}
        />
      </div>

    </div>
  );
};

export default CategoryProgress;