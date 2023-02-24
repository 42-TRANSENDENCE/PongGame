import './Home.css'
import RoomList from './RoomList';

const Home = (props : any) : JSX.Element => {
  const {socket} = props;

  //const createNewRoom = () => {

  //}

  return (
    <div className='home__container'>
      <div className="home__header">
        <h3>Game Channel list</h3>
      </div>
      <div className="home__content">
        <RoomList props={socket}/>
      </div>
      <div className="home__footer">
        This Part For Footer
      </div>
    </div>
  )
}

export default Home