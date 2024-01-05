import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom"
import InputSearch from "../components/InputSearch"
import getTags from "../services/getTags"
import groupNames from "../utils/TagsFormated";

const TagsList = () => {
    const loaderData = useLoaderData()
    const [init, setInit] = useState(false)
    const [tags, setTags] = useState([])
    const [initTags, setInitTags] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        if (loaderData?.data && !init) {
            const set = groupNames(loaderData?.data)
            setTags(set)
            setInitTags(set)
            setInit(true)
        }
    }, [loaderData, init])

    useEffect(() => {
        const data = () => { 
            if (search.trim().length === 0) {
                setTags(initTags)
            } else {
                if (initTags.length > 0) {
                    const firstLetter = initTags.filter((val) => val.header.charAt(0).toLowerCase() === search.charAt(0).toLowerCase())
                    if (firstLetter.length > 0) {
                        const filterData = firstLetter[0].tagsList.filter((val) => { 
                            const a = val.title.slice(0, search.length).toLowerCase()
                            const b = search.toLocaleLowerCase()
                            return a === b
                        })
                        setTags([{
                            header: filterData.length > 0 ? firstLetter[0].header : null,
                            tagsList: filterData
                        }])
                    } else {
                        setTags([{
                            header: null,
                            tagsList: []
                        }])
                    }
                }
            }
        }
        data()
    },[search, initTags])

    const searchHandler = (e) => {
        const value = e.target.value
        setSearch(value)
    }
    
    return (
        <div className={`py-4 px-8 min-h-screen`}>
            <section className={`py-14 flex items-center flex-col`}>
                <h1 className={`font-bold text-5xl text-center mb-8`}>Explore Topics</h1>
                <InputSearch className={`px-8 py-4 w-full lg:min-w-[400px]`} placeholder={`Search topics ..`} value={search} onChange={searchHandler} />
            </section>
            <hr />
            <section className={`py-12 lg:px-24 grid grid-cols-2 lg:grid-cols-3 gap-y-10`}>
                {tags.length > 0 ? tags.map((tag, index) => {
                    return (
                        <div key={index}>
                            <h2 className={`mb-6 font-semibold text-2xl`}>{tag.header}</h2>
                            <TagItem items={tag.tagsList} />
                        </div>
                    )
                })
                :
                <></>}
            </section>
        </div>
    )
}

const TagItem = ({ items }) => {
    return (
        <div className={`flex flex-col gap-3`}>
            {items.map((item, index) => {
                return (
                    <Link key={index} to={`/tag/${item.title.toLowerCase()}`} className={`text-gray-500 hover:underline`}>{item.title}</Link>
                )
            })}
        </div>
    )
}

export default TagsList

export async function loader() { 
    const response = await getTags()
    return response
}