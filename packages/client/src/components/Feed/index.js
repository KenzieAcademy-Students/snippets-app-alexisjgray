import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Form, InputGroup, Button } from 'react-bootstrap'
import axios from 'utils/axiosConfig.js'
import { Post } from 'components'
import LoadingSpinner from 'components/LoadingSpinner'
import { useProvideAuth } from 'hooks/useAuth'

const initialState = {
  postText: '',
  isSubmitting: false,
  errorMessage: null,
}

function Feed() {
  const {
    state: { user },
  } = useProvideAuth()
  const [posts, setPosts] = useState()
  const [data, setData] = useState(initialState)
  const [validated, setValidated] = useState(false)

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    })
  }

  const handlePostSubmit = async (event) => {
    const form = event.currentTarget
    event.preventDefault()
    event.stopPropagation()
    if (form.checkValidity() === false) {
      alert('Post text is required')
      setValidated(true)
      return
    }

    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null,
    })

    axios
      .post('/posts', {
        text: data.postText,
        author: user.username,
      })
      .then(
        (res) => {
          setData(initialState)
          setPosts((posts) => [
            {
              ...res.data,
              author: {
                username: user.username,
                profile_image: user.profile_image,
              },
            },
            ...posts,
          ])
          setValidated(false)
        },
        (error) => {
          setData({
            ...data,
            isSubmitting: false,
            errorMessage: error.message,
          })
        }
      )
  }

  useEffect(() => {
    const getPosts = async () => {
      try {
        const allPosts = await axios.get('posts')
        setPosts(allPosts.data)
      } catch (err) {
        console.error(err.message)
      }
    }
    getPosts()
  }, [])

  return (
    <Container fluid style={{ height: 'calc(100vh - 72px)' }}>
      <Row className='h-100'>
        <Col />
        <Col xs='7' className='h-100'>
          <Container className='h-100'>
            <Container className='h-25 pt-3'>
              <Form
                noValidate
                validated={validated}
                onSubmit={handlePostSubmit}
              >
                <Form.Group controlId='post-form'>
                  <InputGroup>
                    <Form.Control
                      as='textarea'
                      rows={3}
                      maxLength='120'
                      name='postText'
                      placeholder="What's Happening"
                      aria-describedby='post-form'
                      size='lg'
                      required
                      value={data.postText}
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
                <Button
                  className='float-right'
                  type='submit'
                  disabled={data.isSubmitting}
                >
                  {data.isSubmitting ? <LoadingSpinner /> : 'Post'}
                </Button>
              </Form>
            </Container>

            <Container
              className='h-75 pt-3'
              style={{
                overflow: 'scroll',
              }}
            >
              {posts &&
                posts.map((post) => <Post key={post._id} post={post} />)}
            </Container>
          </Container>
        </Col>
        <Col />
      </Row>
    </Container>
  )
}

export default Feed
