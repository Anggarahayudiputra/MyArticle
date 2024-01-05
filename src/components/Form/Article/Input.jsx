import ErrorMessage from "./ErrorMessage"

const Input = ({ onChange, value, autoFocus, error }) => {
    return (
        <>
            <input
                type="text"
                className={`text-5xl rounded-md font-bold focus:ring-black ${error ? 'border border-red-500' :'' } placeholder:text-gray-400 p-2 w-full`}
                onChange={onChange}
                value={value}
                placeholder="Title here"
                autoFocus={autoFocus}
            />
            {error &&
                <ErrorMessage error={error}/>
            }
        </>
    )
}

export default Input