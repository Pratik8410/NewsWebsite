import React from 'react';

const categories = ['general', 'business', 'entertainment', 'health', 'science', 'sports', 'technology'];

const Filter = ({ selectedCategory, onSelectCategory }) => {
    const handleChange = (event) => {
        onSelectCategory(event.target.value);
    };

    return (
        <div className=" container filter">
            <div className="row d-flex justify-content-evenly align-content-center">
                <div className=" col-lg-2 d-flex justify-content-start dropdown_category">
                    <label htmlFor="category-select"></label>
                    <select id="category-select" value={selectedCategory} onChange={handleChange}>
                        {categories.map(category => (
                            <option key={category} value={category}>
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>


                <div className=" col-lg-10 d-flex justify-content-end category-buttons">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => onSelectCategory(category)}
                            className={category === selectedCategory ? 'active' : ''}
                        >
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </button>
                    ))}
                </div>

            </div>

        </div>
    );
};

export default Filter;
