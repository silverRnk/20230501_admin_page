import { IconProp } from "@fortawesome/fontawesome-svg-core";
import ImageFileIcon from "../compenents/SvgIcons/ImageFileIcon";
import AudioFileIcon from "../compenents/SvgIcons/AudioFileIcon";
import VideoFileIcon from "../compenents/SvgIcons/VideoFileIcon";
import PDFFileIcon from "../compenents/SvgIcons/PDFFileIcon";
import WordFileIcon from "../compenents/SvgIcons/WordFileIcon";
import FileIcon from "../compenents/SvgIcons/FileIcon";
import PPTFileIcon from "../compenents/SvgIcons/PPTFileIcon";
import ExcelFileIcon from "../compenents/SvgIcons/ExcelFileIcon";
import JsonFileIcon from "../compenents/SvgIcons/JsonFileIcon";
import CodeFileIcon from "../compenents/SvgIcons/CodeFileIcon";
import ZipFileIcon from "../compenents/SvgIcons/ZipFileIcon";

/**
 * Returns the corresponding font-awesome icons class for the corresponding mime type
 * @param {string} mimeType 
 * @returns string - font awesome icon class
 */
function getFontAwesomeIconFromMIME(mimeType: string) {
    // List of official MIME Types: http://www.iana.org/assignments/media-types/media-types.xhtml
    var icon_classes: Record<string, string> = {
      // Media
      "image": "fa-file-image-o",
      "audio": "fa-file-audio-o",
      "video": "fa-file-video-o",
      // Documents
      "application/pdf": "fa-file-pdf",
      "application/msword": "file-word",
      "application/vnd.ms-word": "file-word",
      "application/vnd.oasis.opendocument.text": "file-word",
      "application/vnd.openxmlformats-officedocument.wordprocessingml":
        "file-word",
      "application/vnd.ms-excel": "fa-file-excel-o",
      "application/vnd.openxmlformats-officedocument.spreadsheetml":
        "fa-file-excel-o",
      "application/vnd.oasis.opendocument.spreadsheet": "fa-file-excel-o",
      "application/vnd.ms-powerpoint": "fa-file-powerpoint-o",
      "application/vnd.openxmlformats-officedocument.presentationml":
        "fa-file-powerpoint-o",
      "application/vnd.oasis.opendocument.presentation": "fa-file-powerpoint-o",
      "text/plain": "fa-file-text-o",
      "text/html": "fa-file-code-o",
      "application/json": "fa-file-code-o",
      // Archives
      "application/gzip": "fa-file-archive-o",
      "application/zip": "fa-file-archive-o"
    };
  
    for (const key in icon_classes) {
      if (!icon_classes.hasOwnProperty(key)) {
        return "fa-file-o";
      }
      if (mimeType.search(key) === 0) {
        // Found it
        return icon_classes[key];
      }
    }
  }


  /**
   * 
   * @param mimeType 
   * @returns 
   */
  function getSvgIconFromMIME(mimeType: string) {
    // List of official MIME Types: http://www.iana.org/assignments/media-types/media-types.xhtml
    var icon_classes: Record<string, React.JSX.Element> = {
      // Media
      "image": <ImageFileIcon/>,
      "audio": <AudioFileIcon/>,
      "video": <VideoFileIcon/>,
      // Documents
      "application/pdf": <PDFFileIcon/>,
      "application/msword": <WordFileIcon/>,
      "application/vnd.ms-word": <WordFileIcon/>,
      "application/vnd.oasis.opendocument.text": <WordFileIcon/>,
      "application/vnd.openxmlformats-officedocument.wordprocessingml":
      <WordFileIcon/>,
      "application/vnd.ms-excel": <ExcelFileIcon/>,
      "application/vnd.openxmlformats-officedocument.spreadsheetml":
      <ExcelFileIcon/>,
      "application/vnd.oasis.opendocument.spreadsheet": <ExcelFileIcon/>,
      "application/vnd.ms-powerpoint": <PPTFileIcon/>,
      "application/vnd.openxmlformats-officedocument.presentationml":
      <PPTFileIcon/>,
      "application/vnd.oasis.opendocument.presentation": <PPTFileIcon/>,
      "text/plain": <FileIcon/>,
      "text/html": <CodeFileIcon/>,
      "application/json": <JsonFileIcon/>,
      // Archives
      "application/gzip": <ZipFileIcon/>,
      "application/zip": <ZipFileIcon/>,
      "application/x-7z-compressed": <ZipFileIcon/>,
      " application/x-rar-compressed": <ZipFileIcon/>
    };
  
    for (const key in icon_classes) {
      
      if (!icon_classes.hasOwnProperty(mimeType)) {
        console.log(!icon_classes.hasOwnProperty(key))
        return <FileIcon/>;
      }
      if (mimeType.search(key) === 0) {
        // Found it
        return icon_classes[key];
      }
    }
  }

  export {getFontAwesomeIconFromMIME, getSvgIconFromMIME}