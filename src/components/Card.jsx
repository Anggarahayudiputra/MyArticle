import { Link } from "react-router-dom"
import Tag from "./Tag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { formatedDate } from "../utils/Date";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

const Card = ({ article }) => {
    const { image, title, content, created_at, tags, writter } = article
    const newTitle = `${title.replaceAll(' ', '-')}`
    const newWritter = writter.name.replaceAll(' ', '-')
    const routeTo = (`/${newWritter}/${newTitle}`).toLowerCase()
    return (
        <article className={`bg-white border-[1px] border-gray-200 rounded-md h-full`}> 
            <div className={`relative`}>
                <Link to={routeTo} className={`absolute top-0 left-0 h-full w-full`}></Link>    
                <img src={image} alt={title} className={`object-cover object-center h-[200px] w-full`} />
                <div className={`p-3 border-t-[1px] border-gray-200`}>
                    <h2 className={`font-semibold text-sm mb-3`}>{title}</h2>
                    <p className={`text-xs text-gray-500 line-clamp-2`}>{content}</p>
                    <div className={`flex items-center gap-2 text-gray-600 text-xs mt-2`}>
                        <FontAwesomeIcon icon={faClock} />
                        <p>{formatedDate(created_at, true, true, true)}</p>
                    </div>
                </div>
            </div>    
            <div className={`flex items-center gap-2 px-3 pt-3 pb-5 flex-wrap`}>
                {tags.map((tag, index) => {
                    if (index < 3) {
                        return (
                            <Tag key={index} to={`/tag/${tag.title.toLowerCase()}`}>{tag.title}</Tag>
                        )
                    }

                    if (index === 3) {
                        return (
                            <div key={index} className={`font-semibold py-2 px-4 rounded-full text-sm text-gray-500 bg-gray-100 hover:bg-gray-200 whitespace-nowrap`}>
                                <FontAwesomeIcon icon={faEllipsis} />
                            </div>
                        )
                    }
                })}
            </div>
        </article>
    )
}

export default Card