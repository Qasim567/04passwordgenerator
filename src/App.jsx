import React, { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState();
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const Passwordref = useRef(null)

  const passwordGenerator = useCallback(() => {
      let pass = "";
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      if (numberAllowed) str += "0123456789";
      if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";
      for (let i = 1; i <= length; i++) {
        let char = Math.floor(Math.random() * str.length + 1);
        pass += str.charAt(char);
      }
      setPassword(pass);
    },
    [length, numberAllowed, charAllowed, setPassword]);

    const passwordCopyToClickboard = useCallback (() => {
      Passwordref.current?.select()
      window.navigator.clipboard.writeText(password)
    },[password])

    useEffect(()=>{
      passwordGenerator()
    },[length, numberAllowed, charAllowed, passwordGenerator])


  return (
    <div className="w-full max-w-lg mx-auto my-10 px-2 py-2 bg-gray-700 rounded-lg">
      <h1 className="text-center text-white font-semibold text-2xl mb-2 py-3">
        Password Generator
      </h1>
      <div className="flex">
        <input
          type="text"
          value={password}
          className="w-full px-3 py-2 rounded-lg mb-2"
          placeholder="Password"
          readOnly
          ref={Passwordref}
        />
        <button onClick={passwordCopyToClickboard}
        className="bg-blue-700 shrink-0 rounded-lg px-3 mb-2 text-white font-semibold mx-2">
          Copy
        </button>
        </div>
        <div className="flex text-lg gap-x-2  text-orange-400 font-semibold">
          <div className="flex gap-x-1">
            <input 
            type="range" 
            min={6} 
            max={100} 
            className="cursor-pointer"
            value={length}
            onChange={(e)=>{setLength(e.target.value)}}/>
            <label>Length: {length}</label>
          </div>
          <div className="flex gap-x-1">
            <input 
            type="checkbox" 
            defaultChecked={numberAllowed}
            onChange={()=>{setNumberAllowed((prev) => !prev)}}
            id="numberInput"/>
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex gap-x-1">
            <input 
            type="checkbox" 
            defaultChecked={charAllowed}
            onChange={()=>{setCharAllowed((prev) => !prev)}}
            id="characterInput"/>
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
    </div>
  );
}

export default App;
