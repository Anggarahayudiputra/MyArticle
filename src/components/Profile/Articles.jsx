import { useDispatch, useSelector } from "react-redux"
import Card from "../Card"
import { profileAction } from "../../store/profile"
const Articles = () => {
    const dispatch = useDispatch()
    const isActive = useSelector(state => state.profile.isActive)
    const articles = useSelector(state => state.profile.articles)
    const selected = useSelector(state => state.profile.selected)
    const showCheckBox = useSelector(state => state.profile.showCheckbox)

    const listArticles = isActive ? articles.active : articles.inActive
    const listSelected = isActive ? selected.active : selected.inActive
    const showCheckBoxData = isActive ? showCheckBox.active : showCheckBox.inActive

    const onSelected = (id) => {
        let data = []
        if (listSelected.includes(id)) {
            data = listSelected.filter(item => item !== id)
        } else {
            data = [...listSelected, id]
        }
        dispatch(isActive ? profileAction.setActiveSelected(data) : profileAction.setInActiveSelected(data) )
    }

    return (
        listArticles && (
            <div className={`grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4`}>
                {listArticles.map((article, index) => {
                    return (
                        <div key={index} className={`relative`}>
                            <div className={`flex justify-between items-center absolute top-0 z-[1] p-2 ${showCheckBoxData ? '' : 'hidden'}`}>
                                <input
                                    className={`w-[1rem] h-[1rem] hover:cursor-pointer`}
                                    type="checkbox"
                                    onChange={() => onSelected(article.id)}
                                    checked={listSelected?.includes(article.id)}
                                />
                            </div>
                            <Card
                                article={article}
                            />
                        </div>
                    )
                })}
            </div>
        )
        
    )
}

export default Articles