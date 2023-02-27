import './Home.css'
import RoomList from './RoomList';

const Home = ( ) : JSX.Element => {
  return (
    <div className='home__container'>

      <div className="home__header">
        <h3>Game Channel list</h3>
      </div>

      <div className="home__content">
        <RoomList/>
      </div>

      <div className="home__footer">
        This Part For Footer
      </div>
      
    </div>
  )
}

export default Home