import { useSelector } from "react-redux";
import Tag from "../components/Tag"
import { getToken } from "../utils/Auth";
import { formatedDate } from "../utils/Date";
import Button from "../components/Form/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import getArticle from "../services/getArticle";

const Article = () => {
    const navigate = useNavigate()
    const token = getToken()
    const loaderData = useLoaderData()
    const article = loaderData.data.data
    const userId = useSelector(state => state?.user?.user?.id)
    const isWritter = token && token !== 'EXPIRED' && (userId === article.writter.id)
    return (
        <section className={`flex justify-center px-6 py-8 md:py-14`}>
            <article className={`w-full xl:max-w-[780px]`}>
                {isWritter && (
                    <div className={`flex justify-end mb-4`}>
                        <Button onClick={() => navigate(`/update/article/${article.id}`)}>
                            <div className={`flex items-center gap-3`}>
                                <FontAwesomeIcon icon={faPencil} />
                                Edit
                            </div>
                        </Button>
                    </div>
                )}
                <header>
                    <h1 className={`text-left text-xl md:text-5xl font-bold`}>
                        {article.title}
                    </h1>
                    <div className={`flex items-center gap-4 mt-8`}>
                        <p className={`bg-gray-100 flex items-center justify-center w-[42px] h-[42px] rounded-full`}>
                            {article.writter.name.split('')[0]}
                        </p>
                        <div>
                            <p className={`capitalize hover:underline`}>
                                <Link to={`/${article.writter.name.replaceAll(' ','-')}`}>{article.writter.name}</Link>
                            </p>
                            <p className={`text-xs text-gray-500`}>{formatedDate(article.created_at, true, true, true)}</p>
                        </div>
                    </div>
                </header>
                <img
                    src={article.image}
                    alt={article.title}
                    className={`object-contain border-[1px] border-gray-300 rounded-md mt-8 h-[280px] md:h-[468px] w-full md:min-w-[688px]`}
                />
                <p className={`text-gray-500 text-md mt-8 whitespace-pre-line`}>
                    {article.content}
                </p>
                <div className={`flex items-center gap-2 mt-8 flex-wrap`}>
                    {article.tags.map((tag, index) => {
                        return (
                            <Tag key={index} to={`/tag/${tag.title.toLowerCase()}`}>{tag.title}</Tag>
                        )
                    })}
                </div>
            </article>
        </section>
    )
}

export default Article

export async function loader({ params }) {
    const title = params.title.replaceAll('-',' ')
    const response = await getArticle(title)
    return response
}
