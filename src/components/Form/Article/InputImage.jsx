import { faImage } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import ErrorMessage from "./ErrorMessage"

const InputImage = ({ onChange, image, error }) => {
    return (
        <>
            <div className={`relative rounded-md border ${error ? 'border-red-500' :'border-gray-200' }  ${image ? 'p-2' : ' px-3 py-16'} flex items-center justify-center mt-14`}>
                <input type="file" onChange={onChange} className={`absolute top-0 left-0 h-full w-full opacity-0 hover:cursor-pointer`} accept="image/*"/>

                {image ? 
                    <img src={typeof image === 'string' ? image : URL.createObjectURL(image) } />
                    // <img src={URL.createObjectURL(image)} />
                    :
                    <div>
                        <div className={`flex justify-center`}>
                            <FontAwesomeIcon icon={faImage} className={`text-3xl text-gray-500`} />
                        </div>
                        <p className={`text-gray-500`}>Click here to upload an image</p>
                    </div>
                }
            </div>
            {error &&
                <ErrorMessage error={error} />
            }
        </>
    )
}

export default InputImage