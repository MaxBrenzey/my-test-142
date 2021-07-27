  
import sanityClient from "@sanity/client";

export default sanityClient({
  projectId: "sdob64fi",
  dataset: "production",
  useCdn: true,
})