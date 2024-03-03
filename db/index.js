import {sql} from "@vercel/postgres";
import {NextResponse} from "next/server";

export const getUserQuery = async (email) => {
	const data = await sql`Select * from users where email = ${email}`;
	return data;
};
export const createUserQuery = async (email, name, image) => {
	const data =
		await sql`Insert into users(email, name, avatar_url) values(${email}, ${name}, ${image})`;
};

export const createNewProjectQuery = async (form, url, email) => {
	const data =
		await sql`Insert into projects(title, description, image_url, live_url, github_url, category, created_by) values(${form.title}, ${form.description}, ${url}, ${form.liveSiteUrl}, ${form.githubUrl}, ${form.category}, ${email})`;
};

export const updateProjectQuery = async (form, id) => {
	const data = await sql`Update projects set title = ${form.title}, description = ${form.description}, image_url = ${form.image}, live_url = ${form.liveSiteUrl}, github_url = ${form.githubUrl}, category = ${form.category} where id = ${id}`;
};

export const getProjectsQuery = async () =>{
	const data = await sql`select p.id, p.title,p.image_url, p.description, p.live_url, p.github_url, p.created_by, u.avatar_url from projects as p, users as u where created_by = email;`;
	return data;
}

export const getProjectDetailsQuery = async(id) =>{
	const data = await sql`select * from projects where id = ${id}`;
	return data;
}
export const deleteProjectQuery = async(id) => {
	const data = await sql`delete from projects where id = ${id}`;
}
export const getUserProjectsQuery = async(email) => {
	const data =  await sql`select * from projects where created_by = ${email}`;
	return data
}
export const fetchProjectsByCategoryQuery = async(category) => {
	const data = await sql`select p.id, p.title,p.image_url, p.description, p.live_url, p.github_url, p.created_by, u.avatar_url from projects as p, users as u where created_by = email and category = ${category}`
	return data;
}