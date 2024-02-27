// import {
// 	createProjectMutation,
// 	createUserMutation,
// 	deleteProjectMutation,
// 	updateProjectMutation,
// 	getProjectByIdQuery,
// 	getProjectsOfUserQuery,
// 	getUserQuery,
// 	projectsQuery,
// } from "@/graphql";

const isProduction = process.env.NODE_ENV === "production";
const apiUrl = isProduction
	? process.env.NEXT_PUBLIC_GRAFBASE_API_URL
	: "http://127.0.0.1:4000/graphql";
const apiKey = isProduction
	? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY
	: "letmein";
const serverUrl = isProduction
	? process.env.NEXT_PUBLIC_SERVER_URL
	: "http://localhost:3000";

//const client = new GraphQLClient(apiUrl);

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

const makeGraphQLRequest = async (query, variables = {}) => {
	try {
		return await client.request(query, variables);
	} catch (err) {
		throw err;
	}
};

export const fetchAllProjects = () => {
    
};

// export const createNewProject = async (form, creatorId, token) => {
// 	const imageUrl = await uploadImage(form.image);

// 	if (imageUrl.url) {
// 		client.setHeader("Authorization", `Bearer ${token}`);

// 		const variables = {
// 			input: {
// 				...form,
// 				image: imageUrl.url,
// 				createdBy: {
// 					link: creatorId,
// 				},
// 			},
// 		};

// 		return makeGraphQLRequest(createProjectMutation, variables);
// 	}
// };

// export const updateProject = async (form, projectId, token) => {
// 	function isBase64DataURL(value) {
// 		const base64Regex = /^data:image\/[a-z]+;base64,/;
// 		return base64Regex.test(value);
// 	}

// 	let updatedForm = {...form};

// 	const isUploadingNewImage = isBase64DataURL(form.image);

// 	if (isUploadingNewImage) {
// 		const imageUrl = await uploadImage(form.image);

// 		if (imageUrl.url) {
// 			updatedForm = {...updatedForm, image: imageUrl.url};
// 		}
// 	}

// 	client.setHeader("Authorization", `Bearer ${token}`);

// 	const variables = {
// 		id: projectId,
// 		input: updatedForm,
// 	};

// 	return makeGraphQLRequest(updateProjectMutation, variables);
// };

// export const deleteProject = (id, token) => {
// 	client.setHeader("Authorization", `Bearer ${token}`);
// 	return makeGraphQLRequest(deleteProjectMutation, {id});
// };

// export const getProjectDetails = (id) => {
// 	client.setHeader("x-api-key", apiKey);
// 	return makeGraphQLRequest(getProjectByIdQuery, {id});
// };

// export const createUser = (name, email, avatarUrl) => {
// 	client.setHeader("x-api-key", apiKey);

// 	const variables = {
// 		input: {
// 			name: name,
// 			email: email,
// 			avatarUrl: avatarUrl,
// 		},
// 	};

// 	return makeGraphQLRequest(createUserMutation, variables);
// };

// export const getUserProjects = (id, last) => {
// 	client.setHeader("x-api-key", apiKey);
// 	return makeGraphQLRequest(getProjectsOfUserQuery, {id, last});
// };

// export const getUser = (email) => {
// 	client.setHeader("x-api-key", apiKey);
// 	return makeGraphQLRequest(getUserQuery, {email});
// };
