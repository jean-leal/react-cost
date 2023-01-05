//import styles from './Projetc.module.css';

import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import Loading from '../layout/Loading'
import Container from '../layout/Container'

function Project (){
  const {id} = useParams()
  const [project, setProject] = useState([])

  useEffect(()=>{
    setTimeout(()=>{
      fetch(`http://localhost:5000/projects/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type' : 'applcation/json'
      }
    })
    .then(res => res.json())
    .then((data) =>{
      setProject(data)
    })
    .catch((err)=> console.log(err))
    }, 300)
  },[id])

  return(
    <>
      {project.name ? (
      <div>
        <Container customClass="column">
          <div>
            <h1>Projeto: {project.name}</h1>
            <button>Editar projeto</button>
          </div>
        </Container>
      </div>) : (
        <Loading/>
      )}
    </>
  )
}
export default Project