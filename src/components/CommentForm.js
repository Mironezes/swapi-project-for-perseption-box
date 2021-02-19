import React, {useState} from 'react'
import {CommentCard} from './CommentCard'
import {Grid, TextField, Button  } from '@material-ui/core/'
import {makeStyles} from '@material-ui/core/styles';

const formInput = makeStyles({
  cssLabel: {
    color: "#000"
  },

  cssOutlinedInput: {
    "&$cssFocused $cssLabel": {
      borderColor: "#000",
    },
    "&$cssFocused $notchedOutline": {
      borderColor:"#000",
      borderWidth: 1
    }
  },

  cssFocused: {
    color: "#000 !important"
  },
  notchedOutline: {}  
})


export const CommentForm = () => {
  const inputClasses = formInput();

  const initialFormInput = {
    name: '',
    text: '',
    postedAt: '',
    nameError: false,
    textError: false
  }
  
  const [commentInput, setCommentInput] = useState(initialFormInput)

  const [commentData, setCommentData] = useState([]) 


  const commentFormHandler = (e) => {
    e.preventDefault()

    if(commentInput.name.length < 2 && commentInput.text.length < 5) {
      setCommentInput(initialFormInput)
      setCommentInput({...commentInput, nameError: true, textError: true})
    }
    else if(commentInput.name.length < 2) {
      setCommentInput(initialFormInput)
      setCommentInput({...commentInput, nameError: true})
    }
    else if(commentInput.text.length < 5) {
      setCommentInput(initialFormInput)
      setCommentInput({...commentInput, textError: true})
    } 
    else {
      let date = new Date().toString().split(' ').slice(1, 5).join(' ')

      setCommentData({...commentInput, postedAt: date})
      setCommentInput(initialFormInput)
    }
  }

  console.log(commentData)

  return (
    <Grid 
      container
      direction="row"
      justify="space-between"
      className={'character-comments-block'}
    >

      <Grid item sm={5} xs={12} className="character-comments-form">
        <h2>Add comment</h2>

        <form noValidate autoComplete="off" id={'character-comment-form'} onSubmit={e => commentFormHandler(e)} >
          <TextField 
            error = {commentInput.nameError}
            required={true}
            id="form-input-name" 
            name="comment-name"
            value={commentInput.name}
            label="Your name"  
            size="small"
            variant="outlined" 
            helperText="Required and must be filled up"
            InputLabelProps={{
              classes: {
                root: inputClasses.cssLabel,
                focused: inputClasses.cssFocused
              }
            }}
            InputProps={{
              classes: {
                root: inputClasses.cssOutlinedInput,
                focused: inputClasses.cssFocused,
                notchedOutline: inputClasses.notchedOutline
              },
            }}
            onChange={e => setCommentInput({...commentInput, name: e.target.value})}
          />
          <TextField
            error={commentInput.textError}
            required={true}
            id="form-input-text"
            name="comment-text"
            value={commentInput.text}
            label="Your comment"
            multiline
            size="small"
            rows={4}
            variant="outlined"
            helperText="Required and must be filled up"
            InputLabelProps={{
              classes: {
                root: inputClasses.cssLabel,
                focused: inputClasses.cssFocused
              }
            }}
            InputProps={{
              classes: {
                root: inputClasses.cssOutlinedInput,
                focused: inputClasses.cssFocused,
                notchedOutline: inputClasses.notchedOutline
              },
            }}
            onChange={e => setCommentInput({...commentInput, text: e.target.value})}
          />
          <Button type="submit" variant="contained"> Leave a comment</Button>
        </form>
      </Grid>

      <Grid item sm={7} xs={12} className="character-comments-list">
        <h2>Comments</h2>

        {commentData.hasOwnProperty('name')
          ? <CommentCard comment={commentData}/>
          : <span>No comments</span>
        }
        

      </Grid>
    </Grid>

  )
}
