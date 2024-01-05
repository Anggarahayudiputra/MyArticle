import { createPortal } from "react-dom"
import Button from "./Form/Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMultiply } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"
import { forwardRef, useImperativeHandle, useRef, useState } from "react"

const SidebarComponent = ({ sidebarHandler, isLogin, nameURL }, ref) => {
    const sidebar = useRef()
    const [isShow, setIsShow] = useState(false)

    useImperativeHandle(ref, () => {
        return {
            open() {
                setIsShow(true)
            },
            close() { 
                setIsShow(false)
            }
        }
    })

    return createPortal(
        <aside ref={sidebar} className={`h-screen w-full bg-black z-[99] fixed top-0 ${isShow ? 'md:hidden' : 'hidden'}`}>
            <header className={`flex justify-end py-6 px-8 `}>
                <Button onClick={sidebarHandler}>
                    <FontAwesomeIcon icon={faMultiply} />
                </Button>
            </header>
            <ul className={`text-white text-lg p-6 text-center`}>
                {isLogin ?
                    <>
                        <li className={`mb-2`} onClick={() => setIsShow(false)}>
                            <Link to="/create/article" className={`py-4 block border-b-[1px] border-white`}>
                                Create Article
                            </Link>
                        </li>
                        <li className={`mb-2`} onClick={() => setIsShow(false)}>
                            <Link to={`/${nameURL}`} className={`py-4 block border-b-[1px] border-white`}>
                                Profile
                            </Link>
                        </li>
                        <li className={`mb-2`} onClick={() => setIsShow(false)}>
                            <Link to="/logout" className={`py-4 block border-b-[1px] border-white`}>
                                Sign Out
                            </Link>
                        </li>
                    </>
                    :
                    <>
                        <li className={`mb-2`} onClick={() => setIsShow(false)}>
                            <Link to='/login' className={`py-4 block border-b-[1px] border-white`}>
                                Sign in
                            </Link>
                        </li>
                        <li className={`mb-2`} onClick={() => setIsShow(false)}>
                            <Link to='/sign-up' className={`py-4 block border-b-[1px] border-white`}>
                                Get started
                            </Link>
                        </li>
                    </>
                }
            </ul>
        </aside>
    ,document.getElementById('sidebar')
    )
}

const Sidebar = forwardRef(SidebarComponent)

export default Sidebar