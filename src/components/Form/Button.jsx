const Button = ({ type, children, onClick, disabled, variant, customWidth, noBorder, className }) => { 

    let color = 'bg-black text-white focus-visible:outline-black'
    if (variant === 'white') {
        color = `bg-white text-gray-500 ${noBorder ? '' : 'border-[1px] border-gray-200'}`
    }else if (variant === 'light') {
        color = `bg-gray-100 text-gray-500 ${noBorder ? '' : 'border-[1px] border-gray-200'}`
    }

    let size = 'rounded-md px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'

    return <button
        type={type || 'button'}
        onClick={onClick}
        className={`${!disabled ? 'hover:shadow-md' : '' } flex ${customWidth ?? 'w-auto'} justify-center ${size} ${color} ${className || 'first-letter:'}`}
        disabled={disabled}
    >
        {children}
    </button>
}

export default Button

export function ButtonNextPage({ onClick }) {
    return (
        <div className={`flex justify-center mt-6`}>
            <Button onClick={onClick} variant={'light'} noBorder={true}>Load more ...</Button>
        </div>
    )
}