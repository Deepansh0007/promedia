"use client"
import Image from "next/image";
import Link from "next/link";
import Button from "./Button";
import ProjectCard from "./ProjectCard";
import { useState } from "react";

const ProfilePage = ({ user, projects }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="flexCenter flex-col max-w-10xl w-full mx-auto paddings">
      <section className="flexBetween max-lg:flex-col gap-10 w-full">
        <div className="flex items-start flex-col w-full">
          <Image
            src={user?.avatar_url}
            width={100}
            height={100}
            className="rounded-full"
            alt="user image"
          />
          <p className="text-4xl font-bold mt-10">{user?.name}</p>
          <p className="md:text-2xl text-xl font-extrabold md:mt-10 mt-5 max-w-lg flex">
            {user.description}
            <Image
              src="/save.svg"
              width={10}
              height={10}
              className="ml-3 cursor-pointer"
              alt="save icon"
              onClick={() => setIsOpen(true)}
            />
          </p>

          <div className="flex mt-8 gap-5 w-full flex-wrap">
            <Button
              title="Follow"
              leftIcon="/plus-round.svg"
              bgColor="bg-light-white-400 !w-max"
              textColor="text-black-100"
            />
            <Link href={`mailto:${user?.email}`}>
              <Button title="Hire Me" leftIcon="/email.svg" />
            </Link>
          </div>
        </div>

        {projects ? (
          <Image
            src={projects[projects.length - 1]?.image_url}
            alt="project image"
            width={739}
            height={554}
            className="rounded-xl object-contain cursor-pointer"
            onClick={() => setIsOpen(true)}
          />
        ) : (
          <Image
            src={user.avatar_url}
            width={739}
            height={554}
            alt="project image"
            className="rounded-xl cursor-pointer"
            onClick={() => setIsOpen(true)}
          />
        )}
      </section>

      <section className="flexStart flex-col lg:mt-28 mt-16 w-full">
        <p className="w-full text-left text-lg font-semibold">Recent Work</p>

        <div className="profile_projects">
          {projects?.map((node) => (
            <ProjectCard
              key={node?.id}
              id={node?.id}
              image={node?.image_url}
              title={node?.title}
              name={user.name}
              avatarUrl={user.avatar_url}
              userId={user.email}
            />
          ))}
        </div>
      </section>
    </section>
  );
};

export default ProfilePage;
