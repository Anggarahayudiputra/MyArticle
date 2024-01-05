import { useState } from "react"
import axios from "../../api/axios"
import { useDispatch } from "react-redux"
import { userAction } from "../../store/user"

import Input from "../../components/Form/Input"
import Button from "../../components/Form/Button"
import { Link, useNavigate, redirect } from "react-router-dom"
import { getToken } from "../../utils/Auth"
import { isNotEmpty, isPassword } from "../../utils/InputValidate"
import ErrorAlert from "../../components/ErrorAlert"

const initialState = {
        first_name: '',
        last_name: '',
        email: '',
        password: ''
}
    
const initialStateError = {
        first_name: null,
        last_name: null,
        email: null,
        password: null
}

const Register = () => { 
    const [data, setData] = useState(initialState)
    const [isSubmit, setIsSubmit] = useState(false)
    const [error, setError] = useState(null)
    const [isError, setIsError] = useState(initialStateError)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const setDataHandler = (e, key) => {
        setData((prevState) => ({
            ...prevState,
            [key]:e.target.value
        }))
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        setIsSubmit(true)
        setError(null)
        if (!isValidate()) {
            setIsSubmit(false)
            return    
        }

        try {
            const response = await axios.post('/register',
                JSON.stringify({ 
                    name: data.first_name + ' ' + data.last_name,
                    email: data.email,
                    password: data.password
                 }),
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );


            localStorage.setItem('token', response.data.access_token)
            const expiration = new Date()
            expiration.setHours(expiration.getHours() + 1)
            localStorage.setItem('expiration', expiration.toISOString())

            dispatch(userAction.setUser({
                name:response.data.data.name,
                email:response.data.data.email,
                id: response.data.data.id,
                created_at: response.data.data.created_at,
                total_articles:response.data.data.total_articles,
            }))

            navigate('/')
        } catch (err) {
            if (err?.response?.status === 400) {
                Object.keys(err?.response?.data).forEach((key) => {
                    setError(err?.response?.data[key])
                })
            }
            console.log(err);
        }
        setIsSubmit(false)

        
    }

    const isValidate = () => {
        let validate = true
        Object.keys(data).forEach((key) => {
            // is empty
            const validateIsNotEmpty = isNotEmpty(data[key], key)
            if (!validateIsNotEmpty.validate) {
                setIsError((prevState) => ({
                    ...prevState,
                    [key]: validateIsNotEmpty.message
                }))
                validate = false
            } else {
                setIsError((prevState) => ({
                    ...prevState,
                    [key]: null
                }))

                if (key === 'password') {
                    const validateIsPassword = isPassword(data[key], key)
                    if (!validateIsPassword.validate) {
                        setIsError((prevState) => ({
                            ...prevState,
                            [key]: validateIsPassword.message
                        }))
                        validate = false
                    }
                }
            }
        })

        return validate
    }


    return (
        <div className={`h-screen flex justify-center items-center px-4`}>
            <div className={`border-[1px] border-gray-300 rounded-md py-8 px-5`}>
                <form onSubmit={submitHandler} >
                    <h1 className={`text-center mb-6 font-semibold font-xl`}>Registration Form</h1>
                    <div className={`flex justify-between items-start gap-3 mb-3`}>
                        <Input
                            type="text"
                            label="First Name"
                            value={data.first_name}
                            onChange={(e) => setDataHandler(e, 'first_name')}
                            error={isError.first_name}
                        />
                        <Input
                            type="text"
                            label="Last Name"
                            value={data.last_name}
                            onChange={(e) => setDataHandler(e, 'last_name')}
                            error={isError.last_name}
                        />
                    </div>
                    <div className={`mb-3`}>
                        <Input
                            type="email"
                            label="Email Address"
                            value={data.email}
                            onChange={(e) => setDataHandler(e, 'email')}
                            error={isError.email}
                        />
                    </div>
                    <div className={`mb-3`}>
                        <Input
                            type="password"
                            label="Password"
                            value={data.password}
                            onChange={(e) => setDataHandler(e, 'password')}
                            error={isError.password}
                        />
                    </div>

                    {error ? <ErrorAlert message={error} className={`mb-3`} /> : <></>}

                    <Button type="submit" customWidth={`w-full`} disabled={isSubmit}>
                        { isSubmit ? 'Submiting .. ' : 'Register'}
                    </Button>
                </form>
                <p className={`text-center mt-3 text-sm text-gray-500`}>
                    Already have an accout? <Link to={'/login'} className={`text-black`}>Sign in here</Link>
                </p>
            </div>
        </div>
    )
}

export default Register

export function loader() { 
    const token = getToken()
    if (token && token !== 'EXPIRED') {
        return redirect('/')
    }

    return null
}