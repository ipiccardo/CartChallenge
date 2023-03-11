import CardContainer from '../CardContainer/CardContainer';
import Header from '../Header/Header';
import '../../styles/globals.css'


const Dashboard = () => {
    return (
        <>
            <Header />
            <div className='padding-h-1'>
            <CardContainer />
            </div>
        </>
    )
}

export default Dashboard