import { Select } from "antd";
import React from "react";
import { Category } from "../../Interface/Interface";

interface Selected {
  selected: string;
  complete: Category[];

  setSelected: (selected: string) => void;
}

const SelectComplete: React.FC<Selected> = ({
  selected,
  setSelected,
  complete,
}) => {
  const handleChange = (value: string) => {
    setSelected(value);
  };

  return (
    <>
      <div className="text-center mt-6 w-full">
        <Select
          placeholder="Chọn thể loại truyện"
          value={selected}
          onChange={handleChange}
          className="w-full border-2 border-slate-300 outline-none"
        >
          {complete.map((option: Category) => (
            <>
              <option value={option.type} label={option.title}>
                {option.title}
              </option>
            </>
          ))}
        </Select>
      </div>
    </>
  );
};

export default SelectComplete;
