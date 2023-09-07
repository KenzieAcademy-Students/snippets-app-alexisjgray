import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { LoadingSpinner, Post } from 'components'
import axios from 'utils/axiosConfig.js'

export default function PostDetailPage({
  match: {
    params: { pid },
  },
}) {
  const [post, setPost] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getPost = async () => {
      try {
        const postDetail = await axios.get(`posts/${pid}`)
        setPost(postDetail.data)
        setLoading(false)
      } catch (err) {
        console.error(err.message)
      }
    }
    getPost()
  }, [pid])

  if (loading) {
    return <LoadingSpinner full />
  }

  return (
    <Container fluid>
      <Row className='pt-5'>
        <Col />
        <Col xs='7' className='h-100'>
          <Post post={post} detail />
        </Col>
        <Col />
      </Row>
    </Container>
  )
}
