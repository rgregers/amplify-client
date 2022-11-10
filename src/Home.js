import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [className, setClassName] = useState("");

  const [fileInput, setFileInput] = useState("");

  const [result, setResult] = useState("");

  useEffect(() => {
    getClassName().then(result => {
      if (result && result.status == 201) {
        setClassName(result);
      }
    });
  }, []);

  const getClassName = async () => {
    try {
      const response = await axios.get("http://localhost:5001/");
      return response;
    }
    catch (error) {
      console.log("Error: " + error.message);
      return false;
    }
  }
  
  function handleSubmit(event) {
    event.preventDefault()
    return
    // read fasta file
  }

  return(
    <div className="home">
      <h1>Hello {className.data}!</h1>
      <form onSubmit={handleSubmit}>
          <h5>Fasta File Upload</h5>
          <input type="file" />
          <button type="submit" name="upload">Upload</button>
        </form>
      <h5>Motif Here</h5>
      <textarea rows={3} cols={30} id="motif"></textarea>
      <button>Run Scraper</button>

    </div>
  );
}

export default Home;
