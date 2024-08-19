import React, { useState, ChangeEvent, FormEvent } from 'react'

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [ searchTerm, setSearchTerm ] = useState<string>('')

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      onSearch(searchTerm)
    }
  }

  return (
    <div className='flex items-center justify-center w-full p-3'>
      <form onSubmit={handleSearch} className='flex gap-3'>
        <input type="text" placeholder="Enter a song, album, or artist" className='w-96 p-2 rounded-md text-black' value={searchTerm} onChange={handleInputChange} />
        <button type='submit'>Search</button>
      </form>
    </div>
  )
}

export default SearchBar