import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCopyright } from "@fortawesome/free-regular-svg-icons"
import { formatedDate } from "../utils/Date"

const Footer = () => {
    const year = formatedDate(new Date(), true)
    return (
        <footer className={`w-full py-5 flex justify-center text-xs gap-3 items-center`}>
            <FontAwesomeIcon icon={faCopyright} />
            <p>MyArticle. {year}</p>
        </footer>
    )
}

export default Footer