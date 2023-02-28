import {useEffect} from 'react'
import '../styles/PlayerProfile.css'

const PlayerProfile = () : JSX.Element => {
    useEffect(() => {
        // 사용자 정보 가져오기.
    }, [])

    return (
        <>
            <div className='container__profile'>
                <img src='https://placeimg.com/50/50/people'/>
                <div className='details'>
                    <div className='profile_detail win'>
                        <h2>Win  : </h2>
                        <h4>4</h4>
                    </div>
                    <div className='profile_detail lose'>
                        <h2>Lose : </h2>
                        <h4>5</h4>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PlayerProfile