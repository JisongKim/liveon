import { AppContext } from '@/App';
import { category } from '@/data/category';
import { useContext, useEffect, useState } from 'react';

function CategoryDropdown({ value, className }) {
  const { updateCreateRoomForm } = useContext(AppContext);
  const [selectedCategory, setSelectedCategory] = useState(value);

  useEffect(() => {
    updateCreateRoomForm('category', selectedCategory);
  }, [selectedCategory]);

  return (
    <div>
      <label htmlFor="category">
        카테고리
      </label>
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        id="category"
        className={className}
        name="category"
      >
        {category.map((list) => (
          <option key={list.title} value={list.title}>
            {list.title}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CategoryDropdown;
