import React, {useState} from 'react';
import DebtForm from './components/DebtForm';
import DebtList from './components/DebtList';
import DebtSnowball from './components/DebtSnowball';

function App() {
  const [debts, setDebts] = useState([]);

  const addDebt = (debt) => {
    setDebts((prevDebts) => [...prevDebts, debt]);
  };

  return (
    <div className="min-h-screen bg-green-900 text-white flex flex-col items-center p-4">
        <h1 className="text-4xl text-orange-100 font-bold mt-8">The Debt Snowball</h1>
        <p className="text-xl text-orange-100 mt-2">A simple way to managing your debt</p>
      <div className="bg-green-700 p-6 mt-6 rounded-lg shadow-lg w-full max-w-2xl">
      <DebtForm addDebt = {addDebt} />
      <DebtList debts = {debts} />
      <DebtSnowball debts={debts} />
    </div>
    </div>

  );
}

export default App;
