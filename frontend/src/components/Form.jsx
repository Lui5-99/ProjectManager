import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useProjects from '../hooks/useProjects'
import Alert from '../components/Alert'

const Form = () => {
  const [ id, setId ] = useState(null)
  const [ name, setName ] = useState('')
  const [ description, setDescription ] = useState('')
  const [ deadline, setDeadline ] = useState('')
  const [ client, setClient ] = useState('')

  const params = useParams() 

  useEffect(() => {
    if(params.id){
      setId(project._id)
      setName(project.name)
      setDescription(project.description)
      setDeadline(project.deadline?.split('T')[0])
      setClient(project.client)
    }
  }, [params])

  const { showAlert, alert, submitProject, project } = useProjects()

  const handleSubmit = async e => {
    e.preventDefault()
    if([name, description, deadline, client].includes('')){
      showAlert({
        msg: "All fields are required",
        error: true
      })
      return
    }
    await submitProject({
      id,
      name,
      description,
      deadline,
      client
    })
    setId(null)
    setName('')
    setDescription('')
    setDeadline('')
    setClient('')
  }

  const { msg } = alert

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-zinc-900 py-10 px-5 md:w-1/2 rounded-lg shadow">
      {msg && <Alert alert={alert} /> }
      <div className="mb-5">
        <label
          htmlFor="name"
          className="text-gray-700 dark:text-white uppercase font-bold text-sm"
        >Project name</label>
        <input
          type="text"
          id="name"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md dark:bg-gray-500 dark:placeholder:text-white dark:border-white dark:text-white"
          placeholder="Project name"
          value={name}
          onChange={e => { setName(e.target.value) }}
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="description"
          className="text-gray-700 uppercase font-bold text-sm dark:text-white"
        >Description</label>
        <textarea
          id="description"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md dark:bg-gray-500 dark:placeholder:text-white dark:border-white dark:text-white"
          placeholder="Description"
          value={description}
          onChange={e => { setDescription(e.target.value) }}
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="deadline"
          className="text-gray-700 uppercase font-bold text-sm dark:text-white"
        >Deadline</label>
        <input
          id="deadline"
          type="date"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md dark:bg-gray-500 dark:placeholder:text-white dark:border-white dark:text-white"
          placeholder="Description"
          value={deadline}
          onChange={e => { setDeadline(e.target.value) }}
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="nameClient"
          className="text-gray-700 uppercase font-bold text-sm dark:text-white"
        >Client name</label>
        <input
          type="text"
          id="nameClient"
          className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md dark:bg-gray-500 dark:placeholder:text-white dark:border-white dark:text-white"
          placeholder="Client name"
          value={client}
          onChange={e => { setClient(e.target.value) }}
        />
      </div>
      <input
        type="submit"
        value={`${id ? 'Edit' : 'Create'} project`}
        className="bg-sky-600 hover:bg-sky-800 dark:bg-indigo-600 dark:hover:bg-indigo-800 w-full p-3 uppercase font-bold text-white rounded cursor-pointer transition-all"
      />
    </form>
  );
};

export default Form;
