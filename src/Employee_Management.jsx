import React,{useState,useEffect} from 'react'

const Employee_Management = () => {
    const[input,setInput] = useState("")
    // const[count,setCount] = useState(0)
    const[employees,setEmployees] = useState([])
    const[search,setSearch] = useState("")
    const[editingIndex,setEditingIndex] = useState(null)
    const[error,setError] = useState("")
    const[loaded,setLoaded] = useState(false)

    useEffect(()=>{
      const data=localStorage.getItem("employees")
      console.log(data)
      //getItem is used for reading/fetching the data
      // syntax:-getItem(key)
      if(data!=null){
        const savedEmployees=JSON.parse(data)
         console.log("savedEmployees",savedEmployees)
        setEmployees(savedEmployees)
        }
        setLoaded(true)
    },[])
    useEffect(()=>{
      if(loaded===false){
        return
      }
      localStorage.setItem("employees",
        JSON.stringify(employees)
          //setItem is used for saving the data
      // syntax:-setItem(key,value)
      )
    },[employees])

    const filteredEmployees=employees.filter((e)=>e.toLowerCase().includes(search.toLowerCase()))
    console.log("employees state",employees)
  return (
    <div><h1>Employee Management System</h1><br/>
    <label>Enter Employee Name:</label>&nbsp;
    <input type="text" value={input} onChange={(e)=>{setInput(e.target.value)
      setError("")
    }}></input><br/>
    {/* <button onClick={(e)=>employees.length}>Count</button><br/> */}
    <button  onClick={
      (e)=>{if(input===""){
        setError("Please enter something in the input")

        
      }
      else{
        if(editingIndex===null){
        setEmployees([...employees,input])
    // Spread Operator (...)
// Array ki existing values ko copy/expand (khol) karta hai.
// React me state update karte waqt purani values ko preserve karne ke liye use hota hai.
        setInput("")}

        else{
          const updatedEmployees = employees.map((name,index)=>{return (index===editingIndex)?input:name})
          setEmployees(updatedEmployees)
          setInput("")
          setEditingIndex(null)
          
        }
     
      }}}>{editingIndex===null?
        "Add Employee":"Update"}</button><br/>
        {error!==""?
        error:null}
    <h2>Employee Name:{input}</h2>
    <h2>Count:{employees.length}</h2>
    <h2>Employees:</h2>
        {employees.map((name,index)=>
        <h2 key ={index}>{name}&nbsp;<button onClick={(e)=>{setInput(name)
          setEditingIndex(index)
          console.log(index)}}>Edit</button>&nbsp;<button onClick={()=>setEmployees(employees.filter((_,i)=>i!==index))}>Delete</button></h2>)}
        <label>Search Employee:</label><br/>
        <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)}></input><br/>
        {/* <h2>{search}</h2> */}
        {filteredEmployees.length>0?
        filteredEmployees.map((name,index)=>
<h2 key={index}>{name}</h2>)
:"No results found"}</div>
    
  )
}

export default Employee_Management