import './App.css';
import CompanyStructure from './component/CompanyStructure';

function App() {
  return (
  <div className='flex flex-col  items-center justify-center'>
   <h1 className="text-2xl font-bold m-6 text-center">Company Structure</h1>
    <div className=" bg-gray-70 border p-3 rounded-lg w-full max-w-3xl shadow-lg ">
          
<CompanyStructure/>
    </div>
  </div>
   
  );
}

export default App;
