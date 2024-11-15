import { useSelector } from "react-redux"

const Notification = () => {

  const notification = useSelector(state => state.notification)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const notificationComponent = (
    <div style={style}>
      {notification}
    </div>
  )

  return (
    <>
    {notification ? notificationComponent : null}
    </>
  )
}

export default Notification