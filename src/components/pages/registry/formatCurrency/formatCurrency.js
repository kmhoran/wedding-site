import React from 'react';


const FormatCurrency = (number, hideDecimal = true) => {
    const floater = parseFloat(Math.round(number * 100) / 100)
      .toFixed(2)
      .toString();
    const splitFloat = floater.split(".");
    if (hideDecimal && number % 1 === 0) {
      return <span>$ {splitFloat[0]}</span>;
    }
    return (
      <span>
        $ {splitFloat[0]}.<sup className="decimal-point">{splitFloat[1]}</sup>
      </span>
    );
  };

  export default FormatCurrency;