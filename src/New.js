// import { Box } from "@chakra-ui/react";
// import React from "react";
// import { Card } from "@chakra-ui/react";
// import { Avatar } from "../components/ui/avatar";
// import { MdOutlineEdit } from "react-icons/md";
// import { RiDeleteBin4Line } from "react-icons/ri";
// import { useGetReportsQuery, useUpdateReportMutation, useDeleteReportMutation } from "../api/ApiSlice";

// function Notes() {
//   const style = {
//     boxSizing: "border-box",
//     border: "1px solid none",
//     padding: "30px 10px 30px 10px",
//     width: "100%",
//   };

//   const { data, error, isLoading } = useGetReportsQuery(
//     "67565865ad19ca34f8d7e85d"
//   );

//   const [updateReport] = useUpdateReportMutation(); 
//   const [deleteReport] = useDeleteReportMutation();  

//   const handleEdit = (id, updatedData) => {
//     updateReport({
//       binId: "67565865ad19ca34f8d7e85d", 
//       id: id, 
//       ...updatedData,  // Supply the updated data you want to change
//     });
//   };

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message}</div>;

//   const handleDelete = (id) => {
//     deleteReport({
//       binId: "67565865ad19ca34f8d7e85d",
//       id: id,
//     });
//   };

//   return (
//     <Box style={style} display="flex" flexWrap="wrap" gap="10px">
//       {data?.record.map((d) => (
//         <Card.Root width="24%" mb="20px" padding="10px" key={d.id}>
//           <Card.Body gap="2">
//             <Avatar src={d.image} name="Nue Camp" size="lg" shape="rounded" />
//             <Card.Title mt="2">{d.title}</Card.Title>
//             <Card.Description>{d.report}</Card.Description>
//           </Card.Body>
//           <Card.Footer justifyContent="flex-end">
//             <MdOutlineEdit size="25px" style={{ cursor: "pointer" }} />
//             <RiDeleteBin4Line
//               size="25px"
//               style={{ cursor: "pointer" }}
//               onClick={() => handleDelete(d.id)}
//             />
//           </Card.Footer>
//         </Card.Root>
//       ))}
//     </Box>
//   );
// }

// export default Notes;