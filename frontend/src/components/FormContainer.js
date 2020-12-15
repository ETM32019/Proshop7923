import React from "react";

const FormContainer = ({ children }) => {
  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col-xs-6 col-md-6">{children}</div>
      </div>
    </div>
  );
};

export default FormContainer;
