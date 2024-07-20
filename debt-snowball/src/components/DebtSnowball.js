import React from 'react';

function DebtSnowball({ debts = [] }) {
  const calculateSnowball = (debts) => {
    if (debts.length === 0) return { snowballPlan: [], finalPayoffDate: null };

    const sortedDebts = [...debts].sort((a, b) => a.balance - b.balance);
    const snowballPlan = [];
    let extraPayment = 0;
    let currentMonth = new Date();
    let finalPayoffDate = null;

    sortedDebts.forEach((debt, index) => {
      let months = 0;
      let balance = debt.balance;
      let interestRate = debt.interestRate / 100 / 12;
      let monthlyPayment = debt.monthlyPayment + extraPayment;

      // Calculate payoff time considering ongoing payments
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
      const payoffDate = new Date(currentMonth);
      payoffDate.setMonth(payoffDate.getMonth() + months);
      const payoffMonth = payoffDate.toLocaleString('default', { month: 'long' });
      const payoffYear = payoffDate.getFullYear();

      snowballPlan.push({
        ...debt,
        months,
        payoffDate: `${payoffMonth} ${payoffYear}`,
        extraPayment,
        monthlyPayment,
      });

      // Update the extra payment to include the current debt's monthly payment
      extraPayment += debt.monthlyPayment;
      // Move the currentMonth to the end of the current debt's payoff
      currentMonth.setMonth(currentMonth.getMonth() + months);

      // Keep track of the final payoff date
      finalPayoffDate = payoffDate;
    });

    return { snowballPlan, finalPayoffDate };
  };

  const { snowballPlan, finalPayoffDate } = calculateSnowball(debts);
  const debtFreeDate = finalPayoffDate ? `${finalPayoffDate.toLocaleString('default', { month: 'long' })} ${finalPayoffDate.getFullYear()}` : 'N/A';

  return (
    <div>
      <h2 className="text-2xl text-orange-100 font-bold mt-4">Debt Snowball Plan</h2>
      {snowballPlan.length > 0 ? (
        <>
          <ol className="list-decimal list-inside mt-2">
            {snowballPlan.map((debt, index) => (
              <li key={index}>
                {index === 0
                  ? `You will pay a minimum of $${debt.monthlyPayment.toFixed(2)} to ${debt.name} and this will be paid off in ${debt.payoffDate}.`
                  : `Once ${snowballPlan[index - 1].name} is paid off, you will pay an extra $${snowballPlan[index - 1].monthlyPayment.toFixed(2)} per month ON TOP of your minimum payment to ${debt.name}, which will be paid off in ${debt.payoffDate}.`}
              </li>
            ))}
          </ol>
          <p className="text-xl text-orange-100 mt-4">You will be debt-free in {debtFreeDate}.</p>
        </>
      ) : (
        <p className="text-xl text-orange-100 mt-4">No debts to display.</p>
      )}
    </div>
  );
}

export default DebtSnowball;
