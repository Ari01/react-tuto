import React from 'react'

const PersonForm = (props) => {
    console.log(props)
    return (
        <form>
            <div>
                name: <input value={props.newName} onChange={props.handleName} />
            </div>
            <div>
                number: <input value={props.newNumber} onChange={props.handleNumber} />
            </div>
            <div>
                <button onClick={props.addPerson} type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm;