import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [className, setClassName] = useState("");

  const [seqs, setSeqs] = useState("");

  const [headers, setHeaders] = useState("");

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
    var file = document.getElementById("myFile").files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
      // read fasta
      var sequences = readFunction(e.target.result)
      console.log(e.target.result)
    };
    reader.readAsText(file);
    return
    // read fasta file
  }

  function readFunction(input) {
    var text = input.split("\n")
    var seqs = []
    var headers = []
    for (let i = 0; i < text.length; i++) {
      if (text[i][0] == '>') {
        headers.push(text[i].trim())
      }
      else {
        seqs.push(text[i].trim())
      }
    }
    console.log(headers)
    console.log(seqs)
    return seqs
  }

  function runScraper() {
    var motif = document.getElementById("motif").target.result
    //run motif scraper using motif variable using the python-shell
    return
  }

  return(
    <div className="home">
      <h1>Hello {className.data}!</h1>
      <form onSubmit={handleSubmit}>
          <h5>Fasta File Upload</h5>
          <input id="myFile" type="file"/>
          <button type="submit" name="upload">Run Scraper</button>
        </form>
      <h5>Motif Here</h5>
      <textarea rows={3} cols={30} id="motif"></textarea>


    </div>
  );
}

export default Home;
