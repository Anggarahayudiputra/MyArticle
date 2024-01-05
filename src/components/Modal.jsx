import { faMultiply } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useImperativeHandle } from "react"
import { useRef } from "react"
import { forwardRef } from "react"
import { createPortal } from "react-dom"

function ModalComponent({ onReset, children }, ref) { 
    const dialog = useRef()
    const buttonClose = useRef()
    useImperativeHandle(ref, () => {
        return {
            open() { 
                dialog.current.showModal()
            },
            close() { 
                dialog.current.close()
            }
        }
    })

    useEffect(() => {
        if (dialog) {
            dialog.current.addEventListener('click', e => {
                if (dialog.current.open) {
                    if (e.target.tagName === 'DIALOG') {
                        dialog.current.close()
                    }
                }
            })
        }
    },[dialog])

    return createPortal(
        <dialog ref={dialog} onClose={onReset} className={`bg-transparent`}>
            <div className={`bg-white w-full md:w-[80vw] lg:w-[60vw] h-full md:h-[80vh] rounded-xl overflow-y-auto py-3 px-3`}>
                <div className={`flex justify-end`}>
                    <form method="dialog">
                        <button ref={buttonClose} className={`hover:bg-gray-100 w-[42px] h-[42px] flex justify-center items-center rounded-full`}>
                            <FontAwesomeIcon icon={faMultiply} className={`text-gray-600`} />
                        </button>
                    </form>
                </div>
                <div className={`flex items-center justify-center`}>
                    {children}
                </div>
            </div>
        </dialog>,
        document.getElementById('modal')
    )
}

const Modal = forwardRef(ModalComponent)

export default Modal