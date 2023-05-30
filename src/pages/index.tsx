import { collection, getDocs, onSnapshot, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { getFirebase } from '../../firebase'
import { Project, projectSchema } from '../models/project'

const { db } = getFirebase()

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([])

  const getProjects = async () => {
    const querySnapshot = await getDocs(collection(db, "projects"))

    const projectDocs = querySnapshot.docs.map((doc) => projectSchema.parse(doc.data()))

    setProjects(projectDocs)
  }

  useEffect(() => {
    getProjects()
  })

  return (
    <main>
      <div>
        <h1>
          Portfolio
        </h1>
        <ul>
          {projects.map(project => (
            <li key={project.title}>
              <p>{project.title}</p>
              <p>{project.description}</p>
              <p>{project.url}</p>
              <p>{project.image}</p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
