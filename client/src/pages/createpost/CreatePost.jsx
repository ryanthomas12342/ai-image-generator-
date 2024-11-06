import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

import { preview } from "../../assets";
import { Form, Loader } from "../../components";
import { getRandomPrompt } from "../../utils";
const CreatePost = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  const [generatingImg, setGeneratingImage] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8080/api/v1/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });
        await response.json();
        navigate("/");
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please enter a prompt and generate an image");
    }
  };

  const handleSurpriseMe = (e) => {
    const Randomprompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: Randomprompt });
  };

  const generateImage = async (e) => {
    if (form.prompt) {
      try {
        setGeneratingImage(true);
        const response = await fetch("http://localhost:8080/api/v1/dalle", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: form.prompt }),
        });
        const data = await response.json();

        console.log(data);

        // Directly assign the URL to form.photo
        if (data.success) {
          setForm({ ...form, photo: data.photo });
        } else {
          alert("Image generation failed");
        }
      } catch (err) {
        alert("Error generating image: ", err.message);
      } finally {
        setGeneratingImage(false);
      }
    } else {
      alert("Please enter a prompt");
    }
  };

  return (
    <section className="container">
      <div>
        <h1 className="title">Create</h1>
        <p className="subtitle">
          Generate an imaginative image through DALL-E AI and share it with the
          community
        </p>
      </div>

      <form className="form" onSubmit={handleSubmit}>
        <div className="form-fields">
          <Form
            labelName="Your Name"
            type="text"
            name="name"
            placeholder="Ex., John Doe"
            value={form.name}
            handleChange={handleChange}
          />

          <Form
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

          <div className="image-preview">
            {form.photo ? (
              <img src={form.photo} alt={form.prompt} className="image-full" />
            ) : (
              <img src={preview} alt="preview" className="image-placeholder" />
            )}

            {generatingImg && (
              <div className="loader-overlay">
                <Loader />
              </div>
            )}
          </div>
        </div>

        <div className="button-group">
          <button
            type="button"
            onClick={generateImage}
            className="generate-button"
          >
            {generatingImg ? "Generating..." : "Generate"}
          </button>
        </div>

        <div className="share-section">
          <p className="share-info">
            ** Once you have created the image you want, you can share it with
            others in the community **
          </p>
          <button type="submit" className="share-button">
            {loading ? "Sharing..." : "Share with the Community"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
