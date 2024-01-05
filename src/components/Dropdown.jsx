import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { dropdownAction } from "../store/dropdown"

const Dropdown = ({ children, id }) => {
    const dispatch = useDispatch()
    const dropdown = useRef()
    const show = useSelector(state => state.dropdown.show)
    useEffect(() => {
        if (dropdown) {
            window.onclick = e => {
                if (!dropdown?.current?.contains(e.target) || (dropdown?.current?.contains(e.target) && show)) {
                    dispatch(dropdownAction.setShow(false))
                } else {
                    dispatch(dropdownAction.setShow(true))
                }
            } 
        }
        
    }, [dropdown, show, dispatch])
    return (
        <div className={`relative`} id={id} ref={dropdown}>
            {children}
        </div>
    )
}

export function DropdownList({ children, position }) {
    let positionContainer = 'left-0'
    if (position === 'right') {
        positionContainer = 'right-0'
    }
    const show = useSelector(state => state.dropdown.show)
    return (
        <div  className={` z-[99999] min-w-[160px] w-full absolute  top-12 bg-white p-2 border-[1px] border-gray-200 rounded-md ${show ? '' : 'hidden'} ${positionContainer}`}>
            {children}
        </div>
    )
}

export function ButtonDropdown({className, children}) { 
    return (
        <button
            type="button"
            className={className}
        >
            {children}
        </button>
    )
}


export default Dropdown