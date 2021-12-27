import React, { useState } from 'react'

const Filter = ({searchName, setSearchName}: {searchName: string, setSearchName: Function}) => {

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        const cleanNameToSearch = event.target.value.toLocaleLowerCase().trim()
        setSearchName(cleanNameToSearch)
    }

    return (
        <form>
            <div>
                filter shown with: <input value={searchName} onChange={handleFilterChange} />
            </div>
      </form>
    )
}

export default Filter
