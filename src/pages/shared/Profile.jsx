import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import { useFetch } from "../../hooks/useFetch";
import toast from "react-hot-toast";
import { Container, Card, Button, Form } from "react-bootstrap";
import { Loading } from "../../components/shared/Loading";

export const Profile = ({ role = "user", action }) => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const { theme } = useSelector((state) => state.theme);
  const { register, handleSubmit, setValue, watch } = useForm();

  const [profileUpdated, setProfileUpdated] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [profilePicturePreview, setProfilePicturePreview] = useState("");

  const profilePictureFile = watch("profilePicture");

  const user = {
    role,
    profile: `/${role}/${action === "Details" ? `details/${userId}` : "profile"}`,
    updateProfile: `/${role}/update-profile`,
  };

  const [profile, loading, error, fetchData] = useFetch(user.profile);

  // Update image preview when user selects a new file
  useEffect(() => {
    if (profilePictureFile?.[0]) {
      const reader = new FileReader();
      reader.onloadend = () => setProfilePicturePreview(reader.result);
      reader.readAsDataURL(profilePictureFile[0]);
    }
  }, [profilePictureFile]);

  // Pre-fill form values when data is loaded
  useEffect(() => {
    if (profile) {
      setValue("name", profile.name || "");
      setValue("email", profile.email || "");
      setValue("mobile", profile.mobile || "");
      setProfilePicturePreview(profile.profilePicture || "");
    }
  }, [profile, setValue]);

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (key === "profilePicture" && data.profilePicture[0]) {
          formData.append(key, data.profilePicture[0]);
        } else {
          formData.append(key, data[key]);
        }
      });

      await axiosInstance.put(user.updateProfile, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Profile updated successfully!");
      setProfileUpdated(true);
      setEditMode(false);
    } catch (error) {
      console.error("Profile update failed:", error);
      toast.error("Update failed! Please try again.");
    }
  };

  useEffect(() => {
    if (profileUpdated) {
      setProfileUpdated(false);
      fetchData();
    }
  }, [profileUpdated]);

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      {loading ? (
        <Loading />
      ) : (
        <Card
          className="p-4 shadow-lg rounded-4"
          style={{
            backgroundColor: theme ? "#1E1E1E" : "#F8F9FA",
            color: theme ? "#FFFFFF" : "#333",
            width: "420px",
          }}
        >
          <h3 className="text-center fw-bold mb-3">Profile {action}</h3>
          <div className="text-center">
            {profilePicturePreview && (
              <img
                src={profilePicturePreview}
                alt="Profile"
                className="rounded-circle border"
                style={{ height: "120px", width: "120px", objectFit: "cover" }}
              />
            )}
            <label className="d-block mt-2">
              <input
                type="file"
                {...register("profilePicture")}
                accept="image/*"
                className="d-none"
              />
              <Button variant="outline-primary" className="mt-2">
                Change Picture
              </Button>
            </label>
          </div>

          <Form onSubmit={handleSubmit(onSubmit)} className="mt-3">
            <Form.Group className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                {...register("name", { required: true, minLength: 3 })}
                disabled={!editMode}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                {...register("email", { required: true })}
                disabled={!editMode}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                type="text"
                {...register("mobile", { required: true })}
                disabled={!editMode}
              />
            </Form.Group>

            <div className="d-flex justify-content-center">
              <Button
                onClick={() => (editMode ? handleSubmit(onSubmit)() : setEditMode(true))}
                className="px-4"
                variant={theme ? "warning" : "dark"}
              >
                {editMode ? "Save" : "Edit"}
              </Button>
            </div>
          </Form>
        </Card>
      )}
    </Container>
  );
};
