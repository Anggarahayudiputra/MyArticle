import { Outlet,  useLoaderData,  useLocation, useNavigation, defer } from "react-router-dom"
import Navbar from "../components/Navbar/Navbar"
import { useEffect, useState  } from "react"
import { useDispatch } from "react-redux"
import { userAction } from "../store/user"
import { getToken } from "../utils/Auth"
import getUser from "../services/getUser"
import Footer from "../components/Footer"
import LoadingBar from "react-top-loading-bar"

const Layout = () => {
    const location = useLocation()
    const navbar = !location.pathname.includes('/create/article') && !location.pathname.includes('/update/article')
    const loaderData = useLoaderData()
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        if (loaderData.data) {
            dispatch(userAction.setUser({
                name:loaderData.data.name,
                email:loaderData.data.email,
                id: loaderData.data.id,
                created_at:loaderData.data.created_at,
            }))
        } 
    }, [loaderData, dispatch])

    useEffect(() => {
        if (navigation.state === "loading") {
            setProgress(prev => prev < 100 ? prev + 30 : 100)
        } else {
            setProgress(prev => prev < 100 ? 100 : prev + 30)
        }
    },[navigation.state])

    useEffect(() => {
        if (progress === 100) {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    },[progress])


    return (
        <>
            <LoadingBar
                color='black'
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
            />
            {navbar && <Navbar />}
            <main>
                <Outlet/>
            </main>
            <Footer />
        </>
    )
}

export default Layout

export async function loader() {
    let data = null

    const token = getToken()
    const user = async () => {
        if (token && token !== 'EXPIRED') {
            const response = await getUser();
            if (response?.status === 200) {
                data = {
                    name:response.data.data.name,
                    email:response.data.data.email,
                    id: response.data.data.id,
                    created_at:response.data.data.created_at,
                    total_articles:response.data.data.total_articles,
                }
            }
        }
    } 

    await user()
    return defer({data : data})
}

