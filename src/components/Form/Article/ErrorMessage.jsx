import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons"

const ErrorMessage = ({ error }) => {
    return (
        <p className={`flex gap-x-3 flex-nowrap items-center text-xs text-red-600 mt-3`}>
            <FontAwesomeIcon icon={faExclamationCircle} />
            {error}
        </p>
    )
}

export default ErrorMessage