import { useEffect, useState } from "react";
import Sample from "./Components/Sample";
// import  Auth  from "./Components/auth"
import {db,auth,storage} from './Config/firebase';
import {getDocs , collection , addDoc,deleteDoc , doc} from 'firebase/firestore'
import { ref,uploadBytes } from "firebase/storage";

const App = () => {
  const [movieList ,setMovieList] = useState([]);

  //New movie states
  const [newMovieTitle , setNewMovieTitle] = useState("");
  const [newReleaseDate , setNewReleaseDate] = useState(0);
  const [movieRelease , setMovieRelease] = useState(false);

  const moviesCollectionRef = collection(db,"movies");

  //File upload state 

  const[fileUpload,setFileUpload] =useState(null);

  const getMovieList = async()=>{
    try{
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc) => ({...doc.data(), id:doc.id,}))
      setMovieList(filteredData);
    }catch (err){
      console.log(err);
    }
    
  };

  const deleteMovie = async(movieId) => {
    const movieDoc = doc(db,"movies",movieId);
    try{
      await deleteDoc(movieDoc);
      getMovieList();
    }catch(err){
      console.log(err);
    }
      
  }

  useEffect(()=>{
    getMovieList();
  },[movieList]);


  const onSubmitMovie = async() =>{
    try{
      await addDoc(moviesCollectionRef,{title:newMovieTitle , releaseDate:newReleaseDate, Released:movieRelease,userId:auth?.currentUser?.uid})
      getMovieList();
    }catch (err){
      console.log(err);
    }
  }

  const uploadFile =async()=>{
    if(!fileUpload) return;
    const filesFolderRef = ref(storage,`projectfiles/${fileUpload.name}`);
    try{
      await uploadBytes(filesFolderRef, fileUpload);
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div>
      {/* <Auth /> */}
      <Sample />
      <div>
        <input type="text" placeholder="Movie Title" onChange={(e) => setNewMovieTitle(e.target.value)}/>
        <input type="number" placeholder="Release Date" onChange={(e) => setNewReleaseDate (Number(e.target.value))} />
        <input type="checkbox" checked={movieRelease} onChange={(e) => setMovieRelease(e.target.checked)} />
        <label>Released</label>
        <button onClick={onSubmitMovie}>Submit Movie</button>
      </div>
      <div>
        {movieList.map((movie) => (
          <div key={movie.id}>
            <h1 style={{color: movie.Released ? "green" : "red"}}>{movie.title}</h1>
            <p>Date: {movie.releaseDate}</p>
            <button onClick={()=> deleteMovie(movie.id)}>Delete Movie</button>
          </div>
        ))}
      </div>

      <div>
        <input type="file" onChange={(e) => setFileUpload(e.target.files[0])}/>
        <button onClick={uploadFile}>Upload file</button>
      </div>
    </div>
  );
}

export default App
