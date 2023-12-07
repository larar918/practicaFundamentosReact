import Layout from "../../components/Layout";
import '../../styles/404.css'

function NotFoundPage () {
    return <Layout>
    <div className='page'>
        <span className="errorMessage">
            <h2><span className="errorText">Error 404 - Page Not Found</span></h2>
        </span>
    </div>
    </Layout>
}

export default NotFoundPage;