import React from 'react';

function DebtSnowball({ debts }) {
  const calculateSnowball = (debts) => {
    const sortedDebts = [...debts].sort((a, b) => a.balance - b.balance);
    const snowballPlan = [];
    let totalMonthlyPayment = 0;

    sortedDebts.forEach((debt) => {
      totalMonthlyPayment += debt.monthlyPayment;
      let months = 0;
      let balance = debt.balance;
      let interestRate = debt.interestRate / 100 / 12;

      while (balance > 0) {
        balance += balance * interestRate; // Add monthly interest
        balance -= totalMonthlyPayment; // Subtract total monthly payment
        months += 1;
      }

      snowballPlan.push({
        ...debt,
        months,
      });
    });

    return snowballPlan;
  };

  const snowballPlan = calculateSnowball(debts);

  return (
    <div>
      <h2 className="text-2xl font-bold mt-4">Debt Snowball Plan</h2>
      <ul className="list-disc list-inside mt-2">
        {snowballPlan.map((debt, index) => (
          <li key={index}>
            {debt.name}: {debt.months} months to pay off
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DebtSnowball;