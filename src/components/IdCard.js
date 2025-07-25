import React from "react";
import "./IdCard.css";
import NewIdCard from "./NewIdCard";
import PrinterBlackIcon from "../assets/PrinterBlack.svg";

const IdCard = ({ student, handlePrintTrigger, isSelected, onSelect }) => {
  return (
    <div className="bg-gray-500 rounded-lg shadow-lg overflow-hidden border border-gray-200 p-6 flex flex-col items-center gap-4">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onSelect}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
          />
        </div>

        <button
          onClick={() => handlePrintTrigger(student)}
          className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors border border-gray-200"
          title="Print ID Card"
        >
          <img src={PrinterBlackIcon} alt="print" width={16} height={16} />
        </button>
      </div>

      {/* ID Card content with padding */}
      <div className="">{student && <NewIdCard student={student} />}</div>
    </div>
  );
};

export default IdCard;
