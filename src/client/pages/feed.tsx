import React from 'react'
import { connect } from 'react-redux'

interface Props {
  userName: string
}

const Feed: React.FC<Props> = ({ userName }) => {

  return (
    <div>{userName}</div>
  )
}

const mapStateToProps = ({ userName }: Store) => ({
  userName
})

export default connect(mapStateToProps)(Feed)