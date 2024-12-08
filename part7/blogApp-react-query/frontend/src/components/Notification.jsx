import { useContext } from "react"
import { NotificationContext } from "../services/blogService"


const Notification = () => {

  const [ notification ] = useContext(NotificationContext)

  console.log('notification: ', notification)

  return (
    <div className="notifiction-wrapper">{!notification.message ? null : <div className={`notification ${notification.status}`}><b>{notification.message}</b></div>}</div>
  )
}

export default Notification