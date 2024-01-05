import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
faEye
import { faEye, faEyeSlash} from "@fortawesome/free-regular-svg-icons"
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons"

const Input = ({ type, placeholder, label, value, onChange, error }) => { 
    let color = 'text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-black'
    if (error){
        color = 'text-gray-900 ring-red-600 placeholder:text-gray-400 focus:ring-red-600'
    }
    let size = 'w-full rounded-md border-0 p-1.5 shadow-sm ring-1 focus:ring-2 sm:text-sm sm:leading-6'

    const [showPass, setShowPass] = useState(false)

    return (
        <div>
            {label &&
                <label className={`block text-sm font-medium leading-6 text-gray-900`}>{label}</label>
            }

            {type === 'password' &&
                <div className={`relative`}>
                    <input
                        type={showPass ? 'text' : 'password'}
                        placeholder={placeholder}
                        value={value}
                        onChange={onChange}
                        className={`block ring-inset focus-visible:outline-none focus:ring-inset pr-10 ${color} ${size}`}
                        />
                    <button
                        type="button"
                        onClick={() => setShowPass(!showPass)}
                        className={`absolute h-full right-0 top-0 left-auto px-3`}
                    >
                        <FontAwesomeIcon icon={showPass ?  faEye : faEyeSlash} color="grey"/>
                    </button>
                </div>
            }
            
            {type !== 'password' &&
                <input
                    type={type || 'text'}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className={`block ring-inset focus-visible:outline-none focus:ring-inset ${color} ${size}`}
                />
            }

            {error && (
                <p className={`text-xs text-red-600 flex gap-1 items-center mt-1`}>
                    <FontAwesomeIcon icon={faExclamationCircle} className={`text-[9px]`} />
                    {error}
                </p>
            )}
        </div>
    )
}

export default Input