import { getServerSession } from "next-auth/next"
import { getSession, useSession } from "next-auth/react";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { handler } from "../auth/[...nextauth]/route";




const f = createUploadthing();
 


// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async ( {req,res} ) => {
      // This code runs on your server before upload
      try {
        // Fetch session data
    
        // Check if the session is defined and contains the expected properties
       
    
        // If you throw, the user will not be able to upload
       
      } catch (error) {
        // Handle authentication error
        console.error(error);
        throw new Error("Authentication error");
      }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);
 
      console.log("file url", file.url);
 
    
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;