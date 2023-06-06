import { collection, getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { getFirebase } from '../../firebase'
import { Project, projectSchema } from '../models/project'
import Image from 'next/image'
import Head from 'next/head'
import {
  AiFillLinkedin,
  AiFillGithub
} from "react-icons/ai";

const { db } = getFirebase()

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([])

  const getProjects = async (): Promise<void> => {
    const querySnapshot = await getDocs(collection(db, "projects"))

    const projectDocs = querySnapshot.docs.map((doc) => projectSchema.parse(doc.data()))

    setProjects(projectDocs)
  }

  useEffect(() => {
    getProjects()
  })

  return (
    <div>
      <Head>
        <title>Nicole Reed</title>
        <meta name="description" content="Nicole Reed Portfolio" />
      </Head>
      <main className='bg-white px-10'>
        <section className="min-h-screen">
          <nav className="py-10 flex justify-around dark:text-white">

            <a
              className="bg-gradient-to-b from-slate-500 text- to-slate-400 text-white px-4 py-2 border-none rounded-md ml-8"
              href="#projects"
            >
              Recent Work
            </a>
            <a
              className="bg-gradient-to-b from-slate-500 text- to-slate-400 text-white px-4 py-2 border-none rounded-md ml-8"
              href="https://www.linkedin.com/in/nicolereed/"
            >
              Contact Me
            </a>

          </nav>

          <div className="text-center p-10 py-10">
            <h2 className="text-5xl text-cyan-600 font-medium dark:text-white md:text-6xl">
              Nicole Reed
            </h2>
            <h3 className="text-2xl py-2 text-slate-500 dark:text-white md:text-3xl">
              Web Developer
            </h3>
            <div className="mx-auto rounded-full w-40 h-40 relative overflow-hidden m-10 md:h-60 md:w-60">
              <Image src='/facePic.png' alt='' width={300} height={200} />
            </div>
            <p className="text-md py-5 leading-8 text-slate-600 dark:text-slate-200 max-w-xl mx-auto md:text-xl">
              Freelancer providing full stack development services. Get in touch with me so we can build something together!
            </p>
            <div className=" flex justify-center gap-16 py-3 text-cyan-600 dark:text-slate-400">
              <a className="text-5xl hover:text-slate-500" href='https://www.linkedin.com/in/nicolereed/'><AiFillLinkedin /></a>
              <a className="text-5xl hover:text-slate-500" href='https://github.com/nicole-reed'><AiFillGithub /></a>
            </div>

          </div>
        </section>

        <section id='projects'>
          <div className="lg:flex gap-10">
            {projects.map(project => (
              <a key={project.title} href={project.url}>
                <div className="text-center shadow-lg p-10 rounded-xl my-10 dark:bg-white flex-1">
                  <Image  alt={project.description} src={project.image} width={400}
                    height={400}
                  />
                  <h2 className="text-lg font-medium text-cyan-600 pt-8 pb-2  ">
                    {project.title}
                  </h2>
                  <p className="text-slate-600">
                    {project.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
