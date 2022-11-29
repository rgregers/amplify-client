import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import axios from "axios";
import "./home.css"


function Home() {
  function showR2DT() {
    document.getElementById('r2dtcomponent').style.display='block';
    console.log("showing r2dt")
    return false;
  }
  function hideR2DT() {
    document.getElementById('r2dtcomponent').style.display='none';
    console.log("hiding r2dt")
    return false;
  }
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
      runScraper()
      console.log(e.target.result)
      document.getElementById("resultarea").value = "motif used: " + document.getElementById("motif").value + "\nmotif found: False/True" + "\nAt indices: x, y, z"
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
    console.log("Headers Below")
    console.table(headers)
    console.log("Sequences Below")
    console.table(seqs)
    return seqs
  }

  function runScraper() {
    var motif = document.getElementById("motif").value
    //run motif scraper using motif variable using the python-shell
    console.log("This is the motif found in the -motif- text box element: ", motif)

    //result contains an example output running motifscraper on
    // >KI270394.1 dna_sm:scaffold scaffold:GRCh38:KI270394.1:1:970:1 REF
    // aagtggatatttggatagctttgaggatttcgttggaaacgggattacatataaaatcta
    // gagagaagcattctcaggaacttctttgtgatgtttgcattcaagtcacagaactgaaca
    // ttccctttcatagagcaggtttgaaacactctttctgtagtatctgcaaacggacatttc
    // atacgctttcaggcctatggtgagaaaggaaatatcttcaaataaaaactagacagaagc
    // attctcagaaacttatttgcgatgtgtgtcctcaactaacagagttgaacctttgttttg
    // atacagcattttggaaacactctttttgtaggatctgcaggtggatatttggataggttt
    // gaaggtttcgttggaaacgggaatatcttcatataaaatcaacacagaagcattctcaga
    // aacttctctgcgatgtttgcattcaactcatagagttgaacacttcctttcatagagctg
    // gtttgaaatactctttttgtaatatttggaagtggacattggcagcgctttgaagcctat
    // gttgaaaatggaaatatcttctcctaaaaaccagacagaagcattctcagaaacttcctt
    // gtgatgtgtgtactcaagtaacagagttgaaccttacttttgacagagccgttttgaaac
    // agtctttttgtagaatctggaagtagatatttggatacctttgaggatttctttggaaac
    // gggatatcttcatataaaatctagacagaagcattctcagaaacttctttgtgctgtatg
    // tcctcaattaacagagttgaacctttgtgtggatacagcattttggaaacactcctttag
    // tagaatctgcaagttgatacttagataggaagatttccttggaaacgggaatatcttcat
    // ataaaatctagacggaagcattctcggaaacttctttgtgctgtatgtcctcaataacag
    // agttgaacct
    //looking for TTTGCA
    var result = "Contig,Start,End,Strand,Sequence,Motif\nKI270394.1,94,99,+,TTTGCA,TTTGCA\nKI270394.1,436,441,+,TTTGCA,TTTGCA\nKI270394.1,170,165,-,TTTGCA,TTTGCA"
    
    var text = result.split("\n")
    console.table(text)
    if (text.length == 1) {
      //the motif did not appear in the given sequence
      //output picture of RNA sequence structure
      //    using R2DT
      console.log("No motif occurrence found")
    }
    else if (text.length > 1) {
      //the sequence contains 1 or more occurrences of the motif
      //output picture of RNA sequence structure
      //    using R2DT
      console.log("Motif occurred: ", text.length - 1, " times")
    }
    return
  }

  return(
    <div className="home">
      <div className="titleBar">
        <div className="title">
          <p> Amplify </p>{" "}
        </div>
        <div className="barButtons">
          <Link className="bar_button" to="/">
            Home
          </Link>
          <Link className="bar_button" to="/about" onClick={hideR2DT}>
            About
          </Link>
        </div>
      </div>

      <div className="body">
        <div className= "section1">
          {/* <h1>Hello {className.data}!</h1> */}
          <form onSubmit={handleSubmit}>
              <h5>Fasta File Upload</h5>
              <input id="myFile" type="file"/>
              <button type="submit" name="upload">Run Scraper</button>
          </form>
          <h5>Motif Here</h5>
          <textarea rows={3} cols={30} id="motif"/>
        </div>
        <div className= "section2">
          <h5>Result</h5>
          <textarea rows={5} cols={60} disabled id="resultarea"></textarea>

        </div>
      </div>

    </div>
    
  );
}

export default Home;
