import React, { useEffect, useState } from 'react'
import { data } from 'react-router-dom'

function QOTD() {
  let userid=localStorage.getItem("userId");
  const [answer,setAnswer] = useState("");
    const [task,settask] = useState("");
  const[qd,setqd]=useState(false);
  const[td,settd]=useState(false);
  const[qotd,setquestion]=useState({
    question:"",
    option1:"",
    option2:"",
    option3:"",
    option4:"",
})
useEffect(()=>{
  fetch(`${import.meta.env.VITE_API_URL}/question`)
  .then(res=>res.json())
  .then(data=>setquestion(data))
  .catch(err=>console.log(err))

    fetch(`${import.meta.env.VITE_API_URL}/task`)
  .then(res=>res.json())
  .then(data=>settask(data))
  .catch(err=>console.log(err))

  
  let url=`${import.meta.env.VITE_API_URL}/question-completed/`
  url=url+userid;

   fetch(url)
  .then(res=>res.json())
  .then(data=>setqd(data))
  .catch(err=>console.log(err))
 let url1=`${import.meta.env.VITE_API_URL}/task-completed/`
  url1=url1+userid;
   fetch(url1)
  .then(res=>res.json())
  .then(data=>settd(data))
  .catch(err=>console.log(err))
  

},[]);
function handleclick()
{
  let url=`${import.meta.env.VITE_API_URL}/task-complete/`
  url=url+userid;
   fetch(url)
           .then(res=>res.json())
           .then(data=>console.log(data))
           .catch(err=>console.log(err));
    if(data)
    {
      alert("task submitted successfully");
        document.getElementById("ann").disabled=true;
        document.getElementById("subb").disabled=true;
        if(qd&&td)
        {
            alert("you have obtiained a streak")
        }
    }
    else{
      alert("Error occured during submission");
    }
}
function checkAnswer()
{
    fetch(
        `${import.meta.env.VITE_API_URL}/check-answer`,
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                questionid:qotd.id,
                ans:answer
            })
        }
    )
    .then(res=>res.json())
    .then(correct=>{

        if(correct)
        {
            alert("Correct Answer 🎉");
           document.getElementById("an").disabled=true;
           document.getElementById("sub").disabled=true;
           let url=`${import.meta.env.VITE_API_URL}/question-complete/`
            url=url+userid;
           fetch(url)
           .then(res=>res.json())
           .then(data=>console.log(data))
           .catch(err=>console.log(err));
            if(qd&&td)
            {
                alert("you have obtiained a streak")
            }
        }

        else
        {
            alert("Wrong Answer");
        }

    });
}
if(!qd&&!td)
{
    return (
        <div className='qt'>
        <div className='qt-title'>
            <h2>Question of The Day</h2>
            <h4>{qotd.question} :</h4>
            <h5>--------------------------------------------------------</h5>
            <h6>1.{qotd.option1}</h6>
            <h6>2.{qotd.option2}</h6>
            <h6>3.{qotd.option3}</h6>
            <h6>4.{qotd.option4}</h6>
            <label htmlFor="question">Enter the correct option:</label>
            <input type="text" id="an" value={answer} onChange={(e)=>setAnswer(e.target.value)}/>
            <button onClick={checkAnswer} id="sub">
                Submit
            </button>
        </div>
        <div className='tt'>
            <h1>Task of the Day</h1>
            <p>{task.description}</p>
            <input type="file" name="task" id="ann" />
            <input type="submit" value="Submit" onClick={handleclick}  id="subb" />
        </div>
        </div>

      )
}
if(qd&&td)
{
  return (
    <div className='qt'>
    <div className='qt-title'>
        <h2>Question of The Day</h2>
        <h4>{qotd.question} :</h4>
        <h5>--------------------------------------------------------</h5>
        <h6>1.{qotd.option1}</h6>
        <h6>2.{qotd.option2}</h6>
        <h6>3.{qotd.option3}</h6>
        <h6>4.{qotd.option4}</h6>
        <label htmlFor="question">Enter the correct option:</label>
         <input type="text" id="an" value={answer} onChange={(e)=>setAnswer(e.target.value)} disabled/>
        <button onClick={checkAnswer} id="sub" disabled>
            Submit
        </button>
    </div>
     <div className='tt'>
        <h1>Task of the Day</h1>
        <p>{task.description}</p>
        <input type="file" name="task" id="ann"  disabled />
        <input type="submit" value="Submit" onClick={handleclick}  id="subb"  disabled/>
    </div>
    </div>

  )
}
if(!qd)
{
  return (
    <div className='qt'>
    <div className='qt-title'>
        <h2>Question of The Day</h2>
        <h4>{qotd.question} :</h4>
        <h5>--------------------------------------------------------</h5>
        <h6>1.{qotd.option1}</h6>
        <h6>2.{qotd.option2}</h6>
        <h6>3.{qotd.option3}</h6>
        <h6>4.{qotd.option4}</h6>
        <label htmlFor="question">Enter the correct option:</label>
         <input type="text" id="an" value={answer} onChange={(e)=>setAnswer(e.target.value)} />
        <button onClick={checkAnswer} id="sub">
            Submit
        </button>
    </div>
     <div className='tt'>
        <h1>Task of the Day</h1>
        <p>{task.description}</p>
        <input type="file" name="task" id="ann"  disabled />
        <input type="submit" value="Submit" onClick={handleclick}  id="subb"  disabled />
    </div>
    </div>

  )
}
if(!td)
{
  return (
    <div className='qt'>
    <div className='qt-title'>
        <h2>Question of The Day</h2>
        <h4>{qotd.question} :</h4>
        <h5>--------------------------------------------------------</h5>
        <h6>1.{qotd.option1}</h6>
        <h6>2.{qotd.option2}</h6>
        <h6>3.{qotd.option3}</h6>
        <h6>4.{qotd.option4}</h6>
        <label htmlFor="question">Enter the correct option:</label>
         <input type="text" id="an" value={answer} onChange={(e)=>setAnswer(e.target.value)} disabled/>
        <button onClick={checkAnswer} id="sub" disabled>
            Submit
        </button>
    </div>
     <div className='tt'>
        <h1>Task of the Day</h1>
        <p>{task.description}</p>
        <input type="file" name="task" id="ann"/>
        <input type="submit" value="Submit" onClick={handleclick}  id="subb"  />
    </div>
    </div>

  )
}
  
}

export default QOTD