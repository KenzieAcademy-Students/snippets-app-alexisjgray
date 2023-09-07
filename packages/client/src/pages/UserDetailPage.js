import React, { useState, useEffect } from 'react'
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Collapse,
  Figure,
} from 'react-bootstrap'
import { LoadingSpinner, Post } from 'components'
import { useProvideAuth } from 'hooks/useAuth'
import axios from 'utils/axiosConfig.js'

export default function UserDetailPage({
  match: {
    params: { uid },
  },
}) {
  const { state } = useProvideAuth()
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true)
  const [validated, setValidated] = useState(false)
  const [open, setOpen] = useState(false)
  const [data, setData] = useState({
    password: '',
    isSubmitting: false,
    errorMessage: null,
  })

  useEffect(() => {
    const getUser = async () => {
      try {
        const userResponse = await axios.get(`users/${uid}`)
        setUser(userResponse.data)
        setLoading(false)
      } catch (err) {
        console.error(err.message)
      }
    }
    getUser()
  }, [uid])

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    })
  }

  const handleUpdatePassword = async (event) => {
    event.preventDefault()
    event.stopPropagation()
    const form = event.currentTarget
    // handle invalid or empty form
    if (form.checkValidity() === false) {
      setValidated(true)
      return
    }
    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null,
    })
    try {
      // write code to call edit user endpoint 'users/:id'
      const {
        user: { uid, username },
      } = state
      console.log(data.password, uid, username)
      setValidated(false)
      // don't forget to update loading state and alert success
    } catch (error) {
      setData({
        ...data,
        isSubmitting: false,
        errorMessage: error.message,
      })
    }
  }

  if (loading) {
    return <LoadingSpinner full />
  }

  return (
    <Container fluid style={{ height: 'calc(100vh - 72px)' }}>
      <Row className='h-100'>
        <Col />
        <Col xs='7' className='h-100'>
          <Container className='h-100'>
            <Container className='h-25 pt-3'>
              <Card>
                <Card.Body>
                  <Figure
                    className='mr-4 bg-border-color rounded-circle overflow-hidden my-auto ml-2'
                    style={{ height: '50px', width: '50px' }}
                  >
                    <Figure.Image
                      src={user.profile_image}
                      className='w-100 h-100'
                    />
                  </Figure>
                  <Row>
                    <Col xs={7}>
                      <Card.Title>{uid}</Card.Title>
                    </Col>
                  </Row>
                  <Container>
                    <Row>
                      <Card.Text>{uid}</Card.Text>
                    </Row>
                  </Container>
                  {state.user.username === uid && (
                    <div onClick={() => setOpen(!open)}>Edit Password</div>
                  )}
                </Card.Body>
              </Card>
            </Container>
            <Collapse in={open}>
              <Container>
                <Row>
                  <Col>
                    <div className='w-50 py-4'>
                      <Form
                        noValidate
                        validated={validated}
                        onSubmit={handleUpdatePassword}
                      >
                        <Form.Group>
                          <Form.Label htmlFor='password'>
                            New Password
                          </Form.Label>
                          <Form.Control
                            type='password'
                            name='password'
                            required
                            value={data.password}
                            onChange={handleInputChange}
                          />
                          <Form.Control.Feedback type='invalid'>
                            New Password is required
                          </Form.Control.Feedback>
                          <Form.Text id='passwordHelpBlock' muted>
                            Must be 8-20 characters long.
                          </Form.Text>
                        </Form.Group>

                        {data.errorMessage && (
                          <span className='form-error'>
                            {data.errorMessage}
                          </span>
                        )}
                        <Button type='submit' disabled={data.isSubmitting}>
                          {data.isSubmitting ? <LoadingSpinner /> : 'Update'}
                        </Button>
                      </Form>
                    </div>
                  </Col>
                </Row>
              </Container>
            </Collapse>
            <Container
              className='h-75 pt-3'
              style={{
                overflow: 'scroll',
              }}
            >
              {user.posts &&
                user.posts.map((post) => <Post key={post._id} post={post} />)}
            </Container>
          </Container>
        </Col>
        <Col />
      </Row>
    </Container>
  )
}
