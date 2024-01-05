import { Link } from "react-router-dom"

const Tag = ({children, to}) => {
    return (
        <Link to={to} className={`font-semibold py-2 px-4 rounded-full text-sm text-gray-500 bg-gray-100 hover:bg-gray-200 whitespace-nowrap`}>
            {children}
        </Link>
    )
}

export default Tag