import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import React from "react";
import Dropzone from "react-dropzone";

export default function Drop({ trackData, onUpload }) {
  return (
    <Dropzone
      onDrop={async (acceptedFiles) => {
        const track = await onUpload(acceptedFiles);
        trackData(track);
      }}
    >
      {({ getRootProps, getInputProps }) => (
        <section>
          <div
            style={{ border: "2px gray dashed", padding: "10px 40px" }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <p>
              <LibraryMusicIcon />
              Drag 'n' drop some files here, or click to select files
            </p>
          </div>
        </section>
      )}
    </Dropzone>
  );
}
