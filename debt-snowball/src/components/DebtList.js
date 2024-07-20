import React from 'react';

const DebtList=({debts}) => {
  return (
    <div>
      {debts.map((debt, index) => (
        <div key={index} className="grid grid-cols-4 gap-2 mb-2">
          <div className="col-span-1 p-2 bg-green-300 rounded text-green-900">
            {debt.name}
          </div>
          <div className="col-span-1 p-2 bg-green-300 rounded text-green-900">
            ${debt.balance.toFixed(2)}
          </div>
          <div className="col-span-1 p-2 bg-green-300 rounded text-green-900">
            ${debt.monthlyPayment.toFixed(2)}
          </div>
          <div className="col-span-1 p-2 bg-green-300 rounded text-green-900">
            {debt.interestRate.toFixed(2)}%
          </div>
        </div>
      ))}
    </div>
  );
}

export default DebtList;