 function InputBox({label,placeholder,type,onChange}){
    return <div>
        <label htmlFor="inputbox"  className="block font-semibold">{label}</label>
        <input type={type} onChange={onChange} id="inputbox" className="text-black font-normal block border-solid border-2 border-[#a2a8b4] rounded py-1 w-full px-2 mt-1" placeholder={placeholder} />
    </div>
}
  

export default InputBox