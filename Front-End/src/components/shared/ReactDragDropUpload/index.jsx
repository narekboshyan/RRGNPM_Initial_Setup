import React, { useEffect, useRef, useState } from "react";
import "./drop-file-input.css";
import uploadImg from "assets/icons/cloud-upload-regular-240.png";
import { ImageConfig } from "helpers/common";
import CloseIcon from "@material-ui/icons/Close";
import { v4 } from "uuid";
import IconButton from "components/shared/Button/IconButton";
import { FETCH_LOADING_TEXT } from "constants/index";
import CircularLoading from "components/shared/Loading";
import { Button, Paper } from "@material-ui/core";

const DropFileInput = ({ onFileChange = () => {}, loading, response, className }) => {
  const wrapperRef = useRef(null);

  const [fileList, setFileList] = useState([]);

  const onDragEnter = () => wrapperRef.current.classList.add("dragover");
  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");
  const onDrop = () => wrapperRef.current.classList.remove("dragover");

  const onFileDrop = (e) => {
    const addedFiles = [...e.target.files];
    if (!addedFiles.length) return;
    const files = addedFiles.map((file) => ({ id: v4(), file }));
    setFileList((prevState) => [...prevState, ...files]);
  };

  const fileRemove = (itemId) => {
    setFileList(fileList.filter(({ id }) => id !== itemId));
  };

  useEffect(() => {
    if (response) {
      setFileList([]);
    }
  }, [response]);

  return (
    <Paper className={className}>
      <CircularLoading text={FETCH_LOADING_TEXT} open={loading} fullScreen={false} />
      <div
        ref={wrapperRef}
        className="drop-file-input"
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <div className="drop-file-input__label">
          <img src={uploadImg} alt="" />
          <p>Drag & Drop your files here</p>
          <p>New or Existing Orders</p>
        </div>
        <input type="file" value="" multiple onChange={onFileDrop} />
      </div>
      {fileList.length > 0 && (
        <div className="drop-file-preview file-container">
          {fileList.map((item) => (
            <div key={item.id} className="drop-file-preview__item ">
              <img src={ImageConfig[item.file.type.split("/")[1]] || ImageConfig.default} alt="" />
              <div className="drop-file-preview__item__info">
                <div className="d-flex flex-wrap">
                  <span>{item.file.name.length > 10 ? `${item.file.name.slice(0, 10)}...` : item.file.name}</span>
                  <IconButton onClick={() => fileRemove(item.id)} icon={<CloseIcon />} />
                </div>
                <p>{item.file.size}B</p>
              </div>
            </div>
          ))}
        </div>
      )}
      {fileList.length > 0 && (
        <Button variant="contained" color="primary" onClick={() => onFileChange(fileList)}>
          Send
        </Button>
      )}
    </Paper>
  );
};

export default DropFileInput;
