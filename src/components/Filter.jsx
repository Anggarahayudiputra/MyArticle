import { useState } from "react"
import Categories from "./Categories"
import Dropdown from "./Dropdown"
import Button from "./Form/Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons"

const ITEMS = [
    { id: 1, title: 'Newest' },
    { id: 2, title: 'Oldest' }
]
const Filter = () => {
    const [open, setOpen] = useState()
    const [selected, setSelected] = useState(ITEMS[0])

    const selectHandler = (value) => setSelected(value)
    const openHandler = () => setOpen(!open)
    
    return (
        <div className={`flex justify-center absolute top-28 w-full`}>
            <div className={`flex items-center gap-4 w-auto px-4 py-2 bg-white rounded-lg shadow-md`}>
                <Dropdown items={ITEMS} onSelect={selectHandler} open={open} selected={selected}>
                    <Button
                        variant={'white'}
                        onClick={openHandler}
                    >
                        <div className={`flex gap-4 justify-between items-center text-gray-500`}>
                            {selected.title}
                            <FontAwesomeIcon icon={ open ? faChevronDown : faChevronUp } />
                        </div>
                    </Button>
                </Dropdown>
                <Categories />
            </div>
        </div>
    )
}

export default Filter