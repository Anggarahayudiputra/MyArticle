import { useNavigate } from "react-router-dom"
import Button from "../Form/Button"

const SomethingWentWrong = () => {
    const navigate = useNavigate()
    return (
        <section className={`flex items-center justify-center h-screen`}>
            <div>
                <h1 className={`text-center font-black text-8xl mb-4`}>500</h1>
                <p className={`text-center font-semibold`}>Something went wrong!</p>
                <Button onClick={ () => navigate('/') } className={`mx-auto mt-3`}>Back to home</Button>
            </div>
        </section>
    )
}

export default SomethingWentWrong