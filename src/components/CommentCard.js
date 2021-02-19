import React from 'react'
import {Card} from '@material-ui/core/';


export const CommentCard = ({comment}) => {
  return (
    <Card className={'comment-card'}>
      <small>{comment.postedAt}</small>
      <strong>{comment.name}</strong>
      <p>{comment.text}</p>
  </Card>
  )
}