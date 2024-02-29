"use client"
import Image from "next/image"
import React, { useState } from "react"
import { useRouter } from "next/navigation"

import FormField from "./FormField"
import Button from "./Button"
import CustomMenu from "./CustomMenu"
import { categoryFilters } from "@/constant"
import { updateProject, createNewProject, fetchToken } from "@/lib/actions"

const ProjectForm = ({ type, session, project }) => {
  const router = useRouter()

  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({
    title: project?.title || "",
    description: project?.description || "",
    image: project?.image || "",
    liveSiteUrl: project?.liveSiteUrl || "",
    githubUrl: project?.githubUrl || "",
    category: project?.category || ""
  })

  const handleStateChange = (fieldName, value) => {
    setForm(prevForm => ({ ...prevForm, [fieldName]: value }))
  }

  const handleChangeImage = e => {
    e.preventDefault()

    const file = e.target.files?.[0]

    if (!file) return

    if (!file.type.includes("image")) {
      alert("Please upload an image!")

      return
    }

    const reader = new FileReader()

    reader.readAsDataURL(file)

    reader.onload = () => {
      const result = reader.result

      handleStateChange("image", result)
    }
  }

  const handleFormSubmit = async e => {
    e.preventDefault()

    setSubmitting(true)

    const { token } = await fetchToken()

    try {
      if (type === "create") {
        await createNewProject(form, session?.user?.email)

        router.push("/")
      }

      if (type === "edit") {
        await updateProject(form, project?.id, token)

        router.push("/")
      }
    } catch (error) {
      alert(
        `Failed to ${
          type === "create" ? "create" : "edit"
        } a project. Try again! ${error}`
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleFormSubmit} className="flexStart form">
      <div className="flexStart form_image-container">
        <label htmlFor="poster" className="flexCenter form_image-label">
          {!form.image && "Choose a poster for your project"}
        </label>
        <input
          id="image"
          type="file"
          accept="image/*"
          required={type === "create" ? true : false}
          className="form_image-input"
          onChange={e => handleChangeImage(e)}
        />
        {form.image && (
          <Image
            src={form?.image}
            className="sm:p-10 object-contain z-20"
            alt="image"
            fill
          />
        )}
      </div>

      <FormField
        title="Title"
        state={form.title}
        placeholder="Promedia"
        setState={value => handleStateChange("title", value)}
      />

      <FormField
        title="Description"
        state={form.description}
        placeholder="Showcase and discover remarkable developer projects."
        isTextArea
        setState={value => handleStateChange("description", value)}
      />

      <FormField
        type="url"
        title="Website URL"
        state={form.liveSiteUrl}
        placeholder="https://github.com"
        setState={value => handleStateChange("liveSiteUrl", value)}
      />

      <FormField
        type="url"
        title="GitHub URL"
        state={form.githubUrl}
        placeholder="https://github.com/Deepansh007"
        setState={value => handleStateChange("githubUrl", value)}
      />

      <CustomMenu
        title="Category"
        state={form.category}
        filters={categoryFilters}
        setState={value => handleStateChange("category", value)}
      />

      <div className="flexStart w-full">
        <Button
          title={
            submitting
              ? `${type === "create" ? "Creating" : "Editing"}`
              : `${type === "create" ? "Create" : "Edit"}`
          }
          type="submit"
          leftIcon={submitting ? "" : "/plus.svg"}
          submitting={submitting}
        />
      </div>
    </form>
  )
}

export default ProjectForm
