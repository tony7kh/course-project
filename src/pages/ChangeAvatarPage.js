import React, { useEffect, useState } from "react";
import Drop from "../utils/DropZoneForAvatar";
import { gql } from "../utils/GQL";
import { store } from "../redux/Store";
import { PROFILE_PAGE_PATH } from "../Constants";

import { Card } from "@mui/material";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import ImageIcon from "@mui/icons-material/Image";

const actionUploadPhoto = async (file) => {
  const uploadFile = async (file) => {
    const url = `http://player.node.ed.asmer.org.ua/upload`;
    let formData = await new FormData();
    formData.append("photo", file);
    return fetch(url, {
      method: "POST",
      headers: localStorage.authToken
        ? { Authorization: "Bearer " + localStorage.authToken }
        : {},
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
  };
  return await Promise.all(file.map((file) => uploadFile(file))).then(
    (values) => {
      return values;
    }
  );
};

const actionAddAvatar = async (avatar) => {
  const _id = store.getState().promise.aboutMe.payload._id;

  const gqlQuery = `  mutation setAvatar($id: String, $avatar: ID){
        UserUpsert(user:{_id: $id, avatar:{_id: $avatar}}){
            _id login nick avatar{url}
        }
    }`;

  const gqlPromise = gql(gqlQuery, {
    id: _id,
    avatar: avatar,
  });
  const action = await gqlPromise;
  return action;
};

const UploadBox = ({ defaultPhotos = [] }) => {
  const [photos, ChangePhotos] = useState(defaultPhotos);
  const [photosIds, ChangePhotosIds] = useState(defaultPhotos);

  useEffect(() => {
    console.log(photos);
  }, [photos]);

  return (
    <Card sx={{ textAlign: "left", padding: "40px", marginBottom: "20px" }}>
      <form>
        <Drop
          imageData={(image) => {
            ChangePhotos((prevArray) =>
              prevArray.concat(
                image.map((img) => {
                  return { url: `${URL}${img.url}` };
                })
              )
            );
            ChangePhotosIds((prevArray) =>
              prevArray.concat(
                image.map((img) => {
                  return { _id: img._id };
                })
              )
            );
          }}
          onUpload={actionUploadPhoto}
        />
        <div style={{ display: "flex" }}>
          {Array.isArray(photos)
            ? photos.map((photo) => (
                <CardMedia key={photo.url} photo={photo.url}>
                  <ImageIcon />
                </CardMedia>
              ))
            : ""}
        </div>
        <Button
          onClick={() => {
            actionAddAvatar(photosIds[0]._id);
            setInterval(() => {
              window.location.href = PROFILE_PAGE_PATH;
            }, 1);
          }}
        >
          <h3>Change Avatar</h3>
        </Button>
      </form>
    </Card>
  );
};

export const ChangeAvatarPage = () => {
  return <UploadBox />;
};
