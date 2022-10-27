import React from "react";
import { Page, Document, pdfjs } from "react-pdf";
import flashForm from "assets/FlashForm.pdf";
import MainDialog from "../dialog/MainDialog";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const options = {
  cMapUrl: "cmaps/",
  cMapPacked: true,
  standardFontDataUrl: "standard_fonts/",
};

const ViewDownloadPDF = ({ openPreview, onClose = () => {} }) => {
  return (
    <MainDialog downloadAction open={openPreview} onClose={onClose}>
      <Document file={flashForm} onLoadError={console.log} options={options} loading="Loading PDF">
        {Array.from(new Array(4), (el, index) => (
          <Page height={800} key={`page_${index + 1}`} pageNumber={index + 1} />
        ))}
      </Document>
    </MainDialog>
  );
};

export default ViewDownloadPDF;
