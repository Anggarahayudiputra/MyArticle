import { useNavigate } from "react-router-dom"
import Button from "../Form/Button"


const CreateArticleNavbar = ({ submitHandler, isLoading }) => {
    const navigate = useNavigate()
    return (
        <nav className={`flex items-center justify-between py-4 px-8 border-b-[1px] bg-white border-gray-200 sticky top-0 z-[99999]`}>
            <Button onClick={() => navigate(-1)} noBorder={true} variant={`light`}>Cancel</Button>
            <Button onClick={submitHandler} disabled={isLoading} className={`whitespace-nowrap`}>
                {isLoading ? 'Saving..' : 'Save'}
            </Button>
        </nav>
    )
}


export default CreateArticleNavbar