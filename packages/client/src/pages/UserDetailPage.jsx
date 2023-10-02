import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  Form,
  Button,
  Figure,
  FormLabel,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingSpinner, Post } from "../components";
import { useProvideAuth } from "../hooks/useAuth";
import { useRequireAuth } from "../hooks/useRequireAuth";
import api from "../utils/api.utils.js";
import AvatarPicker from "./RegisterPage/AvatarPicker/AvatarPicker";
import { toast } from "react-toastify";

const UserDetailPage = () => {
  const { state } = useProvideAuth();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [validated, setValidated] = useState(false);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    password: "",
    current_password: "",
    confirm_password: "",
    isSubmitting: false,
    errorMessage: null,
  });

  const [profileImage, setProfileImage] = useState("");
  const [openAvatarPicker, setOpenAvatarPicker] = useState(false);

  let navigate = useNavigate();
  let params = useParams();
  const {
    state: { isAuthenticated },
  } = useRequireAuth();

  useEffect(() => {
    const getUser = async () => {
      try {
        const userResponse = await api.get(`/users/${params.uname}`);
        setUser(userResponse.data);
        setProfileImage(userResponse.data.profile_image);
        setLoading(false);
      } catch (err) {
        console.error(err.message);
      }
    };
    isAuthenticated && getUser();
  }, [params.uname, isAuthenticated]);

  const handleAvatarChange = (event) => {
    setProfileImage({
      ...profileImage,
      [event.target.profile_image]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userResponse = await api.put(`/users/${params.uname}/avatar`, {
      profile_image: profileImage,
    });
    setUser({ ...user, profile_image: profileImage });
    setOpenAvatarPicker(false);
  };

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpdatePassword = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (data.password !== data.confirm_password) {
      toast.error("Passwords Do Not Match");
      return;
    }
    if (data.password.length < 8 || data.password.length > 20) {
      toast.error("Password Must Be Between 8 and 20 Characters");
      return;
    }
    const form = event.currentTarget;
    // handle invalid or empty form
    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }
    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null,
    });
    try {
      const response = await api.put(`/users/${params.uname}`, {
        confirm_password: data.confirm_password,
        password: data.password,
        current_password: data.current_password,
      });
      const {
        user: { uid, username },
      } = state;
      console.log(data.password, uid, username);
      setValidated(false);
      setLoading(false);
      toast.success("Password Updated");
    } catch (error) {
      setData({
        ...data,
        isSubmitting: false,
        errorMessage: error.message,
      });
    }
  };

  if (!isAuthenticated) {
    return <LoadingSpinner full />;
  }

  if (loading) {
    return <LoadingSpinner full />;
  }

  return (
    <>
      <Container className="clearfix">
        <Button
          variant="outline-info"
          onClick={() => {
            navigate(-1);
          }}
          style={{ border: "none", color: "#E5E1DF" }}
          className="mt-3 mb-3"
        >
          Go Back
        </Button>
        <Card bg="header" className="text-center">
          <Card.Body>
            <Figure
              className="bg-border-color rounded-circle overflow-hidden my-auto ml-2 p-1"
              style={{
                height: "50px",
                width: "50px",
                backgroundColor: "white",
              }}
            >
              <Figure.Image src={user.profile_image} className="w-100 h-100" />
            </Figure>
            <Card.Title>{params.uname}</Card.Title>
            <Card.Text>{user.email}</Card.Text>
            {state.user.username === params.uname && (
              <div
                onClick={() => setOpen(!open)}
                style={{ cursor: "pointer", color: "#BFBFBF" }}
              >
                Edit Password
              </div>
            )}
            {open && (
              <Container animation="false">
                <div className="row justify-content-center p-4">
                  <div className="col text-center">
                    <Form
                      noValidate
                      validated={validated}
                      onSubmit={handleUpdatePassword}
                    >
                      <Form.Group>
                        <Form.Label>Current Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="current_password"
                          required
                          value={data.current_password}
                          onChange={handleInputChange}
                        />
                        <Form.Label htmlFor="password">New Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="password"
                          required
                          value={data.password}
                          onChange={handleInputChange}
                        />
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="confirm_password"
                          required
                          pattern={data.password}
                          value={data.confirm_password}
                          onChange={handleInputChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          New Password is required
                        </Form.Control.Feedback>
                        <Form.Text id="passwordHelpBlock" muted>
                          Must be 8-20 characters long.
                        </Form.Text>
                      </Form.Group>
                      {data.errorMessage && (
                        <span className="form-error">{data.errorMessage}</span>
                      )}
                      <Button type="submit" disabled={data.isSubmitting}>
                        {data.isSubmitting ? <LoadingSpinner /> : "Update"}
                      </Button>
                    </Form>
                  </div>
                </div>
              </Container>
            )}
            {state.user.username === params.uname && (
              <div>
                <button
                  onClick={() => setOpenAvatarPicker(!openAvatarPicker)}
                  style={{ cursor: "pointer", color: "#BFBFBF" }}
                >
                  Select New Avatar
                </button>
              </div>
            )}
            {openAvatarPicker && (
              <Container animation="false">
                <AvatarPicker
                  profileImage={profileImage}
                  setProfileImage={setProfileImage}
                />
                <Form onSubmit={handleSubmit}>
                  <Button type="submit">
                    {profileImage.isSubmitting ? <LoadingSpinner /> : "Update"}
                  </Button>
                </Form>
              </Container>
            )}
          </Card.Body>
        </Card>
      </Container>
      <Container className="pt-3 pb-3">
        {user.posts.length !== 0 ? (
          user.posts.map((post) => (
            <Post key={post._id} post={post} userDetail />
          ))
        ) : (
          <div
            style={{
              marginTop: "75px",
              textAlign: "center",
            }}
          >
            No User Posts
          </div>
        )}
      </Container>
    </>
  );
};

export default UserDetailPage;
