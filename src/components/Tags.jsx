import Slider from "./Slider"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import Tag from "./Tag"

const Tags = ({tags}) => {
    return (
        <Slider>
            <Tag to={`/explore-topics`}>
                <div className={`flex items-center gap-2 flex-nowrap`}>
                    <div className={`w-[16px] h-[16px] flex items-center justify-center bg-slate-900 aspect-square rounded-full`}>
                        <FontAwesomeIcon icon={faSearch} className={`text-[6px] text-white`} />
                    </div>
                    <p className={`whitespace-nowrap`}>
                        Explore Topics
                    </p>
                </div>
            </Tag>
            {tags.map((tag, index) => {
                return (
                    <Tag key={index} to={`/tag/${tag.title.toLowerCase()}`}>
                        {tag.title}
                    </Tag>
                )
            })}
        </Slider>
    )
}

export default Tags