import React, { useState } from "react";
import Image from "next/image";
import { CategoryListData } from "@/lib/db/data";

function CategoryList({ onCategoryChange }) {
  const [categoryList] = useState(CategoryListData ?? []);
  const [selectedCategory, setSelectedCategory] = useState();

  return (
    <div>
      <h1 className="font-bold m-4">Select Food Type</h1>
      <div className="border border-dark rounded-md p-4 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
        {categoryList.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col justify-center items-center p-3 m-2 rounded-lg cursor-pointer text-[12px] ${
              selectedCategory === index
                ? "border border-purple-400"
                : "border border-dark"
            }`}
            onClick={() => {
              setSelectedCategory(index);
              onCategoryChange && onCategoryChange(item.value);
            }}
          >
            <Image src={item.icon} alt={item.name} width={40} height={40} />
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryList;
