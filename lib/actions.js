"use server"
import { createUserQuery, getUserQuery, createNewProjectQuery, updateProjectQuery, getProjectsQuery, getProjectDetailsQuery, deleteProjectQuery, getUserProjectsQuery, fetchProjectsByCategoryQuery } from "@/db";

const isProduction = process.env.NODE_ENV === "production";

const serverUrl = isProduction
	? process.env.NEXT_PUBLIC_SERVER_URL
	: "http://localhost:3000";

export const fetchToken = async () => {
	try {
		const response = await fetch(`${serverUrl}/api/auth/token`);
		return response.json();
	} catch (err) {
		throw err;
	}
};

export const uploadImage = async (imagePath) => {
	try {
		const response = await fetch(`${serverUrl}/api/upload`, {
			method: "POST",
			body: JSON.stringify({
				path: imagePath,
			}),
		});
		return response.json();
	} catch (err) {
		throw err;
	}
};

export const fetchAllProjects = () => {
    const data = getProjectsQuery();
	return data;
};


export const fetchProjectsByCategory = (category) => {
	const data = fetchProjectsByCategoryQuery(category);
	return data
}

export const getUser = (email) => {
	const data = getUserQuery(email);
	return data;
};
export const createUser = (email, name, image) => {
	const data = createUserQuery(email, name, image);
}

export const createNewProject = async (form, email) => {
	const imageUrl = await uploadImage(form.image);
	const data = createNewProjectQuery(form, imageUrl.url, email);
}

export const updateProject = async(form, id) => {
		function isBase64DataURL(value) {
			const base64Regex = /^data:image\/[a-z]+;base64,/;
			return base64Regex.test(value);
		}
		
		let updatedForm = {...form};
		
		const isUploadingNewImage = isBase64DataURL(form.image);
		
		if (isUploadingNewImage) {
			const imageUrl = await uploadImage(form.image);
			if (imageUrl.url) {
				updatedForm = {...updatedForm, image: imageUrl.url};
			}
		}
	const data = updateProjectQuery(updatedForm, id);
}

export const getProjectDetails = (id) => {
	const data  = getProjectDetailsQuery(id);
	return data
}

export const deleteProject = (id) => {
	const data = deleteProjectQuery(id);
}

export const getUserProjects = (email) => {
	const data = getUserProjectsQuery(email);
	return data;
}