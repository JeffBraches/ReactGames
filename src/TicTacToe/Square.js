import React from 'react';

const Square = ({value, handleSelection, location}) =>{
    return(
        <button className="square" onClick={() => handleSelection(location)}>
            <h3 className="squareText">{value}</h3>
        </button>
    )
}

export default Square;