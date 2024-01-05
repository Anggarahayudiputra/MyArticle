import Wifi from '../../assets/wifi-icon.svg'
import Button from "../Form/Button"

const NoNetwork = () => {
    const refreshPage = () => {
        location.reload();
    }

    return (
        <section className={`flex items-center justify-center h-screen`}>
            <div>
                <img src={Wifi} className={`w-[120px] h-auto mx-auto`} />
                <p className={`text-center font-semibold`}>Oops, No network</p>
                <Button onClick={ refreshPage } className={`mx-auto mt-3`}>Try again</Button>
            </div>
        </section>
    )
}

export default NoNetwork