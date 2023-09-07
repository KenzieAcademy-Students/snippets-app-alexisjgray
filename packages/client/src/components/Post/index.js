import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Container,
  Row,
  Form,
  Card,
  InputGroup,
  Button,
  Media,
  Figure,
  ListGroup,
} from 'react-bootstrap'
import useRouter from 'hooks/useRouter'
import { useProvideAuth } from 'hooks/useAuth'
import axios from 'utils/axiosConfig.js'
import { timeSince } from 'utils/timeSince'
import { LikeIcon, LikeIconFill, ReplyIcon, TrashIcon } from 'components'
import './Post.scss'

const initialState = {
  commentText: '',
  isSubmitting: false,
  errorMessage: null,
}
export default function Post({
  post: { _id, author, profile_image, text, comments, created, likes },
  detail,
}) {
  const [data, setData] = useState(initialState)
  const [validated, setValidated] = useState(false)
  const [stateComments, setStateComments] = useState(comments)
  const router = useRouter()
  const {
    state: { user },
  } = useProvideAuth()
  const [likedState, setLiked] = useState(likes.includes(user.uid))
  const [likesState, setLikes] = useState(likes.length)
  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    })
  }

  const handleToggleLike = async () => {
    if (!likedState) {
      setLiked(true)
      setLikes(likesState + 1)
      try {
        await axios.post(`posts/like/${_id}`)
      } catch (error) {
        console.log(error)
        return error
      }
    } else {
      setLiked(false)
      setLikes(likesState - 1)
      try {
        await axios.post(`posts/like/${_id}`)
      } catch (error) {
        console.log(error)
        return error
      }
    }
  }

  // Complete function to call server endpoint /posts/:id
  // with delete request
  const handleDeletePost = async () => {
    console.log('Delete post', _id)
  }

  const handleCommentSubmit = async (event) => {
    const form = event.currentTarget
    event.preventDefault()
    event.stopPropagation()
    if (form.checkValidity() === false) {
      alert('Comment text is required')
      setValidated(true)
      return
    }

    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null,
    })

    axios
      .put('/posts/comments', {
        text: data.commentText,
        userId: author._id,
        postId: _id,
      })
      .then(
        ({ data }) => {
          setData(initialState)
          setStateComments(data.comments)
          setValidated(false)
        },
        (error) => {
          console.log('axios error', error)
        }
      )
  }

  useEffect(() => {
    setStateComments(comments)
  }, [comments])

  return (
    <ListGroup.Item className='px-3' action as={'div'} key={_id}>
      <Media className='mb-n2 w-100'>
        <Figure
          className='mr-4 bg-border-color rounded-circle overflow-hidden my-auto ml-2'
          style={{ height: '50px', width: '50px' }}
        >
          <Figure.Image src={author.profile_image} className='w-100 h-100' />
        </Figure>
        <Media.Body className='w-50'>
          <Row className='d-flex align-items-center'>
            <span className='text-muted mr-1'>@{author.username}</span>
            <pre className='m-0 text-muted'>{' - '}</pre>
            {!detail ? (
              <Link className='text-muted' to={`/p/${_id}`}>
                {timeSince(created)} ago
              </Link>
            ) : (
              <span className='text-muted'>{timeSince(created)} ago</span>
            )}
          </Row>
          <Row className='mb-n1 mt-1'>
            <blockquote className='mb-1 mw-100'>
              <div className='mw-100 overflow-hidden'>{text}</div>
            </blockquote>
          </Row>

          <Row className='page-tweet d-flex justify-content-end align-items-center position-static'>
            <div className='d-flex align-items-center'>
              {user.username === author.username && (
                <Container className='close'>
                  <TrashIcon onClick={handleDeletePost} />
                </Container>
              )}
            </div>

            <div className='d-flex align-items-center mr-2'>
              <Button
                variant='link'
                size='md'
                onClick={() => router.push(`/p/${_id}`)}
              >
                <ReplyIcon />
              </Button>
              <span>{comments.length > 0 ? comments.length : 0}</span>
            </div>
            <div
              className={`d-flex align-items-center mr-2 ${
                likedState ? 'isLiked' : ''
              }`}
            >
              <Button variant='link' size='md' onClick={handleToggleLike}>
                {likedState ? <LikeIconFill /> : <LikeIcon />}
              </Button>
              <span>{likesState}</span>
            </div>
          </Row>
        </Media.Body>
      </Media>
      {detail && (
        <div>
          <br />
          <Form noValidate validated={validated} onSubmit={handleCommentSubmit}>
            <Form.Group controlId='comment-form'>
              <InputGroup>
                <Form.Control
                  type='text'
                  size='md'
                  name='commentText'
                  maxLength='120'
                  placeholder='Reply'
                  aria-describedby='comment-input'
                  required
                  value={data.commentText}
                  onChange={handleInputChange}
                />
                <Form.Control.Feedback type='invalid'>
                  Post text is required
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            {data.errorMessage && (
              <span className='form-error'>{data.errorMessage}</span>
            )}
          </Form>
          {!stateComments.length > 0 ? (
            <div>no comments</div>
          ) : (
            <Container>
              {stateComments.map((c, index) => (
                <Card key={index} className='mb-2'>
                  <Card.Body>
                    <div className='post-comment--body'>
                      <div>
                        <Card.Text>@{c.author?.username}</Card.Text>
                      </div>
                      <Card.Text>{c.text}</Card.Text>
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </Container>
          )}
        </div>
      )}
    </ListGroup.Item>
  )
}
