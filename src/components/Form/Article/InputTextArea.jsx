import ErrorMessage from "./ErrorMessage"

const InputTextArea = ({ onChange, value, error }) => {
    return (
        <>
            <textarea value={value} placeholder={`Write content here ...`} onChange={onChange} className={`focus:ring-black ${error ? 'border border-red-500' :'' } rounded-md placeholder:text-gray-400 p-2 w-full mt-14 h-[240px]`}>
                {value}
            </textarea>
            {error &&
                <ErrorMessage error={error} />
            }
        </>
    )
}

export default InputTextArea