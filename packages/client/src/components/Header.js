import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Button, Figure } from 'react-bootstrap'
import { useProvideAuth } from 'hooks/useAuth'

export default function Header() {
  const {
    state: { user },
    signout,
  } = useProvideAuth()

  if (!user) {
    return null
  }
  return (
    <Navbar bg='light' expand='lg'>
      <Navbar.Brand>
        <LinkContainer to={'/'}>
          <Nav.Link>
            <img src='/logo.png' alt='logo' width='142px' />
          </Nav.Link>
        </LinkContainer>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        {user ? (
          <>
            <Nav className='ml-auto mr-5'>
              <LinkContainer
                className='d-flex align-items-end'
                to={`/u/${user.username}`}
              >
                <Nav.Link>
                  <Figure
                    className='bg-border-color rounded-circle overflow-hidden my-auto ml-2'
                    style={{ height: '35px', width: '35px' }}
                  >
                    <Figure.Image
                      src={user.profile_image}
                      className='w-100 h-100'
                    />
                  </Figure>
                </Nav.Link>
              </LinkContainer>
              <LinkContainer
                className='d-flex align-items-center'
                to={`/u/${user.username}`}
              >
                <Nav.Link>{user.username}</Nav.Link>
              </LinkContainer>
            </Nav>
            <Button variant='outline-primary' onClick={() => signout()}>
              Logout
            </Button>
          </>
        ) : null}
      </Navbar.Collapse>
    </Navbar>
  )
}
