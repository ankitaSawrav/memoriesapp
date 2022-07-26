import {useDropzone} from 'react-dropzone'
import  {useCallback, useEffect, useState} from 'react'
import './dropzone.css'


function Dropzone(props){
    

    // for cloudinary folder  https://www.youtube.com/watch?v=TBOkDQEBPIU&ab_channel=yoursTRULY

const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
        acceptedFiles.forEach(file => {
            const reader = new FileReader()
            reader.onload = () => {
                // setImages(prevState => [...prevState, reader.result])
                props.setImagesProps(prevState => [...prevState, reader.result])
            }
            reader.readAsDataURL(file)
            console.log(reader.result,"result")
            
        });
        console.log("acceptedFiles",acceptedFiles)
      }, [])

 const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop,
    accept:{
        'image/*': ['.jpeg', '.png']
      }
})
    // console.log(getInputProps(),getRootProps())
    return(
        <div className="dropzone" {...getRootProps()}>
            <input {...getInputProps()}/>
            {isDragActive ?
            <p>Drop the file here ...</p> :
            <p>Drag 'n' drop file here..</p>
        }
        {/* only displays this div if images.length >0  */}
        {props.images.length >0 && <div>
            {props.images.map((image,index) =>{
                return <img className='selected-images' src={image} key={index} ></img>
            })}
            </div>}
        </div>
    )
}
export default Dropzone