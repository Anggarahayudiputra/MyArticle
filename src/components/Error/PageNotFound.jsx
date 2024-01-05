import { useNavigate } from "react-router-dom"
import Button from "../Form/Button"

const PageNotFound = () => {
    const navigate = useNavigate()
    return (
        <section className={`flex items-center justify-center h-screen`}>
            <div>
                <h1 className={`text-center font-black text-8xl mb-4`}>404</h1>
                <p className={`text-center font-semibold`}>Sory, the page you are looking for doesn`t exist.</p>
                <Button onClick={ () => navigate('/') } className={`mx-auto mt-3`}>Back to home</Button>
            </div>
        </section>
    )
}

export default PageNotFound