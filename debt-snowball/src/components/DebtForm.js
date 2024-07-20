import React, {useState} from 'react';

const DebtForm = ({addDebt}) => {
    const [name, setName] = useState('');
    const [balance, setBalance] = useState('');
    const [monthlyPayment, setMonthlyPayment] = useState('');
    const [interestRate, setInterestRate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        addDebt({
        name,
        balance: parseFloat(balance),
        monthlyPayment: parseFloat(monthlyPayment),
        interestRate: parseFloat(interestRate),
        });
        setName('');
        setBalance('');
        setMonthlyPayment('');
        setInterestRate('');
    };
    return (
<form onSubmit={handleSubmit} className="grid grid-cols-4 gap-2 mb-4">
    <input
        type="text"
        placeholder="Account Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="col-span-1 p-2 rounded bg-green-200 text-green-900"
    />
    <input
        type="number"
        placeholder="Balance"
        value={balance}
        onChange={(e) => setBalance(e.target.value)}
        required
        className="col-span-1 p-2 rounded bg-green-200 text-green-900"
    />
    <input
        type="number"
        placeholder="Min. Payment"
        value={monthlyPayment}
        onChange={(e) => setMonthlyPayment(e.target.value)}
        required
        className="col-span-1 p-2 rounded bg-green-200 text-green-900"
    />
    <input
        type="number"
        placeholder="Interest %"
        value={interestRate}
        onChange={(e) => setInterestRate(e.target.value)}
        required
        className="col-span-1 p-2 rounded bg-green-200 text-green-900"
      />
      <button type="submit" className="col-span-4 p-2 bg-green-600 rounded mt-2">
        Add Debt
      </button>
    </form>
    )
}

export default DebtForm;