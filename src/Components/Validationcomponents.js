import React from 'react';

const Validationcomponents = (props) => {
  return(
    <>{props.isShow &&
        <small className="p-error block">{props.message}</small>
    }
    </>)
};

export default Validationcomponents;
