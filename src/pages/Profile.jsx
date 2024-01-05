import { useState, useRef, useEffect } from "react"
import { getToken } from "../utils/Auth"
import { useDispatch, useSelector } from "react-redux"
import { formatedDate } from "../utils/Date"
import getUser from "../services/getUser"
import { useLoaderData, useNavigate } from "react-router-dom"
import getWritterArticles from "../services/getWritterArticles"
import axios from "../api/axios"

import ManageArticle from "../components/Profile/ManageArticle"
import Articles from "../components/Profile/Articles"
import Modal from "../components/Modal"
import ModalContent from "../components/Profile/ModalContent"
import Button, { ButtonNextPage } from "../components/Form/Button"
import { profileAction } from "../store/profile"
import Create from '../assets/create-icon.svg'
import File from '../assets/file-icon.svg'


const Profile = () => {
    const dialog = useRef()
    const token = getToken()
    const loaderData = useLoaderData()
    const user = loaderData?.data?.data
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userLoggedIn = useSelector(state => state.user.user)
    const isActive = useSelector(state => state.profile.isActive)
    const articles = useSelector(state => state.profile.articles)
    const selected = useSelector(state => state.profile.selected)
    const paginate = useSelector(state => state.profile.paginate)
    const [modalType, setModalType] = useState(null)
    const [init, setInit] = useState({ active: false, inActive: false })
    const [prevUser, setPrevUser] = useState(null)
    const [showArticles, setShowArticles] = useState({
        empty: false,
        create: false,
        list: false
    })
    const isLoggedIn = token && token !== 'EXPIRED'
    const isWritter = isLoggedIn ? Number(userLoggedIn?.id) === Number(user.id) : false
    const listArticles = isActive ? articles.active : articles.inActive
    const page = isActive ? paginate.active : paginate.inActive
    const totalArticles = user.total_articles

    useEffect(() => {
        if (!token && token !== 'EXPIRED') {
            dispatch(profileAction.reset())
        }
    }, [token, dispatch])

    useEffect(() => {
        const get = async () => {
            const response = await getWritterArticles(isActive ? 1 : 0, user.id)
            if (isActive) {
                dispatch(profileAction.setActiveArticles(response.data.data))
                dispatch(profileAction.setActivePaginate({
                    current_page: response.data.current_page,
                    last_page:response.data.last_page,
                    total_page: response.data.total,
                    next_page_url: response.data.next_page_url
                }))
            } else {
                dispatch(profileAction.setInActiveArticles(response.data.data))
                dispatch(profileAction.setInActivePaginate({
                    current_page: response.data.current_page,
                    last_page:response.data.last_page,
                    total_page: response.data.total,
                    next_page_url: response.data.next_page_url
                }))
            }
            setInit(prev => ({...prev,[isActive ? 'active' : 'inActive']: true}))
        }

        if (user) {
            if ((isActive && !init.active) || (!isActive && !init.inActive)) {
                get()
            }
        }
        
    }, [user, init, isActive, dispatch])

    useEffect(() => {
        setShowArticles({
            empty: (listArticles.length === 0 && totalArticles > 0) || !isWritter && totalArticles === 0,
            create: isWritter && totalArticles === 0,
            list: (isWritter && listArticles.length > 0) || (!isWritter && totalArticles > 0)
        })
    },[totalArticles, isWritter, isActive, listArticles])

    useEffect(() => {
        if (user) {
            if (user !== prevUser) {
                setInit({active: false, inActive: false})
            }
            setPrevUser(user.name)
        }
    },[user, prevUser])

    const showModal = (value) => {
        setModalType(value)
        dialog.current.open()
    }

    // close modal
    useEffect(() => {
        if (isActive ? selected.active.length === 0 : selected.inActive.length === 0) {
            dialog.current.close()
            setModalType(null)
        }
    }, [selected, isActive])

    const manageHandler = () => {
        const submit = async () => {
            const formData = {};
            let ids = isActive ? selected.active : selected.inActive
            formData['id'] = ids 
    
            if (modalType !== 'delete') {
                formData['status'] = isActive ? 0 : 1 
            }
            
            const URL = modalType === 'delete' ? `/delete-article` : `update-status`
            
            try {
                if (modalType === 'delete') {
                    await axios.delete(URL, {
                        data: formData,
                        headers: { 'Authorization': `Bearer ${token}` }
                    })
                    window.location.reload(false)    
                } else {
                    await axios.post(URL, formData, {
                        headers: {
                            'Content-type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    })
                }
                setInit({ active: false, inActive: false })
                await dialog.current.close()
                setModalType(null)
                dispatch(profileAction.setActiveSelected([]))
                dispatch(profileAction.setInActiveSelected([]))
                dispatch(profileAction.setShowCheckbox({type: 'active', value: false}))
                dispatch(profileAction.setShowCheckbox({type: 'inActive', value: false}))
            } catch (err) { 
                console.log(err)
            }

        }

        submit()
    }

    const next = async () => {
        const response = await getWritterArticles(isActive ? 1 : 0, user.id, page.current_page + 1)
        const data = [...listArticles, ...response.data.data]
        if (isActive) {
            dispatch(profileAction.setActiveArticles(data))
            dispatch(profileAction.setActivePaginate({
                current_page: response.data.current_page,
                last_page:response.data.last_page,
                total_page: response.data.total,
                next_page_url: response.data.next_page_url
            }))
        } else {
            dispatch(profileAction.setInActiveArticles(data))
            dispatch(profileAction.setInActivePaginate({
                current_page: response.data.current_page,
                last_page:response.data.last_page,
                total_page: response.data.total,
                next_page_url: response.data.next_page_url
            }))
        }
    }

    return (
        <>
            <Modal ref={dialog}>
                {modalType && 
                    <ModalContent
                        modalType={modalType}
                        buttonSubmit={
                            <Button onClick={ manageHandler} >
                                <p className={` capitalize `}>
                                    {modalType} ({ isActive ? selected.active.length : selected.inActive.length}) {isActive ? selected.active.length === 1 : selected.inActive.length === 1 ? 'article' : 'articles'}
                                </p>
                            </Button>
                        }
                    />
                }
            </Modal>
            <div className={`py-4 px-8`}>
                <section className={`py-12 flex items-center flex-col`}>
                    <div className={`w-[72px] h-[72px] text-3xl font-semibold bg-gray-100 flex items-center justify-center rounded-full capitalize`}>
                        {user?.name?.charAt(0)}
                    </div>
                    <h1 className={`font-bold text-3xl text-center mb-4 capitalize`}>{user?.name}</h1>
                    <p className={`text-gray-500`}>
                        Join at {formatedDate(user?.created_at, true, true, false)} · {user.total_articles} Articles
                    </p>
                </section>
                <hr className={`mb-8`} />
                
                <section>
                    {(totalArticles > 0 && isWritter) && (
                        <ManageArticle showModal={(value) => showModal(value)} />
                    )}

                    {showArticles.empty && (
                        <div className={`h-[60vh] flex justify-center items-center`}>
                            <div>
                                <img src={File} className={`w-[160px] h-auto mx-auto`} />
                                <p className={`text-center`}>
                                    Oops! there`s no articles ..
                                </p>
                            </div>
                        </div>
                    )}

                    {showArticles.create && (
                        <div className={` h-[60vh] flex items-center justify-center`}>
                            <div>
                                <img src={Create} alt="create-icon" className={`w-[160px] h-auto mx-auto`} />
                                <p className={`text-center mb-4`}>Let`s start to write your first article.</p>
                                <Button onClick={() => navigate('/create/article')} className={`mx-auto`}>
                                    Create Article
                                </Button>
                            </div>
                        </div>
                    )}

                    {showArticles.list && (
                        <>
                            <Articles/>
                            {(isActive ? paginate.active.next_page_url : paginate.inActive.next_page_url ) && <ButtonNextPage onClick={next} />}
                        </>
                    )}
                </section>
                

            </div>
        </>
    )
}


export default Profile

export async function loader({params}) {
    const name = params.writter?.replace('-',' ')
    const response = await getUser(name)
    return response
}
