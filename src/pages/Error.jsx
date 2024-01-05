import { useRouteError } from "react-router-dom"
import NoNetwork from "../components/Error/NoNetwork";
import PageNotFound from "../components/Error/PageNotFound";
import SomethingWentWrong from "../components/Error/SomethingWentWrong";

const Error = () => {
    const error = useRouteError()

    let message = 'Something went wrong!';

    if (!error.status) {
        message = error.message;
    }

    if (error.status === 500) {
        message = error.data.message;
    }
    
    return (
        <>
            { message === 'Internal Server Error' || message === 'Network Error'  && (
                <NoNetwork />
            )}

            { error.status === 404 && (
                <PageNotFound />
            )}

            { (error.status === 500 && message !== 'Internal Server Error') || !error.status && (
                <SomethingWentWrong />
            )}

        </>
    )
}

export default Error