import { Link, useLocation, useNavigate } from "react-router-dom"
import Button from "../Form/Button"
import InputSearch from "../InputSearch"
import Dropdown, { DropdownList, ButtonDropdown } from "../Dropdown"
import { useRef, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faPencil } from "@fortawesome/free-solid-svg-icons"
import { useSelector } from "react-redux"
import Sidebar from "../Sidebar"
import { getToken } from "../../utils/Auth"


const Navbar = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const token = getToken()
    const sidebar = useRef()
    const [inputSearch, setInputSearch] = useState('')
    const authArray = ['/login','/sign-up']
    const showMenu = !authArray.includes(location.pathname)
    const isLogin = token && token !== 'EXPIRED'
    const username = useSelector(state => state?.user?.user?.name)
    const nameURL = username?.replaceAll(' ', '-')?.toLowerCase()

    const searchHandler = async (e) => {
        e.preventDefault()
        navigate(`/search/${inputSearch}`)
        setInputSearch('')
    }

    const sidebarHandler = (value) => {
        if (sidebar) {
            value === 'open' ? sidebar.current.open() : sidebar.current.close()
        }
    }

    return (
        <>
            <Sidebar
                ref={sidebar}
                sidebarHandler={() => sidebarHandler('close')}
                isLogin={isLogin}
                nameURL={nameURL}
            />
            <nav className={`flex items-center py-4 px-8 border-b-[1px] border-gray-200 ${showMenu ? 'justify-between' : 'justify-center'}`}>
                <Link to='/'>
                    <h1 className={`text-black font-bold`}>MyArticle.</h1>
                </Link>
                {showMenu && 
                    <ul className={`flex items-center gap-4`}>
                        <li>
                            <form onSubmit={searchHandler}>
                                <InputSearch
                                    className={`pl-3 pr-6 py-2 text-sm`}
                                    placeholder={`Search ..`}
                                    onChange={(e) => setInputSearch(e.target.value)}
                                    value={inputSearch}
                                />
                            </form>
                        </li>
                        <li className={`md:hidden`}>
                            <Button variant={'light'} noBorder={true} onClick={() => sidebarHandler('open')}>
                                <FontAwesomeIcon icon={faBars} />
                            </Button>
                        </li>
                        {isLogin ?
                            <MenuIsLogin username={username} nameURL={nameURL} />
                            :
                            <MenuIsNotLogin />
                        }
                    </ul>
                }
            </nav>
        </>
    )
}

const MenuIsLogin = ({username, nameURL}) => {
    return (
        <>
            <li className={`hidden md:block`}>
                <Link to="/create/article" className={`w-[40px] h-[40px] flex items-center justify-center bg-gray-100 text-xs rounded-full`}>
                    <FontAwesomeIcon icon={faPencil} />
                </Link>
            </li>
            <li className={`hidden md:block`}>
                <Dropdown id={`menuDropdown`}>
                    <ButtonDropdown
                        className={`w-[40px] h-[40px] flex items-center justify-center bg-gray-100 text-xs rounded-full capitalize`}
                    >
                        {username?.charAt(0)}
                    </ButtonDropdown>
                    <DropdownList position={`right`}>
                        <div className={`flex flex-col`}>
                            <Link to={`/${nameURL}`} className={`py-3 px-1 hover:bg-gray-100 text-xs rounded-md`}>Profile</Link>
                            <Link to="/logout" className={`py-3 px-1 hover:bg-gray-100 text-xs rounded-md`}>Sign Out</Link>
                        </div>
                    </DropdownList>
                </Dropdown>
            </li>
        </>
    )
}

const MenuIsNotLogin = () => {
    const navigate = useNavigate()
    
    return (
        <>
            <li className={`hidden md:block`}>
                <Link to='/login' className={`text-sm text-gray-500 hover:text-gray-600`}>
                    Sign in
                </Link>
            </li>
            <li className={`hidden md:block`}>
                <Button onClick={() => navigate('/sign-up')}>
                    Get started
                </Button>
            </li>
        </>
    )
}

export default Navbar