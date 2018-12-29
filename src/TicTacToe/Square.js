import React from 'react';

const Square = ({value, handleSelection, location}) =>{
    return(
        <button className="square" onClick={() => handleSelection(location)}>{value}</button>
    )
}

export default Square;