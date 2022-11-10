import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [className, setClassName] = useState("");

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

  return(
    <div className="home">
      <h1>Hello {className.data}!</h1>
      <h5>Sequence Here</h5>
      <textarea rows={3} cols={30}></textarea>
      <form>
          <h5>Fasta File Upload</h5>
          <input type="file" />
          <button type="submit">Upload</button>
        </form>
      <h5>Motif Here</h5>
      <textarea rows={3} cols={30}></textarea>
      <button>Run Scraper</button>
    </div>
  );
}

export default Home;
