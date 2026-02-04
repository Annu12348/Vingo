import React from 'react'
import { useSelector } from 'react-redux'
import FoodCard from './FoodCard'

const SearchBar = () => {
    const { searchItem } = useSelector(store => store.Item)
    console.log(searchItem)
  return (
    <div className='bg-white fixed w-[60%] top-18 rounded p-3 z-10 left-[44.5vh]'>
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
