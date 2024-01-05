import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMultiply, faPowerOff} from "@fortawesome/free-solid-svg-icons"
import Button from "../Form/Button"
import { useDispatch, useSelector } from "react-redux"
import { profileAction } from "../../store/profile"
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons"

const ModalContent = ({ modalType, buttonSubmit }) => {
    const dispatch = useDispatch()
    const isActive = useSelector(state => state.profile.isActive)
    const selected = useSelector(state => state.profile.selected)
    const articles = useSelector(state => state.profile.articles)
    
    const listArticles = isActive ? articles.active : articles.inActive
    const listSelected = isActive ? selected.active : selected.inActive
    const dataSelected = listArticles?.filter(article => listSelected.includes(article.id))

    const selectedHandler = (id) => {
        const data = listSelected.filter(item => item !== id)
        dispatch(isActive ? profileAction.setActiveSelected(data) : profileAction.setInActiveSelected(data))
    }

    return (
        <div className={`py-4 w-full`}>
            <div className={`text-center`}>
                <FontAwesomeIcon icon={ modalType === 'delete' ? faTrashAlt : faPowerOff} className={`text-5xl mb-4`} />
                <p>
                    {`Are you sure want to ${modalType} these articles?`}
                </p>
            </div>
            <ul className={`mt-10 px-4 h-full overflow-y-auto`}>
                {dataSelected?.map((item, index) => {
                    return (
                        <li key={index} className={`flex justify-between items-center py-2 px-4 border-b-[1px] border-gray-200`}>
                            <p className={`line-clamp-1`}>{item.title}</p>
                            <Button variant={`light`} onClick={ () => selectedHandler(item.id)}>
                                <FontAwesomeIcon icon={faMultiply} className={`text-[8px] text-gray-500`} />
                            </Button>
                        </li>
                    )
                })}
            </ul>
            <div className={`flex justify-center mt-5`}>
                {buttonSubmit}
            </div>
        </div>
    )
}

export default ModalContent