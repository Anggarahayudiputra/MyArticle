import { useState } from "react"
import { Link, redirect, useNavigate,  } from "react-router-dom"
import { getToken } from "../../utils/Auth"
import { isNotEmpty } from "../../utils/InputValidate"
import axios from "../../api/axios"
import { useDispatch } from "react-redux"
import { userAction } from "../../store/user"

import Input from "../../components/Form/Input"
import Button from "../../components/Form/Button"
import ErrorAlert from "../../components/ErrorAlert"


const initialState = {
        email: '',
        password: ''
}
    
const initialStateError = {
        email: null,
        password: null
    }

const Login = () => { 
    const [data, setData] = useState(initialState)
    const [isError, setIsError] = useState(initialStateError)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const setDataHandler = (e, key) => {
        setData((prevState) => ({
            ...prevState,
            [key]:e.target.value
        }))
    }

    const submitHandler = async (e) => {
        setIsLoading(true)
        e.preventDefault()

        if (!isValidate()) {
            setIsLoading(false)
            return    
        }
        
        try {
            setError(null)
            const response = await axios.post('/login',
                JSON.stringify({ 
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
            if (err?.response?.status === 400 || err?.response?.status === 401) {
                Object.keys(err?.response?.data).forEach((key) => {
                    setError(err?.response?.data[key])
                })
            }
            console.log(err);
        }
        setIsLoading(false)

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
            }
        })

        return validate
    }
 
    return (
        <div className={`h-screen flex justify-center items-center px-4`}>
            <div className={`border-[1px] border-gray-300 rounded-md py-8 px-5`}>
                <form onSubmit={submitHandler} >
                    <h1 className={`text-center mb-6 font-semibold font-xl`}>
                        Welcome to <span className={`text-black `}>MyArticle.</span>
                    </h1>
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
                    {error && <ErrorAlert message={error} className={`my-3`} />}
                    <Button type="submit" customWidth={`w-full`} disabled={isLoading}>{isLoading ? 'Login...' :'Login'}</Button>
                </form>
                <p className={`text-center mt-3 text-sm text-gray-500`}>
                    Create new account <Link to={'/sign-up'} className={`text-black`}>here.</Link>
                </p>
            </div>
        </div>
    )
}

export default Login

export function loader() { 
    const token = getToken()
    if (token && token !== 'EXPIRED') {
        return redirect('/')
    }
    return null
}