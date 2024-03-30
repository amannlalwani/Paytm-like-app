export default function Button({btntext,onClick}){
    return <div>
        <button type="button" onClick={onClick} className=" w-full font-semibold  text-white bg-slate-700 hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">{btntext}</button>
    </div>
}