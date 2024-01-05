
const Toggle = ({ title, checked, onChange, className }) => {
    return (
        <>
            <div className={`relative ${className} flex`}>
                <div className={`flex items-center relative`}>
                    <input type="checkbox" checked={checked} onChange={onChange} className={`absolute top-0 left-0 w-full h-full z-10 opacity-0 hover:cursor-pointer`} />
                    <div className={` border-[2px] ${checked ? 'border-black' : 'gray-400' } rounded-full relative w-[2rem] h-[1.25rem]`}>
                        <div className={`aspect-square rounded-full w-[1rem] h-full transition-all absolute top-0 ${checked ? 'right-0 bg-black' : 'left-0 bg-gray-300'}`}></div>
                    </div>
                    <label className={`text-xs text-gray-500 ml-3`}>
                        {title}
                    </label>
                </div>
            </div>
        </>
    )
}

export default Toggle