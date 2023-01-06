import { parse, v4 as uuidv4} from 'uuid'

import styles from './Projetc.module.css';

import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import Loading from '../layout/Loading'
import Container from '../layout/Container'
import ProjectForm from '../project/ProjectForm'
import Message from '../layout/Message'
import ServiceForm from '../service/ServiceForm'
import ServiceCard from '../service/ServiceCard'

function Project (){
  const {id} = useParams()
  const [project, setProject] = useState([])
  const [showProjetctForm, setShowProjectForm] = useState(false)
  const [showServiceForm, setShowServiceForm] = useState(false)
  const [message, setMessage] = useState()
  const [type, setType] = useState()
  const [services, setServices] = useState([])

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
      setServices(data.services)
    })
    .catch((err)=> console.log(err))
    }, 300)
  },[id])

  function editPost(project){
    setMessage('')

    //budget validation
    if (project.budget < project.cost) {
      setMessage('O orçamento não pode ser menor que o custo do projeto!')
      setType('error')
      return(false)
    }

    fetch(`http://localhost:5000/projects/${project.id}` , {
      method: 'PATCH' , 
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(project),
    })
    .then(res => res.json())
    .then((data)=> {
      setProject(data)
      setShowProjectForm(false)
      setMessage('Projeto atualizado!')
      setType('success')
    })
    .catch((err)=> console.log(err))
  }

  function createService (project) {
    setMessage('')
    // last service
    const lastService = project.services[project.services.length - 1]

    lastService.id = uuidv4()

    const lastServiceCost = lastService.cost
    const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

    //maximum value validation
    if (newCost > parseFloat(project.budget)) {
      setMessage('Orçamento ultrapassado, verifique o valor do serviço')
      setType('error')
      project.services.pop()
      return false
    }
    //add service cost to project total cost
    project.cost = newCost

    //update project
    fetch(`http://localhost:5000/projects/${project.id}` , {
      method: 'PATCH' , 
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(project),
    })
    .then(res => res.json())
    .then((data)=> {
      setShowServiceForm(false)
      
    })
    .catch((err)=> console.log(err))    
  }

  function removeService () {

  }

  function toggleProjectForm() {
    setShowProjectForm(!showProjetctForm)
  }
  function toggleServiceForm() {
    setShowServiceForm(!showServiceForm)
  }
  return(
    <>
      {project.name ? (
      <div className={styles.project_details}>
        <Container customClass="column">
          {message && <Message type={type} msg={message}/>}
          <div className={styles.details_container}>
            <h1>Projeto: {project.name}</h1>
            <button onClick={toggleProjectForm} className={styles.btn}>
              {!showProjetctForm ? "Editar projeto" : "Fechar"}
            </button>
            {!showProjetctForm ? (
              <div className={styles.project_info}>
                <p>
                  <span>Categoria:</span> {project.category.name}
                </p>
                <p>
                  <span>Total de Orçamento:</span> R${project.budget}
                </p>
                <p>
                  <span>Total de Urilizado:</span> R${project.cost}
                </p>
              </div>
            ) : (
              <div className={styles.project_info}>
               <ProjectForm
                handleSubmit={editPost}
                btnText="Concluir edição"
                projectData={project}
               />
              </div>
            )}
          </div>
          <div className={styles.service_form_container}>
              <h2>Adicione um serviço:</h2>
              <button onClick={toggleServiceForm} className={styles.btn}>
                {!showServiceForm ? "Adicionar serviço" : "Fechar"}
            </button>
            <div className={styles.project_info}>
              {showServiceForm && (
                <ServiceForm
                  handleSubmit={createService}
                  btnText="Adicionar Serviço"
                  projectData={project}
                />
              )
              }
            </div>
          </div>
          <h2>Serviços:</h2>
          <Container customClass="start">
              {services.length > 0 &&
                services.map((service) => (
                  <ServiceCard 
                    id={service.id}
                    name={service.name}
                    cost={service.cost}
                    description={service.description}
                    key={service.id}
                    handleRemove={removeService}
                  />
                ))
              }
              {services.length === 0 && <p>Não há serviços cadastrados!</p>}
          </Container>
        </Container>
      </div>) : (
        <Loading/>
      )}
    </>
  )
}
export default Project