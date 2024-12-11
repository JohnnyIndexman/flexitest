// import React, { useState } from "react";
// import { Box, Button, Input, Text } from "@chakra-ui/react";
// import { useDropzone } from "react-dropzone";
// import { useReports } from "../api/ReportsContext";
// import { createListCollection } from "@chakra-ui/react";
// import {
//   SelectContent,
//   SelectItem,
//   SelectLabel,
//   SelectRoot,
//   SelectTrigger,
//   SelectValueText,
// } from "@chakra-ui/react";

// function Create() {
//   const { createReport } = useReports();
//   const [preview, setPreview] = useState(null);
//   const [newReport, setNewReport] = useState({
//     title: "",
//     report: "",
//     category: "",
//     image: ""
//   });

//   const { getRootProps, getInputProps } = useDropzone({
//     onDrop: (acceptedFiles) => {
//       const file = acceptedFiles[0];
//       const objectUrl = URL.createObjectURL(file);
//       setPreview(objectUrl);
//       setNewReport((prev) => ({ ...prev, image: file }));
//     },
//     accept: "image/*",
//   });

//   const categories = createListCollection({
//     items: [
//       { label: "To-Do", value: "todo" },
//       { label: "Reminders", value: "reminders" },
//       { label: "Projects", value: "projects" },
//       { label: "Ideas", value: "ideas" },
//     ],
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validate form inputs
//     if (!newReport.title || !newReport.report || !newReport.category) {
//       console.error("Please fill all fields");
//       return;
//     }

//     // Create a new report
//     try {
//       await createReport({
//         ...newReport,
//         id: Date.now(),
//       });

//       // Reset the form
//       setNewReport({ title: "", report: "", category: "", image: "" });
//       setPreview(null);
//       console.log("Report created successfully!");
//     } catch (error) {
//       console.error("Failed to create report:", error);
//     }
//   };

//   const style = {
//     boxSizing: "border-box",
//     border: "1px solid none",
//     padding: "30px 10px 30px 10px",
//     width: "100%",
//   };

//   return (
//     <Box
//       style={style}
//       padding="20px"
//       width="100%"
//       maxWidth="600px"
//       margin="0 auto"
//     >
//       <form onSubmit={handleSubmit}>
//         <Box
//           {...getRootProps()}
//           style={{
//             border: "2px dashed #ddd",
//             padding: "20px",
//             textAlign: "center",
//           }}
//         >
//           <input {...getInputProps()} />
//           {preview ? (
//             <img
//               src={preview}
//               alt="Preview"
//               style={{
//                 width: "100%",
//                 maxWidth: "200px",
//                 marginTop: "10px",
//                 height: "200px",
//               }}
//             />
//           ) : (
//             <Text>Drag & drop an image here, or click to select one</Text>
//           )}
//         </Box>

//         <Box
//           display="flex"
//           flexDirection="column"
//           gap="15px"
//           mt="15px"
//           mb="15px"
//         >
//           <Input
//             id="title"
//             type="text"
//             placeholder="Title"
//             value={newReport.title}
//             onChange={(e) =>
//               setNewReport({ ...newReport, title: e.target.value })
//             }
//           />
//           <Input
//             id="note"
//             type="text"
//             placeholder="Note"
//             value={newReport.report}
//             onChange={(e) =>
//               setNewReport({ ...newReport, report: e.target.value })
//             }
//           />

//           <Box>
//             <SelectRoot
//               collection={categories}
//               size="sm"
//               width={["100%", "100%", "320px"]}
//               position="relative"
//             >
//               <SelectLabel>Select Category</SelectLabel>
//               <SelectTrigger>
//                 <SelectValueText
//                   placeholder="Select category"
//                   padding="10px"
//                   value={newReport.category}
//                 />
//               </SelectTrigger>

//               <SelectContent
//                 padding="10px"
//                 position="absolute"
//                 zIndex="1000"
//                 style={{
//                   top: "100%",
//                   left: 0,
//                   width: "100%",
//                 }}
//               >
//                 {categories.items.map((category) => (
//                   <SelectItem
//                     key={category.value}
//                     item={category}
//                     onClick={() =>
//                       setNewReport({ ...newReport, category: category.value })
//                     }
//                   >
//                     {category.label}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </SelectRoot>
//           </Box>
//         </Box>

