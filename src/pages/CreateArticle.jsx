import { useEffect, useState } from "react"
import { getToken } from "../utils/Auth";
import { redirect, useNavigate, useRouteLoaderData } from "react-router-dom";
import axios from "../api/axios";
import { useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck } from "@fortawesome/free-solid-svg-icons"
import CreateArticleNavbar from "../components/Navbar/CreateArticleNavbar"
import Input from "../components/Form/Article/Input"
import InputTextArea from "../components/Form/Article/InputTextArea";
import InputImage from "../components/Form/Article/InputImage";
import getArticle from "../services/getArticle";
import getTags from "../services/getTags";
import groupNames from "../utils/TagsFormated";
import { isNotEmpty } from "../utils/InputValidate";
import Toggle from "../components/Form/Toggle";
import ErrorMessage from "../components/Form/Article/ErrorMessage";

const createFile = async (imageURL) => {
    const response = await fetch(process.env.REACT_API_URL + '/photo/blob?url=' + imageURL)
    const blob = await response.blob()
    return new File([blob], 'image.jpg', { type: blob.type })
}

const CreateArticle = () => { 
    const token = getToken()
    const navigate = useNavigate()
    const loaderData = useRouteLoaderData('article-detail') || null;
    const article = loaderData?.data.data 
    const [data, setData] = useState({
        title:article?.title || '',
        image: article?.image || null,
        content:article?.content || '',
        tags: article?.tags.map(item => item.id) || [],
        status: article?.status || false
    })
    const [error, setError] = useState({
        title:null,
        image:null,
        content:null,
        tags:null,
        status:null
    })

    const [tagsData, setTagsData] = useState([])
    const [init, setInit] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const user = useSelector(state => state.user.user)

    useEffect(() => {
        if (!init) {
            const fetchTags = async () => {
                const response = await getTags()
                const tagsList = groupNames(response.data)
                setTagsData(tagsList)
            }
            fetchTags()
            setInit(true)
        }
    }, [init])

    const titleHandler = (e) => setData((prev) => {
        return ({
            ...prev,
            ['title']: e.target.value
        })
    })

    const uploadImageHandler = (e) => {
        setData(prev => {
            return {
                ...prev,
                ['image']: e.target.files[0]
            }
        });
    };

    const contentHandler = (e) => setData(prev => {
        return {
            ...prev,
            ['content']: e.target.value
        }
    })

    const tagsHandler = (value) => {

        if (data.tags.includes(value)) {
            const newData = data.tags.filter((tag) => tag !== value)
            setData((prev) => {
                return {
                    ...prev,
                    ['tags']: newData
                }
            })
        } else {
            if (data.tags.length < 5) {
                setData((prev) => {
                    return {
                        ...prev,
                        ['tags']: [...data.tags, value]
                    }
                })
            }
        }
    }

    const publishHandler = () => {
        setData(prev => {
            return {
                ...prev,
                ['status']: !data.status
            }
        })
    }

    const submitHandler = async () => {
        setIsLoading(true)
        const validate = isValidate()
        if (!validate) {
            setIsLoading(false)
            return false
        }

        const imageValue = typeof data.image === 'string' ? await createFile(article?.image) :  data.image

        const formData = {
            title:data.title,
            image:imageValue,
            content:data.content,
            tags:data.tags,
            status:data.status ? 1 : 0
        }

        if (article) {
            formData.id = article.id
        }
        try {
            const storeURL = article ? 'update-article' : 'store-article'
            await axios.post(storeURL, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    'Authorization': 'Bearer ' + token
                },
            });
            navigate(`/${user.name.replaceAll(' ','-').toLowerCase()}`)
        } catch (err) {
            console.log(err)
        }

        setIsLoading(false)
    }

    const isValidate = () => {
        let isValidate = true
        Object.keys(data).forEach(key => {
            const checkEmpty = isNotEmpty(data[key], key)
            if (!checkEmpty.validate) {
                isValidate = false
                setError(prev => {
                    return {
                        ...prev,
                        [key]: checkEmpty.message
                    }
                })
            } else {
                setError(prev => {
                    return {
                        ...prev,
                        [key]: null
                    }
                })
            }
        })
        return isValidate
    }

    return (
        <>
            <CreateArticleNavbar submitHandler={submitHandler} isLoading={isLoading} />
            <section className={`flex justify-center py-14`}>
                <div className={`w-full xl:max-w-[780px] px-6`}>
                    <Input onChange={titleHandler} value={data.title} autoFocus={true} error={error.title}/>
                    <InputImage onChange={uploadImageHandler} image={data.image} error={error.image} />
                    <InputTextArea onChange={contentHandler} value={data.content} error={error.content}/>
                    <ListTags tags={data.tags} list={tagsData} tagsHandler={tagsHandler} error={error.tags} />
                    <Toggle className={`mt-3`} checked={data.status} onChange={publishHandler} title={`Publish this article`}/>
                </div>
            </section>
        </>
    )
}

const ListTags = ({ tags, list, tagsHandler, error }) => {
    return (
        <div className={`mt-14`}>
            <h2>Select Categories (max 5)</h2>
           {error &&
                <ErrorMessage error={error}/>
            }
            <div className={`grid grid-cols-2 lg:grid-cols-3 gap-3 p-4 border-[1px] ${error ? 'border-red-600': 'border-gray-200'} rounded-md mt-4`}>
                {list.map((item, index) => {
                    return (
                        <div key={index}>
                            <p className={`font-semibold text-xl`}>{item.header}</p>
                            <div className={`mt-3`}>
                                {item.tagsList.map((tag, i) => {
                                    const selected = tags.includes(tag.id)
                                    return (
                                        <div key={i} className={`relative`}>
                                            <input type="checkbox" onClick={() => tagsHandler(tag.id)} className={`absolute top-0 left-0 h-full w-full z-10 hover:cursor-pointer opacity-0`} />
                                            <label className={`flex items-center gap-3 mb-3 ${selected ? 'text-green-500 font-semibold underline' : 'text-black'}`}>
                                                {tag.title}
                                                {selected &&
                                                    <FontAwesomeIcon icon={faCheck} className={`text-[8px]`} />
                                                }
                                            </label>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>
 
        </div>
    )
}

export default CreateArticle


export async function loader({params}) { 
    const id = params?.id
    const token = getToken()

    if (!token || token === 'EXPIRED') {
        return redirect('/login')
    }

    if (id) {
        const response = await getArticle(null, id)
        return response
    }

    return null
}