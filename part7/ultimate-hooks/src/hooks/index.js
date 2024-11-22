const [resources, setResources] = useState([])

const get = useCallback()


const getAll = async () => {
  console.log('getting all')
  const retrievedResources = await axios.get(baseUrl)
  setResources(retrievedResources.data)
  console.log('retrieved resources: ', retrievedResources.data)
}


useEffect(() => {
  getAll()
}, [getAll])

const create = async (resource) => {

  const newResource = await axios.post(baseUrl, resource)

  setResources(resources.concat(newResource.data))
  console.log('new resource: ', newResource.data)
}

/*   const update = async (id, updatedObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedObject)
  return response.data
}

const deleteOne = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`)
  return response.data
} */



const service = {
  create,
  getAll
}

return [
  resources, service
]
}