import Categories from "@/components/Categories";
import ProjectCard from "@/components/ProjectCard";
import {fetchAllProjects, fetchProjectsByCategory} from "@/lib/actions";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

const Home = async ({searchParams: {category}}) => {

	const data = category ? await fetchProjectsByCategory(category) : await fetchAllProjects();
	const projectsToDisplay = data.rows || [];

	if (projectsToDisplay.length === 0) {
		return (
			<section className="flexStart flex-col paddings">
				<Categories />

				<p className="no-result-text text-center">
					No projects found, go create some first.
				</p>
			</section>
		);
	}

	return (
		<section className="flexStart flex-col paddings mb-16">
			<Categories />

			<section className="projects-grid">
				{projectsToDisplay.map((node) => (
					<ProjectCard
						key={`${node?.id}`}
						id={node?.id}
						image={node?.image_url}
						title={node?.title}
						name={node?.created_by.split("@")[0]}
						avatarUrl={node?.avatar_url}
						userId={node?.created_by}
					/>
				))}
			</section>
		</section>
	);
};

export default Home;