//         <Button
//           width="100%"
//           background="#c692fb"
//           type="submit"
//           loading 
//           loadingText="Saving..."
//         >
//           Save
//         </Button>
//       </form>
//     </Box>
//   );
// }

// export default Create;

import React, { useState } from "react";
import { Box, Button, Input, Text } from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { useReports } from "../api/ReportsContext";
import { createListCollection } from "@chakra-ui/react";
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@chakra-ui/react";

function Create() {
  const { createReport } = useReports();
  const [preview, setPreview] = useState(null);
  const [newReport, setNewReport] = useState({
    title: "",
    report: "",
    category: "",
    image: ""
  });
  const [loading, setLoading] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      setNewReport((prev) => ({ ...prev, image: file }));
    },
    accept: "image/*",
  });

  const categories = createListCollection({
    items: [
      { label: "To-Do", value: "todo" },
      { label: "Reminders", value: "reminders" },
      { label: "Projects", value: "projects" },
      { label: "Ideas", value: "ideas" },
    ],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newReport.title || !newReport.report || !newReport.category || !newReport.image) {
      console.error("Please fill all fields and upload an image");
      return;
    }

    setLoading(true);

    try {
      // Upload image to Cloudinary
      const formData = new FormData();
      formData.append("file", newReport.image);
      formData.append("upload_preset", "IndexNotes"); // Set in Cloudinary
      formData.append("cloud_name", "dhqrrjsbb");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dhqrrjsbb/image/upload",
        formData
      );

      const imageUrl = response.data.secure_url;

      // Create a new report with the image URL
      await createReport({
        ...newReport,
        image: imageUrl,
        id: Date.now(),
      });

      setNewReport({ title: "", report: "", category: "", image: "" });
      setPreview(null);
      console.log("Report created successfully!");
    } catch (error) {
      console.error("Failed to create report:", error);
    } finally {
      setLoading(false);
    }
  };

  const style = {
    boxSizing: "border-box",
    border: "1px solid none",
    padding: "30px 10px 30px 10px",
    width: "100%",
  };

  return (
    <Box
      style={style}
      padding="20px"
      width="100%"
      maxWidth="600px"
      margin="0 auto"
    >
      <form onSubmit={handleSubmit}>
        <Box
          {...getRootProps()}
          style={{
            border: "2px dashed #ddd",
            padding: "20px",
            textAlign: "center",
          }}
        >
          <input {...getInputProps()} />
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              style={{
                width: "100%",
                maxWidth: "200px",
                marginTop: "10px",
                height: "200px",
              }}
            />
          ) : (
            <Text>Drag & drop an image here, or click to select one</Text>
          )}
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          gap="15px"
          mt="15px"
          mb="15px"
        >
          <Input
            id="title"
            type="text"
            placeholder="Title"
            value={newReport.title}
            onChange={(e) =>
              setNewReport({ ...newReport, title: e.target.value })
            }
          />
          <Input
            id="note"
            type="text"
            placeholder="Note"
            value={newReport.report}
            onChange={(e) =>
              setNewReport({ ...newReport, report: e.target.value })
            }
          />

          <Box>
            <SelectRoot
              collection={categories}
              size="sm"
              width={["100%", "100%", "320px"]}
              position="relative"
            >
              <SelectLabel>Select Category</SelectLabel>
              <SelectTrigger>
                <SelectValueText
                  placeholder="Select category"
                  padding="10px"
                  value={newReport.category}
                />
              </SelectTrigger>

              <SelectContent
                padding="10px"
                position="absolute"
                zIndex="1000"
                style={{
                  top: "100%",
                  left: 0,
                  width: "100%",
                }}
              >
                {categories.items.map((category) => (
                  <SelectItem
                    key={category.value}
                    item={category}
                    onClick={() =>
                      setNewReport({ ...newReport, category: category.value })
                    }
                  >
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectRoot>
          </Box>
        </Box>

        <Button
          width="100%"
          background="#c692fb"
          type="submit"
          isLoading={loading}
          loadingText="Saving..."
        >
          Save
        </Button>
      </form>
    </Box>
  );
}

export default Create;
