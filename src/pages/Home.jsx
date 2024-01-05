import { useEffect } from "react"
import { useLocation, useLoaderData, redirect, defer } from "react-router-dom"
import getArticles from "../services/getArticles"
import getTags from "../services/getTags"
import Card from "../components/Card"
import Tags from "../components/Tags"
import { useDispatch, useSelector } from "react-redux"
import { articlesAction } from "../store/articles"
import { tagsAction } from "../store/tags"
import { ButtonNextPage } from "../components/Form/Button"
import Search from '../assets/search-icon.svg'

const Home = () => {
    const loaderData = useLoaderData()
    const location = useLocation()

    const dispatch = useDispatch()

    const articles = useSelector( (state) => state.articles.articles )
    const paginate = useSelector( (state) => state.articles.paginate )
    const tags = useSelector((state) => state.tags.tags)
    
    const isTag = location.pathname.split('/')[1] === 'tag'
    const tag = isTag ? location.pathname.split('/')[2] : null
    const isSearch = location.pathname.split('/')[1] === 'search'
    const search = isSearch ? location.pathname.split('/')[2] : null

    useEffect(() => {
        const articlesData = loaderData.articles.data

        dispatch(articlesAction.setArticles(articlesData.data))
        dispatch(articlesAction.setPaginate({
            current_page: articlesData.current_page,
            last_page: articlesData.last_page,
            total_page: articlesData.total_page,
            next_page_url: articlesData.next_page_url,
        }))

        dispatch(tagsAction.setTags(loaderData.tags.data))
    }, [loaderData, dispatch])

    const getNextPage = async () => {
        if (paginate.next_page_url) {
            const response = await getArticles(search, tag, paginate.current_page + 1)
            const articlesData = response.data
            const newArticles = [...articles, ...articlesData.data]
            dispatch(articlesAction.setArticles(newArticles))
            dispatch(articlesAction.setPaginate({
                current_page: articlesData.current_page,
                last_page: articlesData.last_page,
                total_page: articlesData.total_page,
                next_page_url: articlesData.next_page_url,
            }))
        }
    }
    
    return (
        <div className={`py-4 px-8`}>
            {isTag &&
                <>
                    <section className={`py-12 flex items-center flex-col`}>
                        <h1 className={`font-bold text-5xl text-center mb-4 capitalize`}>{tag}</h1>
                    <p className={`text-gray-500`}>Topic · {articles.length} Article{ articles.length > 1 ? 's': ''}</p>
                    </section>
                    <hr className={`mb-8`} />
                </>
            }
            {tags && <Tags tags={tags} /> }

            {articles.length > 0 ? (
                <>
                    <section className={`grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4`}>
                        {articles.map((article, index) => {
                            return (
                                <Card
                                    key={index}
                                    article={article}
                                />
                            )
                        })}
                    </section>
                    {paginate.next_page_url && <ButtonNextPage onClick={getNextPage} />}
                </>
            ) : (
                <>
                    {(isSearch || isTag) ? (
                        <div className={`h-screen flex justify-center items-center`}>
                            <div>
                                <img src={Search} className={`w-[160px] h-auto`} />
                                <p>Oops! No result found ..</p>           
                            </div>
                        </div>
                        )
                        :
                        (
                        <div className={`h-screen flex justify-center items-center`}>
                            <div>
                                <img src={Search} className={`w-[160px] h-auto`} />
                                <p>Oops! No result found ..</p>           
                            </div>
                        </div>
                        )
                    }        
                </>
            )}
        </div>
    )
}

export default Home

export async function loader({ request, params }) { 
    const appURL = process.env.REACT_APP_URL

    const path = request.url.split(appURL)[1]
    const parameter = path.split('/')[1]

    const isSearch = parameter === 'search'
    const isTag = parameter === 'tag'

    if (isSearch || isTag) {
        if ( params['*'] === '') {
            return redirect('/')
        }
    }
    const articles = await getArticles(isSearch ? params?.['*'] : null, isTag ? params?.['*'] : null, null)
    const tags = await getTags(15)
    return defer({
        articles: articles, 
        tags: tags
    })
}