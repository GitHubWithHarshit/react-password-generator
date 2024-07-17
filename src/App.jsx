import { useCallback, useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(6);
  const [isnumber, setIsnumber] = useState(false);
  const [ischar, setIschar] = useState(false);
  const [password, setPassword] = useState("");

  // useRef - 
  let passwordRef = useRef(null);


  let passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (isnumber) str += "0123456789";
    if (ischar) str += "&*()^%$#@!?><{}~`";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);

  }, [length, isnumber, ischar, setPassword]);


  let copyPassword = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(()=>{
    passwordGenerator();
  }, [length, isnumber, ischar, passwordGenerator])
  return (
    <>
      
      <div className='w-full max-w-md rounded-lg shadow-md mt-32 ml-96 bg-zinc-900 px-4 py-3 text-purple-600'>
      <h1 className='text-purple-700 text-3xl text-center tracking-tighter mb-5 font-bold'>Password-Creater</h1>
        <div className='flex overflow-hidden mb-4 shadow rounded-md  '>
          <input
            type="text"
            placeholder='Password'
            value={password}
            className='outline-none px-3 py-1 w-full'
            readOnly
            ref={passwordRef}
          />

          <button className=' p-2 bg-gray-800 text-xl shrink-0 text-white font-bold' onClick={copyPassword}>Copy</button>
        </div>

        <div className='flex text-sm gap-x-2'>

          <div className='flex items-center gap-x-1 text-base font-semibold'>

            <input 
            type="range" 
            min={6} 
            max={12} 
            value={length} 
            className='cursor-pointer' 
            id = "range"
            onChange={(e) => {setLength(e.target.value)}}
            />
            <label htmlFor="range">length : {length}</label>

          </div>

          <div className='flex items-center gap-x-1 ml-4 text-base font-bold'>
            <input type="checkbox"
            defaultChecked = {isnumber}
            id='numberInput'
            onChange={() => {setIsnumber((prev) => !prev)}} 
            />
            <label htmlFor="numberInput">Number</label>
          </div>

          <div className='flex items-center gap-x-1 ml-2 text-base font-bold'>
            <input type="checkbox"
            defaultChecked = {ischar}
            id='numberInput'
            onChange={() => {setIschar((prev) => !prev)}} 
            />
            <label htmlFor="numberInput">Character</label>
          </div>

        </div>

      </div>
    </>
  )
}

export default App
