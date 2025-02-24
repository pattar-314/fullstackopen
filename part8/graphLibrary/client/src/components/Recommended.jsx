import { useQuery } from "@apollo/client"
import { BY_GENRE } from "../queries"



const Recommended = () => {

  const [recommendedQuery, result] = useQuery(BY_GENRE, {variables: {genre: window.localStorage.getItem('graphLibrary-user-info').userInfo.favoriteGenre}})

  return (
    <div>
      <div>Recommended based on your favorite genre</div>
    </div>
  )
}

export default Recommended