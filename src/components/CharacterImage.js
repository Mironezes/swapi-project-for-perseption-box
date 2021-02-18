import React, {useState} from 'react'
import ImageUploading from "react-images-uploading";

export const CharacterImage = ({character}) => {
  
  let characterImages = JSON.parse(localStorage.getItem('charactersImages'))
  characterImages = characterImages ? characterImages : [];

  const [image, setImage] = useState([]);
  const [uploadButton, setUploadButton] = useState(true)
  const [updateButton, setUpdateButton] = useState(false)

  const onChange = (imageList) => {
    setUploadButton(false)
    setImage(imageList);
    setUpdateButton(true)

    const characterImage = {
      uri: character.url.replace('http://swapi.dev/api', ''),
      image_src: imageList.map(item => item.data_url).join('')
    }

    characterImages.push(characterImage)
    localStorage.setItem('charactersImages', JSON.stringify(characterImages))

  };


  return (
    <ImageUploading
      value={image}
      onChange={onChange}
      dataURLKey="data_url"
    >
    {({
      imageList,
      onImageUpload,
      onImageUpdate,
    }) => (
    <>

        

        {uploadButton 
          ? <button onClick={onImageUpload}>Add character`s image</button>
          :  null
        }

        {imageList.map((image, index) => (
          <div key={index}>
            <img src={image.data_url} alt="" width="100%" height="100%" />
            {updateButton 
              ? <button onClick={() => onImageUpdate(index)}>Update image</button> 
              : null
            }
          </div>
        ))}
    </>
    )}
    </ImageUploading>
  )


}


