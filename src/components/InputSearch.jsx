import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const InputSearch = ({ onChange, className, placeholder, value }) => {
    return (
        <div className={`relative`}>
            <div className={`relative bg-gray-100 rounded-full flex gap-3 items-center ${className}`}>
                <FontAwesomeIcon icon={faSearch} className={`text-gray-500 text-xs`} />
                <input type="text" value={value} placeholder={placeholder} className={`outline-none border-0 bg-transparent w-full`} onChange={onChange} />
            </div>
        </div>
    )
}

export default InputSearch