import Button from "../Form/Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { useDispatch, useSelector } from "react-redux"
import { profileAction } from "../../store/profile"
const ManageArticle = ({ showModal }) => {
    const dispatch = useDispatch()

    const isActive = useSelector(state => state.profile.isActive)
    const isShowCheckbox = useSelector(state => state.profile.showCheckbox)
    const selected = useSelector(state => state.profile.selected)
    const articles = useSelector(state => state.profile.articles)
    const setActive = (value) => {
        if (value !== isActive) {
            dispatch(profileAction.setIsActive())
        }
    }   

    const showCheckBox = (value) => {
        if (value !== (isActive ? isShowCheckbox.active : isShowCheckbox.inActive )) {
            dispatch(profileAction.setShowCheckbox({type: isActive ? 'active' : 'inActive', value:value}))
        }
    }
    
    return (
        <>
            <div className={`flex justify-center`}>
                <div className={`flex items-center justify-center py-2 px-3 rounded-full gap-3 bg-gray-100 mb-4`}>
                    <button type="button" className={`py-2 px-4 rounded-full ${isActive ? 'bg-white shadow-md  ' : ''}`} onClick={() => setActive( true )}>
                        Active
                    </button>
                    <button type="button" className={`py-2 px-4 rounded-full ${!isActive ? 'bg-white shadow-md' : ''}`} onClick={() => setActive(false)}>
                        Inactive
                    </button>
                </div>
            </div>
            {(isActive ? articles.active.length > 0 : articles.inActive.length > 0) && 
                <div className={`flex items-center gap-3 flex-col md:flex-row`}>
                    <div className={`flex items-center gap-3`}>
                        <Button onClick={() => showCheckBox(true)}>
                            <p className={`whitespace-nowrap`}>
                                {(isActive ? isShowCheckbox.active : isShowCheckbox.inActive) ? `(${isActive ? selected.active.length : selected.inActive.length}) Selected` : 'Manage Articles'}
                            </p>
                        </Button>
                        {(isActive ? isShowCheckbox.active : isShowCheckbox.inActive) && (
                            <Button
                                variant={'light'}
                                onClick={() => showCheckBox(false)}
                                noBorder={true}
                            >
                                Cancel
                            </Button>
                        )}
                    </div>
                    {(isActive ? isShowCheckbox.active : isShowCheckbox.inActive) &&
                        (
                            <div className={`flex items-center gap-2 md:ml-8`}>
                                <Button
                                    variant={'white'}
                                    onClick={() => showModal('delete')}
                                    disabled={isActive ? selected.active.length === 0 : selected.inActive.length === 0}
                                >
                                    <div className={`flex items-center gap-2 flex-nowrap`}>
                                        <FontAwesomeIcon icon={faTrash} />
                                        Delete
                                    </div>
                                </Button>
                                <Button
                                    variant={'white'}
                                    onClick={() => showModal('deactive')}
                                    disabled={isActive ? selected.active.length === 0 : selected.inActive.length === 0}
                                >
                                    <div className={`flex items-center gap-2 flex-nowrap`}>
                                        <FontAwesomeIcon icon={faArrowRight} />
                                        Move to {isActive ? 'Inactive' : 'Active'}
                                    </div>
                                    
                                </Button>
                            </div>
                        )
                    }
                </div>
            }
        </>
    )
}

export default ManageArticle