import React from "react";
import { FunctionComponent } from "react";

const ProgressBarComponent: FunctionComponent<{
  step: number;
  actualStep: number;
}> = ({ step, actualStep }) => {
  return (
    <div className="flex gap-1 items-center">
      {Array.from({ length: step }).map((_, index) => (
        <React.Fragment key={index}>
          <div
            className={`flex w-6 h-6 text-gray-100 rounded-full ${
              index < actualStep ? "bg-[#6059e8]" : "bg-gray-400"
            } justify-center items-center`}
          >
            {index + 1}
          </div>
          {index !== step - 1 && (
            <div
              className={`w-6 h-1 rounded-sm ${
                index < actualStep - 1 ? "bg-[#6059e8]" : "bg-gray-400"
              }`}
            ></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ProgressBarComponent;
