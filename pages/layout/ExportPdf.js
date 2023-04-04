import { useState, useEffect } from "react";
import { Document, Page, Text } from "react-pdf";

const ExportPdf = (props) => {
  const [pdfLoaded, setPdfLoaded] = useState(false);

  useEffect(() => {
    if (pdfLoaded) {
      const pdf = document.getElementById("pdf");
      pdf.pdf();
    }
  }, [pdfLoaded]);

  return (
    <>
      <Document
        id="pdf"
        onLoadSuccess={() => {
          setPdfLoaded(true);
        }}
      >
        <Page>
          <Text>PDF content goes here.</Text>
        </Page>
      </Document>
      <button onClick={() => {}}>Download PDF</button>
    </>
  );
};

export default ExportPdf;
