import { Message } from "../interfaces"

const Notification = ({ message }: { message: Message }) => {
  const style = {
    color: message.isError ? 'red':'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  if (!message.text) {
    return null
  }

  return (
    <div style={style}>
      {message.text}
    </div>
  )
}

export default Notification
