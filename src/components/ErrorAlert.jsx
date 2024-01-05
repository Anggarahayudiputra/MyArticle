import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const ErrorAlert = ({ message, className }) => {
    return (
        <div className={`flex items-center gap-3 bg-white py-3 px-4 border-[1px] border-gray-200 rounded-sm ${className}`}>
            <FontAwesomeIcon icon={faExclamationCircle} className={`text-xs text-red-600 `} />
            <p className={`font-semibold text-xs`}>{ message }</p>
        </div>
    )
}

export default ErrorAlert