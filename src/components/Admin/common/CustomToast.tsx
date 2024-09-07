import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"

const CustomToast: React.FC = () => {
    return <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
    />
    {/* Same as */ }
    <ToastContainer />
}

export default CustomToast