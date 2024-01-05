import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Register,{loader as registerLoader} from "./pages/auth/Register"
import Login,{loader as loginLoader} from "./pages/auth/Login"
import Layout,{loader as layoutLoader} from "./pages/Layout"
import Home, {loader as homeLoader} from "./pages/Home"
import Article, {loader as articleLoader} from "./pages/Article"
import TagsList,{loader as tagsListLoader} from "./pages/TagsList"
import Profile, {loader as profileLoader} from "./pages/Profile"
import CreateArticle, {loader as createArticleLoader} from './pages/CreateArticle'
import Logout, { loader as logoutLoader } from "./pages/auth/Logout"
import Error from "./pages/Error"

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Error />,
    loader: layoutLoader,
    children: [
      {
        index: true,
        element: <Home />,
        loader: homeLoader
      },
      {
        path:'/tag?/*',
        element: <Home />,
        loader: homeLoader,
      },
      {
        path:'/search?/*',
        element: <Home />,
        loader: homeLoader,
      },
      {
        path: 'sign-up',
        element: <Register />,
        loader: registerLoader
      },
      {
        path: 'login',
        element: <Login />,
        loader: loginLoader
      },
      {
        path: '/explore-topics',
        element: <TagsList />,
        loader: tagsListLoader
      },
      {
        path: '/create/article',
        element: <CreateArticle />,
        loader: createArticleLoader
      },
      {
        path: '/update/article/:id',
        id: 'article-detail',
        element: <CreateArticle />,
        loader: createArticleLoader
      },
      {
        path: '/logout',
        element: <Logout />,
        loader: logoutLoader
      },{
        path: ':writter',
        element: <Profile />,
        loader: profileLoader
      },
      {
        path: ':writter/:title',
        element: <Article />,
        loader:articleLoader
      },
    ]
  },
])


function App() {
  return <RouterProvider router={router}></RouterProvider>
}

export default App
