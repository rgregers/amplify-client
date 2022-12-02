import { useState } from "react";
import axios from "axios";
import "./home.css"

function Home() {
  const [file, setFile] = useState(null);
  const [motif, setMotif] = useState("");

  function handleFileSelect(event) {
    setFile(event.target.files[0]);
  }

  function handleMotif(event) {
    setMotif(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("motif", motif);
    runScraper(formData);
    return
    // read fasta file
  }

  async function runScraper(formData) {
    var response = null;
    try {
      response = await axios.post("http://localhost:5001/", formData, {headers: {"Content-Type": "multipart/form-data"}});
    }
    catch(error) {
      console.log(error);
      return false;
    }
    console.log(response);
    var result = "Contig,Start,End,Strand,Sequence,Motif\nKI270394.1,94,99,+,TTTGCA,TTTGCA\nKI270394.1,436,441,+,TTTGCA,TTTGCA\nKI270394.1,170,165,-,TTTGCA,TTTGCA"
    
    var text = result.split("\n")
    if (text.length == 1) {
      //the motif did not appear in the given sequence
      //output picture of RNA sequence structure
      //    using R2DT
    }
    else if (text.length > 1) {
      //the sequence contains 1 or more occurrences of the motif
      //output picture of RNA sequence structure
      //    using R2DT
    }
    return
  }

  return(
      <div className="body">
        <div className= "section1">
          {/* <h1>Hello {className.data}!</h1> */}
          <form onSubmit={handleSubmit}>
              <h5>Fasta File Upload</h5>
              <input id="myFile" type="file" onChange={handleFileSelect}/>
              <button type="submit" name="upload">Run Scraper</button>
          </form>
          <h5>Motif Here</h5>
          <textarea rows={3} cols={30} id="motif" onChange={handleMotif}></textarea>
        </div>
        <div className= "section2">
          
        </div>
      </div>
  );
}

export default Home;
