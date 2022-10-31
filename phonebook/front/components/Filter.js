import React from 'react'

const Filter = (props) => {
    console.log(props)
    return (
        <p>
            filter shown with <input onChange={props.handleFilter} />
        </p>
    )
}

export default Filter;