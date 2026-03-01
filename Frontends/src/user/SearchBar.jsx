import React from 'react'
import { useSelector } from 'react-redux'
import FoodCard from './FoodCard'

const SearchBar = () => {
    const { searchItem } = useSelector(store => store.Item)
    console.log(searchItem)
  return (
    <div className='bg-white fixed md:w-[60%] w-full md:top-[9.8%] top-[8.8%] rounded p-3 z-50 md:left-[44.5vh] '>
      <h1 className='text-xl capitalize font-semibold tracking-tight leading-none '>search item</h1>
      <div className='w-full mt-4 pb-2 flex items-center justify-center gap-3'>
        {searchItem.map(items => (
          <FoodCard item={items} />
        ))}
      </div>
    </div>
  )
}

export default SearchBar
