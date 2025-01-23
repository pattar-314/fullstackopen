import styled from 'styled-components'


const NotificationWrapper = styled.div`
  display: flex;
  color: red;
  border: solid red 3px;
`

const Notify = ({notification}) => {

  const display = notification ? <NotificationWrapper> {notification} </NotificationWrapper> : null

  return (
    <div>{ display }</div>
  )
}

export default Notify