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

  function handleAll(event) {
    handleSubmit(event)
  }
  function handleSubmit(event) {
    event.preventDefault()
    var file = document.getElementById("myFile").files[0];
    var reader = new FileReader();
    var motif = document.getElementById("motif").value
    reader.onload = function (e) {
      // read fasta
      var [headers, sequences] = readFunction(e.target.result)
      const formData = new FormData();
      formData.append("file", file);
      formData.append("motif", motif);
      runScraper(formData)
      //Sends event trigger to modify text area
      handleTextUpdate(headers, sequences)
    };
    reader.readAsText(file);
    return
    // read fasta file
  }

  function handleTextUpdate(headers, sequences) {
    var r2dtcomponent = document.getElementById("r2dtcomponent")
    var r2dtTextArea = r2dtcomponent.shadowRoot.getElementById("sequence")
    // for (var i=0; i<seqs.length; i++) {
    //   r2dtTextArea.textContent += heads[i] + '\n' + seqs[i] + '\n'
    // }
    var valueToBe = ""
    for (var i=0; i<sequences.length; i++) {
      valueToBe += headers[i] + '\n' + sequences[i] + '\n'
    }
    valueToBe = valueToBe.trim()
    var r2dtForm = r2dtcomponent.shadowRoot.children[0].children[2].children[0].children[0].children[1]
    var buttonOneAlt = r2dtForm.getElementsByClassName("btn btn-primary mb-2")[0]
    var buttonTwoAlt = r2dtForm.getElementsByClassName("btn btn-secondary mb-2")[0]
    buttonOneAlt.disabled = false
    buttonTwoAlt.disabled = false
    var nativeTextAreaValueSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value").set;
    nativeTextAreaValueSetter.call(r2dtTextArea, valueToBe);

    const event = new Event('input', { bubbles: true});
    r2dtTextArea.dispatchEvent(event);
  }

  function readFunction(input) {
    var text = input.split("\n")
    var seqs = []
    var headers = []
    var hold = ""
    for (let i = 0; i < text.length; i++) {
      if (text[i][0] === '>') {
        headers.push(text[i].trim())
        if (hold.length > 0) {
          seqs.push(hold.trim())
          hold = ""
        }
      }
      else {
        hold += text[i]
      }
    }
    if(hold.length > 0) {
      seqs.push(hold.trim())
    }
    // console.log("Headers Below")
    // console.table(headers)
    // console.log("Sequences Below")
    // console.table(seqs)
    return [headers, seqs]
  }

  // function runScraper(formData) {
  //   var motif = document.getElementById("motif").value
  //   //run motif scraper using motif variable using the python-shell
  //   console.log("This is the motif found in the -motif- text box element: ", motif)

  //   //result contains an example output running motifscraper on
  //   // >KI270394.1 dna_sm:scaffold scaffold:GRCh38:KI270394.1:1:970:1 REF
  //   // aagtggatatttggatagctttgaggatttcgttggaaacgggattacatataaaatcta
  //   // gagagaagcattctcaggaacttctttgtgatgtttgcattcaagtcacagaactgaaca
  //   // ttccctttcatagagcaggtttgaaacactctttctgtagtatctgcaaacggacatttc
  //   // atacgctttcaggcctatggtgagaaaggaaatatcttcaaataaaaactagacagaagc
  //   // attctcagaaacttatttgcgatgtgtgtcctcaactaacagagttgaacctttgttttg
  //   // atacagcattttggaaacactctttttgtaggatctgcaggtggatatttggataggttt
  //   // gaaggtttcgttggaaacgggaatatcttcatataaaatcaacacagaagcattctcaga
  //   // aacttctctgcgatgtttgcattcaactcatagagttgaacacttcctttcatagagctg
  //   // gtttgaaatactctttttgtaatatttggaagtggacattggcagcgctttgaagcctat
  //   // gttgaaaatggaaatatcttctcctaaaaaccagacagaagcattctcagaaacttcctt
  //   // gtgatgtgtgtactcaagtaacagagttgaaccttacttttgacagagccgttttgaaac
  //   // agtctttttgtagaatctggaagtagatatttggatacctttgaggatttctttggaaac
  //   // gggatatcttcatataaaatctagacagaagcattctcagaaacttctttgtgctgtatg
  //   // tcctcaattaacagagttgaacctttgtgtggatacagcattttggaaacactcctttag
  //   // tagaatctgcaagttgatacttagataggaagatttccttggaaacgggaatatcttcat
  //   // ataaaatctagacggaagcattctcggaaacttctttgtgctgtatgtcctcaataacag
  //   // agttgaacct
  //   //looking for TTTGCA
  //   var result = "Contig,Start,End,Strand,Sequence,Motif\nKI270394.1,94,99,+,TTTGCA,TTTGCA\nKI270394.1,436,441,+,TTTGCA,TTTGCA\nKI270394.1,170,165,-,TTTGCA,TTTGCA"
    
  //   var text = result.split("\n")
  //   console.table(text)
  //   if (text.length == 1) {
  //     //the motif did not appear in the given sequence
  //     //output picture of RNA sequence structure
  //     //    using R2DT
  //     console.log("No motif occurrence found")
  //   }
  //   else if (text.length > 1) {
  //     //the sequence contains 1 or more occurrences of the motif
  //     //output picture of RNA sequence structure
  //     //    using R2DT
  //     console.log("Motif occurred: ", text.length - 1, " times")
  //     for(var i=1; i < (text.length); i++) {
  //       var info = text[i].split(",")
  //       var contig = info[0]
  //       var start = info[1]
  //       var end = info[2]
  //       console.log("Occuring in contig: ", contig, " between ", start, " and ", end)
  //     }
  //   }
  //   return
  // }
  
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
    var results = response.data[0]
    var sequence = results[0]
    var indices = results[1]
    var header = results[2]

    var stringResult = header + "\n"
    for(var i=0; i < indices.length; i++) {
      var start = indices[i]
      var end = start + formData.get("motif").length
      stringResult += "Occurs between " + start + " and " + end + "\n"

    }
    // console.log(e.target.result)
    document.getElementById("resultarea").value = "motif used: " + document.getElementById("motif").value + "\n" + stringResult
    console.log(stringResult)
    return
    // var result = "Contig,Start,End,Strand,Sequence,Motif\nKI270394.1,94,99,+,TTTGCA,TTTGCA\nKI270394.1,436,441,+,TTTGCA,TTTGCA\nKI270394.1,170,165,-,TTTGCA,TTTGCA"
    
    // var text = result.split("\n")
    // if (text.length == 1) {
    //   //the motif did not appear in the given sequence
    //   //output picture of RNA sequence structure
    //   //    using R2DT
    // }
    // else if (text.length > 1) {
    //   //the sequence contains 1 or more occurrences of the motif
    //   //output picture of RNA sequence structure
    //   //    using R2DT
    // }

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
          <form onSubmit={handleAll}>
              <h5>Fasta File Upload</h5>
              <input id="myFile" type="file"/>
              <button type="submit" name="upload">Run Scraper</button>
          </form>
          <h5>Motif Here</h5>
          <textarea rows={3} cols={30} id="motif"/>
        </div>
        <div className= "section2">
          <h5>Result</h5>
          <textarea rows={5} cols={95} disabled id="resultarea"></textarea>

        </div>
      </div>

    </div>
    
  );
}

export default Home;
