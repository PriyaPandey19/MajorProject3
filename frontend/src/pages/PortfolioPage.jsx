import PortfolioGenerator from "../components/PortfolioGenerator";
import Navbar from "../components/Navbar";

const PortfolioPage = ({user, onLogout}) => {
    return(
        <>
       <Navbar user={user} onLogout={onLogout} />
        <div  className="min-h-screen bg-gray-50">
            <PortfolioGenerator user={user}/>
        </div>
        </>
    );
};
export default PortfolioPage;
