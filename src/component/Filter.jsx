import React from 'react'

const Filter = ({setCategory}) => {
    const FilterList = ["Music", "Gaming", "Travel", "Beauty","Entertainment", "Fitness", "Technology", "Comedy", "Fashion", "Education", "Science", "Sports","Cooking", "News", "Movies", "Animation", "Vlogs", "Art", "Motivation", "DIY"];

    return (
    
        <div className='lg:p-1 w-full flex gap-5 whitespace-nowrap overflow-x-scroll scroll-smooth scrollbar-hide px-2'>
            {FilterList.map((elm,id) => (
                <button onClick={() => setCategory(elm)} key={id} className='md:px-3 px-2 py-[2px] rounded-md font-medium bg-[#e6e6e6] text-black dark:bg-zinc-800 dark:text-gray-200'>{elm}</button>
            ))}
    
    </div>
    )
}

export default Filter
