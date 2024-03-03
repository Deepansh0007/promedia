import Link from "next/link"

import { getUserProjects } from "@/lib/actions"
import Image from "next/image"

const RelatedProjects = async ({ email, projectId }) => {
  const result = await getUserProjects(email)
  const userLink = email.split("@")[0]
  const filteredProjects = getUserProjects(email)
  if (!filteredProjects.rows) return null

  return (
    <section className="flex flex-col mt-32 w-full">
      <div className="flexBetween">
        <p className="text-base font-bold">More by {userLink}</p>
        <Link
          href={`/profile/${userLink}`}
          className="text-primary-purple text-base"
        >
          View All
        </Link>
      </div>

      <div className="related_projects-grid">
        {filteredProjects?.map(( node ) => (
          <div className="flexCenter related_project-card drop-shadow-card">
            <Link
              href={`/project/${node?.id}`}
              className="flexCenter group relative w-full h-full"
            >
              <Image
                src={node?.image_url}
                width={414}
                height={314}
                className="w-full h-full object-cover rounded-2xl"
                alt="project image"
              />

              <div className="hidden group-hover:flex related_project-card_title">
                <p className="w-full">{node?.title}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}

export default RelatedProjects
