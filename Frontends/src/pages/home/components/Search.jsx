import React from 'react'
import { FaLocationDot } from 'react-icons/fa6'
import { IoSearch } from 'react-icons/io5'

const Search = () => {
    return (
        <div className="flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-xl sm:flex-row sm:items-stretch">
            <button
                type="button"
                className="flex shrink-0 items-center gap-2 rounded-xl border border-[#E8E8E8] bg-[#FAFAFA] px-4 py-3 text-left text-sm font-medium text-[#1A1A1A]"
            >
                <FaLocationDot className="text-lg text-[#FF7A00]" />
                <span>Select location</span>
            </button>
            <div className="flex min-h-[48px] flex-1 items-center gap-2 rounded-xl border border-[#E8E8E8] px-3">
                <IoSearch className="shrink-0 text-xl text-[#888]" />
                <input
                    type="search"
                    placeholder="Search for dishes or restaurants..."
                    className="w-full bg-transparent text-sm text-[#1A1A1A] outline-none placeholder:text-[#888]"
                />
            </div>
            <button
                type="button"
                className="shrink-0 rounded-xl bg-[#FF7A00] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#E66D00] sm:px-10"
            >
                Search
            </button>
        </div>
    )
}

export default Search
