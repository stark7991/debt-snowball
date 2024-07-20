import React from 'react';

function DebtSnowball({ debts }) {
  const calculateSnowball = (debts) => {
    if (debts.length === 0) return [];

    const sortedDebts = [...debts].sort((a, b) => a.balance - b.balance);
    const snowballPlan = [];
    let extraPayment = 0;

    sortedDebts.forEach((debt, index) => {
      let months = 0;
      let balance = debt.balance;
      let interestRate = debt.interestRate / 100 / 12;
      let monthlyPayment = debt.monthlyPayment + extraPayment;

      while (balance > 0) {
        balance += balance * interestRate; // Add monthly interest
        balance -= monthlyPayment; // Subtract monthly payment
        months += 1;

        if (months > 1000) { // Prevent infinite loop
          console.error('Calculation is taking too long');
          break;
        }
      }

      // Calculate payoff date
      const payoffDate = new Date();
      payoffDate.setMonth(payoffDate.getMonth() + months);
      const payoffMonth = payoffDate.toLocaleString('default', { month: 'long' });
      const payoffYear = payoffDate.getFullYear();

      snowballPlan.push({
        ...debt,
        months,
        payoffDate: `${payoffMonth} ${payoffYear}`,
        extraPayment: extraPayment ? `if you put an extra $${extraPayment.toFixed(2)}` : '',
      });

      // Update the extra payment to include the current debt's monthly payment
      extraPayment += debt.monthlyPayment;
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
            {index === 0
              ? `You will pay a minimum of $${debt.monthlyPayment.toFixed(2)} to ${debt.name} and this will be paid off in ${debt.payoffDate}.`
              : `Now once ${snowballPlan[index - 1].name} is paid off, you will pay an extra $${snowballPlan[index - 1].monthlyPayment.toFixed(2)} to ${debt.name} which will be paid off in ${debt.payoffDate}.`}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DebtSnowball;