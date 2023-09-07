import React, { useState } from 'react'
import {
  Container,
  Row,
  Tabs,
  Tab,
  Col,
  Jumbotron,
  InputGroup,
  Form,
  Button,
} from 'react-bootstrap'
import useRouter from 'hooks/useRouter'
import { useProvideAuth } from 'hooks/useAuth'
import { LoadingSpinner } from 'components'
import { setAuthToken } from 'utils/axiosConfig'

const initialState = {
  username: '',
  password: '',
  isSubmitting: false,
  errorMessage: null,
}

function LoginPage() {
  const [data, setData] = useState(initialState)
  const [key, setKey] = useState('signin')
  const auth = useProvideAuth()
  const router = useRouter()

  let [profileImage, setProfileImage] = useState(getRandomProfileUrl())

  function getRandomProfileUrl() {
    //geneartes random pic in img
    let imgs = [
      'bunny-155674.svg',
      'cat-154642.svg',
      'giraffe-2521453.svg',
      'thor-3831290.svg',
      'tiger-308768.svg',
      'whale-36828.svg',
    ]
    let img = imgs[Math.floor(Math.random() * imgs.length)]
    return `/${img}`
  }

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    })
  }

  const handleSignin = async (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }

    event.preventDefault()
    event.stopPropagation()
    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null,
    })
    try {
      const res = await auth.signin(data.username, data.password)
      setData({
        ...data,
        isSubmitting: false,
        errorMessage: null,
      })
      setAuthToken(res.token)
      router.push('/')
    } catch (error) {
      setData({
        ...data,
        isSubmitting: false,
        errorMessage: error ? error.message || error.statusText : null,
      })
    }
  }

  const handleSignup = async (event) => {
    const form = event.currentTarget
    event.preventDefault()
    event.stopPropagation()

    if (form.checkValidity() === false) {
    }

    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null,
    })
    setProfileImage(getRandomProfileUrl())
    try {
      const res = await auth.signup(data.username, data.password, profileImage)
      setData({
        ...data,
        isSubmitting: false,
        errorMessage: null,
      })
      setAuthToken(res.token)
      router.push('/')
    } catch (error) {
      setData({
        ...data,
        isSubmitting: false,
        errorMessage: error ? error.message || error.statusText : null,
      })
    }
  }

  return (
    <>
      <Jumbotron
        fluid
        className='text-info'
        style={{
          backgroundImage: "url('/hero_image.png')",
          backgroundSize: 'cover',
        }}
      >
        <Container>
          <img src='/logo.png' alt='logo' width='300px' />
          <p className='mt-2 lead'>A place to engage with the Kenzie fam</p>
        </Container>
      </Jumbotron>
      <Container>
        <Row>
          <Col>
            <Container>
              <Tabs
                id='user-form-tabs'
                activeKey={key}
                onSelect={(k) => setKey(k)}
              >
                <Tab eventKey='signin' title='Login'>
                  <div className='w-50 py-4'>
                    <Form noValidate validated onSubmit={handleSignin}>
                      <Form.Group controlId='username-login'>
                        <Form.Label>Username</Form.Label>
                        <InputGroup>
                          <InputGroup.Prepend>
                            <InputGroup.Text id='inputGroupPrepend'>
                              @
                            </InputGroup.Text>
                          </InputGroup.Prepend>
                          <Form.Control
                            type='text'
                            name='username'
                            placeholder='Username'
                            aria-describedby='inputGroupPrepend'
                            required
                            value={data.username}
                            onChange={handleInputChange}
                          />
                          <Form.Control.Feedback type='invalid'>
                            Username is required
                          </Form.Control.Feedback>
                        </InputGroup>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label htmlFor='Login'>Password</Form.Label>
                        <Form.Control
                          type='password'
                          name='password'
                          id='Login'
                          value={data.password}
                          onChange={handleInputChange}
                        />
                        <Form.Text id='passwordHelpBlock' muted>
                          Must be 8-20 characters long.
                        </Form.Text>
                      </Form.Group>
                      {data.errorMessage && (
                        <span className='form-error'>{data.errorMessage}</span>
                      )}
                      <Button type='submit' disabled={data.isSubmitting}>
                        {data.isSubmitting ? <LoadingSpinner /> : 'Login'}
                      </Button>
                    </Form>
                  </div>
                </Tab>
                <Tab eventKey='signup' title='Register'>
                  <div className='w-50 py-4'>
                    <Form noValidate validated onSubmit={handleSignup}>
                      <Form.Group controlId='username-register'>
                        <Form.Label>Username</Form.Label>
                        <InputGroup>
                          <InputGroup.Prepend>
                            <InputGroup.Text id='inputGroupPrepend'>
                              @
                            </InputGroup.Text>
                          </InputGroup.Prepend>
                          <Form.Control
                            type='text'
                            name='username'
                            placeholder='Username'
                            aria-describedby='inputGroupPrepend'
                            required
                            value={data.username}
                            onChange={handleInputChange}
                          />
                          <Form.Control.Feedback type='invalid'>
                            Please choose a username.
                          </Form.Control.Feedback>
                        </InputGroup>
                      </Form.Group>
                      <Form.Group>
                        <Form.Label htmlFor='Register'>Password</Form.Label>
                        <Form.Control
                          type='password'
                          name='password'
                          id='inputPasswordRegister'
                          value={data.password}
                          onChange={handleInputChange}
                        />
                        <Form.Text id='passwordHelpBlock' muted>
                          Must be 8-20 characters long.
                        </Form.Text>
                      </Form.Group>
                      {data.errorMessage && (
                        <span className='form-error'>{data.errorMessage}</span>
                      )}
                      <Button type='submit' disabled={data.isSubmitting}>
                        {data.isSubmitting ? <LoadingSpinner /> : 'Sign up'}
                      </Button>
                    </Form>
                  </div>
                </Tab>
              </Tabs>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default LoginPage
