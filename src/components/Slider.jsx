import { useEffect, useRef, useState } from "react" 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons"
const Slider = ({ children }) => {
    const [showPrev, setShowPrev] = useState(false)
    const [showNext, setShowNext] = useState(false)
    
    const containerRef = useRef()

    const scroll = (scrollOffset) => {
        if (scrollOffset > 0) {
            setShowPrev(true)
            const totalScroll = containerRef.current?.scrollLeft + containerRef.current?.clientWidth
            const scrollWidth = containerRef.current?.scrollWidth
            if (totalScroll < (scrollWidth - 1)) {
                setShowNext(true) 
            } else {
                setShowNext(false) 
            }

        } else if (scrollOffset < 0) {
            setShowNext(true) 
            if (containerRef.current?.scrollLeft + scrollOffset <= 0) {
                setShowPrev(false)
            }
        }
        containerRef.current.scrollLeft += scrollOffset;
    };

    const setButtonNextHandler = () => {
        if (containerRef) {
            if (containerRef.current?.scrollWidth > containerRef.current?.clientWidth) {
                setShowNext(true)
            } else {
                setShowNext(false)
            }
        }
    }

    const handleScroll = (e) => {
        const scrollLeft = e.target.scrollLeft
        const clientWidth = e.target.clientWidth
        const scrollWidth = e.target.scrollWidth

        if (scrollLeft + clientWidth < scrollWidth) {
            setShowNext(true) 
            setShowPrev(scrollLeft > 0)
        } else {
            setShowNext(false) 
        }
    }

    useEffect(() => { 
        if (containerRef) {
            setButtonNextHandler()
            containerRef.current?.addEventListener('scroll', handleScroll)
        }
    }, [containerRef, children])

    window.onresize = () => {
        setButtonNextHandler()
    }
    
    return (
        <div className={`relative w-full`}>
            <div ref={containerRef} className={`overflow-x-scroll flex gap-2 items-center no-scrollbar relative`}>
                {children}
            </div>
            <ButtonSlider
                onClick={() => scroll(-80)}
                show={showPrev}
                className={`left-0 bg-gradient-to-r`}
            >
                <FontAwesomeIcon icon={faChevronLeft} />
            </ButtonSlider>
            <ButtonSlider
                onClick={() => scroll(80)}
                show={showNext}
                className={`right-0 bg-gradient-to-l`}

            >
                <FontAwesomeIcon icon={faChevronRight} />
            </ButtonSlider>
        </div>
    )
}

const ButtonSlider = ({onClick, children, show, className}) => {
    return (
        <div className={`absolute h-full flex items-center top-0 ${className} ${show ? '' : 'hidden'}  from-white to-transparent px-2`}>
            <button
                onClick={onClick}
                className={`text-sm text-gray-500`}
                >
                {children}
            </button>
        </div>
    )
}

export default Slider